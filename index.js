var express = require('express'),
    http = require('http'),
    redis = require('redis');

var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'myapp', streams: [{path: '/var/log/myapp.log'}]});

var app = express();

var client = redis.createClient('6379', 'redis');

app.get('/', function(req, res, next) {
    client.incr('counter', function(err, counter) {
        if(err) return next(err);
        log.info('Counter was incremented to: ' + counter);
        res.set('Content-Type', 'text/html');
        res.send('<h2>This page has been viewed ' + counter + ' times!</h2>');
    });
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
    console.log('Listening on port ' + (process.env.PORT || 8080));
});