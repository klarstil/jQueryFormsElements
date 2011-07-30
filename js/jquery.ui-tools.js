(function($) {
	
	$(document).ready(function() {
		$('select').selectReplacement();
		$('input[type^=checkbox]').checkboxReplacement();
		
		$('form').bind('submit', function() {
			var form =  $.serialize($(this));
			alert(form);
		})
	});
	
	$.fn.selectReplacement = function() {	
		this.each(function() {
			var $this = $(this);
			var options = $this.find('option');
			var selected = $this.find('option:selected');
			
			var selectContainer = $('<div class="select-container"></div>');
			
			var hidden = $('<input>', {
				type: 'hidden',
				name: $(this).attr('name'),
				value: selected.html()
			}).appendTo(selectContainer);
			
			var activeItem = $('<div>', {
				'class': 'active-item',
				'html': selected.html()
			}).appendTo(selectContainer);
			
			var arrows = $('<div class="dropdown-arrows"></div>').appendTo(selectContainer);
			
			var dropdown = $('<div class="dropdown-list"></div>').appendTo(selectContainer);
			
			$.each(options, function(i, el) {
				var item = $('<a>', {
					'html': $(el).html()
				});
				
				if($(el).attr('selected') == true) { item.addClass('active'); }
				item.appendTo(dropdown);
				
				item.bind('click', function(event) {
					event.preventDefault();
					
					selectContainer.find('.active').removeClass('active');
					$(this).addClass('active');
					activeItem.html($(this).text());
					hidden.val($(this).text());
				});
			});
			
			$this.replaceWith(selectContainer);
		});
	};
	
	$.fn.checkboxReplacement = function() {
		this.each(function() {
			var $this = $(this);
			
			var checkboxContainer = $('<div class="checkbox-container"></div>').bind('click', function(event) {
				event.preventDefault();
				
				checkboxContainer.find('.checkbox').toggleClass('checked');
				
				if(checkboxContainer.find('.checkbox').hasClass('checked')) {
					hidden.val(1);
				} else {
					hidden.val(0);
				}
			});
			
			var hidden = $('<input>', {
				type: 'hidden',
				name: $this.attr('name'),
				value: $this.val()
			}).appendTo(checkboxContainer);
			
			var checkbox = $('<div class="checkbox"></div>').appendTo(checkboxContainer);
			if($this.attr('checked')) { checkbox.addClass('checked'); }
			
			var tmpLabel = $this.next('label');
			var label = $('<label>', { html: tmpLabel.html() }).appendTo(checkboxContainer);
			tmpLabel.remove();
			
			$this.replaceWith(checkboxContainer);		
		})
	};
	
})(jQuery);