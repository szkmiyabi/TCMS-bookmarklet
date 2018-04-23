/*-----------------------------------------------------
 *
 	フレーム基本設定の日付自動指定
 *
------------------------------------------------------*/
javascript:(function(){
	var ds_date = "2018-3-1";
	function TCMSUtil() {
		this.d = document;
		this.url = location.href;
		this.selection = window.getSelection().toString();
		this.uploadpath = "/file/img/";
		this.rootpath = "https://www.pref.tokushima.lg.jp";

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

		this.more_set_link = null;
		try { this.more_set_link = this.d.getElementsByClassName("open-close").item(0); } catch(e) {}

		this.display_start_date = null;
		this.display_end_date = null;
		this.display_now_date = null;
		try { this.display_start_date = this.d.getElementById("open_date_time_from"); } catch(e) {}
		try { this.display_end_date = this.d.getElementById("open_date_time_to"); } catch(e) {}
		try { this.display_now_date = this.d.getElementById("display_date_time"); } catch(e) {}

	}
	TCMSUtil.prototype = {
		set_all_date: function(ds_date) {
			this.display_start_date.value = this.get_custom_date(ds_date);
			this.display_now_date.value = this.get_custom_date(ds_date);
			this.valid_from_date = this.get_custom_date(ds_date);
			this.display_end_date.value = "2200-04-01 00:00";
		},
		get_now_date: function() {
			var dt = new Date();
			var y = dt.getFullYear();
			var m = dt.getMonth() + 1;
			var d = dt.getDate();
			var hh = dt.getHours();
			var mm = dt.getMinutes();
			var ss = dt.getSeconds();
			return this.get_full_date_str(y, m, d, hh, mm, "-");
		},
		get_custom_date: function(str) {
			var arr = str.split("-");
			var y = Number(arr[0]);
			var m = Number(arr[1]);
			var d = Number(arr[2]);
			return this.get_full_date_str(y, m, d, 0, 0, "-");
		},
		get_full_date_str: function(y, m, d, hh, mm, sep) {
			var yx = ('0000' + y).slice(-4);
			var mx = ('00' + m).slice(-2);
			var dx = ('00' + d).slice(-2);
			var hhx = ('00' + hh).slice(-2);
			var mmx = ('00' + mm).slice(-2);
			return yx + sep + mx + sep + dx + " " + hhx + ":" + mmx;
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

	};

	var util = new TCMSUtil();
	util.set_all_date(ds_date);

})();
