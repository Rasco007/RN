<!--DIV BUSQUEDA-->
<div id="div_search" class="panel-search">
    <div class="panel panel-primary">
        <a class="btn btn-sm" role="button" data-toggle="collapse" href="#collapse_search" aria-expanded="true" aria-controls="#collapse_search">
            <span class="glyphicon"></span>
        </a>
        <div class="collapse in" id="collapse_search" aria-expanded="true" style="">
            <div class="panel-heading">B&uacute;squeda</div>
            <div class="panel-body">
                <form id='frm_consulta'>
                    <div class="row form-group">
                        <div class="col-md-2">
                            <label for="n_cuit" class="control-label">CUIT</label>
                            <input type="text" class="form-control input-sm text-center" id="n_cuit" placeholder="">
                            <input type="hidden" class="form-control input-sm text-center" id="id_contribuyente" placeholder="">
                        </div>
                        <div class="col-md-5">
                            <label for="d_denominacion" class="control-label">Denominación</label>
                            <input type="text" class="form-control input-sm" id="d_denominacion" placeholder="">
                        </div>
                        <div class="col-md-3">
                            <label for="tipo_mensaje" class="control-label">Tipo</label>
                            <select id="tipo_mensaje" data-live-search="true" title="Seleccionar" class="selectpicker form-control input-sm" data-style="cDropdown">
                                <option value=""></option>
                                <?php foreach ($tipos_msj as $tipo_msj): ?>
                                    <option value="<?=$tipo_msj['C_DATO']; ?>"> <?=$tipo_msj['D_DATO']; ?> </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="col-md-2 text-center" style="margin-top: 18px">
                            <button type='button' class="btn-sm btn_buscar" id='btn_buscar'></button>
                            <button type='button' class="btn-sm btn_limpiar" id='btn_limpiar'></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--GRILLA PRINCIPAL-->
