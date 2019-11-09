const {Storage} = require('@google-cloud/storage');

const matpels = ['bhsindo', 'bhsing', 'mat', 'ipa'];

function moveFile(bucketName, srcFilename, destFilename) {
  const storage = new Storage();

  console.log(
    `gs://${bucketName}/${srcFilename} moved to gs://${bucketName}/${destFilename}`
  );
  return new Promise((resolve, reject) => {
    resolve(
      storage
        .bucket(bucketName)
        .file(srcFilename)
        .move(destFilename)
    );
  });
}

function mvFile(matpel, totalTo, totalSoal) {
  const promises = [];
  
  for (var a = 1; a <= totalTo; a ++) {
    for (var i = 1; i <= totalSoal; i++) {
      promises.push(
        moveFile('video-learn', `video/${matpel}-to-${a}-no-${i}-tutorial.mp4`, `${matpel}-to-${a}-no-${i}-tutorial.mp4`)
      );
    }
  }
  
  Promise.all(promises)
}

function downloadFile(bucketName, srcFilename, destFilename) {
  const storage = new Storage();
  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: destFilename,
  };

  console.log(
    `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}`
  );
  return new Promise((resolve, reject) => {
    resolve(
      storage
        .bucket(bucketName)
        .file(srcFilename)
        .download(options)
    );
  });
}

function dwnldFile(matpel, totalTo, totalSoal) {
  const promises = [];
  
  for (var a = 1; a <= totalTo; a ++) {
    for (var i = 1; i <= totalSoal; i++) {
      promises.push(
        downloadFile(
          'video-learn',
          `${matpel}-to-${a}-no-${i}-tutorial.mp4`,
          `/Users/ferryhinardi/Documents/equivalen/source/www/assets/video/${matpel}-to-${a}-no-${i}-tutorial.mp4`
        )
      );
    }
  }
  
  Promise.all(promises)
}

// mvFile('ipa', 9, 40);
dwnldFile('ipa', 9, 40);