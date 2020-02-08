import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';

export const Component = ({
  data,
  actions,
  plugin
}: {
  data: any;
  actions: any;
  plugin: any;
}) => (
  <>
    <FormLabel component='legend'>{plugin.title}</FormLabel>
    <RadioGroup role={'radiogroup'} aria-label={`${plugin.title} Options`}>
      {data.map((datum: any) => (
        <>
          <FormControlLabel
            id={datum.id}
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

export default Component;
