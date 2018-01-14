javascript:(function(){
	function TCMSUtil() {
		d = document;
		url = location.href;
	}
	TCMSUtil.prototype = {
		upload_image_list_2_tsv: function() {
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
			alert(str);
		}
	};

	var util = new TCMSUtil();
	util.upload_image_list_2_tsv();
})();