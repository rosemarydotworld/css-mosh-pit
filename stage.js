'use strict';

function init() {
  var mosh     = document.getElementById('mosh');

  var ref      = new Firebase('https://css-mosh-pit.firebaseio.com/');
  var headless = new Firepad.Headless(ref);

  ref.on('value', function(dataSnapshot) {
    headless.getText(function(text) {
      var styles = prepareStyles(text);

      applyStyles(mosh, styles);
    });
  });
}

function prepareStyles(styles) {
  var contentRegex = new RegExp('content:(.*?);');

  if(styles.match(contentRegex)) {
    styles = styles.replace(contentRegex, "content: '💩';");
  }

  return styles;
}

function applyStyles(target, styles) {
  target.innerText = styles;
}

window.onload = init;
