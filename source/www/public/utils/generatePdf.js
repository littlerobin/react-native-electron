const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const log = require('electron-log');
const get = require('lodash/get');
const createWindow = require('./createWindow');
const {
  showSaveDialog,
  showMessageDialog,
  showErrorDialog,
} = require('../dialog');
const store = require('./persistStore');

const settingCache = {
  getPrintPaperSize: () => 1,
};

function pdfSettings() {
  const paperSizeArray = ["A4", "A5"];
  const option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: paperSizeArray[settingCache.getPrintPaperSize() - 1],
  };
  return option;
}

module.exports.openResultPdf = (mainWindow, params) => {
  params.name = store.get('username') || "";

  let mapAnswersEachTenNo = [];
  const userAnswerMap = new Map();

  params.userAnswers.forEach((ans, idx) => {
    const no = get(ans, 'orderNo');
    const userAnswer = get(ans, 'userAnswer.answer', '-');
    const isDoubt = get(ans, 'userAnswer.isDoubt', false);
    const questionAnswer = get(ans, 'userAnswer.question.answer', '');
    const answerData = {
      no,
      answer: userAnswer,
      isDoubt,
      correct: userAnswer.toLowerCase() === questionAnswer.toLowerCase(),
    };
    const key = no % 10;

    if (userAnswerMap.has(key)) {
      const currentData = userAnswerMap.get(key);
      userAnswerMap.set(key, currentData.concat([answerData]));
    } else {
      userAnswerMap.set(key, [answerData]);
    }
  });

  params.userAnswerMap = Array.from(userAnswerMap.values());

  log.info('params', JSON.stringify(params));
  const template = fs.readFileSync(path.join(__dirname, '../renderer/pdfResult.html'), 'utf8');
  const templatePdf = mustache.render(template, params);
  const windowToPDF = createWindow({
    url: `data:text/html;charset=UTF-8,${templatePdf}`,
    otps: {width: 595, height: 842, parent: mainWindow},
  });
  const filename = `${params.archive}.pdf`;

  showSaveDialog({ defaultPath: filename }, (filePath) => {
    windowToPDF.webContents.printToPDF(pdfSettings(), (err, data) => {
      if (err) {
        //do whatever you want
        return;
      }

      try {
        fs.writeFileSync(filePath, data);
        showMessageDialog({
          title: 'Simpan Berhasil',
          message: `Berhasil disimpan di ${filePath}`,
          buttons: ['Buka'],
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            windowToPDF.show();
          }
        });
      } catch(err) {
        //unable to save pdf..
        showErrorDialog({
          title: 'Batal Simpan',
          message: 'Download PDF failed.',
        });
      }
    });
  });
}
