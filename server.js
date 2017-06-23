var express = require('express');
var http = require('http');
var wechat = require('wechat');

var webconsole = require('webconsole');  //step 1

var app = express(); 
var server = http.createServer(app);
server.listen(3000);

app.use('/', express.static('public'));
app.use(express.query());

webconsole.init(server); //step 2
app.all('/admin/*',webconsole.handler); //step 3


app.all('/wechat', wechat('weixin')
.text(function (message, req, res, next) {
  // TODO
  console.log('recv text:',message);
  res.reply('你说:'+message.Content+'?');
 
}).image(function (message, req, res, next) {
  console.log('recv image:',message);
  // TODO
  res.reply('发图片干嘛?');
}).voice(function (message, req, res, next) {
  console.log('recv voice:',message);
  // TODO
  res.reply('发语音干嘛?');
}).video(function (message, req, res, next) {
  console.log('recv video:',message);
  // TODO
  res.reply('干嘛?');
}).location(function (message, req, res, next) {
  console.log('recv message:',message);
  // TODO
  res.reply('知道啦，你在:'+message.Label);
}).link(function (message, req, res, next) {
  console.log('recv link:',message);
  // TODO
    res.reply([
      {
        title: 'try my music player!',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://open.weixin.qq.com/qr/code/?username=multiservicegood',
        url: 'http://oh-my.ga/melody/'
      }
    ]);
}).event(function (message, req, res, next) {
  console.log('recv event:',message);
  // TODO
  res.reply('recv event. type:'+message.Event+',value:'+message.EventKey);
}).device_text(function (message, req, res, next) {
  console.log('recv device_text:',message);
  // TODO
  res.reply('recv device_text');
}).device_event(function (message, req, res, next) {
  console.log('recv message:',message);
  // TODO
  res.reply('recv device_event');
}).middlewarify());


console.log('boot sucess!');
