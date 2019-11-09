// @flow

type ReturnType = 'object' | 'array' | 'keys' | 'sectionList';
type Callback = (returnValue: any) => any

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

export default convertObjToArr;
