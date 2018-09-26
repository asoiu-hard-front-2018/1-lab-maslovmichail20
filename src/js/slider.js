var slider = {
  prev: function(config) {
      return function () {
        config.otherBehaviorBefore && config.otherBehaviorBefore();
  
        var list = document.getElementById(config.listId);
        config.position = Math.min(config.position + config.shiftWidth * config.count, 0);
        list.style.marginLeft = config.position + config.sizeType;
  
        config.otherBehaviorAfter && config.otherBehaviorAfter();
      }
  },
  next: function(config) {
      return function () {
        config.otherBehaviorBefore && config.otherBehaviorBefore();
  
        var list = document.getElementById(config.listId);
        var listElem = list.querySelectorAll('li');
  
        config.position = Math.max(
          config.position - config.shiftWidth * config.count,
          -config.shiftWidth * (listElem.length - config.count)
        );
        list.style.marginLeft = config.position + config.sizeType;
  
        config.otherBehaviorAfter && config.otherBehaviorAfter();
      }
  }
};

var gallerySliderConfig = {
    shiftWidth: 100,
    position: 0,
    count: 1,
    listId: 'gallery-list',
    sizeType: 'vw',
    otherBehaviorBefore: function () {
        var list = document.getElementById('gallery-list');
        var p = -parseInt(list.style.marginLeft) / 100 || 0;

        var curSlideImgs = list.querySelectorAll('li')[p].children;
        curSlideImgs[0].classList.remove('visible');
        curSlideImgs[2].classList.remove('visible');

        curSlideImgs[0].classList.add('hidden');
        curSlideImgs[2].classList.add('hidden');
    },
    otherBehaviorAfter: function () {
        var list = document.getElementById('gallery-list');
        var p = -parseInt(list.style.marginLeft) / 100 + 1 || 0;
        document.getElementById('slider-position').firstChild.textContent = p + ' ';

        var curSlideImgs = list.querySelectorAll('li')[p-1].children;
        curSlideImgs[0].classList.remove('hidden');
        curSlideImgs[2].classList.remove('hidden');

        curSlideImgs[0].classList.add('visible');
        curSlideImgs[2].classList.add('visible');
    }
};

document.getElementById('prev').addEventListener('click', slider.prev(gallerySliderConfig));
document.getElementById('next').addEventListener('click', slider.next(gallerySliderConfig));

var partnersSliderConfig = {
    shiftWidth: 10,
    position: 0,
    count: 6,
    listId: 'partners-list',
    sizeType: 'vw'
};

document.getElementById('partners-prev').addEventListener('click', slider.prev(partnersSliderConfig));
document.getElementById('partners-next').addEventListener('click', slider.next(partnersSliderConfig));