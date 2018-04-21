/*-----------------------------------------------------
 *
 	再承認処理
 *
------------------------------------------------------*/

javascript:(function(){
	var projectID = "S52";
	function TCMSUtil() {
		this.d = document;
		this.url = location.href;
		this.selection = window.getSelection().toString();
		this.uploadpath = "/file/img/";
		this.rootpath = "https://www.pref.tokushima.lg.jp";

		/* メニューobjcet */
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

		/* サイトマップ画面の正規表現 */
		this.sitemap_pat = new RegExp(/(.*)(\/cms\/site_maps\/)(frame$|page)/);

		/* フレーム画面の正規表現 */
		this.frame_pat = new RegExp(/.*\/cms\/frames$/);
		this.frame_preview_pat = new RegExp(/.*\/cms\/frames\/view/);
		this.frame_edit_pat = new RegExp(/.*\/cms\/frames\/edit/);

		/* 記事画面の正規表現 */
		this.article_pat = new RegExp(/.*\/cms\/article_pages$/);
		this.article_preview_pat = new RegExp(/.*\/cms\/article_pages\/view/);
		this.article_edit_pat = new RegExp(/.*\/cms\/article_pages\/edit/);

		/* ページテンプレート画面正規表現 */
		this.page_template_pat = new RegExp(/.*\/cms\/templates$/);
		this.page_template_preview_pat = new RegExp(/.*\/cms\/templates\/view/);
		this.page_template_edit_pat = new RegExp(/.*\/cms\/templates\/edit/);

		/* パーツテンプレート画面正規表現 */
		this.parts_template_pat = new RegExp(/.*\/cms\/part_templates$/);
		this.parts_template_preview_pat = new RegExp(/.*\/cms\/part_templates\/view/);
		this.parts_template_edit_pat = new RegExp(/.*\/cms\/part_templates\/edit/);

		/* 承認対象画面正規表現 */
		this.approvals_pat = new RegExp(/.*\/cms\/approvals$/);
		this.approvals_list_pat = new RegExp(/.*\/cms\/approvals\?.+/);
		this.approvals_preview_pat = new RegExp(/(.*\/cms\/approvals\/)(part_template|template)$/);
		this.approvals_confirm_pat = new RegExp(/(.*\/cms\/approvals\/)(part_template_base|template_base)$/);

		this.approvals_frame_rq_pat = new RegExp(/.*cms\/frames\/approval_request\?/);
		this.approvals_frame_rq_select_pat = new RegExp(/.*cms\/frames\/approval_request_select\?/);
		this.approvals_frame_pv_pat = new RegExp(/(.*cms\/approvals\/)(frame|frame_base|frame_article_preview)$/);
		this.approvals_frame_cfm_pat = new RegExp(/(.*\/cms\/approvals\/frame_article_base)$/);

		this.approvals_article_rq_pat = new RegExp(/.*cms\/article_pages\/approval_request\?/);
		this.approvals_article_rq_select_pat = new RegExp(/.*cms\/article_pages\/approval_request_select\?/);
		this.approvals_article_pv_pat = new RegExp(/.*cms\/approvals\/article$/);
		this.approvals_article_cfm_pat = new RegExp(/.*cms\/approvals\/article_base$/);

		this.approvals_cmp_pat = new RegExp(/.*cms\/approvals\?FormData=keep$/);

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

		this.auth_btn = null;
		try { this.auth_btn = this.d.getElementById("approval-request"); } catch(e) {}

	}

	TCMSUtil.prototype = {

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
		do_search: function(str) {
			this.search_textbox.val
		}
	};

	var util = new TCMSUtil();

	/* first, stage */
	if(util.parts_template_edit_pat.test(util.url)
		|| util.page_template_edit_pat.test(util.url)
		|| util.frame_edit_pat.test(util.url)
		|| util.article_edit_pat.test(util.url)) {
		util.auth_btn.click();
	}

	/* second, stage */
	if(util.parts_template_preview_pat.test(util.url)
		|| util.page_template_preview_pat.test(util.url)) {
		util.menu_auth.click();
	}

	/* third, stage */
	if(util.approvals_pat.test(util.url)) {
		util.search_textbox.value = projectID;
		util.click_btn_by_keywd("検索");
	}

	/* fourth, stage */
	if(util.approvals_preview_pat.test(util.url)) {
		util.click_btn_by_keywd("次へ");
	}

	if(util.approvals_frame_rq_pat.test(util.url) ||
			util.approvals_article_rq_pat.test(util.url)) {
		var testObj = document.getElementById("device-ok");
		if(testObj.textContent.trim() === "確定") testObj.click();
	}

	if(util.approvals_frame_rq_select_pat.test(util.url) ||
			util.approvals_article_rq_select_pat.test(util.url)) {
		var query = function(obj) {
			var cr = null;
			for(var i=0; i<obj.length; i++) {
				var row = obj.item(i);
				var attr_type = row.getAttribute("type");
				var attr_val = row.textContent.trim();
				if(attr_type==="submit" && attr_val==="確定") {
					cr = row;
				}
			}
			return cr;
		};
		var btns = document.getElementsByTagName("button");
		var testObj = query(btns);
		if(testObj != null) testObj.click();
	}

	if(util.approvals_frame_pv_pat.test(util.url) ||
			util.approvals_article_pv_pat.test(util.url)) {
		util.click_btn_by_keywd("次へ");
	}

	/* fifth, stage */
	if(util.approvals_confirm_pat.test(util.url)
		|| util.approvals_frame_cfm_pat.test(util.url)
		|| util.approvals_article_cfm_pat.test(util.url)) {
		util.click_btn_by_keywd("承認する");
	}

	/* last, stage */
	if(util.approvals_cmp_pat.test(util.url)) {
		util.menu_auth.click();
	}

})();
