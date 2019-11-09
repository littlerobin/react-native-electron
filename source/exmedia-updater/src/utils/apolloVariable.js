export function createOmitTypenameLink(variables, unnecessaryKeys) {
  function omitTypename(key, value) {
    const needRemoveKey = '__typename';
    const keys = [ ...unnecessaryKeys, needRemoveKey ];

    return keys.indexOf(key) > -1 ? undefined : value
  }

  return JSON.parse(JSON.stringify(variables), omitTypename)
}
