package data;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Service
public class DataUtil {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void createViews() {
        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS LatestMovies " +
            "AS (" +
                "SELECT tmdb, name, poster, release " +
                "FROM movie " +
                "WHERE release <= NOW() " +
                    "AND poster IS NOT NULL " +
                "ORDER BY release DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS PopularMovies " +
            "AS (" +
                "SELECT tmdb, name, poster, ratingsum / NULLIF(ratingcount,0) AS rating, COUNT(tmdb) AS total " +
                "FROM movie " +
                "LEFT JOIN usermovie ON usermovie.movieid = movie.tmdb " +
                "WHERE release >= NOW() - '1 month'\\:\\:interval " +
                "GROUP BY tmdb " +
                "ORDER BY total DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS UpcomingMovies " +
            "AS (" +
                "SELECT tmdb, name, poster, release " +
                "FROM movie " +
                "WHERE release > NOW() " +
                    "AND poster IS NOT NULL " +
                "ORDER BY release " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS BornToday " +
            "AS (" +
                "SELECT tmdb, name, image, DATE_PART('year', NOW()) - DATE_PART('year', birthdate) AS age, COUNT(tmdb) AS total " +
                "FROM member " +
                "JOIN moviemember ON memberid = tmdb " +
                "WHERE TO_CHAR(birthdate, 'MM-DD') = TO_CHAR(NOW(), 'MM-DD') " +
                    "AND image IS NOT NULL " +
                "GROUP BY tmdb " +
                "ORDER BY total DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS MostCredits " +
            "AS (" +
                "SELECT tmdb, name, image, COUNT(tmdb) AS total " +
                "FROM member " +
                "JOIN moviemember ON memberid = tmdb " +
                "GROUP BY tmdb " +
                "ORDER BY total DESC " +
                "LIMIT 100" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS TotalWatchedHours " +
            "AS (" +
                "SELECT SUM(runtime) / 60" +
                "FROM Usermovie " +
                "JOIN Movie ON Usermovie.movieid = Movie.tmdb" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS TotalLikes " +
            "AS (" +
                "SELECT SUM(likescount) " +
                "FROM Muser" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS CountryCount " +
            "AS (" +
                "SELECT alphacode, COUNT(country.id) AS count " +
                "FROM country " +
                "JOIN muser ON muser.countryid = country.id " +
                "GROUP BY country.id" +
            ")"
        ).executeUpdate();

        entityManager.createNativeQuery(
            "CREATE MATERIALIZED VIEW IF NOT EXISTS GenderCount " +
            "AS (" +
                "SELECT gender, COUNT(id) AS count " +
                "FROM Muser " +
                "GROUP BY gender" +
            ")"
        ).executeUpdate();
    }

    @Transactional
    public void createFunctions() {
        entityManager.createNativeQuery(
            "CREATE OR REPLACE FUNCTION feedEntries(userId INTEGER,offst INTEGER,limt INTEGER) " +
                      "RETURNS TABLE (" +
                         "username VARCHAR," +
                         "usergender CHAR," +
                         "avatar VARCHAR," +
                         "type INTEGER," +
                         "moviename VARCHAR," +
                         "movieposter VARCHAR" +
                      ") " +
                    "AS $$ " +
                    "DECLARE " +
                      "rec_friendactivity RECORD; " +
                      "cur_friendsactivity CURSOR (userId INTEGER, offst INTEGER, limt INTEGER) FOR (" +
                        "WITH friends as (" +
                            "SELECT m.id, m.username, m.avatar, m.gender " +
                            "FROM Friendship AS f " +
                            "JOIN Muser AS m ON (f.pending=FALSE " +
                                                 "AND ((f.sender=userId AND f.receiver=m.id) " +
                                                 "OR (f.sender=m.id AND f.receiver=userId)))" +
                        ") " +
                        "SELECT * FROM friends as fr " +
                        "JOIN Feed as fd " +
                        "ON fr.id = fd.muserid " +
                      "); " +
                    "BEGIN " +
                      "OPEN cur_friendsactivity(userId, offst, limt); " +
                      "LOOP " +
                        "FETCH cur_friendsactivity INTO rec_friendactivity; " +
                        "EXIT WHEN NOT FOUND; " +
                        "username\\:=rec_friendactivity.username; " +
                        "usergender\\:=rec_friendactivity.gender; " +
                        "avatar\\:=rec_friendactivity.avatar; " +
                        "type\\:=rec_friendactivity.type; " +
                        "IF (rec_friendactivity.type in (1,2) ) THEN " +
                          "SELECT m.name, m.poster INTO moviename, movieposter " +
                          "FROM Movie as m " +
                          "WHERE m.tmdb = rec_friendactivity.idcontent; " +
                        "END IF; " +
                        "RETURN NEXT; " +
                        "moviename\\:=NULL; " +
                        "movieposter\\:=NULL; " +
                      "END LOOP;" +
                      "CLOSE cur_friendsactivity; " +
                      "RETURN; " +
                    "END $$ " +
                    "LANGUAGE 'plpgsql';"
        ).executeUpdate();
    }

    @Transactional
    public void refreshViews() {
        List<String> views = Arrays.asList(
            "LatestMovies", "PopularMovies", "UpcomingMovies", "BornToday", "UpcomingMovies",
                "BornToday", "MostCredits", "TotalWatchedHours", "TotalLikes", "CountryCount",
                "GenderCount"
        );

        views.forEach(x -> entityManager.createNativeQuery("REFRESH MATERIALIZED VIEW " + x).executeUpdate());
    }

    public List<Map> queryListToListMap(List<Object[]> objects, List params) {
        List l = new ArrayList();
        objects.forEach(x -> {
            Map m = new HashMap();
            params.forEach(p -> m.put(p, x[params.indexOf(p)]));
            l.add(m);
        });
        return l;
    }
}
