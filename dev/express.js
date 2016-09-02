// https://down.1688.com/tradeorder/20160813/32/1471103192047_693491006.xls?spm=0.0.0.0.SE0Lru&file=1471103192047_693491006.xls

// <input type="hidden" id="WL-LP00052027495752" class="companyId" logisticsid="LP00052027495752"
//   companyname="圆通速递" billno="700180129588" viewtype="buyer" orderid="1868765765873944" value="YTO">


var yxs_store = localforage.createInstance({
  name: "expressdb"
});

function saveCache(yxscache) {
  yxs_store.setItem("mycache", yxscache).then(function (d) {
    yxs_store.getItem("mycache").then(function (d1) {
      var l = Object.keys(d1).length;
      console.log(l);
    })
  });
}

function loadCache(callback) {
  yxs_store.getItem("mycache").then(callback).catch(callback);
}

function refreshOrderList(mythat, callback) {
  var that = this;
  that.callback = callback;
  that.orderlist = mythat.orderlist;

  loadCache(function (yxscache) {
    // debugger;
    yxscache = {};
    var orderIndex = -1;
    //1682148643373944

    function checkExpress(tradeId, cpCode, mailNo) {
      window.mygetdata = function getdata(d) {
        // console.log(d);
        if (!yxscache[tradeId]) { yxscache[tradeId] = {}; }
        yxscache[tradeId]["express_check"] = [tradeId, cpCode, mailNo];
        yxscache[tradeId]["express"] = d;
        checkOrder();
      }
      jQuery.getScript("https://wuliu.1688.com/order/ajax/logistics_trace_ajax.jsx?tradeId=" +
        tradeId + "&mailNo=" + mailNo + "&cpCode=" + cpCode + "&callback=mygetdata"
      )

      // checkExpress("1868765765873944", "YTO", "700180129588");
      
    }

    function checkOrder() {
      orderIndex++;
      // debugger
      if (orderIndex <= mythat.orderlist.length) {
        mythat.check_index = orderIndex;
      }
      orderid = mythat.orderlist[orderIndex];
      if (!orderid || orderIndex == mythat.orderlist.length) {
        // for (var i = 0; i < 4000; i++) {
        //   var idx = parseInt("1881965933383944") + i;
        //   yxscache[idx] = yxscache["1881965933383944"];
        // };
        that.callback ? that.callback(yxscache) : 0;
        saveCache(yxscache);
        return;
      }
      
      function parseHtml (d) {
        var mydiv = document.createElement("div");
        mydiv.innerHTML = d;
        var order_status = mydiv.querySelector(".order-status");
        if(!order_status && window.nowurl!="new_step_order_detail"){
          //new_step_order_detail.htm
          jQuery.get("https://trade.1688.com/order/new_step_order_detail.htm?orderId=" + orderid).then(parseHtml);
          window.nowurl="new_step_order_detail";
          return;
        }
        
        if (!yxscache[orderid]) { yxscache[orderid] = {}; }
        if (order_status) {
          yxscache[orderid]["status"] = order_status.textContent;
        }
        var list = mydiv.querySelector("[logisticsId]");
        // console.log(list);
        if (!list) {
          checkOrder();
          return;
        }
        var tradeId = list.getAttribute("orderid");
        var cpCode = list.getAttribute("value");
        var mailNo = list.getAttribute("billno");
        checkExpress(tradeId, cpCode, mailNo)
      }
      
      jQuery.get("https://trade.1688.com/order/unify_buyer_detail.htm?orderId=" + orderid).then(parseHtml);
      window.nowurl="unify_buyer_detail";
    }

    checkOrder();

  });
}

// var orderList = [
//   "1881965933383944"
//   , "1868789281523944"
//   , "1868765765873944"
// ]
// refreshOrderList(orderList);
