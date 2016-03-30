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
}

window.onload = init;
