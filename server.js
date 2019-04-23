const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Telegraf = require('telegraf');
const config = require('config');
const images = require('./routes/images');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const port = process.env.PORT || config.get('port');

const BOT_TOKEN = process.env.BOT_TOKEN || config.get('token');
const bot = new Telegraf(BOT_TOKEN);

//Telegram bot
bot.start(ctx => ctx.reply('Hi! Send me images.'));
bot.on('photo', ctx => {
  imageUrl = ctx.telegram
    .getFileLink(ctx.message.photo[ctx.message.photo.length - 1].file_id)
    .then(function(fileData) {
      const downloadUrl = fileData;
      const dateNow = new Date();
      const fileName =
        './uploads/' +
        dateNow.toDateString() +
        dateNow.toLocaleTimeString('en-GB') +
        '.jpg';
      const file = fs.createWriteStream(fileName);
      const request = https.get(downloadUrl, function(response) {
        response.pipe(file);
      });
      console.log('Image saved to upload directory');
    });
  ctx.reply('Image saved');
});
bot.launch();

const app = express();
app.use(
  cors()
);

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', images);

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
