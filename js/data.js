/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousSubmits = localStorage.getItem('entries-data');
var $applicationView = document.querySelectorAll('.application-view');

function storeData(event) {
  var previousSubmitsJSON = JSON.stringify(data);
  localStorage.setItem('entries-data', previousSubmitsJSON);
}

function switchViews(viewName) {
  for (var view = 0; view < $applicationView.length; view++) {
    if ($applicationView[view].getAttribute('data-view') === viewName) {
      $applicationView[view].className = 'application-view';
    } else {
      $applicationView[view].className = 'hidden application-view';
    }
  }
  data.view = viewName;
}

if (previousSubmits !== null) {
  data = JSON.parse(previousSubmits);
  switchViews(data.entries);
}

window.addEventListener('beforeunload', storeData);
