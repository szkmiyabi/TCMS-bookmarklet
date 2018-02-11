/*-----------------------------------------------------
 *
 	Tokushima CMS 各種設定 基底クラス
 *
------------------------------------------------------*/
javascript:(function(){
	function TCMSAdminUtil() {
		this.d = document;
		this.url = location.href;
		this.selection = window.getSelection().toString();
		this.uploadpath = "/file/img/";
		this.rootpath = "https://www.pref.tokushima.lg.jp";

		/* category group */
		this.cr_cat_grp_pat = new RegExp(/.*\/cms\/category_groups/);
		/* category index */
		this.cr_cat_index_pat = new RegExp(/.*\/cms\/categories\/index\//);
		/* category add */
		this.cr_cat_add_pat = new RegExp(/.*\/cms\/categories\/add\//);


		this.menuWrap = this.d.getElementsByClassName("side-nav").item(0);
		this.menuList = this.menuWrap.getElementsByTagName("li");
		this.menu_category = this.menuList.item(20).getElementsByTagName("a").item(0);

		this.cat_add_name = null; /* カテゴリ名称 */
		try { this.cat_add_name = this.d.getElementById("name"); } catch(e) {}
		this.cat_add_disp_order = null; /* 表示順 */
		try { this.cat_add_disp_order = this.d.getElementById("display-order"); } catch(e) {}

		this.cat_add_footers = null;
		this.cat_add_save_btn = null; /* 保存ボタン */
		try { this.cat_add_footers = this.d.getElementsByTagName("footer"); } catch(e) {}
		try { this.cat_add_save_btn = this.cat_add_footers.item(0).getElementsByTagName("button").item(0); } catch(e) {}

		this.cat_index_add_btn = null; /* 新規作成 */
		try { this.cat_index_add_btn = this.d.getElementsByClassName("btn left").item(0); } catch(e) {}

	}
	TCMSAdminUtil.prototype = {
		do_click_cat_add_save_btn: function() {
			var btn = this.cat_add_save_btn;
			btn.click();
		},
		do_click_cat_index_add_btn: function() {
			var btn = this.cat_index_add_btn;
			btn.click();
		}
	};

	var util = new TCMSAdminUtil();
	/* --- Let it any method call --- */
	if(util.cr_cat_index_pat.test(util.url)) util.do_click_cat_index_add_btn();
	if(util.cr_cat_add_pat.test(util.url)) util.do_click_cat_add_save_btn();

})();
