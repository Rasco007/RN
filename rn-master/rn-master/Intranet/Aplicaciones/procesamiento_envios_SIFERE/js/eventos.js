function inicializarEventos() {   
    // Dropzone.options.frm_upload_mulator = {
    //     paramName: "file",
    //     maxFiles: 1,
    //     maxFilesize: 1000000,
    //     acceptedFiles: ".zip",
    //     addRemoveLinks: true,
    //     init: function() {
    //         var dropzoneInstance = Dropzone.forElement("#frm_upload_mulator");
    //         dropzoneInstance.on("success", function (file, response) {
    //             console.log('entro');
    //             if (response.resultado != 'OK') {
    //                 mostrar_cuadro('E', 'Error', response.resultado);
    //                 dropzoneInstance.removeAllFiles(true); 
    //             } else {
    //                 mostrar_cuadro('S', 'Completado', 'Extracción y transferencia exitosas');
    //             }
    //         });
    
    //         dropzoneInstance.on("maxfilesexceeded", function(file) {
    //             mostrar_cuadro('E', 'Error', 'No se puede cargar mas de un archivo.');
    //             dropzoneInstance.removeAllFiles(true); 
    //         });
    //     }
    // };

    // $('#frm_upload_mulator').dropzone();

    var dropzoneOptions = {
        paramName: "file",// The name that will be used to transfer the file
        maxFiles: 1,
        maxFilesize: 1000000,
        uploadMultiple: false,
        acceptedFiles: '.zip',
        addRemoveLinks: true,
        init: function() {

            var dropzoneInstance = Dropzone.forElement("#frm_upload_mulator");
            
            this.on("removedfile", function(file) {
                
            });

            this.on("sending", function(file) {
                $('#main').procOverlay({visible:true});
            });

            this.on("success", function (response) {
                var resp = eval('('+response.xhr.response+')');
                if (resp.resultado != 'OK') {
                    mostrar_cuadro('E', 'Error', resp.resultado);
                    dropzoneInstance.removeAllFiles(true); 
                    $('#main').procOverlay({visible:false});
                } else {
                    mostrar_cuadro('S', 'Completado', 'Extracción y transferencia exitosas');
                    dropzoneInstance.removeAllFiles(true); 
                }
            });

            this.on("complete", function(file) {
                $('#main').procOverlay({visible:false});
            });

            this.on("maxfilesexceeded", function(file) {
                mostrar_cuadro('E', 'Error', 'No se puede cargar mas de un archivo.');
            });

            archivos_dropzone = this;
        }
    };
    var uploader = document.getElementById('frm_upload_mulator');
    var newDropzone = new Dropzone(uploader, dropzoneOptions);

    
    $('#btn_limpiar').click(function(){
        var dropzoneInstance = Dropzone.forElement("#frm_upload_mulator");

        dropzoneInstance.removeAllFiles(true);

        // $('#main').procOverlay({visible:true});
        // $.ajax({        //Solicitamos la eliminacion de los archivos que acabamos de subir.
        //     url: FUNCIONES_BASEPATH+"maestro_abm.php",
        //     type:'POST',
        //     data: {
        //         "p_n_id_lote":v_n_id_lote,
        //         "id_menu":v_n_id_menu,
        //         "n_orden":0
        //     },
        //     dataType: 'json',
        //     async:false,
        //     success: function(data){
        //         $('#main').procOverlay({visible:false});
        //         if(data.resultado == 'OK'){
        //             null;
        //         }
        //         else{
        //             mostrar_cuadro('E','Error','Ha ocurrido un Error al eliminar los archivos. Recargue la página para continuar.');
        //         }
        //     },
        //     //si ha ocurrido un error
        //     error: function(){
        //         $('#main').procOverlay({visible:false});
        //         mostrar_cuadro('E','Error','Ha ocurrido un Error al conectarse al servidor.');
        //     }
        // });
    });


    $('#btn_procesar').click(function(){


        $('#main').procOverlay({visible:true});

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+"maestro_abm.php",
            async:false,
            data:{
                "p_n_id_lote":v_n_id_lote,
                "id_menu":v_n_id_menu,
                "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.p_existe == 'existe'){
                    mostrar_cuadro('C','Aviso','Se han detectado envíos anteriores sin procesar. ¿Desea continuar?',procesar_archivo,cancelar_archivo);
                    $("#faltantes_grid").trigger('reloadGrid');
                }
                else{
                    procesar_archivo();
                }
            }
        });

    });



    
}