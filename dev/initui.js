

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
  "rows_count": "行数"
};

var m_table = new Vue({
  el: '#table_order',
  data: {
    keys: d_table.keys,
    rows: d_table.rows,
    page: 1,
    page_size: 10,
    res: res,
    keyword: ""
  },
  methods: {
    before: function (event) {
      this.page--
    },
    after: function (event) {
      this.page++
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


