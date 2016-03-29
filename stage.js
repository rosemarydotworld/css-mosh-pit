function applyStyles(e) {
  var origin = e.origin || e.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
  if (origin !== window.location.origin)
    return;

  mosh.innerText = e.data;
}

function init() {
  var mosh = document.getElementById('mosh');

  window.addEventListener("message", applyStyles, false);
}

window.onload = init;
