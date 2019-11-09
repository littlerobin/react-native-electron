// @flow

const path = require('path');
const resolvePkg = require('resolve');

const values = new Promise((resolve, reject) => {
  const electronConnectPath = require.resolve('equivalen-electron-connect');
  const wsReconnectPath = require.resolve('equivalen-ws-reconnect');
  const pathExists = require.resolve('path-exists');

  /**
   * @return './node_modules/electron-connect/node_modules/ws/index.js'
   */
  const wsEc = resolvePkg.sync('ws', { basedir: electronConnectPath });
  const wsRecon = resolvePkg.sync('ws', { basedir: wsReconnectPath });

  const libFiles = [
    'buffer-util.js',
    'constants.js',
    'event-target.js',
    'extension.js',
    'permessage-deflate.js',
    'receiver.js',
    'sender.js',
    'validation.js',
    'websocket.js',
    'websocket-server.js',
  ];
  const libsWs = libFiles.reduce((res, file) =>
    res.concat([
      path.join(wsEc, '..', 'lib', file),
      path.join(wsRecon, '..', 'lib', file),
    ])
  , []);
  const libsEc = [
    path.join(electronConnectPath, '..', 'lib', 'server.js'),
  ];

  /* $FlowFixMe */
  const returnValues = []
    .concat(libsWs)
    .concat(libsEc)
    .concat([
      pathExists,
    ]);

  resolve(returnValues);
});

module.exports = values;
