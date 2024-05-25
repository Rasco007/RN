<?php
    require_once(INTRANET."header.php");
    $m_autoquery = $_POST['p_m_autoquery'];
    require_once("detalle_cuenta_corriente/get_datos_obligaciones.php");

    $c_usuario = $_SESSION['usuario'];

    $n_cuit_mask = $_POST['n_cuit'];



	$n_cuit = str_replace('-','',$n_cuit_mask);

	$id_obligacion = $_POST['id_obligacion'];
	$n_pos_fiscal = $_POST['n_pos_fiscal'];
	$n_cuota = $_POST['n_cuota'];

    if($n_cuit==null){
        $array_contribuyente_obligacion = get_contribuyente_desde_obligacion($id_obligacion);
        $n_cuit= $array_contribuyente_obligacion['N_CUIT'];
        $n_cuit_mask= $array_contribuyente_obligacion['N_CUIT_MASK'];
    }

	$array_datos_contribuyente = get_datos_contribuyente($n_cuit);

	$id_contribuyente = $array_datos_contribuyente['ID_CONTRIBUYENTE'];
    $denominacion = $array_datos_contribuyente['D_DENOMINACION'];
	$c_tipo_documento = $array_datos_contribuyente['C_TIPO_DOCUMENTO'];
	
	if($c_tipo_documento){
		$d_tipo_documento = $array_datos_contribuyente['D_TIPO_DOCUMENTO'];
	}
	
	$n_documento = $array_datos_contribuyente['N_DOCUMENTO'];

	$array_detalle_obligacion = get_datos_obligacion($id_obligacion);

	$c_tipo_imponible = $array_detalle_obligacion['C_TIPO_IMPONIBLE'];
	$c_tributo = $array_detalle_obligacion['C_TRIBUTO'];
	$d_objeto_hecho = $array_detalle_obligacion['D_OBJETO_HECHO'];
    $n_plan_pago = $array_detalle_obligacion['N_PLAN_PAGO'];
	$c_concepto = $array_detalle_obligacion['C_CONCEPTO'];
	$f_vto_pago = $array_detalle_obligacion['F_VTO_PAGO'];
	$f_vto_pago_2 = $array_detalle_obligacion['F_VTO_PAGO_2'];
	$d_observaciones = $array_detalle_obligacion['D_OBSERVACIONES'];
    $n_pos_fiscal = $array_detalle_obligacion['N_POSICION_FISCAL'];
    $n_cuota = $array_detalle_obligacion['N_CUOTA_ANTICIPO'];

	$array_descrip_trib_subtrib = get_desc_trib_subtrib($c_tipo_imponible, $c_tributo);
	$d_tipo_imponible = $array_descrip_trib_subtrib['D_TIPO_IMPONIBLE'];
	$d_tributo = $array_descrip_trib_subtrib['D_TRIBUTO'];

    $array_descrip_concepto = get_concepto_descrip($c_concepto, $c_tributo);
	$d_concepto = $array_descrip_concepto['D_CONCEPTO'];

	// Tomamos el saldo de la cuenta corriente.
	$n_debe_haber_array = get_sum_debe_haber($id_obligacion);
	//$n_saldo_real = $n_debe_haber_array ['SALDO'];
	$n_saldo = abs($n_debe_haber_array ['SALDO_WEB_CC']);
	//$n_saldo_n = $n_debe_haber_array ['SALDO_N'];

	if($n_debe_haber_array ['SALDO_WEB_CC'] <= 0){
		$saldo_detalle = 'A favor de ART';
	}else{
		$saldo_detalle = 'A favor del Contribuyente';
	}

    $n_saldo_int = abs($n_debe_haber_array ['SALDO_WEB_CC_2']);

	if($n_debe_haber_array ['SALDO_WEB_CC_2'] <= 0){
		$saldo_detalle_int = 'A favor de ART';
	}else{
		$saldo_detalle_int = 'A favor del Contribuyente';
	}

    include('detalle_cuenta_corriente/modal_reimputaciones.html');
    include('detalle_cuenta_corriente/modal_ajustes.html');
    include('detalle_cuenta_corriente/modal_compensaciones.html');
    include('detalle_cuenta_corriente/modal_pagos.html');
    include('detalle_cuenta_corriente/modal_gestion.html');
    include('detalle_cuenta_corriente/modal_pfp.html');





