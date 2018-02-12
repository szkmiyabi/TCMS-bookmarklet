/*-----------------------------------------------------
 *
 	レイアウト設定を一発実施
 *
------------------------------------------------------*/
javascript:(function(){
	var wd="900";
	var ly="D";
	var c1="area-2:250";
	var c2="area-3:650";
	var c3="";
	var unt="px";
	var asv=false;

	function TCMSUtil() {
		this.d = document;
		this.url = location.href;
		this.selection = window.getSelection().toString();
		this.uploadpath = "/file/img/";
		this.rootpath = "https://www.pref.tokushima.lg.jp";

		this.menuWrap = this.d.getElementsByClassName("side-nav").item(0);
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

		this.layoutPane = null;
		this.layoutPaneInps = null; /* layoutPaneの全input要素群 */
		try { this.layoutPane = this.d.getElementsByClassName("cmsbase layout-setting").item(0); } catch(e) {}
		try { this.layoutPaneInps = this.layoutPane.getElementsByTagName("input"); } catch(e) {}
		this.layoutA = null;
		this.layoutB = null;
		this.layoutC = null;
		this.layoutD = null;
		this.layoutE = null;
		this.layoutF = null;
		try { this.layoutA = this.layoutPaneInps.item(0); } catch(e) {}
		try { this.layoutB = this.layoutPaneInps.item(1); } catch(e) {}
		try { this.layoutC = this.layoutPaneInps.item(2); } catch(e) {}
		try { this.layoutD = this.layoutPaneInps.item(3); } catch(e) {}
		try { this.layoutE = this.layoutPaneInps.item(4); } catch(e) {}
		try { this.layoutF = this.layoutPaneInps.item(5); } catch(e) {}
		this.page_width_text = null;
		this.layout_save_btn = null;
		try {
			for(var i=0; i<this.layoutPaneInps.length; i++) {
				var inp = this.layoutPaneInps.item(i);
				if(inp.getAttribute("type")==="number" && inp.getAttribute("name")==="width") {
					this.page_width_text = inp;
					break;
				}
			}
		} catch(e) {}
		try { this.layout_save_btn = this.layoutPane.getElementsByClassName("ok-layout btn").item(0); } catch(e) {}

		this.areaSizeTbl = null; /* エリアサイズ設定table */
		try { this.areaSizeTbl = this.d.getElementById("area-size"); } catch(e) {}

		this.author1Check = null;
		this.author2Check = null;
		this.author3Check = null;
		this.author1Select = null;
		this.author2Select = null;
		this.author3Select = null;
		try { this.author1Check = this.d.getElementById("type1"); } catch(e) {}
		try { this.author2Check = this.d.getElementById("type2"); } catch(e) {}
		try { this.author3Check = this.d.getElementById("type3"); } catch(e) {}
		try { this.author1Select = this.d.getElementById("level-type1"); } catch(e) {}
		try { this.author2Select = this.d.getElementById("level-type2"); } catch(e) {}
		try { this.author3Select = this.d.getElementById("level-type3"); } catch(e) {}
		this.authHash = {
			"middle": "1",
			"last": "2"
		};

	}
	TCMSUtil.prototype = {
		do_col_width_select_enter: function(layout, val) {
			var unitHash = {"px":"1", "percent":"2"};
			var skey = unitHash[val];
			var tarrow = null;
			var tarcell = null;
			var trs = this.areaSizeTbl.rows;
			if(layout==="D") {
				tarrow = trs.item(3);
				tarcell = tarrow.cells.item(5);
			} else if(layout==="E") {
				tarrow = trs.item(5);
				tarcell = tarrow.cells.item(5);
			} else if(layout==="F") {
				tarrow = trs.item(7);
				tarcell = tarrow.cells.item(5);
			}
			var sel = tarcell.getElementsByTagName("select").item(0);
			var opts = sel.getElementsByTagName("option");
			for(var i=0; i<opts.length; i++) {
				var opt = opts.item(i);
				if(opt.getAttribute("value")===skey) {
					sel.selectedIndex = i;
					sel.click();
					break;
				}
			}
		},
		do_col_width_input_enter: function(layout, key, val) {
			var tarrow = null;
			var tarcell = null;
			var trs = this.areaSizeTbl.rows;
			if(layout==="D") {
				tarrow = trs.item(3);
				if(key === "area-2") tarcell = tarrow.cells.item(2);
				else if(key === "area-3") tarcell = tarrow.cells.item(3);
			} else if(layout==="E") {
				tarrow = trs.item(5);
				if(key === "area-2") tarcell = tarrow.cells.item(2);
				else if(key === "area-3") tarcell = tarrow.cells.item(3);
			} else if(layout==="F") {
				tarrow = trs.item(7);
				if(key === "area-2") tarcell = tarrow.cells.item(2);
				else if(key === "area-3") tarcell = tarrow.cells.item(3);
				else if(key === "area-4") tarcell = tarrow.cells.item(4);
			}
			var inp = tarcell.getElementsByTagName("input").item(0);
			inp.value = val;
		},
		do_author_select: function(str, val) {
			if(str === "author1") {
				this.author1Check.click();
				var opts = this.author1Select.getElementsByTagName("option");
				for(var i=0; i<opts.length; i++) {
					var opt = opts.item(i);
					if(opt.value === this.authHash[val]) {
						this.author1Select.selectedIndex = i;
						break;
					}
				}
			} else if(str === "author2") {
				this.author2Check.click();
				var opts = this.author2Select.getElementsByTagName("option");
				for(var i=0; i<opts.length; i++) {
					var opt = opts.item(i);
					if(opt.value === this.authHash[val]) {
						this.author2Select.selectedIndex = i;
						break;
					}
				}
			} else if(str === "author3") {
				this.author3Check.click();
				var opts = this.author3Select.getElementsByTagName("option");
				for(var i=0; i<opts.length; i++) {
					var opt = opts.item(i);
					if(opt.value === this.authHash[val]) {
						this.author3Select.selectedIndex = i;
						break;
					}
				}
			}
		},
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
		copy_tab: function() {
			var win = window.open("","_blank");
			win.location.href = this.url;
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
	eval("util.layout" + ly + ".click();");
	util.page_width_text.value = wd;
	var tmp1 = c1.split(":");
	var tmp2 = c2.split(":");
	var tmp3 = null;
	if(c3 !== "") tmp3 = c3.split(":");
	if(tmp1.length < 1 || tmp2.length < 1) return;
	util.do_col_width_input_enter(ly, tmp1[0], tmp1[1]);
	util.do_col_width_input_enter(ly, tmp2[0], tmp2[1]);
	if(tmp3 !== null) util.do_col_width_input_enter(ly, tmp3[0], tmp3[1]);
	util.do_col_width_select_enter(ly, unt);
	if(asv) util.layout_save_btn.click();

})();
