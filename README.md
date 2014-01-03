# itunes-library-stream [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/itunes-library-stream&title=itunes-library-stream&description=hughsk/itunes-library-stream%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Streaming parser for the contents of iTunes Library XML files. Supports
retrieving the complete library track listing, but playlist listings *aren't
complete yet*.

Should be useful for either ditching iTunes programatically or at least mucking
around with its data.

## Usage ##

[![itunes-library-stream](https://nodei.co/npm/itunes-library-stream.png?mini=true)](https://nodei.co/npm/itunes-library-stream)

### `itunes.createTrackStream()` ###

Creates a transform stream which takes raw XML data and spits out JSON objects
for each discovered track.

``` javascript
var itunes = require('itunes-library-stream')
var userhome = require('userhome')
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
```

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/itunes-library-stream/blob/master/LICENSE.md) for details.
