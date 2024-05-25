function inicializarLupas() {
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:130},
            {index:'d_descrip',width:420}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Cód. Concepto','Cod. Tributo','Descripción del Concepto'],
        grid:[  {index:'c_codigo',width:120},
            {index:'c_tributo',width:130},
            {index:'d_concepto',width:299}],
        caption:'Lista de Tributos Conceptos',
        sortname:'c_tributo',
        sortorder:'asc',
        filtros:['#c_tributo'],
        filtrosNulos: [true],
        campos:{c_codigo:'c_concepto',d_concepto: 'd_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
    });

    $("#lupa_nombre").lupa_generica({
        id_lista:v_lista_nombres,
        titulos:['Denominación','Objeto/Hecho','CUIT','Tipo Doc.','Nro. Doc.','Contribuyente','Tipo Imp.','Desc. Documento','Desc. Tipo Imponible'],
        grid:[
            {index:'d_denominacion',width:400},
            {index:'d_objeto_hecho',width:120},
            {index:'n_cuit',width:100},
            {index:'c_tipo_documento',width:100},
            {index:'n_documento',width:120},
            {index:'id_contribuyente',width:100,hidden:true},
            {index:'c_tipo_imponible',width:100},
            {index:'d_documento',width:100,hidden:true},
            {index:'d_tipo_imponible',width:100,hidden:true}],
        caption:'Lista de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#c_tributo','#c_concepto','#c_documento','#documento','#obj_hecho','#c_tipo_imponible','#nombre'],
        filtrosNulos: [false, false, true, true, true, true,false],
        filtrosTitulos:['Tributo','Concepto','Tipo Documento','Nro. Documento','Objeto/Hecho','Tipo Imponible','Apellido y Nombre / Razón Social'],
        limpiarCod: true,
        width: 1000,
        campos:{d_denominacion:'nombre',
            d_objeto_hecho:'obj_hecho',
            n_cuit:'n_cuit',
            c_tipo_documento:'c_documento',
            n_documento:'documento',
            id_contribuyente:'id_contribuyente',
            c_tipo_imponible:'c_tipo_imponible',
            d_documento:'d_documento',
            d_tipo_imponible:'d_tipo_imponible'},
        keyNav:true
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_documento',d_dato:'d_documento'},
        searchCode:true,
        searchInput: '#c_documento',
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['Tipo Imponible','Objeto Hecho'],
        grid:[  {index:'c_tipo_imponible',width:50,hidden:true},{index:'d_objeto_hecho',width:550}],
        caption:'Objeto Hecho',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo','#id_contribuyente'],
        filtrosNulos: [false, false],
        filtrosTitulos:['Tributo','CUIT'],
        exactField: 'd_objeto_hecho',
        limpiarCod: true,
        campos:{d_objeto_hecho:'obj_hecho',c_tipo_imponible:'c_tipo_imponible'},
        searchCode:true,
        searchInput: '#obj_hecho',
        keyNav:true
    });
}

function eliminar(params){
    buscar_oblig(params);
}

function cargar_grilla(data,params){

    var tabla_oblig_encontradas = document.getElementById("tabla_oblig_encontradas");
    for (var i = 1; i < data.length; i++) {
        var row = document.createElement("tr");
        var idCell = document.createElement("td");
        idCell.textContent = data[i]["ID_OBLIGACION"];
        row.appendChild(idCell);
        var boletaCell = document.createElement("td");
        boletaCell.textContent = data[i]["BOLETA_EMITIDA"];
        row.appendChild(boletaCell);
        tabla_oblig_encontradas.appendChild(row);
    }

    mostrar_mensaje_modal('I','Atención',
        'Ciertas Obligaciones tienen al menos una boleta emitida.',
        function(){fun_ver_grilla_oblig_encontradas(params);}
    );

}

