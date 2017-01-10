// JavaScript Document
/** footer動畫相關 **/
    $(function(e){
      //計算footer所在高度
      var renderTop = $("#footer .service").offset().top - $(window).height();
      $(window).on("scroll",void_renderFooterAnimate);
      //判斷是否開始動畫
      function void_renderFooterAnimate(){
        var $this = $(this),
            r = renderTop - $this.scrollTop();
        if(r<0){  //scroll超過 .service的高度
          $this.unbind("scroll",void_renderFooterAnimate);
          //開始動畫
          void_startFooterAnimate($("#footer .service:eq(0)"),{
            delay : 1000, //每一個動畫停滯下一個開始的時間
            perTime : 30, //每一偵毫秒
            bar1  : 100,  //第一條進度條最終寬度
            bar2  : 150   //第二條進度條最終寬度
          });
        }
      }
      //開始動畫function
      function void_startFooterAnimate($service,obj){
        //預先抓取所需變數
        var $mIn = $service.find(".m_in"),
            $mOut = $service.find(".m_out"),
            $mon = $service.find(".mon"),
            intIn = parseInt($mIn.find("dt").text()),
            OutArray = String($mOut.find("dt").text()).split(/\'|\`|\,/g),
            intOut = (OutArray[0]*60)+parseInt(OutArray[1]);
            intMon = parseInt($mon.find("dt span").text()),
            i = 0,fp = 100,
            //計時器啟動
            timer1 = setInterval(function(){
              var t = i++ * obj.perTime;
              line(1,i);
              if(t>=obj.delay)line(2,i-30);
              if(t>=obj.delay*2)line(3,i-65);
            },obj.perTime);
        //去除預設內容
        $mOut.find("dt").text("");
        $mon.find("dt span").text("");
        //三個動畫的驅動
        function line(m,i){
          switch(m){
            case 1:
              //存款火速到帳
              if(i>fp)return false;
              $mIn.find("dt").text(parseInt(i*intIn/fp));
              $mIn.find(".progress").css({width:i*obj.bar1/fp});
              break;
            case 2:
              //取款火速到帳
              if(i>fp)return false;
              var iq = parseInt(i*intOut/fp),
                  text = Math.floor(iq / 60) + '`' + iq % 60;
              $mOut.find("dt").text(text);
              $mOut.find(".progress").css({width:i*obj.bar2/fp});
              break;
            case 3:
              //便捷的銀行服務 :: 第三個動畫結束便清除 計時器
              if(i>fp){clearInterval(timer1);void_startFooterAnimate=null;return false;}
              $mon.find("dt span").text(parseInt(i*intMon/fp));
            break;
          }
        }
        
      }
    });