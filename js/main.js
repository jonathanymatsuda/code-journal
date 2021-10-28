/* global data */

var $img = document.querySelector('img');
var $inputUrl = document.querySelector('input[type="url"]');
var $journalForm = document.querySelector('#journal-form');

function updatePhoto(event) {
  $img.src = $journalForm.elements.url.value;
}
function submission(event) {
  event.preventDefault();
  var inputValues = {
    title: $journalForm.elements.title.value,
    photo: $journalForm.elements.url.value,
    notes: $journalForm.elements.notes.value,
    entryID: data.nextEntryId++
  };
  data.entries.push(inputValues);
  $img.src = 'images/placeholder-image-square.jpg';
  $journalForm.reset();
}

$inputUrl.addEventListener('input', updatePhoto);
$journalForm.addEventListener('submit', submission);

// function createEntries(entries) {
var divDataView = document.createElement('div');
divDataView.setAttribute('data-view', 'entries');

var unorderedList = document.createElement('ul');
divDataView.view.appendChild(unorderedList);
// }
