import Utility from '@/utility';
import { CompressionType } from '@/utility/store';

const guid = Utility.generateGuid();

const config = {
  debug: true,
  // Used for many internal references and names.
  // Try to ensure this is likely to be a globally unique id.
  widgetId: `wcasg-ada-app`,
  useLocalStorageCompression: true,
  // TODO: Base64 compression currently bugged.
  localCompressionType: CompressionType.LZString,
  guid,
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
