javascript:(function(){
	uitype="popup"; /* popup, newtab */
	function TCMSUtil() {
		d = document;
		url = location.href;
		selection = window.getSelection().toString();
		uploadpath = "/file/img/";
		rootpath = "https://www.pref.tokushima.lg.jp";

	}
	TCMSUtil.prototype = {
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
		upload_img_list_tsv: function(type) {
			var str = "";
			var rfpat = new RegExp(/(\()(.+?)(\))/);
			var src = d.getElementById("upload-image-list");
			var trs = src.rows;
			for(var i=0; i<trs.length; i++) {
				var tr = trs.item(i);
				var td = tr.cells.item(0).textContent;
				var tmp = td.split(" ");
				if(tmp.length < 1) return;
				var v1 = tmp[0];
				var v2 = tmp[1];
				if(!rfpat.test(v2)) return;
				var mt = v2.match(rfpat);
				v2 = mt[2];
				str += "<pre>" + v1 + "\t" + v2 + "\n" + "</pre>";
			}
			if(type === "popup") alert(str);
			else this.browse_new_tab(str);
		},
		upload_img_path: function(type) {
			var rfpat = new RegExp(/(\()(.+?)(\))/);
			var str = "";
			if(typeof selection === "undefined" || selection === null) return;
			if(!rfpat.test(selection)) return;
			str = selection.match(rfpat)[2];
			if(type === "popup") alert(uploadpath + str);
			else this.browse_new_tab(uploadpath + str);
		},
		get_tree_text: function(line_end) {
			var str = "";
			var ul = d.getElementsByClassName("list").item(0);
			var ls = ul.getElementsByTagName("li");
			for(var i=0; i<ls.length; i++) {
				var li = ls.item(i);
				var sts = li.getElementsByTagName("a").item(0).textContent;
				str += sts + line_end;

			}
			return str;
		},
		get_tree_text_link: function(sep, line_end) {
			var str = "";
			var ul = d.getElementsByClassName("list").item(0);
			var ls = ul.getElementsByTagName("li");
			for(var i=0; i<ls.length; i++) {
				var li = ls.item(i);
				var sts = li.getElementsByTagName("a").item(0);
				var link = rootpath + sts.getAttribute("href");
				var text = sts.textContent;
				str += text + sep + link + line_end;
			}
			return str;
		},
		treeview: function(act, type) {
			var str = "<pre>";
			if(act === "text") {
				str += this.get_tree_text("\n");
			} else if(act === "text-link") {
				str += this.get_tree_text_link("\t", "\n");
			}
			str += "</pre>";
			if(type==="popup") alert(str);
			else this.browse_new_tab(str)
		}
	};

	var util = new TCMSUtil();
	/* --- Let it any method call --- */
	util.upload_img_path(uitype);
})();