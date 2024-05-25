function inicializarLupas(){
    // LUPAS FILTRO
    $("#lupa_provincia").lupa_generica({
        id_lista:v_lista_provincias,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_provincia',width:100},
            {index:'d_provincia',width:450}],
        caption:'Provincias',
        sortname:'d_provincia',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_provincia',
        exactField: 'c_provincia',
        campos:{c_provincia:'c_provincia', d_provincia:'d_provincia'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_depto").lupa_generica({
        id_lista:v_lista_deptos,
        titulos:['Departamento','Descrip. Departamento', 'Localidad', 'Descrip. Localidad', 'Código Postal'],
        grid:[  {index:'c_depto',width:100},
                {index:'d_depto',width:350},
                {index:'c_localidad',width:100},
                {index:'d_localidad',width:450},
                {index:'c_postal',width:100}],
        caption:'Departamentos',
        sortname:'c_localidad',
        sortorder:'asc',
        filtros: ['#c_provincia'],
        filtrosNulos: [false],
        filtrosTitulos:['Provincia'],
        searchCode:true,
        searchInput: '#c_depto',
        exactField: 'c_depto',
        campos:{c_depto:'c_depto', d_depto:'d_depto', c_localidad:'c_localidad', d_localidad:'d_localidad', c_postal:'c_postal'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_localidad").lupa_generica({
        id_lista:v_lista_localidades,
        titulos:['Localidad', 'Descrip. Localidad', 'Código Postal'],
        grid:[  {index:'c_localidad',width:100},
                {index:'d_localidad',width:450},
                {index:'c_postal',width:100}],
        caption:'Localidades',
        filtros: ['#c_provincia', '#c_depto'],
        filtrosNulos: [false, false],
        filtrosTitulos:['Provincia', 'Departamento'],
        searchCode:true,
        searchInput: '#c_localidad',
        exactField: 'c_localidad',
        campos:{c_localidad:'c_localidad', d_localidad:'d_localidad', c_postal:'c_postal'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_circunscripcion").lupa_generica({
        id_lista:v_lista_circunscripciones,
        titulos:['Cod. Circ.', 'Circunscripción', 'Localidad'],
        grid:[  {index:'c_circun',width:100},
                {index:'d_circun',width:200},
                {index:'c_localidad',width:250}],
        caption:'Circunscripción',
        searchCode:true,
        searchInput: '#c_circun',
        exactField: 'c_circun',
        campos:{c_circun:'c_circun', d_circun:'d_circun'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['CUIT', 'Denominación'],
        grid:[
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
        ],
        caption:'Lista de Denominaciones',
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
            $("#n_cuit").mask("99-99999999-9");
        }
    });

    

    //LUPAS ABM

    $("#lupa_provincia_modal").lupa_generica({
        id_lista:v_lista_provincias,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_provincia',width:100},
            {index:'d_provincia',width:450}],
        caption:'Provincias',
        sortname:'d_provincia',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_provincia_modal',
        exactField: 'c_provincia',
        campos:{c_provincia:'c_provincia_modal', d_provincia:'d_provincia_modal'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_depto_modal").lupa_generica({
        id_lista:v_lista_deptos,
        titulos:['Departamento','Descrip. Departamento', 'Localidad', 'Descrip. Localidad', 'Código Postal'],
        grid:[  {index:'c_depto',width:100},
                {index:'d_depto',width:350},
                {index:'c_localidad',width:100},
                {index:'d_localidad',width:450},
                {index:'c_postal',width:100}],
        caption:'Departamentos',
        sortname:'c_localidad',
        sortorder:'asc',
        filtros: ['#c_provincia_modal'],
        filtrosNulos: [false],
        filtrosTitulos:['Provincia'],
        searchCode:true,
        searchInput: '#c_depto_modal',
        exactField: 'c_depto',
        campos:{c_depto:'c_depto_modal', d_depto:'d_depto_modal', c_localidad:'c_localidad_modal', d_localidad:'d_localidad_modal', c_postal:'c_postal_modal'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_localidad_modal").lupa_generica({
        id_lista:v_lista_localidades,
        titulos:['Localidad', 'Descrip. Localidad', 'Código Postal'],
        grid:[  {index:'c_localidad',width:100},
                {index:'d_localidad',width:450},
                {index:'c_postal',width:100}],
        caption:'Localidades',
        filtros: ['#c_provincia_modal', '#c_depto_modal'],
        filtrosNulos: [false, false],
        filtrosTitulos:['Provincia', 'Departamento'],
        searchCode:true,
        searchInput: '#c_localidad_modal',
        exactField: 'c_localidad',
        campos:{c_localidad:'c_localidad_modal', d_localidad:'d_localidad_modal', c_postal:'c_postal_modal'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_circunscripcion_modal").lupa_generica({
        id_lista:v_lista_circunscripciones,
        titulos:['Cod. Circ.', 'Circunscripción', 'Localidad'],
        grid:[  {index:'c_circun',width:100},
                {index:'d_circun',width:200},
                {index:'c_localidad',width:250}],
        caption:'Circunscripción',
        searchCode:true,
        searchInput: '#c_circun_modal',
        exactField: 'c_circun',
        campos:{c_circun:'c_circun_modal', d_circun:'d_circun_modal'},
        keyNav:true,
        limpiarCod: true,
    });
}


function validar_busqueda(){
    let n_cuit = $('#n_cuit').val();
    let d_denominacion = $('#d_denominacion').val();
    let c_tipo_repr = $('#c_tipo_representante').val();
    let c_circun = $('#c_circun').val();
    let d_juzgado = $('#d_juzgado').val();
    let c_provincia = $('#c_provincia').val();
    let c_depto = $('#c_depto').val();
    let c_localidad = $('#c_localidad').val();
    let c_patrocinante = $('#c_patrocinante').val();
    let c_baja = $('#c_baja').val();

    if(!n_cuit && !d_denominacion){
        if(!c_tipo_repr && !c_circun && !d_juzgado && !c_provincia && !c_depto && !c_localidad && !c_patrocinante && !c_baja){
            mostrar_cuadro('I', 'Informaci&oacute;n', 'Debe ingresar Número de Cuit, Denominación o al menos un campo adicional para realizar la consulta');
            $('#asesores_legales_grid').jqGrid('clearGridData');
            return false;
        }
    }
    else if(!n_cuit || !d_denominacion){
        mostrar_cuadro('I', 'Informaci&oacute;n', 'Debe ingresar Número de Cuit y Denominación para realizar la consulta');
        $('#asesores_legales_grid').jqGrid('clearGridData');
        return false;
    }

    return true;
}

function limpiar_formato_cuit(n_cuit){
    if(n_cuit[2] != '-'){
        return n_cuit;
    } else{
        return n_cuit.replace(/-/g, '');
    }
}

function limpiar_modal_abm(){
    $('#n_cuit_modal').val(null);
    $('#d_denominacion_modal').val(null);
    $('#c_circun_modal').val(null);
    $('#d_circun_modal').val(null);
    $('#c_provincia_modal').val(null);
    $('#d_provincia_modal').val(null);
    $('#c_depto_modal').val(null);
    $('#d_depto_modal').val(null);
    $('#c_localidad_modal').val(null);
    $('#d_localidad_modal').val(null);
    $('#c_tipo_representante_modal').val(null);
    $('#d_juzgado_modal').val(null);
    $('#c_patrocinante_modal').val(null);
    $('#c_baja_modal').val(null);
    $('#d_colegio_modal').val(null);
    $('#d_tomo_modal').val(null);
    $('#d_folio_modal').val(null);
    $('#d_mail_modal').val(null);
    $('#n_telefono_modal').val(null);
    $('#d_domicilio_modal').val(null);
    $('#c_postal_modal').val(null);
}

function bloquear_filtros(){
    $('#n_cuit').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
    $('#c_tipo_representante').prop('disabled', true);
    $('#c_circun').prop('disabled', true);
    $('#d_juzgado').prop('disabled', true);
    $('#c_provincia').prop('disabled', true);
    $('#c_depto').prop('disabled', true);
    $('#c_localidad').prop('disabled', true);
    $('#c_postal').prop('disabled', true);
    $('#c_patrocinante').prop('disabled', true);
    $('#c_baja').prop('disabled', true);

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#lupa_circunscripcion').hide();
    $('#mascara_lupa_circunscripcion').show().css('display', 'table-cell');
    $('#lupa_provincia').hide();
    $('#mascara_lupa_provincia').show().css('display', 'table-cell');
    $('#lupa_depto').hide();
    $('#mascara_lupa_depto').show().css('display', 'table-cell');
    $('#lupa_localidad').hide();
    $('#mascara_lupa_localidad').show().css('display', 'table-cell');
}

function desbloquear_filtros(){
    $('#n_cuit').prop('disabled', false);
    $('#d_denominacion').prop('disabled', false);
    $('#c_tipo_representante').prop('disabled', false);
    $('#c_circun').prop('disabled', false);
    $('#d_juzgado').prop('disabled', false);
    $('#c_provincia').prop('disabled', false);
    $('#c_depto').prop('disabled', false);
    $('#c_localidad').prop('disabled', false);
    $('#c_postal').prop('disabled', false);
    $('#c_patrocinante').prop('disabled', false);
    $('#c_baja').prop('disabled', false);

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show();
    $('#lupa_circunscripcion').show().css('display', 'table-cell');
    $('#mascara_lupa_circunscripcion').hide();
    $('#lupa_depto').show().css('display', 'table-cell');
    $('#mascara_lupa_depto').hide();
    $('#lupa_provincia').show().css('display', 'table-cell');
    $('#mascara_lupa_provincia').hide();
    $('#lupa_localidad').show().css('display', 'table-cell');
    $('#mascara_lupa_localidad').hide();
}