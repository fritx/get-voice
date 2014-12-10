var getVoice = require('./')
var fs = require('fs')
var path = require('path')
var assert = require('assert')

describe('get-voice', function(){

  it('gets zh-CN voice', function(done){
    getVoice('你是风儿我是啥', function(err, buf){
      assert.equal(err, null)
      assert(Buffer.isBuffer(buf))
      checkVoice(buf, 7632)
      fs.writeFileSync(f('./1.mp3'), buf)
      done()
    })
  })

  it('gets en voice', function(done){
    getVoice('i love you so much', function(err, buf){
      assert.equal(err, null)
      assert(Buffer.isBuffer(buf))
      // 6912, 6480, 7776
      checkVoice(buf, 7776)
      fs.writeFileSync(f('./2.mp3'), buf)
      done()
    })
  })

  it('throws empty text', function(done){
    getVoice('', function(err, buf){
      assert(err, /empty text/)
      done()
    })
  })

  it('gets empty voice', function(done){
    getVoice(' ', function(err, buf){
      assert.equal(err, null)
      assert(Buffer.isBuffer(buf))
      checkVoice(buf, 864)
      fs.writeFileSync(f('./3.mp3'), buf)
      done()
    })
  })

  // https://github.com/fritx/get-voice/pull/1
  // thanks @truerenton
  it('supports lang param', function(done){
    getVoice('я люблю тебя так сильно', 'ru', function(err, buf){
      assert.equal(err, null)
      assert(Buffer.isBuffer(buf))
      assert.equal(buf.length, 8064)
      fs.writeFileSync(f('./3.mp3'), buf)
      done()
    })
  })

})


function checkVoice(buf, len) {
  assert.ok(
    Math.abs(buf.length - len) < len*0.2
  )
}

function f(pth){
  return path.resolve(__dirname, pth)
}