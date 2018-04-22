javascript:(function(){
  function docLinkUtil() {
    this.d = document;
    this.ex_arr = ["pdf","doc","docx","xls","xlsx","jtd","ppt","pptx","csv"];
    this.path_pat = new RegExp(/.*\/.*/);
    this.fn_pat = new RegExp(/(.+\/)(.+)/);
    this.ex_pat = new RegExp(/(\.)(.+)/);
  }
  docLinkUtil.prototype = {
    is_doclink: function(fname) {
      var flg = false;
      var ext = this.get_ext(fname);
      if(ext === "") return flg;
      for(var i=0; i<this.ex_arr.length; i++) {
        var rw = this.ex_arr[i];
        if(rw === ext) {
          flg = true;
          break;
        }
      }
      return flg;
    },
    get_ext: function(fname) {
      var ret = "";
      if(!this.ex_pat.test(fname)) return ret;
      var mt = fname.match(this.ex_pat);
      ret = mt[2];
      return ret;
    },
    get_name: function(href) {
      var ret = "";
      if(!this.path_pat.test(href)) {
        return href;
      }
      if(this.fn_pat.test(href)) {
        var mt = href.match(this.fn_pat);
        ret = mt[2];
      }
      return ret;
    },
    disp_doclink_label: function() {
      var ats = this.d.getElementsByTagName("a");
      var n = 0;
      for(var i=0; i<ats.length; i++) {
        var atag = ats.item(i);
        var href = atag.getAttribute("href");
        var fname = this.get_name(href);
        if(this.is_doclink(fname)) {
          var span = this.d.createElement("span");
          span.id = "bkm-href-doclink-span-" + n;
          span.innerHTML = "[ " + fname + " ]";
          span.style = "padding-right:5px;color:#fff;font-size:14px;padding:1px;background:#600060;";
          atag.appendChild(span);
          n++;
        }
      }
    },
  };

  var util = new docLinkUtil();
  util.disp_doclink_label();

})();
