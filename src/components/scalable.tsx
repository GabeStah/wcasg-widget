/* tslint:disable:object-literal-key-quotes */
import { Plugin, PluginScalableComponentParams, PluginScaling } from '@/types';
import { areEqual, greaterThan, lessThan, round } from '@/utility/number';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ValueManipulationType } from 'classes/plugin/action';
import React, { useEffect } from 'react';
import { Selectors } from 'state/redux/selectors';
// @ts-ignore
import { ReactComponent as ChevronThinUpIcon } from 'assets/svg-minified/accessibility-icons/chevron-thin-up.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rotated: {
      transform: 'rotate(0.5turn)'
    },
    active: {
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        fill: theme.palette.text.secondary
      }
    },
    startIcon: {
      fill: theme.palette.text.secondary,
      marginLeft: '0px',
      marginRight: '0px',
      textAlign: 'center',
      '&:hover': {
        fill: theme.palette.text.secondary
      }
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
        aria-label={`Increment ${plugin.title}`}
        aria-roledescription={'button'}
        className={
          greaterThan(scaling.factor, scaling.baseFactor) ? styles.active : ''
        }
        classes={{
          startIcon: greaterThan(scaling.factor, scaling.baseFactor)
            ? styles.startIcon
            : ''
        }}
        color={'primary'}
        onClick={() => actions.increment(plugin.id)}
        role={'button'}
        startIcon={<ChevronThinUpIcon />}
        tabIndex={0}
        variant={'outlined'}
      />
      <Button
        aria-label={`Decrement ${plugin.title}`}
        aria-roledescription={'button'}
        onClick={() => actions.decrement(plugin.id)}
        className={`${styles.rotated} ${
          lessThan(scaling.factor, scaling.baseFactor) ? styles.active : ''
        }`}
        classes={{
          startIcon: lessThan(scaling.factor, scaling.baseFactor)
            ? styles.startIcon
            : ''
        }}
        color={'primary'}
        role={'button'}
        startIcon={<ChevronThinUpIcon />}
        tabIndex={0}
        variant={'outlined'}
      />
    </>
  );
};

export default Scalable;
