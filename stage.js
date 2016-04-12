function init() {
  var mosh     = document.getElementById('mosh');
  var stage    = document.getElementById('the-stage');
  var loader   = document.getElementById('the-loader')

  var ref      = new Firebase('https://css-mosh-pit.firebaseio.com/');
  var headless = new Firepad.Headless(ref);

  ref.on('value', function(dataSnapshot) {
    stage.setAttribute('hidden', 'false');
    loader.setAttribute('hidden', 'true');

    headless.getText(function(styles) {
      mosh.innerText = styles;
    });
  });
}

window.onload = init;
