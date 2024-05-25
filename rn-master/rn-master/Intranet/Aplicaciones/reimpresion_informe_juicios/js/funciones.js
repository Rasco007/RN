function inicializarLupas(){
    $("#lupa_boletas").lupa_generica({
        id_lista:v_lista_boletas,
        titulos:['Boleta de Deuda','Contribuyente', 'CUIT', 'Expediente Adm.'],
        grid:[  
            {index:'id_boleta_deuda',width:150},
            {index:'d_denominacion',width:450},
            {index:'n_cuit',width:200},
            {index:'c_expediente',width:200}],
        caption:'Listado de Expedientes en Gestión Judicial',
        sortname:'id_boleta_deuda',
        sortorder:'desc',
        searchCode:false,
        searchInput: '#boleta_deuda',
        exactField: 'id_boleta_deuda',
        filtros: [id_contribuyente, '#boleta_deuda', '#n_cuit_filtro'],
        filtrosNulos: [true, true, true],
        campos:{id_boleta_deuda:'boleta_deuda', d_denominacion:'d_denominacion', n_cuit:'n_cuit'},
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            validar_id_boleta_deuda();
            if($('#n_cuit').val()){
                validar_cuit();
            }
            if($('#expediente').val()){
                validar_expediente();
            }
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Denominación', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100, hidden: true},
            {index:'d_tipo_documento',width:150},
            {index:'n_documento',width:100},
            {index:'f_alta',width:100, hidden: true}
        ],
        caption:'Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{
            n_cuit: 'n_cuit',
            d_denominacion:'d_denominacion',
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            $('#n_cuit_filtro').val(limpia_cuit($('#n_cuit').val()));
            $("#n_cuit").mask("99-99999999-9");
        }
    });

    $("#lupa_expedientes").lupa_generica({
        id_lista:v_lista_expedientes,
        titulos:['Expediente','Contribuyente', 'CUIT', 'ID Boleta Deuda'],
        grid:[  
            {index:'c_expediente',width:100},
            {index:'d_denominacion',width:350},
            {index:'n_cuit',width:200},
            {index:'id_boleta_deuda',width:200}],
        caption:'Listado de Expedientes en Gestión Judicial',
        sortname:'id_boleta_deuda',
        sortorder:'desc',
        searchCode:false,
        searchInput: '#expediente',
        exactField: 'c_expediente',
        filtros: [p_id_contrib, '#n_cuit_filtro'],
        filtrosNulos: [true],
        campos:{c_expediente:'expediente', d_denominacion:'d_denominacion', n_cuit:'n_cuit', id_boleta_deuda:'boleta_deuda'},
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            validar_expediente();
            if($('#n_cuit').val()){
                validar_cuit();
            }
        }
    });
}

function imprimir_demanda(p_patrocinante, p_representante, p_boton, p_tributo){
    let parametros = 'P_PAR01|' + $('#boleta_deuda').val() + 
                     '&P_PAR02|' + p_boton +
                     '&P_PAR03|' + p_tributo; 
                            
    llamar_report('COFL055', parametros, 'PDF');
}

function limpiar_formato_cuit(n_cuit){
    if(n_cuit[2] != '-'){
        return n_cuit;
    } else{
        return n_cuit.replace(/-/g, '');
    }
}

function fun_formato_cuit(n_cuit){
    const primera_parte = n_cuit.slice(0,2);
    const segunda_parte = n_cuit.slice(2,10);
    const tercera_parte = n_cuit.slice(10);

    return primera_parte + '-' + segunda_parte + '-' + tercera_parte;
}

function validar_expediente(){
    if(!$('#expediente').val()){
        return;
    }
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_expediente": $('#expediente').val(),
         "id_menu":v_id_menu,
         "n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                if(data.p_expediente){
                    fecha_envio = data.p_fecha_envio;
                    id_contribuyente = data.p_id_contribuyente;
                    f_confirmacion = data.p_f_confirmacion;

                    if(!$('#n_cuit').val()){
                        $('#n_cuit').val(data.p_n_cuit);
                    }
                    if(!$('#d_denominacion').val()){
                        $('#d_denominacion').val(data.p_desc_denom);
                    }
                    if(!$('#boleta_deuda').val()){
                        $('#boleta_deuda').val(data.p_id_boleta_deuda);
                    }
                } else{
                    mostrar_cuadro('I', 'Información', 'No existe juicio con expediente '+ $('#expediente').val() +', o se encuentra anulado/pagado.')

                    fecha_envio = null;
                    id_contribuyente = null;
                    f_confirmacion = null;
                    $('#n_cuit').val('');
                    $('#d_denominacion').val('');
                    $('#boleta_deuda').val('');
                    $('#expediente').val('');
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                fecha_envio = null;
                id_contribuyente = null;
                f_confirmacion = null;
                $('#n_cuit').val('');
                $('#d_denominacion').val('');
                $('#boleta_deuda').val('');
                $('#expediente').val('');
            }
        }
    }); 
}

