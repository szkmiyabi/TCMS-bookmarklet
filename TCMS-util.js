javascript:(function(){
	function TCMSUtil() {
		this.d = document;
		this.url = location.href;
		this.selection = window.getSelection().toString();
		this.uploadpath = "/file/img/";
		this.rootpath = "https://www.pref.tokushima.lg.jp";

		this.menuWrap = this.d.getElementById("actions-sidebar").getElementsByClassName("side-nav").item(0);
		this.menuList = this.menuWrap.getElementsByTagName("li");
		this.menu_sitemap = this.menuList.item(0).getElementsByTagName("a").item(0);
		this.menu_page = this.menuList.item(1).getElementsByTagName("a").item(0);
		this.menu_new_page = this.menuList.item(2).getElementsByTagName("a").item(0);
		this.menu_frame = this.menuList.item(3).getElementsByTagName("a").item(0);
		this.menu_new_frame = this.menuList.item(4).getElementsByTagName("a").item(0);
		this.menu_template = this.menuList.item(5).getElementsByTagName("a").item(0);
		this.menu_new_template = this.menuList.item(6).getElementsByTagName("a").item(0);
		this.menu_parts = this.menuList.item(7).getElementsByTagName("a").item(0);
		this.menu_new_parts = this.menuList.item(8).getElementsByTagName("a").item(0);
		this.menu_top = this.menuList.item(9).getElementsByTagName("a").item(0);
		this.menu_new_top = this.menuList.item(10).getElementsByTagName("a").item(0);
		this.menu_auth = this.menuList.item(11).getElementsByTagName("a").item(0);
		this.menu_contact = this.menuList.item(12).getElementsByTagName("a").item(0);
		this.menu_magazine = this.menuList.item(13).getElementsByTagName("a").item(0);
		this.menu_settings = this.menuList.item(14).getElementsByTagName("a").item(0);

		this.siteHash = {
			"S11": "29",
			"S21": "30",
			"S22": "31",
			"S31": "32",
			"S32": "33",
			"S33": "34",
			"S34": "35",
			"S41": "36",
			"S42": "37",
			"S43": "38",
			"S44": "39",
			"S45": "40",
			"S51": "41",
			"S52": "42",
			"S61": "43",
			"S62": "44",
			"S71": "45",
		};

		this.siteSelect = null;
		try { this.siteSelect = this.d.getElementById("site-groups"); } catch(e) {}

		this.siteForm = null;
		this.search_textbox = null;
		try { this.siteForm =this.d.getElementsByClassName("search").item(0); } catch(e) {}
		try { this.search_textbox = this.siteForm.name; } catch(e) {}

		this.action_btns = null;
		try { this.action_btns = this.d.getElementsByTagName("button"); } catch(e) {}

		this.pageEditNav = null;
		this.edit_btn = null;
		this.basic_set_btn = null;
		this.article_set_btn = null;
		this.layout_set_btn = null;
		this.pagedesign_set_btn = null;

		try { this.pageEditNav = this.d.getElementsByClassName("line").item(0); } catch(e) {}
		try { this.edit_btn = this.pageEditNav.getElementsByTagName("li").item(0).getElementsByTagName("a").item(0); } catch(e) {}
		try { this.basic_set_btn = this.pageEditNav.getElementsByTagName("a").item(0); } catch(e) {}
		try { this.article_set_btn = this.pageEditNav.getElementsByTagName("a").item(1); } catch(e) {}
		try { this.layout_set_btn = this.pageEditNav.getElementsByTagName("a").item(2); } catch(e) {}
		try { this.pagedesign_set_btn = this.pageEditNav.getElementsByTagName("a").item(3); } catch(e) {}

		this.commit_btn = null;
		try { this.commit_btn = this.d.getElementsByClassName("set-base btn").item(0); } catch(e) {}

		this.save_btn = null;
		try { this.save_btn = this.d.getElementsByClassName("draft-save btn").item(0); } catch(e) {}

		this.auth_reset_btn = null;
		try { this.auth_reset_btn = this.d.getElementById("approval-request"); } catch(e) {}


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
			var src = this.d.getElementById("upload-image-list");
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
			if(typeof this.selection === "undefined" || this.selection === null) return;
			if(!rfpat.test(this.selection)) return;
			str = this.selection.match(rfpat)[2];
			if(type === "popup") alert(this.uploadpath + str);
			else this.browse_new_tab(this.uploadpath + str);
		},
		get_tree_text: function(line_end) {
			var str = "";
			var ul = this.d.getElementsByClassName("list").item(0);
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
			var ul = this.d.getElementsByClassName("list").item(0);
			var ls = ul.getElementsByTagName("li");
			for(var i=0; i<ls.length; i++) {
				var li = ls.item(i);
				var sts = li.getElementsByTagName("a").item(0);
				var link = this.rootpath + sts.getAttribute("href");
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
		},
		draft_save: function() {
			var btn0 = this.d.getElementsByClassName("decision-block btn").item(0);
			var btn1 = this.d.getElementsByClassName("edit-end btn").item(0);
			var btn2 = this.d.getElementsByClassName("draft-save btn").item(0);
			if(btn0 !== null) btn0.click();
			if(btn1 !== null) btn1.click();
			if(btn2 !== null) btn2.click();
		},
		quick_edit_main_col: function(layout) {
			var parent_class = "";
			if(layout === "D") parent_class = "area area3";
			var icn1 = this.d.getElementsByClassName(parent_class).item(0);
			if(icn1 !== null) icn1 = icn1.getElementsByClassName("edit-start click").item(0);
			if(icn1 !== null) icn1.click();
			var icn2 = this.d.getElementsByClassName("block-head").item(0);
			if(icn2 !== null) icn2 = icn2.getElementsByClassName("edit-block click").item(0);
			if(icn2 !== null) icn2.click();			

		},
		click_btn_by_keywd: function(str) {
			var pt = new RegExp(".*" + str + ".*");
			for(var i=0; i<this.action_btns.length; i++) {
				var btn = this.action_btns.item(i);
				var txt = btn.textContent;
				if(pt.test(txt)) {
					btn.click();
					break;
				}
			}

		}
	};

	var util = new TCMSUtil();
	/* --- Let it any method call --- */
	
})();