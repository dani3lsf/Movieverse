import React, { Component } from 'react';

export default class Language extends Component {
  render() {
    const language = this.props.language.toUpperCase()

    return <p>
      { isoLanguages[language] }
    </p>
  }
}

const isoLanguages = {
  "AB": "Abkhazian",
  "AA": "Afar",
  "AF": "Afrikaans",
  "SQ": "Albanian",
  "AM": "Amharic",
  "AR": "Arabic",
  "AN": "Aragonese",
  "HY": "Armenian",
  "AS": "Assamese",
  "AE": "Avestan",
  "AY": "Aymara",
  "AZ": "Azerbaijani",
  "BA": "Bashkir",
  "EU": "Basque",
  "BE": "Belarusian",
  "BN": "Bengali",
  "BH": "Bihari",
  "BI": "Bislama",
  "BS": "Bosnian",
  "BR": "Breton",
  "BG": "Bulgarian",
  "MY": "Burmese",
  "CA": "Catalan",
  "CH": "Chamorro",
  "CE": "Chechen",
  "ZH": "Chinese",
  "CU": "Church",
  "CV": "Chuvash",
  "KW": "Cornish",
  "CO": "Corsican",
  "HR": "Croatian",
  "CS": "Czech",
  "DA": "Danish",
  "DV": "Divehi",
  "NL": "Dutch",
  "DZ": "Dzongkha",
  "EN": "English",
  "EO": "Esperanto",
  "ET": "Estonian",
  "FO": "Faroese",
  "FJ": "Fijian",
  "FI": "Finnish",
  "FR": "French",
  "GD": "Gaelic",
  "GL": "Galician",
  "KA": "Georgian",
  "DE": "German",
  "EL": "Greek",
  "GN": "Guarani",
  "GU": "Gujarati",
  "HT": "Haitian",
  "HA": "Hausa",
  "HE": "Hebrew",
  "HZ": "Herero",
  "HI": "Hindi",
  "HO": "Hiri",
  "HU": "Hungarian",
  "IS": "Icelandic",
  "IO": "Ido",
  "ID": "Indonesian",
  "IA": "Interlingua",
  "IE": "Interlingue",
  "IU": "Inuktitut",
  "IK": "Inupiaq",
  "GA": "Irish",
  "IT": "Italian",
  "JA": "Japanese",
  "JV": "Javanese",
  "KL": "Kalaallisut",
  "KN": "Kannada",
  "KS": "Kashmiri",
  "KK": "Kazakh",
  "KM": "Khmer",
  "KI": "Kikuyu",
  "RW": "Kinyarwanda",
  "KY": "Kirghiz",
  "KV": "Komi",
  "KO": "Korean",
  "KJ": "Kuanyama",
  "KU": "Kurdish",
  "LO": "Lao",
  "LA": "Latin",
  "LV": "Latvian",
  "LI": "Limburgan",
  "LN": "Lingala",
  "LT": "Lithuanian",
  "LB": "Luxembourgish",
  "MK": "Macedonian",
  "MG": "Malagasy",
  "MS": "Malay",
  "ML": "Malayalam",
  "MT": "Maltese",
  "GV": "Manx",
  "MI": "Maori",
  "MR": "Marathi",
  "MH": "Marshallese",
  "MO": "Moldavian",
  "MN": "Mongolian",
  "NA": "Nauru",
  "NV": "Navaho",
  "ND": "Ndebele",
  "NR": "Ndebele",
  "NG": "Ndonga",
  "NE": "Nepali",
  "SE": "Northern",
  "NO": "Norwegian",
  "NB": "Norwegian",
  "NN": "Norwegian",
  "NY": "Nyanja",
  "OC": "Occitan",
  "OR": "Oriya",
  "OM": "Oromo",
  "OS": "Ossetian",
  "PI": "Pali",
  "PA": "Panjabi",
  "FA": "Persian",
  "PL": "Polish",
  "PT": "Portuguese",
  "PS": "Pushto",
  "QU": "Quechua",
  "RM": "Raeto-Romance",
  "RO": "Romanian",
  "RN": "Rundi",
  "RU": "Russian",
  "SM": "Samoan",
  "SG": "Sango",
  "SA": "Sanskrit",
  "SC": "Sardinian",
  "SR": "Serbian",
  "SN": "Shona",
  "II": "Sichuan",
  "SD": "Sindhi",
  "SI": "Sinhala",
  "SK": "Slovak",
  "SL": "Slovenian",
  "SO": "Somali",
  "ST": "Sotho",
  "ES": "Spanish",
  "SU": "Sundanese",
  "SW": "Swahili",
  "SS": "Swati",
  "SV": "Swedish",
  "TL": "Tagalog",
  "TY": "Tahitian",
  "TG": "Tajik",
  "TA": "Tamil",
  "TT": "Tatar",
  "TE": "Telugu",
  "TH": "Thai",
  "BO": "Tibetan",
  "TI": "Tigrinya",
  "TO": "Tonga",
  "TS": "Tsonga",
  "TN": "Tswana",
  "TR": "Turkish",
  "TK": "Turkmen",
  "TW": "Twi",
  "UG": "Uighur",
  "UK": "Ukrainian",
  "UR": "Urdu",
  "UZ": "Uzbek",
  "VI": "Vietnamese",
  "VO": "Volapuk",
  "WA": "Walloon",
  "CY": "Welsh",
  "FY": "Western",
  "WO": "Wolof",
  "XH": "Xhosa",
  "YI": "Yiddish",
  "YO": "Yoruba",
  "ZA": "Zhuang",
  "ZU": "Zulu"
}