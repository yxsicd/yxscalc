# 查询阿里巴巴订单状态
### 操作步骤
1. 导出1688的订单并用excel打开，选择另存为 “文本文件(制表符分隔)”, 比如 order.txt
2. 登录1688并打开某一个订单的详情页面 https://trade.1688.com/order/unify_buyer_detail.htm?orderId=1590748498463944
3. 请使用chrome浏览器打开页面，并按F12，在页面下的console页签内          输入如下```jQuery.getScript("https://yxsicd.github.io/yxscalc/dev/expressmain.js")```并回车
4. 待页面加载后在右上角选择文件并导入，然后点击 “开始查询”，待查询结束后点击 “导出数据”
