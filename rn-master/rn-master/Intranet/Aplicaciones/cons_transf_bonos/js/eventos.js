function init_eventos(){

    $('#mascara_lupa_c_bono').hide();

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#lupa_c_bono').lupa_generica({
        id_lista:v_lista_bonos,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:116},
            {index:'d_descrip',width:450}],
        caption:'Tipos de Bonos',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_bono',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_codigo',
        campos:{c_codigo:'c_bono',d_descrip:'d_bono'},
        keyNav:true
    });

    if(n_transfer){
        $("#transferencia").val(n_transfer);
    }

    $("#btn_limpiar").click(function(){
        $("#transferencia").val('');
        $("#c_bono").val('');
        $("#d_bono").val('');
        $("#especie").val('');
        $("#f_bono").val('');
        $("#cta_comitente").val('');
      
        setea_parametros('#grid_tranf_bonos',{
            ':n_transfer': null,
            ':c_bono': 0,
            ':c_especie': null,
            ':f_transfer': null,
            ':n_cta_comitente': null,
        });
        seleccionoUnaFila = false;
        $('#mascara_lupa_c_bono').hide();
        $('#lupa_c_bono').show();
        $('#transferencia').attr('disabled', false);
        $('#c_bono').attr('disabled', false);
        $('#especie').attr('disabled', false);
        $('#f_bono').attr('disabled', false);
        $('#cta_comitente').attr('disabled', false);
    });

    function abrir_modal(modal){
        $(modal).modal('show');
        $(window).resize();
    }

    $("#btn_consultar").click(function(){

        $('#transferencia').attr('disabled', true);
        $('#c_bono').attr('disabled', true);
        $('#especie').attr('disabled', true);
        $('#f_bono').attr('disabled', true);
        $('#cta_comitente').attr('disabled', true);
        $('#mascara_lupa_c_bono').show();
        $('#lupa_c_bono').hide();
        

        setea_parametros('#grid_tranf_bonos',{
            ':n_transfer': $("#transferencia").val(),
            ':c_bono': $("#c_bono").val(),
            ':c_especie': $("#especie").val(),
            ':f_transfer': $("#f_bono").val(),
            ':n_cta_comitente': $("#cta_comitente").val(),
        });


        filtros_no_nativos_ar['grid_tranf_bonos'] = [];
        if($('#transferencia').val() != ''){
            filtros_no_nativos_ar['grid_tranf_bonos'].push('Transferencia: ' + $('#transferencia').val());
        }
        if($('#c_bono').val() != ''){
            filtros_no_nativos_ar['grid_tranf_bonos'].push('Bonos: ' + $('#c_bono').val() + ' - ' + $('#d_bono').val());
        }
        if($('#especie').val() != ''){
            filtros_no_nativos_ar['grid_tranf_bonos'].push('Especie: ' + $('#especie').val());
        }
        if($('#f_bono').val() != ''){
            filtros_no_nativos_ar['grid_tranf_bonos'].push('Fecha: ' + $('#f_bono').val());
        }
        if($('#cta_comitente').val() != ''){
            filtros_no_nativos_ar['grid_tranf_bonos'].push('Cta.Comitente: ' + $('#cta_comitente').val());
        }
    });

    $("#btn_detalle").click(function(){
        if(seleccionoUnaFila){
            abrir_modal("#modal_detalle");
        }
        else{
            mostrar_cuadro('I', 'Atención', 'Debe Seleccionar un registro');
        }
    });

    $("#btn_aplicacion").click(function(){
        if(seleccionoUnaFila){
            abrir_modal("#modal_aplicacion");
        }
        else{
            mostrar_cuadro('I', 'Atención', 'Debe Seleccionar un registro');
        }
    });

    $("#btn_aplicacion_modal").click(function(){
        if($("#transferencia").val() ||$("#c_bono").val() ||$("#d_bono").val() ||$("#especie").val() ||$("#f_bono").val() ||$("#cta_comitente").val()){
            setea_parametros('#grid_aplicacion_bonos',{
                ':n_transfer': $("#transferencia_modal").val(),
            });
        } 
        $("#modal_detalle").modal('hide');
        abrir_modal("#modal_aplicacion");
    });
    
}