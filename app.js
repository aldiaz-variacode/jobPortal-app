const express = require('express');
const cors = require('cors');
// const dbConnection = require('../database/config');require('dotenv').config();
const Server = require('./models/server');
require('dotenv').config()

const server = new Server(express, cors/* , dbConnection */);

server.listen();