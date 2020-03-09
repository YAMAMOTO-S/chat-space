$(function() {
  function buildHTML(message) {
    if (message.image) {
      var html = `
      <div class="right__main__namebox">
        <div class="right__main__namebox__name">
        ${message.user_name}
        </div>
        <div class="right__main__namebox__date">
        ${message.created_at}
        </div>
      </div>
      <div class="right__main__message">
        <p>
        ${message.content}
        </p>
        <img class="lower-message__image" src=${message.image} >
      </div>`
      return html;
    } else {
      var html = `
      <div class="right__main__namebox">
        <div class="right__main__namebox__name">
        ${message.user_name}
        </div>
        <div class="right__main__namebox__date">
        ${message.created_at}
        </div>
      </div>
      <div class="right__main__message">
        <p>
        ${message.content}
        </p>
      </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.right__main').append(html);
      $('form')[0].reset();
      $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight});
      $('.right__form__input--submit').prop('disabled', false);
    })
    .fail(function() {
      alert("失敗")
    })
  });

});