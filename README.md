# Bsats for stacker.news

[Stacker News](https://stacker.news) is like Hacker News but we pay you Bitcoin. Bsats is an unofficial ios / android app for stacker.news.

You can download the app from:

[Apple Store](https://apps.apple.com/app/id6443531395?platform=iphone)  
[Google Play](https://play.google.com/store/apps/details?id=xyz.bsats.app&hl=en_US&gl=US)

For android users, you can alsoe download the apk from releases.

# Local Development (mac)

1. npm install -g expo-cli
2. npm install
3. npm run ios

# Tech Stack

This app is written with [react native](https://reactnative.dev/) + [expo](https://docs.expo.dev/)

# How to publish

```
// ios
eas build --platform ios
eas submit -p ios

// android
eas build --platform android
eas submit -p android
```

# Contributing

Pull requests are welcome. Please submit feature requests and bug reports through issues.

# License

[MIT](https://choosealicense.com/licenses/mit/)
