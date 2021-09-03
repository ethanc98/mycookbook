const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            // req.flash('success', 'Welcome to myCookbook!');
            res.redirect('/recipes');
        })
    } catch (e) {
        if (e.message.includes('E11000') && e.message.includes('email')) {
            e.message = 'Email aready in use'
        }
        if (e.message === 'User validation failed: email: Path `email` is required.') {
            e.message = 'No Email was given'
        }
        if (e.message === 'User validation failed: email: Invalid email.') {
            e.message = 'Please provide a valid email'
        }
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const user = req.user._id;
    res.redirect('/recipes');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')

});

router.get('/forgot', (req, res) => {
    res.render('users/forgot');
});

router.post('/forgot', (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            const smtpTransport = nodemailer.createTransport({
                host: 'smtp.zoho.eu',
                secure: true,
                port: 465,
                auth: {
                    user: process.env.ZOHOU,
                    pass: process.env.NMPW,
                }
            });
            const mailOptions = {
                to: user.email,
                from: '***REMOVED***',
                subject: 'myCookbook Password Reset',
                text: 'You are receiving this because someone requested a password reset for your account.\n\n' +
                    'Please click on the following link (or paste into your browser) to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request a password reset, you can safely ignore this email. Your password will not be changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        const email = req.body.email;
        res.render('users/emailsent', { email });
    });
});



router.get('/reset/:token', (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('users/reset', { token: req.params.token });
    });
});

router.post('/reset/:token', (req, res) => {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function (err) {
                        user.resetPasswordToken = user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            req.logIn(user, function (err) {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            const smtpTransport = nodemailer.createTransport({
                host: 'smtp.zoho.eu',
                secure: true,
                port: 465,
                auth: {
                    user: process.env.ZOHOU,
                    pass: process.env.NMPW,
                }
            });
            const mailOptions = {
                to: user.email,
                from: 'process.env.ZOHOU',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/login');
    });
});



module.exports = router;