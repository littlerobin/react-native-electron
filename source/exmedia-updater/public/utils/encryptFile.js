const fs = require('fs');
const temp = require('temp');
const crypto = require('crypto');
const path = require('path');
const exec = require('child_process').exec;

const Encryptor = {};

Encryptor.defaultOptions = {
  algorithm: 'aes192'
};

Encryptor.combineOptions = function(options) {
  let result = {};
  for (const key in Encryptor.defaultOptions) {
    result[key] = Encryptor.defaultOptions[key];
  }

  for (const key in options) {
    result[key] = options[key];
  }

  return result;
};

Encryptor.encryptFile = function (inputPath, outputPath, key, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = Encryptor.combineOptions(options);

  const keyBuf = new Buffer(key);

  const inputStream = fs.createReadStream(inputPath);
  const outputStream = fs.createWriteStream(outputPath);
  const cipher = crypto.createCipher(options.algorithm, keyBuf);

  inputStream.on('data', function(data) {
    const buf = new Buffer(cipher.update(data), 'binary');
    outputStream.write(buf);
  });

  inputStream.on('end', function() {
    try {
      const buf = new Buffer(cipher.final('binary'), 'binary');
      outputStream.write(buf);
      outputStream.end();
      outputStream.on('close', function() {
        fs.unlink(inputPath);
        return callback();
      });
    } catch(e) {
      fs.unlink(outputPath);
      return callback(e);
    }
  });
};

Encryptor.decryptFile = function (inputPath, filename, key, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Automatically track and cleanup files at exit
  temp.track();

  options = Encryptor.combineOptions(options);

  const keyBuf = new Buffer(key);

  temp.mkdir('temp', function(err, dirPath) {
    const outputPath = `${dirPath}/${filename}`;
    const inputStream = fs.createReadStream(inputPath);
    const outputStream = fs.createWriteStream(outputPath);
    const cipher = crypto.createDecipher(options.algorithm, keyBuf);

    inputStream.on('data', function(data) {
      const buf = new Buffer(cipher.update(data), 'binary');
      outputStream.write(buf);
    });

    inputStream.on('end', function() {
      try {
        const buf = new Buffer(cipher.final('binary'), 'binary');
        outputStream.write(buf);
        outputStream.end();

        outputStream.on('close', function() {
          callback(outputStream.path);
        });
      } catch(e) {
        fs.unlink(outputPath);
        return callback(e);
      }
    });
  });
};

Encryptor.cleanUp = () => temp.cleanupSync();

module.exports = Encryptor;
