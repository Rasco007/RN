// MPampín
// Función que extiende el jQuery. Sirve para ponerle un overlay a un DOM mientras hace algún
// proceso (para que no toquen nada mientras termina un request lento de ajax, por ejemplo).
//
// Usa la sintaxis del jQuery: $(selector).procOverlay(opciones)

(function() {
    $.fn.procOverlay = function(settings) {

        var caller = this[0];
        // Funciona para el primer elemento que trae

        // Parámetros por default
        settings = jQuery.extend({            
            imageColor: "#156690",
            text: '',           
            visible : false
        }, settings);

        $.LoadingOverlaySetup({
            imageColor: settings.imageColor,
            text: settings.text            
        });
        
        /*
        // Busca el elemento overlay
        var div = $(".div_proc_overlay",caller)[0];

        if (!div) {
            // Creando objetos del DOM
            var overlay = document.createElement("div");
            overlay.className = "proc_overlay ui-widget-overlay";
            overlay.style.cssText = settings.overlay_style;
            overlay.style.zIndex = settings.zIndex;

            var texto = document.createElement("div");
            texto.className = "proc_txt loading ui-state-default ui-state-active";
            texto.style.cssText = settings.style;
            texto.style.zIndex = settings.zIndex + 1;
            texto.innerHTML = "<img src='" + settings.img + "' alt='Loading' width='40' /><p style='"+settings.styletxt+"'>" + settings.mensaje + "</p>";

            div = document.createElement("div");
            div.className = "div_proc_overlay";
            div.style.cssText = 'position:absolute;width:' + $(caller).width() + 'px; height:' + $(caller).height() + 'px;';
            div.appendChild(overlay);
            div.appendChild(texto);

            //overlay.appendChild(texto);
            caller.insertBefore(div, caller.childNodes[0]);
        }*/
        
        if (settings.visible){
            $.LoadingOverlay("show");
        }else{
            $.LoadingOverlay("hide",true);
        }
    };
})(jQuery);