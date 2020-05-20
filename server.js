require('dotenv').config() //TODO: only for development

const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;//TODO update dockfile from 8080;
const app = express();
const cors = require('cors');
app.use(cors());



app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});



//serve api routes
const tinderRoutes = require('./api/routes/tinder');
const router = express.Router();
app.use('/api/',router)
router.get('/like/:id/:s_number',tinderRoutes.like)
router.get('/dislike/:id/:s_number',tinderRoutes.dislike)
router.get('/profiles',tinderRoutes.getProfiles)


//serve ui
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.listen(port);