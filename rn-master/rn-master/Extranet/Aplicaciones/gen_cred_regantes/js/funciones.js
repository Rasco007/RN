function inicializarLupas() {
    $("#btn_lupa_consorcio").lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripción','Ente'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450},
            {index:'c_ente',width:100,hidden:true}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_organismo',
        exactField: 'c_organismo',
        campos:{c_organismo:'c_organismo',d_dato:'d_organismo',c_ente:'c_ente'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_region,#d_region,#c_area,#d_area,#id_contribuyente,#n_cuit,#d_denominacion,#n_regante,#n_partida,.nomen").val('');
            $("#btn_lupa_regante").show();
            $(".nomen").attr('disabled',false);
        }
    });

    $("#btn_lupa_region").lupa_generica({
        id_lista:v_lista_regiones_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_region',
        exactField: 'c_region',
        filtros:['#c_organismo'],
        filtrosNulos:[true],
        filtrosTitulos:['Consorcio'],
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area,#n_partida,.nomen").val("");
        }
    });

    $("#btn_lupa_area").lupa_generica({
        id_lista:v_lista_areas_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_area',
        exactField: 'c_area',
        filtros:['#c_organismo','#c_region'],
        filtrosNulos:[true,false],
        filtrosTitulos:['Consorcio','Región'],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#n_partida,.nomen").val("");
        }
    });

    $("#btn_lupa_regante").lupa_generica({
        id_lista:v_lista_regantes,
        titulos:['Regante / Parcela','CUIT','Denominación','Partida','Nomenclatura'],
        grid:[  {index:'n_regante',width:125},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:150},
            {index:'objeto',width:100},
            {index:'nomenclatura',width:125}],
        caption:'Regante / Parcela',
        sortname:'n_regante, objeto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_regante',
        exactField: 'n_regante',
        filtros:["#c_organismo","#id_contribuyente"],
        filtrosTitulos:['Consorcio','CUIT y Denominación'],
        filtrosNulos:[true,true],
        campos:{n_regante:'n_regante',n_cuit:'n_cuit',d_denominacion:'d_denominacion',d_objeto:'n_partida'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            if (!$('#n_regante').val()){
                $('#n_partida, .nomen').val('');
                $('#n_partida, .nomen').attr('disabled',false);
            } else {
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "gen_cred_regantes/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getDatos',
                        p_id_menu: v_id_menu,
                        p_c_organismo: $("#c_organismo").val(),
                        p_id_contribuyente: $("#id_contribuyente").val(),
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
                                $("#id_contribuyente").val(res.id_contribuyente);
                                $("#n_cuit").val(res.n_cuit);
                                $("#d_denominacion").val(res.d_denominacion);
                                $('#n_partida').val(res.objeto);
                                $('#departamento').val(res.departamento);
                                $('#circunscripcion').val(res.circunscripcion);
                                $('#seccion').val(res.seccion);
                                $('#u_caracteristica').val(res.u_caracteristica);
                                $('#parcela').val(res.parcela);
                                $('#u_funcional').val(res.u_funcional);
                                $("#n_partida, .nomen").attr('disabled',true);
                            }
                        }else {
                            mostrar_validacion(res.error);
                        }
                    }
                });
            }
        }
    });

    $("#btn_lupa_partida").lupa_generica({
        id_lista:v_lista_partidas,
        titulos:['Número'],
        grid:[  {index:'n_partida',width:200}],
        caption:'Partidas',
        sortname:'n_partida',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_partida',
        exactField: 'n_partida',
        filtros:["#id_contribuyente","#c_region","#c_area",'#c_organismo'],
        filtrosTitulos:['CUIT y Denominación','Región','Área','Consorcio'],
        filtrosNulos:[true, true, true, true],
        campos:{n_partida:'n_partida'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            regante_nomen_por_partida();
        }
    });
	
	$("#btn_lupa_tipo_concepto").lupa_generica({
        id_lista:v_lista_tipo_concepto,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Conceptos',
        sortname:'c_codigo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_concepto',
        exactField: 'c_codigo',
        filtros:['#c_organismo'],
        filtrosTitulos:['Consorcio'],
        filtrosNulos:[true],
        campos:{c_codigo:'c_tipo_concepto',d_descrip:'d_tipo_concepto'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "gen_cred_regantes/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones,p_c_organismo: $('#c_organismo').val()},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function regante_nomen_por_partida(){
    if (!$('#n_partida').val()){
        $('#n_regante').val('');
        $('.nomen').val('');
        $('.nomen').attr('disabled',false);
        $("#btn_lupa_regante").show();
    } else {
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "gen_cred_regantes/autocomplete.php",
            type:"POST",
            data:{
                p_oper:'getDatos',
                p_id_menu: v_id_menu,
                p_c_organismo: $("#c_organismo").val(),
                p_id_contribuyente: $("#id_contribuyente").val(),
                p_n_partida: $('#n_partida').val()
            },
            success: function(response)
            {
                $('#main').procOverlay({visible:false});
                res = JSON.parse(response);
                if (res.resultado == 'OK'){
                    if (res.error){
                        mostrar_error(res.error);
                    }else{
                        $("#id_contribuyente").val(res.id_contribuyente);
                        $("#n_cuit").val(res.n_cuit);
                        $("#d_denominacion").val(res.d_denominacion);
                        $('#departamento').val(res.departamento);
                        $('#circunscripcion').val(res.circunscripcion);
                        $('#seccion').val(res.seccion);
                        $('#u_caracteristica').val(res.u_caracteristica);
                        $('#parcela').val(res.parcela);
                        $('#u_funcional').val(res.u_funcional);
                        $('.nomen').attr('disabled',true);
                        $("#n_regante").val(res.n_regante);
                        $("#btn_lupa_regante").hide();
                    }
                }else {
                    mostrar_validacion(res.error);
                }
            }
        });
    }
}

