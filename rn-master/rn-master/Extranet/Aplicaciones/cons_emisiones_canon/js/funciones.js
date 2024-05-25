function fun_select_todas(){
	if($("#m_todas").is(':checked')){
		$("#n_secuencia_desde, #n_secuencia_hasta").val(null);
		$('#m_todas_sin_mail').prop('checked', false);
	}
}

function fun_select_todas_mail(){
	if($("#m_todas_sin_mail").is(':checked')){
		$("#n_secuencia_desde, #n_secuencia_hasta").val(null);
		$('#m_todas').prop('checked', false);
	}
}

function aprobar_emision(){
	var id = $("#emisiones_grid").getGridParam('selrow');
    if (id) {
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_id_sesion":$("#emisiones_grid").getCell(id,"id_sesion"),
                "id_menu":10957,
                "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_confirmacion('La emisión ha sido confirmada correctamente.');
                    $("#emisiones_grid").trigger('reloadGrid');
                }
                else{
                    mostrar_error(data.resultado);
                    return;
                }
            }
        });
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
    }
}

function modal_emision_masiva(){
	var id = $("#emisiones_grid").getGridParam('selrow');
    if (id) {
        if($('#emisiones_grid').getCell(id, 'c_control') == 'C'){
        	$("#frm_impresion_masiva input").val(null);
        	$('#m_todas, #m_todas_sin_mail').prop('checked', false);
            $("#modal_impresion_masiva").modal('show');
        }else{
            mostrar_validacion('No es posible imprimir las emisiones no aprobadas.');
        }
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
    }
}

function validar_campos(){
    if($("#n_secuencia_desde").val() != "" || $("#n_secuencia_hasta").val() != ""){
        return true;
    }else{
        if($("#m_todas").is(':checked') || $("#m_todas_sin_mail").is(':checked')){
            return true;
        }else{
            return false;
        }
    }
}

function reloadComboAreas(c_organismo,c_region){
    // si es distinto de null recargo areas segun region seleccionadas
    $('#combo_areas').empty();
    $.ajax({
        url: 'cons_emisiones_canon/php/getAreas.php',
        type:"POST",
        async:false,
        dataType:"json",
        data:{
            "c_organismo":c_organismo,
            "c_region":c_region
        },
        success: function(data){
            //reload data of selected region
            for (var idx in data.datos) {
                $('#combo_areas').append('<option value=' + data.datos[idx].C_DATO + '>' + data.datos[idx].D_DATO + '</option>');
            }
            
            $('#combo_areas').selectpicker('refresh');
        }
    });
}

function reloadComboRegiones(c_organismo){
    // si es distinto de null recargo regiones segun consorcio seleccionadas
    $('#combo_areas, #combo_regiones').empty();
    $.ajax({
        url: 'cons_emisiones_canon/php/getRegiones.php',
        type:"POST",
        async:false,
        dataType:"json",
        data:{
            "c_organismo":c_organismo
        },
        success: function(data){
            //reload data of selected region
            for (var idx in data.datos) {
                $('#combo_regiones').append('<option value=' + data.datos[idx].C_DATO + '>' + data.datos[idx].D_DATO + '</option>');
                $('#combo_areas').append('<option value=""></option>');
            }
            
            $('#combo_regiones').selectpicker('refresh');
        }
    });
}