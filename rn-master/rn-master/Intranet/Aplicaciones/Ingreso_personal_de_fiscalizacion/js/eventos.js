function inicializarEventosGrilla(formid, oper) {   
      if(oper == 'EDIT'){
            $('#d_denominacion_lupa').hide();
      }
}

function inicializa_eventos(){

    $(document).on('input change click', '#editmodmain_grid', function(event) {
        if($('#d_tipo_personal').val() != ''){
            $('#c_tipo_personal').prop('disabled', true);
        }
        if($('#d_sector_fisca').val() != ''){ 
            $('#c_sector_fisca').prop('disabled', true);
        }
    });

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_c_tipo_personal').hide();
    $('#mascara_lupa_c_sector').hide();

    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    }).mask("99/99/9999");

    $("#abm_modal").on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });
      
    $('#d_denominacion_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });
 
    $('#btn_limpiar').click(function(){
        $('#d_denominacion_filtro').val(null);
        $('#c_tipo_personal_filtro').val(null);
        $('#d_tipo_personal_filtro').val(null);
        $('#c_sector_fisca_filtro').val(null);
        $('#d_sector_fisca_filtro').val(null);
        $('#f_baja_filtro').val(null);
        $('#d_usuario_filtro').val(null);
        $('#main_grid').clearGridData();
        setea_parametros('#main_grid',{},'N');

        $('#d_denominacion_filtro').prop('disabled', false);
        $('#c_tipo_personal_filtro').prop('disabled', false);
        $('#d_tipo_personal_filtro').prop('disabled', false);
        $('#c_sector_fisca_filtro').prop('disabled', false);
        $('#d_sector_fisca_filtro').prop('disabled', false);
        $('#f_baja_filtro').prop('disabled', false);
        $('#d_usuario_filtro').prop('disabled', false);
        $('#btn_buscar').prop('disabled', false);

        $('#lupa_d_denominacion').hide();
        $('#lupa_c_tipo_personal').show();
        $('#lupa_c_sector').show();
        $('#mascara_lupa_c_tipo_personal').hide();
        $('#mascara_lupa_d_denominacion').show();
        $('#mascara_lupa_c_sector').hide();
    
    });
    
    $('#btn_buscar').click(function(){
        let d_denominacion = $("#d_denominacion_filtro").val();
        let c_tipo_personal = $("#c_tipo_personal_filtro").val();
        let c_sector_fisca = $("#c_sector_fisca_filtro").val();
        let f_baja = $("#f_baja_filtro").val();
        let c_usuario_base = $("#d_usuario_filtro").val();     
    
        setea_parametros('#main_grid',{':p_d_denominacion':d_denominacion,
        ':p_c_tipo_personal':c_tipo_personal,
        ':p_c_sector_fisca':c_sector_fisca,
        ':p_f_baja':f_baja,
        ':p_c_usuario_base':c_usuario_base });
        
        $('#d_denominacion_filtro').prop('disabled', true);
        $('#c_tipo_personal_filtro').prop('disabled', true);
        $('#d_tipo_personal_filtro').prop('disabled', true);
        $('#c_sector_fisca_filtro').prop('disabled', true);
        $('#d_sector_fisca_filtro').prop('disabled', true);
        $('#f_baja_filtro').prop('disabled', true);
        $('#d_usuario_filtro').prop('disabled', true);
        $('#btn_buscar').prop('disabled', true);

        $('#lupa_d_denominacion').hide();
        $('#lupa_c_tipo_personal').hide();
        $('#lupa_c_sector').hide();
        $('#mascara_lupa_c_tipo_personal').show();
        $('#mascara_lupa_d_denominacion').show();
        $('#mascara_lupa_c_sector').show();

        //filtros
        filtros_arr_main = [];
        if($('#d_denominacion_filtro').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#d_denominacion_filtro').val());}
        if($('#d_tipo_personal_filtro').val() !== ''){filtros_arr_main.push('Tipo Personal: '+ $('#d_tipo_personal_filtro').val());}
        if($('#d_sector_fisca').val() !== ''){filtros_arr_main.push('Sector de origen: '+ $('#d_sector_fisca_filtro').val());}
        if($('#f_baja_filtro').val() !== ''){filtros_arr_main.push('F. de baja: '+ $('#f_baja_filtro').val());}
        if($('#d_usuario_filtro').val() !== ''){filtros_arr_main.push('Usuario de la base: '+ $('#d_usuario_filtro').val());}

        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
    });
}


function inicializa_lupas(){

    $("#lupa_c_sector").lupa_generica({
        id_lista:v_lista_sectores_fisca,
        titulos:['Codigo','Descripcion'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:460}],
        caption:'LISTADO DE SECTORES DE FISCALIZACION',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_sector_fisca_filtro',d_descrip: 'd_sector_fisca'},
        keyNav:true,
        searchInput: '#c_sector_fisca_filtro',
        searchCode: true
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_usuarios_internos,
        titulos:['Usuario','Denominación'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:460}],
        caption:'LISTA USUARIOS INTERNOS',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#d_denominacion_filtro'],
        filtrosNulos:[true],
        campos:{c_codigo:'c_denominacion_filtro',d_descrip: 'd_denominacion_filtro'},
        keyNav:true,
    });

    $("#lupa_c_tipo_personal").lupa_generica({
        id_lista:v_lista_tipos_personal,
        titulos:['Código','Tipo Personal'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:460}],
        caption:'LISTADO DE TIPOS DE PERSONAL',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_personal_filtro',d_descrip: 'd_tipo_personal_filtro'},
        keyNav:true,
        searchInput: '#c_tipo_personal_filtro',
        searchCode: true 
    });
  
}


$('#btn_aceptar_f_baja').click(function () {
    if ($('#frm_cuota').validationEngine('validate')) {
        var params = {
            id_personal:$('#id_personal').val(),
            c_tipo_personal:$('#c_tipo_personal').val(),
            d_denominacion:$('#d_denominacion_modal').val(),
            c_sector_fisca:$('#c_sector_fisca').val(),
            f_baja:$('#f_baja_modal').val(),
            id_menu: p_id_menu,
            n_orden: 0,
            oper: $('#p_oper').val()
        };
        abm_datos_movimientos(params,'main_grid','abm_modal');
    }
});


function abm_datos_movimientos(params,grilla,modal){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: params,
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#'+grilla).trigger('reloadGrid');
                $('#'+modal).modal("hide");
                clear_modal_inputs();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}
   


