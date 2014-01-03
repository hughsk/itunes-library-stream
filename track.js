module.exports = Track

var trackKeys = [
    'Track ID'
  , 'Name'
  , 'Artist'
  , 'Album Artist'
  , 'Album'
  , 'Genre'
  , 'Kind'
  , 'Size'
  , 'Total Time'
  , 'Track Number'
  , 'Year'
  , 'Date Modified'
  , 'Date Added'
  , 'Bit Rate'
  , 'Sample Rate'
  , 'Comments'
  , 'Play Count'
  , 'Play Date'
  , 'Play Date UTC'
  , 'Persistent ID'
  , 'Track Type'
  , 'Location'
  , 'File Folder Count'
  , 'Library Folder Count'
]

var trackKeyCount = trackKeys.length
function Track() {
  for (var i = 0; i < trackKeyCount; i++) {
    this[trackKeys[i]] = null
  }
}

Track.prototype.active = function() {
  for (var i = 0; i < trackKeyCount; i++) {
    if (this[trackKeys[i]] !== null) return true
  }
}
