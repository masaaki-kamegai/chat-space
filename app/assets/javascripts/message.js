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
});
