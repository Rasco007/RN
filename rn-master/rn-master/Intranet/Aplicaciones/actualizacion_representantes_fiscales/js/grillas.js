function init_grillas(id_menu){
    $("#asesores_legales_grid").jqGrid({
        colNames: asesores_legales_grid.colNames(),
        colModel: asesores_legales_grid.colModel(),
        pager: $('#asesores_legales_grid_pager'),
        caption: "",
        postData: asesores_legales_grid.postData(),
        autowidth: false,
        width: 940,
        height: 300,
        loadComplete: function(){
            if($('#asesores_legales_grid').getGridParam('records') <= 0 && grilla_cargada){
                mostrar_cuadro('I', 'Informaci&oacute;n', 'La consulta no devolvió datos');
            } 
            else if($('#asesores_legales_grid').getGridParam('records') == 1 && grilla_cargada){
                bloquear_filtros();
                let tipo_repres = $('#asesores_legales_grid').getCell(1, 'c_tipo_representante');
                switch(tipo_repres){
                    case 'Interno':
                        $('#c_tipo_representante').val('I');
                        break;
                    case 'Externo':
                        $('#c_tipo_representante').val('E');
                        break;
                    case 'Fiscalía':
                        $('#c_tipo_representante').val('F');
                        break;
                }

                $('#n_cuit').val($('#asesores_legales_grid').getCell(1, 'n_cuit'));
                $('#d_denominacion').val($('#asesores_legales_grid').getCell(1, 'd_denominacion'));
                $('#c_circun').val($('#asesores_legales_grid').getCell(1, 'c_circunscripcion'));
                $('#c_circun').blur();
                $('#c_provincia').val($('#asesores_legales_grid').getCell(1, 'c_provincia'));
                $('#d_provincia').val($('#asesores_legales_grid').getCell(1, 'd_provincia'));
                $('#c_depto').val($('#asesores_legales_grid').getCell(1, 'c_departamento'));
                $('#d_depto').val($('#asesores_legales_grid').getCell(1, 'd_depto'));
                $('#c_localidad').val($('#asesores_legales_grid').getCell(1, 'c_localidad'));
                $('#d_localidad').val($('#asesores_legales_grid').getCell(1, 'd_localidad'));
                $('#d_juzgado').val($('#asesores_legales_grid').getCell(1, 'd_juzgado'));
                $('#c_patrocinante').val($('#asesores_legales_grid').getCell(1, 'c_patrocinante'));
                $('#c_baja').val($('#asesores_legales_grid').getCell(1, 'c_baja'));
                $('#c_postal').val($('#asesores_legales_grid').getCell(1, 'd_codpostal'));
            } 
            else if(grilla_cargada){
                bloquear_filtros();
            } else{
                $('#asesores_legales_grid').clearGridData();
            }
        },
    }).navGrid('#asesores_legales_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#asesores_legales_grid_pager',
    {
        id:'btn_editar_asesor',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'edit';

            let rowid = $('#asesores_legales_grid').getGridParam('selrow');
            if(rowid){
                $('#abm_modal_title').text('Modificación');
                $('#n_cuit_modal').prop('readonly', true);

                $('#n_cuit_modal').val($('#asesores_legales_grid').getCell(rowid, 'n_cuit'));
                $('#d_denominacion_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_denominacion'));
                $('#d_domicilio_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_domicilio'));
                $('#c_circun_modal').val($('#asesores_legales_grid').getCell(rowid, 'c_circunscripcion'));
                $('#c_circun_modal').blur();
                $('#d_juzgado_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_juzgado'));
                $('#n_telefono_modal').val($('#asesores_legales_grid').getCell(rowid, 'n_telefono'));
                $('#d_mail_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_mail'));
                $('#c_provincia_modal').val($('#asesores_legales_grid').getCell(rowid, 'c_provincia'));
                $('#d_provincia_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_provincia'));
                $('#c_depto_modal').val($('#asesores_legales_grid').getCell(rowid, 'c_departamento'));
                $('#d_depto_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_depto'));
                $('#c_localidad_modal').val($('#asesores_legales_grid').getCell(rowid, 'c_localidad'));
                $('#d_localidad_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_localidad'));
                $('#c_postal_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_codpostal'));
                $('#d_colegio_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_colegio'));
                $('#d_tomo_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_tomo'));
                $('#d_folio_modal').val($('#asesores_legales_grid').getCell(rowid, 'd_folio'));
                $('#c_patrocinante_modal').val($('#asesores_legales_grid').getCell(rowid, 'c_patrocinante'));
                $('#c_baja_modal').val($('#asesores_legales_grid').getCell(rowid, 'c_baja'));

                let tipo_repres = $('#asesores_legales_grid').getCell(rowid, 'c_tipo_representante');
                switch(tipo_repres){
                    case 'Interno':
                        $('#c_tipo_representante_modal').val('I');
                        break;
                    case 'Externo':
                        $('#c_tipo_representante_modal').val('E');
                        break;
                    case 'Fiscalía':
                        $('#c_tipo_representante_modal').val('F');
                        break;
                }

                let c_circun = $('#asesores_legales_grid').getCell(rowid, 'c_circunscripcion');
                
                $("#n_cuit_modal").mask("99-99999999-9");
                $('#modal_abm_asesor').modal('show');
            } else{
                mostrar_error('Debe seleccionar una Fila para Modificar', 'E', true);
                return;
            }
            
        }
    }).navButtonAdd('#asesores_legales_grid_pager',
    {
        id:'btn_alta_asesor',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Alta",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'add';
            $('#abm_modal_title').text('Alta');
            $('#n_cuit_modal').prop('readonly', false);
            $('#modal_abm_asesor').modal('show');
        }
    });
}
