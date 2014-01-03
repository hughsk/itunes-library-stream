// @todo fully implement playlists,
// they need to handle <array> nodes
// in the XML input...
module.exports = Playlist

var listKeys = [
    'Name'
  , 'Playlist ID'
  , 'Playlist Persistent ID'
  , 'All Items'
  , 'Playlist Items'
  , 'Distinguished Kind'
  , 'Smart Info'
  , 'Smart Criteria'
  , 'TV Shows'
  , 'Master'
  , 'Visible'
  , 'Music'
  , 'Podcasts'
  , 'Movies'
  , 'iTunesU'
  , 'Audiobooks'
  , 'Purchased Music'
]

var listKeyCount = listKeys.length
function Playlist() {
  for (var i = 0; i < listKeyCount; i++) {
    this[listKeys[i]] = null
  }
}

Playlist.prototype.active = function() {
  for (var i = 0; i < listKeyCount; i++) {
    if (this[listKeys[i]] !== null) return true
  }
}
