$(function(){
  function buildHTML(message){
    var addImage = (message.image.url !== null)? `<img src=${message.image.url} >` : ''
    var html = `<div class ="message" data-id= ${message.id}>
                  <div class ="message__top-info">
                    <p class="message__top-info__user-name">${message.user_name}</p>
                    <p class="message__top-info__date">${message.date}</p>
                  </div>
                  <p class="message__message-text">${message.content}</p>
                  <p class = "user-image">${addImage}</p>
                </div>`
    return html;
   }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
     alert('error');
    });
    return false;
  });
  
  //  以下　自動更新
  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data('id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
          messages.forEach(function(message){
          var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
      alert('自動更新に失敗しました');
      });
    };
  };
    setInterval(reloadMessages, 5000);
});