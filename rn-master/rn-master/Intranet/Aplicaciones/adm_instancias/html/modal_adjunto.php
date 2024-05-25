<div class="modal fade" id="adjuntos_modal" tabindex="-1" role="dialog" aria-labelledby="adjuntos_title"
     aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="detalle_title">Adjuntos Presentados</h5>
            </div>
            <div class="modal-body">
                <?php require_once FRAMEWORK_PROYECTO_DIR . "Funciones/adjuntar_req/adjuntos.php"; ?>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>