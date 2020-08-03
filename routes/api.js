const express = require('express');
const axios = require('axios')
const router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();
const CSVToJSON = require('csvtojson');
let User = require('../models/user');
let UserSession = require('../models/UserSession');
let Todo = require('../models/Todo');
const puppeteer = require('puppeteer');

router.get('/clothes', (rew, res) => {
    axios.get("https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil").then(r => {
        return res.json(r.data)
    }).catch(err => {
        console.log(err);
    });
})

router.get('/news', (rew, res) => {
    let rss = "http://feeds.bbci.co.uk/news/rss.xml"
    parser.parseURL(rss).then((data) => {
        let queryUrl = data.items[0].link
        puppeteer.launch().then(browser => {
                browser.newPage().then(page => {
                    page.goto(queryUrl).then(() => {
                            page.$eval('img', img => img.src).then(imgs => {
                                    data.imgs = imgs
                                    res.json(data);
                                }
                            )
                        }
                    )

                })
            }
        )
    }).catch(err => {
        console.log(err);
    });


})

router.get('/sports', (rew, res) => {
    CSVToJSON().fromFile('./football.csv')
        .then(football => {
            res.json(football)
        }).catch(err => {
        console.log(err);
    });
})

router.post('/signup', (req, res) => {
    const {body} = req
    let {username, email, password, password_repeat} = body;
    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        })
    }
    if (username.length < 3) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be less than 3 character.'
        })
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: email cannot be blank.'
        })
    }
    if (!validateEmail(email)) {
        return res.send({
            success: false,
            message: 'Error: email is not valid.'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: password cannot be blank.'
        })
    }
    if (!password_repeat) {
        return res.send({
            success: false,
            message: 'Error: Confirm password cannot be blank.'
        })
    }
    if (password_repeat !== password) {
        return res.send({
            success: false,
            message: 'Error: Passwords do not match.'
        })
    }
    email = email.toLowerCase();
    username = username.toLowerCase();

    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({success: false, message: 'Server error'})
        } else if (previousUsers.length > 0) {
            return res.send({success: false, message: 'Account already exists'})
        }

        const newUser = new User();
        newUser.email = email
        newUser.username = username
        newUser.password = newUser.generateHash(password)
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error, server error"
                })
            }
            return res.send({
                success: true,
                message: "Signed up"
            })

        })


    })

})

router.post('/signin', (req, res) => {
    let {body} = req;
    let {
        username,
        password
    } = body;

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: password cannot be blank.'
        })
    }
    username = username.toLowerCase();
    User.find({username: username}, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error:server error"
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: "Error:User not found"
            });
        }
        let user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: "Error: Invalid password."
            })
        }
        let userSession = new UserSession();
        userSession.userId = user._id
        userSession.save((err, doc) => {
            if (err) {
                console.log(err)
                return res.send({
                    success: false,
                    message: "Error: Invalid password."
                })
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id,
                username: username
            })
        })

    })
})

router.get('/verify', (req, res) => {
    let {query} = req
    let {token} = query

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {

        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: sessions length = ' + sessions.length
            })
        } else {

            let session = sessions[0]
            console.log("FINDING")
            User.findById(session.userId).then((user) =>
                res.send({
                        success: true,
                        message: 'Good',
                        user: user
                    }
                ))


        }
    })
})

router.get('/logout', (req, res) => {
    let {query} = req
    let {token} = query

    UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {$set: {isDeleted: true}},
        null,
        (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                })
            }

        })

})

router.post("/todo/create", (req, res) => {
    const {body} = req
    let {title, notes, completed, userId} = body;

    const newTodo = new Todo();
    newTodo.title = title
    newTodo.notes = notes
    newTodo.completed = completed
    newTodo.userId = userId
    newTodo.save((err, todo) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error, server error"
            })
        }
        return res.send({
            success: true,
            message: "Todo Created"
        })
    })
})

router.post("/todo/update", (req, res) => {
    const {body} = req
    let {todoId, title, notes, completed} = body;
    let filter = {_id: todoId}
    let update = {
        title: title,
        notes: notes,
        completed: completed,
    }
    let updated = Todo.findOneAndUpdate(filter, update, {new: true})


    res.send({
        success: true,
        message: "Good",
        update: updated
    })


})

router.get("/todo", (req, res) => {
    const {body} = req
    let {userId} = body;
    Todo.find({
        userId: userId
    }, (err, todos) => {
        if (err) {
            return res.send({success: false, message: 'Server error'})
        } else {
            return res.send(todos)
        }
    })
})


module.exports = router;

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}