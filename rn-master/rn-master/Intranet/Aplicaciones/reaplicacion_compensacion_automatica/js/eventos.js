function initEventos(){
    $("#lupa_denominacion").hide();

    $("#n_cuit").mask("99-99999999-9");
    $("#nro_documento").mask("99999999999");

    $("#d_denominacion").on("keydown focusout", function (event) {
        if (event.type === "keydown" && $(this).val().length >= 4) {
            $("#lupa_denominacion").show().css("display", "table-cell");
            $("#mascara_lupa_d_denominacion").hide();
        } else if (event.type === "keydown") {
            $("#lupa_denominacion").hide();
            $("#mascara_lupa_d_denominacion").show().css("display", "table-cell");
        } else if (event.type === "focusout" && $(this).val().length <= 4) {
            $("#lupa_denominacion").hide();
            $("#mascara_lupa_d_denominacion").show().css("display", "table-cell");
        }
    });

    $('#btn_buscar').click(function(){
        if(!$("#c_tributo").val()){
            mostrar_cuadro('E', 'Error','El campo Tributo no puede quedar vacío.');
        }else if(!$("#d_denominacion").val()){
            mostrar_cuadro('E', 'Error', 'El campo Apellido y Nombre / Razón Social no puede quedar vacío.');
        }else if(!$('#n_cuit').val()){
            mostrar_cuadro('E', 'Error','El campo CUIT no puede quedar vacío.');
        }else if(!$('#d_objeto_hecho').val()){
            mostrar_cuadro('E', 'Error','El campo Objeto / Hecho no puede quedar vacío.');
        }
        else{
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "c_tributo":$("#c_tributo").val(),
                    "d_objeto_hecho": $("#d_objeto_hecho").val(),
                    "id_contribuyente":$("#id_contribuyente").val(),
                    
                    "n_orden":0,
                    "id_menu":v_id_menu
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado === 'OK'){
                        mostrar_cuadro('S', 'Información', 'El proceso: Re-validar compensación manual a finalizado.');
                        $('#btn_limpiar').click();
                    }
                    else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });
        }
    
    });

    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#id_contribuyente').val(null);
        $('#d_denominacion').val(null);
        $('#c_tipo_documento').val(null);
        $('#d_tipo_documento').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_concepto').val(null);
        $('#d_concepto').val(null);
        $('#nro_documento').val(null);
        $('#c_tipo_imponible').val(null);
        $('#d_tipo_imponible').val(null);

        $('#lupa_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                    $.ajax({
                        type:'POST',
                        url: "liquidacion_puntual_reg_simplificado/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion").val(data.DENOMINACION);
                                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                                $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);
                                $("#nro_documento").val(data.N_DOCUMENTO);

                                $("#d_objeto_hecho").val(data.D_OBJETO_HECHO);
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                            }else{
                                mostrar_cuadro('E', 'Error','El CUIT ingresado es inválido.');
                                $('#n_cuit').val(null);
                            }
                        }
                    });

                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });

    $('#d_objeto_hecho').focusout(function(){
        if ($('#d_objeto_hecho').val() != '' && $('#c_tributo').val() != ''){
            try{
                $.ajax({
                    type:'POST',
                    url: "liquidacion_puntual_reg_simplificado/php/autocomplete.php",
                    data: {oper:'3',term: $('#d_objeto_hecho').val(), term1: $('#c_tributo').val()},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            $("#n_cuit").val(data.CUIT);
                            $("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE);
                            $("#d_tipo_imponible").val(data.D_TIPO_IMPONIBLE);

                            $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                            $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);
                            $("#nro_documento").val(data.N_DOCUMENTO);
                            $("#d_denominacion").val(data.D_DENOMINACION);


                            $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                        }
                    }
                });
            }catch(err){
            }
        }
    });

    $('#c_tributo').focusout(function(){
        if ($('#d_objeto_hecho').val() != '' && $('#c_tributo').val() != ''){
            try{
                $.ajax({
                    type:'POST',
                    url: "liquidacion_puntual_reg_simplificado/php/autocomplete.php",
                    data: {oper:'3',term: $('#d_objeto_hecho').val(), term1: $('#c_tributo').val()},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            $("#n_cuit").val(data.CUIT);
                            $("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE);
                            $("#d_tipo_imponible").val(data.D_TIPO_IMPONIBLE);

                            $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                            $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);
                            $("#nro_documento").val(data.N_DOCUMENTO);
                            $("#d_denominacion").val(data.D_DENOMINACION);


                            $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                        }
                    }
                });
            }catch(err){
            }
        }
    });

    
}

function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace(/\./gi, '');
		return result;
	}else{
		return null;
	}
}

function inicializarLupas(){

    $("#lupa_denominacion").lupa_generica({
        id_lista:v_lista_d_denominacion,
        titulos:['Apellido y Nombre / Razón Social','Objeto / Hecho', 'CUIT', 'Tipo Doc.', 'Nro. Doc.', 'ID Cont.', 'Tipo Imp.'],
        grid:[
                {index:'d_denominacion',width:315},
                {index:'d_objeto_hecho',width:100},
                {index:'n_cuit',width:100},
                {index:'c_tipo_documento',width:100},
                {index:'n_documento',width:150},
                {index:'id_contribuyente',width:100,hidden:true},
                {index:'c_tipo_imponible',width:100}
            ],
        caption:'Lista de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        width: 1000,
        campos:
            {
                d_denominacion:'d_denominacion',
                d_objeto_hecho: 'd_objeto_hecho',
                n_cuit: 'n_cuit',
                c_tipo_documento: 'c_tipo_documento',
                n_documento: 'nro_documento',
                id_contribuyente: 'id_contribuyente',
                c_tipo_imponible: 'c_tipo_imponible'
            },
        keyNav:true,
        filtros:['#c_tributo','#d_denominacion', '#c_tipo_documento', '#n_documento', '#d_objeto_hecho' , '#c_tipo_imponible'],
        filtrosTitulos:['Tributo', 'Denominación', 'Tipo Doc.','Nro. Doc.','Objeto / Hecho','Tipo Imp.' ],
        filtrosNulos:[false, false, true, true, true, true],
        onClose:function () {
            $("#n_cuit").mask("99-99999999-9");
            $('#c_tipo_documento').blur();
            $('#c_tipo_imponible').blur();
        }
    });

    $("#lupa_tipo_documento").lupa_generica({
        id_lista:v_lista_tipo_documento,
        titulos:['Código','Descripción'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'Lista de Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento',d_dato: 'd_tipo_documento'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        exactField: 'c_dato',
        onClose:function(){
            if(!$("#d_tipo_documento").val()){
                $("#c_tipo_documento").val(null)
            }
        }

    });
    
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_c_tributo,
        titulos:['Código','Descripción'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_codigo',
        onClose:function(){
            if(!$("#d_tributo").val()){
                $("#c_tributo").val(null)
            }
        }

    });

    $("#lupa_tipo_imponible").lupa_generica({
        id_lista:v_lista_tipos_imponibles,
        titulos:['Código','Descripción'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'Lista de Tipos Imponibles',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_imponible',d_descrip: 'd_tipo_imponible'},
        keyNav:true,
        filtros:['#id_contribuyente'],
        filtrosTitulos:['ID Contrib.' ],
        filtrosNulos:[true],
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        exactField: 'c_codigo',
        onClose:function(){
            if(!$("#d_tipo_imponible").val()){
                $("#c_tipo_imponible").val(null)
            }
        }

    });

}