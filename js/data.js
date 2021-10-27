/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousSumbitsStore = localStorage.getItem('javascript-local-storage');

function storeData(event) {
  var previousSubmitsJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', previousSubmitsJSON);
}

if (previousSumbitsStore !== null) {
  data.entries = JSON.parse(previousSumbitsStore);
}

window.addEventListener('beforeunload', storeData);
