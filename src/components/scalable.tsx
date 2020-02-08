import { Plugin, PluginScalableComponentParams, PluginScaling } from '@/enum';
import { areEqual, round } from '@/utility/number';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ValueManipulationType } from 'classes/plugin/action';
import React, { useEffect } from 'react';
import { Selectors } from 'state/redux/selectors';
// @ts-ignore
import ChevronThinUpIcon from 'assets/svg-minified/accessibility-icons/chevron-thin-up.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rotated: {
      transform: 'rotate(0.5turn)'
    }
  })
);

export const Scalable = ({
  actions,
  autoToggle = true,
  plugin,
  scaling,
  showFactor = false,
  state,
  theme
}: PluginScalableComponentParams) => {
  const styles = useStyles(theme);
  const statePlugin = new Selectors(state).getPlugin(plugin.id);
  let displayFactor = statePlugin.scaling?.factor.toFixed(2);
  if (statePlugin.scaling?.type === ValueManipulationType.PercentageScaling) {
    displayFactor = `${Math.round(statePlugin.scaling?.factor * 100)}%`;
  }

  /**
   * Toggle based on diff from baseFactor
   */
  const handleToggle = () => {
    if (autoToggle) {
      if (areEqual(scaling.factor, scaling.baseFactor)) {
        // Only change state if necessary
        if (statePlugin.enabled) {
          actions.disable(plugin.id);
        }
      } else {
        // Only change state if necessary
        if (!statePlugin.enabled) {
          actions.enable(plugin.id);
        }
      }
    }
  };

  // Toggle based on factor
  useEffect(() => handleToggle(), [statePlugin.scaling?.factor]);

  return (
    <>
      {showFactor && <p>Value: {displayFactor}</p>}
      <Button
        onClick={() => actions.increment(plugin.id)}
        aria-label={`Increment ${plugin.title}`}
        aria-roledescription={'button'}
        role={'button'}
        variant={'outlined'}
        color={'primary'}
        startIcon={<ChevronThinUpIcon />}
      />
      <Button
        onClick={() => actions.decrement(plugin.id)}
        className={styles.rotated}
        aria-label={`Decrement ${plugin.title}`}
        aria-roledescription={'button'}
        role={'button'}
        variant={'outlined'}
        color={'primary'}
        startIcon={<ChevronThinUpIcon />}
      />
    </>
  );
};

export default Scalable;
