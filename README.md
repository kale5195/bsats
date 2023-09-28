# Sorry...no time to maintain, please use stacker.news PWA.

## Bsats for stacker.news

[Stacker News](https://stacker.news) is like Hacker News but we pay you Bitcoin. Bsats is an unofficial ios / android app for stacker.news.

You can download the app from:

For android users, you can alsoe download the apk from releases.

## Local Development (mac)

1. npm install -g expo-cli
2. npm install
3. eas build --profile development-simulator --platform ios
4. eas build --profile development --platform android

## Tech Stack

This app is written with [react native](https://reactnative.dev/) + [expo](https://docs.expo.dev/)

## How to publish

```
// ios
eas build --platform ios
eas submit -p ios

// android
eas build --platform android
eas submit -p android
```

## Contributing

Pull requests are welcome. Please submit feature requests and bug reports through issues.

## License

[MIT](https://choosealicense.com/licenses/mit/)
