$(function() {
  var search_list = $("#user-search-result")

  function  appendMember(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
    search_list.append(html);
  }

  function  appendErr(){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    search_list.append(html);          
}


  $('#user-search-field').on('keyup', function() {
    let input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: "/users",
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users) {
      $('#user-search-result').empty();

      if(users.length !== 0) {
        users.forEach(function(user) {
          appendMember(user);
        });
      }
      else if(input.length == 0) {
        return false;
      } else {
        appendErr();
      }
    })
    .fail(function() {
      alert("検索に失敗しました")
    });
  });
});