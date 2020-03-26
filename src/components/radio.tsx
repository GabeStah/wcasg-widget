import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Theme } from '@material-ui/core/styles';
import React from 'react';

export const Component = ({
  data,
  actions,
  plugin,
  theme
}: {
  data: any;
  actions: any;
  plugin: any;
  theme: Theme;
}) => {
  return (
    <>
      <FormLabel component='legend'>
        {plugin.optionName ?? plugin.title}
      </FormLabel>
      <RadioGroup
        role={'radiogroup'}
        aria-label={`${plugin.optionName ?? plugin.title} Options`}
        row={true}
      >
        {data.map((datum: any) => (
          <>
            <FormControlLabel
              id={datum.id}
              color={'primary'}
              control={<Radio />}
              checked={datum.selected}
              name={datum.name}
              label={datum.value}
              value={datum.value}
              aria-checked={datum.selected ? 'true' : 'false'}
              aria-label={`${plugin.title} Option: ${datum.text}`}
              tabIndex={datum.selected ? 0 : -1}
              onChange={() => actions.selectOption(plugin.id, datum.value)}
            />
          </>
        ))}
      </RadioGroup>
    </>
  );
};

export default Component;
