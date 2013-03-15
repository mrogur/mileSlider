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
		duration: 2000,
		speed: 800,
		captionDuration: 2000,
		captionFadeSpeed: 200,
		opacity: 0.8
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
	});
	inside.append(ul);

	inside.css('width', len*maxWidth);
	inside.find('span').css({
		opacity: 0,
		width: maxWidth*0.7,
	});	
	var counter = 1, margin = 0;

	var animateFirst = function(){
			inside
			.delay(opts.duration).animate({
				'margin-left': margin-maxWidth
			}, {
				duration: opts.speed,
				queue: true,
				complete: function() {
					//animateSecond();
					showCaption(ul.find('li').eq(1), animateSecond);
				}
			}
			);
		};
		var animateSecond = function() {
			first = ul.find('li:first');
			var	active = first.next('li').next('li'),
			firstClone = first.clone(),
			caption = active.find('span');

			first.delay(opts.duration).animate({'width': '0px'}, {
				duration: opts.speed,
				easing: 'linear',
				complete: function(){
					first.find('a').remove();
					first.remove();
					ul.append(firstClone);
					showCaption(ul.find('li').eq(1), animateSecond);	
				}
			});
		};	
		var showCaption = function(context, afterCb) {
			var caption = context.find('span');
			if (!caption.length) {
				afterCb();
			} else {
				var topPos = caption.height();
				console.log(caption.height()); 
				caption.css({
					bottom: topPos+10


				});
				caption.animate({'opacity':opts.opacity}, 500, function(){
					caption.delay(opts.captionDuration)
						   .animate({opacity: 0},opts.captionFadeSpeed, afterCb);
				});
			}

		};
	showCaption(ul.find('li').first(), animateFirst);







	});