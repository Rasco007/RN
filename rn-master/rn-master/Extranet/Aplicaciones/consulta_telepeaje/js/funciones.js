function ver_detalle(id_obl){
    if (id_obl){
        setea_parametros('#detalle_grid',{':p_id_obligacion':id_obl});
        $('#detalle_modal').modal('show');
    }
}

function ver_foto(source){
    $('#foto_path').val(source);
    $('#foto_modal').modal('show');
}