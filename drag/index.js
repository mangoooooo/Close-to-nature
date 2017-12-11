var footer = document.getElementsByClassName('footer')[0]
var list   = document.getElementsByClassName('list')[0].children[0]
var item   = list.children;
var selectItem = null;

list.addEventListener('dragstart', function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;

    if (target.nodeName == 'LI') {
        e.dataTransfer.setDragImage(target, 0, 0);  //  定位
        selectItem = target
    }
}, false)


list.addEventListener('dragend', function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;

    if (target.nodeName == 'LI') {
       console.log('拖拽结束')
    }
}, false)

footer.addEventListener('dragenter', function (event) {
    console.log('进入垃圾桶')
    event.target.style.backgroundColor = '#DE7259'
}, false)

footer.addEventListener('dragover', function (event) {
    console.log('在垃圾桶上方')

    //  阻止默认事件，否则drop函数不执行
    event.preventDefault();
    return true;
}, false)

footer.addEventListener('dragleave', function (event) {
    console.log('离开垃圾桶')
    reset()
}, false)

footer.addEventListener('drop', function (event) {
    console.log('在垃圾桶中松开')
    selectItem.remove()
    reset()
}, false)

function reset () {
    footer.style.backgroundColor = 'antiquewhite'
}