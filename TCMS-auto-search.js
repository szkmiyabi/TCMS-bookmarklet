javascript:(function(){
  var selection = window.getSelection().toString();
  var url_base = "https://www.pref.tokushima.lg.jp/system/searches?part_id=7546358&grant_table=&search_word=";
  window.open(url_base + selection, "_blank");
})();
