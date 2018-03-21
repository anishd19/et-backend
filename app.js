var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

require('dotenv').config()

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

app.use