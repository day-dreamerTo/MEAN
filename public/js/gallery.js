/**
 * Created by admin on 17/3/29.
 */
var imgs = $('.gallery-img');
$('.img-title').click(function(){
    $('.ui.modal').modal('show');
    var _index = $(this).index('.img-title');
    console.log(_index);
    $.each(imgs,function(index,item){
       if(index == _index){
           $('.modal img')[0].src = item.src;
       }
    });
    return false;
});
