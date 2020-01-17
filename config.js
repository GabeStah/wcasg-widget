const config = {
  // Ensure globally unique id
  widgetId:
    'wcasg-ada-app-' +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15),
  plugins: {
    fontSize: {
      id: 'font-size',
      name: 'Adjust Font Size',
      defaults: {
        // Percentage step change of font sizes
        increment: 0.1,
        minimum: 0.5,
        maximum: 3.0,
        adjustment: 1.0
      }
    }
  }
};

export default config;
