function asignar_ids_btn_pfp(){
    for(let i = 1; i <= $('#main_grid_planes_de_pago').getGridParam('records'); i++){
        let rowData = $('#main_grid_planes_de_pago').jqGrid('getRowData', i);
        let nuevo_id = 'btn_' + i;

        rowData.boton_pfp = '<button type="button" id="' + nuevo_id + '" class="ui-button ui-corner-all ui-widget btn_pfp" onclick="abrir_pfp(this.id)">PFP</button>';
        $('#main_grid_planes_de_pago').jqGrid('setRowData', i, rowData);
    }
}

function abrir_pfp(id_btn){
    let id_row = id_btn.slice(4);
    try{
        post_to_url('consulta_de_planes.php', { 
            'p_n_id_menu': 100157,
            'p_n_plan_pago': $('#main_grid_planes_de_pago').getCell(id_row, 'n_plan_pago')
        }, '_blank');
    }catch (e) {
        mostrar_cuadro('E', 'Error', e);
    }
}

function buscar() {
    filtros_no_nativos_ar = [];
    filtros_arr_main = [];

    $('#c_tipo_imponible').attr('disabled',true);
    $('#d_tipo_imponible').attr('disabled',true);
    $('#d_objeto_hecho').attr('disabled',true);
    $('#mascara_lupa_c_tipo_imponible').show().css('display', 'table-cell');
    $("#lupa_c_tipo_imponible").hide();
    $('#btn_buscar').attr('disabled',true);

    if($('#c_tipo_imponible').val() != ''){
        filtros_arr_main.push('Tipo Imponible: '+ $('#c_tipo_imponible').val());
    }
    if($('#d_objeto_hecho').val() != ''){
        filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
    }

    filtros_no_nativos_ar['main_grid_planes_de_pago'] = filtros_arr_main;
    setea_parametros('#main_grid_planes_de_pago',{
        ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
        ':p_objeto_hecho':$('#d_objeto_hecho').val()
    });

    document.getElementById('grid_planes_de_pago').style.display="block";
    $(window).resize();

    $('#main').procOverlay({visible:false});
}