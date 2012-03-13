(function(window){

  function Alphabet() {
    throw "Alphabet cannot be instaniated."
  }

  Alphabet.getLetter = function(n) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[n];
  }

  window.Alphabet = Alphabet;
}(window));