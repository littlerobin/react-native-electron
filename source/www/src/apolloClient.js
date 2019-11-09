import ApolloClient from 'apollo-boost';
import { NotificationManager } from 'react-notifications';
import config from './config';
import { getStore } from './utils/store';

const HOST = config.API_HOST || 'http://localhost:4000';

const onError = ({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      // handle errors differently based on its error code
      switch (err.extensions.code) {
      case 'INTERNAL_SERVER_ERROR':
        NotificationManager.error(err.message, 'Gagal');
        forward(err.message);
        break;
      default:
        break;
      }
    }
  }

  if (networkError) {
    console.error('network', networkError, 'NotificationManager', NotificationManager); // eslint-disable-line
  }
};

const createApolloClient = (tokenParam) => {
  const client = new ApolloClient({
    uri: HOST,
    request: async (operation) => {
      const token = await getStore('token') || tokenParam;
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    },
    onError,
  });

  return client;
};

export default createApolloClient;
