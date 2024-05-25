function inicializar_lupas_filtros(){

    $("#desc_denom_filtro_lupa").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['Contribuyente','CUIT','Denominacion'],
        grid:[{index:'id_contribuyente',width:450,hidden:true},{index:'n_cuit',width:100},{index:'d_denominacion',width:350}],
        caption:'Denominacion',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#desc_denom_filtro'],
        filtrosNulos:[true],
        campos:{n_cuit:'n_cuit_filtro',d_denominacion:'desc_denom_filtro',id_contribuyente:'id_contribuyente_filtro'},
        searchInput: '#desc_denom_filtro',
        //searchCode: true,
        keyNav:true,
        limpiarCod: true
    });

    $("#lupa_c_tributo_filtro").lupa_generica({
        id_lista:v_lista_tributos_filtro,
        titulos:['Código','Descripción'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Tributo',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_tributo_filtro',
        searchCode: true,
        campos:{c_codigo:'c_tributo_filtro',d_descrip:'d_tributo_filtro'},
        keyNav:true
    });

    $("#lupa_obj_hecho_filtro").lupa_generica({
        id_lista:v_lista_obj_hecho_filtro,
        titulos:['Objeto Hecho'],
        grid:[  {index:'d_objeto_hecho',width:550}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'desc',
        filtros:['#c_tributo_filtro','#d_objeto_hecho_filtro','#id_contribuyente_filtro'],
        filtrosNulos:[false,true,true],
        filtrosTitulos:['Tributo','Nro. Objeto/Hecho','CUIT'],
        exactField: 'd_objeto_hecho_filtro',
        limpiarCod: true,
        campos:{d_objeto_hecho:'d_objeto_hecho_filtro'},
        keyNav:true
    });
};
function set_buscar_click(){
    $('#btn_buscar').click(function(){

        if($('#c_tributo_filtro').val() || $('#desc_denom_filtro').val() || $('#n_cuit_filtro').val() || $('#d_objeto_hecho_filtro').val()){
            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#c_tributo_filtro').val() != ''){
                filtros_arr_main.push('Tributo: '+ $('#c_tributo_filtro').val());
            }
            if($('#desc_denom_filtro').val() != ''){
                filtros_arr_main.push('Denominación: '+ $('#desc_denom_filtro').val());
            }
            if($('#n_cuit_filtro').val() != ''){
                filtros_arr_main.push('CUIT: '+ $('#n_cuit_filtro').val());
            }
            if($('#d_objeto_hecho_filtro').val() != ''){
                filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho_filtro').val());
            }

            if(p_modo=='C'){
                filtros_no_nativos_ar['consulta_grid']=filtros_arr_main;
            }
            else{
                filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
            }
            

            
            
            v_carga_grilla_manual = true;
            setea_parametros('#main_grid',{
                ':p_c_tributo':$('#c_tributo_filtro').val(),
                ':p_d_objeto_hecho':$('#d_objeto_hecho_filtro').val(),
                ':p_id_contribuyente':$('#id_contribuyente_filtro').val(),
                ':p_desc_denom':$('#desc_denom_filtro').val()
            });

            $('#n_cuit_filtro').attr('disabled',true);
            $('#d_objeto_hecho_filtro').attr('disabled',true);
            $('#c_tributo_filtro').attr('disabled',true);
            $('#desc_denom_filtro').attr('disabled',true);
            $('#lupa_d_objeto_hecho_filtro').hide();
        }else{
            mostrar_cuadro('E', 'Error', 'Debe cargar al menos 1 filtro para realizar la busqueda');
        }
    })
}

