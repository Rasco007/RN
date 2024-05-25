<div class="modal fade" id="modal_abm_alcance" tabindex="-1" role="dialog"
     aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="exampleModalLiveLabel">Alta de Alcance</h5>
            </div>
            <div class="modal-body">
                <form id="form_alcance">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label for="d_objeto_hecho">Inscripción</label>
                            <div id="div_ent_filtro" class="input-group">
                                <input type="text" name="p_id_inspeccion" id="p_id_inspeccion" hidden="">
                                <input type="text" name="p_id_contribuyente" id="p_id_contribuyente" hidden="">
                                <input type="text" name="p_d_objeto_hecho" id="p_d_objeto_hecho" hidden="">
                                <input type="text" name="p_c_tributo" id="p_c_tributo" hidden="">
                                <input type="text" id="d_inscripcion" name="d_inscripcion"
                                       class="form-control input-sm validate[required]" readonly="true">
                                <span class="input-group-addon btn_lupa" id="btn_inscripcion">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12" style="margin-top: 10px">
                            <div class="row col-md-6 form-group">
                                <label for="n_pos_fiscal_desde" class="control-label">Posición Fiscal Desde</label>
                                <div class="input-group" id="div_input_pos_fiscal_desde">
                                    <input type="text" id="n_pos_fiscal_desde" placeholder="aaaa" maxlength="4"
                                           value="" autocomplete="off"
                                           class="form-control input-sm input-range-left validate[required]">
                                    <input type="text"
                                           class="form-control input-sm input-range-right validate[required]"
                                           id="cuota_desde"
                                           placeholder="nn" maxlength="2" value="" autocomplete="off">
                                </div>
                            </div>
                            <div class="row col-md-6 form-group" style="float: right;">
                                <label for="n_pos_fiscal_hasta" class="control-label">Posición Fiscal Hasta</label>
                                <div class="input-group" id="div_input_pos_fiscal_hasta">
                                    <input type="text" id="n_pos_fiscal_hasta" placeholder="aaaa" maxlength="4"
                                           value="" autocomplete="off"
                                           class="form-control input-sm input-range-left validate[required]">
                                    <input type="text"
                                           class="form-control input-sm input-range-right validate[required]"
                                           id="cuota_hasta"
                                           placeholder="nn" maxlength="2" value="" autocomplete="off">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="text-center">
                    <button type="button" class="btn btn-sm" id="btn_add_alcance"><span
                                class="glyphicon glyphicon-saved" aria-hidden="true"></span> Agregar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function () {
        $('#n_pos_fiscal_desde').mask('9999');
        $('#cuota_desde').mask('99');
        $('#n_pos_fiscal_hasta').mask('9999');
        $('#cuota_hasta').mask('99');

        $('#modal_abm_alcance').on('hidden.bs.modal', function (e) {
            $('#modal_abm_alcance input').not(document.getElementById("p_id_inspeccion")).val(null);
        });

        $("#btn_inscripcion").lupa_generica({
            id_lista: 10861,
            titulos: ['c_codigo', 'Objeto', 'Descripción'],
            grid: [
                {index: 'c_tributo', width: 70, hidden: true},
                {index: 'd_objeto_hecho', width: 100, hidden: true},
                {index: 'd_descrip', width: 500}
            ],
            caption: 'Lista de Inscripciones',
            filtroNull: false,
            filtros: ['#p_id_contribuyente'],
            campos: {d_objeto_hecho: 'p_d_objeto_hecho', d_descrip: 'd_inscripcion', c_tributo: 'p_c_tributo'},
            keyNav: true
        });

        $('#btn_add_alcance').click(function () {
            if ($('#form_alcance').validationEngine('validate')) {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_id_inspeccion": $('#p_id_inspeccion').val(),
                        "p_c_tributo": $('#p_c_tributo').val(),
                        "p_d_objeto_hecho": $('#p_d_objeto_hecho').val(),
                        "p_n_pos_fiscal_desde": $('#n_pos_fiscal_desde').val(),
                        "p_n_cuota_desde": $('#cuota_desde').val(),
                        "p_n_pos_fiscal_hasta": $('#n_pos_fiscal_hasta').val(),
                        "p_n_cuota_hasta": $('#cuota_hasta').val(),
                        "p_oper": 'add',
                        "id_menu": 10753,
                        "n_orden": 0
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            $('#detail_grid').trigger('reloadGrid');
                            $('#modal_abm_alcance').modal('hide');
                        } else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }
        });
    });
</script>