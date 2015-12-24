CalculatorWindow = require './calculator-window'
ApplicationMenu = require './application-menu'
BrowserWindow = require 'browser-window'
Menu = require 'menu'
app = require 'app'
ipc = require 'ipc'
path = require 'path'
os = require 'os'
{EventEmitter} = require 'events'
_ = require 'underscore-plus'

module.exports =
class CalculatorApplication
  _.extend @prototype, EventEmitter.prototype

  @open: ->
    createCalculatorApplication = -> new CalculatorApplication()

  windows: null
  applicationMenu: null

  constructor: ->
    global.calculatorApplication = this

    @windows = []

    @applicationMenu = new ApplicationMenu()

    @setupJavaScriptArguments()
    @handleEvents()
    @openPath()

  setupJavaScriptArguments: ->
    app.commandLine.appendSwitch 'js-flags', '--harmony'

  handleEvents: ->
    ipc.on 'update-application-menu', (event, template, keystrokesByCommand) =>
      win = BrowserWindow.fromWebContents(event.sender)
      @applicationMenu.update(win, template, keystrokesByCommand)
