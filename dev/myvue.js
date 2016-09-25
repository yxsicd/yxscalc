
var d_table = {
  keys: [
    { name: 'name' },
    { name: 'ip' },
    { name: 'lsrid' },
    { name: 'id' }
  ],
  rows: [
  ]
}

for (var i = 0; i < 1000; i++) {

  var value = ["name" + i, "ip" + i, "ip" + i, i];
  var row = {};

  var wp = Array(value.length).fill(i % 2 == 0)
  wp[1] = true;
  row.attr = {
    select: false,
    editing: false,
    canselect: i % 3 == 0,
    index: i,
    "writeable": wp

  };
  row.value = value;
  d_table.rows.push(row)
}

var res = {
  "page": "页数",
  "page_size": "页大小",
  "search": "搜索",
  "rows_count": "行数",
  "datafile": "导入数据",
  "queryorder": "开始查询",
  "allselect": "全选"
};

var xdata = {
  keys: d_table.keys,
  rows: d_table.rows,
  page: 1,
  page_size: 10,
  res: res,
  keyword: "",
  datafile: "",
  allselect: false,
  lastediting: null,
  selectlist:[]
};

var m_table = new Vue({
  el: '#table_order',
  data: xdata,
  methods: {
    before: function (event) {
      this.page--
    },
    after: function (event) {
      this.page++
    },
    changeselect: function (event) {
      var that = this;
      var needselect = !that.allselect;
      if (needselect) {
        for (var i = 0; i < that.rows_show.length; i++) {
          var ret = that.rows_show[i]["rowobject"]["attr"]["canselect"] && needselect;
          var index = that.rows_show[i]["rowobject"]["attr"]["index"];
          var oldvalue = that.rows[index];
          oldvalue.attr.select = ret;
          that.rows.$set(index, oldvalue);
        }
      }
      else {
        for (var i = 0; i < that.rows_show.length; i++) {
          var ret = needselect;
          var index = that.rows_show[i]["rowobject"]["attr"]["index"];
          var oldvalue = that.rows[index];
          oldvalue.attr.select = ret;
          that.rows.$set(index, oldvalue);
        }
      }
    },
    changeediting: function (event) { 
      var that = this;
      var needselect = !that.allselect;
      if (that.lastediting)
      { 
        that.lastediting.editing = false;
      }  
    }
  },
  computed: {

    // 一个计算属性的 getter
    rows_count: function () {
      // `this` 指向 vm 实例
      return this.rows_filter.length;
    },
    edit_rows: function () {
      var that = this;
      var editorrows = that.rows.map(function (d, i) {
        var jsonvaluestring = JSON.stringify(d.value);
        var ret = {
          "rowobject": d,
          "jsonvalue": jsonvaluestring,
          "edit": JSON.parse(jsonvaluestring),
          "valid": Array(d.length).fill(false),
        };
        return ret;
      });
      return editorrows;
    },
    rows_filter: function () {
      var that = this;
      var re = new RegExp(that.keyword)
      var fi_row = that.edit_rows.filter(function (d) {
        return re.test(d.jsonvalue);
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