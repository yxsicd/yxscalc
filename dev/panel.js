
var dragobj;

document.onmousemove = function (e) {
  $(".mouse").css({ top: e.y, left: e.x });
  $(".mouse").html(JSON.stringify([e.x, e.y]));

  if (dragobj) {

    // var px = dragobj.parentElement.offsetLeft;
    // var py = dragobj.parentElement.offsetTop;
    // var h = dragobj.parentElement.offsetHeight;
    // var w = dragobj.parentElement.offsetWidth;

    var rects = dragobj.parentElement.getClientRects();
    var rect = rects[0];

    var px = rect.left;
    var py = rect.top;
    var h = rect.height;
    var w = rect.width;


    var ox = e.x - px;
    var oy = e.y - py;
    var rx = ox / w * 100;
    var ry = oy / h * 100;

    var classList = dragobj.classList;
    // console.log(classList);
    if (classList.contains("sp_y")) {
      $(dragobj).css({ top: ry + "%" });
    }
    if (classList.contains("sp_x")) {
      $(dragobj).css({ left: rx + "%" });
    }




    var pe = $(dragobj.parentElement);
    var sp_list = pe.find(".sp_x");
    var panel_list = pe.find(".panel");
    console.log(sp_list);
    console.log(panel_list);

    var rect_1 = sp_list[0].getClientRects()[0];
    var rect_2 = sp_list[1].getClientRects()[0];

    var rect_x1 = {
      top: rect.top, left: rect.left,
      height: rect_1.bottom - rect.top, width: rect_1.right - rect.left
    }

    var rect_x2 = {
      top: rect_1.top, left: rect_1.left,
      height: rect_2.bottom - rect_1.top, width: rect_2.right - rect_1.left
    }

    var rect_x3 = {
      top: rect_2.top, left: rect_2.left,
      height: rect.bottom - rect_2.top, width: rect.right - rect_2.left
    }

    function offsetRect(myrect, offset) {
      return {
        top: myrect.top - offset.y,
        left: myrect.left - offset.x,
        height: myrect.height,
        width: myrect.width,
      }
    }
    rect_x1 = offsetRect(rect_x1, { x: rect.left, y: rect.top });
    rect_x2 = offsetRect(rect_x2, { x: rect.left, y: rect.top });
    rect_x3 = offsetRect(rect_x3, { x: rect.left, y: rect.top });


    $(panel_list[0]).css(rect_x1);
    $(panel_list[1]).css(rect_x2);
    $(panel_list[2]).css(rect_x3);



  }

}

document.onmousedown = function (e) {
  dragobj = e.target
  console.log(e.target);
}

document.onmouseup = function (e) {
  console.log(e.target);
  dragobj = undefined;
}

