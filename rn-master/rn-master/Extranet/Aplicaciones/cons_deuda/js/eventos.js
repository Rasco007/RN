
function inicializarEventos(){

    if(v_c_tributo == '160'){
        eventos_canon_riego();
    }

    $('#btn_buscar').click(function(){
        if($("#frm_consulta").validationEngine('validate')){
            $(".btn_lupa").hide();
            $("#main_grid").jqGrid("clearGridData");
            $.ajax({
                type: "post",
                url: "cons_deuda/php/funciones.php",
                data: {'oper':'get_deuda',
                        'd_objeto_hecho':$('#d_objeto_hecho').val(),
                        'n_cuit': n_cuit_sin_formato,
                        'c_tributo':$('#c_tributo').val(),
                        'id_tipotransacc':g_id_tipotransacc
                    },
                dataType: "json",
                success: function (response) {
                    if(response.resultado != 'OK'){
                        mostrar_error(response.error);
                    }else{
                        $(".selectpicker").attr('disabled',true);
                        id_sesion = response.info[0].IDSESSION;
                        g_id_transaccion = response.id_transaccion;
                        if (response.mensaje != null){
                            mostrar_mensaje('Información',response.mensaje,null,'601','300');
                        }
                        setea_parametros('#main_grid',{':id_sesion':id_sesion});
                        $('#f_actualizacion').val(fecha_hoy);
                        $('#f_actualizacion').change();
                        $("#datos_deuda").show();
                        $("#botones_busqueda").hide();
                        $(window).resize();
                    }              
                }
            });
        }
    });

    $('#btn_limpiar').click(function(){
        $(".selectpicker").attr('disabled',false);
        $(".limpiar").val('');
        $(".selectpicker").selectpicker('refresh');
        $(".btn_lupa").show();
        g_id_transaccion = null;
    });
    
    $('#btn_emitir_boleta').click(function(){
        var ids = new Array();
        ids = $("#main_grid").getGridParam('selarrrow');
        var lineas = '$';
        if(ids.length > 0){
           
            ids.forEach(rowid => {
                lineas = lineas + addLeadingZeros($("#main_grid").getCell(rowid,'linea'),4) + '$';              
            });
            
            $.ajax({
                type: "post",
                url: "cons_deuda/php/funciones.php",
                data: {'oper':'get_id_boleta',
                        'id_sesion':id_sesion,
                        'sel':lineas,
                        'f_actualizacion': $('#f_actualizacion').val(),
                        'c_tributo':$('#c_tributo').val(),
                        'id_transaccion':g_id_transaccion
                    },
                dataType: "json",
                success: function (response) {
                    $('#main').procOverlay({visible:false});
                    if(response.resultado != 'OK'){
                        mostrar_error(response.error);
                    }else{
                        llamar_report('BOLETA_AGR','p_id_boleta|'+response.n_comprobante,'PDF');
                        mostrar_mensaje_modal('S','Emitir Boleta',
                        'Se ha generado con éxito la Boleta N°: '+response.n_comprobante+'.',
                        function () {
                            $('#btn_volver').click();
                        });
                    }
                  
                }
            });
           
        }else{
            mostrar_validacion('Debe seleccionar al menos un registro de la grilla.');
        }
        
    });

    $('#btn_volver').click(function (e) {         
        $("#datos_deuda").hide();
        $("#botones_busqueda").show();
        $(".selectpicker").attr('disabled',false);
        g_id_transaccion = null;
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        }).mask("99/99/9999").change(function () {
        if ($(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });


    $('#f_actualizacion').datepicker("option",'minDate',fecha_hoy).datepicker("option",'maxDate',fecha_max_emision).change(function () {
    if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
        mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
        $(this).val(fecha_hoy);
    }else{
        $('#btn_actualizar').click();
    }
    });

    $("#f_actualizacion").datepicker("option","beforeShowDay",function(date){
        return noWeekendsOrHolidays(date,disabledDays);
    });

    $('#btn_actualizar').click(function(){
        $("#main_grid").jqGrid("clearGridData");
        $.ajax({
            type: "post",
            url: "cons_deuda/php/funciones.php",
            data: {'oper':'actualiza_deuda',
                    'id_sesion':id_sesion,
                    'f_actualizacion':$('#f_actualizacion').val()
                },
            dataType: "json",
            success: function (response) {
                if (response.resultado != 'OK'){
                    mostrar_validacion(response.error);
                }else{
                    $('#main_grid').trigger('reloadGrid');
                    $('#f_actualizacion').val(response.data[0]['FECHADEACTUALIZACION']);
                }
            }
        });
    });

}

function eventos_canon_riego(){
    $("#d_objeto_hecho_label").html('Partida');
    $("#filtros_canon").show();

    $.ajax({
        url: "cons_deuda/autocomplete.php",
        type:"POST",
        data:{
            p_oper:'getDatos',
            p_id_menu: v_id_menu,
            p_id_contribuyente: v_id_contribuyente,
            p_d_objeto_hecho: $('#d_objeto_hecho').val()
        },
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res.resultado == 'OK'){
                if (res.error){
                    mostrar_error(res.error);
                }else{
                    $("#n_regante").val(res.n_regante);
                }
            }else {
                mostrar_validacion(res.error);
            }
        }
    });

    $('#d_objeto_hecho').change(function () {
        if (!$('#d_objeto_hecho').val()){
            $('#n_regante').val('');
            $('#d_nomenclatura').selectpicker('val','');
            $('#d_nomenclatura').attr('disabled',false);
            $("#btn_lupa_regante").show();
        } else {
            $('#main').procOverlay({visible:true});
            $.ajax({
                url: "cons_deuda/autocomplete.php",
                type:"POST",
                data:{
                    p_oper:'getDatos',
                    p_id_menu: v_id_menu,
                    p_id_contribuyente: v_id_contribuyente,
                    p_d_objeto_hecho: $('#d_objeto_hecho').val()
                },
                success: function(response)
                {
                    $('#main').procOverlay({visible:false});
                    res = JSON.parse(response);
                    if (res.resultado == 'OK'){
                        if (res.error){
                            mostrar_error(res.error);
                        }else{
                            $('#d_nomenclatura').selectpicker('val',res.nomenclatura);
                            $("#n_regante").val(res.n_regante);
                            $("#btn_lupa_regante").hide();
                            $("#d_nomenclatura").attr('disabled',true);
                        }
                    }else {
                        mostrar_validacion(res.error);
                    }
                }
            });
        }
    });

    $("#d_nomenclatura").change(function () {
        if (!$('#d_nomenclatura').val()){
            $('#n_regante').val('');
            $('#d_objeto_hecho').selectpicker('val','');
            $("#btn_lupa_regante").show();
        }else{
            $('#main').procOverlay({visible:true});
            $.ajax({
                url: "cons_deuda/autocomplete.php",
                type:"POST",
                data:{
                    p_oper:'getDatos',
                    p_id_menu: v_id_menu,
                    p_id_contribuyente: v_id_contribuyente,
                    p_d_nomenclatura: $('#d_nomenclatura').val()
                },
                success: function(response)
                {
                    $('#main').procOverlay({visible:false});
                    res = JSON.parse(response);
                    if (res.resultado == 'OK'){
                        if (res.error){
                            mostrar_error(res.error);
                        }else{
                            $('#d_objeto_hecho').selectpicker('val',res.objeto);
                            $('#n_regante').val(res.n_regante);
                            $("#btn_lupa_regante").hide();
                        }
                    }else {
                        mostrar_validacion(res.error);
                    }
                }
            });
        }
    });

    $("#btn_lupa_regante").lupa_generica({
        id_lista:v_lista_regantes,
        titulos:['Regante / Parcela','CUIT','Denominación','Partida','Nomenclatura'],
        grid:[  {index:'n_regante',width:125},
            {index:'n_cuit',width:100, hidden:true},
            {index:'d_denominacion',width:150, hidden:true},
            {index:'objeto',width:100},
            {index:'nomenclatura',width:125}],
        caption:'Regante / Parcela asociados',
        sortname:'n_regante, objeto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_regante',
        exactField: 'n_regante',
        filtros:[v_id_contribuyente],
        filtrosTitulos:['CUIT y Denominación'],
        campos:{n_regante:'n_regante',d_objeto:'d_objeto_hecho'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            if (!$('#n_regante').val()){
                $('#d_objeto_hecho, #d_nomenclatura').selectpicker('val','');
                $('#d_nomenclatura').attr('disabled',false);
            } else {
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "cons_deuda/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getDatos',
                        p_id_menu: v_id_menu,
                        p_id_contribuyente: v_id_contribuyente,
                        p_n_regante: $('#n_regante').val()
                    },
                    success: function(response)
                    {
                        $('#main').procOverlay({visible:false});
                        res = JSON.parse(response);
                        if (res.resultado == 'OK'){
                            if (res.error){
                                mostrar_error(res.error);
                            }else{
                                $('#d_objeto_hecho').selectpicker('val',res.objeto);
                                $('#d_nomenclatura').selectpicker('val',res.nomenclatura);
                                $("#d_nomenclatura").attr('disabled',true);
                            }
                        }else {
                            mostrar_validacion(res.error);
                        }
                    }
                });
            }
        }
    });
}