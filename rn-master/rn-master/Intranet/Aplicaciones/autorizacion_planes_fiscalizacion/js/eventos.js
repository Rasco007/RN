function inicializarEventos(){

    $('#mascara_lupa_d_plan').hide();
    $('#gridWrapper').hide();
    $('#gridWrapperDetalle').hide();
    $('#div-totales').hide();


    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#btn_buscar').click(function(){

        $('#gridWrapper').show();
        $(window).resize();

        $('#anio').prop('disabled', true);
        $('#d_plan').prop('disabled', true);
        $('#d_observac').prop('disabled', true);
        $('#f_de_aprobacion').prop('disabled', true);
        $('#n_horas_est').prop('disabled', true);
        $('#n_inspectores_est').prop('disabled', true);
        $('#lupa_d_plan').hide();
        $('#mascara_lupa_d_plan').show().css('display', 'table-cell');

        let n_anio = $("#anio").val();
        let d_plan = $("#d_plan").val();
        let d_observac = $("#d_observac").val();
        let n_inspectores_est  = $("#n_inspectores_est ").val();
        let n_horas_est  = $("#n_horas_est ").val();
        let f_aprobacion  = $("#f_de_aprobacion ").val();

        filtros_no_nativos = [];
        filtros_arr_main = [];

        if($('#d_plan').val() !== ''){
            filtros_arr_main.push('Plan de Fiscalización: '+ $('#d_plan').val());
        }
        if($('#anio').val() !== ''){
            filtros_arr_main.push('Año: '+ $('#anio').val());
        }
        if($('#d_observac').val() !== ''){
            filtros_arr_main.push('Observación: '+ $('#d_observac').val());
        }
        if($('#f_de_aprobacion').val() !== ''){
            filtros_arr_main.push('F. de Aprobación: '+ $('#f_de_aprobacion').val());
        }
        if($('#n_horas_est').val() !== ''){
            filtros_arr_main.push('Total de Horas estimadas: '+ $('#n_horas_est').val());
        }
        if($('#n_inspectores_est').val() !== ''){
            filtros_arr_main.push('Total de Inspectores estimados: '+ $('#n_inspectores_est').val());
        }

        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

        setea_parametros('#main_grid',{':p_n_anio':n_anio,':p_d_plan':d_plan,':p_d_observac':d_observac,
            ':p_n_inspectores_est':n_inspectores_est ,':p_n_horas_est':n_horas_est ,':p_f_aprobacion':f_aprobacion });
    
    });


   
    
    $('#btn_limpiar').click(function(){

        $('#anio').prop('disabled', false);
        $('#d_plan').prop('disabled', false);
        $('#d_observac').prop('disabled', false);
        $('#f_de_aprobacion').prop('disabled', false);
        $('#n_horas_est').prop('disabled', false);
        $('#n_inspectores_est').prop('disabled', false);

        $('#anio').val(null);
        $('#d_plan').val(null);
        $('#d_observac').val(null);
        $('#f_de_aprobacion').val(null);
        $('#n_horas_est').val(null);
        $('#n_inspectores_est').val(null);

        $('#main_grid').clearGridData();
        $('#detalles_grid').clearGridData();

        $('#mascara_lupa_d_plan').hide();
        $('#lupa_d_plan').show().css('display', 'table-cell');

        $('#gridWrapper').hide();
        $('#gridWrapperDetalle').hide();
        $('#div-totales').hide();

        filtros_no_nativos = [];
        filtros_arr_main = [];

    });

}

function inicializarEventosGrilla(formid,id_plan_fis,n_programa_fis,oper) {   
    let p_tipo_consulta = formid[0].id;
    let p_id_plan_fis = id_plan_fis;


    switch (p_tipo_consulta) {
        case "FrmGrid_main_grid":
           
          if(oper == 'EDIT'){

                $("#id_plan_fis").val(p_id_plan_fis);
                $('#id_plan_fis').attr("readonly","readonly");
                $('#d_plan').attr("readonly","readonly");
                $('#n_anio').attr("readonly","readonly");
                $('#d_observac').attr("readonly","readonly");
                $('#n_inspectores_est').attr("readonly","readonly");
                $('#n_horas_est').attr("readonly","readonly");
               

            
                }
            

           
            break;
            
            default:
            break;
    }
    $('#i_recaudacion_esp').focusout(function () {
        $('#i_recaudacion_esp').val(formatea_number(mascara_numero(parse($('#i_recaudacion_esp').val()).toFixed(2), ',', -1, 2), ''));
    });
}


function calcular_horas_totales(p_tipo_consulta,p_id_plan_fis){
    $.ajax({                     
        url: "planes_fiscalizacion/php/datos.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ "p_tipo_consulta" :p_tipo_consulta,
        "p_id_plan_fis":p_id_plan_fis
    },                     
        success: function (res) {                         
            $('#tot_horas_est').val(res.TOT_HORAS || 0);
        }                 
    });
}
$('#btn_aceptar_edicion_f_aprob').click(function () {
    if ($('#frm_cuota').validationEngine('validate')) {
        var params = {
            id_plan_fis:$('#id_plan_fis').val(),
            n_anio:$('#n_anio').val(),
            d_plan:$('#d_plan').val(),
            d_observac:$('#d_observac').val(),
            f_aprobacion:$('#f_aprobacion').val(),
            n_inspectores_est:$('#n_inspectores_est').val(),
            n_horas_est:$('#n_horas_est').val(),
            id_menu: v_id_menu,
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

function clear_modal_inputs(){
    $('#d_plan').val("");

    $('#d_observac').val("");
    $('#n_anio').val("");
    $('#id_plan_fis').val("");
    $('#f_aprobacion').val("");
    $('#n_inspectores_est').val("");
    $('#n_horas_est').val("");

}

function soloNumeros(event) {
    const codigoTecla = event.keyCode || event.which;
    const tecla = String.fromCharCode(codigoTecla);

    const soloNumeros = /^[0-9]+$/;

    if (!soloNumeros.test(tecla)) {
        event.preventDefault();
    }
}