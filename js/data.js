/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousSubmits = localStorage.getItem('entries-data');

function storeData(event) {
  var previousSubmitsJSON = JSON.stringify(data);
  localStorage.setItem('entries-data', previousSubmitsJSON);
}

if (previousSubmits !== null) {
  data = JSON.parse(previousSubmits);
}
window.addEventListener('beforeunload', storeData);
