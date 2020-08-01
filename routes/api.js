const express = require('express');
const axios = require('axios')
const router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();
const CSVToJSON = require('csvtojson');
const BlogPost = require('../models/blogPost');


// Routes
router.get('/', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/save', (req, res) => {
    const data = req.body;
    console.log("Send to server")
    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({msg: 'Sorry, internal server errors'});
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});



router.get('/name', (req, res) => {
    const data = {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});


router.get('/clothes', (rew, res) => {
    axios.get("https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil").then(r => {
        return res.json(r.data)})
})

router.get('/news', (rew, res) => {
    let rss = "http://feeds.bbci.co.uk/news/rss.xml#"
    let news_feed = parser.parseURL(rss).then((data)=>{
        console.log(data)
        res.json(data)
    })


        // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        // .then(data => console.log(data))
    // res.json(news_feed)
})

router.get('/sports', (rew, res) => {
    CSVToJSON().fromFile('./football.csv')
    .then(football => {

        // users is a JSON array
        // log the JSON array
        console.log(football);
        res.json(football)
    }).catch(err => {
        // log error if anya
        console.log(err);
    });


        // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        // .then(data => console.log(data))
    // res.json(news_feed)
})


module.exports = router;