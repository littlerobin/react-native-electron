const { app } = require('electron');
const path = require('path');
const fileUrl = require('file-url');
const os = require('os');

const resolveDir = (baseUrl, relativePath) => {
  const dir = fileUrl(path.join(baseUrl, relativePath));

  return dir;
};

const convertFileUrlToPath = (fileUrl) => {
  const platform = os.platform();
  let textReplacing = '';
  let textReplaced = '';

  switch(platform) {
    case "darwin":
      textReplacing = 'file://';
      break;
    case "win32":
      textReplacing = 'file:///';
      break;
  }

  return fileUrl.replace(textReplacing, textReplaced);
};

module.exports = {
  convertFileUrlToPath,
  videoUrlPath: path.join(app.getPath('videos'), 'Equivalen', 'videos'),
  videoFilePath: resolveDir(app.getPath('videos'), 'Equivalen/videos'),
  imageFilePath: resolveDir(__dirname, '../../assets/images'),
};
