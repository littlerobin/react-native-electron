// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Loading } from '../common';
import { BASE_URL_BY_LOGIN_TYPE, LOGIN_TYPE } from './config';
import { getQueries } from '../../utils/router';
import config from '../../config';

type LoginType = 'PHONE' | 'EMAIL';
type Props = {
  debug: boolean,
  locale?: string,
  loginType?: LoginType,
  onCallback: (data: ?Object, error: ?Object) => void,
};
type State = {
  webviewLoading: boolean,
  inited: boolean,
  debug: boolean,
  appId: string,
  csrf: string,
  version: string,
};

class AccountKitElectron extends Component<Props, State> {
  webView: any;

  static defaultProps = {
    debug: false,
    locale: 'id_ID',
    loginType: LOGIN_TYPE.PHONE,
  };

  constructor(props: Props) {
    super(props);

    this.webView = React.createRef();
  }

  state = {
    webviewLoading: false,
    inited: false,
    appId: config.ACCOUNT_KIT.APPID,
    csrf: config.ACCOUNT_KIT.CSRF,
    version: config.ACCOUNT_KIT.VERSION,
    debug: process.env.NODE_ENV !== 'production' || this.props.debug,
  };

  componentDidMount() {
    this.initWebView();
  }

  initWebView = () => {
    this.webView.current.addEventListener(
      'did-start-loading',
      () => this.setState({ webviewLoading: true })
    );
    this.webView.current.addEventListener(
      'did-stop-loading',
      () => {
        setTimeout(() => {
          this.setState({ webviewLoading: false })
        }, 1500);
      }
    );
    this.webView.current.addEventListener(
      'dom-ready',
      () => {
        this.webView.current.style = `height: ${window.innerHeight || 400}px`;
      });
    this.webView.current.addEventListener(
      'will-navigate',
      ({ url }) => {
        if (url.indexOf('?') > -1) {
          const queryUrl = url.split('?')[1];
          const queries = getQueries(queryUrl);
          this.props.onCallback && this.props.onCallback(queries, null);
        }
        this.webView.current.stop();
        this.webView.current.getWebContents().stop();
      });
  };

  get config() {
    const { locale } = this.props;
    const { appId, csrf, debug } = this.state;

    const _config: Object = {
      app_id: appId,
      state: csrf,
      redirect: 'http://localhost:3000/registration',
      country_code: 'ID',
      debug,
      locale,
    };

    return Object.keys(_config)
      .map(k => `${k}=${_config[k]}`)
      .join('&');
  }

  get src() {
    const { loginType } = this.props;
    const url = BASE_URL_BY_LOGIN_TYPE[loginType || LOGIN_TYPE.PHONE];

    return url + this.config;
  }

  render() {
    return (
      <View>
        {this.state.webviewLoading && <Loading />}
        <webview ref={this.webView} src={this.src} />
      </View>
    );
  }
}

export default AccountKitElectron;
