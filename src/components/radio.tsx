import { PluginOption, RadioOption, SelectOption } from '@/enum';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SelectOptionComponent from 'components/select/select-options';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

export const Component = ({
  data,
  actions,
  plugin,
  state,
  title
}: {
  actions: any;
  data: any;
  plugin: any;
  state: any;
  title?: string;
}) => {
  const statePlugin = new Selectors(state).getPlugin(plugin.id);
  const selectedOption = new Selectors(state).getPluginSelectedOption({
    pluginId: plugin.id
  });
  const getOptions = (options: RadioOption[]) => {
    const selectOptionComponents: any[] = [];
    options.forEach((option: RadioOption) => {
      selectOptionComponents.push(
        <FormControlLabel
          id={`${plugin.id}-${option.value}-option`}
          color={'primary'}
          control={<Radio />}
          checked={option.selected}
          name={option.text}
          label={option.value}
          value={option.value}
          aria-checked={option.selected ? 'true' : 'false'}
          aria-label={`${plugin.title} Option: ${option.text}`}
          tabIndex={option.selected ? 0 : -1}
          // onChange={() => actions.selectOption(plugin.id, option.value)}
        />
      );
    });
    return selectOptionComponents;
  };

  return (
    <>
      <FormLabel component='legend'>{title ?? plugin.title}</FormLabel>
      <RadioGroup
        role={'radiogroup'}
        aria-label={`${title ?? plugin.title} Options`}
        row={true}
      >
        {getOptions(data)}
        {/*{data.map((datum: any) => (*/}
        {/*  <>*/}
        {/*    <FormControlLabel*/}
        {/*      id={datum.id}*/}
        {/*      color={'primary'}*/}
        {/*      control={<Radio />}*/}
        {/*      checked={datum.selected}*/}
        {/*      name={datum.name}*/}
        {/*      label={datum.value}*/}
        {/*      value={datum.value}*/}
        {/*      aria-checked={datum.selected ? 'true' : 'false'}*/}
        {/*      aria-label={`${plugin.title} Option: ${datum.text}`}*/}
        {/*      tabIndex={datum.selected ? 0 : -1}*/}
        {/*      onChange={() => actions.selectOption(plugin.id, datum.value)}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*))}*/}
      </RadioGroup>
    </>
  );
};

export default Component;
