## WCASG ADA Widget

## App Architecture

- Typescript: Improved syntax and type checking.
- Preact: A smaller footprint version of React that provides 90% of the functionality.
- Redux: State management for use with Preact components.
- SASS: Advanced styling.
- Webpack + Babel: General tooling to generate final build UMD output.

## Editing the Widget

The **WCASG ADA Widget** is constructed out of individual plugins, each of which can be toggled independently.  Plugins are designed to be as modular as possible, to make it easier to add more functionality/plugins in the future.

A [`PluginElement`](src/plugins/element/index.tsx) handles the "view" and "state" of a given plugin.  The `PluginElement` contains one or more child [`PluginActions`](src/plugins/action/index.ts) that perform the actual DOM manipulation tasks relevant to that `PluginElement`.

### PluginElement

At present, a `PluginElement` has the following basic properties:

```ts
export enum PluginElementType {
  Toggleable,
  Scalable,
  Selectable,
  Multiselectable
}

export interface IPluginElement {
  id?: string;
  title?: string;
  type: PluginElementType;
  // Actions only trigger when enabled.
  enabled?: boolean;
  // Display order
  order?: number;
  // If excluded use default based on type.
  template?: any;
  // Children are enabled if parent is enabled.
  children?: IPluginElement[];
  // Actions to execute
  actions?: IPluginActionTypes;
  // Reducer type
  reducerType: ReducerType;
  // Get the default state object
  defaultState: () => any;
}
```

A new `PluginElement` instance can be passed many of the above arguments to change its behavior.  In addition to typing via Typescript, there are child classes that inherit from `PluginElement` that are designed for more specific tasks.  For example, the [`PluginElementToggleable`](src/plugins/element/toggleable/index.tsx) element creates a plugin that allows for enabling/disabling its `PluginAction(s)`.  The [`PluginElementScalable`](src/plugins/element/scalable/index.tsx) plugin is used for scaling or incremental actions.

The `PluginElementSelectable` and `PluginElementMultiselectable` elements are still incomplete, but will add explicit ability to work with multi-option states.

### PluginAction

As mentioned, a `PluginAction` is a stateless instance that is a child of a given `PluginElement`.  When the `PluginElement` dispatches a relevant state change it triggers its child `PluginActions`, which perform their assigned task of updating the DOM.

As with `PluginElements` there are a few inherited `PluginAction` classes that perform explicit types of actions.  [`PluginActionClass`](src/plugins/action/class/index.ts) alters a node's assigned CSS classes list, making it ideal for `PluginElements` that want to affect styling of the entire page.  [`PluginActionProperty`](src/plugins/action/style/index.ts) is used for fine-grained manipulation of node styling and properties.  It is best used when modifying styling incrementally (such as `font-size` via the `PluginElementScalable` element).

In most cases, a `PluginAction` affects the DOM by altering relevant nodes (i.e. elements).

### Adding or Modifying Plugins

A `PluginElement` is rendered to the DOM via its `template` property, which returns a `JSX` element that is rendered to the DOM via Preact.  While `PluginElements` have a predefined template that is the default for all elements of that type, a custom template can be provided to change the look and behavior.  For example, here is the current instantiation of the `Adjust Font Size` `PluginElement`:

```ts
new PluginElementScalable({
  title: 'Adjust Font Size',
  scalingIncrement: 0.1,
  actions: [
    new PluginActionProperty({
      property: {
        name: 'font-size',
        scalingType: DOMPropertyScalingType.Percentage
      },
      node: new TextNodeType().types
    })
  ]
})
```

Many of the default arguments are fine, but the important change to `PluginElementScalable` is the `scalingIncrement` property is set to `0.1`.  The single action passed of `PluginActionProperty` is set to manipulate the `font-size` CSS property, and is given a `scalingType` of `Percentage`.  In tandem, the `scalingIncrement` and the `scalingType` will cause the font size of applicable nodes to be scaled by `10%` (`0.1` with a percentage scaling type) per adjustment.  The only other option is the `node` property of the `PluginAction`, which is a collection of `tag` names that are used for text.

