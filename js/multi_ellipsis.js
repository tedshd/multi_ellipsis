function setEllipsis(domElement, lineCount) {
    var dom = Object.prototype.toString.call(domElement);
    if (dom === '[object String]' || dom === '[object Number]' || dom === '[object Array]' || dom === '[object Function]') {
        console.error('not dom element');
        return;
    }
    if (dom !== '[object HTMLCollection]' && dom !== '[object NodeList]' && dom !== '[object Object]') {
        domElement = [].push(domElement);
    }
    function getStyle(element) {
        return element.currentStyle || window.getComputedStyle(element);
    }
    // add class
    function addClass(dom, className) {
        if (dom.classList) {
            dom.classList.add(className);
        } else {
            dom.className += ' ' + className;
        }
    }
    // remove class
    function removeClass(dom, className) {
        if (dom.classList) {
            dom.classList.remove(className);
        } else {
            var reg = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
            dom.className = dom.className.replace(reg, ' ');
        }
    }
    // check class
    function hasClass(dom, className) {
        if (dom.classList) {
            return dom.classList.contains(className);
        } else {
            return (dom.className.search(className) === -1) ? false: true;
        }
    }
    for (var i = 0; i < domElement.length; i++) {
        var domContainer = domElement[i].parentNode;
        domElement[i].style.display = 'inline-block';
        domContainer.style.display = 'block';
        domContainer.style.lineHeight = 1.5;
        var style = getStyle(domElement[i]),
            styleParent = getStyle(domContainer),
            lh = parseInt(styleParent.fontSize.replace('px', ''), 10),
            h = parseInt(domElement[i].offsetHeight, 10);
        domContainer.style.maxHeight = 1.5*lineCount + 'em';
        console.log(styleParent.fontSize);
        console.log('lh-', lh);
        console.log('h-', domElement[i].offsetHeight);
        if (h > (lh * lineCount)) {
            if (!hasClass(domContainer, 'multi_ellipsis')) {
                addClass(domContainer, 'multi_ellipsis');
            }
        } else {
            if (hasClass(domContainer, 'multi_ellipsis')) {
                removeClass(domContainer, 'multi_ellipsis');
            }
        }
    }
}