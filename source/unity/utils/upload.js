const multer = require('multer');
const mime = require('mime-types');
const moment = require('moment');
const constants = require('./constants');

const upload = multer({
  dest: constants.fileDir,
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, constants.fileDir);
    },
    filename: (req, file, cb) => {
      const mimetype = file.mimetype;
      const ext = mime.extension(mimetype);
      const currentDate = moment().format('LLL');
      const fileName = `${req.body.filename}-${currentDate}.${ext}`;
      cb(null, fileName);
    },
  }),
});

module.exports = upload;