The `template` property of `PluginElementScalable` can be seen [here](src/plugins/element/scalable/index.tsx#L93), but it basically displays some buttons to toggle the plugin, as well as adjust the scaling.  However, if you wanted to explicitly override the template with something of your own you can do so in the element constructor, like so:

```ts
new PluginElementScalable({
  title: 'Adjust Font Size',
  scalingIncrement: 0.1,
  actions: [
    new PluginActionProperty({
      property: {
        name: 'font-size',
        scalingType: DOMPropertyScalingType.Percentage
      },
      node: new TextNodeType().types
    })
  ],
  template: (self: any) => {
    const enabled = useSelector(
      (state: any) => self.getFromState(state).enabled
    );
    const scalingFactor = useSelector(
      (state: any) => self.getFromState(state).scalingFactor
    );
    self.scalingFactor = scalingFactor;

    self.update(enabled);

    const dispatch = useDispatch();

    const handleToggleClick = () => {
      dispatch({
        type: 'toggle',
        reducerType: self.reducerType,
        payload: { id: self.id }
      });
    };

    const handleScaling = (): any => {
      const adjustment = document.getElementById('adjustment-slider').value;
      dispatch({
        type: 'scale',
        reducerType: self.reducerType,
        payload: { id: self.id, adjustment }
      });
    };

    return (
      <>
        <h3>A CUSTOM SLIDER!!!</h3>
        <p>Rounded Value: {Math.round(scalingFactor)}</p>
        <button type={'button'} onClick={() => handleToggleClick()}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
        <input type={'range'} id={'adjustment-slider'} name="adjustment" min="-10" max="10" onChange={() => handleScaling()} />
      </>
    );
  }
})
```

Just about any valid JSX template can be generated and returned by the `template` property.  The only requirement is to retain the `self` argument and internal references to `self`, which will be passed in the parent `PluginElement` instance during render.

Other properties that can be changed to affect behavior include:

- `scalingFactor`: This is the initial scaling value to apply.  For example, if you wish to always increase `font-size` to `200%` you'd set `scalingFactor` to an initial value of `1` and ensure the relevant `PluginAction` has a `Percentage` scaling type.
- `enabled`: Determines if the plugin loads on or off.
- `order`: Adjusts the visual ordering of plugins in the UI. (`TODO`)
- `defaultState`: If you wish to add more stateful behavior beyond the default stuff included, start by altering the `defaultState` property and setting it to the base values for the element.  See below for more on changing state.

#### Customizing Actions

An element can house one or more actions, each of which will be fired when the parent `PluginElement` is enabled or statefully-adjusted.  Altering the behavior of different `PluginAction` types will change the way the DOM is manipulated when the action fires.

A `PluginActionClass` action accepts just a couple properties, namely:

- `klass`: A `string` or `Array<string>` that indicates which classes will be added by the action when enabled.  These values can already exist in the styling, or be explicitly `imported` from a `.scss` sheet.
- `node`: A `string`, `Array<string>`, or `NodeList` which is automatically converted into a collection of element nodes from the loaded DOM that match.  For example, setting `node: ['a', 'p', 'h1']` will generate a collection of all links, paragraphs, and top-level headers in the DOM.  When the action is enabled, the classes defined in `klass` will be applied to those nodes.

In many cases directly changing `node` is unnecessary as you want to add a class/styling to the document root or `body`, which is the default node.

Here is the current code for creating the `Emphasize Titles` plugin:

```ts
import pluginStyles from 'styles/plugin-styles.scss';

// ...

new PluginElementToggleable({
  title: 'Emphasize Titles',
  enabled: false,
  actions: [
    new PluginActionClass({
      klass: [pluginStyles.emphasizeTitles]
    })
  ]
})
```

Almost everything is default, except it's explicitly disabled to start with (just to illustrate the ability).  Note that we're explicitly referencing the `pluginStyles.emphasizeTitles` class that we imported from the stylesheet, as seen below.

```scss
@import 'src/styles/variables';

.emphasizeTitles h1,
.emphasizeTitles h2,
.emphasizeTitles h3,
.emphasizeTitles h4,
.emphasizeTitles h5,
.emphasizeTitles h6{
  outline: 2px solid rgba($default-highlight-color-tertiary, 0.5) !important;
  outline-offset: 1px !important;
}
```

This should make it easy for designers to alter the look and behavior of plugins that rely on class styling.

---

A `PluginActionProperty` action accepts a few different properties to adjust its behavior as well, the primary of which is the `DOMProperty` interface which has a few important settings:

- `scalingType`: As we saw before, this determines how the properties are scaled, either as a percentage or via absolute values.
- `baseValue`: A good deal of the logic behind the `PluginActionProperty` is to find and handle existing property values for `nodes` it is manipulating.  Part of this logic is to retain original values within the nodes by adding a `data` attribute that stores the original value.  Thus, when the plugin is disabled we can revert back to the original value if necessary.  The `baseValue` property is used to set an initial value of the searched property when a given `node` doesn't have a valid initial value of its own.
- `unitType`: As before, the plugin will try to determine the unit type of the original value and retain/use it for its own adjustments.  However, for properties where the original value may not contain a unit (such as `letter-spacing`) the `unitType` property can be specified to provide a fallback type.

---

A given element can have multiple child actions assigned to it, in the event that you wish to invoke multiple actions at once.  For example, here we made a scaling plugin that adjusts the `padding` and `margin` of all `div` elements by `2px` each step:

```ts
new PluginElementScalable({
  title: 'Adjust Div Margin/Padding',
  scalingIncrement: 2,
  actions: [
    new PluginActionProperty({
      property: {
        name: 'margin',
        scalingType: DOMPropertyScalingType.Percentage
      },
      node: 'div'
    }),
    new PluginActionProperty({
      property: {
        name: 'padding',
        scalingType: DOMPropertyScalingType.Percentage
      },
      node: 'div'
    })
  ]
})
```

### Adjusting State

The deepest level of configuration involves changing the underlying state of a plugin, which is necessary when you want to automatically update the UI when data changes.  These are the main sections to adjust to alter state for a plugin:

1. Change (or set) the `defaultState` property for the `PluginElement` instance.  This is just an object that contains *only* the relevant stateful information for the given element instance.  For example, this is the default state of `PluginElementScalable`:

```ts
get defaultState(): any {
  return {
    id: this.id,
    enabled: this.enabled,
    scalingFactor: this.scalingFactor
  };
}
```

2. Next, adjust the `PluginElement.template` property so it is aware of the changes to the state you'd like to track.  For example, here's a `template` that tracks a new stateful `count` property:

```ts
public template = (self: any) => {
  const dispatch = useDispatch();

  const count = useSelector(
    (state: any) => self.getFromState(state).count
  );

  self.update(enabled);

  const handleOnCount = () => {
    dispatch({
      type: 'count',
      reducerType: self.reducerType,
      payload: { id: self.id }
    });
  };

  return (
    <>
      <h3>Counted {count} times</h3>
      <button type={'button'} onClick={handleOnClick}>
        Count it!
      </button>
    </>
  );
};
```

3. Finally, you need to add a relevant `reducer` to the `elementReducers` to ensure it knows how to adjust the state after receiving a dispatched action:

```ts
export const elementReducers = (
  state: InitialStateType = initialState,
  action: IReducerActionParams
) => {
  if (action.type.includes('@@redux')) {
    return state;
  }
  if (action.reducerType !== ReducerType.Element) {
    return state;
  }

  const stateElementIndex = state.elements.findIndex(
    (element: { id: any }) => element.id === action.payload.id
  );
  const stateElement = state.elements[stateElementIndex];

  switch (action.type) {
    case 'count':
      stateElement.count += action.payload.count;
      break;    
    // ...
    default:
      return state;
  }

  return Object.assign({}, state, { elements: state.elements });
};
```

### Manual Testing

1. Visit a web page to be tested.
2. Copy raw contents from [build/index.js](http://gitlab.solarixdigital.com/solarix/wcasg-ada-app/raw/master/build/index.js).
3. Paste into Chrome Dev Tools.
  - Alternatively, create Bookmarklet that loads raw `build/index.js` content.
  - Alternatively, use local Git clone'd copy by adding `build/index.js` to `Chrome Dev Tools > Filesystem > Workspace`, then `Ctrl + A` to select and `Ctrl + Shift + E` to execute on current page.

## Known Issues

- Building the first time after importing / referencing a new `.scss` style or file will fail, reporting the property doesn't exist in `CssExports`.  This is due to the build order for TypeScript + SCSS imports.  Just force a second build to resolve the issue. 
