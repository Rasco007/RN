<?php
	require_once(INTRANET."header.php");

	checklogin();
	$m_autoquery = $_POST['p_m_autoquery'];
?>
<style>
#d_query_grid{
    height:335px;
    width:100%;
}
</style>
<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'>
	<tr>
		<td>&nbsp;</td>
	</tr>
</table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<br />
<div id='div_busqueda_sub'></div>
<table id='detail_grid' class='scroll' cellpadding='0' cellspacing='0'>
	<tr>
		<td>&nbsp;</td>
	</tr>
</table>
<div id='detail_grid_pager' class='scroll' style='text-align: center;'></div>
<div style='height:20px; width:100%'>
	<div id='mensaje' style='text-align: left; display:none; height:15px; padding-top:5px'>Mueva los registros y luego aplique los cambios para que surjan efecto.</div>
</div>
<div id="dialog_copiar_grilla" title="Copiar Grilla" style="display:none;">
	<form id="frm_copiar_grilla">
		<table>
			<tr valign="bottom" height="45px">
				<td>Menu desde(*)</td>
				<td>
					<input type="hidden" id="c_menu_desde" />
					<input type="text" id="d_menu_desde" class="text validate[required]" readonly="readonly" />
				</td>
				<td>
					<button type="button" id="bt_lupa_menu_desde" />
				</td>
			</tr>
			<tr valign="bottom" height="45px">
				<td>N&deg; Grilla Desde(*)</td>
				<td>
					<input type="text" id="n_grilla_desde" class="text validate[required,custom[onlyIntNumber]]" readonly="readonly" />
				</td>
				<td>
					<button type="button" id="bt_lupa_n_grilla_desde" />
				</td>
			</tr>
			<tr valign="bottom" height="45px">
				<td>Menu Hasta(*)</td>
				<td>
					<input type="hidden" id="c_menu_hasta" />
					<input type="text" id="d_menu_hasta" class="text validate[required]" readonly="readonly" />
				</td>
				<td>
					<button type="button" id="bt_lupa_menu_hasta" />
				</td>
			</tr>
			<tr valign="bottom" height="45px">
				<td>N&deg; Grilla Hasta(*)</td>
				<td>
					<input type="text" id="n_grilla_hasta" class="text validate[required,custom[onlyIntNumber]]" />
				</td>
				<td></td>
			</tr>
			<tr valign="bottom" height="45px">
				<td colspan="2" align="right">
					<button type="button" id="bt_copiar_grilla" />
				</td>
				<td></td>
			</tr>
		</table>
	</form>
</div>
<div id="dialog_query_grid" hidden title="Copiar consulta:" style="display:none;">
	<form id="frm_query_grid">
		<table>
			<tr>
				<td>
					<textarea id="d_query_grid" rows="30" cols="140" readonly></textarea>
				</td>
			</tr>
		</table>
	</form>
</div>

<div id="dialog_tomar_campos_tabla" title="Tomar los Campos de la Tabla" style="display:none;">
	<table id='copiar_campos_desde_tabla_grid' class='scroll' cellpadding='0' cellspacing='0'>
		<tr>
			<td>&nbsp;</td>
		</tr>
	</table>
	<div id='copiar_campos_desde_tabla_grid_pager' class='scroll' style='text-align: center;'></div>
	<br>
		Nota: Seleccionar los campos a Agregar. Mover las Filas dependiendo del orden de los campos deseados. Las Celdas son editables, presionar Enter para guardar los cambios. Presionar el Boton Aplicar para crear la Grilla.
	</form>
</div>

