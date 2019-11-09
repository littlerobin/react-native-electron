// allow the file:// protocol to be used by the fetch API
require('electron').webFrame.registerURLSchemeAsPrivileged('file');

if (process.env.NODE_ENV === 'test') {
  window.electronRequire = require
}
