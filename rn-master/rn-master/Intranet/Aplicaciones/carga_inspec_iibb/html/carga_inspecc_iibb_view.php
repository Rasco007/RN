<style>
    .form-horizontal .control-label{
        text-align: left;
    }

    .c-input-group {
        display: table;
        border-collapse: separate;
    }
    .c-input-group, .input-group-btn, .input-group-btn > .btn {
        position: relative;
    }

    .obl_allanada{
        color: #008000;
        font-weight:bold;
    }

    .dj_posterior{
        background-color:yellow
    }

    .anul_saf_fist_pos{
        color:red;
    }

    .m_pago_prov_jcq_pfp{
        color: yellow;
    }

</style>

<div class="panel panel-primary">
    <div id="planilla_iibb" class="panel-heading"> Datos de la Planilla de Fiscalización  Version N°: <?=$version?></div>
    <div class="panel-body">
        <form class="form-horizontal" id="frm_liq_iibb">
            <div class="form-group">
                <label for="n_cuit" class="col-sm-2 control-label">CUIT</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control input-sm text-center" id="n_cuit" placeholder="" disabled value="<?=$n_cuit?>">
                </div>
                <label for="d_denominacion" class="col-sm-2 control-label">Denominación</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control input-sm" id="d_denominacion" placeholder="" disabled value="<?=$d_denominacion?>">
                </div>
            </div>
            <div class="form-group">
                <label for="d_expediente" class="col-sm-2 control-label">Expediente</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control input-sm text-right" id="d_expediente" placeholder="Expediente Relacionado" maxlength="11" disabled value="<?=$d_expediente?>" >
                </div>
                <label for="f_vto" class="col-sm-2 control-label aplicacion_automatica">F. Actualización</label>
                <div class="col-sm-2 c-input-group" >
                    <input type="input" class="form-control input-sm text-center input_fecha validate[required]" id="f_vto" placeholder="DD/MM/AAAA" value="<?=$f_actualizacion?>">
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span>  </span>
                </div>
                <div class="form-group col-sm-2 text-left">
                    <button type="button" id="btn_generar" class="btn-danger btn-m" style="float: right;">Actualizar Saldos</button>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="panel panel-primary">
    <div id="obligaciones_grid_div" class="panel-heading"> Obligaciones de Ingresos Brutos</div>
    <div class="panel-body">
        <div class="form-group" style="margin-bottom: 4rem !important;">
            <span class="col-sm-3">
                <label for="n_inscripción" class="col-sm-7 control-label" style="height: 3rem; padding-top: 0.5em;">Número de Inscripción</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control input-sm text-center" id="n_inscripción" disabled>
                </div>
            </span>
            <span class="col-sm-5">
                <label for="d_reg_act_cat" class="col-sm-3 control-label" style="height: 3rem; padding-top: 0.5em;">Reg. Act. Cat.</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control input-sm text-center" id="d_reg_act_cat" disabled>
                </div>
            </span>
            <span class="col-sm-4">
                <label for="n_posicion_fiscal" class="col-sm-4 control-label" style="height: 3rem; padding-top: 0.5em;">Posición Fiscal</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control input-sm text-center" id="n_posicion_fiscal" disabled>
                </div>
            </span>
        </div>
        <table id='obligaciones_grid' class='scroll table table-bordered' ></table>
        <div id='obligaciones_grid_pager' class='scroll' style='text-align:center;'></div>
    </div>
</div>

<div class="row text-center" id="div_acciones">
    <button id="btn_rec_pagos" type="button" class="btn btn-sm" style="border-radius: 3px">
                        <span class="glyphicon glyphicon-download-alt" aria-hidden="true">
                        </span> Recuperar Pagos
    </button>
    <button id="btn_rec_deducciones" type="button" class="btn btn-sm" style="border-radius: 3px">
                        <span class="glyphicon glyphicon-download-alt" aria-hidden="true">
                        </span> Recuperar Deducciones
    </button>
    <button id="btn_del_verif" type="button" class="btn btn-sm" style="border-radius: 3px">
                        <span class="glyphicon glyphicon-remove-sign" aria-hidden="true">
                        </span> Eliminar Actividades BI 0
    </button>
    
    <div class="row text-center">
        <br >
        <button type='button' id='btn_fin_carga' class="btn-sm btn-info">Finalizar Carga</button>
    </div>
    
</div>

<div class="modal fade" id="modal_deducciones" tabindex="-1" role="dialog" aria-labelledby="detalle_title" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="detalle_title">Origen Deducciones</h5>
            </div>
            <div class="modal-body">
                <form id="form_deducciones">
                    <div class="form-group">
                        <label for="deduccion_origen">Origen (*)</label>
                        <select name="deduccion_origen" id="deduccion_origen" data-live-search="false" title="Seleccionar" class="selectpicker form-control input-sm validate[required]" data-style="cDropdown">
                            <!--<option value=""></option>-->
                            <option value="C">Contribuyente</option>
                            <option value="A">Agente</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="btn_acep_deduccion" type="button" class="btn btn-secondary">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        $('#modal_deducciones').on('shown.bs.modal', function (e) {
            $('#deduccion_origen').val(null);
            $('#deduccion_origen').selectpicker('refresh');
        });

        $('#btn_acep_deduccion').click(function () {
            if ($('#form_deducciones').validationEngine('validate')){
                mostrar_mensaje_modal('C','Obtener Deducciones','Todas las deducciones seran reemplazadas.<br>¿Desea Continuar?',
                    function () {
                        $('#main').procOverlay({visible:true,zIndex:59000});
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{
                                "p_n_instancia":v_n_instancia,
                                "p_n_orden":v_n_orden,
                                "p_origen":$('#deduccion_origen').val(),
                                "id_menu":v_id_menu,
                                "n_orden":2
                            },
                            dataType:'json',
                            success: function( data ) {
                                $('#main').procOverlay({visible: false});
                                if(data.resultado == 'OK'){
                                    $('#modal_deducciones').modal('hide');
                                    $('#obligaciones_grid').trigger('reloadGrid');
                                }
                                else{
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        });
                    },function () {return;})
            }
        });
    });
</script>