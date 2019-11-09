# Equivalen

Using Technology:
- [Electron](https://electronjs.org/docs)
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Native Web](https://github.com/necolas/react-native-web)
- [Apollo Client](https://github.com/apollographql/apollo-client)

## Installation & Running
```bash
# Install Yarn
https://yarnpkg.com/lang/en/docs/install/
# Instal Dept
yarn
# Running Apps on web for development
yarn start-dev
# Running Apps on electron with web behavior for development
yarn electron-web-dev
# Running Apps on electron with electron behavior for development
yarn electron-dev
# Build Apps Staging env
yarn build-dev
# Build Apps Production env
yarn build
# Generate Electron Apps for local machine
- Mac: yarn electron-pack:mac
- Win: yarn electron-pack:win
- Linux: yarn electron-pack:linux
# Generate Publish Apps on Github (GH_TOKEN=https://github.com/settings/tokens)
- Mac: yarn publish:mac
- Win: yarn publish:win
- Linux: yarn publish:linux
# Locate Result Release from Github
https://github.com/equivalen/apps/releases
```
