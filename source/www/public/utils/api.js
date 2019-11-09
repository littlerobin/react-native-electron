const { net } = require('electron');
const FormData = require('form-data');
const log = require('electron-log');
const store = require('./persistStore');

const getHost = () => {
  const host = !!store.get('ipAddress') ? store.get('ipAddress') : '127.0.0.1';
  const port = store.get('usePort') ? 4000 : null;

  return port ? `http://${host}:${port}` : `http://${host}`;
};

module.exports.cekStatus = () => {
  const url = `${getHost()}/check-status`;

  log.info('url', url);

  const request = net.request(url);

  request.on('response', (response) => {
    log.info(`STATUS: ${response.statusCode}`);
    log.info(`HEADERS: ${JSON.stringify(response.headers)}`);
    log.info(`TEXT: ${response.text}`);
    response.on('data', (chunk) => {
      log.info(`BODY: ${chunk}`);
    });
    response.on('end', () => {
      log.info('No more data in response.');
    });
  });

  request.end();
};

module.exports.uploadFile = (data, { filename, filenameFull }) => {
  const url = `${getHost()}/upload`;

  /**
   * @summary maxDataSize: 2GB
   */
  const form = new FormData({ maxDataSize: 20971520 });

  log.info('url', url, 'data', data);

  form.append('filename', filename);
  form.append('data', data, { filename: filenameFull });

  const request = net.request({
    method: 'POST',
    url,
    headers: form.getHeaders(),
  });
  Object.assign(form, { writable: true });
  Object.assign(request, { writable: true });

  log.info('form', form);
  log.info('request', request);

  request.on('response', (response) => {
    log.info(`STATUS: ${response.statusCode}`);
  });

  form.pipe(request);
};
