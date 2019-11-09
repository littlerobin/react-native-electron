const Promise = require('bluebird');
const path = require('path');
const glob = require('glob');
const tinify = require('tinify');
tinify.key = "pDW3mgr6KTcdjgGczjstd3sPB0wgyTZP";

const uncompressDir = 'uncompress';
const compressDir = 'compress';
const files = glob.sync(path.join(__dirname, uncompressDir, '*.png'));

const compressPromises = Promise.all(
  files.map((file) => {
    const fileStruct = file.split('/');
    const filename = fileStruct[fileStruct.length - 1];
    const fileDirUncompress = file;
    const fileDirCompress = path.join(__dirname, compressDir, filename);
    const result = Promise.resolve(tinify.fromFile(fileDirUncompress).toFile(fileDirCompress));

    return {
      fileDirUncompress,
      fileDirCompress,
      result,
    };
  })
);

compressPromises.then(promises => {
  promises.forEach(promise => console.log(`File Compress: ${promise.fileDirCompress}`));
});
