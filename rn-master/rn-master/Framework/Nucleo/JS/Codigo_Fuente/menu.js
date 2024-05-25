$(document).ready(function(){
	/*COMPORTAMIENTO CLICK MENU*/
	$('.menu-menu').click(function( e ){
		
		$(this).parent().children('.active').removeClass('active');
		$(this).addClass('active');
		$(this).parents('.menu-menu').addClass('active');
		e.stopPropagation();
		if( !$(this).find('>ul').is(':visible') ){
			$(this).find('>ul').show(400);
			$(this).prevAll().find('>ul').hide(400);
			$(this).nextAll().find('>ul').hide(400);
		}else{
			$(this).find('>ul').hide(400);
			$(this).removeClass('active');
		}
	});
	/*COMPORTAMIENTO CLICK MENU*/
	
	/*MOSTRAR/OCULTAR MENU PRINCIPAL DENTRO DE UN MODULO*/

		$bt_pcipal = $('#bt_mostrar_menu_principal');
		$menu = $('#nav');
		$camino_migas = $('#camino_migas');
		
		if ( !$menu.is(':visible') ) {
			var width_menu = '-'+$menu.width()+'px';
			var width_camino = '-'+$camino_migas.width()+'px';
			$menu.css({'position':'absolute','left':width_menu});
		}
	
		
		$bt_pcipal.click(function(){
			if ( $menu.is(':visible') ) {
				$(this).removeClass('active');
				$menu.animate({'left':width_menu},200,
					function(){//complete
						$menu.hide();
						$camino_migas.animate({'left':'29px'},200);
						$bt_pcipal.attr('title','Menú Principal');
					}
				);
			}else{
				$camino_migas.animate({'left':width_camino},200,
					function(){//complete
						$menu.show();
						$menu.animate({'left':'29px'},200);
						$bt_pcipal.attr('title','Camino de Migas');
					}
				);
				$(this).addClass('active');
			}
		});
		
	/*FIN MOSTRAR/OCULTAR MENU PRINCIPAL DENTRO DE UN MODULO*/
	
});