jQuery.fn.mileSlider = (function(options){
	this.css('display','none');

	var ul = this.find('ul'),
	items = ul.find('li'),
	first = items.first(),
	imgs = this.find('img'),
	len = imgs.length,
	maxWidth = 0, maxHeight = 0,
	me = this,
	newContainer = $('<div class="mileSlider"><div class="insideSlider"></div></div>'),
	inside = newContainer.find('.insideSlider'),
	opts = {
		duration: 2000
	};
	options = options || {};
	opts = $.extend({}, opts, options);

	console.log(opts);	
	imgs.each(function(){
		var me = $(this),
		width = me.width()
		height = me.height();
		maxWidth = (width>maxWidth) ? width : maxWidth;		
		maxHeight = (height>maxHeight) ? height : maxHeight;		
	});

	newContainer.insertAfter(this);
	newContainer.css({
		width: maxWidth,
		height: maxHeight
	});
	items.css({
		width: maxWidth,
		height: maxHeight
	}).find('span').css('width', maxWidth*0.7);
	inside.append(ul);

	var x = inside.find('ul').find('li').first();
	console.log(x);

	inside.css('width', len*maxWidth);
	var counter = 1, margin = 0;
	var animateFirst = function(){
			inside
			.delay(opts.duration).animate({
				'margin-left': margin-maxWidth
			}, {
				duration: opts.duration,
				queue: true,
				complete: function() {
					animateSecond();
				}
			}
			);
		};
		var animateSecond = function() {
			first = ul.find('li:first');
			//console.log(first);
			var	active = first.next('li'),
			firstClone = first.clone(),
			caption = active.find('span');

			//caption.fadeIn(opts.duration);
			first.delay(3000).animate({'width': '0px'}, {
				duration: 800,
				easing: 'linear',
				complete: function(){
					
					//console.log(active);
					first.find('a').remove();
					first.remove();
					ul.append(firstClone);
					caption.delay(500).fadeOut(200);
					animateSecond();
				}
			});


		};	

		animateFirst();







	});