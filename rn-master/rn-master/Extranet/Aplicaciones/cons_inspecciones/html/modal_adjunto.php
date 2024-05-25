<div class="modal fade" id="adjuntos_modal" tabindex="-1" role="dialog" aria-labelledby="adjuntos_title"
     aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="detalle_title">Adjuntos a Presentar</h5>
            </div>
            <div class="modal-body">
                <p style="color: red">Sr. Contribuyente, recuerde que al presentar un Descargo/Recurso perderá la posibilidad de allanarse de manera total a la pretensión fiscal, perdiendo los beneficios de remisión de la multa por omisión de pago </p>
                <input type="hidden" id="modal_id_sol_req">
                <input type="hidden" id="modal_max_adj" value="0">
                <input type="hidden" id="modal_descargo_n_instancia">
                <input type="hidden" id="modal_descargo_n_orden">
                <?php require_once FRAMEWORK_PROYECTO_DIR . "Funciones/adjuntar_req/adjuntos.php"; ?>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-sm" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn-danger" id="btn_confirmar_descargo" style="text-transform: uppercase;font-weight: bold;">Presentar</button>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function () {
        $('#adjuntos_modal').on('shown.bs.modal', function (e) {
            get_max_adjunto()
                .then((res) => {
                    $('#modal_max_adj').val(res);
                });
        });

        $('#adjuntos_modal').on('hidden.bs.modal', function (e) {
            get_max_adjunto()
                .then((res) => {
                    if (res > $('#modal_max_adj').val()){
                        $.ajax({
                            url: FUNCIONES_BASEPATH+"maestro_abm.php",
                            type:"POST",
                            data:{  p_id_tipotransacc: 1041,
                                "id_menu":10736,
                                "n_orden":1
                            },
                            dataType:'json',
                            success: function(response)
                            {
                                $('#modal_id_sol_req').val(null);
                                $('#modal_max_adj').val(0);
                            }
                        });
                    }else{
                        $('#modal_id_sol_req').val(null);
                        $('#modal_max_adj').val(0);
                    }
                });
        });
    });
</script>