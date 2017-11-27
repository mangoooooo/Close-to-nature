var container = document.getElementsByClassName('menu-container')[0];
var data = [
    {title: 'menu1', children: null},
    {
        title: 'menu2', 
        children: [
            {title: 'menu2-1', children: null},
            {
                title: 'menu2-2', 
                children: [
                    {title: 'menu2-2-1', children: null},
                    {title: 'menu2-2-2', children: null},
                    {title: 'menu2-2-3', children: null},
                ]
            },
            {title: 'menu2-3', children: null},
        ]
    },
    {title: 'menu3', children: null},
];

function getBaseHtml() {
    var html = '<ul class="menu-bar">';

    data.forEach(item => {
        if (item.children) {
            html += `\
                <li class="menu-item">\
                    <div class="menu-title">${item.title}</div>\
                    ${getSubMenu(item.children)}\
                </li>\
                `;
        } else {
            html += `<li class="menu-item">${item.title}</li>`
        }
    })

    html += '</ul>';

    return html;
}

function getSubMenu(data) {
    var html = '<ul class="sub-menu">';

    data.forEach(item => {
        if (item.children) {
            html += `<li class="sub-menu-item">${getSubMenuChild(item)}</li>`
        } else {
            html += `<li class="sub-menu-item">${item.title}</li>`
        }
    })

    html += '</ul>'

    return html
}

function getSubMenuChild(data) {
    var html = '';

    html += `\
        <div class="sub-menu-title">${data.title}</div>\
        <ul class="sub-menu sub-menu-child">\    
    `
    data.children.forEach(item => {
        if(item.children) {
            html += `<li class="sub-menu-item">${getSubMenuChild(item)}</li>`
        } else {
            html += `<li class="sub-menu-item">${item.title}</li>`
        }
    })

    html += '</ul>'

    return html;

}

// container.addEventListener('mouseover', function(e) {
//     var e = e || window.event;
//     var target = e.target || e.srcElement;

//     if (target.tagName == 'DIV') {
//         var ul = target.nextElementSibling;
//         ul.style.display = 'block';
//     } else if (target.tagName == 'LI') {

//     }
// }, false);

var html = getBaseHtml()
container.innerHTML = html;