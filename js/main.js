/* global data */
/* exported data */
var $img = document.querySelector('img');
// var $inputTitle = document.querySelector('input[type="text"]');
var $inputUrl = document.querySelector('input[type="url"]');
// var $notes = document.querySelector('textarea');
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
    nextEntryId: data.nextEntryId++
  };
  data.entries.push(inputValues);
  $img.src = 'images/placeholder-image-square.jpg';
  $journalForm.reset();
}

$inputUrl.addEventListener('input', updatePhoto);
$journalForm.addEventListener('submit', submission);
