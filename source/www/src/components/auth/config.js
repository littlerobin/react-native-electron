// @flow
export const LOGIN_TYPE: { PHONE: 'PHONE', EMAIL: 'EMAIL' } = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
};
/** Docs: https://developers.facebook.com/docs/accountkit/webbasic */
export const BASE_URL_BY_LOGIN_TYPE = {
  [LOGIN_TYPE.PHONE]: 'https://www.accountkit.com/v1.0/basic/dialog/sms_login?',
  [LOGIN_TYPE.EMAIL]:
    'https://www.accountkit.com/v1.0/basic/dialog/email_login?',
};
