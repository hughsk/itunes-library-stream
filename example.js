var userhome = require('userhome')
var itunes = require('./')
var path = require('path')
var fs = require('fs')

// If you're not running OSX, update this
// to point to the correct file in your
// iTunes Library folder.
var location = path.resolve(userhome()
  , 'Music/iTunes/iTunes Music Library.xml'
)

fs.createReadStream(location)
  .pipe(itunes.createTrackStream())
  .on('data', function(data) {
    console.log('[' + data.Artist + '] ' + data.Name)
  })
