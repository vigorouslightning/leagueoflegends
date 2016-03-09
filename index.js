var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.resolve('./')));

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'client', 'views') }); 
});

var port = process.env.PORT || 8000;

app.listen(port, function(){
    console.log('listening on port:' + port);
});