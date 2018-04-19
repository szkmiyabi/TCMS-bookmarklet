/*-----------------------------------------------------
 *
 	S11県報一覧データを別タブでTSV表示
 *
------------------------------------------------------*/
javascript:(function(){

  function baseUtil() {
    this.d = document;
    this.url = location.href;
		this.rootpath = "http://www.pref.tokushima.jp";
    this.tbl = this.d.getElementsByClassName("kenpouTable").item(0);
  }

  baseUtil.prototype = {
    /* --- 県報一覧詳細リンクを別タブ表示 --- */
    disp_kenpo_detail_tab: function(sep) {
      var str = "<pre>";
			var arr = this.get_kenpo_list_arr();
			for(var i=0; i<arr.length; i++) {
				str += arr[i][0] + sep + arr[i][1] + sep + arr[i][2] + "\n";
			}
			str += "</pre>";
			this.browse_new_tab(str);
    },
    /* func, 県報一覧詳細リンクを別タブ表示 */
    get_kenpo_list_arr: function() {
      var arr = new Array();
      var trs = this.tbl.rows;
      var j = 0;
      for(var i=0; i<trs.length; i++) {
        if(i < 1) continue;
        var tr = trs.item(i);
        var title = tr.cells.item(0).textContent;
        var date = tr.cells.item(1).textContent;
        var link = this.rootpath + tr.cells.item(2).getElementsByTagName("a").item(0).getAttribute("href");
        var c1 = title;
        var c2 = date;
        var c3 = link;
        arr[j] = [c1, c2, c3];
        j++;
      }
      return arr;
    },
    /* --- 別タブ表示, 引数:区切り文字 --- */
		browse_new_tab: function(str) {
			var nwd = window.open("","_blank").document;
			nwd.writeln('<DOCTYPE html>');
			nwd.writeln('<html lang="ja">');
			nwd.writeln('<head><meta charset="utf-8">');
			nwd.writeln('<title>BrNewTab</title>');
			nwd.writeln('<style>body{font-family:"メイリオ",Meiryo,sans-serif;}</style>');
			nwd.writeln('</head>');
			nwd.writeln('<body>');
			nwd.writeln(str);
			nwd.writeln('</body>');
			nwd.writeln('</html>');
		},
  };

  var util = new baseUtil();
  util.disp_kenpo_detail_tab("\t");

})();
