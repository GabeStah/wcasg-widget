import map from 'lodash/map';
import React from 'react';
import { PluginConnect } from 'state/redux/connectors';

function ScalingFactor({ data, actions }: { data: any; actions: any }) {
  return (
    <>
      <p>{data.scalingFactor}</p>
      <button onClick={actions.decrement}>-</button>
      <button onClick={actions.increment}>+</button>
    </>
  );
}

export const PluginItem = ({ plugin }: any) => (
  <PluginConnect id={plugin.id}>
    {(data, actions) => (
      <div>
        <h2>{data.title}</h2>
        <button
          onClick={actions.toggle}
          // onClick={() => {
          //   return (dispatch: any) => {
          //     dispatch({ type: 'toggle', payload: { id: data.id } });
          //     dispatch({
          //       type: 'increment',
          //       payload: { id: 'plugin-text-spacing' }
          //     });
          //   };
          //   // dispatch({ type: 'toggle', payload: { id: data.id } });
          // }}
        >
          {data.enabled ? 'Disable' : 'Enable'}
        </button>
        {data.scalingFactor && <ScalingFactor data={data} actions={actions} />}
      </div>
    )}
  </PluginConnect>
);

export const PluginList = ({ plugins }: any) => (
  <div>
    {map(plugins, (plugin: any) => (
      // <BasePlugin key={plugin.id} data={plugin} />
      <PluginItem key={plugin.id} plugin={plugin} />
    ))}
  </div>
);
