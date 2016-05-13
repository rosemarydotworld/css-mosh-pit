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
      var preparedStyles = cleanWildcards(cleanPseudoContent(cleanUrl(styles)));

      if(preparedStyles != styles) {
        firepad.setText(preparedStyles);
      }
    }
  });
}

function cleanPseudoContent(styles) {
  var contentRegex = new RegExp('content:.+', 'im');

  return styles.replace(contentRegex, "/* nope */");
}

function cleanUrl(styles) {
  var urlRegex = new RegExp('url\s*\((.+)\)', 'im');

  return styles.replace(urlRegex, "/* heck nope */");
}

function cleanWildcards(styles) {
  var wildcardRegex = new RegExp('.*\\*.*{', 'im');

  return styles.replace(wildcardRegex, "/* nah */")
}

window.onload = init;
