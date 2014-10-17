var request = require('request')

module.exports = function(text, lang, cb){
  var isFunc = typeof lang === 'function';
  cb = isFunc ? lang : cb;
  if(!lang || isFunc) {
    lang = detectLang(text);
  }

  // fix empty text
  // for a 1K empty voice
  //if (!text) text = ' '

  // throw for empty text
  if (!text) {
    return cb(new Error('empty text'))
  }

  // fetches voice
  request({
    url: getUrl(text, lang),
    encoding: null  // for buffer
  }, function(err, res, buf){
    if (err) return cb(err)
    if (!/^audio\//.test(res.headers['content-type'])) {
      return cb(new Error('no audio'))
    }
    cb(null, buf)
  })
}

function detectLang(text) {
  return /^[a-z]/i.test(text) ? 'en' : 'zh-CN';
}

function getUrl(text, lang){
  // build google url
  var url = [
    'http://translate.google.cn/translate_tts?ie=UTF-8&q=',
    text,
    '&tl=' + lang
  ].join('')
  return url
}