?>

<style>
    #navx {
        padding: 5px;
    }
    .ui-jqgrid .ui-jqgrid-view{
        font-size: 10px;
    }

    .form-control-static {
        padding-top: 3px;
        padding-bottom: 3px;
        margin-bottom: 2px;
        font-size: 11px;
        min-height: 25px;
    }

    #main {
        padding-top: 1% !important;
    }
    .ui-dialog .ui-dialog-content {
        padding: 3em 1em;
    }

</style>

<div id="div_search" class="panel-search">
    <div class="panel panel-primary">
        <div class="collapse in" id="collapse_search" aria-expanded="true" style="">
            <div class="panel-heading custom-text">Datos de la Obligaci&oacute;n</div>
            <div class="panel-body">
                <form id='frm_consulta'>
                    <div class="row">
                        <div class="form-group col-md-2">
                            <label for="n_cuit">CUIT</label>
                            <input name='n_cuit' id='n_cuit' class="form-control input-sm text-right sr-only" type='hidden' value='<?=$n_cuit_mask?>' maxlength='13' readonly/>
                            <input name='id_contribuyente_ori' class="form-control input-sm text-right sr-only" id='id_contribuyente_ori' type='hidden' value='<?=$id_contribuyente?>' readonly/>
                            <input type="text" class="form-control input-sm text-right" id="n_cuit_mask" value='<?=$n_cuit_mask?>' readonly>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="denominacion">Denominación</label>
                            <input type="text" class="form-control input-sm mayusculas" id="denominacion" value='<?=$denominacion?>' readonly>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="c_tipo_documento">Tipo Doc.</label>
                            <div class="input-group" id="div_input_tipo_documento">
                                <input type="text" class="form-control mayusculas input-sm input-cod-short" id="c_tipo_documento" value='<?=$c_tipo_documento?>' readonly>
                                <input type="text" class="form-control input-sm input-desc-long" id="d_tipo_documento" value='<?=$d_tipo_documento?>' readonly>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="n_documento">Nro. Doc.</label>
                            <input type="text" class="form-control input-sm text-right" id="n_documento" name="n_documento" value='<?=$n_documento?>' readonly>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="c_tipo_imponible1">Tipo Imponible</label>
                            <div class="input-group" id="div_input_tipo_imp">
                                <input name='c_tipo_imponible1' type="text" class="form-control input-sm input-cod-short" id="c_tipo_imponible1" value='<?=$c_tipo_imponible?>' readonly>
                                <input name='d_tipo_imponible1' type="text" class="form-control input-sm input-desc-long" id="d_tipo_imponible1" value='<?=$d_tipo_imponible?>' readonly>
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="c_tributo1">Tributo</label>
                            <div class="input-group" id="div_input_tributo">
                                <input name='c_tributo1' type="text" class="form-control input-sm input-cod-short" id="c_tributo1" value='<?=$c_tributo?>' readonly>
                                <input name='d_tributo1' type="text" class="form-control input-sm input-desc-long" id="d_tributo1" value='<?=$d_tributo?>' readonly>
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="c_concepto">Concepto</label>
                            <div class="input-group" id="div_input_concepto">
                                <input name='c_concepto' id='c_concepto' type='text' class="form-control input-sm input-cod-short" value='<?=$c_concepto?>' readonly/>
                                <input name='d_concepto' id='d_concepto' type='text' class="form-control input-sm input-desc-long" value='<?=$d_concepto?>' readonly/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-2">
                            <label for="d_objeto_hecho">Objeto</label>
                            <input name='d_objeto_hecho' type="text" class="form-control input-sm" id="d_objeto_hecho" value='<?=$d_objeto_hecho?>' readonly>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="n_plan_pago">Nro. Plan de Pago</label>
                            <input name='n_plan_pago' type="text" class="form-control input-sm" id="n_plan_pago" value='<?=$n_plan_pago?>' readonly>
                        </div>
                        <div class="form-group col-md-1">
                            <label for="n_pos_fiscal">Pos. Fiscal</label>
                            <input name='n_pos_fiscal' id='n_pos_fiscal' type='text' class="form-control input-sm text-right" value='<?=substr($n_pos_fiscal,0,4)."/".substr($n_pos_fiscal,4,2)?>' readonly/>
                        </div>
                        <div class="form-group col-md-1">
                            <label for="cuota">Cuota</label>
                            <input name='cuota' id='cuota' type='text' class="form-control input-sm" value='<?=$n_cuota?>' readonly/>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="id_obligacion">Obligación</label>
                            <input name='id_obligacion' id='id_obligacion' type='text' class="form-control input-sm text-right" value='<?=$id_obligacion?>' readonly/>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="f_vto_pago">F. Vto 1</label>
                            <input name='f_vto_pago' id='f_vto_pago' type='text' class="form-control input-sm text-center" value='<?=$f_vto_pago?>' readonly/>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="f_vto_pago2">F. Vto 2</label>
                            <input name='f_vto_pago_2' id='f_vto_pago_2' type='text' class="form-control input-sm text-center" value='<?=$f_vto_pago_2?>' readonly/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div id='tabs_det_cuenta_cor'>
    <ul class='nav nav-tabs'>
        <li class='nav-item active'>
            <a href='#tab_principal' data-toggle='tab' role='tab' data-grid='main_grid'>Principal</a>
        </li>
        <li class='nav-item'>
            <a href='#tab_secundario' data-toggle='tab' role='tab' data-grid='second_grid'>Secundario</a>
        </li>
    </ul>
    <div class='tab-content'>
        <div id='tab_principal' class='tab-pane fade active in' role='tabpanel'>
            <div>
                <div id='main_grid_div'>
                    <table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'></table>
                    <div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
                </div>
            </div>
            <br>
            <div class="col-md-7">
                <button type='button' class='btn btn-sm' id='btn_ddjj'           style="margin: 1px;">DDJJ</button>
                <button type='button' class='btn btn-sm' id='btn_reimputaciones' style="margin: 1px;">Reimputaciones</button>
                <button type='button' class='btn btn-sm' id='btn_gest_jud'       style="margin: 1px;">Gest. Jud.</button>
                <button type='button' class='btn btn-sm' id='btn_multas'         style="margin: 1px; display: none;">Multas</button>
                <button type='button' class='btn btn-sm ' id='btn_pago'          style="margin: 1px;">Pago</button>
                <button type='button' class='btn btn-sm ' id='btn_pfp'        style="margin: 1px;">PFP</button>
                <button type='button' class='btn btn-sm'  id="btn_cal_interes" style="margin: 1px;">Interés</button>
                <button type='button' class='btn btn-sm panel_btn' data-fun='btn_det_ajuste' style="margin: 1px;">Det. Ajuste</button>
                <button type='button' class='btn btn-sm panel_btn' data-fun='btn_det_comp' style="margin: 1px;">Det. Comp.</button>
            </div>
            <div class="col-md-5">
                <label style="font-size: 13px; color: #4381ba" class="control-label col-md-8">Saldo de la Cuenta Corriente: &nbsp;&nbsp;<?php echo $saldo_detalle?> </label>
                <input name='i_saldo' id='i_saldo' type='text' class="form-control-static col-sm-4" value='<?php echo $n_saldo?>' readonly='readonly' style='text-align:right; font-weight: bold' />
            </div>
            <br>
        </div>
        <div id='tab_secundario' class='tab-pane fade' role='tabpanel'>
            <div>
                <div id='second_grid_div'>
                    <table id='second_grid' class='scroll' cellpadding='0' cellspacing='0'></table>
                    <div id='second_grid_pager' class='scroll' style='text-align:center;'></div>
                </div>
            </div>
            </br>
            <div class="col-md-7">
                <button type='button' class='btn btn-sm panel_btn' data-fun='btn_det_ajuste' style="margin: 1px;">Det. Ajuste</button>
                <button type='button' class='btn btn-sm panel_btn' data-fun='btn_det_comp' style="margin: 1px;">Det. Comp.</button>
            </div>
            <div class="col-md-5">
                <label style="font-size: 13px; color: #4381ba" class="control-label col-md-8">Saldo de la Cuenta Corriente: &nbsp;&nbsp;<?php echo $saldo_detalle_int?> </label>
                <input name='i_saldo_int' id='i_saldo_int' type='text' class="form-control-static col-sm-4" value='<?php echo $n_saldo_int?>' readonly='readonly' style='text-align:right; font-weight: bold' />
            </div>
            <br>
        </div>
    </div>
