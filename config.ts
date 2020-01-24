import Utility from '@/utility';

const guid = Utility.generateGuid();

const config = {
  // Ensure globally unique id
  // widgetId: `wcasg-ada-app-${guid}`,
  widgetId: `wcasg-ada-app`,
  guid,
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
