/*-----------------------------------------------------
 *
 	公開URLをポップアップ/ダイレクト参照
 *
------------------------------------------------------*/
javascript:(function(){
	var tp="show"; /*-show, br-*/
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

		/* プレビューページ情報テーブル */
		this.previewDetailTbl = null;
		this.previewDetailRows = null;
		this.public_url = null;
		this.public_owner = null;
		try { this.previewDetailTbl = this.d.getElementsByClassName("col2").item(0); } catch(e) {}
		try { this.previewDetailRows = this.previewDetailTbl.rows; } catch(e) {}
		try {
			this.public_url = this.previewDetailRows.item(2).cells.item(1).getElementsByTagName("span").item(1).textContent;
		} catch(e) {}
		try {
			this.public_owner = this.previewDetailRows.item(4).cells.item(1).textContent;
		} catch(e) {}

	}

	TCMSUtil.prototype = {
		br_public_url: function() {
			window.open(this.public_url, "_blank");
		},
		disp_public_url: function() {
			var str = '<a style="display:block;text-decoration:none" href="';
			str += this.public_url + '" target="_blank">' + this.public_url + "</a>";
			str += '<span style="display:block">所有者:' + this.public_owner + "</span>";
			alert(str);
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

	};

	var util = new TCMSUtil();
	if(tp === "show") util.disp_public_url();
	else util.br_public_url();

})();
