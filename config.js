import TextNodeType from 'classes/node-types/TextNodeType';
import Scalable from 'plugins/scalable';

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
  guid: guid,
  widgetTitle: 'WCASG ADA Widget',
  plugins: {
    fontSize: {
      id: 'font-size',
      title: 'Adjust Font Size',
      defaults: {
        // Percentage step change of font sizes
        increment: 0.1,
        minimum: 0.5,
        maximum: 3.0,
        adjustment: 1.5
      }
    },
    hightlightLinks: {
      id: 'hightlight-links',
      title: 'Hightlight Links',
      defaults: {
        enabled: true,
        // 'block', 'border', or 'both'
        style: 'block'
      }
    },
    letterSpacing: new Scalable({
      id: 'letter-spacing',
      title: 'Scale Letter Spacing',
      propertyName: 'letter-spacing',
      propertyUnit: 'px',
      type: 'scalable',
      nodeTypes: new TextNodeType(),
      defaults: {
        increment: 0.1,
        minimum: 0.5,
        maximum: 3.0,
        adjustment: 1.0
      }
    })
  }
};

export default config;
