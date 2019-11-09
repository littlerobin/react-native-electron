// @flow

export type History = {
  action?: string,
  block: () => void,
  createHref: (location: string) => void,
  go: (n: number) => void,
  goBack: () => void,
  goForward: () => void,
  queriesUrl: ?Object,
  location: {
    hash: string,
    key: string,
    pathname: string,
    search: string,
    state?: any,
  },
  listen: (listener: any) => void,
  push: (path: any, state: any) => void,
  replace: (path: string, state?: string) => void,
  queries?: Object,
  transitionTo: (path: string, params?: Object, queries?: Object) => void,
  getCurrentState: () => Object,
};

export type MatPel = 'bhsindo' | 'bhsing' | 'mat' | 'ipa';
export type Answer = 'A' | 'B' | 'C' | 'D';
export type ParamAnswer = { no: number, answer: Answer, isDoubt?: boolean, correct?: boolean };
export type MappingAnswer = { [no: number]: { answer: Answer, isDoubt?: boolean } };
export type DataQuestion = { [index: number]: { to: number, page: number } };
export type QueriesAccountKit = { code: string, status: 'PARTIALLY_AUTHENTICATED' | 'NOT_AUTHENTICATED' | 'BAD_PARAMS' };
export type LoginType = 'PHONE' | 'EMAIL';
export type UserPickLesson = {
  to: number,
  answers: MappingAnswer,
  dataQuestion: Object,
};
export type Persistor = {
  purge: Function,
  flush: Function,
  pause: Function,
  persist: Function,
};
export type Option = {
  label: string,
  value: string,
};
export type StringBoolean = 'true' | 'false';
export type Curriculum = 'K-13' | 'KTSP';
export type Question = {
  id: string,
  index: number,
  content: string,
  options: Array<{
    content: string,
    option: {
      name: string,
    },
  }>,
  used?: number,
  createdBy?: {
    id: string,
    fullName: string
  },
  answer?: Answer,
}
