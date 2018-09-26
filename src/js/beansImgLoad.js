document.body.onload =  function () {
   var beans = document.getElementsByClassName('bean');
   for (var i = 0 ; i < beans.length ; i++) {
       beans[i].style.opacity = '1';
   }
};