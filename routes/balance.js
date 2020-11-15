var express = require('express');
var router = express.Router();
const request = require('request');
const apiUrl = process.env.APIURL || "http://localhost:3000"

/* GET balance. */
router.get('/get', function(req, res, next) {
  const options = {
    method: 'GET',
    url: apiUrl + "/balance",
    json: true,
  };
  request(options, function(error, response, body) {
    res.render('balanceGet', {title: "GET balance", body: body});
  });
});


module.exports = router;
