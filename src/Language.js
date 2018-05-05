export default class Language {
  constructor() {
    this.l = "";
  }
  static setL(newl) {
    this.l = newl;
  }
  static getL() {
    return this.l;
  }
  static get(text) {
    if (!this.Lang[text][this.l]) {
      return this.Lang[text]['en'];
    } else {
      return this.Lang[text][this.l];
    }
  }
  static Lang = {
    sign: {
      en: "Sign In",
      pl: "Logowanie"
    },
    email: {
      en: "Email"
    },
    password: {
      en: "Password",
      pl: "Hasło"
    },
    login: {
      en: "Log in",
      pl: "Zaloguj"
    },
    signGoogle: {
      en: "Sign in Google",
      pl: "Połącz z Google"
    },
    signFace: {
      en: "Sign in Facebook",
      pl: "Połącz z Facebook"
    },
    loginAs: {
      en: "You have been logged as ",
      pl: "Zalogowałeś się jako "
    },
    registration: {
      en: "Registration",
      pl: "Rejestracja"
    },
    repeatPassword: {
      en: "Repeat Password",
      pl: "Powtórz Hasło"
    },
    register: {
      en: "Register",
      pl: "Zarejestruj"
    },
    emailRequired: {
      en: "Email is required.",
      pl: "Email jest wymagany."
    },
    passwordRequired: {
      en: "Password is required.",
      pl: "Hasło jest wymagane."
    },
    emailRequired: {
      en: "Email is required.",
      pl: "Email jest wymagany."
    },
    repeatPassRequired: {
      en: "Repeat password is required.",
      pl: "Musisz powtórzyć hasło."
    },
    passwordSame: {
      en: "Password must match.",
      pl: "Hasła muszą być takie same."
    },
    emailIncorrect: {
      en: "Email is incorrect.",
      pl: "Email jest nieprawidłowy."
    },
    account: {
      en: "Account ",
      pl: "Konto "
    },
    beenCreated: {
      en: " has been created.",
      pl: " zostało utworzone."
    },
    addTransport: {
      en: "Add Transport",
      pl: "Dodaj Transport"
    },
    enterCity: {
      en: "Enter city",
      pl: "Wprowadź miasto"
    },
    cityRequired: {
      en: "City is required.",
      pl: "Miasto jest wymagane."
    },
    appName: {
      en: "Transport Notification"
    },
    editProfile: {
      en: "Edit Profile",
      pl: "Edycja Profilu"
    },
    changePassword: {
      en: "Change Password",
      pl: "Zmiana Hasła"
    },
    logout: {
      en: "Logout",
      pl: "Wyloguj"
    },
    passwordIncorrect: {
      en: "The password or user is invalid.",
      pl: "Login lub hasło jest nieprawidłowe."
    },
    userNotFound: {
      en: "The user is not found.",
      pl: "Użytkownik nie istnieje."
    },
    passwordChanged:{
      en:"Password is changed.",
      pl:"Hasło zmienione"
    },
    passwordWeak:{
      en:"Password is too weak.",
      pl:"Hasło za słabe."
    },
    bus: {
      en: "bus",
      pl: "bus"
    },
    train: {
      en: "train",
      pl: "pociąg"
    },
    car: {
      en: "car",
      pl: "samochód"
    },
    boat: {
      en: "boat",
      pl: "łódź"
    },
    jet: {
      en: "jet",
      pl: "samolot"
    },
    subway: {
      en: "metro",
      pl: "metro"
    }
  };
};