

function initEventos(){
    $('#lupa_d_denominacion').hide();

    $("#n_cuit").mask("99-99999999-9");
    $("#periodo_desde").mask("9999/99");
    $("#periodo_hasta").mask("9999/99");

    $('#btn_buscar').click(function(){
        let c_tributo = $("#c_tributo").val();
        let n_cuit = limpia_cuit($('#n_cuit').val());
        let c_concepto = $("#c_concepto").val();
        let id_contribuyente = $("#id_contribuyente").val();
        let periodo_desde = limpia_pos_fisc($("#periodo_desde").val());
        let periodo_hasta = limpia_pos_fisc($("#periodo_hasta").val());
        
        let d_objeto_hecho = $("#d_objeto_hecho").val();
        
        // let n_cant_inspectores = $("#n_cant_inspectores").val();
        // let n_horas = $("#n_horas").val();

        if(n_cuit == ''){
            mostrar_cuadro('E', 'Error', 'Se debe ingresar el CUIT');
        }else if(c_tributo == ''){
            mostrar_cuadro('E', 'Error','Se debe ingresar el tributo');
        }else if(d_objeto_hecho == ''){
            mostrar_cuadro('E', 'Error','Se debe ingresar el objeto hecho');
        }else if(periodo_desde == ''){
            mostrar_cuadro('E', 'Error','Se debe ingresar el período desde');

        }else{
        
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "periodo_desde":periodo_desde,
                    "periodo_hasta":periodo_hasta,
                    "id_contribuyente":id_contribuyente,
                    "d_objeto_hecho": d_objeto_hecho,
                    "c_tributo":c_tributo,
                    "n_orden":0,
                    "id_menu":v_id_menu
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        mostrar_cuadro('I', 'Info', 'PROCESO EXITOSO');
                    }
                    else{
                        if(data.resultado == 'Proceso terminado No hay obligaciones'){
                            mostrar_cuadro('I', 'Info', data.resultado);
                            return;

                        }else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                        
                    }
                }
            });
        }
    
    });
    
    function limpia_pos_fisc(posfic){
        if(posfic != ''){
            var res = posfic.split("/");
            var retorno;
            if(res.length >1){
                retorno = res[0] + res[1];
            }else{
                retorno = res[0];
            }
            return retorno;
        }else{
            return posfic;
        }
    }

    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
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
        $('#periodo_desde').val(null);
        $('#periodo_hasta').val(null);
        $('#d_tipo_imponible').val(null);
        
        $('#main_grid').clearGridData();
        $('#detalles_grid').clearGridData();

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#d_denominacion').attr('readonly', false);
        $('#d_denominacion').attr('disabled', false);
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

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_d_denominacion,
        titulos:['Nombre','CUIT', 'Tipo Documento', 'Nro Documento'],
        grid:[{index:'c_codigo',width:300},
            {index:'d_descrip',width:100},
            {index:'c_tipo_documento',width:100},
            {index:'n_documento',width:300}],
        caption:'LISTADO DE NOMBRES DE CONTRIBUYENTES',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'d_denominacion',
        d_descrip: 'n_cuit',
        c_tipo_documento: 'c_tipo_documento', 
        n_documento: 'd_tipo_documento' },
        keyNav:true,
        filtros:['#d_denominacion','#n_cuit'],
        filtrosTitulos:['Nombre', 'CUIT'],
        filtrosNulos:[true, true]
    });

    $("#lupa_tipo_documento").lupa_generica({
        id_lista:v_lista_tipo_documento,
        titulos:['Tipo','Número'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'LISTADO DE TIPOS DE DOCUMENTO',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento',d_dato: 'd_tipo_documento'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        exactField: 'c_dato',
    });
    
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_c_tributo,
        titulos:['Tipo','Descrip'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE TRIBUTOS IB',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_codigo'
    });

    $("#lupa_tipo_imponible").lupa_generica({
        id_lista:v_lista_tipos_imponibles,
        titulos:['Código','Descrip'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE TIPOS IMPONIBLES',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_imponible',d_descrip: 'd_tipo_imponible'},
        keyNav:true,
       
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        exactField: 'c_codigo'
    });
    
    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
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
                          
                                //$("#d_objeto_hecho").val(data.D_OBJETO_HECHO);

                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                         
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


    $('#d_denominacion').keydown(function () {
        if ($('#d_denominacion').val().length >= 2){
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });
}

function inicializa_lupas_main_grid(formid){

    $("#tipo_plan", formid).lupa_generica({
        id_lista:v_lista_tipo_plan,
        titulos:['Tipo Plan','Descripcion Plan'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE PLANES DE FISCALIZACION',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'tipo_plan',d_descrip: 'D_TIPO_PLAN '},
        keyNav:true,
        searchInput: '#tipo_plan',
        searchCode: true
    });
   
}