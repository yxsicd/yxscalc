
var d_table = {
  keys: [
    { name: 'orderid' },
    { name: 'status' },
    { name: 'latest' },
    { name: 'detail' }
  ],
  rows: [
  ]
}

for (var i = 0; i < 30000; i++) {
  d_table.rows.push(
    ["orderid" + i, "status" + i, "latest" + i, "detail" + i]
  )
}

var res = {
  "page": "页数",
  "page_size": "页大小",
  "search": "搜索",
  "rows_count": "行数",
  "datafile": "导入数据",
  "queryorder": "开始查询"
};

var m_table = new Vue({
  el: '#table_order',
  data: {
    keys: d_table.keys,
    rows: d_table.rows,
    page: 1,
    page_size: 10,
    res: res,
    keyword: "",
    datafile: "",
  },
  methods: {
    before: function (event) {
      this.page--
    },
    after: function (event) {
      this.page++
    },
    queryorder: function (event) {

      var that = this;
      if (!this.files) {
        return;
      }

      if (this.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
          content = e.target.result;
          var lines = content.split("\r\n");

          var olist = lines.map(function (d) {
            var ds = d.split("\t")
            var id = parseInt(ds[0]);
            return id;
          }).filter(function (d) { return d; });
          // console.log(olist);
          this.orderlist = olist;
          console.log("queryorder: ", this.orderlist);

          function refresh(data) {
            var keys = Object.keys(data);
            var ret = [];
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              var item = data[key];
              var status = item["status"];
              var express_check = item["express_check"];
              var express = item["express"];

              ret.push([key, status, express_check, express]);
            }
            that.rows = ret;
          }

          refreshOrderList(this.orderlist, refresh);
        }
        reader.readAsText(this.files[0], "gb2312");
        // reader.readAsArrayBuffer(files[0]);
      }
    },
    filechange: function (event) {
      // console.log(event);
      this.files = event.target.files;
    }
  },
  computed: {
    // 一个计算属性的 getter
    rows_count: function () {
      // `this` 指向 vm 实例
      return this.rows_filter.length;
    },
    rows_filter: function () {
      var that = this;
      var fi_row = that.rows.filter(function (d) {
        var rowstring = JSON.stringify(d);
        return rowstring.match(that.keyword);
      });
      return fi_row;
    },
    rows_show: function () {
      var that = this;
      var rows_filter = that.rows_filter;
      var page = parseInt(that.page);
      var page_size = parseInt(that.page_size);

      var index = (page - 1) * page_size;
      if (index >= rows_filter.length) {
        var page_end = Math.round(rows_filter.length / page_size)
        that.page = page_end;
        index = (page_end - 1) * page_size;
      }
      if (index < 0) {
        index = 0;
        that.page = 1;
      }
      var ret = rows_filter.slice(index, index + page_size);
      return ret;
    }
  }
})