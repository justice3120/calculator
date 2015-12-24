var ipc = require('ipc');
jQuery(function () {
  'use strict';

  ipc.on('show-help', function(event, arg) {
    event.sender.send('show-help-reply', 'pong');
  });
})
