const guid =
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const config = {
  // Ensure globally unique id
  widgetId: `wcasg-ada-app-${guid}`,
  guid,
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
