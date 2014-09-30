# get-voice

Get human voice from translate.google.cn

## Usage

```js
var getVoice = require('get-voice')
getVoice('Hello world', function(err, buf){
  // mp3 audio fetched
  fs.writeFileSync('./hello.mp3', buf)
})
```