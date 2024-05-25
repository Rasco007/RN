function init_eventos() {
    $("#n_posicion_fiscal").mask("9999");

    $("#btn_limpiar").click(function(){
        $(".limpiar").attr('readonly',false);
        $(".btn_lupa").show();
        $("#btn_buscar").attr('disabled',false);
        $("#frm_busqueda input").val(null);
        $("#emisiones_grid, #boletas_emitidas_grid, #errores_emisiones_grid").jqGrid('clearGridData');
    });

    $("#btn_buscar").click(function(){
        if($('#frm_busqueda').validationEngine('validate')){
            $(".limpiar").attr('readonly',true);
            $(".btn_lupa").hide();
            $("#btn_buscar").attr('disabled',true);
            $("#boletas_emitidas_grid, #errores_emisiones_grid").jqGrid('clearGridData');
            setea_parametros('#emisiones_grid',{
                ':n_posicion_fiscal': $("#n_posicion_fiscal").val(),
                ':n_cuota': $("#n_cuota").val(),
                ':c_region': $("#c_region").val(),
                ':c_area': $("#c_area").val(),
                ':c_organismo': $("#c_organismo").val()}
            );
        }
    });

    $("#btn_aprobar_emision, #btn_imprimir_emision").hide();
    
    if (p_n_pos_fiscal != "" && p_n_cuota != ""){
        $("#btn_buscar").click();
    }

    $("#btn_aprobar_emision").click(function(){
        aprobar_emision();
    });
    
    $("#btn_imprimir_emision").click(function(){
        var id = $("#emisiones_grid").getGridParam('selrow');
        $.ajax({
            url: 'cons_emisiones_canon/php/consultas.php',
            type:"POST",
            async:false,
            dataType:"json",
            data:{
                "p_oper": 'valida_lote',
                "p_id_sesion": $('#emisiones_grid').getCell(id, 'id_sesion')
            },
            success: function(data){
                if(data.resultado == 'OK'){
                    modal_emision_masiva();
                }else{
                    if(data.d_error == 'FECHA'){
                        mostrar_validacion('La fecha de vencimiento de la emisión debe ser menor a la fecha actual. No es posible realizar la impresión.');
                    }else{
                        mostrar_validacion('Alguna de las boletas del lote ya fue pagada. No es posible realizar la impresión.');
                    }
                }
            }
        });
    });

    $("#n_secuencia_desde").change(function(){
        if($("#n_secuencia_desde").val() != ""){
            $('#m_todas, #m_todas_sin_mail').prop('checked', false);
        }
    });

    $("#n_secuencia_hasta").change(function(){
        if($("#n_secuencia_hasta").val() != ""){
            $('#m_todas, #m_todas_sin_mail').prop('checked', false);
        }
    });

    $("#btn_impresion_masiva").click(function(){
        if(validar_campos()){
            var id = $("#emisiones_grid").getGridParam('selrow');
            llamar_report('BOLETA_CANON',
                'c_usuario|' + c_usuario+
                '&id_sesion|' + $('#emisiones_grid').getCell(id, 'id_sesion')+
                '&n_orden_desde|' +$("#n_secuencia_desde").val()+
                '&n_orden_hasta|' +$("#n_secuencia_hasta").val()+
                '&m_todas|' + ($("#m_todas").is(':checked')?'S':'N')+
                '&m_todas_sin_mail|' + ($("#m_todas_sin_mail").is(':checked')?'S':'N')+
                '&c_organismo|' + $("#combo_consorcios").val()+
                '&c_region|' + $("#combo_regiones").val()+
                '&c_area|' + $("#combo_areas").val(),
                'PDF');
            $("#modal_impresion_masiva").modal('hide');
            $("#frm_impresion_masiva input").val(null);
            $("#combo_consorcios, #combo_regiones, #combo_areas").val(null);
            $(".selectpicker").selectpicker('refresh');
            $('#m_todas, #m_todas_sin_mail').prop('checked', false);
        }else{
            mostrar_validacion('Ingrese secuencia desde y/o hasta ó selecccione una de las opciones inferiores.');
        }
    });

    $("#btn_imprimir_puntual").click(function(){
        var id = $("#boletas_emitidas_grid").getGridParam('selrow');
        if (id) {
            $.ajax({
                url: 'cons_emisiones_canon/php/consultas.php',
                type:"POST",
                async:false,
                dataType:"json",
                data:{
                    "p_oper": 'valida_orden',
                    "p_id_sesion": $('#boletas_emitidas_grid').getCell(id, 'id_sesion'),
                    "p_id_boleta": $('#boletas_emitidas_grid').getCell(id, 'id_boletas')
                },
                success: function(data){
                    if(data.resultado == 'OK'){
                        $.ajax({
                            url: 'cons_emisiones_canon/php/consultas.php',
                            type:"POST",
                            async:false,
                            dataType:"json",
                            data:{
                                "p_oper": 'valida_boleta',
                                "p_id_sesion": $('#boletas_emitidas_grid').getCell(id, 'id_sesion'),
                                "p_id_boleta": $('#boletas_emitidas_grid').getCell(id, 'id_boletas')
                            },
                            success: function(data){
                                switch(data.resultado){
                                    case 'OK': 
                                        imprimir_puntual(id);
                                        break;
                                    case 'NOOK':
                                        mostrar_cuadro('Q', 'Atención',
                                            'La boleta que desea imprimir se encuentra vencida. Además, le informamos que ésta boleta ya fué pagada. ¿Desea imprimirla de todas formas?.',
                                            function(){imprimir_puntual(id);},
                                            function(){}
                                        );
                                        break;
                                    case 'FECHA': 
                                        mostrar_cuadro('Q', 'Atención',
                                            'Esta boleta se encuentra vencida. ¿Desea continuar?.',
                                            function(){imprimir_puntual(id);},
                                            function(){}
                                        );
                                        break;
                                    case 'PAGO': 
                                        mostrar_cuadro('Q', 'Atención',
                                            'Esta boleta ya fué pagada. ¿Desea continuar?.',
                                            function(){imprimir_puntual(id);},
                                            function(){}
                                        );
                                        break;
                                }
                            }
                        });
                    }else{
                        mostrar_validacion('No se puede imprimir la boleta seleccionada.');
                    }
                }
            });
        }else {
            mostrar_validacion('Debe seleccionar un registro de la grilla inferior.');
        }
    });

    $("#btn_lupa_consorcio").lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_organismo',
        exactField: 'c_organismo',
        campos:{c_organismo:'c_organismo',d_dato:'d_organismo'},
        filtros:[null],
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_region,#d_region,#c_area,#d_area").val('');
        }
    });

    $("#btn_lupa_region").lupa_generica({
        id_lista:v_lista_regiones,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_region',
        exactField: 'c_region',
        filtros:['#c_tipo','#c_organismo'],
        filtrosTitulos:['Tipo de Consorcio','Consorcio'],
        filtrosNulos:[true,true],
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area").val("");
        }
    });

    $("#btn_lupa_area").lupa_generica({
        id_lista:v_lista_areas,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_area',
        exactField: 'c_area',
        filtros:['#c_tipo','#c_organismo','#c_region'],
        filtrosTitulos:['Tipo de Consorcio','Consorcio','Región'],
        filtrosNulos:[true,true,false],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $('#combo_consorcios').change(function(){
        if ($('#combo_consorcios').val() != ''){
            $('#combo_areas').empty();
            reloadComboRegiones($('#combo_consorcios').val());
        }else{
            $('#combo_regiones, #combo_areas').empty();
            $('#combo_regiones, #combo_areas').selectpicker('refresh');
        }
    });

    $('#combo_regiones').change(function(){
        if ($('#combo_regiones').val() != ''){
            reloadComboAreas($('#combo_consorcios').val(), $('#combo_regiones').val());
        }else{
            $('#combo_areas').empty();
            $('#combo_areas').selectpicker('refresh');
        }
    });

    $('#sum1').click(function(){
        if ($("#det2").attr("open")){
            $('#sum2').click();
        }
    })

    $('#sum2').click(function(){        
        if ($("#det1").attr("open")){
            $('#sum1').click();
        }
       
    })

}