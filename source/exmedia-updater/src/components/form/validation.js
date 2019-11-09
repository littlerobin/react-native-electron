import { required } from '@traveloka/validation';

const isEmail = (value) =>
  value.contains('@') ? null : `${value} is not an email format.`;

const mapper = {
  'required': required,
  'email': isEmail,
};

export default (rules) =>
  (rules || []).map(rule => mapper[rule]);
