const local = {
  API_HOST: 'http://localhost:4000',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen_cms_staging',
  ACCOUNT_KIT: {
    APPID: '269466223664135',
    CSRF: 'b4HBW0rzQUqa+bnYNMJEpA==',
    VERSION: 'v1.1',
  },
};

const test = {
  API_HOST: 'https://equivalen-backend-staging.herokuapp.com',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen_cms_staging',
  ACCOUNT_KIT: {
    APPID: '2281886948759780',
    CSRF: 'b4HBW0rzqUQa+BnyNmJepA==',
    VERSION: 'v1.1',
  },
  device: '10000-10000-10000-10000-10000',
  isTest: true,
};

const dev = {
  API_HOST: 'https://equivalen-backend-staging.herokuapp.com',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen_cms_staging',
  ACCOUNT_KIT: {
    APPID: '2281886948759780',
    CSRF: 'b4HBW0rzqUQa+BnyNmJepA==',
    VERSION: 'v1.1',
  },
};

const prod = {
  API_HOST: 'https://equivalen-backend-production.herokuapp.com',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen_cms_production',
  ACCOUNT_KIT: {
    APPID: '2281886948759780',
    CSRF: 'b4HBW0rzqUQa+BnyNmJepA==',
    VERSION: 'v1.1',
  },
};

let config;
if (process.env.REACT_APP_STAGE === 'prod') {
  config = prod;
} else if (process.env.REACT_APP_STAGE === 'stag') {
  config = dev;
} else if (process.env.REACT_APP_STAGE === 'test') {
  config = test;
} else {
  config = local;
}

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
