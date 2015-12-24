var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  // メニューをアプリケーションに追加
  Menu.setApplicationMenu(menu);

  openWindow(process.cwd());
});

function openWindow (baseDir) {
  mainWindow = new BrowserWindow({title: '電卓', width: 216, height: 320, resizable: false, 'node-integration': false});
  mainWindow.loadURL('file://' + __dirname + '/basic.html?baseDir=' + encodeURIComponent(baseDir));
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

var template = [
  {
    label: '表示(V)',
    submenu: [
      {label: '普通の電卓(T)', accelerator: 'Alt+1', type: 'radio', click: function () {}},
      {label: '関数電卓(S)', accelerator: 'Alt+2', type: 'radio', click: function () {}},
      {label: 'プログラマ(P)', accelerator: 'Alt+3', type: 'radio', click: function () {}},
      {label: '統計(A)', accelerator: 'Alt+4', type: 'radio', click: function () {}},
      {label: '履歴(Y)', accelerator: 'Ctrl+H', type: 'checkbox', position: 'endof=modes', click: function () {}},
      {label: '桁区切り(I)', type: 'checkbox', click: function () {}},
      {label: '基本(B)', accelerator: 'Ctrl+F4', type: 'radio', position: 'endof=extDisplays', click: function () {}},
      {label: '単位の変換(U)', accelerator: 'Ctrl+U', type: 'radio', click: function () {}},
      {label: '日付の計算(D)', accelerator: 'Ctrl+E', type: 'radio', click: function () {}},
      {label: 'ワークシート(W)', submenu: [
        {label: '住宅ローン(M)', type: 'radio', click: function () {}},
        {label: '自動車リース(V)', type: 'radio', click: function () {}},
        {label: '燃費(km/L)(F)', type: 'radio', click: function () {}},
        {label: '燃費(L/100km)(U)', type: 'radio', click: function () {}}
      ]}
    ]
  },
  {
    label: '編集(E)',
    submenu: [
      {label: 'コピー(C)', accelerator: 'Ctrl+C', click: function () {}},
      {label: '貼り付け(P)', accelerator: 'Ctrl+V', click: function () {}},
      {label: '履歴(H)', position: 'endof=c&p', submenu: [
        {label: '履歴のコピー(I)', enabled: false, click: function () {}},
        {label: '編集(E)', accelerator: 'F2', enabled: false, click: function () {}},
        {label: '編集の取り消し(N)', accelerator: 'Esc', enabled: false, click: function () {}},
        {label: 'クリア(L)', accelerator: 'Ctrl+Shift+D', enabled: false, click: function () {}}
      ]}
    ]
  },
  {
    label: 'ヘルプ(H)',
    submenu: [
      {label: 'ヘルプの表示(V)', accelerator: 'F1', click: showHelp()},
      {label: '開発ツール', accelerator: 'F12', click: function () { mainWindow.toggleDevTools(); }},
      {label: 'バージョン情報(A)', position: 'endof=help', click: function () {}}
    ]
  }
];

var menu = Menu.buildFromTemplate(template);

function showHelp() {
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.send('show-help', 'ping');
  });
}
