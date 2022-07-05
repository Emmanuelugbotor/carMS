 
       $(document).on('ready', function() {
            $('.demo-pie-1').pieChart({
                barColor: '#eb593b',
                trackColor: '#bbbbbb',
                lineCap: 'round',
                lineWidth: 16,
                onStep: function (from, to, percent) {
                    $(this.element).find('.pie-value').text(Math.round(percent) + '%');
                }
            });

			
		
        });
