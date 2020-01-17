import habitat from 'preact-habitat';

import Widget from './components/modal';

let _habitat = habitat(Widget);

_habitat.render({
  // selector: 'main',
  // clean: false,
  // Use parent node
  inline: true
});
