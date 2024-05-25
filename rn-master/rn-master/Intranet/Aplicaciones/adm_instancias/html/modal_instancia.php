<style>
    #ui-datepicker-div {
        z-index: 11000 !important;
        position: absolute !important;
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


<div class="modal fade" id="modal_instancia" tabindex="-1" role="dialog"
     aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="exampleModalLiveLabel">Alta de Instancia</h5>
            </div>

            <div class="modal-body">

                <form id="form_alcance">
                    <div class="row">
                        <div class="form-group col-md-12">
                         <label for="P_ID_INSPECCION">Inspección</label>
                         <div class="input-group ">
                            <input type="TEXT"  class="form-control input-sm input-desc-long" name="p_id_inspeccion" id="p_id_inspeccion" READONLY>
                         </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="p_c_instancia">Instancia:</label>
                            <div class="input-group">
                                <input type="text"  class="form-control input-sm input-cod-short mayusculas validate[required]" id="p_c_instancia" name="p_c_instancia">
                                <input type="text"  class="form-control input-sm input-desc-long"  id="p_d_instancia" name="p_d_instancia" readonly>
                                <span class="input-group-addon btn_lupa" id="btn_inscripcion"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> </span>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="form-group col-md-12 "   style="margin-top: 10px" >
                            <label for="p_f_instancia" class="control-label">Fecha Instancia</label>
                            <div class="input-group" >
                                <input type="text"
                                       class="form-control input-sm text-center validate[required] datepicker"
                                       id="p_f_instancia"
                                       placeholder="(DD/MM/AAAA)"
                                       maxlength="10"
                                       name="p_f_instancia"
                                       autocomplete="off">
                                <span class="input-group-addon">
                                       <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12" style="margin-top: 10px" align="center">
                            <label for="p_observaciones">Observaciones:</label>
                            <div class="input-group col-md-11">
                                <input type="text"   class="form-control input-sm  text-left  "       id="p_observaciones" name="p_observaciones"  >

                            </div>
                        </div>
                    </div>

        </form>
        </div>
            <div class="modal-footer">
                <div class="text-center">
                    <button type="button" class="btn btn-sm" id="btn_abm_instancia"> <span class="glyphicon glyphicon-saved" aria-hidden="true"></span> Aceptar</button>
                    <button type="button" class="btn btn-sm" data-dismiss="modal">Cancelar</button>
                </div>
            </div>

    </div>
    </div>
</div>

<script>
    $(document).ready(function () {


        $("#btn_inscripcion").lupa_generica({
            id_lista: 10717,
            titulos: ['c_dato', 'd_dato'],
            grid: [
                {index: 'c_dato', width: 70},
                {index: 'd_dato', width: 500}
            ],
            caption: 'Instancias',
            filtroNull: true,
            campos: {c_dato: 'p_c_instancia', d_dato: 'p_d_instancia'},
            keyNav: false
        });

        $('#btn_abm_instancia').click(function () {
            if ($('#form_alcance').validationEngine('validate')) {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_id_inspeccion": $('#p_id_inspeccion').val(),
                        "c_instancia":     $('#p_c_instancia').val(),
                        "f_instancia":     $('#p_f_instancia').val(),
                        "observ":          $('#p_observaciones').val(),
                        "id_menu": 10758,
                        "n_orden": 4
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            $('#second_grid').trigger('reloadGrid');
                            $('#modal_instancia').modal('hide');

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