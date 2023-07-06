
(function($){
    $.fn.checkcalendar = function(options) {
      var settings = $.extend( {
        'week'      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        'roop'      : 2,
        'prefix'    : 'mycld_',   //繧ｫ繝ｬ繝ｳ繝繝ｼ縺ｧ菴ｿ繧上ｌ繧句､画焚蜷� 莉悶→陲ｫ繧峨↑縺�ｈ縺�Θ繝九�繧ｯ縺ｫ
        'delimiter' : '-',        //騾∽ｿ｡譎ゅ�譌･莉倥�蛹ｺ蛻�ｊ譁�ｭ� yyy/mm/dd
        'td_on'     : '#FF0000',  //譌･莉倥ｒON縺ｫ縺励◆縺ｨ縺阪�閭梧勹濶ｲ
        'td_off'    : '#FFFFFF',  //譌･莉倥ｒOFF縺ｫ縺励◆縺ｨ縺阪�閭梧勹濶ｲ
        'send'      : 'days'      //post縺吶ｋ縺ｨ縺阪�input縺ｮid <input type="hidden" id="days" name="days" >
      }, options);
      
    $(this).html('');//繧ｫ繝ｬ繝ｳ繝繝ｼ螻暮幕蝣ｴ謇縺ｮ荳ｭ霄ｫ繧偵け繝ｪ繧｢
    
    var $div      = $(this);
    var str_Date = null;
    var end_Date  = null;
    
    var class_td         = settings.prefix+'td';
    var class_month_on   = settings.prefix+'month_on';
    var class_month_off  = settings.prefix+'month_off';
    
    if(settings.start){
      var s_Date     = settings.start.split("-");
          str_Date = new Date(s_Date[0],s_Date[1]-1,1);
    }else{
      var sdate = new Date();
      var s_yy  = sdate.getFullYear();
      var s_mm  = sdate.getMonth()+1;
      var s_dd  = sdate.getDate();
          str_Date = new Date(s_yy,s_mm-1,s_dd);
    }
    
      var y = str_Date.getFullYear();
      var m = str_Date.getMonth()+1;

      $(document).on('click','.'+class_td,function(){
        var flag  = $(this).data("flag");
        if(flag == 'on'){
          $(this).css({'background-color': settings.td_off});
          $(this).data("flag","off");
        }else if(flag == 'off'){
          $(this).css({'background-color': settings.td_on});
          $(this).data("flag","on");
        }
        getDate();
      });

      $(document).on('click','#'+class_month_on,function(e){
        $(this).parents('table').find('td').css({'background-color': settings.td_on});
        $(this).parents('table').find('td').data("flag","on");
        getDate();
        e.preventDefault();
      });
      
      $(document).on('click','#'+class_month_off,function(e){
        $(this).parents('table').find('td').css({'background-color': settings.td_off});
        $(this).parents('table').find('td').data("flag","off");
        getDate();
        e.preventDefault();
      });

    var getDate = function(){
      var data = '';
      $div.find("td").each(function(){
        var flag = $(this).data('flag');
        if( flag == 'on' && $(this).text() ){
          var id = $(this).attr('id');
              id = id.replace(settings.prefix, "");
              data += id+',';
        }
      });
      data = data.slice(0, -1);
      
      $("#"+settings.send).val(data);
    };

    var Calendar = function(obj,yyyy,mmmm){
        var week = settings.week;
        var html = '';
        
        for(var i=0; i<settings.roop; i++){
          var sdate = new Date(yyyy,(mmmm-1)+i,1);
          var s_yy  = sdate.getFullYear(); //蟷ｴ
          var s_mm  = sdate.getMonth()+1;  //譛�
          //var s_dd  = sdate.getDate();
          var blank = sdate.getDay()|0;           //譛亥ｧ九ａ縺ｮ遨ｺ逋ｽ谺�焚
          var last = lastDay(s_yy,s_mm)|0;        //譛域忰縺ｮ譌･
          var cal  = Math.ceil( (blank+last)/7 ); //陦梧焚繧呈ｱゅａ繧�
          
          var table_ID = settings.prefix+''+s_yy+''+s_mm;
          
            html +='<table class="calendar_button" id="'+table_ID+'">';
            html +='  <tr>';
            html +='    <th colspan="7">'+s_yy+'/'+s_mm+' &nbsp; <a href="#" id="'+class_month_on+'">all</a> <a href="#" id="'+class_month_off+'">clear</a></th>';
            html +='  </tr>';
            
            html +='<tr>';
            html +='  <th>'+settings.week[0]+'</th>';
            html +='  <th>'+settings.week[1]+'</th>';
            html +='  <th>'+settings.week[2]+'</th>';
            html +='  <th>'+settings.week[3]+'</th>';
            html +='  <th>'+settings.week[4]+'</th>';
            html +='  <th>'+settings.week[5]+'</th>';
            html +='  <th>'+settings.week[6]+'</th>';
            html +='</tr>';
            
            //settings.prefix   delimiter

              var setDay = 0;
              for(var r = 0; r<cal; r++){
                html +='<tr>';
                  for(var d=0; d<7; d++){
                    var day = '';
                    var ymd = '';
                    if(r==0 && d<blank){
                      day = '';
                    }else{
                      setDay++;
                      if(setDay <= last){
                        day = setDay;
                        ymd = s_yy+''+settings.delimiter+''+s_mm+''+settings.delimiter+''+setDay;
                      }else{
                        day = '';
                      }
                    }
                    var id = settings.prefix+''+ymd;
                    html +='  <td data-flag="off" class="'+class_td+'" id="'+id+'">'+day+'</td>';
                  }
                html +='</tr>';
              }
            html +='</table><br>';
        }
        
        obj.html(html);
        
    };
  
    var lastDay = function(y, m){
      var dt = new Date(y, m, 0);
      return dt.getDate();
    };   
    
    return Calendar($(this),y,m);
  };
})(jQuery);
