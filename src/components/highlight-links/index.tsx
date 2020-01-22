// import React from 'react';
//
// import config from 'config';
// import Utility from '@/Utility';
//
// import styles from './styles.scss';
//
// const plugin = config.plugins.hightlightLinks;
//
// export default class HightlightLinks extends React.Component {
//   state = {
//     ...plugin.defaults
//   };
//
//   get body() {
//     return document.getElementsByTagName('body')[0];
//   }
//
//   /**
//    * Get currently active klass.
//    *
//    * @returns {*} - Default to 'block'.
//    */
//   get klass() {
//     return this.klass[this.state.style] || this.klass['block'];
//   }
//
//   get klass() {
//     return {
//       block: styles.hightlightLinksBlock,
//       border: styles.hightlightLinksBorder,
//       both: styles.hightlightLinksBoth
//     };
//   }
//
//   componentWillMount() {
//     this.update();
//   }
//
//   handleStyleChange = e => {
//     this.setState(
//       {
//         style: e.target.value
//       },
//       this.update
//     );
//   };
//
//   /**
//    * Removes all relevant classes from body.
//    */
//   resetClasses = () => {
//     for (const key in this.klass) {
//       Utility.removeClass(this.body, this.klass[key]);
//     }
//   };
//
//   /**
//    * Toggle enabled state.
//    */
//   toggle = () => {
//     this.setState(
//       {
//         enabled: !this.state.enabled
//       },
//       this.update
//     );
//   };
//
//   /**
//    * Add relevant class to body, if enabled.
//    */
//   update = () => {
//     this.resetClasses();
//
//     if (this.state.enabled) {
//       Utility.addClass(this.body, this.klass);
//     }
//   };
//
//   render(props) {
//     return (
//       <div id={plugin.id} klass={styles.container}>
//         <h1>{plugin.title}</h1>
//         <button type={'button'} onClick={this.toggle}>
//           {this.state.enabled ? 'Disable' : 'Enable'}
//         </button>
//         <input
//           type='radio'
//           id='block'
//           name='style'
//           value='block'
//           checked={this.state.style === 'block'}
//           onChange={this.handleStyleChange}
//         />
//         <label htmlFor='block'>Block</label>
//         <input
//           type='radio'
//           id='border'
//           name='style'
//           value='border'
//           checked={this.state.style === 'border'}
//           onChange={this.handleStyleChange}
//         />
//         <label htmlFor='border'>Border</label>
//         <input
//           type='radio'
//           id='both'
//           name='style'
//           value='both'
//           checked={this.state.style === 'both'}
//           onChange={this.handleStyleChange}
//         />
//         <label htmlFor='both'>Both</label>
//       </div>
//     );
//   }
// }
