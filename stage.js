window.onload = () => {
  const mosh     = document.getElementById('mosh');
  const stage    = document.getElementById('the-stage');
  const loader   = document.getElementById('the-loader')

  const ref      = new Firebase('https://css-mosh-pit.firebaseio.com/');
  const headless = new Firepad.Headless(ref);

  ref.on('value', dataSnapshot => {
    stage.setAttribute('hidden', 'false');
    loader.setAttribute('hidden', 'true');

    headless.getText(styles => { mosh.innerText = styles; });
  });
}
