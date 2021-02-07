# Relic
Digital Archaeology collection tool

## Concepts
1. Photogrammetry (lidar, drawing, AR measuring techniques)
1. Enabling/disabling features based on device (progressive)
1. Offline data store - upload data once a connection is detected
1. Customizable collection forms depending on site - allow users to create their own inputs based on a set of components (textfields, voice, lidar, etc)
1. Dashboard to view/analyze data
1. Create sites using mapping library
1. Logging notebook
1. Capable of push notifications

## Custom Components
1. Textfields
1. Long notes
1. Lidar scan
1. Photos
1. Videos
1. Numerical recording
1. Geotagging

# Commands
1. `amplify codegen models` to generate models

# Troubleshooting
- https://github.com/CocoaPods/CocoaPods/issues/10286
- `cd ios && pod install`
- Latest version of Flipper is breaking
- Changed `use_flipper!` to `use_flipper!({ 'Flipper-Folly' => '2.3.0' })`, remove Podfile.lock and then `pod install`
- If this updates, change back
- https://github.com/facebook/react-native/issues/30836
- https://stackoverflow.com/questions/31175697/react-native-doesnt-fill-up-window-on-ipad
