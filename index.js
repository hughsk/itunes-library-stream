var combiner = require('stream-combiner')
var userhome = require('userhome')
var through2 = require('through2')
var path = require('path')
var sax = require('sax')
var fs = require('fs')

var playlists = factory('playlists', require('./playlist'))
var tracks = factory('tracks', require('./track'))

module.exports = tracks
module.exports.createTrackStream = tracks

// not fully functional yet:
module.exports.createPlaylistStream = playlists

function factory(keyname, Entry) {
  return function createStream() {
    var xml = sax.createStream(false, {
        trim: false
      , normalize: false
      , lowercase: false
      , position: false
      , xmlns: true
    })

    var output = through2({ objectMode: true })
    var nothrough = through2({ objectMode: true }
      , function(chunk, enc, next) {
        next()
      })

    var currTrack = new Entry
    var depth = 0
    var trackParsing = true
    var keyParsing = false
    var keyBuffer = ''
    var trackKeyParsing = false
    var trackKeyBuffer = ''
    var trackKeyLatest = ''
    var trackValueParsing = false
    var trackValueBuffer = ''
    var trackKind

    xml.on('opentag', function(node) {
      var d = depth++
      if (d === 2 && node.name === 'KEY') {
        keyParsing = true
      }

      if (!trackParsing) return
      if (d === 3 && node.name === 'DICT') {
        if (currTrack.active()) output.push(currTrack)
        currTrack = new Entry
      } else
      if (d === 4 && node.name === 'KEY') {
        trackKeyParsing = true
      } else if (trackValueParsing) {
        trackKind = node.name
      }
    })
    xml.on('closetag', function(name) {
      var d = --depth
      if (trackValueParsing && d === 4) {
        if (trackKind) switch (trackKind) {
          case 'INTEGER': currTrack[trackKeyLatest] = parseInt(trackValueBuffer, 10); break
          case 'TRUE':    currTrack[trackKeyLatest] = true; break
          case 'FALSE':   currTrack[trackKeyLatest] = false; break
          case 'DATE':    currTrack[trackKeyLatest] = new Date(trackValueBuffer); break
          default:        currTrack[trackKeyLatest] = trackValueBuffer; break
        }
        trackValueParsing = false
        trackValueBuffer = ''
      } else
      if (d === 2 && name === 'KEY') {
        var key = keyBuffer.replace(/\s+/g, ' ').trim()
        keyParsing = false
        keyBuffer = ''
        trackParsing = key.toLowerCase() === keyname
      } else
      if (d === 4 && name === 'KEY') {
        trackKeyParsing = false
        trackKeyLatest = trackKeyBuffer
        trackKeyBuffer = ''
        trackValueParsing = true
      }
    })

    xml.on('text', function(text) {
      if (keyParsing) keyBuffer += text
      if (trackParsing && trackKeyParsing)   trackKeyBuffer += text
      if (trackParsing && trackValueParsing) trackValueBuffer += text
    })

    return combiner(
        xml
      , nothrough
      , output
    )
  }
}
