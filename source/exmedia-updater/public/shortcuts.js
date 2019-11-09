const { globalShortcut } = require('electron');
const path = require('path');
const modal = require('./modal');
const store = require('./utils/persistStore');

const modalDataHostProxy = {
  'modal-title': 'Host Proxy',
  'modal-content': `<div><input type='text' id='ipAddress' class='input' placeholder='IP Address' value='${store.get('ipAddress')}' /><label style='display:inline-flex'><input type='checkbox' id='usePort' class='input' checked='${store.get('usePort')}' /><span>4000</span></label></div>`,
};

module.exports.applyShortcut = (mainWindow) => {
  globalShortcut.register('CommandOrControl+N', () => {
    const instance = modal
      .createModalWindow(mainWindow, { frame: false, width: 600, height: 400 });

    instance.on('send', (webContents) => {
      const initialFn = `
        function submit(e) {
          e.preventDefault();

          const ipAddress = document.getElementById('ipAddress').value;
          const usePort = document.getElementById('usePort').value;
          require('electron').ipcRenderer.send('set-ip-address-proxy', { ipAddress, usePort });
          require('electron').remote.getCurrentWindow().close();
        }

        const divBodyModal = document.getElementById('body-modal');
        if (divBodyModal) {
          const formBodyModal = document.createElement('form');
          formBodyModal.innerHTML = divBodyModal.innerHTML;
          formBodyModal.onsubmit = submit;

          divBodyModal.parentNode.replaceChild(formBodyModal, divBodyModal);
        }

        document.getElementById('modal-title').innerHTML = "${modalDataHostProxy['modal-title']}";
        document.getElementById('modal-content').innerHTML = "${modalDataHostProxy['modal-content']}";
        const submitButton = document.createElement('button');
        submitButton.setAttribute("class", "button-modal");
        submitButton.setAttribute("style", "background-color: blue");
        submitButton.innerHTML = "Submit";
        submitButton.onclick = submit;
        document.getElementById('footer-modal').appendChild(submitButton);
      `;

      webContents.send('initial', initialFn);
    });
  });

  globalShortcut.register('CommandOrControl+Shift+1+2', () => {
    store.removeAll();
    mainWindow.reload();
  });
};
