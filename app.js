const express = require('express');
const cors = require('cors');
const Server = require('./models/server');
require('dotenv').config();

const server = new Server(express, cors);

server.listen();
