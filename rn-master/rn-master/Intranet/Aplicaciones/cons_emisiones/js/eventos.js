function init_eventos() {
    $("#n_posicion_fiscal").mask("9999");

    $("#btn_limpiar").click(function(){
        $(".limpiar").attr('readonly',false);
        $(".btn_lupa").css("visibility", "visible");
        $("#btn_buscar").attr('disabled',false);
        $("#frm_filtro input").val(null);
        $("#emisiones_grid, #boletas_emitidas_grid, #errores_emisiones_grid").jqGrid('clearGridData');
    });

    $("#btn_buscar").click(function(){
        if($('#frm_filtro').validationEngine('validate')){
            $(".limpiar").attr('readonly',true);
            $("#frm_filtro .btn_lupa").css("visibility", "hidden");
            if(v_id_workflow_log){
                actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'R', 0, 'N');
            }
            $("#boletas_emitidas_grid, #errores_emisiones_grid").jqGrid('clearGridData');
            setea_parametros('#emisiones_grid',{
                ':c_tributo': $("#c_tributo").val(),
                ':c_concepto': $("#c_concepto").val(),
                ':n_anio': $("#n_anio").val(),
                ':n_cuota': $("#n_cuota").val()
            });
        }
    });

    $("#btn_aprobar_emision, #btn_imprimir_emision").hide();

    $("#btn_aprobar_emision").click(function(){
        aprobar_emision();
    });
    
    $("#btn_imprimir_emision").click(function(){
        var id = $("#emisiones_grid").getGridParam('selrow');
        $.ajax({
            url: 'cons_emisiones/php/consultas.php',
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
            $('#c_distribucion').val('');
            $('#d_distribucion').val('');
        }
    });

    $("#n_secuencia_hasta").change(function(){
        if($("#n_secuencia_hasta").val() != ""){
            $('#c_distribucion').val('');
            $('#d_distribucion').val('');
        }
    });

    $("#btn_impresion_masiva").click(function(){
        if(validar_campos()){
            var id = $("#emisiones_grid").getGridParam('selrow');
            llamar_report($("#c_tributo").val() == '60' ? 'RECAL012_INMO' :'RECAL012_AUTO',
                'P_SESION|' + $('#boletas_emitidas_grid').getCell(id, 'id_sesion')+
                '&P_ID_BOLETA|' + $('#boletas_emitidas_grid').getCell(id, 'id_boletas')+
                '&P_ORDEN_DESDE|' +$("#n_secuencia_desde").val()+
                '&P_ORDEN_HASTA|' +$("#n_secuencia_hasta").val()+(
                $("#c_distribucion").val() ? '&P_DISTRIB|' +$("#c_distribucion").val() :''),
                'PDF');
            $("#modal_impresion_masiva").modal('hide');
            $("#frm_impresion_masiva input").val(null);
        }else{
            mostrar_validacion('Ingrese secuencia desde y/o hasta ó selecccione una de las opciones inferiores.');
        }
    });

    $("#btn_imprimir_puntual").click(function(){
        var id = $("#boletas_emitidas_grid").getGridParam('selrow');
        if (id) {
            $.ajax({
                url: 'cons_emisiones/php/consultas.php',
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
                            url: 'cons_emisiones/php/consultas.php',
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

    $("#lupa_c_tributo").lupa_generica({
        id_lista:lista_tributos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_tributo',
        searchCode: true,
        campos:{c_codigo:'c_tributo', d_descrip:'d_tributo'},
        filtros:[''],
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            if($('#c_tributo').val() == '90'){
                $('#n_producto_dd').val(1);
            } else {
                $('#n_producto_dd').val(2); 
            }
        }
    });
    
    $("#lupa_c_concepto").lupa_generica({
        id_lista:lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:350}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchInput: '#c_concepto',
        exactField: 'c_concepto',
        searchCode: true,
        campos:{c_concepto:'c_concepto', d_concepto:'d_concepto'},
        filtrosNulos:[false],
        filtros:['#c_tributo'],
        filtrosTitulos:['Tributo'],
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_c_distribucion").lupa_generica({
        id_lista:lista_distribuciones,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:350}],
        caption:'Tipos de Distribución',
        sortname:'c_dato',
        sortorder:'asc',
        searchInput: '#c_distribucion',
        exactField: 'c_dato',
        searchCode: true,
        campos:{c_dato:'c_distribucion', d_dato:'d_distribucion'},
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            $('#n_secuencia_hasta').val('');
            $('#n_secuencia_desde').val('');
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
    
    if(v_id_workflow_log){
        $('#c_tributo').val(v_c_tributo);
        $('#c_tributo').blur();
        $('#c_concepto').val(v_c_concepto);
        $('#c_concepto').blur();
        $('#n_cuota').val(v_n_cuota);
        $('#n_anio').val(v_n_anio);
        setTimeout(() => {
            $('#btn_buscar').click();
          }, 4000);
    }

}