Menu = require 'menu'
_ = require 'underscore-plus'

module.exports =
class ApplicationMenu
  constructor: ->
    @windowTemplates = new WeakMap()

  update: (window, template, keystrokesByCommand) ->
    @translateTemplate(template, keystrokesByCommand)
    @windowTemplates.set(window, template)
    @setActiveTemplate(template) if window is @lastFocusedWindow

  setActiveTemplate: (template) ->
    unless _.isEqual(template, @activeTemplate)
      @activeTemplate = template
      @menu = Menu.buildFromTemplate(_.deepClone(template))
      Menu.setApplicationMenu(@menu)

  translateTemplate: (template, keystrokesByCommand) ->
    template.forEach (item) =>
      item.metadata ?= {}
      if item.command
        item.accelerator = @acceleratorForCommand(item.command, keystrokesByCommand)
        item.click = -> global.atomApplication.sendCommand(item.command)
        item.metadata.windowSpecific = true unless /^application:/.test(item.command)
      @translateTemplate(item.submenu, keystrokesByCommand) if item.submenu
    template
