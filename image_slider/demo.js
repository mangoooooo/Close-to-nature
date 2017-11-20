var imgUl   = document.getElementsByTagName('ul')[0];
var imgLi   = imgUl.getElementsByTagName('li');
var prevBtn = document.getElementsByClassName('prev')[0];
var nextBtn = document.getElementsByClassName('next')[0];
var btnUl   = document.getElementsByTagName('ul')[1];
var btnLi   = btnUl.getElementsByTagName('li');

var ulLeft  = parseInt(imgUl.style.left);
var liWidth = 400;
var ulWidth = 0;
var index   = 0;

// imgUl.innerHTML += imgUl.innerHTML;     //  无缝滚动
ulWidth = imgLi.length * liWidth;
imgUl.style.width = ulWidth + 'px';  //  使得ul够宽

prevBtn.addEventListener('click', function () {
    if (index == 0) {
        return false;
    }

    index--;
    buttonShow();
    animate(liWidth);
}, false)

nextBtn.addEventListener('click', function () {
    if (index == 4) {
        return false;
    }
    
    index++;
    buttonShow();
    animate(-liWidth);
}, false)

btnUl.addEventListener('click', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;

    if (target.tagName == 'LI' && target.className == '') {
        index = target.getAttribute('data-index');
        buttonShow()
    }
}, false)

function buttonShow () {
    for (var i = 0, len = btnLi.length; i < len; i++) {
        btnLi[i].className = '';
    }

    btnLi[index].className = 'active'
}

function animate (offset) {
    ulLeft += offset;
    imgUl.style.left = ulLeft + 'px';
}