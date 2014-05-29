# atom-pane [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/atom-pane&title=atom-pane&description=hughsk/atom-pane%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges) #

A lightweight wrapper for creating new panes within [Atom](http://atom.io).

## Usage ##

[![atom-pane](https://nodei.co/npm/atom-pane.png?mini=true)](https://nodei.co/npm/atom-pane)

`atom-pane` is packaged as an npm module, so you can simply install it like
you would your other package dependencies.

### `uri = createPane([opts], ready, [closed])`

Create a new pane, calling `ready(err, pane)` when complete. The returned pane
is an instance of `ScrollView`, but you can easily append standard DOM elements
like so:

``` javascript
var createPane = require('atom-pane')

exports.activate = function() {
  atom.workspaceView.command('atom-plugin:open', function() {
    // create a div, any div
    var div = document.createElement('div')
    div.innerHTML = 'hello world!'
    div.style.color = '#fff'

    createPane(function(err, pane) {
      if (err) throw err
      // append the dive to your new pane
      pane.append(div)
    }, function() {
      div.parentNode.removeChild(div)
    })
  })
}
```

You'll need to clean up after yourself too – use the `closed` callback function,
which will get called when the pane has been closed.

Takes the following options:

* `opts.searchAllPanes` passed onto `atom.workspace.open`, defaults to `false`.
* `opts.uri` may be one of the following:
  * `undefined`, in which case a unique value will be genrated for you.
  * A unique string, e.g. `markdown-preview-pane`.
  * A full URI, e.g. `markdown-preview://Users/hughsk/README.md`.

  Note that the latter two approaches are recommended, to prevent creating
  a bunch of one-off openers each time a user opens a pane.
* `opts.changeFocus` passed onto `atom.workspace.open`, defaults to `true`.
* `opts.split` passed onto `atom.workspace.open`, defaults to `undefined`.


## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/atom-pane/blob/master/LICENSE.md) for details.