function fun_devuelve_nomenclatura(formid){
    if($("#departamento",formid).val()=="" && $("#circunscripcion",formid).val()=="" && $("#seccion",formid).val()=="" && $("#u_caracteristica",formid).val()=="" && $("#parcela",formid).val()=="" && $("#u_funcional",formid).val()==""){
        return null;
    }else{
        return $("#departamento",formid).val() +'-'+ $("#circunscripcion",formid).val() +'-'+ $("#seccion",formid).val() +'-'+ $("#u_caracteristica",formid).val() +'-'+ $("#parcela",formid).val() +'-'+ $("#u_funcional",formid).val();
    }
}

function deshabilita_campos(v_o_f){
    $("#btn_generar_credito").attr('disabled',v_o_f);
    $(".limpiar",'#frm_consulta').attr('readonly',v_o_f);
    $(".limpiar",'#frm_search').attr('readonly',v_o_f);
    $(".limpiar",'#frm_consulta').attr('disabled',v_o_f);
    $(".limpiar",'#frm_search').attr('disabled',v_o_f);
    if (v_o_f){
        $(".btn_lupa").hide();
    }else{
        $(".btn_lupa").show();
    }
}

function valida_seleccion_grilla(id_grid){
    var rowid = $(id_grid).getGridParam('selrow');
    if (rowid) {
        return rowid;
    }else{
        mostrar_validacion('Debe seleccionar un registro de la grilla de '+$(id_grid).getGridParam('caption')+' para operar.');
        return false;
    }
}

function generar_credito(){
    // lleno la tabla TMP_DISTRIBUCION_CREDITO
    v_d_nomenclatura = fun_devuelve_nomenclatura("#frm_search");

	v_id_nota_cred = null;
    v_i_credito = parse($("#i_credito","#frm_consulta").val());
	$('#main').procOverlay({visible:true});
	
	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_oper": 'puebla',
			"p_id_contribuyente": $("#id_contribuyente","#frm_search").val(),
			"p_n_partida": $("#n_partida","#frm_search").val(),
			"p_c_organismo": $("#c_organismo","#frm_search").val(),
			"p_tipo_concepto": $("#c_tipo_concepto","#frm_consulta").val(),
			"id_menu": v_id_menu,
			"n_orden": 1
		},
		dataType: 'json',
		success: function(data) {
			if (data.resultado == 'OK') {
				v_id_sesion = data.p_id_sesion;
				$("#datos_credito").modal('hide');
				setea_parametros('#main_grid',{':id_sesion':data.p_id_sesion});
				$("#div_obligaciones").show();
				$(window).resize();
				v_i_credito_disponible = v_i_credito;
				$("#i_credito_aplicable").val(redondear(v_i_credito,2));
				$("#i_saldo_seleccionado").val(0);
				$("#i_credito_disponible").val(redondear(v_i_credito,2));
				
				$.ajax({
					type: 'POST',
					url: FUNCIONES_BASEPATH + 'maestro_abm.php',
					data: {
						"p_oper": 'generar',
						"p_id_contribuyente": $("#id_contribuyente","#frm_search").val(),
						"p_n_partida": $("#n_partida","#frm_search").val(),
						"p_tipo_concepto": $("#c_tipo_concepto","#frm_consulta").val(),
						"p_i_credito": $("#i_credito","#frm_consulta").val(),
						"id_menu": v_id_menu,
						"n_orden": 1
					},
					dataType: 'json',
					success: function(data) {
						$('#main').procOverlay({visible:false});
						
						if (data.resultado == 'OK') {
							deshabilita_campos(true);
							v_id_nota_cred = data.p_id_nota_cred;
						} else {
							mostrar_error(data.resultado);
							//$("#btn_limpiar").click();
						}
					}
				});
			} else {
				$('#main').procOverlay({visible:false});
				mostrar_error(data.resultado);
				//$("#btn_limpiar").click();
			}
		}
	});
}

