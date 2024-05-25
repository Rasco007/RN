function inicializar_lupas(){
	$("#lupa_dominio").lupa_generica({
		id_lista: v_lista_patentes,
		titulos:['Dominio','Dígito','Dominio Anterior','Dígito Anterior'],
		grid:[{index:'d_patente',width:150},{index:'digito',width:100},
			{index:'d_patente_vieja',width:150},{index:'digito_viejo',width:100},],
		caption:'Dominios',
		sortname:'d_patente',
		sortorder:'asc',
		campos:{d_patente:'d_patente',digito:'d_verif_dom',
			d_patente_vieja:'d_patente_vieja',digito_viejo:'d_verif_dom_ant'},
		filtros:[p_modo, "#d_patente", "#d_patente_vieja"],
		filtrosNulos:[false,false,true],
		filtrosTitulos:['Modo','Dominio','Dominio Anterior'],
		mensajeRelacionado: ['','Debe ingresar al menos 1 caracter del Dominio','Debe ingresar al menos 1 caracter del Dominio Anterior'],
		keyNav:true,
        onClose:function(){
        	if($("#d_patente").val()!=""){
        		v_existe = true;
        		$("#d_verif_dom, #d_patente_vieja, #d_verif_dom_ant").attr('disabled',true);
        		$("#lupa_dom_ant").hide();
        	}else{
        		v_existe = false;
        		$("#d_verif_dom, #d_patente_vieja, #d_verif_dom_ant").attr('disabled',false);
        		$("#lupa_dom_ant").show();
        	}
        }
	});

	$("#lupa_dom_ant").lupa_generica({
		id_lista: v_lista_patentes,
		titulos:['Dominio','Dígito','Dominio Anterior','Dígito Anterior'],
		grid:[{index:'d_patente',width:150},{index:'digito',width:100},
			{index:'d_patente_vieja',width:150},{index:'digito_viejo',width:100},],
		caption:'Dominios',
		sortname:'d_patente_vieja',
		sortorder:'asc',
		campos:{d_patente:'d_patente',digito:'d_verif_dom',
			d_patente_vieja:'d_patente_vieja',digito_viejo:'d_verif_dom_ant'},
		filtros:[p_modo, "#d_patente", "#d_patente_vieja"],
		filtrosNulos:[false,true,false],
		filtrosTitulos:['Modo','Dominio','Dominio Anterior'],
		mensajeRelacionado: ['','Debe ingresar al menos 1 caracter del Dominio','Debe ingresar al menos 1 caracter del Dominio Anterior'],
		keyNav:true,
        onClose:function(){
        	if($("#d_patente_vieja").val()!=""){
        		$("#d_patente, #d_verif_dom, #d_verif_dom_ant").attr('disabled',true);
        		$("#lupa_dominio").hide();

        		if ($("#d_patente_vieja").val() != $("#d_patente").val() && $("#m_convocatoria").prop('checked')){
	           		$("#d_patente").val($("#d_patente_vieja").val());
		        }
        	}else{
        		$("#d_patente, #d_verif_dom, #d_verif_dom_ant").attr('disabled',false);
        		$("#lupa_dominio").show();
        	}
        }
	});

	$("#lupa_motivo_alta").lupa_generica({
		id_lista: v_lista_motivos_alta,
		titulos:['Código','Descripción'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:200}],
		caption:'Motivos Alta',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_motivo_alta',d_dato:'d_motivo_alta'},
		filtros: [90],
		filtrosTitulos: ['Tributo'],
		searchCode: true,
        searchInput: '#c_motivo_alta',
        exactField: 'c_dato',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_marca").lupa_generica({
		id_lista: v_lista_marcas,
		titulos:['Código','Descripción'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:200}],
		caption:'Marcas',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_marca',d_dato:'d_marca'},
		searchCode: true,
        searchInput: '#c_marca',
        exactField: 'c_dato',
        keyNav:true,
        limpiarCod: true,
        onClose:function(){
        	// :au.afecta_base := 'S';
        }
	});

	$("#lupa_modelo").lupa_generica({
		id_lista: v_lista_modelos,
		titulos:['Código','Descripción'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:200}],
		caption:'Marcas',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_modelo',d_dato:'d_modelo'},
		filtros: ["#c_marca"],
		filtrosTitulos: ["Marca"],
		filtrosNulos: [false],
		searchCode: true,
        searchInput: '#c_modelo',
        exactField: 'c_dato',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_descripcion").lupa_generica({
		id_lista: v_lista_descripciones,
		titulos:['Código','Descripción','Tipo'],
		grid:[{index:'id_descripcion',width:100},
			{index:'d_descrip',width:200},
			{index:'c_tipo',width:100}],
		caption:'Descripciones',
		sortname:'id_descripcion',
		sortorder:'asc',
		campos:{id_descripcion:'c_descripcion',d_descrip:'d_descripcion'},
		filtros: ["#c_marca","#c_modelo"],
		filtrosTitulos: ["Marca",'Modelo'],
		filtrosNulos: [false,false],
		searchCode: true,
        searchInput: '#c_descripcion',
        exactField: 'id_descripcion',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_tipo").lupa_generica({
		id_lista: v_lista_tipos,
		titulos:['Código','Tipos','','Cód. Grupo','Grupo','','',''],
		grid:[{index:'c_dato_t',width:100},{index:'d_dato_t',width:200},
			{index:'n_tabla_t',width:100,hidden:true},{index:'c_dato_g',width:100},
			{index:'d_dato_g',width:100},{index:'d_dato2_g',width:200,hidden:true},
			{index:'d_dato1_g',width:200,hidden:true},{index:'n_tabla_g',width:100,hidden:true}],
		caption:'Tipos',
		campos:{c_dato_t:'c_tipo',d_dato_t:'d_tipo',c_dato_g:'c_grupo',
			d_dato_g:'d_grupo',d_dato2_g:'n_peso_max',d_dato1_g:'d_aff'},
		searchCode: true,
        searchInput: '#c_tipo',
        exactField: 'c_dato_t',
        keyNav: true,
        limpiarCod: true,
        onClose:function(){
        	if($("#c_tipo").val() == ""){
        		$("#c_grupo, #d_grupo, #n_peso_max, #d_aff").val(null);
        	}else{
        		$.ajax({
		            type:'POST',
		            url: FUNCIONES_BASEPATH+'maestro_abm.php',
		            data:{
		            	"p_c_marca_aut": $("#c_marca").val(),
		            	"p_id_modelo": $("#c_modelo").val(),
		            	"p_id_descripcion": $("#c_descripcion").val(),
		            	"p_c_tipo": $("#c_tipo").val(),
		            	"id_menu":10989,
		            	"n_orden":2
		            },
		            dataType:'json',
		            success: function( data ) {
		                if(data.resultado != 'OK'){
		                	$("#d_tipo, #c_grupo, #d_grupo, #n_peso_max, #d_aff").val(null);
		                    mostrar_error(data.resultado);
		                    return;
		                }
		            }
		        }); 
        	}
        }
	});

	$("#lupa_grupo").lupa_generica({
		id_lista: v_lista_grupos,
		titulos:['Código','Descripción','','Peso MÁX','D_dato1'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:200},
			{index:'n_tabla',width:100,hidden:true},
			{index:'peso_max',width:100,hidden:true},
			{index:'d_dato1',width:100,hidden:true}],
		caption:'Grupos',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_grupo',d_dato:'d_grupo',peso_max:'n_peso_max',d_dato1:'d_aff'},
		filtros: ["#c_tipo"],
		filtrosTitulos: ["Tipo"],
		filtrosNulos: [false],
		searchCode: true,
        searchInput: '#c_grupo',
        exactField: 'c_dato',
        keyNav: true,
        limpiarCod: true,
        onClose:function(){
        	if($("#c_grupo").val()!=""){
	        	$('#main').procOverlay({visible:true});
				$.ajax({
					url: "cons_dominio/ajax_consultas.php",
					type:"POST",
					dataType: "JSON",
					data:{
						p_oper:'marca_modelo',
						p_c_grupo: $("#c_grupo").val()
					},
					success: function (res) {
						$('#main').procOverlay({visible:false});
						if(res){
							$("#d_texto_marca").val(res.d_texto_marca);
							$("#d_texto_modelo").val(res.d_texto_modelo);
						}
					}
				});
			}else{
				$("#d_texto_marca, #d_texto_modelo").val(null);
			}
        }
	});

	$("#lupa_aux_marca").lupa_generica({
		id_lista: v_lista_modelos_mtm,
		titulos:['Marca','',''],
		grid:[{index:'aux_marca',width:200},{index:'aux_mtm',width:100,hidden:true},
			{index:'aux_descripcion',width:400,hidden:true}],
		caption:'Marca del Automotor',
		sortname:'aux_marca',
		sortorder:'asc',
		campos:{aux_marca:'aux_marca',aux_mtm:'aux_mtm',aux_descripcion:'aux_descripcion'},
		filtros: ["#aux_marca",null],
		filtrosTitulos: ["Marca",''],
		filtrosNulos: [true,true],
        exactField: 'aux_marca',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_aux_mtm").lupa_generica({
		id_lista: v_lista_modelos_mtm,
		titulos:['','MTM','Descripción'],
		grid:[{index:'aux_marca',width:200,hidden:true},{index:'aux_mtm',width:100},
			{index:'aux_descripcion',width:400}],
		caption:'Modelo del Automotor',
		sortname:'aux_descripcion',
		sortorder:'asc',
		campos:{aux_mtm:'aux_mtm',aux_descripcion:'aux_descripcion'},
		filtros: [null,"#aux_marca"],
		filtrosTitulos: ['',"Marca"],
		filtrosNulos: [true,false],
        exactField: 'aux_mtm',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_combustible").lupa_generica({
		id_lista: v_lista_combustibles,
		titulos:['Código','Descripción'],
		grid:[{index:'c_dato',width:100},{index:'d_dato',width:200}],
		caption:'Combustibles',
		sortname:'d_dato',
		sortorder:'asc',
		campos:{c_dato:'c_combustible',d_dato:'d_combustible'},
		searchCode: true,
        searchInput: '#c_combustible',
        exactField: 'c_dato',
        keyNav: true,
        limpiarCod: true,
        onClose:function(){
        	if($("#c_combustible").val()!=""){
	        	$.ajax({
		            type:'POST',
		            url: FUNCIONES_BASEPATH+'maestro_abm.php',
		            data:{
		        		"p_c_combustible": $("#c_combustible").val(),
		            	"p_c_marca_aut": $("#c_marca").val(),
		            	"p_id_modelo": $("#c_modelo").val(),
		            	"p_id_descripcion": $("#c_descripcion").val(),
		            	"id_menu":10989,
		            	"n_orden":3
		            },
		            dataType:'json',
		            success: function( data ) {
		                if(data.resultado != 'OK'){
		                    mostrar_error(data.resultado);
		                    return;
		                }
		            }
		        });
	        }
        }
	});

	$("#lupa_rnpa").lupa_generica({
		id_lista: v_lista_rnpa,
		titulos:['Código','Descripción'],
		grid:[{index:'c_dato',width:100},{index:'d_dato',width:200}],
		caption:'RNPA',
		sortname:'d_dato',
		sortorder:'asc',
		campos:{c_dato:'c_rnpa',d_dato:'d_rnpa'},
		searchCode: true,
        searchInput: '#c_rnpa',
        exactField: 'c_dato',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_delegacion").lupa_generica({
		id_lista: v_lista_delegaciones,
		titulos:['Código','Descripción'],
		grid:[{index:'c_dato',width:100},{index:'d_dato',width:300}],
		caption:'Delegaciones',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_delegacion',d_dato:'d_delegacion'},
		filtros: ["#id_contribuyente"],
		filtrosTitulos: ["Contribuyente"],
		filtrosNulos: [true],
		searchCode: true,
        searchInput: '#c_delegacion',
        exactField: 'c_dato',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_contribuyentes").lupa_generica({
		id_lista: v_lista_contibuyentes,
		titulos:['Denominación','id_contribuyente','CUIT','c_tipo_documento','Tipo Documento','Documento'],
		grid:[{index:'d_denominacion',width:200},{index:'id_contribuyente',width:100,hidden:true},
			{index:'n_cuit',width:100},{index:'c_tipo_documento',width:100,hidden:true},
			{index:'d_tipo_documento',width:100},{index:'n_documento',width:100}],
		caption:'Lista de Contribuyentes',
		sortname:'d_denominacion',
		sortorder:'asc',
		campos:{d_denominacion:'d_denominacion',id_contribuyente:'id_contribuyente',n_cuit:'n_cuit',
			c_tipo_documento:'c_tipo_documento',d_tipo_documento:'d_tipo_documento',n_documento:'n_documento'},
		filtros: ["#d_denominacion"],
		filtrosTitulos: ["Denominación"],
		filtrosNulos: [false],
		mensajeRelacionado:["Debe ingresar al menos 1 caracter de la Denominación."],
        exactField: 'd_denominacion',
        keyNav: true,
        onClose:function(){
        	$("#c_tipo_domicilio, #d_tipo_domicilio, #d_domicilio").val(null);
        }
	});

	$("#lupa_tipo_documento").lupa_generica({
		id_lista: v_lista_tipos_doc,
		titulos:['Código','Descripción'],
		grid:[{index:'c_dato',width:100},{index:'d_dato',width:300}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_tipo_documento',d_dato:'d_tipo_documento'},
		searchCode: true,
        searchInput: '#c_tipo_documento',
        exactField: 'c_dato',
        keyNav: true,
        limpiarCod: true
	});

	$("#lupa_tipo_domicilio").lupa_generica({
		id_lista: v_lista_domicilios,
		titulos:['Código','Descripción','Domicilio'],
		grid:[{index:'c_codigo',width:100},{index:'d_descrip',width:150},{index:'domi',width:300}],
		caption:'Tipo de Domicilio',
		sortname:'c_codigo',
		sortorder:'asc',
		campos:{c_codigo:'c_tipo_domicilio',d_descrip:'d_tipo_domicilio',domi:'d_domicilio'},
		filtros: ["#id_contribuyente"],
		filtrosTitulos: ["Contribuyente"],
		filtrosNulos: [false],
		searchCode: true,
        searchInput: '#c_tipo_domicilio',
        exactField: 'c_codigo',
        keyNav: true,
        limpiarCod: true
	});
}