function buscar_oblig(params){

    $.ajax({
        type:'POST',
        url: "baja_obligaciones_full/php/buscar_oblig.php",
        data: {
            id_contribuyente: params.p_id_contribuyente,
            c_tipo_imponible: params.p_c_tipo_imponible,
            obj_hecho: params.p_obj_hecho,
            c_tributo: params.p_c_tributo,
            c_concepto: params.p_c_concepto,
            periodo: params.p_periodo,
            periodo_hasta: params.p_periodo_hasta
        },
        dataType: 'json',
        success: function( data ) {
            if(data[0] === 'OK'){
                if(data.length > 1){
                    cargar_grilla(data,params);
                }else{
                    eliminar_boletas(params);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar si alguna obligacion tiene boletas agrupadas.');
                return;
            }
        }
    });
}

function fun_ver_grilla_oblig_encontradas(params){
    $('#oblig_encontradas_title').text("Detalle de Obligaciones con boletas encontradas. ¿Desea borrarlas?");
    $('#oblig_encontradas_modal').modal('show');

    $("#btn_aceptar_borrar").unbind( "click" );
    $("#btn_cancelar_borrar").unbind( "click" );

    $('#btn_aceptar_borrar').click(function(){
        eliminar_boletas(params);
        tabla_oblig_encontradas.innerHTML = "";
    });

    $('#btn_cancelar_borrar').click(function(){
        mostrar_cuadro('E', 'Error' , 'Proceso abortado.');
        tabla_oblig_encontradas.innerHTML = "";
    });

}

function eliminar_boletas(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                mostrar_mensaje_modal('I','Información',data.p_estado);
                limpiar_datos_contribuyente();
                limpiar_eliminador();
            }else{
                mostrar_cuadro('E', 'Error', 'Error al eliminar todas las Boletas.');
            }
        }
    });
}

function valida_periodo(campo, f_periodo) {

    if (!/^\d+$/.test(f_periodo)) {
        $('#'+campo).val('');
        mostrar_cuadro('I', 'Advertencia', 'El campo debe tener formato 9999/99.', '', '', 300, 200);
        return;
    }

    if (f_periodo.length === 4){
        if(f_periodo < 1970){
            mostrar_cuadro('E', 'Error', 'El año debe ser de 1970 en adelante.', '', '', 300, 200);
            $('#'+campo).val('');
        }else{
            $('#'+campo).val(f_periodo * 100 +1)
            $('#'+campo).mask("9999/99");
        }
    }else{
        if(f_periodo.substr(0,4) < 1970){
            mostrar_cuadro('E', 'Error', 'El año debe ser de 1970 en adelante.', '', '', 300, 200);
            $('#'+campo).val('');
            return;
        }
        if(f_periodo.substr(4,2) < 1 || f_periodo.substr(4,2) > 12){
            $('#'+campo).val('');
            mostrar_cuadro('E', 'Error', 'El mes debe estar entre 1 y 12.', '', '', 300, 200);
        }
    }
}

function limpia_f_periodo(f_periodo){
    var result;
    result = f_periodo.replace('/','');
    return result;
}/* QUITA LA MASCARA DEL PERIODO */

function limpiar_eliminador() {
    $('#div_input_tributo :input').val(null);
    $('#div_input_concepto :input').val(null);
    $('#f_periodo_desde').val(null);
    $('#f_periodo_hasta').val(null);
}

function limpiar_datos_contribuyente() {
    $('#div_cuit :input').val(null);
    $('#nombre').val(null);
    $('#nombre').focusout();
    $('#div_input_documento :input').val(null);
    $('#documento').val(null);
    $('#div_input_obj_hecho :input').val(null);
}

function autocompleta_contrib_por_doc(){
    $.ajax({
        type:'POST',
        url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
        data: {oper:'doc', c_documento: $('#c_documento').val(), documento: $('#documento').val()},
        dataType: 'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#nombre").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#n_cuit").val(data.CUIT);
                    if ($('#c_tributo').val() !== ''){
                        autocompleta_tipo_imp_y_obj();
                    }
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el Documento');
                return;
            }
        }
    });
}

function autocompleta_tipo_imp_y_obj(){
    $.ajax({
        type:'POST',
        url: "recalculo_obligaciones/php/autocomplete.php",
        data: {
            oper:'tipo_imp_y_objeto',
            p_n_cuit: limpia_cuit($('#n_cuit').val()),
            p_c_tributo: $('#c_tributo').val()
        },
        dataType: 'json',
        success: function( data ) {
            if(data !== null){
                ajax_autocomplete = null;
                $("#nombre").val(data[0].DENOMINACION);
                $("#id_contribuyente").val(data[0].ID_CONTRIBUYENTE);
                $("#c_documento").val(data[0].C_TIPO_DOCUMENTO);
                $("#documento").val(data[0].N_DOCUMENTO);
                $("#d_documento").val(data[0].D_DOCUMENTO);
                $("#c_tipo_imponible").val(data[0].C_TIPO_IMPONIBLE);
                $("#obj_hecho").val(data[0].D_OBJETO_HECHO);
            }
        }
    });
}