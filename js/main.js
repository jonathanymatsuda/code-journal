/* global data */
/* exported data */
var $img = document.querySelector('img');
var $inputUrl = document.querySelector('input[type="url"]');
var $journalForm = document.querySelector('#journal-form');
function updatePhoto() {
  $img.src = $journalForm.elements.url.value;
}

$inputUrl.addEventListener('input', updatePhoto);
