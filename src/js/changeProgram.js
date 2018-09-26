var linkList = document.getElementById('programs-menu').children[0].children;
var programList = [
    document.getElementById('basic'),
    document.getElementById('premium'),
    document.getElementById('platinum')
];


function changeProgram() {
    for (var i = 0 ; i < 3 ; i++) {
        linkList[i].classList.remove('active');
        programList[i].classList.remove('visible');
        programList[i].classList.add('hidden');
    }

    this.parentElement.classList.add('active');
    var chooseProgram = document.getElementById(this.innerText.toLowerCase());
    chooseProgram.classList.add('visible');
    chooseProgram.style.opacity = '0';

    setTimeout(function () {
        chooseProgram.style.opacity = '1';
    }, 15);
}

for (var j = 0 ; j < 3 ; j++) {
    linkList[j].children[0].onclick = changeProgram;
}