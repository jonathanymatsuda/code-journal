/* global data */

var $img = document.querySelector('img');
var $inputUrl = document.querySelector('input[type="url"]');
var $journalForm = document.querySelector('#journal-form');
var $ul = document.querySelector('#entries-list');

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

window.addEventListener('DOMContentLoaded', entryTreeCreation);
