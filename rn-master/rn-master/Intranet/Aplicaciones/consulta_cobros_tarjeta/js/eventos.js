function inicializarEventos() {
    let v_c_producto = $('#c_producto').val();
    let v_c_medio_pago = $('#c_medio_pago').val();

    $("#mascara_lupa_c_disco_enviado").hide();
    $("#mascara_lupa_c_disco_recepcionado").hide();
    $("#mascara_lupa_c_tributo").hide();
    $("#mascara_lupa_c_medio_pago").hide();
    $("#mascara_lupa_c_producto").hide();
    $("#mascara_lupa_c_motivo_rechazo").hide();

    $("#lupa_c_disco_enviado").lupa_generica({
        id_lista:v_lista_disco_enviado,
        titulos:['Disco','Fecha'],
        grid:[{index:'c_codigo',width:449},
            {index:'d_descrip',width:100}],
        caption:'Listado de Disco Enviado',
        sortname:'d_descrip',
        sortorder:'desc',
        filtroNull:true,
        filtros:['#c_disco_envio'],
        campos:{c_codigo:'c_disco_envio'},
        keyNav:true
    });

    $("#lupa_c_disco_recepcionado").lupa_generica({
        id_lista:v_lista_disco_recepcionado,
        titulos:['Disco','Fecha'],
        grid:[{index:'c_codigo',width:449},
            {index:'d_descrip',width:100}],
        caption:'Listado de Disco Recepcionado',
        sortname:'d_descrip',
        sortorder:'desc',
        filtroNull:true,
        filtros:['#c_disco_recepcionado'],
        campos:{c_codigo:'c_disco_recepcionado'},
        keyNav:true
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Listado de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:[],
        searchInput: '#c_tributo',
        searchCode: true,
        campos:{c_codigo:'c_tributo',d_descrip:'d_tributo'},
        keyNav:true
    });


    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Listado de Objetos/Hechos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tributo','#d_objeto_hecho'],
        filtrosTitulos:['Tributo','Nro. Objeto/Hecho'],
        searchCode: true,
        campos:{d_descrip:'d_objeto_hecho'},
        keyNav:true
    });
    $("#lupa_c_medio_pago").lupa_generica({
        id_lista:v_lista_medios_debito,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Medios Débito',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_medio_pago',
        searchCode: true,
        campos:{c_codigo:'c_medio_pago',d_descrip:'d_medio_pago'},
        keyNav:true
    });
    $("#lupa_c_producto").lupa_generica({
        id_lista:v_lista_productos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Productos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtroNull:true,
        filtros:['#c_tributo'],
        filtrosTitulos:['Tributo'],
        campos:{c_codigo:'c_producto',d_descrip:'d_producto'},
        searchInput: '#c_producto',
        searchCode: true,
        keyNav:true,
        limpiarCod: true
    });
    $("#lupa_c_motivo_rechazo").lupa_generica({
        id_lista:v_lista_motivos_rechazo,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Motivo Rechazo',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_motivo_rechazo',d_descrip:'d_motivo_rechazo'},
        searchInput: '#c_motivo_rechazo',
        searchCode: true,
        keyNav:true,
        limpiarCod: true
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_contribuyentes,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Apellidos y Nombre / Razón Social', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100, hidden: true},
            {index:'d_tipo_documento',width:150},
            {index:'n_documento',width:100},
            {index:'f_alta',width:100, hidden: true}
        ],
        caption:'Lista de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{
            //n_cuit: 'n_cuit',
            d_denominacion:'d_denominacion',
        },
        keyNav:true,
        draggable:true,
    });

    if(v_c_producto == '' && v_c_medio_pago == ''){
        $('#c_tributo').val(v_tributo).blur();
        $('#c_producto').val(v_producto).blur();
        $('#c_medio_pago').val(v_forma_pago).blur();

        if (v_tributo){
            $.ajax({
                url:'consulta_cobros_tarjeta/php/traer_mes_cartera.php',
                type:"POST",
                data:{
                    p_c_tributo: v_tributo,
                    p_c_concepto: v_concepto,
                    p_n_posicion_fiscal: v_anio+'00',
                    p_n_cuota: v_cuota
                },
                dataType:'json'
            }).done(function(data) {
                if(data.resultado == 'OK'){
                    if (data.datos.length > 0){
                        $('#f_cartera').val(data.datos[0]['F_CARTERA'].substr(3));
                    }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            });
        }
    }
    //else{
        //vinieron por parametro
    //}

    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_d_denominacion').hide();

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell'); 
        }
    });
    

    $("#f_cartera").mask("99/9999");
    $("#f_envio_tran").datepicker(
        {   dateFormat:'dd/mm/yy',
            changeMonth:true,
            changeYear:true,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        })
        .blur(function(){
            formatearFecha($(this));
        }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}}
    );

    $("#f_recepcion_tran").datepicker(
        {   dateFormat:'dd/mm/yy',
            changeMonth:true,
            changeYear:true,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        })
        .blur(function(){
            formatearFecha($(this));
        }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}}
    );

    $("#fec_cartera").datepicker(
        {   dateFormat:'dd/mm/yy',
            changeMonth:true,
            changeYear:true,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        })
        .blur(function(){
            formatearFecha($(this));
        }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}}
    );

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    $('#btn_buscar').click(function(){

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    if(data.p_permiso == 0 && ($('#c_tributo').val() == "" || $('#d_objeto_hecho').val() == "") &&
                        $('#d_denominacion').val() == "" && $('#n_medio_pago').val() == ""){
                            mostrar_error('Debe ingresar el Tributo y Objeto, Contribuyente o CBU');
                            return;
                    }
                    const mes = parseInt($('#f_cartera').val().split('/')[0], 10);
                    const fechaEnvio = $('#f_envio_tran').val();
                    const fechaRecepcion = $('#f_recepcion_tran').val();

                    /*let noHayDatos = ($('#f_envio_tran').val() == '' &&
                    $('#c_disco_envio').val() == '' &&
                    $('#f_recepcion_tran').val() == '' &&
                    $('#c_disco_recepcionado').val() == '' &&
                    $('#f_cartera').val() == '' &&
                    $('#f_reversa').val() == '' &&
                    $('#c_tributo').val() == '' &&
                    $('#d_tributo').val() == '' &&
                    $('#d_objeto_hecho').val() == '' &&
                    $('#estado').val() == '' &&
                    $('#c_medio_pago, #d_medio_pago').val() == '' &&
                    $('#c_producto, #d_producto').val() == '' && 
                    $('#d_motivo_rechazo, #c_motivo_rechazo').val() == '' &&
                    $('#n_solicitud').val() == '' &&
                    $('#n_medio_pago').val() == '' &&
                    $('#fec_cartera').val() == '' &&
                    $('#i_total').val() == '' &&
                    $('#d_denominacion').val() == '');

                    if(noHayDatos){
                        mostrar_cuadro('I','Atención','Debe completar por lo menos un campo');
                        return;
                    }*/

                    if(mes < 1 || mes > 12){
                        mostrar_error('El mes debe estar comprendido entre 1 y 12', 'E', true);
                        $('#f_cartera').val('');
                        return;
                    }

                    if(fechaEnvio && fechaRecepcion){
                        if(fechaEnvio > fechaRecepcion){
                            mostrar_error('La Fecha Envio no puede ser mayor a la Fecha Recepción', 'E', true);
                            $('#f_envio_tran').val('');
                            return;
                        }
                    }
                    


                    if($('#c_tributo').val() != '' && $('#d_objeto_hecho').val() == '' && !v_producto){
                        mostrar_cuadro('I','Atención','Si va a filtrar por tributo y objeto, debe ingresar ambos campos');
                        return;
                    }
                    else if($('#c_tributo').val() == '' && $('#d_objeto_hecho').val() != '' && !v_producto){
                        mostrar_cuadro('I','Atención','Si va a filtrar por tributo y objeto, debe ingresar ambos campos');
                        return;
                    }
                    else if(($('#c_medio_pago').val() && !$('#d_objeto_hecho').val() && !$('#c_tributo').val()) &&
                            ($('#c_medio_pago').val() && !$('#d_denominacion').val()) &&
                            ($('#c_medio_pago').val() && !$('#n_medio_pago').val())){
                        mostrar_cuadro('I', 'Atención', 'Debe ingresar Tributo y Objeto, Contribuyente o CBU');
                        return;
                    }

                    if($('#f_envio_tran').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Fecha de Envio: ' + $('#f_envio_tran').val());
                    }
                    if($('#c_disco_envio').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Disco Enviado:: ' + $('#c_disco_envio').val());
                    }
                    if($('#f_recepcion_tran').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Fecha Recepción: ' + $('#f_recepcion_tran').val());
                    }
                    if($('#c_disco_recepcionado').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Disco Recepcionado: ' + $('#c_disco_recepcionado').val());
                    }
                    if($('#f_cartera').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Mes Cartera: ' + $('#f_cartera').val());
                    }
                    if($('#f_reversa').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Fecha de Reversa: ' + $('#f_reversa').val());
                    }
                    if($('#d_tributo').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Tributo: ' + $('#d_tributo').val());
                    }
                    if($('#d_objeto_hecho').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Objeto/Hecho: ' + $('#d_objeto_hecho').val());
                    }
                    if($('#estado').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Estado: ' + $('#estado').val());
                    }
                    if($('#d_medio_pago').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Medio Pago: ' + $('#d_medio_pago').val());
                    }
                    if($('#d_producto').val() != ''){
                        filtros_no_nativos_ar['main_grid'].push('Producto: ' + $('#d_producto').val());
                    }
                    setea_parametros('#main_grid',{
                        ':p_f_envio_tran':$('#f_envio_tran').val(),
                        ':p_c_disco_envio':$('#c_disco_envio').val(),
                        ':p_f_recepcion_tran':$('#f_recepcion_tran').val(),
                        ':p_c_disco_recepcion':$('#c_disco_recepcionado').val(),
                        ':p_f_cartera':$('#f_cartera').val(),
                        ':p_f_reversa':$('#f_reversa').val(),
                        ':p_c_tributo':$('#c_tributo').val(),
                        ':p_d_objeto_hecho':$('#d_objeto_hecho').val(),
                        ':p_estado':$('#estado').val(),
                        ':p_c_medio_pago':$('#c_medio_pago').val(),
                        ':p_c_producto':$('#c_producto').val(),
                        ':p_c_motivo_rechazo':$('#c_motivo_rechazo').val(),
                        ':p_n_solicitud':$('#n_solicitud').val(),
                        ':p_n_medio_pago':$('#n_medio_pago').val(),
                        ':p_f_cartera_compl':$('#fec_cartera').val(),
                        ':p_i_total':$('#i_total').val(),
                        ':p_d_denominacion':$('#d_denominacion').val()
                    });

                    $('#f_envio_tran').attr('disabled',true);
                    $('#c_disco_envio').attr('disabled',true);
                    $('#f_recepcion_tran').attr('disabled',true);
                    $('#c_disco_recepcionado').attr('disabled',true);
                    $('#f_cartera').attr('disabled',true);
                    $('#f_reversa').attr('disabled',true);
                    $('#c_tributo').attr('disabled',true);
                    $('#d_objeto_hecho').attr('disabled',true);
                    $('#estado').attr('disabled',true);
                    $('#c_medio_pago').attr('disabled',true);
                    $('#c_producto').attr('disabled',true);
                    $('#c_motivo_rechazo').attr('disabled',true);
                    $('#n_solicitud').attr('disabled',true);
                    $('#d_denominacion').attr('disabled',true);
                    $('#fec_cartera').attr('disabled',true);
                    $('#n_medio_pago').attr('disabled',true);
                    $('#i_total').attr('disabled',true);
                    $('#btn_buscar').attr('disabled',true);
                    $('#mascara_lupa_c_disco_enviado').show().css('display', 'table-cell');
                    $('#lupa_c_disco_enviado').hide();
                    $('#mascara_lupa_c_disco_recepcionado').show().css('display', 'table-cell');
                    $('#lupa_c_disco_recepcionado').hide();
                    $('#mascara_lupa_c_tributo').show().css('display', 'table-cell');
                    $('#lupa_c_tributo').hide();
                    $('#mascara_lupa_c_medio_pago').show().css('display', 'table-cell');
                    $('#lupa_c_medio_pago').hide();
                    $('#mascara_lupa_c_producto').show().css('display', 'table-cell');
                    $('#lupa_c_producto').hide();
                    $('#mascara_lupa_c_motivo_rechazo').show().css('display', 'table-cell');
                    $('#lupa_c_motivo_rechazo').hide();


                    $('#lupa_c_tributo, #lupa_d_objeto_hecho, #lupa_c_disco_enviado, #lupa_c_disco_recepcionado, #lupa_c_medio_pago, #lupa_c_producto, #lupa_c_motivo_rechazo').hide();

                    if(v_id_workflow_log){
                        actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'R', 0, 'N');
                    }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    })

    $('#btn_limpiar').click(function(){
        $('#f_envio_tran').val(null);
        $('#c_disco_envio').val(null);
        $('#f_recepcion_tran').val(null);
        $('#c_disco_recepcionado').val(null);
        $('#n_solicitud').val(null);
        $('#d_denominacion').val(null);
        $('#fec_cartera').val(null);
        $('#n_medio_pago').val(null);
        $('#i_total').val(null);
        
        $('#f_reversa').val(null);
        if(!v_tributo){
            $('#c_tributo').val(null);
            $('#d_tributo').val(null);
            $('#f_cartera').val(null);
        }
        $('#d_objeto_hecho').val(null);
        $('#estado').val(null);
        if(!v_forma_pago){
            $('#c_medio_pago, #d_medio_pago').val(null);
        }
        if(!v_producto){
            $('#c_producto, #d_producto').val(null);
        }
        $('#c_motivo_rechazo, #d_motivo_rechazo').val(null);
        $('#f_envio_tran').attr('disabled',false);
        $('#c_disco_envio').attr('disabled',false);
        $('#f_recepcion_tran').attr('disabled',false);
        $('#c_disco_recepcionado').attr('disabled',false);
        $('#f_cartera').attr('disabled',false);
        $('#f_reversa').attr('disabled',false);
        $('#c_tributo').attr('disabled',false);
        $('#mascara_lupa_obj_hecho').show();
        $('#d_objeto_hecho').attr('disabled',false);
        $('#estado').attr('disabled',false);
        $('#c_medio_pago').attr('disabled',false);
        $('#c_producto').attr('disabled',false);
        $('#c_motivo_rechazo').attr('disabled',false);
        $('#n_solicitud').attr('disabled',false);
        $('#d_denominacion').attr('disabled',false);
        $('#fec_cartera').attr('disabled',false);
        $('#n_medio_pago').attr('disabled',false);
        $('#i_total').attr('disabled',false);
        $('#btn_buscar').attr('disabled',false);
        $('#lupa_c_tributo, #lupa_c_disco_enviado, #lupa_c_disco_recepcionado, #lupa_c_medio_pago, #lupa_c_producto, #lupa_c_motivo_rechazo').show();
        $('#main_grid,#detalles_grid').jqGrid('clearGridData');
        setea_parametros('#main_grid',{},'N');
        setea_parametros('#detalles_grid',{},'N');
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show();

        $('#lupa_c_disco_enviado').show().css('display', 'table-cell');
        $('#mascara_lupa_c_disco_enviado').hide();
        $('#lupa_c_disco_recepcionado').show().css('display', 'table-cell');
        $('#mascara_lupa_c_disco_recepcionado').hide();
        $('#lupa_c_tributo').show().css('display', 'table-cell');
        $('#mascara_lupa_c_tributo').hide();
        $('#lupa_c_medio_pago').show().css('display', 'table-cell');
        $('#mascara_lupa_c_medio_pago').hide();
        $('#lupa_c_producto').show().css('display', 'table-cell');
        $('#mascara_lupa_c_producto').hide();
        $('#lupa_c_motivo_rechazo').show().css('display', 'table-cell');
        $('#mascara_lupa_c_motivo_rechazo').hide();
    });

    $(".mascara_importe").focusout(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });
}