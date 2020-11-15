var express = require('express');
var router = express.Router();
const request = require('request');
const apiUrl = process.env.APIURL || "http://localhost:3000"

/* GET transactions listing. */
router.get('/get', function(req, res, next) {
  const options = {
    method: 'GET',
    url: apiUrl + "/transactions",
    json: true,
  };
  request(options, function(error, response, body) {
    res.render('transactionsGet', {title: "GET transactions", body: body});
  });
});

/* Go to POST transactions page. */
router.get('/post', function(req, res, next) {
  const options = {
    method: 'GET',
    url: apiUrl + "/users",
    json: true,
  };
  request(options, function(error, response, body) {
    res.render('transactionsPost', {title: "POST transactions", body: body});
  });
});

/* POST transactions. */
router.post('/post/submit', function(req, res, next) {
  console.log(req.body);
  const options = {
    method: 'POST',
    url: apiUrl + "/transactions",
    json: req.body,
  };
  request(options, function(error, response, body) {
    console.log(body);
    res.render('transactionsPostSubmit', {title: "POST transactions - completed", body: body});
  });
});

/* Go to PATCH transactions page. */
router.get('/patch', function(req, res, next) {
  const options = {
    method: 'GET',
    url: apiUrl + "/transactions",
    json: true,
  };
  request(options, function(error, response, body) {
    res.render('transactionsPatch', {title: "PATCH transactions", body: body});
  });
});

/* Go to PATCH transactions page. */
router.post('/patch/edit', function(req, res, next) {
  const optionsUser = {
    method: 'GET',
    url: apiUrl + "/users",
    json: true,
  };
  const optionsTrx = {
    method: 'GET',
    url: apiUrl + "/transactions/" + req.body.id,
    json: true,
  };
  request(optionsUser, function(error, response, bodyUser) {
    request(optionsTrx, function(error, response, bodyTrx) {
      res.render('transactionsPatchEdit', {title: "PATCH transactions", users: bodyUser, transactions: bodyTrx});
    });
  });
});

/* PATCH transactions. */
router.post('/patch/submit', function(req, res, next) {
  const id = req.body.id;
  delete req.body.id;
  const options = {
    method: 'PATCH',
    url: apiUrl + "/transactions/" + id,
    json: req.body,
  };
  request(options, function(error, response, body) {
    res.render('transactionsPostSubmit', {title: "PATCH transactions - completed", body: body});
  });
});


/* Go to DELETE transactions page. */
router.get('/delete', function(req, res, next) {
  res.render('transactionsDelete', {title: "DELETE transactions"});
});

/* DELETE transactions. */
router.post('/delete/submit', function(req, res, next) {
  console.log(req.body);
  const options = {
    method: 'DELETE',
    url: apiUrl + "/transactions/" + req.body.name,
    json: true,
  };
  request(options, function(error, response, body) {
    console.log(body);
    res.render('transactionsDeleteSubmit', {title: "DELETE transactions - completed", body: {name: req.body.name}});
  });
});

module.exports = router;
