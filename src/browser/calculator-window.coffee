path = require 'path'
_ = require 'underscore-plus'
{EventEmitter} = require 'events'

module.exports =
class CalculatorWindow
  _.extend @prototype, EventEmitter.prototype

  @iconPath: path.resolve(__dirname, '..', '..', 'resources', 'atom.png')
