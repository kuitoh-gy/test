;(function($){
  //Sort-Filter
  $(function(){
    // 並び替え
    var $form = $('#sortFilter'),
        $slctFront = $('.slctFront'),
        $select = $('#sort');

    $select.val(sortSelected);

    $slctFront.text($select.children('option:selected').text());

    $select.on('change',function(){
      $slctFront.text($select.children('option:selected').text());
      $form.submit();
    });

    // 絞り込み
    var $actvGenre = $('input[name=pu]'),
        $actvAstrlgy = $('input[name=ca]'),
        $slctGenre = $('a[data-pu-val]'),
        $slctAstrlgy = $('a[data-ca-val]'),
        $clearFilter = $('a[data-filter-val=clear]');

    actvFilterChange();

    $slctGenre.on('click',function(){
      $actvGenre.val($(this).attr('data-pu-val'));
      actvFilterChange();
      $form.submit();
    });

    $slctAstrlgy.on('click',function(){
      $actvAstrlgy.val($(this).attr('data-ca-val'));
      actvFilterChange();
      $form.submit();
    });

    $clearFilter.on('click',function(){
      $actvGenre.val('');
      $actvAstrlgy.val('');
      actvFilterChange();
      $form.submit();
    });

    function actvFilterChange(){
      $slctGenre.removeClass('active');
      $slctAstrlgy.removeClass('active');
      if($actvGenre.val()) $('a[data-pu-val=' + $actvGenre.val() + ']').addClass('active');
      if($actvAstrlgy.val()) $('a[data-ca-val=' + $actvAstrlgy.val() + ']').addClass('active');
    }

    //もっとみる
    var $list = $('.resultList'),
        $more = $('.more').children('a'),
        articleArray = [];

    $list.children('li').each(function(){
      articleArray.push('<li>'+$(this).html()+'</li>');
    });

    $list.empty();

    shiftView();

    $more.on('click',shiftView);

    function shiftView(){
      if(!$more.parent().hasClass('next')){
        var limit = (articleArray.length >= 10) ? 10 : articleArray.length;
        for(var i=0; i < limit; i++){
          $list.append(articleArray.shift());
        }
        if(articleArray==0) $('.more').addClass('next');

        if(articleArray.length == 0 && isNext == 0) {
          document.getElementById("more").style.display="none";
        }
      }else{
        $form.submit();
      }
    }
  });

  // アコーディオン
  $(function(){
    $('[data-tgl-cName]').each(function(){
      var $trigger = $(this),
          $tglBox = $('.' + $trigger.attr('data-tgl-cName'));

      $trigger.on('click',function(){
        if($tglBox.css('display') == 'none'){
          $tglBox.slideDown('fast',function() {
            $trigger.addClass('open');
          });
        }else{
          $tglBox.slideUp('fast',function() {
            $trigger.removeClass('open');
          });
        }
      });
    });
  });
})(jQuery);
