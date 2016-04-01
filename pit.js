function init() {
  //// Initialize Firebase.
  var firepadRef = new Firebase('https://css-mosh-pit.firebaseio.com/');
  //// Create ACE

  var editor = ace.edit("the-pit");
  editor.setTheme("ace/theme/solarized_dark");

  var session = editor.getSession();
  session.setTabSize(2);
  session.setUseSoftTabs(true);
  session.setUseWrapMode(true);
  session.setUseWorker(false);
  session.setMode("ace/mode/css");

  //// Create Firepad.
  var firepad = Firepad.fromACE(firepadRef, editor, {});

  firepad.on('synced', function(isSynced) {
    if(!isSynced) {
      var styles = firepad.getText();
      var preparedStyles = cleanPseudoContent(cleanUrl(styles));

      if(preparedStyles != styles) {
        firepad.setText(preparedStyles);
      }
    }
  });
}

function cleanPseudoContent(styles) {
  var contentRegex = new RegExp('content:.+?;', 'm');

  return styles.replace(contentRegex, "content: '💩';");
}

function cleanUrl(styles) {
  var urlRegex = new RegExp('url\((.+?)\);', 'm');

  return styles.replace(urlRegex, "url()");
}

window.onload = init;
