var express = require('express')
, app = express();

var postToLJ = function(req, res, next) {
    res.redirect(307, 'http://www.livejournal.com' + req.path);
};

app.post('/interface/xmlrpc', postToLJ);

app.use(express.static('www'));

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
