//Constantes para el editor
var max_for_html = 4000; //max characters for html tags
var allowed_keys = [16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46,8,9];
var chars_without_html = 0;
var chars_with_html = 0;

function completar_denominacion(input_cuit, input_denominacion, input_id_contribuyente){
    if ($('#'+input_cuit).val() && $('#'+input_cuit).val().length == 13){
        let cuit_sin_guiones =limpia_cuit($('#'+input_cuit).val());
        $('#main').procOverlay({visible:true});

        $.ajax({
            url: "ajax_genericos/autocomplete.php",
            data: {oper:'3',term: cuit_sin_guiones},
            type:"POST",
            success: function(response)
            {
                $('#main').procOverlay({visible:false});
                res = JSON.parse(response);
                if (res){
                    $('#'+input_denominacion).val(res['data_raz'][0]['razon_social']);
                    $('#'+input_id_contribuyente).val(res['data_raz'][0]['id_contribuyente']);
                }else{
                    $('#'+input_denominacion).val(null);
                    $('#'+input_id_contribuyente).val(null);
                }
            }
        });

    }else{
        $('#'+input_denominacion).val(null);
        $('#'+input_cuit).val(null);
        $('#'+input_id_contribuyente).val(null);
    }
}

function limpiar_form_nuevo_mensaje(){

    $('#n_cuit_form, #id_sol_req_form, #id_conversacion_form, #denominacion_form, #id_contribuyente_form, #f_publ_desde_form, #f_publ_hasta_form').val(null);
    $('#d_referencia_form').val(null);
    $('#d_asunto_form').val(null);
    tinymce.get("txt_mensaje_contestar").setContent('');

    $('#tipo_msj_form').val(null);
    $('#ori_msj_form').val(null);
    $('.selectpicker').selectpicker('refresh');

}

function recuperar_datos_form(){
    var selrow = $('#main_grid').jqGrid ('getGridParam', 'selrow');

    $("#id_conversacion_form").val($("#main_grid").getCell(selrow,'id_conversacion'));
    $("#id_contribuyente_form").val($("#main_grid").getCell(selrow,'id_contribuyente'));
    $("#n_cuit_form").val($("#main_grid").getCell(selrow,'n_cuit'));
    $("#denominacion_form").val($("#main_grid").getCell(selrow,'d_denominacion'));
    $("#tipo_msj_form").val($("#main_grid").getCell(selrow,'c_tipo_conv'));
    $("#f_publ_desde_form").val($("#main_grid").getCell(selrow,'f_public_desde'));
    $("#f_publ_hasta_form").val($("#main_grid").getCell(selrow,'f_public_hasta'));
    $("#ori_msj_form").val($("#main_grid").getCell(selrow,'c_ori_conv'));
    $("#d_referencia_form").val($("#main_grid").getCell(selrow,'id_ori_conv'));
    $("#d_asunto_form").val($("#main_grid").getCell(selrow,'d_referencia'));
    $("#id_sol_req_form").val($("#main_grid").getCell(selrow,'id_adjuntos_msj'));

    //Buscamos el msj seleccionado
    $.ajax({
        type:'POST',
        url: "e-ventanilla/funciones.php",
        data: {p_oper:'getMensaje',id_conversacion: $("#main_grid").getCell(selrow,'id_conversacion')},
        dataType: 'json',
        success: function( data ) {
            if(data) {
                tinymce.get("txt_mensaje_contestar").setContent(data['p_d_mensaje']);
            }
        }
    });

    $('.selectpicker').selectpicker('refresh');

    bloquearFechas();
}

