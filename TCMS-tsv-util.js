/*-----------------------------------------------------
 *
 	各種一覧データを別タブでTSV表示
 *
------------------------------------------------------*/
javascript:(function(){
	var wlink=true; /*-true, false-*/
	function TCMSUtil() {
		this.d = document;
		this.url = location.href;
		this.selection = window.getSelection().toString();
		this.uploadpath = "/file/img/";
		this.rootpath = "https://www.pref.tokushima.lg.jp";

		/* サイトマップ画面の正規表現 */
		this.sitemap_pat = new RegExp(/(.*)(\/cms\/site_maps\/)(frame$|page)/);

		/* フレーム画面の正規表現 */
		this.frame_pat = new RegExp(/(.*)(\/cms\/)(frames$|frames\?)/);
		this.frame_preview_pat = new RegExp(/.*\/cms\/frames\/view/);
		this.frame_edit_pat = new RegExp(/.*\/cms\/frames\/edit/);

		/* 記事画面の正規表現 */
		this.article_pat = new RegExp(/(.*)(\/cms\/)(article_pages$|article_pages\?)/);
		this.article_preview_pat = new RegExp(/.*\/cms\/article_pages\/view/);
		this.article_edit_pat = new RegExp(/.*\/cms\/article_pages\/edit/);

		/* ページテンプレート画面正規表現 */
		this.page_template_pat = new RegExp(/(.*)(\/cms\/)(templates$|templates\?)/);
		this.page_template_preview_pat = new RegExp(/.*\/cms\/templates\/view/);
		this.page_template_edit_pat = new RegExp(/.*\/cms\/templates\/edit/);

		/* パーツテンプレート画面正規表現 */
		this.parts_template_pat = new RegExp(/(.*)(\/cms\/)(part_templates$|part_templates\?)/);
		this.parts_template_preview_pat = new RegExp(/.*\/cms\/part_templates\/view/);
		this.parts_template_edit_pat = new RegExp(/.*\/cms\/part_templates\/edit/);

		this.siteForm = null;
		this.search_textbox = null;     /* パーツ等検索フォーム入力欄 */
		try { this.siteForm =this.d.getElementsByClassName("search").item(0); } catch(e) {}
		try { this.search_textbox = this.siteForm.name; } catch(e) {}

		this.action_btns = null;        /* ページ全体の操作ボタン */
		try { this.action_btns = this.d.getElementsByTagName("button"); } catch(e) {}

		this.pageEditNav = null;
		this.edit_btn = null;           /* 編集 ボタン */
		this.basic_set_btn = null;      /* 基本設定 ボタン*/
		this.article_set_btn = null;    /* 記事ページ設定 ボタン */
		this.layout_set_btn = null;     /* レイアウト設定 ボタン */
		this.pagedesign_set_btn = null; /* ページデザイン ボタン */

		try { this.pageEditNav = this.d.getElementsByClassName("line").item(0); } catch(e) {}
		try { this.edit_btn = this.pageEditNav.getElementsByTagName("li").item(0).getElementsByTagName("a").item(0); } catch(e) {}
		try { this.basic_set_btn = this.pageEditNav.getElementsByTagName("a").item(0); } catch(e) {}
		try { this.article_set_btn = this.pageEditNav.getElementsByTagName("a").item(1); } catch(e) {}
		try { this.layout_set_btn = this.pageEditNav.getElementsByTagName("a").item(2); } catch(e) {}
		try { this.pagedesign_set_btn = this.pageEditNav.getElementsByTagName("a").item(3); } catch(e) {}

		this.commit_btn = null;         /* 確定 ボタン */
		this.save_btn = null;           /* 下書保存 ボタン */
		try { this.commit_btn = this.d.getElementsByClassName("set-base btn").item(0); } catch(e) {}
		try { this.save_btn = this.d.getElementsByClassName("draft-save btn").item(0); } catch(e) {}

		this.edit_end_btn = null;       /* 編集終了 ボタン */
		try { this.edit_end_btn = this.d.getElementsByClassName("edit-end btn").item(0); } catch(e) {}

		this.auth_reset_btn = null;     /* 承認依頼/取り消し ボタン */
		try { this.auth_reset_btn = this.d.getElementById("approval-request"); } catch(e) {}

		this.openCloseLinks = null;      /* 詳細設定の開閉リンク群 */
		try { this.openCloseLinks = this.d.getElementsByClassName("open-close"); } catch(e) {}

		/* 基本設定 公開日付関連の部品群 */
		this.display_start_date = null;
		this.display_end_date = null;
		this.display_now_date = null;
		try { this.display_start_date = this.d.getElementById("open_date_time_from"); } catch(e) {}
		try { this.display_end_date = this.d.getElementById("open_date_time_to"); } catch(e) {}
		try { this.display_now_date = this.d.getElementById("display_date_time"); } catch(e) {}

		/* レイアウト設定 パネルの部品群 */
		this.layoutPane = null;
		this.layoutPaneInps = null;
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
		this.page_width_text = null;    /* ページ幅入力欄 */
		this.layout_save_btn = null;    /* レイアウト設定 保存ボタン */
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

		/* サイトマップ一覧 ul */
		this.siteMapWrap = null;
		this.siteMapUl = null;
		try { this.siteMapWrap = this.d.getElementsByClassName("tree").item(0); } catch(e) {}
		try {
			var tryObj = this.siteMapUl = this.siteMapWrap.getElementsByTagName("ul").item(0);
			if(tryObj.getAttribute("class") == "list") {
				this.siteMapUl = tryObj;
			}
		} catch(e) {}

		/* フレーム/記事一覧 table */
		this.listTblWrap = null;
		this.listTbl = null;
		try { this.listTblWrap = this.d.getElementsByClassName("table").item(0); } catch(e) {}
		try { this.listTbl = this.listTblWrap.getElementsByClassName("list").item(0); } catch(e) {}

		/* ページ/パーツテンプレート一覧 table */
		this.tmplTbl = null;
		try {
			var tryObj = this.d.getElementsByTagName("table").item(0);
			if(tryObj.getAttribute("class") == "list") {
				this.tmplTbl = tryObj;
			}
		} catch(e) {}

	}

	TCMSUtil.prototype = {

		/* --- フレーム/記事一覧表を別タブ表示 --- */
		disp_page_list_tab_wlink: function() {
			var str = "<pre>";
			var arr = this.get_page_list_arr();
			for(var i=0; i<arr.length; i++) {
				str += "<div>";
				str += "<p>" + arr[i][0] + "</p>";
				str += '<p><a href="' + arr[i][1] + '" target="_blank">' + arr[i][1] + "</a></p>";
				str += '<p><a href="' + arr[i][2] + '" target="_blank">' + arr[i][2] + "</a></p>";
				str += "</div>";
			}
			this.browse_new_tab_wlink(str);
		},
		disp_page_list_tab: function(sep) {
			var str = "<pre>";
			str += "タイトル" + sep + "QID" + sep + "プレビューURL" + sep + "PID" + "\n";
			var arr = this.get_page_list_arr();
			for(var i=0; i<arr.length; i++) {
				str += arr[i][0] + sep + this.get_pid(arr[i][1]) + sep + arr[i][1] + sep + arr[i][2] + "\n";
			}
			str += "</pre>";
			this.browse_new_tab(str);
		},
		/* func, フレーム/記事一覧表を別タブ表示 */
		get_page_list_arr: function() {
			var arr = new Array();
			var tbl = this.listTbl;
			var trs = tbl.rows;
			var j = 0;
			for(var i=0; i<trs.length; i++) {
				if(i < 1) continue;
				var tr = trs.item(i);
				var td_pagename = tr.cells.item(1);
				var td_pageid = tr.cells.item(6);
				var cv1 = td_pagename.getElementsByTagName("a").item(0).textContent;
				var cv2 = this.rootpath + td_pagename.getElementsByTagName("a").item(0).getAttribute("href");
				var cv3 = td_pageid.textContent;
				arr[j] = [cv1, cv2, cv3];
				j++;
			}
			return arr;
		},
		/* --- パーツ/テンプレート一覧表を別タブ表示 --- */
		disp_template_list_tab_wlink: function() {
			var str = "";
			var arr = this.get_template_list_arr();
			for(var i=0; i<arr.length; i++) {
				str += "<div>";
				str += "<p>" + arr[i][0] + "</p>";
				str += '<p><a href="' + arr[i][1] + '" target="_blank">' + arr[i][1] + "</a></p>";
				str += '<p><a href="' + arr[i][2] + '" target="_blank">' + arr[i][2] + "</a></p>";
				str += "</div>";
			}
			this.browse_new_tab_wlink(str);
		},
		disp_template_list_tab: function(sep) {
			var str = "<pre>";
			str += "タイトル" + sep + "QID" + sep + "プレビューURL" + "\n";
			var arr = this.get_template_list_arr();
			for(var i=0; i<arr.length; i++) {
				str += arr[i][0] + sep + this.get_pid(arr[i][1]) + sep + arr[i][1] + "\n";
			}
			str += "</pre>";
			this.browse_new_tab(str);
		},
		/* func, パーツ/テンプレート一覧表を別タブ表示 */
		get_template_list_arr: function() {
			var arr = new Array();
			var tbl = this.tmplTbl;
			var trs = tbl.rows;
			var j = 0;
			for(var i=0; i<trs.length; i++) {
				if(i < 1) continue;
				var tr = trs.item(i);
				var cdata = tr.cells.item(1);
				var tmpl_name = cdata.getElementsByTagName("a").item(0).textContent;
				var tmpl_link = this.rootpath + cdata.getElementsByTagName("a").item(0).getAttribute("href");
				var cdata2 = tr.cells.item(tr.cells.length - 1);
				var tmpl_edit_link = this.rootpath + cdata2.getElementsByTagName("a").item(0).getAttribute("href");
				var cv1 = tmpl_name;
				var cv2 = tmpl_link;
				var cv3 = tmpl_edit_link;
				arr[j] = [cv1, cv2, cv3];
				j++;
			}
			return arr;
		},
		/* --- サイトマップ一覧別タブ表示 --- */
		disp_sitemap_list_tab_wlink: function() {
			var str = "";
			var arr = this.get_sitemap_list_arr();
			for(var i=0; i<arr.length; i++) {
				str += "<div>";
				str += "<p>" + arr[i][0] + "</p>";
				str += '<p><a href="' + arr[i][1] + '" target="_blank">' + arr[i][1] + "</a></p>";
				str += '<p><a href="' + arr[i][2] + '" target="_blank">' + arr[i][2] + "</a></p>";
				str += "</div>";
			}
			this.browse_new_tab_wlink(str);
		},
		disp_sitemap_list_tab: function(sep) {
			var str = "<pre>";
			str += "タイトル" + sep + "QID" + sep + "プレビューURL" + sep + "編集URL" + "\n";
			var arr = this.get_sitemap_list_arr();
			for(var i=0; i<arr.length; i++) {
				str += arr[i][0] + sep + this.get_pid(arr[i][1]) + sep + arr[i][1] + sep + arr[i][2] + "\n";
			}
			str += "</pre>";
			this.browse_new_tab(str);
		},
		/* func, サイトマップ一覧別タブ表示 */
		get_sitemap_list_arr: function() {
			var arr = new Array();
			var ul = this.siteMapUl;
			var lis = ul.getElementsByTagName("li");
			var j = 0;
			for(var i=0; i<lis.length; i++) {
				var li = lis.item(i);
				var alinks = li.getElementsByTagName("a");
				var title = alinks.item(0).textContent;
				var view_link = this.clean_referer(this.rootpath + alinks.item(0).getAttribute("href"));
				var edit_link = this.clean_referer(this.rootpath + alinks.item(1).getAttribute("href"));
				var c1 = title;
				var c2 = view_link;
				var c3 = edit_link;
				arr[j] = [c1, c2, c3];
				j++;
			}
			return arr;
		},
		/* func, refererをカットする */
		clean_referer: function(str) {
			 return str.replace(/&site_group_top.*/, "");
		},
		/* --- 特定文字列のボタンをクリック --- */
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
		/* --- 別タブ表示, frex --- */
		browse_new_tab_wlink: function(str) {
			var nwd = window.open("","_blank").document;
			nwd.writeln('<DOCTYPE html>');
			nwd.writeln('<html lang="ja">');
			nwd.writeln('<head><meta charset="utf-8">');
			nwd.writeln('<title>BrNewTab</title>');
			nwd.writeln('<style>body{font-family:"メイリオ",Meiryo,sans-serif;}');
			nwd.writeln('.flex-table div { display: flex; }');
			nwd.writeln('.flex-table div p { margin-right: 25px; }');
			nwd.writeln('.flex-table div p:last-child { margin-right: none; }');
			nwd.writeln('</style>');
			nwd.writeln('</head>');
			nwd.writeln('<body>');
			nwd.writeln('<section class="flex-table">');
			nwd.writeln(str);
			nwd.writeln('</section>');
			nwd.writeln('</body>');
			nwd.writeln('</html>');
		},
		/* --- pidを抽出 --- */
		get_pid: function(str) {
			var pat = new RegExp(/(\?id=)([0-9]+)/);
			if(!pat.test(str)) return "";
			return str.match(pat)[2];
		},
		/* --- upload画像一覧を表示 --- */
		upload_img_list: function(type) {
			var str = "";
			var linepat = new RegExp("([A-Za-z0-9_\\-\\.\\,]+ [\\(]+.+[\\)]+)","g");
			var fpat = new RegExp(/(.+?)( \()(.+?)(\))/);
			if(typeof this.selection === "undefined" || this.selection === null) return;
			if(!linepat.test(this.selection)) return;
			var results = this.selection.match(linepat);
			for(var rs in results) {
				var line = results[rs];
				if(!fpat.test(line)) continue;
				var tmp = line.match(fpat);
				var v1 = tmp[1];
				var v2 = tmp[3];
				str += "<pre>" + v1 + "\t" + v2 + "\n" + "</pre>";
			}
			if(type === "popup") alert(str);
			else this.browse_new_tab(str);
		},
		/* --- upload画像のパスを表示 --- */
		upload_img_path: function(type) {
			var rfpat = new RegExp(/(\()(.+?)(\))/);
			var str = "";
			if(typeof this.selection === "undefined" || this.selection === null) return;
			if(!rfpat.test(this.selection)) return;
			str = this.selection.match(rfpat)[2];
			if(type === "popup") alert(this.uploadpath + str);
			else this.browse_new_tab(this.uploadpath + str);
		},

	};

	var util = new TCMSUtil();
	var sep = "\t";
	var url = util.url.trim();
	if(util.article_pat.test(url) || util.frame_pat.test(url)) {
		if(wlink) util.disp_page_list_tab_wlink();
		else util.disp_page_list_tab(sep);
	} else if(util.parts_template_pat.test(url) || util.page_template_pat.test(url)) {
		if(wlink) util.disp_template_list_tab_wlink();
		else util.disp_template_list_tab(sep);
	} else if(util.sitemap_pat.test(url)) {
		if(wlink) util.disp_sitemap_list_tab_wlink();
		else util.disp_sitemap_list_tab(sep);
	}

})();
