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

export default convertArrayToSectionListData;