function aplicar_pendiente(){
    v_d_nomenclatura = fun_devuelve_nomenclatura("#frm_search");
	
	$("#i_credito","#frm_consulta").val(v_i_credito);
    v_i_credito = parse($("#i_credito","#frm_consulta").val());
	$('#main').procOverlay({visible:true});
	
	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_oper": 'puebla',
			"p_id_contribuyente": $("#id_contribuyente","#frm_search").val(),
			"p_n_partida": $("#n_partida","#frm_search").val(),
			"p_c_organismo": $("#c_organismo","#frm_search").val(),
			"p_tipo_concepto": $("#c_tipo_concepto","#frm_consulta").val(),
			"id_menu": v_id_menu,
			"n_orden": 1
		},
		dataType: 'json',
		success: function(data) {
			$('#main').procOverlay({visible:false});
			
			if (data.resultado == 'OK') {
				deshabilita_campos(true);
				v_id_sesion = data.p_id_sesion;
				$("#datos_credito").modal('hide');
				setea_parametros('#main_grid',{':id_sesion':data.p_id_sesion});
				$("#div_obligaciones").show();
				$(window).resize();
				v_i_credito_disponible = v_i_credito;
				$("#i_credito_aplicable").val(redondear(v_i_credito,2));
				$("#i_saldo_seleccionado").val(0);
				$("#i_credito_disponible").val(redondear(v_i_credito,2));
			} else {
				mostrar_error(data.resultado);
				//$("#btn_limpiar").click();
			}
		}
	});
}

function mostrar_creditos(){
	setea_parametros('#creditos_grid',{
		':id_contrib':$("#id_contribuyente").val(),
		':n_partida':$('#n_partida').val(),
		':tipo_concepto':$('#c_tipo_concepto').val()
	});
	$("#listado_creditos").modal('show');
	$(window).resize();
}

function modificar_saldo_imputable(rowid){
    // actualizo el registro seleccionado con su importe a imputar
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_oper": 'seleccionar',
            "p_id_sesion": v_id_sesion,
            "p_id_obl_concepto": $("#main_grid").getCell(rowid,'id_obligacion').toString()+'|'+$("#main_grid").getCell(rowid,'c_concepto').toString(),
            "p_i_credito": redondear(v_i_credito_disponible,2),
            "id_menu": v_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function(data) {
            if (data.resultado == 'OK') {
                $("#main_grid").trigger('reloadGrid');
                sumar_saldos();
            } else {
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function aplicar_credito(){
    var v_ids_obligacion = obtener_ids_obligacion();
    if (!v_ids_obligacion){
        mostrar_validacion('Debe seleccionar al menos una obligación de destino.');
        return;
    }
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_obligs": v_ids_obligacion,
            "p_id_sesion": v_id_sesion,
            "p_d_observaciones": $("#d_observaciones","#frm_consulta").val(),
            "p_id_nota_cred": v_id_nota_cred,
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function(data) {
            if (data.resultado == 'OK') {
                mostrar_confirmacion('Se aplicó el crédito correctamente.');
                $("#btn_limpiar").click();
            } else {
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function obtener_ids_obligacion(){
    var ids_oblig = '';
    $(".jqgrow", "#main_grid").each(rowid => {
        if($("#main_grid").getCell(rowid+1,'m_seleccionada') == 'SI'){
            if(ids_oblig === ''){
                ids_oblig = $("#main_grid").getCell(rowid+1,'id_obligacion').toString()+'|'+$("#main_grid").getCell(rowid+1,'c_concepto').toString();
            }else{
                ids_oblig = ids_oblig +','+ $("#main_grid").getCell(rowid+1,'id_obligacion').toString()+'|'+$("#main_grid").getCell(rowid+1,'c_concepto').toString();
            }
        }
    });

    return ids_oblig;
}

function sumar_saldos(){
    var saldo_total = 0;
    $(".jqgrow", "#main_grid").each(rowid => {
        if($("#main_grid").getCell(rowid+1,'m_seleccionada') == 'SI'){
            var saldo = parse($("#main_grid").getCell(rowid+1,'i_saldo'));
            if(parseFloat(saldo) >= 0){
                saldo_total = parseFloat(saldo_total) + parseFloat(saldo);
            }
        }
    });
    v_i_credito_disponible = v_i_credito-saldo_total;

    $("#i_saldo_seleccionado").val(redondear(saldo_total,2));
    if(v_i_credito_disponible > 0){
        $("#i_credito_disponible").val(redondear(v_i_credito_disponible,2));
    }else{
        $("#i_credito_disponible").val(redondear(0,2));
    }
}