function init_eventos(){

    $('#lupa_d_denominacion').hide();
    const d = new Date();
    let hour = d.getHours();

    let objeto;
    let d_denominacion;
    let n_cuit;
    let c_documento;
    let d_documento;
    let documento;
    let id_contribuyente;

    $('#objeto').on('keydown focusout', function (event) {
        objeto = $("#objeto").val();
    });

    $('#d_denominacion').on('keydown focusout', function (event) {
        d_denominacion = $("#d_denominacion").val();
        n_cuit = $("#n_cuit").val();
    });

    $('#n_cuit').on('keydown focusout', function (event) {
        n_cuit = $("#n_cuit").val();
        d_denominacion = $("#d_denominacion").val();
    });

    $('#c_documento').on('keydown focusout', function (event) {
        c_documento = $("#c_documento").val();
    });

    $('#d_documento').on('keydown focusout', function (event) {
        d_documento = $("#d_documento").val(); 
    });

    $('#documento').on('keydown focusout', function (event) {
        documento = $("#documento").val();
    });

    $('#id_contribuyente').on('keydown focusout', function (event) {
        id_contribuyente = $("#id_contribuyente").val();
    });
    

    $("#year").val(parseInt(año) + 1);

    $("#btn_limpiar").click(function(){
        $("#n_cuit").attr('disabled',false);
        $("#objeto").attr('disabled',false);
        $("#c_tipo_imponible").attr('readonly',false);
        $("#d_denominacion").attr('readonly',false);
        $("#c_tributo").attr('readonly',false);
        $("#c_documento").attr('readonly',false);
        $("#documento").attr('disabled',false);
        $("#year").attr('disabled',false);
        $("#cuota").attr('disabled',false);

        $('#lupa_d_denominacion').hide();
		$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

        //DATOS PERSONALES
        $("#n_cuit").val(null);
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tipo_imponible").val(null);
        $("#c_tributo").val(null);
        $("#c_documento").val(null);
        $("#d_documento").val(null);
        $("#documento").val(null);
        $("#d_tipo_imponible").val(null);
        $("#d_tributo").val(null);
        $("#objeto").val(null);
        $("#year").val(año);
        $("#cuota").val(null);
        $('#lupa_obj_hecho').hide();
        $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        $(".filtro").attr('disabled',false);
        $(".filtro").attr('readonly',false);
    })

    $("#btn_generar").click(function(){
        // if($("#year").val() > año){
        //     mostrar_cuadro('E', 'Error', 'El vencimiento del año seleccionado es mayor a la fecha actual');
        //     return;
        // }

        let tipo;
        if($("#c_tributo").val() == 90){
            tipo = 'A'
        }
        else{
            tipo = 'C'
        }

        let cuota;
        if($("#cuota").val() < 10 || $("#cuota").val().length == 1){
            cuota = "0" + $("#cuota").val();
        }
        else{
            cuota = $("#cuota").val();
        }

        if($("#n_cuit").val() && $("#c_tributo").val() && $("#d_denominacion").val() && $("#objeto").val() 
        && $("#year").val() && $("#cuota").val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_cuit":limpia_cuit($("#n_cuit").val()),
                 "p_id_contribuyente":$("#id_contribuyente").val(),
                 "p_c_tributo":$("#c_tributo").val(),
                 "p_c_concepto":$("#c_concepto").val(),
                 "p_periodo":$("#year").val() + cuota,
                 //"p_periodo_hasta":año,
                 "p_tipo":tipo,
                 "p_nombres":$("#d_denominacion").val(),
                 "p_objhecho":$("#objeto").val(),
                 "p_anio":$("#year").val(),
                 "p_f_ejecucion":fecha_hoy,
                 "p_n_cuota":cuota,
                 "id_menu":100007,
                 "n_orden":4
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        
                        mostrar_cuadro('I', 'Boleta generada', 'Se ha generado la boleta de pago satisfactoriamente');
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
        else{
            mostrar_cuadro('I', 'Atención', 'Debe ingresar todos los campos obligatorios');
            return;
        }
    })

    $("#btn_imprimir").click(function(){
        if($("#n_cuit").val() && $("#id_contribuyente").val() && $("#c_tributo").val() && $("#objeto").val() && $("#year").val() && $("#cuota").val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_cuit":limpia_cuit($("#n_cuit").val()),
                 "p_id_contribuyente":$("#id_contribuyente").val(),
                 "p_c_tributo":$("#c_tributo").val(),
                 "p_objhecho":$("#objeto").val(),
                 "p_anio":$("#year").val(),
                 "p_c_tipo_imponible":$("#c_tipo_imponible").val(),
                 "p_c_concepto":$("#c_concepto").val(),
                 "p_n_cuota":$("#cuota").val(),
                 "p_generar_pdf":'N',
                 "p_periodo":año,
                 "id_menu":100007,
                 "n_orden":5
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                      if($("#c_tributo").val() == 90){
                        llamar_report('RECAL012_AUTO',
                            'P_SESION|' + data.p_sesion + '&P_ORDEN_DESDE|' + 0 + '&P_ORDEN_HASTA|' + 0,
                            'PDF');
                            return;
                      }
                      else{
                        llamar_report('RECAL012_INMO',
                            'P_SESION|' + data.p_sesion + '&P_ORDEN_DESDE|' + 0 + '&P_ORDEN_HASTA|' + 0,
                            'PDF');
                            return;
                      }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
        else{
            mostrar_cuadro('I', 'Atención', 'Debe ingresar todos los campos');
            return;
        }
    })

    $("#btn_pagar").click(function(){
        if($("#n_cuit").val() && $("#id_contribuyente").val() && $("#c_tributo").val() && $("#objeto").val() && $("#year").val() && $("#cuota").val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_cuit":limpia_cuit($("#n_cuit").val()),
                 "p_objhecho":$("#objeto").val(),
                 "p_id_contribuyente":$("#id_contribuyente").val(),
                 "p_c_tributo":$("#c_tributo").val(),
                 "p_anio":$("#year").val(),
                 "p_c_tipo_imponible":$("#c_tipo_imponible").val(),
                 "p_c_concepto":$("#c_concepto").val(),
                 "p_n_cuota":$("#cuota").val(),
                 "p_periodo":año,
                 "p_generar_pdf":'N',
                 "id_menu":100007,
                 "n_orden":6
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        if($("#c_tributo").val() == 90){
                            llamar_report('RECAL012_AUTO',
                                'P_SESION|' + data.p_sesion + '&P_ORDEN_DESDE|' + 0 + '&P_ORDEN_HASTA|' + 0,
                                'PDF');
                                window.open(data.p_url);
                                return;
                          }
                          else{
                            llamar_report('RECAL012_INMO',
                                'P_SESION|' + data.p_sesion + '&P_ORDEN_DESDE|' + 0 + '&P_ORDEN_HASTA|' + 0,
                                'PDF');
                                window.open(data.p_url);
                                return;
                          }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
        else{
            mostrar_cuadro('I', 'Atención', 'Debe ingresar todos los campos');
            return;
        }
    })

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['O','#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo','Cód. Tipo Imp.','Tipo Imponible'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250},
            {index:'c_tipo_imponible',width:100},
            {index:'d_dato',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo',c_tipo_imponible:'c_tipo_imponible',d_dato:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        onClose: function(){
            
        }
    });

    $('#lupa_obj_hecho').hide();

    $('#objeto').on('keydown focusout', function (event) {
        if ((event.type === 'keydown' && $(this).val().length >= 2)) {
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        } else if ((event.type === 'focusout' && $(this).val().length <= 2)) {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Objeto/Hecho','Denominación','CUIT','Código Tipo Documento','Tipo Documento','Número de Documento','ID Contribuyente'],
        grid:[{index:'c_codigo',width:200},{index:'denominacion', width:200},{index:'cuit', width:200},{index:'c_tipo_documento',hidden:false},{index:'d_tipo_documento',hidden:false},{index:'n_documento',hidden:false},{index:'id_contribuyente',hidden:false}],
        caption:'Lista de Objeto/Hecho',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#objeto','#c_tributo','#id_contribuyente'],
        filtrosTitulos:['Objeto Hecho','Código de Tributo','Contribuyente'],
		filtrosNulos:[true, false, true],
        campos:{c_codigo:'objeto',denominacion:'d_denominacion' ,cuit:'n_cuit',c_tipo_documento:'c_documento',d_tipo_documento:'d_documento',n_documento:'documento',id_contribuyente:'id_contribuyente'},
        // searchCode: true,
        // searchInput: '#objeto',
		// keyNav:true,
		// exactField: 'c_codigo',
        onClose:function(){
            if($("#objeto").val() == ""){
                $("#objeto").val(objeto);
            }
            if($("#d_denominacion").val() == ""){
                $("#d_denominacion").val(d_denominacion);
            }
            if($("#n_cuit").val() == ""){
                $("#n_cuit").val(n_cuit);
            }
            if($("#c_documento").val() == ""){
                $("#c_documento").val(c_documento);
            }
            if($("#d_documento").val() == ""){
                $("#d_documento").val(d_documento);
            }
            if($("#documento").val() == ""){
                $("#documento").val(documento);
            }
            if($("#id_contribuyente").val() == ""){
                $("#id_contribuyente").val(id_contribuyente);
            }
        }
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_documento',d_dato:'d_documento'},
		searchCode:true,
		searchInput: '#c_documento',
		keyNav:true,
		exactField: 'c_dato'
    });

    

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "ajax_genericos/autocomplete.php",
                        data: {oper:'3',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion").val(data.data_raz[0].razon_social);
                                $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                                $('#objeto').keydown();
                            }
                        }
                    });
        
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
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

    $("#lupa_d_denominacion").lupa_generica({
		id_lista:vg_lista_denominaciones,
		titulos:['ID contribuyente', 'CUIT', 'Denominación','Código de Documento', 'Tipo de Documento', 'Numero de Documento', 'F. Alta'],
		grid:[{index:'id_contribuyente',width:100, hidden:true}, {index:'n_cuit',width:100}, {index:'d_denominacion',width:200},{index:'c_tipo_documento',width:140, hidden:true}, {index:'d_tipo_documento',width:140}, {index:'n_documento',width:160}, {index:'f_alta',width:80}],
		caption:'Lista de Denominaciones',
		sortname:'d_denominacion',
		sortorder:'asc',
		filtros:['#d_denominacion'],
		filtrosTitulos:['Denominación'],
		filtrosNulos:[false],
		campos:{id_contribuyente:'id_contribuyente', n_cuit: 'n_cuit', d_denominacion:'d_denominacion', d_tipo_documento:'d_tipo_documento', n_documento: 'n_documento', f_alta:'f_alta'},
		keyNav:true,
		draggable:true,
        onClose:function(){
            $('#objeto').keydown();
        }
	});
}