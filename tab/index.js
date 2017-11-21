var headerUl = document.getElementsByClassName('header_wrap')[0];
var contents = document.getElementsByClassName('tabs_content')[0];

var currentIndex = 0;
var headChildren = headerUl.children;
var contentchilren = contents.children;

headerUl.addEventListener('click', function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;

    if (target.tagName == 'LI') {
        currentIndex = target.getAttribute('data-index');
        setLighter();
        setDisplay();
    }

}, false);

function setLighter () {
    for(var i = 0, len = headChildren.length; i < len; i++) {
        headChildren[i].className = '';
    }

    headChildren[currentIndex].className = 'active';
}

function setDisplay () {
    for(var i = 0, len = contentchilren.length; i < len; i++) {
        contentchilren[i].className = '';
    }

    contentchilren[currentIndex].className = 'active';
}