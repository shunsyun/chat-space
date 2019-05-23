$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img src=${message.image} >` : ''
    var html = `<div class ="message" id = ${message.id}>
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
});