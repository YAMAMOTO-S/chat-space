$(function() {
  
  var buildHTML = function(message) {
    if(message.content && message.image) {
      var html = `<div class="right__main__box" data-message-id=` + message.id +`>`+
                    `<div class="right__main__namebox">` +
                        `<div class="right__main__namebox__name">` +
                        message.user_name +
                        `</div>` +
                    `<div class="right__main__namebox__date">` +
                    message.created_at +
                    `</div>` +
                    `</div>` +
                    `<div class="right__main__message">` +
                      `<p>` +
                      message.content +
                      `</p>` +
                      `<img class="lower-message__image" src= "` +message.image + `">` +
                    `</div>` +
                    `</div>`
    } else if (message.content) {
      var html = `<div class="right__main__box" data-message-id=` + message.id +`>`+
                    `<div class="right__main__namebox">` +
                        `<div class="right__main__namebox__name">` +
                        message.user_name +
                        `</div>` +
                    `<div class="right__main__namebox__date">` +
                    message.created_at +
                    `</div>` +
                    `</div>` +
                    `<div class="right__main__message">` +
                      `<p>` +
                      message.content +
                      `</p>` +
                    `</div>` +
                    `</div>`
    } else if (message.image){
      var html = `<div class="right__main__box" data-message-id=` + message.id +`>`+
                    `<div class="right__main__namebox">` +
                        `<div class="right__main__namebox__name">` +
                        message.user_name +
                        `</div>` +
                    `<div class="right__main__namebox__date">` +
                    message.created_at +
                    `</div>` +
                    `</div>` +
                      `<img class="lower-message__image" src= "` + message.image + `">` +
                    `</div>` +
                    `</div>`
    }
    return html;
  }; 



  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.right__main__box:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.right__main').append(insertHTML)
        $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('err');
    });
  };

  // function buildHTML(message) {
  //   if (message.image) {
  //     var html = `
  //     <div class="right__main__box" data-message-id=` + message.id`>
  //       <div class="right__main__namebox">
  //       <div class="right__main__namebox__name">
  //       ${message.user_name}
  //       </div>
  //       <div class="right__main__namebox__date">
  //       ${message.created_at}
  //       </div>
  //       </div>
  //       <div class="right__main__message">
  //         <p>
  //         ${message.content}
  //         </p>
  //         <img class="lower-message__image" src=${message.image} >
  //       </div>
  //     </div>`
  //     return html;
  //   } else {
  //     var html = `
  //     <div class="right__main__box" data-message-id=` + message.id`>
  //       <div class="right__main__namebox">
  //         <div class="right__main__namebox__name">
  //         ${message.user_name}
  //         </div>
  //         <div class="right__main__namebox__date">
  //         ${message.created_at}
  //         </div>
  //       </div>
  //       <div class="right__main__message">
  //         <p>
  //         ${message.content}
  //         </p>
  //       </div>
  //     </div>`
  //   }
  //   return html;
  // }

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
    })
    .fail(function() {
      alert("失敗")
    })
    .always(function() {
      $('.right__form__input--submit').prop('disabled', false);
    })
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});