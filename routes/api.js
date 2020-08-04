const express = require('express');
const axios = require('axios')
const router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();
const CSVToJSON = require('csvtojson');
let User = require('../models/User');
let UserSession = require('../models/UserSession');
let Todo = require('../models/Todo');
let ImagePost = require('../models/ImagePost');
const puppeteer = require('puppeteer');
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

router.post("/file/", upload.single("imagePost"), (req, res, next) => {

    const {filename: image} = req.file
    sharp(req.file.path)
        .resize(280)
        .jpeg({quality: 50})
        .toFile(
            path.resolve(req.file.destination, 'resized', image)
        ).then(() => {


        const imagePost = new ImagePost({
            userId: req.body.userId,
            image_loc: "\\uploads\\" + image,
            image_sm_loc: "\\uploads\\resized\\" + image
        })
        imagePost.save().then(result => {

            res.status(201).json({
                message: "Image Uploaded Successful"
            })
        }, (err) => {
            console.log(err)
            res.json({
                message: "Server error:" + err,
                success: false
            })
        })

    }, (err) => {
        console.log(err)
        res.json({
            message: "Server error:" + err,
            success: false
        })
    })


})

router.get("/file/", (req, res, next) => {
    let {query} = req
    let {userId} = query

    ImagePost.find(
        {userId: userId},
        (err, imagePosts) => {
            if (err) {
                return res.send({success: false, message: 'Server error'})
            } else {
                return res.json({success: true, data: imagePosts})
            }
        })
})

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
                username: username,
                userId: user._id
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

            User.findById(session.userId).then((user) =>
                res.send({
                        success: true,
                        message: 'Good',
                        user: user,
                        userId: session.userId
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

router.post("/todo/new", (req, res) => {
    const {body} = req
    let {title, notes, completed, userId} = body;

    const newTodo = new Todo();
    newTodo.title = title
    newTodo.notes = notes
    newTodo.completed = completed
    newTodo.userId = userId
    newTodo.save((err, todos) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error, server error"
            })
        }
        return res.send({
            success: true,
            message: "Todo Created",
            todos: todos
        })
    })
})

router.post("/todo/delete", (req, res) => {
    const {body} = req
    console.log(body)
    let {todoId} = body;
    console.log(todoId)
    console.log("deleting")
    Todo.deleteOne({_id: todoId}, (err, todos) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        } else {
            return res.send({
                success: true,
                message: 'Good',
            })
        }

    })
})

router.post("/todo/updatetitle", (req, res) => {
    console.log("update title")
    const {body} = req
    let {_id, title} = body;
    console.log("new title")
    console.log(title)
    Todo.updateOne({_id: _id}, {$set: {title: title}}, (err, todos) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        } else {
            return res.send({
                success: true,
                message: 'Good',
                todos: todos
            })
        }

    })
})

router.post("/todo/updatenotes", (req, res) => {
    console.log("update notes")
    const {body} = req
    let {_id, notes} = body;
    console.log("new notes")
    console.log(notes)
    Todo.updateOne({_id: _id}, {$set: {notes: notes}}, (err, todos) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        } else {
            return res.send({
                success: true,
                message: 'Good',
                todos: todos
            })
        }

    })
})

router.post("/todo/updatecompleted", (req, res) => {
    console.log("update completed")
    const {body} = req
    let {_id, completed} = body;
    console.log("new completed")

    Todo.updateOne({_id: _id}, {$set: {completed: completed}}, (err, sessions) => {
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


router.post("/todo", (req, res) => {
    console.log("get todos")
    const {body} = req
    let {userId} = body;

    console.log("id:" + userId)
    console.log(body)
    Todo.find({
        userId: userId
    }, ((err, docs) => {
        if (err) {
            res.send({
                success: false,
                message: err,

            })
        } else {
            res.json(docs)
        }
    }))

})


module.exports = router;

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}