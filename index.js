// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const date_string = req.params.date;
  if( isUTCFormat(date_string)) {
    res.json({ unix: parseInt(date_string), utc:convertUTCStringToDate(date_string) })
  }
  else if(isNaN( new Date(date_string) ) ) {
    res.json({ error : "Invalid Date" })
  }
  else {
    const newDate = new Date(date_string);
    res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});
  }

});

app.get("/api/", function (req, res) {
    const newDate = new Date();
    res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});

});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function isUTCFormat(str) {
  // Check if the string consists only of digits and has a length of 13 (milliseconds)
  const utcRegex = /^\d{13}$/;
  return utcRegex.test(str);
}

function convertUTCStringToDate(utcString) {
  const date = new Date(parseInt(utcString, 10));
  return date.toUTCString();
}
