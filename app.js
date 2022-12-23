const express = require('express');
const cors = require('cors');
const Server = require('./models/server');
const fileUpload = require('express-fileupload');
require('dotenv').config();


const server = new Server(express, cors, fileUpload);

server.listen();