<div id="seccion_1">
    <table id='main_grid' class='scroll' cellpadding='0'><tr><td>&nbsp;</td></tr></table>
    <div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
    <div id="leyenda_mensajes">
        <span class="leyenda_grilla">Haga doble-click sobre la fila para visualizar el mensaje asociado.</span>
    </div>
    <br>
    <div class="text-center">
        <?php if($permisos[0]['AUT_ALTA_MSJ_VE']==='S' && $p_modo != 'C') { ?>
            <button type='button' class="btn btn-sm" id='btn_nuevo_msj' ><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Generar Mensaje </button>
            <button type='button' class="btn btn-sm" id='btn_editar_msj'  style="display: none;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar Mensaje  </button>
            <button type='button' class="btn btn-sm" id='btn_borrar_msj'  style="display: none;"><span class="glyphicon glyphicon-trash" aria-hidden="true" ></span> Borrar Mensaje </button>
        <?}?>
        <?php if($permisos[0]['AUT_MSJ_VE']==='S'&& $p_modo != 'C') { ?>
            <button type='button' class="btn btn-sm" id='btn_autorizar_msj'  style="display: none;"><span class="glyphicon glyphicon-check" aria-hidden="true" ></span> Autorizar Mensaje </button>
        <?}?>

        <?php if($permisos[0]['AUT_ENVIAR_MSJ_VE']==='S'&& $p_modo != 'C') { ?>
            <button type='button' class="btn btn-sm" id='btn_enviar_msj'  style="display: none;"><span class="glyphicon glyphicon-send" aria-hidden="true" ></span> Enviar Mensaje </button>
        <?}?>
        <?php if($permisos[0]['AUT_ANULAR_MSJ_VE']==='S'&& $p_modo != 'C') { ?>
            <button type='button' class="btn btn-sm" id='btn_anular_msj'  style="display: none;"><span class="glyphicon glyphicon-remove" aria-hidden="true" ></span> Anular Mensaje </button>
        <?}?>
        <?php if($permisos[0]['AUT_NOTIF_FALTA_DFE']==='S'&& $p_modo != 'C') { ?>
            <button type='button' class="btn btn-sm" id='btn_notif_falta_dfe' ><span class="glyphicon glyphicon-duplicate" aria-hidden="true" ></span> Notificar Falta DFE </button>
        <?}?>
    </div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="modal_mensaje_vent" data-keyboard="false" data-backdrop="static" >
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content col-md-12">
            <div class="modal-header">
                <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
                <h4 class="modal-title" id="id_titulo"></h4>
            </div>
            <div class="modal-body">
                <div class="panel panel-primary">
                    <textarea style="display: none;" id="txt_mensaje_lectura_hide" class="validate[required]" class="sr-only"></textarea>
                    <textarea id="txt_mensaje_lectura"></textarea>
                </div>
                <div class="row" style="display: none">
                    <div class="form-group col-md-12">
                        <input id="id_sol_req_cons" type="text" readonly style="display: none">
                    </div>
                </div>
                <!-- Botones genéricos del mensaje -->
                <div id="row_botones_msj" class="row-search text-center" style="margin-top: 5px;margin-bottom: 5px;">
                    <button type="button" id="btn_cerrar_msj" class="btn btn-sm" data-dismiss="modal">
                        <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> Cerrar Mensaje
                    </button>
                    <button type="button" id="btn_consulta_adjuntos" class="btn btn-sm">
                        <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Ver Adjuntos
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" tabindex="-1" role="dialog" id="modal_redactar_msj" data-keyboard="false" data-backdrop="static" >
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content col-md-12">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"> Redactar Mensaje </h4>
            </div>
            <div class="modal-body">
                <!-- Editor de texto enriquecido -->
                <div class="panel-body">
                    <textarea style="display: none;" id="txt_mensaje_contestar_hide" class="sr-only"></textarea>
                    <textarea id="txt_mensaje_contestar"></textarea>
                    <div class="mce-tinymce mce-container mce-panel" style="border-width: 0px 1px 1px;">
                        <div class="mce-container-body mce-stack-layout">
                            <div class="mce-container-body mce-flow-layout">
                                <div class="mce-path mce-flow-layout-item mce-first" style="padding-top: 0px; padding-bottom: 0px;">
                                    <span>Caracteres restantes:</span> <span id="chars_left"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="row_botones_redactar_msj" class="row-search text-center" style="margin-bottom: 15px;">
                <button type="button" id="btn_cerrar_redactar_msj" class="btn btn-sm" data-dismiss="modal">
                    <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> Cerrar Mensaje
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="modal_nuevo_mensaje" data-keyboard="false" data-backdrop="static" >
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content col-md-12">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"> Nuevo Mensaje </h4>
            </div>
            <div class="modal-body">
                <form id='frm_nuevo_msj'>
                    <div id="div_individual" class="row">
                        <input type="text" class="form-control input-sm" id="id_conversacion_form" style="display: none">
                        <div class="form-group col-md-3">
                                <label for="n_cuit_form">CUIT Contribuyente (*):</label>
                                <input name='n_cuit_form' id='n_cuit_form' type='text' class='form-control input-sm text-right' style="text-align: center;" />
                                <input name='id_contribuyente_form' id='id_contribuyente_form' type='hidden' class='sr-only'/>
                            </div>
                        <div class="form-group col-md-9">
                                <label for="denominacion_form">Denominaci&oacute;n Contribuyente (*):</label>
                                <input type="text" class="form-control input-sm" id="denominacion_form">
                            </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-6">
                                <label for="tipo_msj_form" class="control-label">Tipo de Mensaje (*) </label>
                                <select id="tipo_msj_form" data-live-search="true" title="Seleccionar" class="selectpicker form-control input-sm" data-style="cDropdown">
                                    <?php foreach ($tipos_msj as $tipo_msj): ?>
                                        <option value="<?=$tipo_msj['C_DATO']; ?>"> <?=$tipo_msj['D_DATO']; ?> </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        <div class="form-group col-md-6">
                                <label>Fecha de Publicación:</label>
                                <div class="input-group" id="div_rango">
                                    <input name='f_publ_desde_form' id="f_publ_desde_form" type='text' class='form-control datepicker text-center input-sm' style='z-index: 10051'/>
                                    <div class="input-group-addon">hasta:</div>
                                    <input name='f_publ_hasta_form' id='f_publ_hasta_form' type='text' class='form-control datepicker text-center input-sm' style='z-index: 10051'/>
                                </div>
                            </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="ori_msj_form" class="control-label">Origen del Mensaje</label>
                            <select id="ori_msj_form" data-live-search="true" title="Seleccionar" class="selectpicker form-control input-sm" data-style="cDropdown">
                                    <option value=""></option>
                                    <?php foreach ($origenes_msj as $origen_msj): ?>
                                            <option value="<?=$origen_msj['C_DATO']; ?>"> <?=$origen_msj['D_DATO']; ?> </option>
                                    <?php endforeach; ?>
                                </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="d_referencia_form" >Referencia:</label>
                            <input id="d_referencia_form" type="text" class="form-control input-sm" maxlength="30">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="d_asunto_form">Asunto del Mensaje (*):</label>
                            <input id="d_asunto_form" type="text" class="validate[required] form-control input-sm" maxlength="100">
                        </div>
                    </div>
                    <div class="row" style="display: none">
                        <div class="form-group col-md-12">
                            <input id="id_sol_req_form" type="text" readonly style="display: none">
                        </div>
                    </div>
                </form>
            </div>
            <div id="row_botones_nuevo_msj" class="row-search text-center" style="margin-bottom: 15px;">
                <button type="button" id="btn_abrir_redactar_msj" class="btn btn-sm" data-dismiss="modal">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar Mensaje
                </button>
                <button type="button" id="btn_abrir_adjuntos_msj" class="btn btn-sm">
                    <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Adjuntar Archivos
                </button>
                <button type="button" id="btn_guardar_msj" class="btn btn-sm" >
                    <span class="glyphicon glyphicon-save" aria-hidden="true"></span> Guardar Mensaje
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="adjuntos_modal" tabindex="-1" role="dialog" aria-labelledby="adjuntos_title"
     aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="detalle_title">Adjuntos a Enviar</h5>
            </div>
            <div class="modal-body">
                <input type="hidden" id="modal_id_sol_req">
                <input type="hidden" id="modal_max_adj" value="0">
                <?php require_once FRAMEWORK_PROYECTO_DIR . "Funciones/adjuntar_req/adjuntos.php"; ?>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>