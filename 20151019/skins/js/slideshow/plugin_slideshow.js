(function () {
    'use strict';
    pluginEffect.slideshow = {
        initial: function () {
            var main = this;

            main.param.slideUl
                .find('li')
                .eq(0)
                .addClass('ele-slideshow-active')
                .css({
                    'z-index': 1,
                    opacity : 1
                })
                .siblings()
                .css({
                    'z-index': 0,
                    opacity : 0
                });
        },
        move: function (index, type) {
            var main = this,
                param = main.settings,
                lastIndex = main.param.slideUl.find('li.ele-slideshow-active').data('index'),
                ulLeft, liLeft;

            if(main.param.fullScreen === 1){
                main.param.mainWidth = main.param.slide.width();
            }

            ulLeft = (index > lastIndex - 1) ? -main.param.mainWidth : main.param.mainWidth;
            liLeft = (index > lastIndex - 1) ? main.param.mainWidth : -main.param.mainWidth;

            // arrow last to first
            if(type === 'isArrow' && index === 0 && lastIndex === main.param.total){
                ulLeft = -main.param.mainWidth;
                liLeft = main.param.mainWidth;
            }

            // arrow first to last
            if(type === 'isArrow' && index === main.param.total - 1 && lastIndex === 1){
                ulLeft = main.param.mainWidth;
                liLeft = -main.param.mainWidth;
            }

            main.param.slideUl
                .find('li')
                .removeClass('ele-slideshow-active')
                .eq(index)
                .addClass('ele-slideshow-active')
                .css({
                    'left': liLeft,
                    opacity : 1
                });

            main.moveTl.to(
                main.param.slideUl, param.animationTime, {
                    left: ulLeft,
                    ease: Expo.easeInOut
                }
            );
        },
        reSet: function (main, index) {
            main.param.slideUl
                .css('left', 0)
                .find('li')
                .css('left', 0)
                .eq(main.param.nowAt - 1)
                .css({
                    'z-index': 1,
                    opacity : 1
                })
                .siblings()
                .css({
                    'z-index': 0,
                    opacity : 0
                });

            main.clickLock = false;
        }
    };
}());