$(function () {
  var socket = io();
  console.log('start');
  var name='';
    $('form').submit(function(){
        name = $('#locate').val();
        console.log(name);
        $.getJSON('/search/'+name,  function (data){
            console.log(data);
            for(var i = 0 ; i < 20 ; i++){
              var nameBar = data.businesses[i].name;
              var imgUrl=data.businesses[i].image_url;
              var URL=data.businesses[i].url;
              var text=data.businesses[i].snippet_text;
              var count=data.businesses[i].c;
              var but='but'+i;
              var a="<div class='content'>"+
              "<a href="+URL+">" + nameBar + "</a>"+
              "<div class='row bar' id=" + i +">"+
                "<img class='img' src="+imgUrl+">"+"<button  id="+but+" name="+i+">"+count+"</button>"+
              "</div>"+  
              "<i>"+text+"</i>"+
              "</div>";
              $('#ds').append(a);
            }
        });
        $('#locate').val('');
        return false;
    });
    $('#ds').on('click','button', function(){
            var myName =  $(this).attr("name");
            console.log(myName);
            socket.emit('find', { city: name , myName: myName });
            socket.on('return', function(dl){
                console.log(dl);
                var count=dl.businesses[myName].c;
                $("#but"+myName).text(count);
      });
    });     
});

