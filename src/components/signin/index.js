import { h, Component } from 'preact';
import style from './style.scss';

export default class SigninWidget extends Component {
  render() {
    return (
      <div className={style.signinWidget}>
        <h3>{this.props.title}</h3>
        <a className={style.basebtn + ' ' + style.google}>
          Continue using Google
        </a>
        <a className={`${style.basebtn} ${style.facebook}`}>
          Continue using Facebook
        </a>
        <hr />
        <input type='text' placeholder='Email address' />
        <input type='password' placeholder='Password' />
        <div className={style.wrapper}>
          <a
            className={style.basebtn + ' ' + style.default}
            onClick={this.props.handleAuth}
            style={{ backgroundColor: this.props.btnAccentColor }}
          >
            {this.props.btnText}
          </a>
          <a className={style.formFooter}>Forgot your password</a>
          <a className={style.formFooter}>{`I don't have an account`}</a>
        </div>
      </div>
    );
  }
}
