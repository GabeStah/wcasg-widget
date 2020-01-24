import Utility from '@/utility';

const guid = Utility.generateGuid();

const config = {
  debug: true,
  // Ensure globally unique id
  // widgetId: `wcasg-ada-app-${guid}`,
  widgetId: `wcasg-ada-app`,
  guid,
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
