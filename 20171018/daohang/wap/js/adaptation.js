// 计算设备DPR和REM基准值
(function(){
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var metaEl = document.querySelector('meta[name="viewport"]');

    dpr = window.devicePixelRatio || 1;
    scale = 1 / dpr;
    rem = docEl.clientWidth * dpr / 10 ;

    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

    // 设置html标签的font-size
    docEl.style.fontSize = rem + "px";

    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function(v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function(v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.DPR = dpr;
    window.REM = rem;

    // MicroMessenger
})();
