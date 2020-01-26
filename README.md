## WCASG ADA Widget

## App Architecture

- Typescript: Improved syntax and type checking.
- Preact: A smaller footprint version of React that provides 90% of the functionality.
- Redux: State management for use with Preact components.
- SASS: Advanced styling.
- Webpack + Babel: General tooling to generate final build UMD output.

## Editing the Widget

The **WCASG ADA Widget** is constructed out of individual plugins, each of which can be toggled independently. Plugins are designed to be as modular as possible, to make it easier to add more functionality/plugins in the future.

A [`PluginElement`](src/classes/plugin/element/index.tsx) handles the "view" and "state" of a given plugin. The `PluginElement` contains one or more child [`PluginActions`](src/classes/plugin/action/index.ts) that perform the actual DOM manipulation tasks relevant to that `PluginElement`.

### PluginElement

At present, a `PluginElement` has the following basic properties:

```ts
export enum PluginElementType {
  Toggleable,
  Scalable,
  Selectable,
  Multiselectable,
  Static,
  Custom
}

export interface IPluginElement {
  id?: string;
  name?: string;
  title?: string;
  type: PluginElementType;
  // Actions only trigger when enabled.
  enabled?: boolean;
  // Display order
  order?: number;
  // If excluded use default based on type.
  template?: (self?: any) => any;
  // Children are enabled if parent is enabled.
  children?: IPluginElement[];
  // Actions to execute
  actions?: IPluginActionTypes;
  // Get the current or default state object
  getInstanceState: (params?: any) => any;
}
```

A new `PluginElement` instance can be passed many of the above arguments to change its behavior. In addition to typing via Typescript, there are child classes that inherit from `PluginElement` that are designed for more specific tasks. For example, the [`PluginElementToggleable`](src/classes/plugin/element/toggleable/index.tsx) element creates a plugin that allows for enabling/disabling its `PluginAction(s)`. The [`PluginElementScalable`](src/classes/plugin/element/scalable/index.tsx) plugin is used for scaling or incremental actions.

The `PluginElementSelectable` and `PluginElementMultiselectable` elements are still incomplete, but will add explicit ability to work with multi-option states.

### PluginAction

As mentioned, a `PluginAction` is a stateless instance that is a child of a given `PluginElement`. When the `PluginElement` dispatches a relevant state change it triggers its child `PluginActions`, which perform their assigned task (usually, updating the DOM).

As with `PluginElements` there are a few inherited `PluginAction` classes that perform explicit types of actions.

- [`PluginActionClass`](src/classes/plugin/action/class/index.ts) alters a node's assigned CSS classes list, making it ideal for `PluginElements` that want to affect styling of the entire page.
- [`PluginActionStyle`](src/classes/plugin/action/style/index.ts) is used for fine-grained manipulation of node styling. It is best used when modifying styling incrementally (such as `font-size` via the `PluginElementScalable` element).
- [`PluginActionProperty`](src/classes/plugin/action/property/index.ts) alters the properties of the node (i.e. `node[propertyName] = newValue`).
- [`PluginActionFunction`](src/classes/plugin/action/function/index.ts) is used for arbitrary function execution and should be constructed by passing one or more functions it will execute to the `.func` property.

In most cases, a `PluginAction` affects the DOM by altering relevant nodes (i.e. elements).

### Adding or Modifying Plugins

A `PluginElement` is rendered to the DOM via its `template` property, which returns a `JSX` element that is rendered to the DOM via Preact. While `PluginElements` have a predefined template that is the default for all elements of that type, a custom template can be provided to change the look and behavior. For example, here is the current instantiation of the `Adjust Font Size` `PluginElement`:

```ts
export const pluginFontSize = new PluginElementScalable({
  title: 'Adjust Font Size',
  scalingIncrement: 0.1,
  actions: [
    new PluginActionStyle({
      name: 'adjust-font-size-action',
      style: {
        name: 'font-size',
        manipulationType: ValueManipulationType.PercentageScaling
      },
      query: new TextNodeType().types.join(', ')
    })
  ]
});
```

