function getCheckboxNumber(checkboxId) {
    const match = checkboxId.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }

function guardar_seleccion(pagar){
    if ($("#f_venci").find(":selected").val() == ""){
        mostrar_cuadro('I', 'Advertencia', 'Debe seleccionar una fecha de vencimiento!');
        return;
    }
    var id_obl_seleccionados = get_id_obl_seleccionados();
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_sesion": id_sesion,
         "p_id_obl_seleccionados": id_obl_seleccionados,
         "p_f_vto": $("#f_venci").val(),
         "id_menu":v_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_cuadro('C','Emision Boleta','Esta por emitir la boleta, esta seguro?', function(){
                emitir_boleta(pagar);
                });

            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function get_id_obl_seleccionados(){
    var string = "";
    seleccionados.forEach(sel => {
        let id = getCheckboxNumber(sel);
        string += $('#det_pago_anual_grid').getCell(id,'id_obligacion') + "|";
    });
    return string;
}

function emitir_boleta(pagar){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_sesion": id_sesion,
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                imprimir(data.p_id_boleta, pagar);
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function imprimir(id_boleta, pagar){

    $('#main').procOverlay({visible:true});
        let params = 'p_boleta|'+ id_boleta;
        llamar_report('RECAA106', params, 'PDF');

    if(pagar){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_boleta": id_boleta,
             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    window.open(data.p_url);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    }
}

function get_fecha_vencimiento(p_tributo, p_anio){
    $.ajax({                     
        url: "generador_pago_anual_multi/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{
            "p_tributo":p_tributo,
            "p_anio":p_anio,
            "p_oper": "getFechaVto"
        },                     
        success: function (res) { 
            if (res != null){      
                $("#f_vto1").val(res.F_VTO); 
                $("#f_vto1").text(res.F_VTO);    
                $("#f_vto2").val(res.F_VTO2);   
                $("#f_vto2").text(res.F_VTO2);
                $("#f_venci").val($("#f_vto1").val()).change();   
            }         
        }                 
    });
}

function setear_ids_checkboxes(){
    $(".checkbox").each((index, box) => {
        box.setAttribute('id', 'checkbox_' + box.closest('tr').id);
    });
}

function setear_evento_checkboxes(){
    $('.checkbox').change(function(id){
        let checkbox = id.currentTarget;
        let id_row = getCheckboxNumber(checkbox.id);
        var estado = $('#det_pago_anual_grid').getCell(id_row,'estado');
        var saldo = $('#det_pago_anual_grid').getCell(id_row,'pago');
        if(checkbox.checked){
            if(estado == 'E'){
               checkbox.checked= false;
               mostrar_cuadro('I', 'Advertencia', 'No puede seleccionar este Pago Anual, verifique el cuadro de mensajes.');
            }
            else{
                if( Number(total_seleccionado) + Number(saldo) > 9999999){
                    checkbox.checked= false;
                    mostrar_cuadro('I', 'Advertencia', 'El total seleccionado supera el máximo --> 9.999.999$ .');
                }
                else{
                    total_seleccionado = Number(total_seleccionado) + Number(saldo);
                    seleccionados.push(checkbox.id);
                }
            }
        } else {
            total_seleccionado  = Number(total_seleccionado) - Number(saldo);
            let index = seleccionados.indexOf(checkbox.id);
            seleccionados.splice(index, 1);
        }
        if(total_seleccionado != 0){
            $("#total_seleccionado").val(total_seleccionado.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }else{
            $("#total_seleccionado").val('0.00');
        }
        if(seleccionados.length == 0){
            $("#total_seleccionado").val('0.00');
        }
    });
}

function actualizar_checkboxes(){
    seleccionados.forEach(id => {
        let checkbox = document.getElementById(id);
        if(checkbox != null){
            checkbox.checked= true;
        }
    });
}

function actualizar_error(id){

    if(id != null){
        let error = $('#det_pago_anual_grid').getCell(id,'errores');
        if (error != null && error != false ){
            $("#msjs_error").text(error);
            return;
        }
    }
    $("#msjs_error").text("");
    
};