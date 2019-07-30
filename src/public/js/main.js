$(function(){
    const socket = io();

    // obteniendo elementos de form desde la interfaz
    const $messageForm = $('#message-form');
    const $mesaageBox = $('#message');
    const $chat = $('#chat');

    // obteniendo elementos de form desde la nicknameform
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#usernames');

    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                <div class="alert alert-danger">
                    Ese usuario ya existe
                </div>
                `)
            }

            $nickname.val('');
        });
    });

    // capturar eventos
    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', $mesaageBox.val());
        $mesaageBox.val('');
    });

    socket.on('new message', function(data){
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '</br>');
    });

    socket.on('usernames', data => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<p>${data[i]}</p>`         
        }
        $users.html(html);   
    });
})