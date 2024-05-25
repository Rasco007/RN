function init_eventos(){

    $("#btn_buscar").click(function(){

        $("#btn_buscar").attr('disabled',true);

        $("#c_origen").attr('disabled',true);
        $("#c_fmcamod").attr('disabled',true);
        $("#n_valuacion").attr('disabled',true);
        $("#d_descripcion").attr('disabled',true);

        filtros_no_nativos = [];
        filtros_arr_main = [];
        if($('#c_fmcamod').val() != ''){
            filtros_arr_main.push('Fmcamod: '+ $("#c_fmcamod").val());
        }
        if($('#d_descripcion').val() != ''){
            filtros_arr_main.push('Descripción: '+ $('#d_descripcion').val());
        }
        if($('#n_valuacion').val() != ''){
            filtros_arr_main.push('Valuación: '+ $('#n_valuacion').val());
        }
        if($('#c_origen').val() != ''){
            filtros_arr_main.push('Origen: '+ $('#c_origen').val());
        }
        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

        setea_parametros("#main_grid",{
            'p_c_fmcamod': $("#c_fmcamod").val(),
            'p_c_origen':$("#c_origen").val(),
            'p_n_valuacion':$("#n_valuacion").val(),
            'p_d_descripcion': $("#d_descripcion").val()
        });
    });

    $("#btn_limpiar").click(function(){
        $("#c_origen").val('');
        $("#c_fmcamod").val('');
        $("#n_valuacion").val('');
        $("#d_descripcion").val('');

        $("#c_origen").attr('disabled',false);
        $("#c_fmcamod").attr('disabled',false);
        $("#n_valuacion").attr('disabled',false);
        $("#d_descripcion").attr('disabled',false);

        $("#btn_buscar").attr('disabled',false);
        setea_parametros('#main_grid',{},'N');
    });


}