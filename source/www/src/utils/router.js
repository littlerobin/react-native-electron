import qs from 'querystring';

export const getQueries = (props) => {
  const url = typeof props === 'string' ? props :
    props.location &&
    props.location.search &&
    props.location.search.replace('?', '');
  const queries = qs.parse(url);
  return queries;
};
