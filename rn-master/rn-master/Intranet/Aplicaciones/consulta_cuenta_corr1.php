<?php

    require_once(INTRANET."header.php");

    require_once('cuenta_corriente/get_descrip.php');
    $m_autoquery = $_POST['p_m_autoquery'];
    
    $id_contribuyente = $_POST['id_contribuyente'];
    $c_tipo_imponible = $_POST['c_tipo_imponible'];
    $c_tributo = $_POST['c_tributo'];
    $d_objeto_hecho = $_POST['d_objeto_hecho'];
    $n_pos_fiscal_desde = $_POST['n_pos_fiscal_desde'];
    $n_pos_fiscal_hasta = $_POST['n_pos_fiscal_hasta'];
    $cuota_desde = $_POST['cuota_desde'];
    $cuota_hasta = $_POST['cuota_hasta'];

    if(isset($id_contribuyente)){
        $array_description = get_cuit($id_contribuyente);
        $n_cuit = $array_description['N_CUIT'];
        $cuit_mascara = $array_description['CUIT_MASCARA'];
        $denominacion_contr = $array_description['D_DENOMINACION'];
    }


    if(isset($c_tipo_imponible)){
        $array_description = get_desc_trib_subtrib($c_tipo_imponible, $c_tributo);
        $d_tipo_imponible = $array_description['D_TIPO_IMPONIBLE'];
        $d_tributo = $array_description['D_TRIBUTO'];
    }


    $db_query = new DB_Query("SELECT TO_CHAR(SYSDATE, 'MM/DD/YYYY') AS FECHA FROM DUAL");
    $date_qry = array_shift($db_query->do_query());

    $fecha_hoy  = $date_qry['FECHA'];
    $fecha_hoy  = date('d/m/Y');

    $c_usuario = $_SESSION['usuario'];

?>

