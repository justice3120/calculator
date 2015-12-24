process.on 'uncaughtException', (error={}) ->
  console.log(error.message) if error.message?
  console.log(error.stack) if error.stack?

crashReporter = require 'crash-reporter'
app = require 'app'
path = require 'path'
console.log = require 'nslog'

start = ->
  app.on 'will-finish-launching', setupCrashReporter

  app.on 'ready', ->
    CalculatorApplication = require path.join('src', 'browser', 'calculator-application')
    CalculatorApplication.open()

setupCrashReporter = ->
  crashReporter.start(productName: 'Calculator')

start()
