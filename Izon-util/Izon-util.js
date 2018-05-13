javascript:(function(){
  var hash = {
    "①": "〔1〕",
    "②": "〔2〕",
    "③": "〔3〕",
    "④": "〔4〕",
    "⑤": "〔5〕",
    "⑥": "〔6〕",
    "⑦": "〔7〕",
    "⑧": "〔8〕",
    "⑨": "〔9〕",
    "⑩": "〔10〕",
    "⑴": "(1)",
    "⑵": "(2)",
    "⑶": "(3)",
    "⑷": "(4)",
    "⑸": "(5)",
    "⑹": "(6)",
    "⑺": "(7)",
    "⑻": "(8)",
    "⑼": "(9)",
    "⑽": "(10)",
    "㈱": "(株)",
    "㈲": "(有)",
    "㍍": "m",
    "㎡": "m2",
    "㎥": "m3",
    "㎠": "cm2",
    "㎠": "cm3",
    "㎟": "mm2",
    "㎣": "mm3",
    "㎖": "ml",
    "ℓ":"l",
  };
  var text = function(hash) {
    var str = "";
    for(var h in hash) {
      str += '"' + h + '": "' + hash[h] + '",';
    }
    return str;
  };
  var nd = window.open().document;
  nd.writeln('<!DOCTYPE html>');
  nd.writeln('<html lang="ja">');
  nd.writeln('<head>');
  nd.writeln('<meta charset="utf-8">');
  nd.writeln('<title>IZON-util</title>');
  nd.writeln('<style>');
  nd.writeln('* { font-family: "メイリオ",Meiryo,sans-serif; }');
  nd.writeln('h1 { font-size: 1.65em; }');
  nd.writeln('button, textarea {');
  nd.writeln('border-radius: 5px;');
  nd.writeln('}');
  nd.writeln('#srccode {');
  nd.writeln('height: 18em;');
  nd.writeln('width: 100%;');
  nd.writeln('}');
  nd.writeln('</style>');
  nd.writeln('<script>');
  nd.writeln('function get_hash() {');
  nd.writeln('var hash = {');
  nd.writeln(text(hash));
  nd.writeln('};');
  nd.writeln('return hash;');
  nd.writeln('}');
  nd.writeln('function sc() {');
  nd.writeln('return document.getElementById("srccode");');
  nd.writeln('}');
  nd.writeln('function replacer(str) {');
  nd.writeln('var hash = get_hash();');
  nd.writeln('for(var h in hash) {');
  nd.writeln('var rgx = new RegExp(h, "mg");');
  nd.writeln('str = str.replace(rgx, hash[h]);');
  nd.writeln('}');
  nd.writeln('return str;');
  nd.writeln('}');
  nd.writeln('function do_exec() {');
  nd.writeln('var src = sc().value;');
  nd.writeln('sc().value = replacer(src);');
  nd.writeln('}');
  nd.writeln('function do_clear() {');
  nd.writeln('sc().value = "";');
  nd.writeln('}');
  nd.writeln('</script>');
  nd.writeln('</head>');
  nd.writeln('<body>');
  nd.writeln('<h1>機種依存文字ツール</h1>');
  nd.writeln('<textarea id="srccode">');
  nd.writeln('</textarea>');
  nd.writeln('<br>');
  nd.writeln('<button id="reset-btn" onclick="do_exec()">実行</button>');
  nd.writeln('<button id="reset-btn" onclick="do_clear()">表示クリア</button>');
  nd.writeln('</body>');
  nd.writeln('</html>');

})();
