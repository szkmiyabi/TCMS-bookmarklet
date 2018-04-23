javascript:(function(){
  function linkUtil() {
    this.d = document;
    this.rootpath_pat = new RegExp(/https:\/\/.+?\//);
  }
  linkUtil.prototype = {

    disp_href_label: function() {
      var ats = this.d.getElementsByTagName("a");
      var n = 0;
      for(var i=0; i<ats.length; i++) {
        var atag = ats.item(i);
        var href = atag.getAttribute("href");
        href = href.replace(this.rootpath_pat, "");
        var span = this.d.createElement("span");
        span.id = "bkm-href-doclink-span-" + n;
        span.innerHTML = "[ " + href + " ]";
        span.style = "padding-right:5px;color:#fff;font-size:14px;padding:1px;background:#600060;";
        atag.appendChild(span);
        n++;

      }
    },
  };

  var util = new linkUtil();
  util.disp_href_label();

})();
