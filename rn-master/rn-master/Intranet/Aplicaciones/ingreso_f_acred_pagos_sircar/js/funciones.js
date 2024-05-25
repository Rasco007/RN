function calcular_totales(f_pago){
    $.ajax({                     
        url: "ingreso_f_acred_pagos_sircar/php/calcular_totales.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_f_pago: f_pago},                     
        success: function (res) {                         
            $('#tot_importe').val(res.IMPORTE_TOTAL || 0);
            if($('.ui-search-toolbar').is(":visible")){
                $('#bt_display_filter_toolbar_detalle_pagos_grid_pager').click();
            }
        }                 
    });
}

function actualizar_remesas(fechas_a_procesar, n_remitos){
    let fechas = fechas_a_procesar.split('|');
    let remitos = n_remitos.split('|');
    for (let i = 0; i < fechas.length; i++){
        let remesa = document.getElementById(fechas[i] + 'n_remesa');
        let fecha = document.getElementById(fechas[i])
        if(fechas[i] != '' && fecha != null && remesa != null){
            remesa.value = remitos[i];
            fecha.checked = false;
            fecha.disabled = true;
        }
    }
}

function abrir_modal(id){
    filtros_arr_main = [];
    let f_pago = $("#pagos_grid").getCell(id, 'f_pago');
    filtros_arr_main.push('F. Pago: ' + f_pago);
    filtros_no_nativos_ar['detalle_pagos_grid'] = filtros_arr_main;
    setea_parametros('#detalle_pagos_grid',{':p_f_pago':f_pago});
    $('#pago_modal').modal("show");
    $(window).resize();
    calcular_totales(f_pago);
}

function actualizar_checkboxes(){
    f_pagos.forEach(fecha => {
        let checkbox = document.getElementById(fecha);
        if(checkbox != null){
            checkbox.checked= true;
        }
    });
}

function to_string(f_pagos){
    let string = '';
    f_pagos.forEach(fecha => {
        string += fecha + '|';
    });
    return string;
}
