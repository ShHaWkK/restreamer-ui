# Restreamer-UI

The user interface of the Restreamer for the connection to the [datarhei Core](https://github.com/datarhei/core)application.

- React
- Material-UI (MUI)

## Upload limits

The UI validates selected local files before upload.

Current limits are client-side and hard-coded:

- video loop files: 25 MiB (`src/views/Edit/Sources/VideoLoop.js`)
- audio loop files: 25 MiB (`src/views/Edit/Sources/AudioLoop.js`)
- image loop files: 2 MiB (`src/views/Edit/Sources/VideoLoop.js`)

These limits are not currently exposed as Restreamer/Core environment variables or runtime settings. Changing them requires updating the corresponding `maxSize` values and rebuilding the UI.

The shared upload component (`src/misc/UploadButton.js`) enforces the configured `maxSize` before reading and uploading a selected file.

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

## License
See the [LICENSE](./LICENSE) file for licensing information.
