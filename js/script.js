 $(function(){

    //script for calling pizza json file
    $.getJSON('server/pizza.json', function(data) {
        var items = [];
        var output = '<ul class="pro-list-wrap clearfix">';
    $.each(data, function(i, item) {
        output += '<li id="'+item.id+'"><div class="block"><div class="img-wrap"><img src="'+ item.src +'"  alt="" title=""></div><h3 class="primary-title"><span class="text">' + item.name + '</span><span class="indicate '+ item.indicate +'"</span></h3><p class="desc">' + item.desc +'</p><p class="price"><i class="fas fa-rupee-sign"></i> <span class="val">' + item.price + '</span><p class="action-btn"><a href="javascript:void(0);" class="add-cart">Add to Cart</a></div></li>';
    });
    output += '</ul>';
        $('.product-list-cards').html(output);
    });


    //script for calling order json file
    $('#Submit').on('click', function(){
        $.getJSON('server/order.json', function(data1) {
            var items1 = [];
            var output = '<p class="popup-text clearfix">';
        $.each(data1, function(i, item1) {
            output += '<span>'+ item1.comment + '</span>';
        });
        output += '</p>';
            $('.modal .modal-content .modal-body').html(output);
        });

        $('.modal').toggle();
        $('.right-side-cart').removeClass('open-cart');
        $('.body-overlay').show();
        
        //script for hidding dive after settime
        setTimeout(function() {
            $('.modal').hide();
            $('.body-overlay').hide();
        }, 2500); 
    });


    //script for on click open right side container 
    $('.header.header ul.navbar li a').on('click', function(){
        $('.right-side-cart').toggleClass('open-cart');
        $('.body-overlay').toggle();
    });
 

    //script for adding and remove class from header on scroll
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();    
        if (scroll >= 20) {
            $('header.header').addClass('sticky');
        }else {
            $('header.header').removeClass('sticky');
        }
    });

});

$(window).on('load', function(){
    
    var Arrays = new Array();
    $('.product-list-cards ul li a.add-cart').on('click', function(){
        $('.right-side-cart').addClass('open-cart');
        $('.body-overlay').toggle();
        var itemid = $(this).parents('li').attr('id');
        var itemname = $(this).parents('li').find('h3').children('span.text').html();
        var itemprice = $(this).parents('li').find('.price').children('span.val').html();
        var itemimg = $(this).parents('li').find('.img-wrap').children('img').attr('src');

        if(include(Arrays,itemid)) {
            var price = $('#item-'+itemid).find('.item-price').children('span.val').html();
            var qty = $('#item-'+itemid).find('.item-qty').html();
            qty = parseInt(qty) + parseInt(1);
			
			total = parseInt(itemprice) * parseInt(qty);

            $('#item-'+itemid).find('.item-price').children('span.val').html(total);
            $('#item-'+itemid).find('.item-qty').html(qty);

            var prevcost = $('.grand-total span.total-amt').html();
            prevcost = parseInt(prevcost)-parseInt(price);

            prevcost = parseInt(prevcost)+parseInt(total);
            $('.grand-total span.total-amt').html(prevcost);

        }else {
            Arrays.push(itemid);
            
            var prevcost = $('.grand-total span.total-amt').html();
            prevcost = parseInt(prevcost)+parseInt(itemprice);

            $('.grand-total span.total-amt').html(prevcost);
			
			$('.right-side-cart ul').prepend('<li class="shopp" id="item-'+itemid+'"><div class="media"><div class="media-left"><div class="cart-img" ><img src="'+itemimg+'" alt="" title=""></div></div><div class="media-body"><div class="label">'+itemname+'</div><div class="item-price"><i class="fas fa-rupee-sign"></i> <span class="val">'+itemprice+'</span></div><div class="qty-wrap">Quantity : <span class="item-qty">1</span></div><span class="remove"><i class="fas fa-times"></i></span><br class="all" /></div></div></li>');

        }
    });


    //for remove product from the card on click 
    $(document).on('click',".remove", function() {
		var deduct = $(this).parent().children(".item-price").find('span.val').html();
		var prevcost = $('.grand-total spantotal-amt').html();
		var itemID = $(this).parents('li').attr('id').replace('item-','');
		prevcost = parseInt(prevcost)-parseInt(deduct);
		$('.grand-total spantotal-amt').html(prevcost);
		$(this).parents('li').remove();
		
	});	

    
    //script for calculating maxheight
    if($(window).width() > 640) {
        $('.product-list-cards > ul').each(function() {
            startListHeight($('.block', this));
        });
    }
});



//function for calculating maximum height of the card 
function startListHeight($tag) {
  
    function setHeight(s) {
        var max = 0;
        s.each(function() {
            var h = $(this).outerHeight();
            max = Math.max(max, h);
        }).outerHeight('').outerHeight(max);
    }
  
    $(window).on('ready load resize', setHeight($tag));
}


function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
      if (arr[i] == obj) 
      return true;
    }
}
  


