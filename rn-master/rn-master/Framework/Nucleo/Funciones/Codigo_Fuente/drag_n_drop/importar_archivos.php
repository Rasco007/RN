
<div id="modal_importacion_archivo" class="modal fade " tabindex="-1" role="dialog" >
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Importar Archivo</h4>
            </div>
            <div class="modal-body">
                <div class="panel panel-primary">
                    <div style="cursor: context-menu;" class="panel-heading">
                        Carga de Archivo
                    </div>
                    <div class="panel-body">
                        <form action='#' class='dropzone needsclick dz-clickable' id='frm_drag_n_drop' name='frm_drag_n_drop' method='post'  enctype='multipart/form-data'>
                            <div class='fallback input-group'>
                                <label class="input-group-btn">
                                    <span class="btn btn-primary input-sm">
                                        Seleccionar Archivo&hellip; <input type='file' id='path_arch_datos' name='d_path_arch_datos' class="form-control input-sm" style="display:none;"/>
                                    </span>
                                </label>
                                <input id="label_file" type="text" class="form-control input-sm" readonly>
                            </div>
                            <input id="nombre_proceso_upload" name='nombre_proceso_upload' type='hidden'/>
                        </form>
                        <br>
                        <div align="center">
                            <button id="btn_ver_formato"  class="btn btn-primary input-sm" data-toggle="modal" data-target="#formato_modal">Ver Formato</button>
                            <button id="btn_limpiar_upload"      class="btn btn-primary input-sm" >Limpiar</button>
                            <button id="btn_procesar_upload"     class="btn btn-primary input-sm" >Procesar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade " tabindex="-1" role="dialog" id="formato_modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content col-md-12">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Formato de Archivo</h4>
            </div>
            <div class="modal-body">
                <div style="left: auto;position: relative;top: auto;" class="panel panel-primary">
                    <div class="panel-body" style='background-color: #EEEEEE' id="formato_upload_modal">

                    </div>
                </div>
              <div class="text-center">
                  <button id="btn_volver" class="btn btn-primary input-sm" data-dismiss="modal" >Volver</button>
              </div>
            </div>
        </div>
    </div>
</div>

<!--
<div class="modal fade " tabindex="-1" role="dialog" id="error_modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content col-md-12">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Errores en Archivo</h4>
            </div>
            <div class="modal-body">

                <table id='error_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
                <div id='error_grid_pager' class='scroll' style='text-align:center;'></div>
               </div>
        </div>
    </div>
</div>
-->

<script src="<?=RECURSOS_FRAMEWORK?>dropzone/dropzone.js"></script>
<link rel="stylesheet" href="<?=RECURSOS_FRAMEWORK?>dropzone/dropzone.css">

<script type="text/javascript">
    var newDropzone;

    function show_upload_modal(formato, after_upload, nombre_proceso = null, url_upload = null){

        // Seteamos nombre del proceso
        if (nombre_proceso == null){
            nombre_proceso = 'Menu: '+ id_menu;
        }
        $('#frm_drag_n_drop #nombre_proceso_upload').val(nombre_proceso);

        // Seteamos URL de llamada
        if ( url_upload == null){
            url_upload = FUNCIONES_BASEPATH + "drag_n_drop/drag_n_drop.php";
        }
        $('#frm_drag_n_drop').attr('action', url_upload);
        newDropzone.options.url = url_upload;

        // Seteamos Formato
        $('#formato_upload_modal').html(formato);


        // Mostramos Modal
        $('#modal_importacion_archivo').modal('show');

        // Seteamos la función
        newDropzone.on("success", function(file,response) {
            after_upload(file,response)
        });
    }

    Dropzone.autoDiscover = false;
    $(document).ready(function() {

        var archivos_dropzone;

        var dropzoneOptions = {
            paramName: "file",// The name that will be used to transfer the file
            //maxFilesize: 100,
            acceptedFiles: '.txt',
            addRemoveLinks: false,
            init: function () {
                this.on("sending", function (file) {
                    $('#main').procOverlay({visible: true});
                });

                this.on("queuecomplete", function (file) {
                    $('#main').procOverlay({visible: false});
                });

                // Using a closure.
                archivos_dropzone = this;
                // Setup the observer for the button.
                document.querySelector("#btn_limpiar_upload").addEventListener("click", function () {
                    // Using "_this" here, because "this" doesn't point to the dropzone anymore
                    archivos_dropzone.removeAllFiles(true);
                });
            }
        };

        var uploader = document.querySelector('#frm_drag_n_drop');
        newDropzone = new Dropzone(uploader, dropzoneOptions);

    })
</script>