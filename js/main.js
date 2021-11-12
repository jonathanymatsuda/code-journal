/* global data */
var $img = document.querySelector('img');
var $inputUrl = document.querySelector('input[type="url"]');
var $title = document.querySelector('input[type="text"]');
var $notes = document.querySelector('textarea');
var $journalForm = document.querySelector('#journal-form');
var $ul = document.querySelector('#entries-list');
var $navItem = document.querySelector('.nav-item');
var $newButton = document.querySelector('.new-button');
var $applicationView = document.querySelectorAll('.application-view');
var $noEntries = document.querySelector('.no-entries');
var $buttonRow = document.querySelector('.button-row');
var $deleteButton = document.querySelector('.delete-button');

function updatePhoto(event) {
  $img.src = $journalForm.elements.url.value;
}

function submission(event) {
  event.preventDefault();
  if (data.editing === null) {
    var inputValues = {
      title: $journalForm.elements.title.value,
      photo: $journalForm.elements.url.value,
      notes: $journalForm.elements.notes.value,
      entryID: data.nextEntryId++
    };
    var renderedEntries = renderEntries(inputValues);
    data.entries.unshift(inputValues);
    $ul.prepend(renderedEntries);
  } else {
    var updatedValues = {
      title: $title.value,
      photo: $inputUrl.value,
      notes: $notes.value,
      entryID: data.editing.entryID
    };
    var $li = document.querySelectorAll('li');
    for (var entry = 0; entry < data.entries.length; entry++) {
      if (data.editing.entryID === data.entries[entry].entryID) {
        data.entries[entry] = updatedValues;
      }
    }
    for (var liIndex = 0; liIndex < $li.length; liIndex++) {
      if (data.editing.entryID === parseInt($li[liIndex].getAttribute('data-entry-id'))) {
        var updatedEntries = renderEntries(updatedValues);
        $li[liIndex].replaceWith(updatedEntries);
      }
    }
  }
  $img.src = 'images/placeholder-image-square.jpg';
  $journalForm.reset();
  switchViews('entries');
  toggleNoEntryText();
}

function renderEntries(entries) {
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entries.entryID);

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

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fa fa-pen');
  $h2.appendChild($editIcon);

  var $paragraph = document.createElement('p');
  var $paragraphText = document.createTextNode(entries.notes);
  $divColHalfTwo.appendChild($paragraph);
  $paragraph.appendChild($paragraphText);

  return $li;
}

function entryTreeCreation(event) {
  for (var entry = 0; entry < data.entries.length; entry++) {
    $ul.appendChild(renderEntries(data.entries[entry]));
  }
  toggleNoEntryText();
  switchViews(data.view);
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

function loadSubmissions(event) {
  switchViews('entries');
}

function loadEntryForm(event) {
  switchViews('entry-form');
  data.editing = null;
}

function toggleNoEntryText() {
  if (data.entries.length > 0) {
    $noEntries.className = 'row text-align-center no-entries hidden';
  } else {
    $noEntries.className = 'row text-align-center no-entries';
  }
}

function editEntry(event) {
  if (event.target.tagName === 'I') {
    switchViews('entry-form');
    for (var entry = 0; entry < data.entries.length; entry++) {
      if (parseInt(event.target.closest('li').getAttribute('data-entry-id')) === data.entries[entry].entryID) {
        data.editing = data.entries[entry];
        $journalForm.elements.title.value = data.entries[entry].title;
        $journalForm.elements.url.value = data.entries[entry].photo;
        updatePhoto();
        $journalForm.elements.notes.value = data.entries[entry].notes;
      }
    }
  }
  $buttonRow.className = 'row button-row space-between align-items-center';
  $deleteButton.className = 'delete-button red-text';
}

$inputUrl.addEventListener('input', updatePhoto);
$journalForm.addEventListener('submit', submission);
window.addEventListener('DOMContentLoaded', entryTreeCreation);
$navItem.addEventListener('click', loadSubmissions);
$newButton.addEventListener('click', loadEntryForm);
$ul.addEventListener('click', editEntry);
