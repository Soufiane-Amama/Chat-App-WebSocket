// Make connection
var socket = io.connect('http://localhost:4000'); // io نقوم بجلبها من مكتبة socket.io-client في ملف index.html

// Query DOM
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


// Load messages from local storage on page load
window.addEventListener('load', function() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(data => {
        output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
    });
});

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', { // بواسطة emit نقوم بارسال البيانات من العميل الى الخادم عبر WebSockets
        message: message.value,
        handle: handle.value
    });
    message.value = "";
  });

// حدث الاستماع عند الكتابة في حقل الادخال message
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value); // ارسال للخادم اسم الشخص الذي يكتب
})
  
  // Listen for events
  socket.on('chat', function(data){ // استقبال البيانات المرسلة من الخادم
    // Retrieve messages from local storage
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    // Add new message
    messages.push(data);
    // Save messages back to local storage
    localStorage.setItem('messages', JSON.stringify(messages));
    // Update the chat output
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`; // عرض تلك البيانات في الواجهة الامامية
  });

  socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});