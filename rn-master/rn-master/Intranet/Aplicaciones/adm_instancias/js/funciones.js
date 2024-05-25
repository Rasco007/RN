function inicializar_lupas_main_grid(formid){
    $('#d_instancia',formid).lupa_generica({
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Instancias',
        sortname:'d_dato',
        sortorder:'asc',
        searchCode: true,
        searchInput: '#c_instancia',
        exactField: 'c_dato',
        campos:{c_dato:'c_instancia',d_dato:'d_instancia'},
        keyNav:true,
        foco:"#d_label"
    });

    /*$('#d_motivo_origen',formid).lupa_generica({
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Motivos de Origen',
        sortname:'d_dato',
        sortorder:'asc',
        campos:{c_dato:'c_motivo_origen',d_dato:'d_motivo_origen'},
        keyNav:true,
        foco:"#d_label"
    });*/
}

function completa_cuit_deno(){
	//Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                type:'POST',
                url: "ajax_genericos/autocomplete.php",
                data: {term: request.term, oper:1},
                dataType: 'json',
                success: function( data ) {
                    ajax_autocomplete = null;
                    if(data) {
                        response(
                            $.map(data.data_raz, function( item ) {
                                return {
                                    label: item.razon_social + ' - ' + item.cuit,
                                    value: item.razon_social,
                                    cuit: item.cuit,
                                    id_contribuyente:item.id_contribuyente
                                }
                            })
                        );
                    }
                }
            });
        },
        minLength:3,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $("#d_denominacion").focusout(function(){
        if(!$(this).val()){
            $("#n_cuit").val('');
        }
    });

    $('#n_cuit').change(function(){
        var cuit = limpia_cuit(this.value);
        $.ajax({
            type: "post",
            url: "ajax_genericos/autocomplete.php",
            data: {term: cuit, oper:3},
            dataType: "json",
            success: function (response) {
                if(response){
                    $('#d_denominacion').val(response.data_raz[0].razon_social);
                    $('#id_contribuyente').val(response.data_raz[0].id_contribuyente);
                }else{
                    $('#d_denominacion').val('');
                    $('#id_contribuyente').val('');
                }
            }
        });
    });
}

function consultar_f109(id){
    if(!id){
        mostrar_validacion('Debe seleccionar un registro de la grilla de Instancias.');
    }else{
        post_to_url("carga_inspec_iibb.php", {
                'p_n_id_menu': 10769,
                'p_n_instancia':$("#second_grid").getCell(id,'n_instancia'),
                'p_n_orden':$("#second_grid").getCell(id,'n_orden_post'),
                'p_modo':'CON'},
            "_blank","POST");
    }
}

function comenzar_allanamiento(){
	var id = $("#second_grid").getGridParam('selrow');
	if(id){
		$("#allanamiento_modal").modal("show");
		$(window).resize();
		$('#allanamiento_n_instancia').val($("#second_grid").getCell(id,'n_instancia'));
		$('#allanamiento_n_orden').val($("#second_grid").getCell(id,'n_orden_post'));
		setea_parametros("#allanamiento_grid", {
			':p_n_instancia':$("#second_grid").getCell(id,'n_instancia'),
			':p_n_orden':$("#second_grid").getCell(id,'n_orden_post')
		});
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
	}
}

function confirmar_allanamiento(){
    v_accion = $("#c_origen").find(':selected').attr('data-action');

    if ($('#frm_allanamiento').validationEngine('validate')){
        mostrar_cuadro('C',v_accion,'Se encuentra a punto de confirmar la inspección en la Cuenta Corriente.<br>¿Desea Continuar?',
            function () {
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{
                        "p_n_instancia":$('#allanamiento_n_instancia').val(),
                        "p_n_orden":$('#allanamiento_n_orden').val(),
                        "p_id_obligacion":null,
                        "p_origen":$('#c_origen').val(),
                        "id_menu":v_id_menu,
                        "n_orden":1
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            mostrar_cuadro('S', 'Confirmación Exitosa!', 'Se ha confirmado en la Cuenta Corriente  la instancia Nro. '+$('#allanamiento_n_instancia').val()+' Orden: '+$('#allanamiento_n_orden').val()+'.',
                                function(){
                                    $('#allanamiento_modal').modal('hide');
                                    $('#second_grid').trigger('reloadGrid');
                                });
                        }
                        else{
                            mostrar_cuadro('E', 'Atención', data.resultado);
                            $("#allanamiento_modal").modal("hide");
                            return;
                        }
                    }
                });
            },function () {
                return;
            });
    }
}

function imprimir_f109(){
    let id = $('#second_grid').getGridParam('selrow');
	if (id){
	    $('#main').procOverlay({visible:true});
        $.ajax({
            url:'adm_instancias/php/funciones.php',
            type:"POST",
            data:{
                "p_oper":'check060',
                "p_id_inspeccion":$("#second_grid").getCell(id,'id_inspeccion'),
                "p_n_orden": $("#second_grid").getCell(id,'n_orden_post')
            },
            async:false,
            dataType: 'json',
            success: function(res) {
                $('#main').procOverlay({visible:false});

                if (parse(res.CANT) == 0){
                    llamar_report('ESTIMACION_MULTA2',
                        'p_id_inspeccion|'+$("#second_grid").getCell(id,'id_inspeccion')+'&p_n_instancia|'+$("#second_grid").getCell(id,'n_instancia')+'&p_n_orden|'+$("#second_grid").getCell(id,'n_orden_post'),
                        'PDF');
                }else{
                    mostrar_validacion('Para emitir la <B>ESTIMACION DE MULTA POR OMISION DE PAGO</B>, debe seleccionar la última instancia de carga.');
                }

                llamar_report('DET_ACTIVIDAD',
                    'p_n_instancia|'+$("#second_grid").getCell(id,'n_instancia')+'&p_n_orden|'+$("#second_grid").getCell(id,'n_orden_post'),
                    'PDF');
                llamar_report('PLANILLA_F109',
                    'p_n_instancia|'+$("#second_grid").getCell(id,'n_instancia')+'&p_n_orden|'+$("#second_grid").getCell(id,'n_orden_post'),
                    'PDF');
            }
        });
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla de Instancias.');
        return;
    }
}

function _agregar_quitar_instancia(element) {
    var params = {
        id_menu: v_id_menu,
        n_orden: 2,
        p_marca: 'N'
    };

    if (element){
        if ($(element).is(':checked') == true){
            params.p_marca = 'S';
        }
        params.p_n_instancia = $(element).attr('n_instancia');
        params.p_n_orden = $(element).attr('n_orden');
        params.p_id_obligacion = $(element).attr('id_obligacion');
        params.p_oper = 'I'
    }else {
        if ($('#check_select_all').is(':checked') == true){
            params.p_marca = 'S';
        }
        params.p_n_instancia = $('#allanamiento_n_instancia').val();
        params.p_n_orden = $('#allanamiento_n_orden').val();
        params.p_oper = 'T'
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#allanamiento_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                $("#allanamiento_modal").modal("hide");
                return;
            }
        }
    });
}

function verAdjuntos (p_id_sol_req){
    build_grid_adjuntos(p_id_sol_req, [],1);
    $('#adjuntos_modal').modal('show');
}