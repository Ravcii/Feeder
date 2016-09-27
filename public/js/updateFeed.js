var socket = io();

var sendData = function(uid) {
    var text = document.getElementById('postText').value;
    if (text != '') {
        socket.emit('post added', {_id: uid, text: text});
        text = "";
    }
};

socket.on('update feed', function (html) {
    document.getElementById('feed').innerHTML = html + document.getElementById('feed').innerHTML;
    document.getElementById('postText').value = "";
});