## WCASG ADA Widget

### Type Checking with Flow

[Flow](https://flow.org/en/) is a static type checker that runs as a background process and analyzes project code on the fly, alerting you to any issues.  Anyone that has used TypeScript will find Flow quite similar and easy to use.

Run `npm run flow` to start the flow server and scan for issues.

For more info see: https://flow.org/en/

### Manual Testing

1. Visit a web page to be tested.
2. Copy raw contents from [build/index.js](http://gitlab.solarixdigital.com/solarix/wcasg-ada-app/raw/master/build/index.js).
3. Paste into Chrome Dev Tools.
  - Alternatively, create Bookmarklet that loads raw `build/index.js` content.
  - Alternatively, use local Git clone'd copy by adding `build/index.js` to `Chrome Dev Tools > Filesystem > Workspace`, then `Ctrl + A` to select and `Ctrl + Shift + E` to execute on current page.
