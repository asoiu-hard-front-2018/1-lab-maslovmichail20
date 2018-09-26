(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

function circ(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction))
}

function animate(options) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        var progress = options.timing(timeFraction);
        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function smoothScrollTo(event) {
    event.preventDefault();

    var id = this.hash || this.children[0].hash;
    id = id.substring(1);

    var initScrollTop = window.pageYOffset;
    var needScrollTop = document.getElementById(id).offsetTop;
    var difScroll = needScrollTop - initScrollTop;

    var duration = Math.abs(difScroll);
    if (duration > 750) duration = Math.round(750 + Math.abs(difScroll)/3);
    if (duration < 250) duration = 250;

    animate({
        duration: duration,
        timing: makeEaseOut(circ),
        draw: function(progress) {
            window.scrollTo(0, initScrollTop + difScroll * progress);
        }
    });
}

var liList = document.getElementById('header-menu').children[0].children;
for (var i = 0 ; i < liList.length ; i += 2) {
    liList[i].onclick = smoothScrollTo;
}

var tdChildren = document.getElementById('contact').children[0].children[0].children[0].children;
for (var j = 0 ; j < tdChildren.length ; j += 2) {
    tdChildren[j].onclick = smoothScrollTo;
}

document.getElementById('down-button').onclick = smoothScrollTo;