function configurarEditor(idDestino, idOrigen, modo) {
    if( modo =='visualizar' ) {
        tinymce.init({
            selector: '#'+idDestino,
            height: 250,
            language: "es_TDI",
            menubar: false,
            statusbar: false,
            toolbar: false,
            readonly : true,
            //content_css: [v_url_css],
            setup: function (ed) {
                ed.on('init', function(){
                    this.setContent( $('#'+idOrigen).val());
                });
            }
        });
    }else{
        tinymce.init({
            selector: '#'+idDestino,
            height: 250,
            language: "es_TDI",
            statusbar: false,
            readonly: false,
           // menubar: false,
            /*menu : {
                archivos: {title: 'Archivos', items: 'preview | newdocument'},
                editar: {title: 'Editar', items: 'undo redo | cut copy paste | selectall | findandreplace'},
                formato: {title: 'Formato', items: 'bold italic underline strikethrough superscript subscript | formats | clearformat'},
            },*/
            plugins: 'link',
            setup: function (ed) {

                ed.on("KeyUp", function (ed, evt) {
                    chars_without_html = $.trim(tinymce.activeEditor.getContent().replace(/(<([^>]+)>)/ig, "")).length;
                    chars_with_html = tinymce.activeEditor.getContent().length;
                    var key = ed.keyCode;

                    $('#chars_left').html(max_for_html - chars_with_html);

                    if (allowed_keys.indexOf(key) != -1) {
                        alarmChars();
                        return;
                    }

                    if(chars_with_html > max_for_html){
                        mostrar_cuadro('I','Redacción de Mensaje','Se ha alcanzado el límite máximo de caracteres.');
                        var v_d_mensaje_limit = this.getContent().substr(0,max_for_html-4);
                        this.setContent(v_d_mensaje_limit);

                        $('#chars_left').html(max_for_html - tinymce.activeEditor.getContent().length);
                    }
                    alarmChars();
                });

                ed.on('init', function(){
                    this.setContent( $('#'+idOrigen).val() );
                    chars_without_html = $.trim(this.getContent().replace(/(<([^>]+)>)/ig, "")).length;
                    chars_with_html = this.getContent().length;
                    $('#chars_left').html(max_for_html - chars_with_html);
                    alarmChars();
                });
            },
            toolbar1: 'undo redo | preview styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor',
            /*content_css: [
                '../js/tinymce/css/codepen.min.css'
            ]*/
        });
    }
}

function alarmChars() {
    //if (chars_without_html > (max_chars - 25)) {
    if (chars_with_html > (max_for_html - 25)) {
        $('#chars_left').css('color', 'red');
    } else {
        $('#chars_left').css('color', 'gray');
    }
}

function anular_mensaje(){
    var selrow = $('#main_grid').jqGrid ('getGridParam', 'selrow');
    v_id_conversacion = $("#main_grid").getCell(selrow,'id_conversacion');

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_conversacion":v_id_conversacion,
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible: false});
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function autorizar_mensaje(){
    var selrow = $('#main_grid').jqGrid ('getGridParam', 'selrow');
    v_id_conversacion = $("#main_grid").getCell(selrow,'id_conversacion');

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_conversacion":v_id_conversacion,
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible: false});
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function enviar_mensaje(){
    var selrow = $('#main_grid').jqGrid ('getGridParam', 'selrow');
    v_id_conversacion = $("#main_grid").getCell(selrow,'id_conversacion');

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_conversacion":v_id_conversacion,
            "id_menu":v_id_menu,
            "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible: false});
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function notificar_falta_dfe(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "id_menu":v_id_menu,
            "n_orden":6
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible: false});
            if(data.resultado == 'OK'){
                mostrar_cuadro('I', 'Notificación Falta DFE', 'Se ha generado la notificación masiva de manera exitosa.');
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function borrar_mensaje(){
    //TODO: Eliminar Archivos Adjuntos, tanto tabla como filesystem

    var selrow = $('#main_grid').jqGrid ('getGridParam', 'selrow');
    v_id_conversacion = $("#main_grid").getCell(selrow,'id_conversacion');

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_conversacion":v_id_conversacion,
            "id_menu":v_id_menu,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible: false});
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
                //Disparamos el borrado de los adjuntos.
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function guardar_mensaje(){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente":$('#id_contribuyente_form').val(),
            "p_c_tipo_conv":$('#tipo_msj_form').selectpicker('val'),
            "p_d_referencia":$('#d_asunto_form').val(),
            "p_d_mensaje":tinymce.get("txt_mensaje_contestar").getContent(),
            "p_c_ori_conv":$('#ori_msj_form').selectpicker('val'),
            "p_id_ori_conv":$('#d_referencia_form').val(),
            "p_f_public_desde":$('#f_publ_desde_form').val(),
            "p_f_public_hasta":$('#f_publ_hasta_form').val(),
            "p_id_conversacion":$('#id_conversacion_form').val(),
            "p_id_sol_requisitos":$('#id_sol_req_form').val(),
            "id_menu":v_id_menu,
            "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible: false});
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
                $("#modal_nuevo_mensaje").modal('hide');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function bloquearFechas(){

    var firstDay = new Date();
    $('#f_publ_desde_form, #f_publ_hasta_form').datepicker('option', 'minDate',firstDay);

    if($('#f_publ_desde_form').val() != ''){
        firstDay = $('#f_publ_desde_form').val();
        $('#f_publ_hasta_form').datepicker('option', 'minDate',firstDay);
    }

}