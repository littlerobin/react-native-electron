// @flow

import { AsyncStorage } from 'react-native';

export const getItem = async (key: string | Array<string>) => {
  try {
    if (Array.isArray(key)) {
      return new Promise((resolve, reject) => {
        AsyncStorage.multiGet(key, (err, stores) => {
          if (err) {
            reject(err);
          }

          const returnValues = {};
          stores.forEach((result, i, store) => {
            const key = store[i][0];
            const value = store[i][1];

            returnValues[key] = value;
          });

          resolve(returnValues);
        });
      });
    }

    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(error.message); // eslint-disable-line
  }

  return null;
};

export const storeItem = async(key: string, item: any) => {
  try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      let jsonOfItem;
      if (typeof item === 'string') {
        jsonOfItem = await AsyncStorage.setItem(key, item);
      } else {
        jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      }
      return jsonOfItem;
  } catch (error) {
    console.error(error.message); // eslint-disable-line
  }

  return null;
};

export const removeItemValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}

export const removeAllItem = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  }
  catch(exception) {
    return false;
  }
};
