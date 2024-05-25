function inicializar_eventos() {
    $('#btn_procesar').attr('disabled', true);

    var dropzoneOptions = {
        paramName: "file",// The name that will be used to transfer the file
        maxFiles: 1,
        uploadMultiple: false,
        acceptedFiles: '.xlsx',
        addRemoveLinks: true,
        init: function() {
            this.on("removedfile", function(file) {
                if(this.files.length == 1){
                    $('#btn_procesar').attr('disabled', false);
                } else {
                    p_id_archivo = null;
                    p_codigo_archivo = null;
                    $('#btn_procesar').attr('disabled', true);
                }
            });

            this.on("sending", function(file) {
                $('#main').procOverlay({visible:true});
            });

            this.on("success", function (response) {
                var resp = eval('('+response.xhr.response+')');
                if(resp.resultado != 'OK'){
                    mostrar_cuadro('E', 'Error', resp.resultado);
                    archivos_dropzone.removeAllFiles(true);
                    $('#btn_procesar').attr('disabled', true);
                    p_id_archivo = null;
                    p_codigo_archivo = null;
                } else {
                    p_id_archivo = resp.id_archivo;
                    p_codigo_archivo = resp.codigo_archivo;
                    $('#btn_procesar').attr('disabled', false);
                }
            });

            this.on("complete", function(file) {
                $('#main').procOverlay({visible:false});
                $('#btn_procesar').attr('disabled', false);
            });

            this.on("maxfilesexceeded", function(file) {
                mostrar_cuadro('E', 'Error', 'No se puede cargar mas de un archivo.');
                $('#btn_procesar').attr('disabled', true);
            });

            archivos_dropzone = this;
        }
    };
    var uploader = document.getElementById('form_archivo');
    var newDropzone = new Dropzone(uploader, dropzoneOptions);

    $('#n_periodo_desde').mask('9999-99');
    $('#n_periodo_hasta').mask('9999-99');

    //Funcionalidad modal alta de detalle de operativo

    $('.numerico').keypress(function(tecla){   //Validamos que los input de importes sean solo numeros, puntos o comas.
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $(".mascara_importe").focusout(function () { //le damos el formato de importe con 2 decimales 0,00
        $(this).val($(this).val().replace(/\./g, ','));
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    if(p_c_formato_archivo != ''){
        $('#div_archivo').show();
        $('#div_botones').show();
    }

    if(p_sector == ';OFI;'){
        $('#c_grupo_add').addClass('validate[required]');
        $('#label').html('Grupo de Fiscalización(*)');
    }

    $('#modal_add_detalle').on('hidden.bs.modal', function (e) {
        $("#form_add_detalle").validationEngine('hideAll');
        $('#form_add_detalle select').val(null);
        $('#form_add_detalle .limpiar').val(null);
    });

    $('#n_periodo_desde_add').mask('9999/99');
    $('#n_periodo_desde_add').change(function () {
        if ($(this).val().length != 7){
            mostrar_error("Formato de Periodo Desde incorrecto.");
            $(this).val(null);
        }
    });
    $('#n_periodo_hasta_add').mask('9999/99');
    $('#n_periodo_hasta_add').change(function () {
        if ($(this).val().length != 7){
            mostrar_error("Formato de Periodo Hasta incorrecto.");
            $(this).val(null);
        }
    });

    $("#btn_lupa_cuit").lupa_generica({
        id_lista: id_lista_contribuyentes,
        titulos:['CUIT', 'Denominación', 'id_contribuyente'],
        grid:[{index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'id_contribuyente',width:140, hidden: true}],
        caption:'Lista de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        campos:{n_cuit: 'n_cuit_add', d_denominacion:'d_denominacion_add', id_contribuyente: 'id_contribuyente_add'},
        keyNav:true,
        draggable:true,
        onClose(){
            $('#d_inscripcion_add').val(null);
            $('#c_tributo_add').val(null);
            $('#d_objeto_hecho_add').val(null);
            $('#n_cuit_add').mask('99-99999999-9');
        }
    });

    $("#btn_lupa_inscripcion").lupa_generica({
        id_lista: id_lista_inscripciones,
        titulos: ['c_codigo', 'Objeto', 'Descripción'],
        grid: [
            {index: 'c_tributo', width: 70, hidden: true},
            {index: 'd_objeto_hecho', width: 100, hidden: true},
            {index: 'd_descrip', width: 550}],
        caption: 'Lista de Inscripciones',
        filtroNull: false,
        filtros: ['#id_contribuyente_add', '#c_tributo_operativo'],
        filtrosTitulos:['Cuit'],
        campos: {d_objeto_hecho: 'd_objeto_hecho_add', d_descrip: 'd_inscripcion_add', c_tributo: 'c_tributo_add'},
        keyNav: true
    });

    $("#btn_lupa_fiscalizador").lupa_generica({
        id_lista: id_lista_fiscalizadores,
        titulos: ['N° Personal', 'Descripción'],
        grid: [
            {index: 'id_personal', width: 100},
            {index: 'd_denominacion', width: 500}],
        caption: 'Lista de Fiscalizadores',
        filtros:[p_sector],
        filtrosNulos:[false],
        campos: {id_personal: 'n_personal_add', d_denominacion: 'd_fiscalizador_add'},
        keyNav: true
    });

    $('#btn_add_detalle').click(function () {
        if($('#form_add_detalle').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_operativo_fiscalizacion": p_id_operativo,
                    "p_n_cuit": limpia_cuit($('#n_cuit_add').val()),
                    "p_d_denominacion": $('#d_denominacion_add').val(),
                    "p_id_contribuyente": $('#id_contribuyente_add').val(),
                    "p_c_tributo": $('#c_tributo_add').val(),
                    "p_d_objeto_hecho": $('#d_objeto_hecho_add').val(),
                    "p_pos_fis_desde": desenmascararPeriodo($('#n_periodo_desde_add').val()),
                    "p_pos_fis_hasta": desenmascararPeriodo($('#n_periodo_hasta_add').val()),
                    "p_i_diferencia": $('#i_diferencia_add').val(),
                    "p_i_declarado": $('#i_declarado_add').val(),
                    "p_i_verificado": $('#i_verificado_add').val(),
                    "p_n_personal": $('#n_personal_add').val(),
                    "p_d_inspector": $('#d_fiscalizador_add').val(),
                    "p_c_grupo": $('#c_grupo_add').val(),
                    "p_oper": 'add',
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Alta Manual: Detalle de Operativo', 'El alta de detalle finalizo correctamente.');
                        $("#modal_add_detalle").modal('hide');
                        $("#main_grid").trigger("reloadGrid");
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_procesar').click(function() {
        if($("#form_archivo").validationEngine('validate')){
            fun_procesa_archivo(p_id_archivo, p_codigo_archivo);
        }
    });

    $('#btn_exportar').click(function() {
        $("#modal_exportacion").modal('show');
    });

    $('#btn_alicuotas').click(function() {
        post_to_url('carga_casos/php/generar_excel.php',
            {
                'tipo_archivo':'alicuotas',
                'p_n_id_menu': v_id_menu
            },
            'POST');
    });

    $('#btn_deducciones').click(function() {
        post_to_url('carga_casos/php/generar_excel.php',
            {
                'tipo_archivo':'deducciones',
                'p_n_id_menu': v_id_menu
            },
            'POST');
    });

    $('#btn_imponible').click(function() {
        post_to_url('carga_casos/php/generar_excel.php',
            {
                'tipo_archivo':'imponible',
                'p_n_id_menu': v_id_menu
            },
            'POST');
    });
}