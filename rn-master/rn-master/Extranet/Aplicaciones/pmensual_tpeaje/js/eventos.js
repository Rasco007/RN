function inicializarEventos() {
    $("#filtro_dominio").each(function() {
        var events = $._data(this,'events');
        if(events && events['keyup']) return;
        $(this).keyup(function(){
            if($(this).prop('readonly')) return;
            $(this).val( $(this).val().toUpperCase() );
        }).css("text-transform","uppercase");
    }).keypress(function (tecla) {
        return (((tecla.charCode >= 48 && tecla.charCode <= 90) || (tecla.charCode >= 97 && tecla.charCode <= 122)) && $(this).val().length < 9);
    });

    $('#btn_buscar').click(function () {
        setea_parametros('#main_grid',{'p_id_contribuyente':id_cont,
            'p_d_patente':$('#filtro_dominio').val(),
            'p_pase_vigente':$('#filtro_pase').val()});
    });

    $('#btn_limpiar').click(function () {
       $('#frm_consulta :input').val(null);
       $('#filtro_pase').selectpicker('refresh');
        setea_parametros('#main_grid',{'p_id_contribuyente':id_cont,
            'p_d_patente':null,
            'p_pase_vigente':null});
    });

    $('#btn_comprar').click(function () {
        var rowid = $("#main_grid").getGridParam('selrow');
        if (rowid) {
            $('#c_clase_aut').val($("#main_grid").getCell(rowid,'c_clase_aut'));
            $('#d_dominio').val($("#main_grid").getCell(rowid,'d_patente'));
            $('#d_dominio').attr('disabled',true);
            get_datos();
        }else{
            mostrar_validacion('Debe seleccionar un registro de la grilla.');
        }
    });

    $('#btn_modal_comprar').click(function () {
        validar_vigencia();
    });
}