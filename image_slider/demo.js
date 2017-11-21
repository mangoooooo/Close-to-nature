var listWrap = document.getElementsByClassName('pic_list_wrap')[0];
var imgUl   = document.getElementsByTagName('ul')[0];
var imgLi   = imgUl.getElementsByTagName('li');
var prevBtn = document.getElementsByClassName('prev')[0];
var nextBtn = document.getElementsByClassName('next')[0];
var btnUl   = document.getElementsByTagName('ul')[1];
var btnLi   = btnUl.getElementsByTagName('li');

var ulLeft  = parseInt(imgUl.style.left) || 0;
var liWidth = 400;
var ulWidth = 0;
var index   = 0;
var loop    = true;
var timer   = null;
var seconds = 2000;

if (loop) {
    var choneFirst = imgLi[0].cloneNode(true);
    var cloneLast  = imgLi[imgLi.length - 1].cloneNode(true);

    imgUl.appendChild(choneFirst);
    imgUl.insertBefore(cloneLast, imgLi[0]);

    ulLeft = -liWidth;
    imgUl.style.left = ulLeft + 'px';
}

ulWidth = imgLi.length * liWidth;
imgUl.style.width = ulWidth + 'px';  //  使得ul够宽

autoPlay()

prevBtn.addEventListener('click', function () {
    if (!loop && index == 0) {
        return false;
    }

    index--;
    animate(liWidth);
    buttonShow();
}, false)

nextBtn.addEventListener('click', function () {
    if (!loop && index == imgLi.length - 1) {
        return false;
    }
    
    index++;
    animate(-liWidth);
    buttonShow();
}, false)

btnUl.addEventListener('click', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;

    if (target.tagName == 'LI' && target.className == '') {
        index = target.getAttribute('data-index');
        buttonShow()
    }
}, false)

listWrap.addEventListener('mouseover', stop, false)

listWrap.addEventListener('mouseout', autoPlay, false)

function buttonShow () {
    if (loop && index > imgLi.length - 3) {
        index = 0
    }
    if (index < 0) {
        index = imgLi.length - 3
    }

    for (var i = 0, len = btnLi.length; i < len; i++) {
        btnLi[i].className = '';
    }

    btnLi[index].className = 'active'
}

function animate (offset) {
    if (loop && ulLeft == 0) {
        ulLeft = -(liWidth * (imgLi.length - 2))
    }

    if (loop && ulLeft == -(liWidth * (imgLi.length - 1))) {
        ulLeft = -liWidth;
    }


    ulLeft += offset;
    imgUl.style.left = ulLeft + 'px';
}

function autoPlay () {
    if (timer) {
        return false;
    }

    timer = setInterval(function () {
        nextBtn.click()
    }, seconds)
}

function stop () {
    if (!timer) {
        return false;
    }
    
    clearInterval(timer);
    timer = null;
}