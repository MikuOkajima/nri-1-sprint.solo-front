var express = require('express');
var router = express.Router();
const request = require('request');
const apiUrl = process.env.APIURL || "http://localhost:3000"

/* GET users listing. */
router.get('/get', function(req, res, next) {
  const options = {
    method: 'GET',
    url: apiUrl + "/users",
    json: true,
  };
  request(options, function(error, response, body) {
    res.render('usersGet', {title: "GET users", body: body});
  });
});

/* Go to POST users page. */
router.get('/post', function(req, res, next) {
  res.render('usersPost', {title: "POST users"});
});

/* POST users. */
router.post('/post/submit', function(req, res, next) {
  const options = {
    method: 'POST',
    url: apiUrl + "/users",
    json: req.body,
  };
  request(options, function(error, response, body) {
    console.log(body);
    res.render('usersPostSubmit', {title: "POST users - completed", body: body});
  });
});

/* Go to DELETE users page. */
router.get('/delete', function(req, res, next) {
  const options = {
    method: 'GET',
    url: apiUrl + "/users",
    json: true,
  };
  request(options, function(error, response, body) {
    res.render('usersDelete', {title: "DELETE users", body: body});
  });
});

/* DELETE users. */
router.post('/delete/submit', function(req, res, next) {
  console.log(req.body);
  const options = {
    method: 'DELETE',
    url: apiUrl + "/users/" + req.body.name,
    json: true,
  };
  request(options, function(error, response, body) {
    console.log(body);
    res.render('usersDeleteSubmit', {title: "DELETE users - completed", body: {name: req.body.name}});
  });
});

module.exports = router;
