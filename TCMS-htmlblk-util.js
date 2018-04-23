javascript:(function(){
  function htmlBlkUtil() {
    this.d = document;
    this.rootpath_pat = new RegExp(/https:\/\/.+?\//);
  }
  htmlBlkUtil.prototype = {

    disp_html_label: function() {
      var hts = this.d.getElementsByClassName("html");
      var replacer = function(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };
      var n = 0;
      for(var i=0; i<hts.length; i++) {
        var ht = hts.item(i);
        var ht_txt = ht.innerHTML;
        var span = this.d.createElement("span");
        span.id = "bkm-href-htmlblk-span-" + n;
        span.innerHTML = "[ " + replacer(ht_txt) + " ]";
        span.style = "padding-right:5px;color:#fff;font-size:14px;padding:1px;background:#600060;";
        ht.appendChild(span);
        n++;

      }
    },
  };

  var util = new htmlBlkUtil();
  util.disp_html_label();

})();
