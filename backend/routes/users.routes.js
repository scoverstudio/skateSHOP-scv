/* eslint-disable quotes */
const express = require("express");
const router = express.Router();

const { expressjwt: expressJwt } = require("express-jwt");
var jwks = require("jwks-rsa");

var jwtCheck = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-jdg-80iv.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://dev.api.skateshop",
  issuer: "https://dev-jdg-80iv.us.auth0.com/",
  algorithms: ["RS256"],
});

const getMenagmentApiJwt = () => {
  var request = require("request");

  return new Promise(function (resolve, reject) {
    var options = {
      method: "POST",
      url: "https://dev-jdg-80iv.us.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      body: '{"client_id":"lc6k2WrDvRFsmF0CLZuejpa1tvBgcLLi","client_secret":"2PHS7ZfgO88uJknqSZ7AXv44Qw8Dwy-7W7DiPGRr8SGXgq07X1rWvuSv8A2Dhfii","audience":"https://dev-jdg-80iv.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
    };

    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

router.get("/userManifest", jwtCheck, function (req, res) {
  var request = require("request");
  getMenagmentApiJwt().then((data) => {
    const token = data.access_token;

    var options = {
      method: "PATCH",
      url: "https://dev-jdg-80iv.us.auth0.com/api/v2/users/" + req.auth.sub,
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: {
        app_metadata: {
          customerId: req.auth.sub,
        },
      },
      json: true,
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
  });
});

module.exports = router;