function inicializa_lupas_main_grid(formid){

    $("#d_medio_pago_lupa",formid).lupa_generica({
        id_lista:v_lista_medios_debito,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Descripción de Pago',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_medio_pago',
        searchCode: true,
        campos:{c_codigo:'c_medio_pago',d_descrip:'d_medio_pago'},
        keyNav:true
    });

    $("#d_banco_lupa",formid).lupa_generica({
        id_lista:v_lista_bancos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Bancos',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_banco',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_banco', d_descrip: 'd_banco'},
        keyNav:true,
        onClose:function(){
            $('#c_sucursal').val("");
            $('#d_sucursal').val("");
        }
    });

    $("#d_sucursal_lupa",formid).lupa_generica({
        id_lista:v_lista_sucursales,
        titulos:['Sucursal','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Descripción',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#c_banco'],
        filtrosTitulos:['Banco'],
        searchInput: '#c_sucursal',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_sucursal',d_descrip:'d_sucursal'},
        keyNav:true
    });

    $("#d_tributo_lupa",formid).lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Tributo',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:[null,'#id_contribuyente'],
        filtrosNulos:[true,true],
        filtrosTitulos:[null,'CUIT'],
        searchInput: '#c_tributo',
        searchCode: true,
        campos:{c_codigo:'c_tributo',d_descrip:'d_tributo'},
        keyNav:true
    });

    $("#d_objeto_hecho_lupa",formid).lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['Objeto Hecho','Id_contribuyente','CUIT','Denominación','F. Vig. Desde','F. Vig. Hasta'],
        grid:[  {index:'d_objeto_hecho',width:80},{index:'id_contribuyente',width:80,hidden:true},{index:'n_cuit',width:100},{index:'d_denominacion',width:350},{index:'f_vig_desde',width:80},{index:'f_vig_hasta',width:80}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'desc',
        filtros:['#c_tributo','#d_objeto_hecho','#id_contribuyente'],
        filtrosNulos:[false,true,true],
        filtrosTitulos:['Tributo','Nro. Objeto/Hecho','CUIT'],
        limpiarCod: true,
        searchCode: true,
        exactField: 'd_objeto_hecho',
        campos:{d_objeto_hecho:'d_objeto_hecho',id_contribuyente:'id_contribuyente'},
        keyNav:true,
    });

    $('#d_objeto_hecho',formid).on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            //$('#d_objeto_hecho_lupa').show().css('display', 'table-cell');
            $('#d_objeto_hecho_lupa',formid).prop('disabled',false);
            
        } else if (event.type === 'keydown'&& $(this).val().length <3) {
            $('#d_objeto_hecho_lupa',formid).prop('disabled',true);
        } else if (event.type === 'focusout' && $(this).val().length <3) {
            $('#d_objeto_hecho_lupa',formid).prop('disabled',true);
        }
    });

    $("#d_producto_lupa",formid).lupa_generica({
        id_lista:v_lista_productos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Descripción',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#c_tributo'],
        campos:{c_codigo:'c_producto',d_descrip:'d_producto'},
        searchInput: '#c_producto',
        searchCode: true,
        keyNav:true,
        limpiarCod: true
    });

    $("#desc_denom_lupa",formid).lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['Contribuyente','CUIT','Denominacion'],
        grid:[{index:'id_contribuyente',width:450,hidden:true},{index:'n_cuit',width:100},{index:'d_denominacion',width:350}],
        caption:'Denominacion',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#desc_denom'],
        filtrosNulos:[true],
        campos:{n_cuit:'n_cuit',d_denominacion:'desc_denom',id_contribuyente:'id_contribuyente'},
        searchInput: '#desc_denom',
        //searchCode: true,
        keyNav:true,
        limpiarCod: true
    });

    

    $('#desc_denom',formid).on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            //$('#desc_denom_lupa').show().css('display', 'table-cell');
            $('#desc_denom_lupa',formid).prop('disabled',false);
            
        } else if (event.type === 'keydown'&& $(this).val().length <5) {
            $('#desc_denom_lupa',formid).prop('disabled',true);
        } else if (event.type === 'focusout' && $(this).val().length <5) {
            $('#desc_denom_lupa',formid).prop('disabled',false);
        }
    });


    $("#desc_denom_cbu_lupa",formid).lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['Contribuyente','CUIT','Denominacion'],
        grid:[{index:'id_contribuyente',width:450,hidden:true},{index:'n_cuit',width:100},{index:'d_denominacion',width:350}],
        caption:'Denominacion',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#desc_denom_cbu'],
        filtrosNulos:[true],
        campos:{n_cuit:'n_cuit_cbu',d_denominacion:'desc_denom_cbu',id_contribuyente:'id_contribuyente_cbu'},
        searchInput: '#desc_denom_cbu',
        //searchCode: true,
        keyNav:true,
        limpiarCod: true
    });

    

    $('#desc_denom_cbu',formid).on('keydown focusout', function (event) {
        
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            //$('#desc_denom_lupa').show().css('display', 'table-cell');
            $('#desc_denom_cbu_lupa',formid).prop('disabled',false);
            
        } else if (event.type === 'keydown'&& $(this).val().length <5) {
            $('#desc_denom_cbu_lupa',formid).prop('disabled',true);
        } else if (event.type === 'focusout' && $(this).val().length <5) {
            $('#desc_denom_cbu_lupa',formid).prop('disabled',false);
        }
    });


}

function abm_mail_telefonos(params){
    params.id_menu = v_id_menu;
    params.n_orden = 1;

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
                $('#mail_tel_modal').modal('hide');
                mostrar_confirmacion('Operación realizada con éxito.');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function valida_fechas(formid) {
    var f_desde = $("#f_vig_desde",formid).val();
    var f_hasta = $("#f_vig_hasta",formid).val();

    const [diaDesde, mesDesde, anioDesde] = f_desde.split('/');
    const [diaHasta, mesHasta, anioHasta] = f_hasta.split('/');

    const fechaDesde = new Date(anioDesde, mesDesde - 1, diaDesde);
    const fechaHasta = new Date(anioHasta, mesHasta - 1, diaHasta);

    if(f_hasta !== ''){
        return fechaHasta >= fechaDesde;
    }else{
        return true;
    }
}
/*
function autocompleta_contribuyente(){
    $.ajax({
        type:'POST',
        url: "abm_adhesion/php/autocomplete.php",
        data: {oper:'contribuyente', c_tributo: $('#c_tributo').val(), d_objeto_hecho: $('#d_objeto_hecho').val()},
        dataType: 'json',
        success: function( data ) {
            if(data !== null){
                ajax_autocomplete = null;
                $("#id_contribuyente").val(data[0].ID_CONTRIBUYENTE);
                $("#n_cuit").val(data[0].N_CUIT);
                $('#n_cuit').mask('99-99999999-9');
                $("#desc_denom").val(data[0].D_DENOMINACION);
            }
        }
    });
}*/
