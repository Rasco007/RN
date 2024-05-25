// Obtenemos el HTML del cuadro de parámetros y mostramos el cuadro
function fun_parametros(p_id_cons_dinamica, p_id_consulta_din){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url:'consulta_din/php/armar_html.php',
        type:"POST",
        data:{
            p_id_cons_dinamica: p_id_cons_dinamica,
            p_id_consulta_din: p_id_consulta_din,
        },
        dataType:'json'
    }).done(function(data) {

        if(data.estado != 'OK'){
            alert(data.estado);
        }else{
            $('#borrar').remove();
            $("#modal_parametros_body").append(data.info);
            $('#modal_parametros').modal('show');
            $('#frm_parametros .input-group >:first-child').blur();
        }
    });
}