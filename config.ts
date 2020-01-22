import Utility from '@/utility';

const guid = Utility.generateGuid();

const config = {
  // Ensure globally unique id
  widgetId: `wcasg-ada-app-${guid}`,
  guid,
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
