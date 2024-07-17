const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const PORT = 4000;

// listen for requests
const server = app.listen(PORT, () => {
  console.log('listening for requests on port', PORT)
})

// Socket setup & pass server
const io = socket(server);

io.on('connection', (socket) => { // حدث الاتصال
  console.log('made socket connection', socket.id);
  
  // Handle chat event
  socket.on('chat', (data) => { // استقبال البيانات من العميل
      // console.log(data);
      io.sockets.emit('chat', data); // اعادة ارسال البيانات الى جميع مقابس العملاء المتصلين بغرفة الدردشة
  });
  
  // Handle typing event
  // socket.on('typing', (data) => {
  //     socket.broadcast.emit('typing', data);
  // });
});


// Static files
app.use(express.static('public')); // سيبحث في المجلد public عن ملف ثابت والذي ينتهي بالامتداد .html

