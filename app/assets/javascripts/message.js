$(function(){
    function buildHTML(messagelist){
     if ( messagelist.image ) {
       var html =
        `<div class="main_chat__messagelist__contents" data-message-id=${messagelist.id}>
           <div class="main_chat__messagelist__contents__info">
             <div class="main_chat__messagelist__contents__info__talker">
               ${messagelist.user_name}
             </div>
             <div class="main_chat__messagelist__contents__info__date">
               ${messagelist.created_at}
             </div>
           </div>
           <div class="main_chat__messagelist__contents__info">
             <p class="main_chat__messagelist__contents__text">
               ${messagelist.content}
             </p>
           </div>
           <img src=${messagelist.image} >
         </div>`
       return html;
     } else {
      var html =
      `<div class="main_chat__messagelist__contents" data-message-id=${messagelist.id}>
         <div class="main_chat__messagelist__contents__info">
           <div class="main_chat__messagelist__contents__info__talker">
             ${messagelist.user_name}
           </div>
           <div class="main_chat__messagelist__contents__info__date">
             ${messagelist.created_at}
           </div>
         </div>
         <div class="main_chat__messagelist__contents__info">
           <p class="main_chat__messagelist__contents__text">
             ${messagelist.content}
           </p>
         </div>
       </div>`
     }  return html;
    };
   

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
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
        $('.main_chat__messagelist').append(html);
        $('#new_message')[0].reset();
        $('.main_chat__messagelist').animate({ scrollTop: $('.main_chat__messagelist')[0].scrollHeight});
        $('.main_chat__messageform__box__right').attr('disabled', false)
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    });

    var reloadMessages = function() {
      var last_message_id = $('.main_chat__messagelist__contents:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
          });
          $('.main_chat__messagelist').append(insertHTML);
          $('.main_chat__messagelist').animate({ scrollTop: $('.main_chat__messagelist')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      })
    }

if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}


})