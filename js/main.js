/* global data */

var $img = document.querySelector('img');
var $inputUrl = document.querySelector('input[type="url"]');
var $journalForm = document.querySelector('#journal-form');
var $submissions = document.querySelector('#submissions');
var $ul = document.querySelector('#entries-list');
var $navItem = document.querySelector('.nav-item');
var $newButton = document.querySelector('.new-button');

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
  var renderedEntries = renderEntries(inputValues);
  $ul.prepend(renderedEntries);
  data.entries.unshift(inputValues);
  $img.src = 'images/placeholder-image-square.jpg';
  $journalForm.reset();
}

function renderEntries(entries) {
  var $li = document.createElement('li');

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $li.appendChild($divRow);

  var $divColHalfOne = document.createElement('div');
  $divColHalfOne.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalfOne);

  var $img = document.createElement('img');
  $img.setAttribute('src', entries.photo);
  $img.setAttribute('alt', 'journal-image');
  $img.setAttribute('class', 'input-box-width border-radius');
  $divColHalfOne.appendChild($img);

  var $divColHalfTwo = document.createElement('div');
  $divColHalfTwo.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalfTwo);

  var $h2 = document.createElement('h2');
  var $h2TextContent = document.createTextNode(entries.title);
  $divColHalfTwo.appendChild($h2);
  $h2.appendChild($h2TextContent);

  var $paragraph = document.createElement('p');
  var $paragraphText = document.createTextNode(entries.notes);
  $divColHalfTwo.appendChild($paragraph);
  $paragraph.appendChild($paragraphText);

  return $li;
}

function entryTreeCreation(event) {
  for (var entry = 0; entry < data.entries.length; entry++) {
    renderEntries(data.entries[entry]);
    $ul.appendChild(renderEntries(data.entries[entry]));
  }
}

function loadSubmissions(event) {
  $journalForm.className = 'hidden';
  $submissions.className = '';
  $ul.className = '';
  data.view = 'entries';
}

function loadEntryForm(event) {
  $journalForm.className = '';
  $submissions.className = 'hidden';
  $ul.className = 'hidden';
  data.view = 'entry-form';
}

$inputUrl.addEventListener('input', updatePhoto);
$journalForm.addEventListener('submit', submission);
window.addEventListener('DOMContentLoaded', entryTreeCreation);
$navItem.addEventListener('click', loadSubmissions);
$newButton.addEventListener('click', loadEntryForm);
