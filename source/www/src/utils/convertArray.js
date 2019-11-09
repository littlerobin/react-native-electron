// @flow

import get from 'lodash/get';

export const convertArrayToSectionListData = (data, mapTitle) => {
  let mapper = new Map();

  data.forEach(d => {
    const title = mapTitle.map(field => get(d, field)).join(' - ');

    if (mapper.has(title)) {
      const dataValues = mapper.get(title);
      dataValues.push({ id: d.id, url: d.url });
      mapper.set(title, dataValues);
    } else {
      mapper.set(title, [{ id: d.id, url: d.url }]);
    }
  });
  const ret = Array.from(mapper).map(map => ({
    title: map[0],
    data: map[1],
  }));

  return ret;
};

type ReturnType = 'object' | 'array' | 'keys' | 'sectionList';
type Callback = (returnValue: any) => any

/**
 *
 * @param {1: {id: 1, value: ''}} dataObj
 * @param {object | array | keys | sectionList} returnType
 * @param {Function} callback
 */
export const convertObjToArr = (dataObj: Object, returnType: ReturnType, callback: ?Callback) => {
  const result: Array<any> = Array.from(
    Object.keys(dataObj),
    k => {
      let result = [];

      switch(returnType) {
        case 'object':
           result = { [k]: dataObj[k] };
           break;
        case 'array':
          result = dataObj[k];
          break;
        case 'keys':
          result = k;
          break;
        case 'sectionList':
          result = {
            title: k,
            data: dataObj[k],
          };
          break;
        default:
          result = dataObj[k];
          break;
      }

      return callback ? callback(result) : result;
    });
  return result;
};

export const convertArrToObj = (dataArr: Array, field: string) => {
  const returnValue = {};

  dataArr.forEach(dat => {
    const key = dat[field];
    returnValue[key] = dat;
  });

  return returnValue;
};
