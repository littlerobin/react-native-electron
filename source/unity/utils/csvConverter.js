const fs = require('fs');

module.exports.bufferToCsv = (fileDir, buffer, callback) => {
  try {
    const buff = new Buffer(buffer);
    fs.writeFileSync(fileDir, buff, 'utf-8');
    callback && callback();
  } catch (error) {
    console.error(error);
  }
};
