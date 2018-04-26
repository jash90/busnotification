const color = {
  primaryColor: "#2196F3",
  secondaryColor: "#1a78c2",
  accentColor: "#E3F",
  textColor: "#000",
  placeholderColor: "#b8b8b8",
  disabledColor: "#e9e9e9",
  backgroundColor: "#fff",
  google: "#756d6d",
  facebook: "#3b5998"
};

export default {
  getColor(text) {
    switch (text) {
      case "primaryColor":
        return color.primaryColor;
      case "secondaryColor":
        return color.secondaryColor;
      case "accentColor":
        return color.accentColor;
      case "textColor":
        return color.textColor;
      case "placeholderColor":
        return color.placeholderColor;
      case "disabledColor":
        return color.disabledColor;
      case "backgroundColor":
        return color.backgroundColor;
      case "facebook":
        return color.facebook;
      case "google":
        return color.google;
      default:
        return "#fff";
    }
  }
};
