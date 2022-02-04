var express = require('express');
var router = express.Router();
var https = require('https');


/* GET users listing. */
router.get('/me/calendar-events', function(req, res, next) {
  var options = {
  host: 'teams.microsoft.com',
  path: `/api/mt/emea/beta/me/calendarEvents?StartDate=${req.query['StartDate']}&EndDate=${req.query['EndDate']}`
};

callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    res.statusCode = response.statusCode;
    res.send(str);
  });
}

options.headers = {'authorization' :  req.headers['authorization']}

https.request(options, callback).end();
});

module.exports = router;
