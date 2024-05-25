function calcular_totales(f_pago){
    $.ajax({
        type:"POST",
        url: "ingreso_f_acred_pagos_sirtac/php/calcular_totales.php",
        data:{ p_f_pago: f_pago},
        dataType: 'json',
        success: function (res) {
            $('#tot_pagado').val(res.TOTAL_PAGADO || 0);
            $('#tot_reca').val(res.TOTAL_RECAUDACIONES || 0);
            $('#tot_intereses').val(res.TOTAL_INTERESES || 0);
        }                 
    });
}

function actualizar_remesas(fechas_a_procesar, n_remito){
    let fechas = fechas_a_procesar.split('|');
    for (let i = 0; i < fechas.length; i++){
        let remesa = document.getElementById(fechas[i] + 'n_remesa');
        let fecha = document.getElementById(fechas[i])
        if(fechas[i] !== '' && fecha != null && remesa != null){
            remesa.value = n_remito;
            fecha.checked = false;
            fecha.disabled = true;
        }
    }
}

function abrir_modal(id){
    let f_pago = $("#pagos_grid").getCell(id, 'f_pago');
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
