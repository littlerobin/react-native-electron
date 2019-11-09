import isElectron from 'is-electron-renderer';
import get from 'lodash/get';
import { machineId, machineIdSync } from 'node-machine-id';
import os from 'os';
import config from '../config';

const deviceIdTesting = get(config, 'device');

export const getMachineId = (isAsync = true, original = true) => {
  if (deviceIdTesting) {
    return deviceIdTesting;
  }

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
