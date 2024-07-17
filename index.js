const express = require('express');

// App setup
const app = express();
const PORT = 4000;

// Static files
app.use(express.static('public')); // سيبحث في المجلد public عن ملف ثابت والذي ينتهي بالامتداد .html



// listen for requests
app.listen(PORT, () => {
    console.log('listening for requests on port', PORT)
  })
