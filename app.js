$(function() {
  var form = $('#username-form');
  var usernameInput = form.find('#input-username');

  form.on('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(form, usernameInput); 
  });
});

function handleFormSubmit(form, usernameInput) {
  removeAllMessages(form);
  
  var username = usernameInput.val(); 
  if (!usernameValidatorRefactored(username)) {
    usernameInput.after(createMessage('You have entered an invalid username', 'error'));
    return;
  }

  form.append(createMessage('Loading...', 'loading'));

  var url = form.attr('action');
  sendPostData(url, {
    username : username
  }).done(function() {
    removeAllMessages(form);
    form.append(createMessage('You have registered successfully', 'success'));
  });
}

function createMessage(message, type) {
  return $('<div class="message ' + type + '"></div>').html(message);
}

function removeAllMessages(form) {
  var errors = form.find('.message');
  for(var i=0;i<errors.length;i++) {
    errors[i].remove();
  }
}

function sendPostData(url, data) {
  return jQuery.ajax({
    type: 'POST',
    url: url,
    data : data
  });
}