<style>
    .formError {
        z-index: 15000;
    }

    #main {
        padding-top: 0.5% !important;
    }

    .div-button{
        padding-top:4%;
        padding-bottom:1%;
    }

    .panel-body {
        padding-bottom: 0% !important;
    }

    .negrita{font-weight: bold;}

    .bt_v{background:#04B404 !important; width:80%; height:18px;}
    .bt_a{background:#FFFF00 !important; width:80%; height:18px;}
    .bt_n{background:#FF7700 !important; width:80%; height:18px;}
    .bt_r{background:#FF0000 !important; width:80%; height:18px;}
    .bt_l{background:#A531A5 !important; width:80%; height:18px;}
    .bt_w{background: #FFFFFF !important; width:80%; height:18px;}
    .bt_obs{width:90%; height:18px; text-align:center; }
    
     p.buttons{margin: 5px 0 0; text-align: center; width: 100%;}

    #detalle{position:relative;} 
    #detalles_grid_info{display: block; position: absolute; bottom: 360px;}
    #detalles_grid_info .inner{position: absolute; display: none; bottom: 0px; background-color: aliceblue;
        width: 220px; text-align: left; padding: 5px; border: 2px solid #787CB8; border-radius: 7px;
        box-shadow: 0px 0px 5px #000;}
    #detalles_grid_info .content{}
    #detalles_grid_info .content p{overflow:hidden;}
    #detalles_grid_info .content p span{float: left; width: 15px; height: 15px; border-radius: 5px; margin-right: 5px;}

</style>

    <div id="div_search" class="panel-search">
        <div class="panel panel-primary">
            <a class="btn btn-primary" role="button" data-toggle="collapse" href="#collapse_search" aria-expanded="true" aria-controls="#collapse_search">
                <span class="glyphicon"></span>
            </a>
            <div class="collapse in" id="collapse_search" aria-expanded="true">
                <div class="panel-heading">Filtros de B&uacute;squeda de Cuenta Corriente</div>
                <div class="panel-body">
                    <form id='frm_consulta' style="margin-top: 5px;">

                        <div class="row">

                            <div class="form-group col-md-2">
                                <label for="n_cuit">CUIT Contribuyente:</label>
                                <input name='n_cuit' id='n_cuit' type='hidden' class='sr-only' value='<?php echo $n_cuit; ?>' />
                                <input name='n_cuit_mask' id='n_cuit_mask' type='text' value='<?php echo $cuit_mascara; ?>' class='form-control input-sm text-right' />
                                <input name='id_contribuyente' id='id_contribuyente' value='<?php echo $id_contribuyente; ?>' type='hidden' class='sr-only'/>
                            </div>

                            <div class="form-group col-md-4">
                                <label for="denominacion">Denominaci&oacute;n Contribuyente:</label>
                                <input type="text" class="form-control input-sm mayusculas" id="denominacion" value='<?=$denominacion_contr?>'>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="d_tipo_documento">Tipo Documento:</label>
                                <div class="input-group" id="div_input_tipo_documento">
                                    <input type="text" class="form-control mayusculas input-sm input-cod-short" id="c_tipo_documento">
                                    <input type="text" class="form-control input-sm input-desc-long" id="d_tipo_documento" readonly>
                                    <span class="input-group-addon btn_lupa" id="lupa_c_tipo_documento">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="n_documento">N&uacute;mero de Documento:</label>
                                <input type="text" class="form-control input-sm text-right" id="n_documento">
                            </div>

                        </div>

                        <div class="row">

                            <div class="form-group col-md-4">
                                <label for="d_tipo_imponible">Tipo Imponible:</label>
                                <div class="input-group" id="div_input_tipo_imponible">
                                    <input type="text" class="form-control input-sm input-cod-short" id="c_tipo_imponible" value='<?php echo $c_tipo_imponible; ?>'>
                                    <input type="text" class="form-control input-sm input-desc-long" id="d_tipo_imponible" value='<?php echo $d_tipo_imponible; ?>' readonly>
                                    <span class="input-group-addon btn_lupa" id="lupa_c_tipo_imponible">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </span>
                                </div>
                            </div>

                            <div class="form-group col-md-4">
                                <label for="d_tributo">Tributo:</label>
                                <div class="input-group" id="div_input_tributo">
                                    <input type="text" class="form-control input-sm input-cod-short" id="c_tributo" value='<?php echo $c_tributo; ?>'>
                                    <input type="text" class="form-control input-sm input-desc-long" id="d_tributo" value='<?php echo $d_tributo; ?>' readonly>
                                    <span class="input-group-addon btn_lupa" id="lupa_c_tributo">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </span>
                                </div>
                            </div>

                            <div class="form-group col-md-4">
                                <label for="d_objeto_hecho">Objeto/Hecho:</label>
                                <div class="input-group" id="div_input_obj_hecho">
                                    <input type="text" class="form-control input-sm mayusculas" id="d_objeto_hecho" value='<?php echo $d_objeto_hecho; ?>'>
                                    <span class="input-group-addon btn_lupa" id="lupa_d_objeto_hecho">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </span>
                                </div>
                            </div>

                        </div>

                        <div class="row">

                            <div class="form-group col-md-2" id="div_col_pos_fiscal_desde">
                                <div class="input-group" id="div_input_pos_fiscal_desde">
                                    <label for="n_pos_fiscal_desde">Pos. Fis.-Cuota Desde:</label>
                                    <input type="text" class="form-control input-sm input-range-left" id="n_pos_fiscal_desde" placeholder="aaaa/mm" maxlength=6 value='<?php echo $n_pos_fiscal_desde?>'>
                                    <input type="text" class="form-control input-sm input-range-right" id="cuota_desde" placeholder="nn" maxlength=2 value='<?php echo $cuota_desde?>' >
                                </div>
                            </div>
                            <div class="form-group col-md-2" id="div_col_pos_fiscal_hasta">
                                <div class="input-group" id="div_input_pos_fiscal_hasta">
                                    <label for="n_pos_fiscal_hasta">Pos. Fis.-Cuota Hasta:</label>
                                    <input type="text" class="form-control input-sm input-range-left" id="n_pos_fiscal_hasta" placeholder="aaaa/mm" maxlength=6 value='<?php echo $n_pos_fiscal_hasta?>'>
                                    <input type="text" class="form-control input-sm input-range-right" id="cuota_hasta"  placeholder="nn" maxlength=2 value='<?php echo $cuota_hasta?>'>
                                </div>
                            </div>

                            <div class="form-group col-md-1">
                                <label class="control-label" for="solo_deuda">Adeudado:</label>
                                <input type="checkbox" class="checkbox" name='solo_deuda' id='solo_deuda' value='DEUDA'>
                            </div>

                            <div class="form-group col-md-2">
                                <label for="f_lote">Fecha Act.:</label>
                                <input type="text" class="form-control input-sm text-center datepicker" id="f_actualizacion">
                            </div>

                            <div class="form-group col-md-5" style="margin-top: 15px;">
                                <button type='button' id='btn_buscar' name='btn_buscar' class="btn-sm btn_buscar"></button>
                                <button type='button' id='btn_limpiar' name='btn_limpiar' class="btn-sm btn_limpiar"></button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id='gridWrapper' >
        <div>
        <table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
            <div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
        </div>
        <br/>
        <div id='detalle'>
            <table id='detalles_grid' class='scroll' cellpadding='0' cellspacing='0'>
                <tr>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <div id='detalles_grid_info'>
                <div class="grid_m_erronea inner"><?=get_btn_info('ERR')?></div>
                <div class="grid_m_intimacion inner"><?=get_btn_info('INT')?></div>
                <div class="grid_m_inspeccion inner"><?=get_btn_info('INS')?></div>
                <div class="grid_m_exencion inner"><?=get_btn_info('EXE')?></div>
                <div class="grid_m_pago_provisorio inner"><?=get_btn_info('PPR')?></div>
                <div class="grid_m_plan_pago inner"><?=get_btn_info('FDP')?></div>
                <div class="grid_m_pro_acep inner"><?=get_btn_info('POA')?></div>
                <div class="grid_m_conc_quieb inner"><?=get_btn_info('CYQ')?></div>
                <div class="grid_m_juicio inner"><?=get_btn_info('JUI')?></div>
            </div>
            <div id='detalles_grid_pager' class='scroll' style='text-align:center;'></div>
        </div>
        <br/>
        
        <div id='referencias_div'>
            <div class="form-group col-md-4 col-md-offset-8">
                <div class="form-group col-md-6" style='text-align:right;font-weight: bold'>Saldo Actualizado Total: $&nbsp;</div>
                <div class="form-group col-md-4">
                    <input name='n_saldo_total' id='n_saldo_total' type="text" class="form-control input-sm" readonly='readonly' style='text-align:right;font-weight: bold;'/>
                </div>
                <div class="form-group col-md-2">
                    <input name='n_a_favor' id='n_a_favor' type="text" class="form-control input-sm" readonly='readonly' style='text-align:right;font-weight: bold;'/>
                </div>
            </div>
        </div>
        
    </div>

<div id='mensaje' style='display:none;'>
    <u><b>IMPORTANTE: Debe realizarse la búsqueda respetando alguno de los siguientes criterios de obligatoriedad. 1 - CUIT, o Tipo y Número de Documento. 2- Tipo Imponible, Tributo y Objeto.</b></u>
</div>

<script type="text/javascript" src="cuenta_corriente/contribuyente.js"></script>
<script type="text/javascript">

    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    filtros_no_nativos_ar['detalles_grid'] = new Array();

    var id_sesion;
    var id_sesion_estado_deuda;
    var importe_total_consulta;
    var a_favor;
    var id_sesion;
    var p_c_usuario = '<?=$_SESSION['usuario']?>';
    var ajax_autocomplete;
    var id_main_grid;

    /***************************************************** Definición de GRILLAS **********************************************/

    // definici�n de objeto de grillas
    var datos_main_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:0,
        m_autoquery:'N'
    });


    var datos_detalles_grid = new GridParam({
        id_menu:<?=$_POST['p_n_id_menu'];?>,
        n_grid:1,
        m_autoquery:'N'
    });

    var id_contrib;
    /***************************************************** FIN de GRILLAS **********************************************/

    $(document).ready(function() {
        obtener_id_sesion();
        /************************************ Comportamiento de Botones *****************************************/

        $("#lupa_c_tipo_documento").lupa_generica({
            id_lista:<?=fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');?>,
            titulos:['C&oacute;digo','Descripci&oacute;n'],
            grid:[{index:'c_codigo',width:100},
                    {index:'d_descrip',width:250}],
            caption:'Tipo de Documento',
            sortname:'d_descrip',
            sortorder:'asc',
            filtros:[],
            searchInput: '#c_tipo_documento',
            searchCode: true,
            campos:{c_codigo:'c_tipo_documento',d_descrip:'d_tipo_documento'},
            keyNav:true             
        });
        
        $("#lupa_c_tipo_imponible").lupa_generica({
            id_lista:<?=fun_id_lista('LISTADO DE TRIBUTOS POR CONTRIBUYENTE Y OBJETOS');?>,
            titulos:['Cód. Tipo Imponible','Tipo Imponible'],
            grid:[{index:'c_codigo',width:150},
                    {index:'d_descrip',width:400}],
            caption:'Lista de Tipos Imponibles',
            sortname:'d_descrip',
            sortorder:'asc',
            filtros:['#id_contribuyente'],
            filtroNull:true,
            campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
            keyNav:true,
            searchInput: '#c_tipo_imponible',
            searchCode: true,
            onClose: function(){
                tipo_imponible = $('#c_tipo_imponible').val();
                $('#c_tributo').val(null);
                $('#d_tributo').val(null);
                $('#d_objeto_hecho').val(null);
                if( $('#id_contribuyente').val() == ''){
                    $('#id_contribuyente').val(null);
                }
            }
        });
        
        $("#lupa_c_tributo").lupa_generica({
            id_lista:<?=fun_id_lista('LISTADO DE SUBTRIBUTOS POR CONTRIBUYENTE Y OBJETOS');?>,
            titulos:['Cód. Tributo','Tributo'],
            grid:[  {index:'c_codigo',width:100},
                {index:'d_descrip',width:250}],
            caption:'Lista de Tributos',
            sortname:'d_descrip',
            sortorder:'desc',
            filtros:['#c_tipo_imponible','#id_contribuyente'],
            filtrosNulos:[true,true],
            campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
            keyNav:true,
            searchInput: '#c_tributo',
            searchCode: true,
            onClose: function(){
                $('#d_objeto_hecho').val(null);
            }
        });

        $("#lupa_d_objeto_hecho").lupa_generica({
            id_lista:<?=fun_id_lista('LISTADO DE OBJETOS HECHOS CONSULTA CTA CTE');?>,
            titulos:['Descripción Objeto-Hecho'],
            grid:[{index:'d_objeto_hecho',width:250}],
            caption:'Lista de Objetos - Hechos',
            sortname:'d_objeto_hecho',
            sortorder:'asc',
            filtrosNulos:[true,false,true],
            filtros:['#c_tipo_imponible','#c_tributo','#id_contribuyente'],
            filtrosTitulos:['Tipo Imponible','Tributo','CUIT'],
            campos:{d_objeto_hecho:'d_objeto_hecho'},
            keyNav:true
        });

        $('#btn_limpiar').click(function(){
            $('#form_consulta').validationEngine('hideAll');
            $('#id_contribuyente').val(null);
            $('#c_tipo_imponible, #c_tributo').val(null).attr('readonly',false);
            $('#d_tipo_imponible, #d_tributo').val(null);
            $('#d_objeto_hecho').val(null);
            $('#n_pos_fiscal_desde').val('<?php echo $n_pos_fiscal_desde?>').attr('readonly',false);
            $('#n_pos_fiscal_hasta').val(null).attr('readonly',false);
            $('#cuota_desde').val(null).attr('readonly',false);
            $('#cuota_hasta').val(null).attr('readonly',false);
            $('#n_cuit').val(null);
            $('#n_cuit_mask').val(null);
            $('#denominacion').val(null);
            $('#c_tipo_documento').val(null);
            $('#d_tipo_documento').val(null);
            $('#n_documento').val(null).attr('readonly',false);;
            $('#solo_deuda').prop('checked',false);
            $('#f_actualizacion').datepicker("setDate", "<?=$fecha_hoy?>").prop('disabled',false);

            $('#cuota_hasta').attr('readonly',false);
            $('#f_actualizacion').prop('disabled',false);
            $('#n_cuit').attr('readonly',false);
            $('#n_cuit_mask').prop('readonly',false);
            $('#n_cuit_mask').prop('disabled',false);

            $('#denominacion').attr('readonly',false);
            $('#c_tipo_documento').attr('readonly',false);

            $('#f_actualizacion').attr('readonly',false);
            $('#btn_comp_auto').addClass('invisible');

            $('#n_saldo_total').val(0);



            c_tipo_imponible = '';
            d_tipo_imponible = '';
            c_tributo = '';
            d_tributo = '';
            c_concepto = '';
            d_concepto = '';
            cuota_desde = '';
            cuota_hasta = '';
            f_vto_desde = '';
            f_vto_hasta = '';
            n_cuit = '';
            denominacion = '';
            c_tipo_documento = '';
            d_tipo_documento = '';
            n_documento = '';
            id_contribuyente = '';
            d_objeto = '';

            $("#lupa_c_tributo").prop('disabled', false);
            $("#lupa_c_tipo_documento").prop('disabled',false);

            $('#main_grid').getGridParam('postData').m_autoquery = 'N';
            $('#main_grid').clearGridData();
            $('#detalles_grid').clearGridData();


        });


        /******************** Boton BUSCAR***************************************/


        $('#btn_buscar').click(function(){
            if(($('#c_tipo_imponible').val() != '' && $('#d_tipo_imponible').val() != '')||(($('#c_tipo_imponible').val() == '' && $('#d_tipo_imponible').val() == ''))){

                if(($('#c_tributo').val() != '' && $('#d_tributo').val() != '')||(($('#c_tributo').val() == '' && $('#d_tributo').val() == ''))){

                        if(($('#c_tipo_documento').val() != '' && $('#d_tipo_documento').val() != '')||(($('#c_tipo_documento').val() == '' && $('#d_tipo_documento').val() == ''))){

                            $('#n_cuit').val(($('#n_cuit_mask').val().replace('-','')).replace('-',''));
                            var id_contribuyente;
                            var filtro_deuda;
                            var existe_contrib;
                            var n_cuit = $('#n_cuit').val();
                            var d_denominacion = $('#denominacion').val();
                            var c_tipo_documento = $('#c_tipo_documento').val();                            
                            var d_tipo_documento = $('#d_tipo_documento').val();
                            var n_documento = limpia_dni($('#n_documento').val());
                            var c_tipo_imponible = $('#c_tipo_imponible').val();
                            var d_tipo_imponible = $('#d_tipo_imponible').val();
                            var c_tributo = $('#c_tributo').val();
                            var d_tributo = $('#d_tributo').val();
                            var d_objeto = $('#d_objeto_hecho').val();
                            var n_pos_fiscal_desde = fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_desde').val());
                            var n_pos_fiscal_hasta = fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_hasta').val());
                            var cuota_desde = $('#cuota_desde').val();
                            var cuota_hasta = $('#cuota_hasta').val();
                            var f_actualizacion = $('#f_actualizacion').val();
                            var c_municipio = $('#c_municipio').val();

                            if($("#solo_deuda").is(':checked')) {
                                filtro_deuda = 1;
                            } else {
                                filtro_deuda = null;
                            }

                            // Si no se cargan los valores de cuotas o posiciones fiscales se setean valores por defecto

                            if (n_pos_fiscal_desde == ''){
                                n_pos_fiscal_desde = 0;
                            }

                            if (n_pos_fiscal_hasta == ''){
                                n_pos_fiscal_hasta = 999999;
                            }

                            if (cuota_desde == ''){
                                cuota_desde = 0;
                            }

                            if (cuota_hasta == ''){
                                cuota_hasta = 999;
                            }

                            existe_contrib = existe_contribuyente_busqueda(n_cuit,c_tipo_documento,n_documento);

                            /* validaciones de campos requeridos */

                            $('#f_actualizacion').addClass('validate[required]');
                            $('#n_cuit').addClass('validate[required]');
                            $('#c_tipo_imponible').removeClass('validate[required]');
                            $('#c_tributo').removeClass('validate[required]');
                            $('#d_objeto_hecho').removeClass('validate[required]');
                            $('#c_tipo_documento').removeClass('validate[required]');
                            $('#n_documento').removeClass('validate[required]');

                            if(!n_cuit){
                                if((c_tipo_imponible) || (c_tributo) && !(d_objeto)){
                                    $('#c_tipo_imponible').addClass('validate[required]');
                                    $('#c_tributo').addClass('validate[required]');
                                    $('#d_objeto_hecho').addClass('validate[required]');
                                    $('#n_cuit').removeClass('validate[required]');
                                }
                            }

                            if((n_cuit)&&(existe_contrib < 0)){
                                mostrar_cuadro('I', 'Advertencia', 'El CUIT ingresado es inválido o no se encuentran registros asociados al mismo', '', '', 400, 200);
                            }else if(!(n_cuit)&&(d_objeto)&&((!c_tipo_imponible && !c_tributo))){
                                mostrar_cuadro('I', 'Advertencia', 'Para realizar la búsqueda por Objeto debe incluirse el Tipo Imponible - Tributo asociado', '', '', 400, 200);
                            }else{
                                var valido = $('#frm_consulta').validationEngine('validate');  // will return true or false

                                if(valido){
                                    if(!$('#n_cuit').val() && (d_denominacion||n_documento||c_tipo_documento)&& existe_contrib == -1){
                                        mostrar_cuadro('I', 'Advertencia', 'No existe un contribuyente cuyos datos coincidan con los ingresados', '', '', 400, 200);
                                    }else if (!$('#n_cuit').val() && (d_denominacion||n_documento||c_tipo_documento)&& existe_contrib == -2){
                                        mostrar_cuadro('I', 'Advertencia', 'Existe más de un contribuyente cuya combinación de tipo y número de documento coinciden con los ingresados. Por favor realice la búsqueda por CUIT', '', '', 400, 200);
                                    }else if(!$('#n_cuit').val() && !$('#c_tipo_imponible').val() && !$('#c_tributo').val() && !$('#d_objeto_hecho').val()){
                                        mostrar_cuadro('I', 'Advertencia', '<div>Debe seleccionar alguna de las siguientes combinaciones de filtro para ejecutar la búsqueda: </br>&nbsp- CUIT o Denominación </br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp - Tipo de Documento y Nro de Documento</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp- Tipo Imponible, Tributo y Objeto Hecho</div>');
                                    }else if((n_pos_fiscal_desde && n_pos_fiscal_hasta && (n_pos_fiscal_desde > n_pos_fiscal_hasta))){
                                        mostrar_cuadro('I', 'Advertencia', 'La Posición Fiscal DESDE debe ser menor que la Posición Fiscal HASTA', '', '', 400, 200);
                                    }else{
                                        id_contribuyente = null;

                                        if(existe_contrib > 0){
                                            id_contribuyente = existe_contrib;
                                        }

                                        $("#frm_consulta").validationEngine('hideAll');

                                        //Se generan los parametros de los filtros no nativos para el pdf de la grilla principal
                                        var filtros_arr_main = new Array();
                                        filtros_arr_main.push( 'Contribuyente: '+ $('#n_cuit_mask').val()+' - '+$('#denominacion').val());

                                        if($('#d_tipo_imponible').val() != ''){
                                            filtros_arr_main.push( 'Tipo Imponible: '+ $('#d_tipo_imponible').val() + ' - Tributo:' + $('#d_tributo').val() + ' - Objeto / Hecho:' + $('#d_objeto_hecho').val() );
                                        }
                                        if($('#n_pos_fiscal_desde').val() != ''||$('#cuota_desde').val()!= ''){
                                            filtros_arr_main.push( 'Posición fiscal / cuota desde: '+ $('#n_pos_fiscal_desde').val() + '/' +$('#cuota_desde').val());
                                        }
                                        if($('#n_pos_fiscal_hasta').val() != ''||$('#cuota_hasta').val()!= ''){
                                            filtros_arr_main.push( 'Posición fiscal / cuota hasta: '+ $('#n_pos_fiscal_hasta').val() + '/'+ $('#cuota_hasta').val());
                                        }

                                        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
                                        
                                        // PROCEDIMIENTO QUE CARGA LA TABLA TEMPORAL DE LA CONSULTA DE CTA CTE
                                        $('#main').procOverlay({visible:true});

                                        var alerta_obl;
                                        $.ajax({
                                            url: 'cuenta_corriente/prc_tmp_cta_cte.php',
                                            type:"POST",
                                            data:{
                                                "id_session":id_sesion,
                                                "id_contribuyente" : $('#id_contribuyente').val(),
                                                "c_tipo_imponible" : $('#c_tipo_imponible').val(),
                                                "c_tributo" : $('#c_tributo').val(),
                                                "d_objeto_hecho" : $('#d_objeto_hecho').val(),
                                                "pos_fiscal_inicial" : fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_desde').val()),
                                                "n_cuota_inicial" : $('#cuota_desde').val(),
                                                "pos_fiscal_final" : fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_hasta').val()),
                                                "n_cuota_final" : $('#cuota_hasta').val(),
                                                "f_actualizacion":  $('#f_actualizacion').val(),
                                                "filtro_deuda": filtro_deuda,
                                                "controlar_obl":'S'
                                            },
                                            success: function(data){
                                                ret = eval('('+data+')');

                                                if(ret.resultado == 'OK'){
                                                    alerta_obl = ret.alerta_obl;
                                                    if(alerta_obl == 'S'){
                                                        $('#main').procOverlay({visible:false});

                                                        mostrar_cuadro('C','Búsqueda de Obligaciones de la Cuenta Corriente','La búsqueda realizada devuelve un gran número de obligaciones y puede demorar. Especifique más filtros de búsqueda para evitarlo. ¿Desea continuar de todas formas?',
                                                            function(){
                                                                $('#main').procOverlay({visible:true});

                                                                $.ajax({
                                                                    url: 'cuenta_corriente/prc_tmp_cta_cte.php',
                                                                    type:"POST",
                                                                    data:{
                                                                        "id_session":id_sesion,
                                                                        "id_contribuyente" : $('#id_contribuyente').val(),
                                                                        "c_tipo_imponible" : $('#c_tipo_imponible').val(),
                                                                        "c_tributo" : $('#c_tributo').val(),
                                                                        "d_objeto_hecho" : $('#d_objeto_hecho').val(),
                                                                        "pos_fiscal_inicial" : fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_desde').val()),
                                                                        "n_cuota_inicial" : $('#cuota_desde').val(),
                                                                        "pos_fiscal_final" : fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_hasta').val()),
                                                                        "n_cuota_final" : $('#cuota_hasta').val(),
                                                                        "f_actualizacion":  $('#f_actualizacion').val(),
                                                                        "filtro_deuda": filtro_deuda,
                                                                        "controlar_obl":'N'
                                                                    },
                                                                    success: function(data){
                                                                        ret = eval('('+data+')');
                                                                        $('#main').procOverlay({visible:false});

                                                                        if(ret.resultado == 'OK'){
                                                                            importe_total_consulta = ret.importe_total;
                                                                            a_favor = ret.a_favor;
                                                                            setea_parametros('#main_grid',{
                                                                                'id_tmp_cta_cte': id_sesion
                                                                            },'S');
                                                                        }else{
                                                                            mostrar_cuadro('E','Busqueda de Obligaciones de la Cuenta Corriente',ret.resultado);
                                                                        }
                                                                    }
                                                                });
                                                            });
                                                    }else{
                                                        importe_total_consulta = ret.importe_total;
                                                        a_favor = ret.a_favor;
                                                        setea_parametros('#main_grid',{
                                                            'id_tmp_cta_cte': id_sesion
                                                        },'S');

                                                        $('#main').procOverlay({visible:false});
                                                    }
                                                }else{
                                                    $('#main').procOverlay({visible:false});
                                                    mostrar_cuadro('E','Búsqueda de Obligaciones de la Cuenta Corriente',ret.resultado);
                                                }
                                            }
                                        });
                                        $('#n_cuit').val('');
                                    }
                                }
                            }
                        }else{
                            mostrar_cuadro('I', 'Advertencia', 'Corrobore que los campos de descripcion esten completos. Si estan vacios es porque el codigo ingresado no tiene correspondencia con un codigo existente.');
                        }
                }else{
                mostrar_cuadro('I', 'Advertencia', 'Corrobore que los campos de descripcion esten completos. Si estan vacios es porque el codigo ingresado no tiene correspondencia con un codigo existente.');
                }
            }else{
            mostrar_cuadro('I', 'Advertencia', 'Corrobore que los campos de descripcion esten completos. Si estan vacios es porque el codigo ingresado no tiene correspondencia con un codigo existente.');
            }
        });

        /* ********************************* Fin Comportamiento de Botones **************************************/

        
        /* ******************************* Comienzo Comportamiento de Campos ************************************/

        //máscaras
        $("#n_cuit_mask").mask("99-99999999-9");
        $("#cuota_hasta").mask("99");
        $("#cuota_desde").mask("99");
        $("#n_pos_fiscal_desde").mask("9999/99");
        $("#n_pos_fiscal_hasta").mask("9999/99");
        $("#n_pos_desde").mask("9999/99");
        $("#n_pos_hasta").mask("9999/99");
        $("#n_documento").mask("999999999");

        $(".mascara_importe",'#solicitud').keydown(function (event) {
            return controla_number(event, this, 2);
        });
        
        
        $("#f_actualizacion").datepicker(
            {   dateFormat:'dd/mm/yy',
                changeMonth:true,
                changeYear:true,

                dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
            })
            .blur(function(){
                formatearFecha($(this));
            }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}});
        
        $('#f_actualizacion').datepicker("setDate", "<?=$fecha_hoy?>");

       
        $("#denominacion").autocomplete({
            source: function( request, response ){
                if (ajax_autocomplete) ajax_autocomplete.abort();
                ajax_autocomplete = $.ajax({
                    type:'POST',
                    url: "cuenta_corriente/autocomplete.php",
                    async:true,
                    data: {term: request.term,
                            oper:1},
                    dataType: 'json',
                    success: function( data ) {
                        if(data) {
                            response( $.map( data.data_raz, function( item ) {
                                return {                    
                                    label: item.razon_social + ' - ' + item.cuit,
                                    value: item.razon_social,
                                    id_contribuyente : item.id_contribuyente,
                                    razon_social:item.razon_social,                     
                                    cuit: item.cuit
                                }
                            }));
                        }
                    }
                    
                });
            },
            minLength:1,
            select:function(event,ui){
                $('#n_cuit').val(limpia_cuit(ui.item.cuit));    
                $('#n_cuit_mask').val(ui.item.cuit);
                $("#id_contribuyente").val(ui.item.id_contribuyente);
                $("#denominacion").val(ui.item.razon_social);
                return false; // Prevent the widget from inserting the value.
            }
        });


        $("#d_objeto_hecho").autocomplete({
            source: function( request, response ) {
                if($('#c_tributo').val()!= ''){
                    $.ajax({
                        type:'POST',
                        url: "cuenta_corriente/autocomplete.php",
                        data: {term: request.term,
                            oper:2,
                            c_tipo_imponible:$('#c_tipo_imponible').val().toUpperCase(),
                            c_tributo:$('#c_tributo').val().toUpperCase()
                        },
                        dataType: 'json',
                        success: function( data ) {
                            if(data) {
                                response(
                                    $.map( data.data_obj, function( item ) {
                                        return {
                                            label: item.objeto_hecho,
                                            value: item.objeto_hecho
                                        }
                                    })
                                );
                            }
                        }
                    });
                }else{
                    mostrar_cuadro('I', 'Búsqueda de Objetos', 'Para buscar un Objeto/Hecho por nombre debe definir el Tributo al que pertenece', '', '', 400, 200);
                }
            },
            minLength:0,
            select:function(event,ui){
                $("#d_objeto_hecho").val(ui.item.value);
                return false; // Prevent the widget from inserting the value.
            }
        });

        $('#n_pos_fiscal_desde').focusout(function(){
            var string = $('#n_pos_fiscal_desde').val();
            if(string != ''){
                var res;
                var retorno;
                res = string.split("/");
                if(res.length >1){
                    retorno = res[0] + res[1];
                }else{
                    retorno = res[0];
                }
                if(retorno.length != 6 ){
                    mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. Debe tener el siguiente formato: aaaa/mm o aaaamm. ', '', '', 400, 200);
                    $('#n_pos_fiscal_desde').val(null);
                    $('#n_pos_fiscal_desde').focus();
                }else{
                    if(retorno.substring(4) > 12) {
                        mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. El mes no puede ser mayor a 12 ', '', '', 400, 200);
                        $('#n_pos_fiscal_desde').val(null);
                        $('#n_pos_fiscal_desde').focus();
                    }else {
                        $('#n_pos_fiscal_desde').val(retorno.substring(0, 4) + '/' + retorno.substring(4));
                    }
                }
            }
            
        });
        
        $('#n_pos_fiscal_hasta').focusout(function(){
            var string = $('#n_pos_fiscal_hasta').val();
            if(string != ''){
                var res;
                var retorno;
                res = string.split("/");
                if(res.length >1){
                    retorno = res[0] + res[1];
                }else{
                    retorno = res[0];
                }
                if(retorno.length != 6 ){
                    mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. Debe tener el siguiente formato: aaaa/mm o aaaamm. ', '', '', 400, 200);
                    $('#n_pos_fiscal_hasta').val(null);
                    $('#n_pos_fiscal_hasta').focus();
                }else{
                    if(retorno.substring(4) > 12) {
                        mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. El mes no puede ser mayor a 12 ', '', '', 400, 200);
                        $('#n_pos_fiscal_hasta').val(null);
                        $('#n_pos_fiscal_hasta').focus();
                    }else {
                        $('#n_pos_fiscal_hasta').val(retorno.substring(0, 4) + '/' + retorno.substring(4));
                    }
                }
            }
            
        });

        $('#n_cuit_mask').focusout(function(){
            if ($('#n_cuit_mask').val()!= ''){
            $.ajax({
                url: 'cuenta_corriente/devuelve_deno.php',
                type:"POST",
                data:{"n_cuit":limpia_cuit($("#n_cuit_mask").val())},
                async:true,
                success: function(data){
                    ret = eval('('+data+')');
                    if(ret != null){
                        $("#denominacion").val(ret.DENOMINACION);
                        $("#id_contribuyente").val(ret.ID_CONTRIBUYENTE);
                    }else{
                        $("#denominacion").val(null);
                        $("#id_contribuyente").val(null);
                        mostrar_cuadro('I', 'Busqueda de Contribuyentes por CUIT', 'Contribuyente no encontrado ', '', '', 400, 200);
                    }
                }
            });
            }
        });

        /* *********************************** Fin Comportamiento de Campos *************************************/

       

        /*********************************** GRILLA Cabecera de la Cuenta Corriente *************************************/

        $("#main_grid").jqGrid({
            colNames:datos_main_grid.colNames(),
            colModel:datos_main_grid.colModel(),
            pager: $('#main_grid_pager'),
            caption:"Tipo Imponible y Objetos:" ,
            postData:datos_main_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            sortname:' d_tributo,d_objeto_hecho,f_vig_desde',
            autowidth: false,
            height:160,
            //width: 1280,
            sortorder:'desc',
            loadComplete:function(){
                $('#detalles_grid').clearGridData();
            },
            gridComplete: function() {
                if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                    $('#gridWrapper').show();
                    if($(this).jqGrid('getGridParam','records') == 0){
                        mostrar_cuadro('I', 'Advertencia', 'No se han encontrado obligaciones para la consulta realizada ', '', '', 400, 200);
                    }else{                        
                        $('#n_saldo_total').val(importe_total_consulta);
                        $('#n_a_favor').val(a_favor);

                        //document.getElementById('FAVOR_LB').innerHTML = a_favor;
                    }
                }

            },
            onSelectRow: function(id) {
                id_main_grid = id;
                var id_tmp_cab = $('#main_grid').getCell(id,'id_tmp_cta_cte');
                var id_cab = $('#main_grid').getCell(id,'id_cab_tmp_cta_cte');
                //Se setea el array de parametros para que se muestre el objeto/hecho en el reporte
                var filtros_ar = new Array();
                var objeto_hecho = $('#main_grid').getCell(id, 'd_objeto_hecho');
                var d_tipo_imponible = $('#main_grid').getCell(id, 'd_tipo_imponible');
                var d_tributo = $('#main_grid').getCell(id, 'd_tributo');
                var n_cuit = $('#main_grid').getCell(id, 'n_cuit');
                var d_denominacion = $('#main_grid').getCell(id, 'd_denominacion');
                var c_tipo_imponible = $('#main_grid').getCell(id, 'c_tipo_imponible');
                var c_tributo = $('#main_grid').getCell(id, 'c_tributo');

                if (c_tipo_imponible == '1' && c_tributo != '30'){
                    $('#btn_comp_auto').removeClass('invisible');
                }else{
                    $('#btn_comp_auto').addClass('invisible');
                }

                filtros_ar.push( 'Cuit: '+n_cuit);
                filtros_ar.push( 'Razón Social: '+d_denominacion);
                filtros_ar.push( 'Tipo Imponible: '+d_tipo_imponible);
                filtros_ar.push( 'Tributo: '+d_tributo);
                filtros_ar.push( 'Objeto / Hecho: '+objeto_hecho);

                filtros_no_nativos_ar['detalles_grid'] = filtros_ar;
                setea_parametros('#detalles_grid',{':id_tmp_cta_cte':id_tmp_cab,':id_cab_tmp_cta_cte':id_cab});

                if (c_tributo == '20'){
                    $("#detalles_grid").jqGrid('showCol',['c_jurisdiccion']);
                }else{
                    $("#detalles_grid").jqGrid('hideCol',['c_jurisdiccion']);
                }

                if (c_tributo == '120' || c_tributo == '130' || c_tributo == '140'){
                    $("#detalles_grid").jqGrid('showCol',['c_tributo_orig']);
                    if (c_tributo == '120' || c_tributo == '130'){
                        $("#detalles_grid").jqGrid('hideCol',['id_boleta_deuda']);
                        $("#detalles_grid").jqGrid('showCol',['c_expte_cyq']);
                    }else if (c_tributo == '140'){
                        $("#detalles_grid").jqGrid('hideCol',['c_expte_cyq']);
                        $("#detalles_grid").jqGrid('showCol',['id_boleta_deuda']);
                    }
                }else{
                    $("#detalles_grid").jqGrid('hideCol',['c_tributo_orig','id_boleta_deuda','c_expte_cyq']);
                }

            }
        }).navGrid('#main_grid_pager',
            {add:false, edit:false, del:false}, //options
            {},//edit,
            {},//alta
            {},//del
            {}//search
        );


        /******************************** Comienzo Grilla DETALLE CONSULTA CUENTA CORRIENTE *******************************/

        $("#detalles_grid").jqGrid({
            colNames:datos_detalles_grid.colNames(),
            colModel:datos_detalles_grid.colModel(),
            pager: $('#detalles_grid_pager'),
            caption:"Detalle de Obligaciones por Objeto:" ,
            postData:datos_detalles_grid.postData(),
            editurl: "grillas/grillas_abm.php",
            autowidth: true,
            height:305,
            //width: 1280,
            rowNum: 500,
            gridview: false,
            afterInsertRow: function(rowid, rowData, rowelem) {
                if(parse(rowData.i_saldo_abs) < 0){
                    $(this).jqGrid('setCell',rowid,"i_saldo","",{color:'red','font-weight':'bold'});
                }else if (parse(rowData.i_saldo_abs) > 0){
                    $(this).jqGrid('setCell',rowid,"i_saldo","",{color:'green','font-weight':'bold'});
                }
                if(parse(rowData.i_saldoact_abs) < 0){
                    $(this).jqGrid('setCell',rowid,"n_saldo_actualizado_abs","",{color:'red','font-weight':'bold'});
                }else if (parse(rowData.i_saldoact_abs) > 0){
                    $(this).jqGrid('setCell',rowid,"n_saldo_actualizado_abs","",{color:'green','font-weight':'bold'});
                }
            },
            gridComplete: function() {
                var num='';

                if($('#num_fted').val()==null){
                    num='0,00';
                }
                else{
                    fun_formato_numerico($('#num_fted'),'2');
                }

                if($('#num_fted_t').val()==null){
                    num='0,00';
                }
                else{
                    fun_formato_numerico($('#num_fted_t'),'2');
                }

                // Se arman los botones teniendo en cuenta los contenidos de la grilla
                //Botones SI/NO
                $('#detalles_grid tr td[title="#S#"]').html('<button class="btn_con bt_r"></button>');
                $('#detalles_grid tr td[title="#N#"]').html('<button class="btn_con bt_w"></button>');
                $('#detalles_grid tr td[title="##"]').html('<button class="btn_con bt_w"></button>');

                //Quito titulos con codigo de colores
                var campos_sin_titulo = ["m_erronea", "m_intimacion", "m_inspeccion", "m_exencion", "m_pago_provisorio","m_plan_pago","m_pro_acep","m_conc_quieb","m_juicio"];
                $(campos_sin_titulo).each(function(index, element) {
                    $('[aria-describedby="detalles_grid_'+element+'"]').attr('title', '');
                });
            },
            sortname: 'orden',
            sortorder:'desc',
            ondblClickRow : function(rowid){
                var p_n_cuit = $('#detalles_grid').getCell(rowid,'c_contribuyente');
                var p_id_obligacion = $('#detalles_grid').getCell(rowid,'id_obligacion');
                var p_n_pos_fiscal = $('#detalles_grid').getCell(rowid,'n_posicion_fiscal');
                var p_n_cuota = $('#detalles_grid').getCell(rowid,'n_cuota');
                var p_f_actualizaicion = $('#f_actualizacion').val();

                post_to_url('detalle_cuenta_corr.php',{'p_f_actualizacion':p_f_actualizaicion,'p_n_id_menu':10854,'n_cuit':p_n_cuit,'id_obligacion':p_id_obligacion,'n_pos_fiscal':    p_n_pos_fiscal,'n_cuota':p_n_cuota},'_blank','POST');
            },
        }).navGrid('#detalles_grid_pager',
            {add:false, edit:false, del:false}, //options 
            {}, // edit options
            {}, // add options
            {}, // del options 
            {} // search options 
        );

        $("#detalles_grid").jqGrid({
            colModel : [
        {name:'i_saldo_sum',formatter:'currency', formatoptions:{decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2, prefix: "$ "} }
        ]
    });
        /* ******************************** Fin Grilla Consulta Cuenta Corriente ********************************/
        
        $(".div_proc_overlay").css( "zIndex", 800); //Para evitar que oculte los mostrar cuadro

        $('#gbox_detalles_grid .ui-jqgrid-htable th').each(function(){
            var id_info = $(this).attr('id');
            id_info = id_info.replace('detalles_', '');
            var class_det = $('#detalles_grid_info').find('.'+id_info).length;
            if(class_det=='1'){
                $(this).mouseenter(function () {
                    var pos = $(this).position();
                    $('#detalles_grid_info .'+id_info).css({"left":pos.left-100,"position":"absolute"});
                    $('#detalles_grid_info .'+id_info).show();
                });
                $(this).mouseleave(function () {
                    $('#detalles_grid_info .'+id_info).hide();
                });
            }
        });
        
        deshabilitarCamposNoExportables();

        
        if('<?=$m_autoquery?>' == 'S'){
            $('#btn_buscar').click();
        }

       
    });

    function limpiar_barras(cadena){
        return cadena.replace(/\//g,'');
    }

    function error_usuario(){
        post_to_url('principal.php',
            {
                'p_n_id_menu':0,
                'ruta':'[]'
            },
            '_self',
            'POST');
    }

    function obtener_id_sesion(){
        $.ajax({
            url: 'cuenta_corriente/devuelve_sesion.php',
            type:"POST",
            async:false,
            success: function(data){
                ret = eval('('+data+')');
                if(ret != null){
                    id_sesion = ret.V_ID_SESION;
                }else{
                    mostrar_cuadro('E', 'Error del programa. No se pudo obtener el ID de sesion', 'error_usuario()', '', 400, 200);
                }
            }
        });
    }
    function limpia_cuit(texto){
        result=texto.replace(/-/gi,'');
        return result;
    }

    function fun_convierte_pos_fiscal_a_num(string){
        if(string != ''){
            var res = string.split("/");
            var retorno;
            if(res.length >1){
                retorno = res[0] + res[1];
            }else{
                retorno = res[0];
            }
            return retorno;
        }else{
            return string;
        }
    }

    /* evalua que exista el contribuyente en base al cuit y el tipo y nro de doc*/
    function existe_contribuyente_busqueda(cuit,t_doc,n_doc){
        var result;

        $.ajax({
            url: 'cuenta_corriente/ajax_contribuyente.php',
            type:"POST",
            async:false,
            data:{
                "tipo":"existe_contribuyente",
                "cuit":cuit,
                "t_doc":t_doc,
                "n_doc":n_doc
            },
            success: function(data){
                var ret = eval('('+data+')');
                if (ret.id_contribuyente != -1 && ret.id_contribuyente != -2 ){
                    $('#n_cuit').val(limpia_cuit(ret.n_cuit));  
                    $('#n_cuit_mask').val(ret.n_cuit);  
                    $('#denominacion').val(ret.d_denominacion);     
                    $('#c_tipo_documento').val(ret.c_tipo_documento);   
                    $('#d_tipo_documento').val(ret.d_c_tipo_documento);
                    if (ret.n_documento != '0'){
                        $('#n_documento').val(ret.n_documento);
                    }else{
                        $('#n_documento').val(null);
                        $('#c_tipo_documento').val(null);
                    }
                    $('#id_contribuyente').val(ret.id_contribuyente);
                    
                    result=ret.id_contribuyente;
                }else{
                    $('#id_contribuyente').val(null);
                    result= ret.id_contribuyente;
                }
            }
        }); 
        
        return result;
    }

    
    function deshabilitarCamposNoExportables(){
        $('#bt_informe_detalles_grid_pager').click(function(){
            var listas_campos = $('#dialog_tipo_informe_detalles_grid_pager .content_list_pdf li');
            if ($(listas_campos).length > 0){
                var campos_no_exportables = ["m_erronea", "m_intimacion", "m_inspeccion", "m_exencion", "m_pago_provisorio","m_plan_pago","m_pro_acep","m_conc_quieb","m_juicio"];
                
                $(campos_no_exportables).each(function(index, element) {
                    $('#chk_detalles_grid_'+element).prop({'checked': false, 'disabled': 'disabled'});
                });
            }
        });
    }


</script>
<?php
    require_once(INTRANET."footer.php");
?>