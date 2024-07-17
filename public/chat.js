// Make connection
var socket = io.connect('http://localhost:4000'); // io نقوم بجلبها من مكتبة socket.io-client في ملف index.html

// Query DOM
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', { // بواسطة emit نقوم بارسال البيانات من العميل الى الخادم عبر WebSockets
        message: message.value,
        handle: handle.value
    });
  });
  
  // Listen for events
  socket.on('chat', function(data){ // استقبال البيانات المرسلة من الخادم
      output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`; // عرض تلك البيانات في الواجهة الامامية
  });