Many of the default arguments are fine, but the important change to `PluginElementScalable` is the `scalingIncrement` property is set to `0.1`. The single action passed of `PluginActionStyle` is set to manipulate the `font-size` CSS property, and is given a `manipulationType` of `PercentageScaling`. In tandem, the `scalingIncrement` and the `manipulationType` will cause the font size of applicable nodes to be scaled by `10%` (`0.1` with a percentage scaling type) per adjustment. The only other option is the `query` property of the `PluginAction`, which defines the CSS query the plugin uses to collect nodes to be updated. In this case a predefined collection of text-based node names (e.g. `a`, `span`, etc) are passed.

The `template` property of `PluginElementScalable` can be seen [here](src/classes/plugin/element/scalable/index.tsx#L102), but it basically displays some buttons to toggle the plugin, as well as adjust the scaling. However, if you wanted to explicitly override the template with something of your own you can do so in the element constructor, like so:

```ts
new PluginElementScalable({
  title: 'Adjust Font Size',
  scalingIncrement: 0.1,
  actions: [
    new PluginActionProperty({
      name: 'adjust-font-size-action',
      style: {
        name: 'font-size',
        manipulationType: ValueManipulationType.PercentageScaling
      },
      node: new TextNodeType().types
    })
  ],
  template: (self: any) => {
    const dispatch = useDispatch();

    const selectEnabled = useMemo(makeElementEnabledSelector, []);
    const enabled = useSelector(state => selectEnabled(state, self.id));

    const selectScalingFactor = useMemo(makeElementScalingFactorSelector, []);
    const scalingFactor = useSelector(state =>
      selectScalingFactor(state, self.id)
    );

    useEffect(() => {
      const currentState = self.getInstanceState();
      const newState = self.getInstanceState({ enabled, scalingFactor });
      if (scalingFactor !== self.scalingFactor) {
        self.scalingFactor = scalingFactor;
      }
      if (enabled !== self.enabled) {
        self.enabled = enabled;
      }

      // Update on change
      if (!isEqual(currentState, newState)) {
        self.update(enabled);
      }
    });

    const handleToggleClick = () => {
      dispatch({
        type: 'toggle',
        payload: { id: self.id }
      });
    };

    const handleScaling = (): any => {
      const adjustment = document.getElementById('adjustment-slider').value;
      dispatch({
        type: 'scale',
        payload: { id: self.id, adjustment }
      });
    };

    return (
      <div
        className={`${styles['plugin-element']} ${styles['plugin-element-scalable']}`}
      >
        <h3>A CUSTOM SLIDER!!!</h3>
        <p>Rounded Value: {Math.round(scalingFactor)}</p>
        <button type={'button'} onClick={() => handleToggleClick()}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
        <input
          type={'range'}
          id={'adjustment-slider'}
          name='adjustment'
          min='-10'
          max='10'
          onChange={() => handleScaling()}
        />
      </div>
    );
  }
});
```

Just about any valid JSX template can be generated and returned by the `template` property. The only requirement is to ensure all references to `this` now reference the `self`, which will assigned the parent `PluginElement` instance during render.

Other properties that can be changed to affect behavior include:

- `scalingFactor`: This is the initial scaling value to apply. For example, if you wish to always increase `font-size` to `200%` you'd set `scalingFactor` to an initial value of `1` and ensure the relevant `PluginAction` has a `Percentage` scaling type.
- `enabled`: Determines if the plugin loads on or off.
- `order`: Adjusts the visual ordering of plugins in the UI. (`TODO`)
- `getInstanceState`: If you wish to add more stateful behavior beyond the default stuff included, start by altering the `getInstanceState` function and setting it to the base values for the element. See below for more on changing state.

#### Customizing Actions

An element can house one or more actions, each of which will be fired when the parent `PluginElement` is enabled or statefully-adjusted. Altering the behavior of different `PluginAction` types will change the way the DOM is manipulated when the action fires.

A `PluginActionClass` action accepts just a couple properties, namely:

- `klass`: A `string` or `Array<string>` that indicates which classes will be added by the action when enabled. These values can already exist in the styling, or be explicitly `imported` from a `.scss` sheet.
- `query`: A `string` that collects DOM nodes using the `document.querySelectorAll` method. For example, setting `query: 'a, p, h1'` will generate a collection of all links, paragraphs, and top-level headers in the DOM. When the action is enabled, the classes defined in `klass` will be applied to those nodes.

In many cases directly changing `query` is unnecessary as you want to add a class/styling to the document root or `body`, which is the default node.

Here is the current code for creating the [`Emphasize Titles`](src/plugins/emphasize-titles.ts) plugin:

```ts
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginEmphasizeTitles = new PluginElementToggleable({
  title: 'Emphasize Titles',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'emphasize-titles-action',
      klass: [pluginStyles.emphasizeTitles]
    })
  ]
});
```

Almost everything is default, except it's explicitly disabled to start with (just to illustrate the ability). Note that we're passing a reference to the `pluginStyles.emphasizeTitles` class that we imported from the stylesheet, as seen below.

```scss
@import 'src/styles/variables';

.emphasizeTitles h1,
.emphasizeTitles h2,
.emphasizeTitles h3,
.emphasizeTitles h4,
.emphasizeTitles h5,
.emphasizeTitles h6 {
  outline: 2px solid rgba($default-highlight-color-tertiary, 0.5) !important;
  outline-offset: 1px !important;
}
```

This should make it easy for designers to alter the look and behavior of plugins that rely on class styling.

---

A `PluginActionStyle` action accepts a few different arguments to adjust its behavior as well, the primary of which is the [`IPluginActionStyleOptions`](src/classes/plugin/action/index.ts#L44) interface which has a few important settings:

- `manipulationType: ValueManipulationType`: As we saw before, this determines how the values affected by this `Action` are manipulated. They can be scaled as a percentage or absolute values, toggled on or off, or directly assigned values based on `enabledValue` and `disabledValue` properties.
- `baseValue`: A good deal of the logic behind the `PluginActionStyle` is to find and handle existing property values for `nodes` it is manipulating. Part of this logic is to retain original values within the nodes by adding a `data` attribute that stores the original value. Thus, when the plugin is disabled we can revert back to the original value if necessary. The `baseValue` property is used to set an initial value of the searched property when a given `node` doesn't have a valid initial value of its own.
- `unitType`: As before, the plugin will try to determine the unit type of the original value and retain/use it for its own adjustments. However, for properties where the original value may not contain a unit (such as `letter-spacing`) the `unitType` property can be specified to provide a fallback type.

---

A given element can have multiple child actions assigned to it, in the event that you wish to invoke multiple actions at once. For example, here we made a scaling plugin that adjusts the `padding` and `margin` of all `div` elements by `2px` each step:

```ts
new PluginElementScalable({
  title: 'Adjust Div Margin/Padding',
  scalingIncrement: 2,
  actions: [
    new PluginActionStyle({
      style: {
        name: 'padding',
        manipulationType: ValueManipulationType.AbsoluteScaling,
        unitType: 'px'
      },
      query: 'div'
    }),
    new PluginActionStyle({
      style: {
        name: 'margin',
        manipulationType: ValueManipulationType.AbsoluteScaling,
        unitType: 'px'
      },
      query: 'div'
    })
  ]
});
```

### Adjusting State

The deepest level of configuration involves changing the underlying state of a plugin, which is necessary when you want to automatically update the UI when data changes. These are the main sections to adjust to alter state for a plugin:

1. Change (or set) the `getInstanceState` property for the `PluginElement` instance. This method returns an object that contains _only_ the relevant stateful information for the given element instance. For example, this is the `getInstanceState` method of the `PluginElementScalable`:

```ts
public getInstanceState(params?: {
  id?: string;
  enabled?: boolean;
  scalingFactor?: number;
}): any {
  return {
    id: params && params.id ? params.id : this.id,
    enabled:
      params && params.enabled !== undefined ? params.enabled : this.enabled,
    scalingFactor:
      params && params.scalingFactor
        ? params.scalingFactor
        : this.scalingFactor
  };
}
```

The `getInstanceState` method serves two logical purposes. When called with no params it returns the **default** state of the element. However, when passed optional parameters it overrides those defaults with the passed values. This is useful in functional component `useEffect` callbacks to compare existing state to potentially updated state. Here we see an example from `PluginElementStatic` that determines whether to update the plugin (and thus its child `PluginActions`) based on whether the new state has a different `enabled` value.

```ts
useEffect(() => {
  const currentState = this.getInstanceState();
  const newState = this.getInstanceState({ enabled });

  if (enabled !== this.enabled) {
    this.enabled = enabled;
  }

  // Update on change
  if (!isEqual(currentState, newState)) {
    this.update(enabled);
  }
});
```

2. Next, add a [`Reselect`](https://github.com/reduxjs/reselect) selector function somewhere outside of the custom plugin instantiation. For example, here's the `enabledSelector` creation method found in the [state/index.tsx](src/state/index.tsx) file.

```ts
export const makeElementEnabledSelector = () =>
  createSelector(
    (state: any) => state.elements.elements,
    (_: any, id: any) => id,
    (elements: any, id: any) => find(elements, ['id', id]).enabled
  );
```

The reselect library basically allows the use of `useState`-style hooks, but more efficiencly composes them to ensure proper memoization and efficiency. The way to look at the selection creator above is to know that the final argument passes to `createSelector` is always the `combiner`, which combines the return values of all previous argument (`selectors`) to create the final selector. So, the above selector starts by receiving the full `state` and returns the `elements.elements` collection. The second selector receives the `state` (which is ignored) plus an outside `id` argument. The combined selector takes the returned `elements` and `id` values and finds a single `element` and retrieves its `enabled` property.

3. Now add a new reducer entry if the `dispatch` object you're passing has a new `type` that didn't exist prior. In this case we need to handle a `dispatch` `type === 'count'`:

```ts
case 'count':
  return Object.assign({}, state, {
    elements: state.elements.map((element: any) => {
      if (element.id === action.payload.id) {
        return Object.assign({}, element, {
          count: !element.count
        });
      }
      return element;
    })
  });
```

5. Finally, update the `PluginElement.template` property so it is aware of the changes to the state that you'd like to track. For example, here's a `template` that tracks a new stateful `count` property:

```ts
public template = (self: any) => {
  const dispatch = useDispatch();

  const selectCount = useMemo(makeElementCountSelector, []);
  const count = useSelector(state => selectCount(state, this.id));

  useEffect(() => {
    const currentState = this.getInstanceState();
    const newState = this.getInstanceState({ count });

    if (count !== this.count) {
      this.count = count;
    }

    // Update on change
    if (!isEqual(currentState, newState)) {
      this.update(enabled);
    }
  });

  const handleOnClick = useCallback(
    () =>
      dispatch({
        type: 'count',
        payload: { id: this.id }
      }),
    [dispatch]
  );

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

### Manual Testing

1. Visit a web page to be tested.
2. Copy raw contents from [build/index.js](http://gitlab.solarixdigital.com/solarix/wcasg-ada-app/raw/master/build/index.js).
3. Paste into Chrome Dev Tools.

- Alternatively, create Bookmarklet that loads raw `build/index.js` content.
- Alternatively, use local Git clone'd copy by adding `build/index.js` to `Chrome Dev Tools > Filesystem > Workspace`, then `Ctrl + A` to select and `Ctrl + Shift + E` to execute on current page.

## Using Inline SVGs

1. Add SVG file to `src/assets/svg`.
2. Run `npm run svg:optimize`, which uses the [svgo](https://github.com/svg/svgo) tool to minify.
3. Reference the minified svg copy found in `srv/assets/svg-minified`:

```css
.largeCursor,
.largeCursor * {
  cursor: url(src/assets/svg-minified/cursor-arrow.svg), default !important;
}
```

## Known Issues

- Building the first time after importing / referencing a new `.scss` style or file will fail, reporting the property doesn't exist in `CssExports`. This is due to the build order for TypeScript + SCSS imports. Just force a second build to resolve the issue.
