const config = {
  // Ensure globally unique id
  widgetId:
    'wcasg-ada-app-' +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
};

export default config;