</div>

<script type="text/javascript">
    function getGridTabSelected() {
        return $(".nav-tabs .active > a").attr("data-grid");
    }

    function recall_app(){
        post_to_url('detalle_cuenta_corr.php',{'p_n_id_menu':'<?=$_POST['p_n_id_menu']?>','n_cuit':$('#n_cuit_mask').val(),'id_obligacion':$('#id_obligacion').val(),
            'n_pos_fiscal':	$('#n_pos_fiscal').val(),'n_cuota':$('#cuota').val()},'','POST');
    }

    function agrega_mascara_decimales(clase){
            $(clase).each(function() {

                var cadena = $(this).val();
                var decimales='';

                //Busco la coma
                var posicion_coma = cadena.search(',');

                if (posicion_coma != -1) {//-1 significa que no hay coma

                    decimales=cadena.substr(posicion_coma+1,cadena.length);
                    if (decimales.length<2){
                        cadena+='0';
                    }

                } else {
                    posicion_coma = cadena.length + 1;
                    cadena +=',00';
                }

                $(this).val(cadena);
            });
    }

    function prepara_number(clase) {
        $(clase).each(function() {//FORMATEO TODOS LOS NUMEROS!!
            var t = $(this).val();
            t = t.replace('.', ',');
            $(this).val(t);
            $(this).val(formatea_number($(this).val(), ''));
        });
    }

	var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>',
		param:{':p_id_obligacion':'<?=$id_obligacion?>'}
	});

    var datos_second_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:3,
		m_autoquery:'<?=$m_autoquery?>',
		param:{':p_id_obligacion':'<?=$id_obligacion?>'}
	});

    var datos_ajustes_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:1,
        m_autoquery:'<?=$m_autoquery?>',
        param:{':id_obligacion':null,
            ':n_ajuste':null
        }
    });

    var datos_pfp_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:5,
        m_autoquery:'<?=$m_autoquery?>',
        param:{':id_obligacion':null
        }
    });

    var datos_pfp_detalle_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:6,
        m_autoquery:'<?=$m_autoquery?>',
        param:{':pn_plan_pago':null
        }
    });

     var datos_pagos_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:4,
        m_autoquery:'<?=$m_autoquery?>',
        param:{':id_obligacion':null
        }
    });


    var datos_gestionjudicial_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:7,
        m_autoquery:'<?=$m_autoquery?>',
        param:{':pid_obligacion':null
        }
    });

    var datos_detalleinstancia_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:8,
        m_autoquery:'<?=$m_autoquery?>',
        param:{':pc_instancia':null
        }
    });

    var datos_reimputaciones_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:2,
        m_autoquery:'<?=$m_autoquery?>',
        param:{':id_obligacion':null}
    });




	$(document).ready(function() {

		var date = new Date();
    	var currentMonth = date.getMonth() + 1;
   	 	var currentDate = date.getDate();
   	 	var currentYear = date.getFullYear();
		var dia = currentDate+'/' + currentMonth +'/' + currentYear;




        $('#f_ajuste').datepicker();
		$('#f_ajuste').val(dia);

        $('#i_ajuste').keydown(function(event){
            return controla_number(event,this,2,20);
        });

		prepara_number($('#i_saldo'));	
		agrega_mascara_decimales($('#i_saldo'));
		prepara_number($('#i_saldo_int'));	
		agrega_mascara_decimales($('#i_saldo_int'));

        $(".datepicker").datepicker({
            dateFormat:'dd/mm/yy',
            changeMonth:false,
            changeYear:false,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']});
		
		$('#f_ajuste').datepicker('option', 'maxDate',dia);
		/*****************************************definición de botones**********************************************/

		//Aqui deberia ir cada boton con su funcion por separado..por el momento todos muestran el mismo cuadro
        $('.en_construccion').click(function () {
            mostrar_mensaje('Atención','Funcionalidad en desarrollo.');
        });

        $('.nav-item').click(function(){
            $(window).resize();
        })

        $("#btn_reimputaciones").click(function(){
            $.ajax({
                type: 'POST',
                url: 'detalle_cuenta_corriente/get_datos_reimputaciones.php',
                data: {
                    "id_contribuyente": $("#id_contribuyente_ori").val(),
                    "id_obligacion": $("#id_obligacion").val()
                },
                dataType: 'json',
                success: function(data) {
                    if (data.resultado == 'OK') {
                        setea_parametros('#reimputaciones_grid',{
                            ':id_obligacion': $("#id_obligacion").val()
                        });
                        $("#modal_reimputaciones").modal('show');
                        $(window).resize();
                    } else {
                        mostrar_error(data.error);
                        return;
                    }
                }
            });
        });

        if($("#c_tributo1").val() == 100){
            $("#btn_multas").show();
        }
        
        $("#btn_multas").click(function(){
            $.ajax({
                type: 'POST',
                url: 'detalle_cuenta_corriente/get_datos_multas.php',
                data: {
                    "id_contribuyente": $("#id_contribuyente_ori").val(),
                    "id_obligacion": $("#id_obligacion").val()
                },
                dataType: 'json',
                success: function(data) {
                    if (data.resultado == 'OK') {
                        post_to_url('cons_multas.php',
                            {'p_id_contribuyente':$("#id_contribuyente_ori").val(),
                            'p_n_id_menu':10744,
                            'p_m_autoquery':'S',
                            'ruta':'[]'
                        },'_blank','POST');
                    } else {
                        mostrar_error(data.error);
                        return;
                    }
                }
            });
        });

        $("#btn_cal_interes").click(function(){
            post_to_url('calculo_interes.php',
                {'id_obligacion':$("#id_obligacion").val(),
                'p_n_id_menu':10863,
                'p_m_autoquery':'S'
            },'_blank','POST');
        });



        $("#btn_ddjj").click(function(){



            if (!($("#c_tributo1").val() ==  10 ||
                  $("#c_tributo1").val() ==  20 ||
                  $("#c_tributo1").val() ==  31 ||
                  $("#c_tributo1").val() ==  42 ||
                  $("#c_tributo1").val() ==  30 ||
                  $("#c_tributo1").val() ==  32 ||
                  $("#c_tributo1").val() ==  33 ||
                  $("#c_tributo1").val() ==  40 )){
                mostrar_error('Tributo no habilitado para consulta de DDJJ');
                return;
            }


            post_to_url("cons_ddjj.php", {'p_n_id_menu': 10893,
                                           'pid_contribuyente': $("#id_contribuyente_ori").val() ,
                                           'pdenominacion':     $("#denominacion").val() ,
                                           'pcuit':             $("#n_cuit").val(),
                                           'pc_tipo_imponible': $("#c_tipo_imponible1").val(),
                                           'pc_tributo':        $("#c_tributo1").val(),
                                           'pd_objeto_hecho':   $("#d_objeto_hecho").val() ,
                                            'n_cuota':          $('#cuota').val(),
                                           'n_pos_fiscal':	    $('#n_pos_fiscal').val()}, '_blank','POST');


    });



        $("#btn_pago").click(function(){

            setea_parametros('#pagos_grid',{
                ':id_obligacion': $("#id_obligacion").val()
            });

            $("#modal_pagos").modal('show');
            $(window).resize();


        });

        $("#btn_gest_jud").click(function(){
            setea_parametros('#gestionjudicial_grid',{':pid_obligacion': $("#id_obligacion").val() });
            $("#modal_gestionjudicial").modal('show');
            $(window).resize();


        });

        $("#btn_imprimir_instancia_det").click(function(){
            var id = $("#gestionjudicial_grid").getGridParam('selrow');
            if (id) {
                llamar_report('COFL_010',
                    'p_n_instancia|'+$("#gestionjudicial_grid").getCell(id,"n_instancia")+
                    '&p_n_orden|'+$("#gestionjudicial_grid").getCell(id,"n_orden"),
                    'PDF');
            }else{
                mostrar_validacion('Debe seleccionar un registro de la grilla principal.');
            }
        });



        $("#btn_pfp").click(function(){
            setea_parametros('#pfp_grid',{
                ':id_obligacion': $("#id_obligacion").val()
            });

            $("#modal_pfp").modal('show');
            $(window).resize();

        });


        $('.panel_btn').click(function(){
			var grid = getGridTabSelected();
			if(!$("#"+grid).getGridParam('selrow')){
                mostrar_error('Debe seleccionar un registro de la grilla.');	
                return false;
			}

			
			var rowid = $("#"+grid).getGridParam('selrow');
			var funcion = $(this).attr('data-fun');
			
			switch (funcion){
			    case "btn_det_ajuste":
					$.ajax({
                        type: 'POST',
                        url: 'detalle_cuenta_corriente/get_datos_ajuste.php',
                        data: {
                            "id_obligacion": $("#id_obligacion").val(),
                            "n_secuencia_obl": $("#"+grid).getCell(rowid,'n_secuencia_obl')
                        },
                        dataType: 'json',
                        success: function(data) {
                            if (data.resultado == 'OK') {
                                $("#d_motivo").val(data.d_motivo);
                                $("#f_alta_ajuste").val(data.f_alta);
                                $("#d_usuario").val(data.c_usuarioalt);
                                $("#d_observaciones").val(data.d_observ);



                                setea_parametros('#ajustes_grid',{
                                    ':id_obligacion': $("#id_obligacion").val(),
                                    ':n_ajuste': data.n_ajuste
                                });

                                $("#modal_ajustes").modal('show');







                                $(window).resize();
                            } else {
                                mostrar_error(data.error);
                                return;
                            }
                        }
                    });
                break;
				case "btn_det_comp":
					$.ajax({
                        type: 'POST',
                        url: 'detalle_cuenta_corriente/get_datos_compensacion.php',
                        data: {
                            "id_obligacion": $("#id_obligacion").val(),
                            "n_secuencia_obl": $("#"+grid).getCell(rowid,'n_secuencia_obl')
                        },
                        dataType: 'json',
                        success: function(data) {
                            if (data.resultado == 'OK') {
                                $("#obligacion_origen #id_obligacion_ori").val(data.id_obligacion_origen);
                                $("#obligacion_origen #c_tributo_ori").val(data.c_tributo_origen);
                                $("#obligacion_origen #d_tributo_ori").val(data.d_tributo_origen);
                                $("#obligacion_origen #n_posicion_fiscal_ori").val(data.n_posicion_fiscal_origen);
                                $("#obligacion_origen #n_cuota_ori").val(data.n_cuota_origen);
                                $("#obligacion_origen #c_concepto_mov_ori").val(data.c_concepto_mov_origen);
                                $("#obligacion_origen #d_concepto_mov_ori").val(data.d_concepto_mov_origen);
                                $("#obligacion_origen #d_objeto_hecho_ori").val(data.d_objeto_hecho_origen);
                                $("#obligacion_origen #f_vto_pago_ori").val(data.f_vto_pago_origen);

                                $("#obligacion_destino #id_obligacion_dest").val(data.id_obligacion_destino);
                                $("#obligacion_destino #c_tributo_dest").val(data.c_tributo_destino);
                                $("#obligacion_destino #d_tributo_dest").val(data.d_tributo_destino);
                                $("#obligacion_destino #n_posicion_fiscal_dest").val(data.n_posicion_fiscal_destino);
                                $("#obligacion_destino #n_cuota_dest").val(data.n_cuota_destino);
                                $("#obligacion_destino #c_concepto_mov_dest").val(data.c_concepto_mov_destino);
                                $("#obligacion_destino #d_concepto_mov_dest").val(data.d_concepto_mov_destino);
                                $("#obligacion_destino #d_objeto_hecho_dest").val(data.d_objeto_hecho_destino);
                                $("#obligacion_destino #f_vto_pago_dest").val(data.f_vto_pago_destino);

                                $("#compensacion_detalle #f_compensacion_comp").val(data.f_movimiento);
                                $("#compensacion_detalle #i_compensacion_comp").val(data.i_importe);
                                $("#compensacion_detalle #i_interes_comp").val(data.i_interes);
                                $("#compensacion_detalle #d_observaciones_comp").val(data.d_observ);
                                $("#compensacion_detalle #f_alta_comp").val(data.f_alta);
                                $("#compensacion_detalle #c_usuario_comp").val(data.c_usuarioalt);

                                $("#modal_compensacion").modal('show');
                            } else {
                                mostrar_error(data.error);
                                return;
                            }
                        }
                    });
                break;
			}
	    });

		/**************************************************definición de grilla 1**********************************************/
		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
            pager: $('#main_grid_pager'),
			postData:datos_main_grid.postData(),
            height:420,
            shrinkToFit: true
		}).navGrid('#main_grid_pager',{refresh:false});

        $("#second_grid").jqGrid({
			colNames:datos_second_grid.colNames(),
			colModel:datos_second_grid.colModel(),
            pager: $('#second_grid_pager'),
			postData:datos_second_grid.postData(),
            height:420,
            shrinkToFit: true
		}).navGrid('#second_grid_pager',{refresh:false});

        $("#reimputaciones_grid").jqGrid({
            colNames:datos_reimputaciones_grid.colNames(),
            colModel:datos_reimputaciones_grid.colModel(),
            postData:datos_reimputaciones_grid.postData(),
            pager: $('#reimputaciones_grid_pager'),
            autowidth:false,
            height:300,
            shrinkToFit: true
        }).navGrid('#reimputaciones_grid_pager',{refresh:false});

        $("#pagos_grid").jqGrid({
            colNames:datos_pagos_grid.colNames(),
            colModel:datos_pagos_grid.colModel(),
            postData:datos_pagos_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            pager: $('#pagos_grid_pager'),
            height:150,
            autowidth:false
        }).navGrid('#pagos_grid_pager', {refresh:false});


        $("#gestionjudicial_grid").jqGrid({
            colNames:datos_gestionjudicial_grid.colNames(),
            colModel:datos_gestionjudicial_grid.colModel(),
            postData:datos_gestionjudicial_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            pager: $('#gestionjudicial_grid_pager'),
            height:150,
            autowidth:false,
            onSelectRow: function (id) {
                var obser          = $('#gestionjudicial_grid').getCell(id, 'd_observ');
                var vf_vig_hasta   = $('#gestionjudicial_grid').getCell(id, 'f_vig_hasta');

                console.log(vf_vig_hasta);

               if (   vf_vig_hasta == ''  ){
                    $('#observaciones').val(obser);
                }else{
                    $('#observaciones').val('DADA DE BAJA  -  ' + obser);
               }

            },
            ondblClickRow: function(id) {
                console.log('doble');
                var pn_instancia= $('#gestionjudicial_grid').getCell(id,'n_instancia');
                setea_parametros('#detalleinstancia_grid',{':pc_instancia':pn_instancia});
            }
        }).navGrid('#gestionjudicial_grid_pager', {refresh:false});



        $("#detalleinstancia_grid").jqGrid({
            colNames:datos_detalleinstancia_grid.colNames(),
            colModel:datos_detalleinstancia_grid.colModel(),
            postData:datos_detalleinstancia_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            pager: $('#detalleinstancia_grid_pager'),
            height:150,
            autowidth:false,
            sortname:'n_posicion_fiscal, n_cuota_anticipo',
            sortorder:'asc',
            loadComplete:function(){
                $("#i_sum_deuda").val($("#detalleinstancia_grid").getCell(1,"total_capital"));
                $("#i_sum_det").val($("#detalleinstancia_grid").getCell(1,"total_determinado"));
                $("#i_sum_int").val($("#detalleinstancia_grid").getCell(1,"total_interes"));
                $("#i_sum_act").val($("#detalleinstancia_grid").getCell(1,"total_actualizado"));
            },
            onSelectRow: function (id) {
                var trib = $('#detalleinstancia_grid').getCell(id, 'd_descrip');
                var conc = $('#detalleinstancia_grid').getCell(id, 'd_concepto');

                $('#d_tributo').val(trib);
                $('#d_concepto').val(conc);

            },
        }).navGrid('#detalleinstancia_grid_pager', {refresh:false});







        $("#pfp_grid").jqGrid({
            colNames:datos_pfp_grid.colNames(),
            colModel:datos_pfp_grid.colModel(),
            postData:datos_pfp_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            pager: $('#pfp_grid_pager'),
            caption:"Doble Click para consultar Detalle PFP",
            sortname:'f_emision',
            sortorder:'desc',
            height:150,
            autowidth:false,
            ondblClickRow: function(id) {
                var pn_plan_pago= $('#pfp_grid').getCell(id,'n_plan_pago');
                setea_parametros('#pfp_detalle_grid',{':pn_plan_pago':pn_plan_pago});
            }
        }).navGrid('#pfp_grid_pager', {refresh:false});

        $("#pfp_detalle_grid").jqGrid({
            colNames:datos_pfp_detalle_grid.colNames(),
            colModel:datos_pfp_detalle_grid.colModel(),
            postData:datos_pfp_detalle_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            pager: $('#pfp_detalle_grid_pager'),
            caption:"Detalle PFP",
            sortname:'d_objeto_hecho,n_posicion_fiscal, n_cuota_anticipo',
            sortorder:'desc',
            height:150,
            autowidth:false
        }).navGrid('#pfp_detalle_grid_pager', {refresh:false});

        $("#ajustes_grid").jqGrid({
            colNames:datos_ajustes_grid.colNames(),
            colModel:datos_ajustes_grid.colModel(),
            postData:datos_ajustes_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            pager: $('#ajustes_grid_pager'),
            height:150,
            autowidth:false
        }).navGrid('#ajustes_grid_pager', {refresh:false});


        $("#modal_pagos").draggable({
            handle: ".modal-header"
        });

        $("#pfp_pagos").draggable({
            handle: ".modal-header"
        });

        $("#modal_compensacion").draggable({
            handle: ".modal-header"
        });


    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>
