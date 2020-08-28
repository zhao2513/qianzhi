let imgArr = $('img');
for (const key of imgArr) {
    $(imgArr[key]).on("dragstart", function() { return false; })
}

let oldDom = null;

//总功能控制
function switchImg(dom) {
    if (oldDom == dom) {
        return;
    }
    oldDom = dom;
    $('.demo').removeClass('demo');
    console.log($('.demo'));
    let demo = $('<div>');
    demo.addClass('demo')
        .append($('#target'))
        .appendTo($(dom))

    //选择方块
    choose(demo);
    //加上拖拽功能
    draggable(demo);
    //加上缩放功能
    changeDrag(demo[0]);
    $('.edit-right').css({
        display: 'block'
    })
    settingVal($("#target").width(), $("#target").height(), demo[0].offsetLeft, demo[0].offsetTop)
}

$(".app").on('mouseenter', function(e) {
    e.stopPropagation();
    console.log($(this), $(this).index());
    switchImg(this)
        // changeDrag($(".div-box")[0])
});

//设置显示隐藏
let flat = true;
$(".set").on('click', e => {
    if (flat) {
        $('.edit-right').css({
            display: 'block'
        })
        flat = false;
    } else {
        $('.edit-right').css({
            display: 'none'
        })
        flat = true;
    }

})



//复制功能
$('.copy').on('click', (e) => {

    let targetImg = $('<img>')[0];
    targetImg.src = './src/img/target.png';
    // document.body.appendChild(img)
    console.log(targetImg);
    targetImg.onload = function() {

        let div = $('<div>').append(targetImg).addClass('copy-div');
        let div1 = $('<div>').addClass('mt').addClass('app').append(div).appendTo($('.content-mid'));
        console.log(div, div1);

        $(targetImg).on("dragstart", function() { return false; });
        // draggable(div[0]);
    };


})

$('.delete').on('click', e => {
    let num = $('.app').length - 1;
    $('.app').eq(num).remove();
})

//移动功能
function draggable(dom) {

    $(dom).on('mousedown', function(e) {
        console.log($(this).offset().left);
        e.stopPropagation();
        let disX = e.clientX - this.offsetLeft;
        let disY = e.clientY - this.offsetTop;
        let newLeft = 0;
        let newTop = 0;
        $(document).on('mousemove', function(e) {
            newLeft = e.clientX - disX;
            newTop = e.clientY - disY;
            $(dom).css({
                left: newLeft,
                top: newTop,

            })
            settingVal($("#target").width(), $("#target").height(), $(dom)[0].offsetLeft, $(dom)[0].offsetTop)

        })

        $(document).on('mouseup', function(e) {
            $(this).off('mousedown');
            $(this).off('mousemove');

        })
    })
}


//choose 选中(添加小方块)
function choose(dom) {
    let divBox = $("<div>");
    divBox.addClass('div-box');

    //1.左上
    $("<span>")
        .css({
            left: -3,
            top: -3
        })
        .addClass('span-rec')
        .appendTo(divBox);


    //2.右上
    $("<span>")
        .css({
            right: -3,
            top: -3
        })
        .addClass('span-rec')
        .appendTo(divBox);



    //3.左下
    $("<span>")
        .css({
            left: -3,
            bottom: -3
        })
        .addClass('span-rec')
        .appendTo(divBox);



    //4.右下
    $("<span>")
        .css({
            right: -3,
            bottom: -3
        })
        .addClass('span-rec')
        .appendTo(divBox);

    divBox.css({
            width: '100%',
            height: "100%"
        })
        .appendTo(dom);
}


// change:拉伸-拖拽(小方块)
function changeDrag(dom) {
    //比值
    let ratio = $(dom).width() / $(dom).height();
    let oldHeight = $(dom).height();
    let oldWidth = $(dom).width();
    $(dom).on('mousedown', 'span', function(e) {
        e.stopPropagation();
        //获取固定的差值
        let disY = e.clientY - this.offsetTop;
        //parent的offsetLeft
        let ParentDom = $(dom)[0];
        let parentTop = ParentDom.offsetTop;
        let parentLeft = ParentDom.offsetLeft;
        let parentRight = $(dom).parent().width() - parentLeft - $(dom).width();
        let parentBottom = $(dom).parent().height() - parentTop - $(dom).height();
        let parentY = oldHeight - (parentTop + parentBottom);
        let parentX = oldWidth - (parentLeft + parentRight)
            //newTop:方块相对于原来位置的偏移量，也是整体边框的偏移量
        let newTop = 0;
        let newBottom = 0;
        let newRight = 0;
        let newLeft = 0;
        let that = this;
        let parentHeight = $(dom).height();
        let i = $(this).index();

        $(document).on('mousemove', e => {
            newTop = e.clientY - disY;
            if (i == 0) {

                newLeft = newTop * ratio;
                $(dom).css({
                    left: newLeft + parentLeft,
                    top: newTop + parentTop,
                    width: parentX - newLeft,
                    height: parentY - newTop
                })

            } else if (i == 1) {
                newLeft = newTop * ratio;
                $(dom).css({
                    top: newTop + parentTop,
                    right: newLeft + parentRight,
                    width: parentX - newLeft,
                    height: parentY - newTop
                })

            } else if (i == 2) {

                newBottom = parentHeight - $(that).height() - newTop;
                newLeft = newBottom * ratio
                $(dom).css({
                    bottom: newBottom + parentBottom,
                    left: newLeft + parentLeft,
                    width: parentX - newLeft,
                    height: parentY - newBottom
                })
            } else {

                newBottom = parentHeight - $(that).height() - newTop;
                newLeft = newBottom * ratio
                $(dom).css({
                    bottom: newBottom + parentBottom,
                    right: newLeft + parentRight,
                    width: parentX - newLeft,
                    height: parentY - newBottom
                })
            }
            settingVal($("#target").width(), $("#target").height(), $(dom)[0].offsetLeft, $(dom)[0].offsetTop)
        });

        $(document).on('mouseup', function(e) {
            $(this).off('mousedown');
            $(this).off('mousemove');

        })
    })


}


// 设置框

function settingVal(w, h, x, y) {
    $('.w')[0].value = Math.round(parseInt(x));
    $('.h')[0].value = Math.round(parseInt(h));
    $('.x')[0].value = Math.round(parseInt(x));
    $('.y')[0].value = Math.round(parseInt(y));
}