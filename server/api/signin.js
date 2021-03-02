const express = require('express');
const router = express.Router();
const rp = require('request-promise');
let generateToken = require('../utilities/generateToken');
let getUser = require('../utilities/getUser')


router.get('/signin/callback', async function (req, res) {

    try {
        var options = {
            url: `https://${req.query.auth_server_url}/auth/oauth2/token`,
            method: `POST`,
            form: {
                grant_type: "authorization_code",
                code: req.query.code,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        var page = req.query.page;
        var home = req.query.home;
        var topicid = req.query.topic;

        //Generate access token
        let generate = await rp(options);
        let profile = await getUser(generate, req.query.auth_server_url);

        //adding expiration to the token
        profile.exp = Math.floor(Date.now() / 1000) + (60 * 60);
        
        // Creating a token to store in cookie
        await generateToken(res, profile);
        
        res.redirect('http://localhost:3000/');

    } catch (error) {
        console.log(error)
        console.log("Could not sign in");
    }

});

module.exports = router;