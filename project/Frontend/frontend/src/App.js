import React, { Component } from 'react';
import NavBar from './components/navbar'
import Footer from './components/footer'
import FrontPage from './components/frontpage';
import Feed from './components/feed/feed';
import Actor from './components/actor/actor';
import MoviePage from './components/movie/moviepage'
import MovieSearch from './components/movieSearch'
import PeopleSearch from './components/peopleSearch'
import FindUsers from './components/findUsers'
import Showtimes from './components/showtimes'
import Axios from 'axios'
import Profile from './components/profile/profile'
import {BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom/'
import {getToken} from './cookies'

import './styles/App.css';
import NotFoundError from './components/aux_pages/notFoundError';

class App extends Component {
  constructor(props) {
    super(props)
    if (getToken()) {
      this.state = {
        logged : true
      }
    }
    else {
      this.state = {
        logged: false
      }
    }
    this.handleSession = this.handleSession.bind(this)
    this.setAvatar = this.setAvatar.bind(this)
  }

  handleSession(username) {
    this.setState({
      logged: !this.state.logged,
      username: username
    })
  }

  setAvatar(img) {
    this.setState({
      avatar: img
    })
  }

  render() {
    let navBarLinks = [
      { name: 'Discover Movies', url: '/movies', logged: false },
      { name: 'Now Playing', url: '/showtimes', logged: false },
      { name: 'Search People', url: '/people', logged: false },
      // { name: 'Feed', url: '/feed', logged: false },
      // { name: 'Actor', url: '/actor', logged: false },
      { name: 'Find Users', url: '/users', logged: true },
    ]

    let mainPage
    if (!this.state.logged) {
      mainPage = <Route exact path="/" render={() => <FrontPage handleSession={this.handleSession} />} />
    }
    else { //TODO change to Feed
      mainPage = <Route exact path="/" render={() => <Profile setAvatar={this.setAvatar} />} />
    }

    return (
      <Router>
        <NavBar links={navBarLinks} logged={this.state.logged} handleSession={this.handleSession} avatar={this.state.avatar}/>
        <main>
            <Switch>
              {mainPage}
              <Route exact path="/movies" component={MovieSearch} />
              <Route exact path="/showtimes" component={Showtimes} />
              <Route exact path="/people" component={PeopleSearch} />
              <Route exact path="/profile" render={() => <Profile setAvatar={this.setAvatar}/>} />
              <Route exact path="/users" component={FindUsers} />
              <Route exact path="/movie" component={MoviePage} />
              <Route exact path="/u/:username" component={Profile} />
              {/* <Route exact path="/feed" component={Feed} />
              <Route exact path="/actor" component={Actor} /> */}
              <Route component={NotFoundError} />
            </Switch>
        </main>
        <Footer/>
      </Router>
    );
  }
}


export default App;