function validar_cuit(){
    if($('#n_cuit').val()){
        let n_cuit = limpiar_formato_cuit($('#n_cuit').val());
        $('#n_cuit_filtro').val(n_cuit);

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
            "p_cuit": n_cuit,
            "p_tdoc": null,
            "p_ndoc": null,
            "p_deno": null,
            "p_desc_denom": $('#d_denominacion').val(),
            "p_id_contribuyente": id_contribuyente,
            "id_menu":v_id_menu,
            "n_orden":6
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    id_contribuyente = data.p_id_contribuyente;
                    $('#d_denominacion').val(data.p_desc_denom);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    }else {
        id_contribuyente = null;
        $('#d_denominacion').val('');
        $('#n_cuit_filtro').val(null);
    }
}

function validar_id_boleta_deuda(){
    if(!$('#boleta_deuda').val()){
        return;
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_id_boleta_deuda": $('#boleta_deuda').val(),
         "id_menu":v_id_menu,
         "n_orden":8
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                if(data.p_id_boleta_deuda){
                    id_contribuyente = data.p_id_contribuyente;
                    fecha_envio = data.p_fecha_envio
                    f_confirmacion = data.p_f_confirmacion;
                    $('#n_cuit').val(data.p_n_cuit);
                    $("#n_cuit").mask("99-99999999-9");
                    $('#d_denominacion').val(data.p_desc_denom);
                    $('#expediente').val(data.p_expediente);
                } else {
                    id_contribuyente = null;
                    fecha_envio = null;
                    f_confirmacion = null;
                    $('#n_cuit').val('');
                    $('#d_denominacion').val('');
                    $('#expediente').val('');
                }
            }
            else{
                if(data.p_no_data_found === 'S'){
                    mostrar_cuadro('E', 'Error', 'La boleta '+$('#boleta_deuda').val()+' no existe en SIAT');
                    $('#boleta_deuda').val(null);
                }else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
            }
        }
    }); 
}

function imprimir_liq_act(){
    let parametros = 'P_ID_BOLETA_DEUDA|' + $('#boleta_deuda').val() + 
                     '&P_FECHA_ACTUALIZACION|' + $('#f_actualizacion').val(); 
                            
    llamar_report('COFL054', parametros, 'PDF');
}

function valida_inf_juicio(){
    let id_boleta_deuda = $('#boleta_deuda').val();
    let f_actualizacion = $('#f_actualizacion').val();

    if(!id_boleta_deuda){
        mostrar_error('Debe ingresar un número de boleta','E',true);
        return false;
    }

    if(!f_actualizacion){
        mostrar_error('Debe ingresar una fecha de actualización','E',true);
        return false;
    }

    if(!f_confirmacion){
        mostrar_cuadro('I', 'Informaci&oacute;n', 'Actualmente ésta boleta está sin confirmar');
        return false;
    }
    return true;
}

function imprimir_inf_juicio(){
    let parametros = 'P_ID_BOLETA|' + $('#boleta_deuda').val() + 
                     '&P_FECHA_ACTUALIZACION|' + $('#f_actualizacion').val();

                            
    llamar_report('COFL056', parametros, 'PDF');
}

function fecha_en_rango(){
    let comp_fecha = $('#f_actualizacion').val().split('/');
    let meses_treinta_dias = [4,6,9,11];
    let dias_extra_febrero = [30,31];

    let dia = parseInt(comp_fecha[0]);
    let mes = parseInt(comp_fecha[1]);

    if(dia <= 0 || dia > 31){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_actualizacion').val(null);
        return false;
    }
    else if(dia == 31 && meses_treinta_dias.includes(mes)){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_actualizacion').val(null);
        return false;
    }
    else if(dias_extra_febrero.includes(dia) && mes == 2){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_actualizacion').val(null);
        return false;
    }

    if(mes <= 0 || mes > 12){
        mostrar_error('El mes debe estar comprendido entre 1 y 12', 'E', true);
        $('#f_actualizacion').val(null);
        return false;
    }

    return true;
}