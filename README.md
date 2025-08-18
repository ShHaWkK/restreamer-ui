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

### Run with Docker Compose

You can run the UI together with a local datarhei Core by using
`docker-compose`:

```bash
$ docker compose up --build
```

The Core container is preconfigured with default credentials so you can skip
the initial registration (`admin` / `datarhei`).

The UI will be available on `http://localhost:3000` and automatically
connects to the Core on `http://localhost:8084`. You can override the
address by appending the `address` query parameter:

```
http://localhost:3000?address=http://other-core:port
```

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
