<?php
require_once(INTRANET."header.php");
$m_autoquery = $_POST['p_m_autoquery'];

$p_n_cuit = $_POST['p_n_cuit'];

$fecha_hoy = date('d/m/Y');

?>

    <style type="text/css">
        .formError {
            z-index: 15000;
        }

        .ui-jqgrid tr.jqgrow td {
            white-space: pre-wrap !important;
        }

        #dialog_check_tributos{display:none}
        #ul_lista_reporte{width:250px; height: auto;}

        .bt_v{background:#04B404 !important; width:80%; height:18px;}
        .bt_a{background:#FFFF00 !important; width:80%; height:18px;}
        .bt_r{background:#FF0000 !important; width:80%; height:18px;}
        .bt_i{background:#A531A5 !important; width:80%; height:18px;}
        .bt_l{background:#A531A5 !important; width:80%; height:18px;}
        .bt_w{background: #FFFFFF !important; width:80%; height:18px;}

/*        #formid{height: 30px; position: relative; width: 100px;}
        #formid input[type=submit]{position: absolute; top:10%; left:13%;
            background: url('../images/ui-bg_glass_100_f6f6f6_1x400.png') #5c68b2; color: #FFFFFF;}
        #formid input[type=submit]:hover{background: url('../images/ui-bg_glass_100_ffffff_1x400.png') #FFFFFF; color: #5c68b2;}*/


        .text{ margin-right: 0 !important; float: none !important;}

        /*#table_lista_contrib{border-collapse: collpase; border-spacing: 0px; width:100%; }

        #table_lista_contrib{
            border-top: solid 1px #5c68b2;
            border-left: solid 1px #5c68b2;
        }

        #table_lista_contrib tr th{text-align: center}
        #table_lista_contrib tr:hover td{background: #5c68b2; color:#FFFFFF;}

        #table_lista_contrib tr td,
        #table_lista_contrib tr th{
            border-right: solid 1px #5c68b2;
            border-bottom: solid 1px #5c68b2;
            height: 22px;
            padding:0 3px;}*/

        .invisible{position: absolute;}
        .visible{position:relative;}

        #btn_constancia_inscrip{visibility: hidden;}


        .detalle{position:relative;}
        .detalles_info{display: block; position: absolute; bottom: 360px;}
        .detalles_info .inner{position: absolute; display: none; bottom: -110px; background-color: aliceblue;
            width: 220px; text-align: left; padding: 5px; border: 2px solid #787CB8; border-radius: 7px;
            box-shadow: 0px 0px 5px #000;}
        .detalles_info .content{}
        .detalles_info .content p{overflow:hidden;}
        .detalles_info .content p span{float: left; width: 15px; height: 15px; border-radius: 5px; margin-right: 5px;}

        .dropdown-menu{
            max-width: 1px;
        }

        .cDropdown {
            padding: 5px 12px;
            color: #555;
            text-transform: none;
            font-weight: unset;
            font-size: 11px;
            border: 1px solid #c2cad8 !important;
            background-color: white !important;
        }

        .cDropdown :hover{
            background-color: white !important;
            color: #555;
        }
    </style>

    <div id="div_search" class="panel-search">
        <div class="panel panel-primary">
            <a class="btn btn-primary" role="button" data-toggle="collapse" href="#collapse_search" aria-expanded="true" aria-controls="#collapse_search">
                <span class="glyphicon"></span>
            </a>
            <div class="collapse in" id="collapse_search" aria-expanded="true" style="">
                <div class="panel-heading">B&uacute;squeda</div>
                <div class="panel-body">
                    <form id="frm_busqueda">

                        <div class="row">

                            <div id="cuit_div" class="form-group col-md-6">
                                <label for="n_cuit">CUIT</label>
                                <input name="n_cuit" id="n_cuit" type="text" value="<?php echo $n_cuit_mask; ?>" class="validate[required] form-control input-sm text-right"/>
                                <input name="id_contribuyente" id="id_contribuyente"  value="<?php echo $id_contribuyente; ?>" type="hidden"/>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="razon_social">Denominaci&oacute;n/Raz&oacute;n social</label>
                                <input name="razon_social" id="razon_social"   value="<?php echo $d_denominacion; ?>"   type="text" class="validate[required] mayusculas text-left form-control input-sm "/>
                            </div>

                        </div>
                        <div class="row">

                            <div class="form-group col-md-3">
                                <label for="d_tipo_documento">Tipo Documento:</label>
                                <div class="input-group" id="div_input_tipo_documento">
                                    <input type="text" class="form-control mayusculas input-sm input-cod-short" id="c_tipo_documento">
                                    <input type="text" class="form-control input-sm input-desc-long" id="d_c_tipo_documento" readonly>
                                    <span class="input-group-addon btn_lupa" id="lupa_c_tipo_documento">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="n_documento">N&deg; Doc.</label>
                                <input name="n_documento" id="n_documento" type="text" class="form-control input-sm text-right"/>
                            </div>

                            <div class="form-group col-md-3">
                                <label>Tributo:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control input-sm input-cod-short numerico" id="c_tributo_filtro" value="">
                                    <input type="text" class="form-control input-sm input-desc-long" id="d_tributo_filtro" value="" readonly="">
                                    <span class="input-group-addon btn_lupa" id="lupa_c_tributo_filtro">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group col-md-3">
                                <label for="objeto_hecho">N&deg; Objeto</label>
                                <div class="input-group" id="div_ig_objeto">
                                    <input type="hidden" id="cantidad_objetos">
                                    <input name="objeto_hecho" id="objeto_hecho"  type="text" class="mayusculas form-control input-sm"/>
                                    <span class="input-group-addon btn_lupa" id="mascara_lupa_objeto">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span></span>
                                    <span class="input-group-addon btn_lupa" id="lupa_objeto" style="display: none;">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 text-center" style="margin-top: 20px;">
                                <button type='button' class="btn_buscar" id='btn_buscar'></button>
                                <button type='button' class="btn_limpiar" id='btn_limpiar'></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="estado_deuda" data-keyboard="false" data-backdrop="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content col-md-12" >
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Informe de Deuda</h4>
                </div>
                <div class="modal-body" >
                    <form id='frm_estado_deuda'>
                        <div class="row">
                            <div class="form-group col-md-4 col-md-offset-2">
                                <label>Fecha Actualización: (*)</label>
                                <div class="input-group" id="div_rango">
                                    <input name='f_actualizac' id='f_actualizac' type='text' class='form-control datepicker text-center input-sm validate[required]' value="<?=$fecha_hoy?>" readonly/>
                                    <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="c_tipo">Tipo: (*)</label>
                                <select name="c_tipo" id="c_tipo" title="Seleccionar" class="selectpicker form-control input-sm validate[required]" data-style="cDropdown">
                                    <option value="T" selected>Total</option>
                                    <option value="A">Adeudado</option>
                                    <option value="S">Sin Contribuyente</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Tipo Imponible: (*)</label>
                                <div class="input-group" id="div_input_tipo_imponible">
                                    <input type="text" class="form-control input-sm input-cod-short" id="c_tipo_imponible" value="">
                                    <input type="text" class="form-control input-sm input-desc-long validate[required]" id="d_tipo_imponible" value="" readonly="">
                                    <span class="input-group-addon btn_lupa" id="lupa_c_tipo_imponible">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Tributo: (*)</label>
                                <div class="input-group" id="div_input_tributo">
                                    <input type="text" class="form-control input-sm input-cod-short numerico" id="c_tributo" value="">
                                    <input type="text" class="form-control input-sm input-desc-long validate[required]" id="d_tributo" value="" readonly="">
                                    <span class="input-group-addon btn_lupa" id="lupa_c_tributo">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </span>
                                    <input type="hidden" id="d_multa">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label for="objeto_rep">Objeto/Hecho:</label>
                                <div class="input-group" id="div_input_obj_hecho">
                                    <input type="text" class="form-control input-sm" id="objeto_rep" value=''>
                                    <span class="input-group-addon btn_lupa" id="lupa_objeto_rep">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-4 col-md-offset-2">
                                <div class="input-group" id="div_input_pos_fiscal_desde">
                                    <label for="n_pos_fiscal_desde">Pos. Fis.-Cuota Desde:</label>
                                    <input type="text" class="form-control input-sm input-range-left" id="n_pos_fiscal_desde" placeholder="aaaa/mm" maxlength=6>
                                    <input type="text" class="form-control input-sm input-range-right" id="cuota_desde" placeholder="nn" maxlength=2>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <div class="input-group" id="div_input_pos_fiscal_hasta">
                                    <label for="n_pos_fiscal_hasta">Pos. Fis.-Cuota Hasta:</label>
                                    <input type="text" class="form-control input-sm input-range-left" id="n_pos_fiscal_hasta" placeholder="aaaa/mm" maxlength=6>
                                    <input type="text" class="form-control input-sm input-range-right" id="cuota_hasta"  placeholder="nn" maxlength=2>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button id="btn_emitir_estado" class="btn-sm" type="button">
                            <span aria-hidden="true"></span> Emitir Informe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="estado_deuda_res" data-keyboard="false" data-backdrop="false">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content col-md-12" >
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Informe de Deuda Resumido</h4>
                </div>
                <div class="modal-body" >
                    <form id='frm_estado_deuda_res'>
                        <div class="row form-group">
                            <div class="col-md-6 col-md-offset-3">
                                <label for="f_actualizac_res">Fecha Actualización: (*)</label>
                                <div class="input-group" id="div_rango">
                                    <input name='f_actualizac_res' id='f_actualizac_res' type='text' class='form-control datepicker text-center input-sm validate[required]' value="<?=$fecha_hoy?>" readonly/>
                                    <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button id="btn_emitir_estado_res" class="btn-sm" type="button">
                            <span aria-hidden="true"></span> Emitir Informe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="inf_deuda/cons_integral.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">
        var contrib_ar = new Array();

        //obtengo datos de grilla principal
        var datos_main_grid = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
            n_grid:0,
            keyNavigation: false,
            m_autoquery:'N'});

        var v_n_id_menu = <?=$_POST['p_n_id_menu']?>;
        var p_c_usuario = '<?=$_SESSION['usuario']?>';


        $(document).ready(function($) {
            /**** variable global */
            var id_session = '';

            function importe_total(grilla) {
                var ids = $(grilla).jqGrid('getDataIDs');
                var importe_historico;
                var importe_actualizado;
                var a_favor;
                if (ids.length > 0) {
                    importe_historico = ($(grilla).getCell(1, 'i_total_historico'));
                    importe_actualizado = ($(grilla).getCell(1, 'i_total_actualizado'));
                } else {
                    importe_historico = '0,00';
                    importe_actualizado = '0,00';
                }

                if (importe_historico == '') {
                    importe_historico = '0,00';
                }

                if (importe_historico == '') {
                    importe_historico = '0,00';
                }

                if (parseFloat(parse(importe_actualizado)) > 0) {
                    a_favor = 'Contribuyente';
                } else {
                    a_favor = 'ART';
                    importe_actualizado = importe_actualizado.replace('-', '');
                }

                if (parseFloat(importe_historico) < 0) {
                    importe_historico = importe_historico.replace('-', '');
                }

                $(grilla + '_i_saldo_historico').val('$ ' + importe_historico);
                $(grilla + '_i_saldo').val('$ ' + importe_actualizado);
                $(grilla + '_a_favor').val(a_favor);
            }

            crea_botones_frm();
            campos_eventos_frm();

            $('.numerico').keypress(function (tecla) {
                return (tecla.charCode >= 48 && tecla.charCode <= 57);
            });

            $("#n_documento").mask("99999999999");
            $("#n_cuit").mask("99-99999999-9");

            $('#n_pos_fiscal_desde, #n_pos_fiscal_hasta').mask("9999/99");
            $('#cuota_desde, #cuota_hasta').mask("99");
            var currentTime = new Date();
            var startDateTo = new Date(currentTime.getFullYear(),currentTime.getMonth() +1,0);

            $(".datepicker").datepicker(
                {   dateFormat:'dd/mm/yy',
                    changeMonth:true,
                    changeYear:true,
                    minDate: currentTime,
                    maxDate: startDateTo,
                    dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
                })
                .blur(function(){
                    formatearFecha($(this));
                }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}});

            $('#objeto_hecho').on('keyup', function () {
                if ($('#objeto_hecho').val().length >= 3){
                    $('#lupa_objeto').show().css('display', 'table-cell');
                    $('#mascara_lupa_objeto').hide();
                } else {
                    $('#lupa_objeto').hide();
                    $('#mascara_lupa_objeto').show().css('display', 'table-cell');
                }
            });

            $('#mascara_lupa_objeto').click(function (){
                mostrar_validacion('Debe ingresar mínimo 3 caracteres para obtener una lista de valores.');
            });

            $('#btn_buscar').click(function () {
                    if ($('#objeto_hecho').val() && (!$('#id_contribuyente').val())) {
                        fun_ajax_objeto_hecho2();
                    }

                    if ($('#n_cuit').val() && $('#id_contribuyente').val() == '') {
                        fun_ajax_cuit();
                    }

                    if (!($('#n_cuit').val()) && !($('#razon_social').val())) {
                        $('#objeto_hecho').addClass('validate[required]');

                        $('#n_cuit').removeClass('validate[required]');
                        $('#razon_social').removeClass('validate[required]');
                    } else {
                        $('#n_cuit').addClass('validate[required]');
                        $('#razon_social').addClass('validate[required]');

                        $('#objeto_hecho').removeClass('validate[required]');
                    }


                    var valido = $('#frm_busqueda').validationEngine('validate');  // will return true or false
                    if (valido) {

                        $("#frm_busqueda").validationEngine('hideAll');

                        if ($("#id_contribuyente").val() != '') {
                            var existe = 'ERROR';
                            $('#main').procOverlay({visible: true});
                            $.ajax({
                                url: 'inf_deuda/existe.php',
                                type: "POST",
                                data: {
                                    "c_tributo": $("#c_tributo").val(),
                                    "c_tipo_imponible": $("#tipo_imponible").val(),
                                    "id_contribuyente": $("#id_contribuyente").val(),
                                    "d_objeto": $("#objeto_hecho").val()
                                },
                                async: false,
                                success: function (data) {
                                    $('#main').procOverlay({visible: false});
                                    existe = data;

                                    if (existe == 'OK') {
                                        $('#n_cuit').attr('readonly', true);
                                        $("#razon_social").attr('readonly', true);
                                        $('#c_tributo_filtro').attr('readonly',true);
                                        $('#objeto_hecho').attr('readonly', true);
                                        $('#c_tipo_documento').attr('readonly', true);
                                        $('#n_documento').attr('readonly', true);
                                        $('#btn_buscar').attr('disabled', true);
                                        $('#lupa_c_tipo_documento,#lupa_c_tributo_filtro,#lupa_objeto,#mascara_lupa_objeto').hide();
                                        $('#div_ig_objeto').removeClass('input-group');

                                        //ejecuto ajax que traiga datos y dsps hago el append de todo
                                        $('#main').procOverlay({visible: true});
                                        $.post(
                                            "inf_deuda/tributos_ajax.php",
                                            {
                                                "n_cuit": limpia_cuit($("#n_cuit").val()),
                                                "id_contribuyente": $("#id_contribuyente").val(),
                                                "c_tributo": $("#c_tributo").val(),
                                                "c_tipo_imponible": $("#tipo_imponible").val(),
                                                "objeto_hecho": ($("#objeto_hecho").val()).trim()
                                            },
                                            function (data) {//Post que trae datos de los tributos y contribuyente
                                                $('#main').procOverlay({visible: false});
                                                var result = eval('(' + data + ')');
                                                var div_datos_tributos = result.htm;
                                                $('#general, #dialog_check_tributos').remove();
                                                $('#main').append(div_datos_tributos);

                                                if (result.advert != '') {
                                                    mostrar_cuadro('I',
                                                        'Información sobre el Contribuyente.',
                                                        result.advert,
                                                        function () {
                                                            $('#btn_limpiar').click()
                                                        },
                                                        function () {
                                                            $('#btn_limpiar').click()
                                                        }
                                                    );
                                                }

                                                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

                                                    var grid = $(e.target).attr("data-grid");
                                                    var agrup = $(e.target).attr("data-agrup");
                                                    var timp = $(e.target).attr("data-timp");

                                                    if (grid == 'datos_grales') {
                                                        $('#panel_botones').hide();
                                                    } else {
                                                        $('#panel_botones').show();
                                                    }


                                                    if (grid != 'datos_grales') {
                                                        if ($("#" + grid).getGridParam('reccount') > 0) {
                                                            $("#" + grid).jqGrid({//inicializo grilla
                                                                colNames: datos_main_grid.colNames(),
                                                                colModel: datos_main_grid.colModel(),
                                                                pager: $("#" + grid + "_pager"),
                                                                caption: "",
                                                                postData: seteaPostGrilla(timp,<?=$_POST['p_n_id_menu']?>, id_session),
                                                                loadComplete: function (data) {
                                                                    var grilla = "#" + grid;
                                                                    importe_total(grilla);
                                                                },
                                                                gridComplete: function () {
                                                                    //Botones SI/NO
                                                                    $('#' + grid + ' tr td[title="#S#"]').html('<button class="btn_con bt_r"></button>');
                                                                    $('#' + grid + ' tr td[title="#N#"]').html('<button class="btn_con bt_v"></button>');
                                                                }
                                                            }).navGrid("#" + grid + "_pager", {refresh: true});

                                                            $('#gbox_' + grid + ' .ui-jqgrid-htable th').each(function () {
                                                                var id_info = $(this).attr('id');
                                                                id_info = 'grid_' + id_info.replace(grid + '_', '');
                                                                var num = grid.replace('grid_tributos_', '');
                                                                var class_det = $('#detalles_grid_info_' + num).find('.' + id_info).length;
                                                                if (class_det == '1') {
                                                                    $(this).mouseenter(function () {
                                                                        var pos = $(this).position();
                                                                        $('#detalles_grid_info_' + num + ' .' + id_info).css({
                                                                            "left": pos.left - 100,
                                                                            "position": "absolute"
                                                                        });
                                                                        $('#detalles_grid_info_' + num + ' .' + id_info).show();
                                                                    });
                                                                    $(this).mouseleave(function () {
                                                                        $('#detalles_grid_info_' + num + ' .' + id_info).hide();
                                                                    });
                                                                }
                                                            });
                                                        } else {
                                                            /*id_session = ret.p_id_session;*/
                                                            $("#" + grid).jqGrid({//inicializo grilla
                                                                colNames: datos_main_grid.colNames(),
                                                                colModel: datos_main_grid.colModel(),
                                                                pager: $("#" + grid + "_pager"),
                                                                caption: "",
                                                                postData: seteaPostGrilla(timp,<?=$_POST['p_n_id_menu']?>, id_session),
                                                                loadComplete: function (data) {

                                                                    var grilla = "#" + grid;
                                                                    importe_total(grilla);
                                                                },
                                                                gridComplete: function () {
                                                                    //Botones SI/NO
                                                                    $('#' + grid + ' tr td[title="#S#"]').html('<button class="btn_con bt_r"></button>');
                                                                    $('#' + grid + ' tr td[title="#N#"]').html('<button class="btn_con bt_v"></button>');
                                                                }
                                                            }).navGrid("#" + grid + "_pager", {refresh: true});

                                                            $('#gbox_' + grid + ' .ui-jqgrid-htable th').each(function () {
                                                                var id_info = $(this).attr('id');
                                                                id_info = 'grid_' + id_info.replace(grid + '_', '');
                                                                var num = grid.replace('grid_tributos_', '');
                                                                var class_det = $('#detalles_grid_info_' + num).find('.' + id_info).length;
                                                                if (class_det == '1') {
                                                                    $(this).mouseenter(function () {
                                                                        var pos = $(this).position();
                                                                        $('#detalles_grid_info_' + num + ' .' + id_info).css({
                                                                            "left": pos.left - 100,
                                                                            "position": "absolute"
                                                                        });
                                                                        $('#detalles_grid_info_' + num + ' .' + id_info).show();
                                                                    });
                                                                    $(this).mouseleave(function () {
                                                                        $('#detalles_grid_info_' + num + ' .' + id_info).hide();
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        var gridParentWidth;
                                                        gridParentWidth = $('#gbox_'+ grid).parent().width();
                                                        $('#' + grid).setGridWidth(gridParentWidth);


                                                    }

                                                });

                                                crea_botones_tabs();

                                                $('#btn_cta_cte').click(function () {
                                                    post_to_url('consulta_cuenta_corr.php', {
                                                        'p_n_id_menu': 10852,
                                                        'id_contribuyente': $('#id_contribuyente').val(),
                                                        'p_m_autoquery': 'S'
                                                    }, '_blank');

                                                });

                                                $('#btn_estado_deuda').click(function () {
                                                    $("#estado_deuda").modal('show');
                                                });

                                                $('#btn_estado_deuda_res').click(function () {
                                                    $("#estado_deuda_res").modal('show');
                                                });

                                                $('#btn_emitir_estado_res').click(function () {

                                                    if ($('#frm_estado_deuda_res').validationEngine('validate')){

                                                        var id_contribuyente = $('#id_contribuyente').val();
                                                        var f_actualizac = $('#f_actualizac_res').val();

                                                        $('#main').procOverlay({visible: true});

                                                        $.ajax({
                                                            type:'POST',
                                                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                                            data:{
                                                                "p_fecha_act": f_actualizac,
                                                                "p_id_contribuyente": id_contribuyente,
                                                                "p_c_tributo": null,
                                                                "p_d_objeto_hecho": null,
                                                                "p_pos_desde":null,
                                                                "p_pos_hasta":null,
                                                                "p_cta_desde":null,
                                                                "p_cta_hasta":null,
                                                                "p_tipo":'A',
                                                                "p_rep":'RES',
                                                                "id_menu":10856,
                                                                "n_orden":0
                                                            },
                                                            dataType:'json',
                                                            success: function( data ) {
                                                                if(data.resultado == 'OK'){
                                                                    llamar_report('INF_DEU_RES', 'p_n_lote|'+data.p_n_lote, 'PDF');
                                                                    $("#estado_deuda_res").modal('hide');
                                                                }
                                                                else{
                                                                    mostrar_cuadro('E', 'Error', data.resultado);
                                                                    return;
                                                                }
                                                            }
                                                        });
                                                    }
                                                });

                                                $('#btn_emitir_estado').click(function () {

                                                    if ($('#frm_estado_deuda').validationEngine('validate')){

                                                        var id_contribuyente = $('#id_contribuyente').val();
                                                        var f_actualizac = $('#f_actualizac').val();

                                                        if ($('#c_tipo').val() == 'S'){
                                                            if (!$('#objeto_rep').val()){
                                                                mostrar_validacion('Debe ingresar un Objeto/Hecho para el informe tipo "Sin Contribuyente".');
                                                                return;
                                                            }else{
                                                                id_contribuyente = null;
                                                            }
                                                        }

                                                        $('#main').procOverlay({visible: true});

                                                        $.ajax({
                                                            type:'POST',
                                                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                                            data:{
                                                                "p_fecha_act": f_actualizac,
                                                                "p_id_contribuyente": id_contribuyente,
                                                                "p_c_tributo": $('#c_tributo').val(),
                                                                "p_d_objeto_hecho": $('#objeto_rep').val(),
                                                                "p_pos_desde":fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_desde').val()),
                                                                "p_pos_hasta":fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_hasta').val()),
                                                                "p_cta_desde":$('#cuota_desde').val(),
                                                                "p_cta_hasta":$('#cuota_hasta').val(),
                                                                "p_tipo":$('#c_tipo').val(),
                                                                "p_rep":'DET',
                                                                "id_menu":10856,
                                                                "n_orden":0
                                                            },
                                                            dataType:'json',
                                                            success: function( data ) {
                                                                if(data.resultado == 'OK'){
                                                                    llamar_report('INF_DEU_DET', 'p_n_lote|'+data.p_n_lote, 'PDF');
                                                                    $("#estado_deuda").modal('hide');
                                                                }
                                                                else{
                                                                    mostrar_cuadro('E', 'Error', data.resultado);
                                                                    return;
                                                                }
                                                            }
                                                        });
                                                    }
                                                });


                                                $('#main').procOverlay({visible: false});

                                            });//finaliza  el post a tributos y datos contribuyente

                                    } else {
                                        mostrar_cuadro('I', 'Advertencia', 'El objeto ingresado en la búsqueda no esta asociado al contribuyente seleccionado', '', '', 400, 200);
                                    }
                                }
                            });

                        } else {
                            if ($('#objeto_hecho').val() != '') {
                                if(!$('#cantidad_objetos').val()) {
                                    mostrar_cuadro('I', 'Alerta', 'El objeto ingresado no tiene un contribuyente asociado, porfavor verifique los datos ingresados');
                                }else {
                                    mostrar_cuadro('I', 'Atención', 'El objeto ingresado posee más de un contribuyente asociado, por favor seleccione el correspondiente.');
                                }
                            } else {
                                $('#main').procOverlay({visible: false});
                                mostrar_cuadro('I', 'Alerta', 'El contribuyente que desea consultar no existe, por favor verifique los datos ingresados.');
                            }
                        }
                    }
            });//finaliza evento click del boton buscar

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
                campos:{c_codigo:'c_tipo_documento',d_descrip:'d_c_tipo_documento'},
                keyNav:true,
                onClose: function(){
                    $('#n_documento').val('');
                }
            });

            //LUPA TRIBUTO FILTROS
            $("#lupa_c_tributo_filtro").lupa_generica({
                id_lista:<?=fun_id_lista('LISTADO TRIBUTOS X CTES SIN TIMP');?>,
                titulos:['C&oacute;digo','Descripci&oacute;n'],
                grid:[{index:'c_codigo',width:100},
                    {index:'d_descrip',width:290}],
                caption:'Tributos',
                sortname:'c_codigo',
                sortorder:'asc',
                filtros:['#id_contribuyente'],
                filtrosNulos:[true],
                searchInput: '#c_tributo_filtro',
                searchCode: true,
                campos:{c_codigo:'c_tributo_filtro',d_descrip:'d_tributo_filtro'},
                keyNav:true,
                limpiarCod:true,
                onClose: function(){
                    if (!$('#c_tributo_filtro').val()){
                        $('#objeto_hecho').val(null)/*.attr('disabled',true)*/;
                    }/*else{
                        $('#objeto_hecho').attr('disabled',false);
                    }*/
                }
            });

            //LUPA OBJETO FILTROS
            $("#lupa_objeto").lupa_generica({
                id_lista:<?=fun_id_lista('LISTADO DE OBJETOS X TRIB/CTE');?>,
                titulos:['Objeto','CUIT','Denominacion',
                    'F. Desde','F. Hasta',
                    'c_tipo_documento','d_tipo_documento',
                    'n_documento','id_contribuyente'],
                grid:[{index:'objeto',width:100},
                    {index:'cuit',width:125},
                    {index:'d_denominacion',width:250},
                    {index:'f_vig_desde',width:100},
                    {index:'f_vig_hasta',width:100},
                    {index:'c_tipo_documento',hidden:true},
                    {index:'d_tipo_documento',hidden:true},
                    {index:'n_documento',hidden:true},
                    {index:'id_contribuyente',hidden:true}],
                campos:{objeto:'objeto_hecho',
                    cuit:'n_cuit', d_denominacion:'razon_social',
                    c_tipo_documento:'c_tipo_documento',d_tipo_documento:'d_c_tipo_documento',
                    n_documento:'n_documento',id_contribuyente:'id_contribuyente'},
                caption:'Objetos/Hechos',
                sortname:'objeto',
                sortorder:'asc',
                filtros:['#c_tributo_filtro','#id_contribuyente','#objeto_hecho'],
                filtrosNulos:[false,true,true],
                filtrosTitulos:['Tributo','CUIT','Nro. Objeto'],
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
                limpiarCod: true,
                onClose: function(){
                    $('#c_tributo').val(null);
                    $('#d_tributo').val(null);
                    if( $('#id_contribuyente').val() == ''){
                        $('#id_contribuyente').val(null);
                    }
                }
            });

            $("#lupa_c_tributo").lupa_generica({
                id_lista:<?=fun_id_lista('LISTADO DE SUBTRIBUTOS POR CONTRIBUYENTE Y OBJETOS');?>,
                titulos:['Cód. Tributo','Tributo'],
                grid:[	{index:'c_codigo',width:150},
                    {index:'d_descrip',width:400}],
                caption:'Lista de Tributos',
                sortname:'d_descrip',
                sortorder:'desc',
                filtros:['#c_tipo_imponible','#id_contribuyente'],
                filtroNull:false,
                campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
                keyNav:true,
                searchInput: '#c_tributo',
                searchCode: true,
                limpiarCod: true,
                onClose: function(){
                }
            });

            $("#lupa_objeto_rep").lupa_generica({
                id_lista:<?=fun_id_lista('LISTADO DE OBJETOS HECHOS CONSULTA CTA CTE');?>,
                titulos:['Descripción Objeto-Hecho'],
                grid:[{index:'d_objeto_hecho',width:250}],
                caption:'Lista de Objetos - Hechos',
                sortname:'d_objeto_hecho',
                sortorder:'asc',
                filtroNull:false,
                filtros:['#c_tipo_imponible','#c_tributo','#id_contribuyente'],
                campos:{d_objeto_hecho:'objeto_rep'},
                keyNav:true
            });

            $('#estado_deuda').on('hidden.bs.modal', function () {
                $('#c_tipo_imponible').val('');
                $('#d_tipo_imponible').val('');
                $('#c_tributo').val('');
                $('#d_tributo').val('');
                $('#objeto_rep').val('');
                $('#c_tipo').selectpicker('val','T');
                $('#c_tipo').selectpicker();
                $('#c_tipo_imponible ,#d_tipo_imponible, #lupa_c_tipo_imponible, #c_tributo, #d_tributo, #lupa_c_tributo').attr('disabled',false);
            });

            $('#c_tipo_documento').change(function(){
                if  ($('#c_tipo_documento').val()) $('#n_documento').val(null);
            });

            //-- fin lupas de frm_busqueda


            //autocomplete campo razon_social y objeto hecho
            $("#razon_social").autocomplete({
                oper:1,
                map: function(item) {
                    return {
                        label: item.razon_social + ' - ' + item.cuit,
                        value: item.razon_social,
                        id_contribuyente : item.id_contribuyente,
                        razon_social:item.razon_social,
                        c_tipo_documento:item.c_tipo_documento,
                        d_c_tipo_documento:item.d_c_tipo_documento,
                        n_documento:item.n_documento,
                        cuit: item.cuit
                    }
                },
                select:function(event,ui){
                    $('#n_cuit').val(limpia_cuit(ui.item.cuit));
                    $("#id_contribuyente").val(ui.item.id_contribuyente);
                    $("#razon_social").val(ui.item.razon_social);
                    $("#c_tipo_documento").val(ui.item.c_tipo_documento);
                    $("#d_c_tipo_documento").val(ui.item.d_c_tipo_documento);
                    $("#n_documento").val(ui.item.n_documento);
                    return false; // Prevent the widget from inserting the value.
                }
            });
        });
    </script>
<?php
require_once(INTRANET."footer.php");
?>