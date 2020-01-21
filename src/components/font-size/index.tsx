// import React from 'react';
//
// import config from 'config';
// import utilities from '@/utilities';
//
// import styles from './styles.scss';
//
// const plugin = config.plugins.hightlightLinks;
//
// export default class HightlightLinks extends React.Component {
//   public state = {
//     ...plugin.defaults,
//   };
//
//   get body() {
//     return document.getElementsByTagName('body')[0];
//   }
//
//   /**
//    * Get currently active className.
//    *
//    * @returns {*} - Default to 'block'.
//    */
//   get className() {
//     return this.classNames[this.state.style] || this.classNames.block;
//   }
//
//   get classNames() {
//     return {
//       block: styles.hightlightLinksBlock,
//       border: styles.hightlightLinksBorder,
//       both: styles.hightlightLinksBoth,
//     };
//   }
//
//   public componentWillMount() {
//     this.update();
//   }
//
//   public handleStyleChange = e => {
//     this.setState(
//       {
//         style: e.target.value,
//       },
//       this.update,
//     );
//   }
//
//   /**
//    * Removes all relevant classes from body.
//    */
//   public resetClasses = () => {
//     for (const key in this.classNames) {
//       utilities.removeClass(this.body, this.classNames[key]);
//     }
//   }
//
//   /**
//    * Toggle enabled state.
//    */
//   public toggle = () => {
//     this.setState(
//       {
//         enabled: !this.state.enabled,
//       },
//       this.update,
//     );
//   }
//
//   /**
//    * Add relevant class to body, if enabled.
//    */
//   public update = () => {
//     this.resetClasses();
//
//     if (this.state.enabled) {
//       utilities.addClass(this.body, this.className);
//     }
//   }
//
//   public render(props) {
//     return (
//       <div id={plugin.id} className={styles.container}>
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
