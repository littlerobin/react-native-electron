// @flow
import { Component } from 'react';
import type { LoginType } from '../types.shared';
import config from '../../config';

type Props = {
  debug: boolean,
  language?: string,
  loginType?: LoginType,
  onCallback: (data: ?Object, error: ?Object) => void,
};
type State = {
  inited: boolean,
  debug: boolean,
  appId: string,
  csrf: string,
  version: string,
};

class AccountKitWeb extends Component<Props, State> {
  static defaultProps = {
    debug: false,
    language: 'id_ID',
    loginType: 'PHONE',
  };

  state = {
    inited: false,
    appId: config.ACCOUNT_KIT.APPID,
    csrf: config.ACCOUNT_KIT.CSRF,
    version: config.ACCOUNT_KIT.VERSION,
    debug: process.env.NODE_ENV !== 'production' || this.props.debug,
  }

  componentDidMount() {
    this.injectScript();
    this.initAccountKit();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if(!prevState.inited && this.state.inited) {
      (cb => {
        window.AccountKit_OnInteractive = () => {
          window.AccountKit.init({
            appId: this.state.appId,
            state: this.state.csrf,
            version: this.state.version,
            fbAppEventsEnabled: true,
            display: 'modal',
            debug: prevState.debug,
          })
        }
        cb();
      })(() => {
        setTimeout(() => {
          window.AccountKit.login(
            'PHONE',
            { countryCode: '+62' },
            resp => this.props.onCallback && this.props.onCallback(resp)
          );
        }, 2000);
      })
    }
  }

  injectScript = () => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      `https://sdk.accountkit.com/${this.props.language}/sdk.js`
    );
    script.setAttribute('id', 'account-kit');
    script.setAttribute('type', 'text/javascript');
    // @FlowFixMe
    document.body.appendChild(script);
  };

  initAccountKit = () => {
    this.setState({
      inited: true,
      appId: this.state.appId,
      csrf: this.state.csrf,
      version: this.state.version,
    });
  };

  render = () => null;
}

export default AccountKitWeb;
