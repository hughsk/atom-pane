var ScrollView = require('atom').ScrollView
var url        = require('url')
var cache      = {}

module.exports = createPane

function createPane(opts, ready) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  }

  opts = opts || {}

  var target = opts.uri
    ? opts.uri
    : generateTargetURI()

  if (!url.parse(target).protocol) {
    target = 'generated-atom-panel://' + target
  }



  if (!cache[target]) {
    var PanelView = cache[target] = ScrollView.extend({
      content: function() {
        return this.div(function() {
          return ''
        })
      }
    })

    cache[target] = PanelView
    atom.workspace.registerOpener(function(uri) {
      if (uri !== target) return
      var view = new PanelView

      view.targetURI = target
      view.getTitle = function() {
        return opts.title || target
      }

      return view
    })
  } else {
    var PanelView = cache[target]
  }

  atom.workspace.open(target, {
      split: opts.split
    , searchAllPanes: !!opts.searchAllPanes
    , changeFocus: opts.changeFocus !== false
  }).done(function(node) {
    ready(null, node)
  })

  return target
}

function generateTargetURI() {
  return (
      'generated-atom-panel://'
    + Math.random().toString(36)
    + Date.now().toString(36)
  )
}
