
// LLopez	25/08/2014
/* ************************************ ProgressBar **********************************/
	(function() {
		$.fn.barraProceso = function(settings) {
			var retorno='#progressBar';
			var caller = this[0];
			// Funciona para el primer elemento que trae

			// Parámetros por default
			settings = jQuery.extend({
				mensaje : 'Procesando...',
				style : 'vertical-align:middle;position: absolute;top: 50%;left: 50%;font-size: 9pt',
				overlay_style : 'width: 100%; height: 100%',
				zIndex : 1111,
				visible : false
			}, settings);

			// Busca el elemento overlay
			var div = $(".div_proc_overlay",caller)[0];

			if (!div) {
				// Creando objetos del DOM
				var overlay = document.createElement("div");
				overlay.className = "proc_overlay ui-widget-overlay";
				overlay.style.cssText = settings.overlay_style;
				overlay.style.zIndex = settings.zIndex;
				
				var texto = document.createElement("div");
				texto.className = "progress-label";
				texto.style.cssText = "position: absolute; left: 40%; top: 4px; font-weight: bold; text-shadow: 1px 1px 0 #fff; font-size:15px";
				texto.style.zIndex = settings.zIndex + 1;
				texto.innerHTML = settings.mensaje;
				
				var progress = document.createElement("div");
				progress.className = "prog_bar ui-state-default ui-state-active";
				progress.style.cssText = "vertical-align: middle; position: relative; top: 50%; left: 25%; width:485px; height:30px;";
				progress.style.zIndex = settings.zIndex + 1;
				progress.id='progressBar';
				
				div = document.createElement("div");
				div.className = "div_proc_overlay";
				div.style.cssText = 'position:absolute;width:' + $(caller).width() + 'px; height:' + $(caller).height() + 'px;';
				div.appendChild(overlay);
				progress.appendChild(texto);
				div.appendChild(progress);

				//overlay.appendChild(texto);
				caller.insertBefore(div, caller.childNodes[0]);
				
				//Activamos el progressbar
				$('#'+progress.id).progressbar({
					value: false,
					enable: true,
					change: function() {
						if($('#'+progress.id).progressbar( "value" )){
							$('.'+texto.className).text( 'Procesado: '+$('#'+progress.id).progressbar( "value" ) + "%" );
						}else{
							$('.'+texto.className).text( 'Procesando...' );
						}
					}
				});
				
				retorno = '#'+progress.id;
			}

			if (settings.visible)
				$(div).show();
			else
				$(div).hide();
			
			return retorno;
		};
	})(jQuery);
/* ********************************** Fin ProgressBar ********************************/

