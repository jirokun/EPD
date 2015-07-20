'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var fs = require('fs');
var ipc = require('ipc');
var dialog = require('dialog');
require('crash-reporter').start();

var mainWindow = null;
var openedFile = null; // 開いている最中のファイル

function open() {
  // 「ファイルを開く」ダイアログの呼び出し
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Page Definition File', extensions: ['json'] }
    ]
  }, function (files){
    if (!files) return;
    var file = files[0];
    openedFile = file;
    mainWindow.setTitle('EPD: ' + file);
    var text = fs.readFileSync(file);
    var json = JSON.parse(text);
    mainWindow.webContents.send('loadJSON', json);
  });
}

function save() {
  if (!openedFile) {
    saveAsNew();
    return;
  }
  mainWindow.webContents.send('requestJSON');
}
function saveAsNew() {
  dialog.showSaveDialog({
    filters: [
      { name: 'Page Definition File', extensions: ['json'] }
    ]
  }, function (filename) {
    if (!filename) return;
    openedFile = filename;
    save();
  });
}
function saveAsHTML() {
  mainWindow.webContents.send('requestHTML');
}
function showShortcuts() {
  mainWindow.webContents.send('showShortcuts');
}
function showVersion() {
  mainWindow.webContents.send('showVersion');
}
ipc.on('responseJSON', function(event, json) {
  var text = JSON.stringify(json, true);
  fs.writeFile(openedFile, text, function(err) {
    console.error(err);
  });
});
ipc.on('responseHTML', function(event, html) {
  dialog.showSaveDialog({
    title: 'Save as HTML',
    filters: [
      { name: 'HTML', extensions: ['html'] }
    ]
  }, function (filename) {
    fs.writeFile(filename, html, function(err) {
      console.error(err);
    });
  });
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  Menu.setApplicationMenu(menu);

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({width: 1400, height: 800});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});



// メニュー情報の作成
var template = [
  {
    label: 'ReadUs',
    submenu: [
      {label: 'Quit', accelerator: 'CommandOrControl+Q', click: function () {app.quit();}}
    ]
  }, {
    label: 'File',
    submenu: [
      {label: 'Open', accelerator: 'CommandOrControl+O', click: open},
      {label: 'Save', accelerator: 'CommandOrControl+S', click: save},
      {label: 'Save as New', click: saveAsNew},
      {label: 'Save as HTML', click: saveAsHTML}
    ]
  },

  {
    label: 'View',
    submenu: [
      { label: 'Reload', accelerator: 'Command+R', click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); } },
      { label: 'Toggle DevTools', accelerator: 'Alt+Command+I', click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
    ]
  },
  {
    label: 'Help',
    submenu: [
      { label: 'Shortcuts', click: showShortcuts},
      { label: 'Version', click: showVersion}
    ]
  }
];


var menu = Menu.buildFromTemplate(template);
