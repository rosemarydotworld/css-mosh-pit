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
  return cleanPseudoContent(cleanUrl(styles));
}

function applyStyles(target, styles) {
  target.innerText = styles;
}

function cleanPseudoContent(styles) {
  var contentRegex = new RegExp('content:(.*?);', 'm');

  return styles.replace(contentRegex, "content: '💩';");
}

function cleanUrl(styles) {
  var urlRegex = new RegExp('url\((.*?)\)', 'm');

  return styles.replace(urlRegex, "url()");
}

window.onload = init;
