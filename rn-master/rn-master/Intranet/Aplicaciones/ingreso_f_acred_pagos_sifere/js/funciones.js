function to_date(fecha){
    var dateParts = fecha.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; 
    var year = parseInt(dateParts[2], 10);
    var resultDate = new Date(year, month, day);
    return resultDate;
}

function ingresar_fecha_acred_dgr(id_archivo){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
         "p_f_acreditacion": $('#f_acred_modal').val(),      
         "p_fecha_acre_dgr": $('#f_ing_acred_dgr').val(),
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{
                     "p_f_acreditacion": $('#f_acred_modal').val(),      
                     "p_fecha_acre_dgr": $('#f_ing_acred_dgr').val(),
                     "p_id_archivo": $('#id_archivo').val(),
                     "id_menu":v_id_menu,
                     "n_orden":1
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $('#abm_modal').modal('hide');
                            mostrar_confirmacion('Operación realizada con éxito.');
                            document.getElementById(id_archivo).value = $('#f_ing_acred_dgr').val();
                            $('#id_archivo').val("");
                            $('#f_acred_modal').val("");
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });      
}

function llamar_form(id_archivo){
    post_to_url('consulta_sifere_movban.php',{'p_id_archivo':id_archivo},'_blank','POST');
}

function disable_inputs(){
    $('#tipo_reg').prop('disabled', true);
    $('#org_rec').prop('disabled', true);
    $('#banco_adm').prop('disabled', true);
    $('#f_proceso').prop('disabled', true);
    $('#f_acred').prop('disabled', true);
    $('#i_tot_deb').prop('disabled', true);
    $('#i_tot_cred').prop('disabled', true);
    $('#f_concil').prop('disabled', true);
    $('#f_acred_dgr').prop('disabled', true);
}
