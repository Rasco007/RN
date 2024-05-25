function inicializarLupas(){
    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['Apellidos y Nombre / Razón Social', 'CUIT', 'CUIT Reemp.', 'Domicilio'],
        grid:[
            {index:'d_denominacion',width:450},
            {index:'n_cuit',width:100},
            {index:'n_cuit_reemp',width:100},
            {index:'domicilio',width:450},
        ],
        caption:'Listado de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{
            d_denominacion:'d_denominacion',
            n_cuit: 'n_cuit',
            n_cuit_reemp: 'n_cuit_reemp',
        },
        keyNav:true,
        draggable:true,
    });
};

function bloquear_filtros(){
    $('#n_cuit').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
}

function desbloquear_filtros(){
    $('#n_cuit').prop('disabled', false);
    $('#d_denominacion').prop('disabled', false);
}

function habilitar_botones(){
    $('#btn_iva').prop('disabled', false);
    $('#btn_empleadores').prop('disabled', false);
    $('#btn_ganancias_pf').prop('disabled', false);
    $('#btn_ganancias_soc').prop('disabled', false);
    $('#btn_iva_web').prop('disabled', false);
    $('#btn_iva_web_ii').prop('disabled', false);
    $('#btn_iva_simp').prop('disabled', false);
    $('#btn_libro_iva').prop('disabled', false);
    $('#btn_legajo_siat').prop('disabled', false);
    $('#btn_padron_afip').prop('disabled', false);
    $('#btn_exportar_excel').prop('disabled', false);
    $('#btn_exportar_todo').prop('disabled', false);
    if($('#id_contribuyente').val() == '' || $('#id_contribuyente').val() == null){
        $('#btn_legajo_siat').prop('disabled', true);
    }
}

function deshabilitar_botones(){
    $('#btn_iva').prop('disabled', true);
    $('#btn_empleadores').prop('disabled', true);
    $('#btn_ganancias_pf').prop('disabled', true);
    $('#btn_ganancias_soc').prop('disabled', true);
    $('#btn_iva_web').prop('disabled', true);
    $('#btn_iva_web_ii').prop('disabled', true);
    $('#btn_iva_simp').prop('disabled', true);
    $('#btn_libro_iva').prop('disabled', true);
    $('#btn_legajo_siat').prop('disabled', true);
    $('#btn_padron_afip').prop('disabled', true);
    $('#btn_exportar_excel').prop('disabled', true);
    $('#btn_exportar_todo').prop('disabled', true);
    if($('#id_contribuyente').val() == '' || $('#id_contribuyente').val() == null){
        $('#btn_legajo_siat').prop('disabled', true);
    }
}