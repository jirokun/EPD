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
var dataChanged = false;

function setChanged(bool) {
  var fname;
  if (!openedFile) {
    fname = '';
  } else {
    fname = openedFile;
  }
  if (bool) {
    mainWindow.setTitle('EPD ' + fname + ' *');
    dataChanged = true;
  } else {
    mainWindow.setTitle('EPD ' + fname);
    dataChanged = false;
  }
}
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
    var text = fs.readFileSync(file);
    var json = JSON.parse(text);
    mainWindow.webContents.send('loadJSON', json);
    setChanged(false);
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
    setChanged(false);
    save();
  });
}
function saveAsHTML() {
  mainWindow.webContents.send('requestHTML');
}
function loadAddon() {
  var fname = __dirname + '/addon.jsx';
  var exists = fs.existsSync(fname);
  if (!exists) return;
  var jsx = fs.readFileSync(fname, { encoding: 'utf-8'});
  mainWindow.webContents.send('loadAddon', jsx);
}
function showShortcuts() {
  mainWindow.webContents.send('showShortcuts');
}
function showVersion() {
  mainWindow.webContents.send('showVersion');
}
ipc.on('responseJSON', function(event, jsonStr) {
  fs.writeFile(openedFile, jsonStr, function(err) {
    console.error(err);
  });
  setChanged(false);
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
    setChanged(false);
  });
});
ipc.on('changeData', function() {
  setChanged(true);
});
ipc.on('loadComplete', function() {
  setChanged(false);
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
  mainWindow.webContents.on('did-finish-load', function() {
    loadAddon();
  });
  //mainWindow.openDevTools();

  mainWindow.on('close', function(e) {
    if (!dataChanged) return;
    e.preventDefault();
    dialog.showMessageBox(mainWindow, {
      type: 'warning',
      title: 'Exit without saving',
      message: 'Are you sure to exit without saving?',
      buttons: ['Cancel', 'OK'],
      cancelId: 0
    }, function(id) {
      if (id == 0) return;
      mainWindow.destroy();
      app.quit();
    });
  });
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// メニュー情報の作成
var template = [
  {
    label: 'File',
    submenu: [
      {label: 'Open', accelerator: 'CommandOrControl+O', click: open},
      {label: 'Save', accelerator: 'CommandOrControl+S', click: save},
      {label: 'Save as New', click: saveAsNew},
      {label: 'Save as HTML', click: saveAsHTML},
      {label: 'Quit', accelerator: 'CommandOrControl+Q', click: function () {app.quit();}}
    ]
  },

  {
    label: 'View',
    submenu: [
      { label: 'Reload', accelerator: 'CommandOrControl+R', click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); } },
      { label: 'Toggle DevTools', accelerator: 'Alt+CommandOrControl+I', click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
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
