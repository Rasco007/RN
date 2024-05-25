function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    
    $('#i_credito').change(function(){
        $(this).val(redondear(parse($(this).val())),2);
    });

    $('#btn_limpiar').click(function(){
        deshabilita_campos(false);
        v_d_nomenclatura = null;
		v_id_nota_cred = null;
        $("#frm_consulta").trigger('reset');
        $("#frm_search").trigger('reset');
        $("#frm_consulta").validationEngine('hideAll');
        $("#frm_search").validationEngine('hideAll');
        $('.limpiar',"#frm_consulta").val('');
        $('.limpiar',"#frm_search").val('');
        $('.i_credito').val(0);
        setea_parametros('#main_grid',{':id_sesion':null});
        $("#div_obligaciones").hide();
    });

    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "gen_cred_regantes/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term,p_c_organismo: $('#c_organismo').val()},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
            $("#n_partida, .nomen").attr('disabled',false);
            $("#n_regante, #n_partida, .nomen").val(null);
            $("#btn_lupa_regante").show();
        }
    });

    $(".nomen").change(function () {
        v_d_nomenclatura = fun_devuelve_nomenclatura("#frm_search");
        
        if (
            $('#departamento').val() && $('#circunscripcion').val() && $('#seccion').val() &&
            $('#u_caracteristica').val() && $('#parcela').val() && $('#u_funcional').val()
        ){
            if (!$('#n_partida').val()) {
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "gen_cred_regantes/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getDatos',
                        p_id_menu: v_id_menu,
                        p_c_organismo: $("#c_organismo").val(),
                        p_id_contribuyente: $("#id_contribuyente").val(),
                        p_d_nomenclatura: v_d_nomenclatura
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
                                $('#n_partida').attr('disabled',true);
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
        }else{
            $('#n_regante').val('');
            $("#btn_lupa_regante").show();
            $('#n_partida').val('');
            $('#n_partida').attr('disabled',false);
            $('.nomen').attr('disabled',false);
        }
    });
    
    $("#btn_generar_credito").click(function(){        
        if($("#frm_search").validationEngine('validate') && $("#frm_consulta").validationEngine('validate')){
            if (parse($("#i_credito","#frm_consulta").val()) > 0){
				$('#main').procOverlay({visible:true});
				
                $.ajax({
                    url: "gen_cred_regantes/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getCreditos',
                        p_id_menu: v_id_menu,
                        p_id_contribuyente: $("#id_contribuyente").val(),
						p_n_partida: $('#n_partida').val(),
						p_c_tipo_concepto: $('#c_tipo_concepto').val()
                    },
                    success: function(response) {
                        $('#main').procOverlay({visible:false});
                        res = JSON.parse(response);
                        if (res.resultado == 'OK'){
							switch (res.n_cant) {
								case 0:
									mostrar_cuadro('Q', 'Confirmación',
										'Está por generar un credito por $'+$("#i_credito","#frm_consulta").val()+' al contribuyente '+
										$("#n_cuit","#frm_search").val()+' - '+$("#d_denominacion","#frm_search").val()+', partida número '+
										$("#n_partida","#frm_search").val()+'. ¿Desea continuar?',
										function(){generar_credito()},
										function(){}, 500);
									break;
								case 1:
									v_id_nota_cred = res.id_nota_cred;
									v_i_credito = redondear(res.i_credito.toString(),2);
									mostrar_cuadro('Q', 'Confirmación',
										'El contribuyente '+$("#n_cuit","#frm_search").val()+' - '+$("#d_denominacion","#frm_search").val()+
										' ingresado posee un crédito de $'+redondear(res.i_credito.toString(),2)+' pendiente de aplicación para la partida número '+
										$("#n_partida","#frm_search").val()+'. ¿Desea aplicar el crédito pendiente o generar uno nuevo?. Presione '+
										'aceptar si desea aplicarlo o presione cancelar para generar un nuevo crédito por $'+$("#i_credito","#frm_consulta").val()+'.',
										function(){aplicar_pendiente()},
										function(){generar_credito()}, 500);
									break;
								default:
									mostrar_cuadro('Q', 'Confirmación',
										'El contribuyente '+$("#n_cuit","#frm_search").val()+' - '+$("#d_denominacion","#frm_search").val()+
										' ingresado posee más de un crédito pendiente de aplicación para la partida número '+
										$("#n_partida","#frm_search").val()+'. ¿Desea aplicar un crédito pendiente o generar uno nuevo?. Presione '+
										'aceptar si desea aplicar un crédito pendiente o presione cancelar para generar un nuevo crédito por $'+
										$("#i_credito","#frm_consulta").val()+'.',
										function(){mostrar_creditos()},
										function(){generar_credito()}, 500);
									break;
							}
                        }else {
                            mostrar_validacion(res.error);
                        }
                    }
                });
				
            }else{
                mostrar_validacion('Debe ingresar un importe mayor a 0.');
            }
        }
    });
	
	$('#listado_creditos').on('hidden.bs.modal', function () {
		setea_parametros('#creditos_grid',{
			':id_contrib':null,
			':n_partida':null,
			':tipo_concepto':null
		});
	});

    $("#btn_aplicar_credito").click(function(){
        aplicar_credito();
    });
}