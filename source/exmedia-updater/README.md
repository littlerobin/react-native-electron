# Apps Electron Equivalen

**INTRO**

This Apps using CRA (Create React App) + Electron + Redux + Redux Persist (Electron & Web) + GraphQL + Apollo. When running app in development *(yarn dev)* this will running both electron and react because of foreman read Procfile. Currently, after some changes come in branch master in gitlab, gitlab-ci will auto triggered the process deploy until release in github with draft status.

**USAGE**
1. `yarn`
2. `yarn build && yarn dev` => running both electron and web
3. `yarn build && yarn electron` => running only electron
4. `yarn build && yarn start`  => running only web
5. `yarn build && yarn electron-pack:(os)` => to retrieve compiled electron production in folder `dist`
6. `yarn build && yarn publish:(os)` => to deploy electron production to github release
7. `yarn dist` => running `yarn publish` with all `os`

```
Ref: https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
Ref: https://medium.freecodecamp.org/quick-painless-automatic-updates-in-electron-d993d5408b3a
Ref: https://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a
Ref: https://gist.github.com/Slauta/5b2bcf9fa1f6f6a9443aa6b447bcae05
Ref: https://github.com/avocode/electron-windows-autoupdate
Ref: https://medium.com/how-to-electron/how-to-add-auto-updates-to-your-electron-application-an-up-to-date-guide-d62794a0467d
https://productforums.google.com/forum/#!topic/chrome/3j-QURdEywU
https://daveceddia.com/customize-create-react-app-webpack-without-ejecting/
https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e
https://medium.com/@ishwar.rimal/generating-pdf-with-electron-js-31b59ac93249
```