<script type="text/javascript">

    // Definicion de objeto de grillas
    var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>'});

    var datos_detail_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:1,
		m_autoquery:'N'});

    var copiar_campos_desde_tabla_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:2,
		m_autoquery:'N'});

    var movio_columnas = false; // Cuando mueve alguna columna para reordenar pone en true

    $(document).ready(function() {

		/********** Definicion de Grilla 1 **********/
        $("#main_grid").jqGrid({
            colNames:datos_main_grid.colNames(),
            colModel:datos_main_grid.colModel(),
            pager: $('#main_grid_pager'),
            caption:"Grillas:" ,
            postData:datos_main_grid.postData(),
            editurl: "grillas/grillas_abm.php",
            //footerrow: true,
            onSelectRow: function(id) {
                var id_grid_query = $('#main_grid').getCell(id,'id_grid_query');
                setea_parametros('#detail_grid',{'id_grid_query':id_grid_query});
            }
        }).navGrid('#main_grid_pager',
            {add:true, edit:true, del:true}, //options
            {
                width:680,
                onInitializeForm: defaultInitForm(function(formid) {

                    // Definicion de Lupas
                    $('#d_titulo',formid).lupa_generica({
                        titulos:['Id','Titulo','Tipo de Menu','URL','Menu Padre'],
                        grid:[{index:'id_menu',width:100,hidden:true},
                            {index:'d_titulo',width:150},
                            {index:'c_tipo_menu'},
                            {index:'d_url'},
                            {index:'d_menu_padre',width:150}],
                        caption:'Lista de Menus',
                        sortname:'d_titulo',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{d_titulo:'d_titulo',id_menu:'n_id_menu'},
                        keyNav:true,
                        onClose:function(formid){
                            if($('#n_id_menu',formid).val()!=''){
                                $.ajax({
                                    url: '../Funciones/sugeridor_orden.php',
                                    type:"POST",
                                    data:{
                                        "id_menu":$('#n_id_menu',formid).val(),
                                        "tipo":"GRID"
                                    },
                                    success: function(data){
                                        var res = eval('('+data+')');
                                        if(res.resultado == 'OK'){
                                            $('#nro_grid',formid).val(res.orden);
                                        }
                                        else{
                                            //mostrar_error(res.resultado);
                                        }
                                    }
                                });
                            }
                            else{
                                $('#nro_grid',formid).val(null);
                            }
                        },
                        foco:"#n_grid"
                    });
					agregarLupaPRCValidacion(formid);

                })
            }, // edit options
            {
                width:680,
                onInitializeForm: defaultInitForm(function(formid) {

                    // Definicion de Lupas
                    $('#d_titulo',formid).lupa_generica({
                        titulos:['Id','Titulo','Tipo de Menu','URL','Menu Padre'],
                        grid:[{index:'id_menu',width:100,hidden:true},
                            {index:'d_titulo',width:150},
                            {index:'c_tipo_menu'},
                            {index:'d_url',width:200},
                            {index:'d_menu_padre',width:150}],
                        caption:'Lista de Menues',
                        sortname:'d_titulo',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{d_titulo:'d_titulo',id_menu:'n_id_menu'},
                        keyNav:true,
                        onClose:function(formid){
                            if($('#n_id_menu',formid).val()!=''){
                                $.ajax({
                                    url: '../Funciones/sugeridor_orden.php',
                                    type:"POST",
                                    data:{
                                        "id_menu":$('#n_id_menu',formid).val(),
                                        "tipo":"GRID"
                                    },
                                    success: function(data){
                                        var res = eval('('+data+')');
                                        if(res.resultado == 'OK'){
                                            $('#nro_grid',formid).val(res.orden);
                                        }
                                        else{
                                            //mostrar_error(res.resultado);
                                        }
                                    }
                                });
                            }
                            else{
                                $('#nro_grid',formid).val(null);
                            }
                        },
                        foco:"#nro_grid"
                    });
					agregarLupaPRCValidacion(formid);
                }),
                closeAfterAdd:true

            }, // add options
            {}, // del options
            {} // search options
        ).navButtonAdd('#main_grid_pager',{caption:"Copiar Grilla &nbsp;&nbsp;",buttonicon:"ui-icon-copy",
            onClickButton:function() {
                openFrmCopiarGrilla();
            },position:"right", title:"Copiar Grilla", cursor:"pointer"})
            .navButtonAdd('#main_grid_pager',{caption:"Obtener consulta",buttonicon:"ui-icon-clipboard",
                onClickButton:function() {
                    var auxid = $('#main_grid').getGridParam('selrow');
                    var grid_query = $('#main_grid').getCell(auxid,'id_grid_query');
                    if(auxid >= 0 && auxid != null){
                        createQueryGrid(grid_query);
                    }
                    else{
                        mostrar_error('Debe seleccionar un registro.');
                    }
                },position:"right", title:"Obtener consulta", cursor:"pointer"});


		/********** Definicion de Grilla 2 **********/
        $("#detail_grid").jqGrid({
            colNames:datos_detail_grid.colNames(),
            colModel:datos_detail_grid.colModel(),
            pager: $('#detail_grid_pager'),
            caption:"Columnas:" ,
            postData:datos_detail_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            sortname:'n_column',
            sortorder:'asc',
            rownumbers: true,
            height:400	
        }).navGrid('#detail_grid_pager',
            {add:true, edit:true, del:true}, //options
            {
                width:680,
                onInitializeForm: defaultInitForm(function(formid) {

                    //Definicion de Lupas
                    $('#d_dato',formid).lupa_generica({
                        titulos:['C&oacute;digo','Descripci&oacute;n'],
                        grid:[{index:'c_codigo',width:100,},
                            {index:'d_descrip',width:150}],
                        caption:'Lista de tipos de datos',
                        sortname:'d_descrip',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{d_descrip:'d_dato',c_codigo:'c_tipo_dato'},
                        keyNav:true,
                        foco:"#d_where"
                    });

                    $('#d_descripcion',formid).lupa_generica({
                        titulos:['Nro. Lista','Descripci&oacute;n'],
                        grid:[{index:'n_id_lista',width:100,},
                            {index:'d_descripcion',width:250}],
                        caption:'Listas',
                        sortname:'n_id_lista',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{n_id_lista:'n_id_lista',d_descripcion:'d_descripcion'},
                        keyNav:true
                    });

                })
            }, // edit options
            {
                width:680,
                onInitializeForm: defaultInitForm(function(formid) {

                    //Definicion de Lupas
                    $('#d_dato',formid).lupa_generica({
                        titulos:['C&oacute;digo','Descripci&oacute;n'],
                        grid:[{index:'c_codigo',width:100,},
                            {index:'d_descrip',width:150}],
                        caption:'Lista de tipos de datos',
                        sortname:'d_descrip',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{d_descrip:'d_dato',c_codigo:'c_tipo_dato'},
                        keyNav:true,
                        foco:"#d_where"
                    });

                    $('#d_descripcion',formid).lupa_generica({
                        titulos:['Nro. Lista','Descripci&oacute;n'],
                        grid:[{index:'n_id_lista',width:100,},
                            {index:'d_descripcion',width:250}],
                        caption:'Listas',
                        sortname:'n_id_lista',
                        sortorder:'asc',
                        filtros:['null'],
                        campos:{n_id_lista:'n_id_lista',d_descripcion:'d_descripcion'},
                        keyNav:true
                    });

                }),
                beforeShowForm: defaultBeforeShowForm(function(formid) {
                    var sel = $('#main_grid').getGridParam('selrow');
                    var v_id_grid_query = $('#main_grid').getCell(sel,'id_grid_query');

                    if(v_id_grid_query!=''){
                        $.ajax({
                            url: '../Funciones/sugeridor_orden.php',
                            type:"POST",
                            data:{
                                "id_grid_query":v_id_grid_query,
                                "tipo":"GRID"
                            },
                            success: function(data){
                                var res = eval('('+data+')');
                                if(res.resultado == 'OK'){
                                    $('#n_column',formid).val(res.orden);
                                }
                                else{
                                    //mostrar_error(res.resultado);
                                }
                            }
                        });
                    }

                }),
                beforeInitData: function(formid) {
                    if ($('#main_grid').getGridParam('selrow')){
                        return true;
                    }else{
                        mostrar_cuadro('I', 'ADVERTENCIA', 'Seleccione un Grilla por favor.', function(){}, function(){}, 400, 200);
                        return false;
                    }
                },

                onclickSubmit: function () { // Para evitar fallos en filas sin refresh
                    var id = $("#main_grid").getGridParam('selrow');
                    var id_grid_query = $('#main_grid').getCell(id,'id_grid_query');
                    ret = $(this).getGridParam('postData');
                    ret.id_grid_query = id_grid_query;
                    ret.n_tabla_tipo_dato = 901;
                    return ret;
                },
                closeAfterAdd:true


            }, // add options
            {}, // del options
            {} // search options
        ).navButtonAdd('#detail_grid_pager',{caption:"Tomar Campos&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-copy",
            onClickButton:function() {
                openFrmCargarCampos();
            },position:"right", title:"Tomar Campos Query", cursor:"pointer"})
            .navButtonAdd('#detail_grid_pager',{caption:"Activar Orden&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-arrow-2-n-s",
                onClickButton:function() {

                    activarDragDropColumnas();

                },position:"right", title:"Activar Orden Draggable", cursor:"pointer", id:'bt_activar_orden'})
            .navButtonAdd('#detail_grid_pager',{caption:"Aplicar/Corregir&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-disk",
                onClickButton:function() {
                    guardarOrdenCampos();
                },position:"right", title:"Aplicar cambios y/o corregir orden.", cursor:"pointer", id:'bt_aplicar_cambios_orden'});
        $('#bt_aplicar_cambios_orden').hide();//por defecto está oculto

        $("#copiar_campos_desde_tabla_grid").jqGrid({
            colNames:copiar_campos_desde_tabla_grid.colNames(),
            colModel:copiar_campos_desde_tabla_grid.colModel(),
            pager: $('#copiar_campos_desde_tabla_grid_pager'),
            caption:"Columnas:" ,
            postData:copiar_campos_desde_tabla_grid.postData(),
            sortname:'n_column',
            sortorder:'asc',
            multiselect: true,
            'cellEdit': true, // TRUE = turns on celledit for the grid.
            'cellsubmit' : 'clientArray',
            editurl: 'clientArray',
            rowNum: 1000,
            height:350,
            //  altRows:true,
            rownumbers: true
        }).navGrid('#copiar_campos_desde_tabla_grid_pager',
            {add:false, edit:false, del:false}, //options
            {}, // edit options
            {}, // add options
            {}, // del options
            {} // search options
        );
        $("#copiar_campos_desde_tabla_grid").sortableRows();
        $("#copiar_campos_desde_tabla_grid").jqGrid('gridDnD');

    });
    function openFrmCopiarGrilla(){
        $('#dialog_copiar_grilla').dialog({'width':'500px'});
        $('#frm_copiar_grilla input[type="text"]').css({'width':'250px', 'background':'#FFFFFF'});

        $('#bt_lupa_menu_desde, #bt_lupa_n_grilla_desde, #bt_lupa_menu_hasta, #bt_lupa_n_grilla_hasta')
            .button({icons:{primary: "ui-icon-search"}})
            .css({'height':'23px','width':'26px'});

        $('#bt_copiar_grilla').button({icons:{primary: "ui-icon-copy"},
            'label':'Copiar'
        })
            .css({'height':'25px','width':'70px'}).
        click(function(){
            copiarGrilla();
        });

        $('#bt_lupa_menu_desde, #d_menu_desde').lupa_generica({
            id_lista:<?=fun_id_lista('LISTADO DE MENU ITEM')?>,
            titulos:['C&oacute;digo','Descripci&oacute;n'],
            grid:[{index:'c_codigo',width:100,},
                {index:'d_descrip',width:150}],
            caption:'Lista de Menues',
            sortname:'d_descrip',
            sortorder:'asc',
            filtros:['null'],
            campos:{d_descrip:'d_menu_desde',c_codigo:'c_menu_desde'},
            keyNav:true,
            foco:"#n_grilla_desde",
            onClose:function(){
                $('#n_grilla_hasta, #n_grilla_desde').val('');
            }
        });
        $('#bt_lupa_n_grilla_desde, #n_grilla_desde').lupa_generica({
            id_lista:<?=fun_id_lista('LISTA GRILLAS FILTRO MENU')?>,
            titulos:['N&deg; Grilla','From','Id Men&uacute;', 'Menu', 'Url'],
            grid:[{index:'n_grid',width:50,align:'right'},
                {index:'d_from',width:170,align:'left'},
                {index:'id_menu',width:50,align:'right'},
                {index:'d_titulo',width:150,align:'left'},
                {index:'d_url',width:150,align:'left'},
            ],
            caption:'Lista de Grillas',
            filtros:['#c_menu_desde'],
            campos:{n_grid:'n_grilla_desde',id_menu:'c_grilla_desde', d_titulo:'d_grilla_desde'},
            keyNav:true,
            foco:"#d_menu_hasta",
            onClose:function(){
                $('#n_grilla_hasta').val($('#n_grilla_desde').val());
            }
        });

        $('#bt_lupa_menu_hasta, #d_menu_hasta').lupa_generica({
            id_lista:<?=fun_id_lista('LISTADO DE MENU ITEM')?>,
            titulos:['C&oacute;digo','Descripci&oacute;n'],
            grid:[{index:'c_codigo',width:100,},
                {index:'d_descrip',width:150}],
            caption:'Lista de Menues',
            sortname:'d_descrip',
            sortorder:'asc',
            filtros:['null'],
            campos:{d_descrip:'d_menu_hasta',c_codigo:'c_menu_hasta'},
            keyNav:true,
            foco:"#n_grilla_hasta"
        });
    }
    function createQueryGrid(id_grid_query){
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data: {
                "p_id_grid_query":id_grid_query,
                "id_menu":"<?=$_POST['p_n_id_menu']?>",
                "n_orden":1
            },
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                var res = eval('('+data+')');
                if(res.p_d_length_query > 0)
                    mostrar_error('No se puede devolver la consulta porque tiene un tamaño de '+res.p_d_length_query+' y no se puede mostrar');
                else if(res.resultado == 'OK'){
                    openFrmQueryGrilla();
                    $('#dialog_query_grid').dialog('open');
                    var query_grid = res.p_d_query_grid;
                    if(res.p_d_query_grid_2){
                        query_grid = query_grid + res.p_d_query_grid_2;
                    }
                    if(res.p_d_query_grid_3){
                        query_grid = query_grid + res.p_d_query_grid_3;
                    }
                    $('#frm_query_grid #d_query_grid').val(query_grid);
                }
                else
                    mostrar_error(res.resultado);
            }
        });
    }
    function copiarGrilla(){
        var validar = $('#frm_copiar_grilla').validationEngine('validate');
        if(validar){
            $('#main').procOverlay({visible:true});
            $.ajax({
                type:'POST',
                url: "grillas/ajax_copiar_grillas.php?accion=copiarGrilla",
                data: {"p_id_menu_desde":$('#c_menu_desde').val(),
                    "p_n_grilla_desde":$('#n_grilla_desde').val(),
                    "p_id_menu_hasta":$('#c_menu_hasta').val(),
                    "p_n_grilla_hasta":$('#n_grilla_hasta').val()},
                success: function( data ) {
                    var res = eval('('+data+')');
                    onCopiarGrilla( res );
                }
            });
        }
    }
    function onCopiarGrilla( res ){
        $('#main').procOverlay({visible:false});
        if(res['resultado'].indexOf('OK') != '-1'){
            $('#dialog_copiar_grilla').dialog('close');
            $('#frm_copiar_grilla input[type="text"]').val('');
            mostrar_cuadro('','Copiado correctamente','Se ha copiado la Grilla correctamente.');
        }else mostrar_cuadro('E', 'Error', res['resultado'], function(){}, function(){}, 400, 200);
    }

    function openFrmQueryGrilla(){
        $('#dialog_query_grid').dialog(
            {
                'width':900,
                'modal':true,
                buttons: [
                    /*{text: "Copiar al cortapapeles", id:'btn_aplicar', click: function(){

                     }},*/
                    {text: "Volver", click: function() {
                        $(this).dialog("close");
                    }}
                ]}
        );
    }

    function openFrmCargarCampos(){
        $('#dialog_tomar_campos_tabla').dialog(
            {'width':'1200px',
                'modal':true,
                buttons: [
                    //Botón volver
                    {text: "Volver", click: function() {
                        $('#dialog_tomar_campos_tabla').dialog("close");
                    }},
                    //Botón aplicar
                    {text: "Aplicar", id:'btn_aplicar', click: function(){
                        $('#main').procOverlay({visible:true});

                        aplicarCampos();
                    }}
                ]}
        );
        cargarCampos();
    }
    function cargarCampos(){
        var id = $("#main_grid").getGridParam('selrow');
        if (id) {
            $('#main').procOverlay({visible:true});
            $.ajax({
                type:'POST',
                url: "grillas/cargar_campos.php",
                data: {"p_id_grilla":$("#main_grid").getCell(id,'id_grid_query'),
                    "p_d_tabla": $("#main_grid").getCell(id,'d_from'),
                    "p_oper":'cargar'},
                success: function( data ) {

                    $('#main').procOverlay({visible:false});
                    if(data.resultado = 'OK'){
                        // $('#dialog_tomar_campos_tabla').dialog('close');
                        $('#frm_campos_tabla input[type="text"]').val('');

                        setea_parametros('#copiar_campos_desde_tabla_grid',{'id_grid_query':$("#main_grid").getCell(id,'id_grid_query')});
                        $("#copiar_campos_desde_tabla_grid").trigger('reloadGrid');

                    }else {
                        mostrar_cuadro('E', 'Error', data.resultado, function(){}, function(){}, 400, 200);
                    }
                }
            });
        }else{
            mostrar_cuadro('E', 'ERROR', 'Debe seleccionar un registro en la grilla superior.');
            $('#dialog_tomar_campos_tabla').dialog("close");
        }
    }

    function aplicarCampos(){
        // Tomamos Los ID's . Vienen segun el orden en que hayan sido seleccionados
        var s;
        s = $("#copiar_campos_desde_tabla_grid").jqGrid('getGridParam','selarrrow');

        //Armamos una lista de objetos, donde cada id indica su posicion actual
        var list = [];
        for (i= 0;i< s.length;i++){
            var iRow = $('#dialog_tomar_campos_tabla #' + s[i])[0].rowIndex;
            list.push({id:s[i],pos:iRow});
        }

//    alert(JSON.stringify(list));

        //Ordenamos la lista segun la posicion actual
        list.sort(function (a, b){
            return (a.pos - b.pos)
        });

        //   alert(JSON.stringify(list));

        columnas_seleccionadas = '';
        for (i= 0;i< list.length;i++){
            columnas_seleccionadas = columnas_seleccionadas+
                $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'id_grid_column') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'id_grid_query') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'n_column') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'd_column_title') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'd_column_name') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'd_column_query') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'c_tipo_dato') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'n_tabla_tipo_dato') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'm_visible') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'm_readonly') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'n_id_lista') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'd_validacion') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'd_extra_param') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'm_editable') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'd_editoptions') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'm_obligatorio') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'd_param_lista') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'm_pk') +
                ';' + $('#copiar_campos_desde_tabla_grid').getCell(list[i]['id'], 'm_insertable') +';';
        }
        $.ajax({
            type:'POST',
            url: "grillas/cargar_campos.php",
            data: {
                "p_c_columnas": columnas_seleccionadas,
                "p_oper":'aplicar'
            },
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                var res = eval('('+data+')');
                $('#dialog_tomar_campos_tabla').dialog("close");
                if(res.resultado == 'OK'){
                    $("#detail_grid").trigger('reloadGrid');
                }else {
                    mostrar_cuadro('E', 'Error', res.resultado);
                }
            }
        });
    }

    function guardarOrdenCampos(){
        var id = $("#main_grid").getGridParam('selrow');
        if (id) {

            var p_rownumbers = '';
            var p_roworders = '';

            $('#detail_grid tr.jqgrow').each(function(){//recorre todos los registros
                var id_det = $(this).attr('id');
                p_roworders +=  $("#detail_grid").getCell(id_det,'n_column')+';';//segunda columna
                p_rownumbers +=  $("#detail_grid").getCell(id_det,'rn')+';';//primer columna
            });

            $.ajax({
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                type:"POST",
                data:{
                    "id_menu":<?=$_POST['p_n_id_menu']?>,
                    "n_orden":0,
                    "p_id_grid_query":$("#main_grid").getCell(id,'id_grid_query'),//p_id_grid_query grid superior
                    "p_rownumbers":p_rownumbers,
                    "p_roworders":p_roworders,
                },

                success: function(data){
                    var res = eval('('+data+')');
                    onGuardarOrdenCampos( res );
                }
            });
        }else{
            mostrar_cuadro('E', 'ERROR', 'Debe seleccionar un registro en la grilla superior.');
        }
    }

    function onGuardarOrdenCampos( res ){
        if(res['resultado'] != 'OK'){
            mostrar_cuadro('E','Error', res['resultado'] );
        }else{
            $('#detail_grid').trigger('reloadGrid');
            desactivarDragDropColumnas();
        }
    }

    function desactivarDragDropColumnas(){
        $("#detail_grid").jqGrid('sortableRows', {disabled: true});
        $('#mensaje').hide(300);
        $('#bt_activar_orden').show();
        $('#bt_aplicar_cambios_orden').hide();
    }

    function activarDragDropColumnas(){
        $("#detail_grid").jqGrid('sortableRows', {disabled: false});

        $("#detail_grid").bind('sortstop', function(event, ui) {//evento p/ saber cdo mueve alguna columna
            //$('#bt_aplicar_cambios_orden').show();
        });

        $('#mensaje').show(300);
        $('#bt_activar_orden').hide();
        $('#bt_aplicar_cambios_orden').show();
    }
	
	function agregarLupaPRCValidacion(formid){
		$('#d_prc_validacion',formid).lupa_generica({
			titulos:['Procedimiento','Tipo de Objeto'],
			grid:[	{index:'d_procedure',width:350},{index:'d_object_type',width:350,hidden:true}],
			caption:'Lista de Procedimientos y Funciones',
			sortname:'d_procedure',
			sortorder:'asc',
			filtros:['null'],
			campos:{d_procedure:'d_prc_validacion'},
			keyNav:true
		});
	}
</script>

<?php
	require_once(INTRANET."footer.php");
?>
