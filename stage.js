function init() {
  var mosh     = document.getElementById('mosh');

  var ref      = new Firebase('https://css-mosh-pit.firebaseio.com/');
  var headless = new Firepad.Headless(ref);

  ref.on('value', function(dataSnapshot) {
    headless.getText(function(styles) {
      mosh.innerText = styles;
    });
  });
}

window.onload = init;
