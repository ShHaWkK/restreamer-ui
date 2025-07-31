# Restreamer-UI

The user interface of the Restreamer for the connection to the [datarhei Core](https://github.com/datarhei/core)application.

- React
- Material-UI (MUI)

## Development

### For the Restreamer interface:

```
$ git clone github.com/datarhei/restreamer-ui
$ cd restreamer-ui
$ yarn install
$ npm run start
```

Connect the UI with a [datarhei Core](https://github.com/datarhei/core):
http://localhost:3000?address=http://core-ip:core-port

### To add/fix translations:
Locales are located in `src/locals`
```
$ npm run i18n-extract:clean
$ npm run i18n-compile
```

## Docker Compose

Build the UI and start both the UI and Core containers:

```
yarn install
yarn build
docker compose up --build
```

The interface will be available at http://localhost:3000 while the Core API is exposed on http://localhost:8084.

## License
See the [LICENSE](./LICENSE) file for licensing information.
