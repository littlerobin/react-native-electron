import isElectron from 'is-electron-renderer';
import { machineId, machineIdSync } from 'node-machine-id';
import os from 'os';

export const getMachineId = (isAsync = true, original = true) => {
  const getAsyncId = async () => {
    const id = await machineId(original);
    return id;
  };

  if (isElectron) {
    if (isAsync) {
      return getAsyncId();
    }

    return machineIdSync({original});
  }

  return '0000-0000-0000-0000';
};

export const getSystemInformation = () => ({
  hostname: os.hostname(),
  platform: os.platform(),
});
