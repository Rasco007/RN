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
            mensaje : 'Procesando...',
            styletxt : 'float: right; margin: 10% -1%; width: 100%; text-align: center; color: #000;',
            img : IMAGENES_FRAMEWORK+'loading.gif',
            style : 'vertical-align:middle;position: fixed;top: 50%;left: 45%;font-size: 9pt;width: 10%;padding: 10px; background: #fff !important; border: 1px solid #CCC; border-radius: 10px; box-shadow: 0px 0px 5px #959595;',
            overlay_style : 'width: 100%; height: 100%',
            zIndex : 10100,
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
        }

        if (settings.visible)
            $(div).show();
        else
            $(div).hide();

    };
})(jQuery);