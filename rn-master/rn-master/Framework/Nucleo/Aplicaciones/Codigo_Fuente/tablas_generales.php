<?php
require_once(INTRANET."header.php");

checklogin();
$m_autoquery = $_POST['p_m_autoquery'];
?>

	<div id='div_busqueda_parametros'></div>
	<table id='parametros_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
	<div id='parametros_grid_pager' class='scroll' style='text-align:center;'></div>
	<div id='div_busqueda_tablas_generales'></div>
	<table id="tablas_generales_grid"></table>
	<div id="tablas_generales_grid_pager"></div>

<script type="text/javascript">

    // Definicion de objeto de grillas
    var datos_parametros_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>',
		grid_childs_id:{
			'tablas_generales_grid':'#tablas_generales_grid'
		}}
    );

    var datos_tabgenerales_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
        n_grid:1,
        m_autoquery:'N'}
    );

    $(document).ready(function() {
		
        //busqueda de parametros
        $("#div_busqueda_parametros").crearBusquedaMasiva({
            p_n_id_menu:<?=$_POST['p_n_id_menu'];?>,
            afecta_grid:['parametros_grid'],
            adv:'S',
            p_n_grid:0,
            titulo:'Busqueda de Parametros'
        });
        var filter;

        //busqueda de tablas generales
        $("#div_busqueda_tablas_generales").crearBusquedaMasiva({
            p_n_id_menu:<?=$_POST['p_n_id_menu'];?>,
            afecta_grid:['tablas_generales_grid'],
            adv:'S',
            p_n_grid:1,
            titulo:'Busqueda de Tablas Generales'
        });

        //grilla de parametros
        $("#parametros_grid").jqGrid({
            colNames:datos_parametros_grid.colNames(),
            colModel:datos_parametros_grid.colModel(),
            pager: $('#parametros_grid_pager'),
            caption:"Parametros:" ,
            postData:datos_parametros_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
            onSelectRow: function(id) {

                n_tabla = $('#parametros_grid').getCell(id,'n_tabla');

                $p_grid = $('#parametros_grid');
                $tg_grid = $('#tablas_generales_grid');

                var d_descrip = ($p_grid.getCell(id,'d_descrip') != '') ? $p_grid.getCell(id,'d_descrip'):'Descripci&oacute;n';
                var d_dato1 = ($p_grid.getCell(id,'d_descrip_dato1') != '') ? $p_grid.getCell(id,'d_descrip_dato1'):'Descripci&oacute;n Corta';
                var d_dato2 = ($p_grid.getCell(id,'d_descrip_dato2') != '') ? $p_grid.getCell(id,'d_descrip_dato2'):'Descripci&oacute;n Corta 2';
                var d_dato3 = ($p_grid.getCell(id,'d_descrip_dato3') != '') ? $p_grid.getCell(id,'d_descrip_dato3'):'Descripci&oacute;n Corta 3';
                var d_dato4 = ($p_grid.getCell(id,'d_descrip_dato4') != '') ? $p_grid.getCell(id,'d_descrip_dato4'):'Descripci&oacute;n Corta 4';
                var d_dato5 = ($p_grid.getCell(id,'d_descrip_dato5') != '') ? $p_grid.getCell(id,'d_descrip_dato5'):'Descripci&oacute;n Corta 5';
                var d_dato6 = ($p_grid.getCell(id,'d_descrip_dato6') != '') ? $p_grid.getCell(id,'d_descrip_dato6'):'Descripci&oacute;n Corta 6';
                var d_dato7 = ($p_grid.getCell(id,'d_descrip_dato7') != '') ? $p_grid.getCell(id,'d_descrip_dato7'):'Descripci&oacute;n Corta 7';
                var d_dato8 = ($p_grid.getCell(id,'d_descrip_dato8') != '') ? $p_grid.getCell(id,'d_descrip_dato8'):'Descripci&oacute;n Corta 8';

                $tg_grid.jqGrid('setLabel', "d_dato",d_descrip);
                $tg_grid.jqGrid('setLabel', "d_dato1",d_dato1);
                $tg_grid.jqGrid('setLabel', "d_dato2",d_dato2);
                $tg_grid.jqGrid('setLabel', "d_dato3",d_dato3);
                $tg_grid.jqGrid('setLabel', "d_dato4",d_dato4);
                $tg_grid.jqGrid('setLabel', "d_dato5",d_dato5);
                $tg_grid.jqGrid('setLabel', "d_dato6",d_dato6);
                $tg_grid.jqGrid('setLabel', "d_dato7",d_dato7);
                $tg_grid.jqGrid('setLabel', "d_dato8",d_dato8);

                setea_parametros('#tablas_generales_grid',{':n_tabla':n_tabla});

            }
        }).navGrid('#parametros_grid_pager',
            {add:true, edit:true, del:true},
            {
                width:700,
                beforeShowForm: defaultBeforeShowForm(function(formid) {
                    $('#c_constante').attr('readonly',true);
                })
            },//edit,
            {
                width:700,
                beforeShowForm: defaultBeforeShowForm(function(formid) {
                    $('#c_constante').attr('readonly',false);

                }),
                closeAfterAdd:true
            },//alta,
            {},//del
            {}//search
        );

        //grilla de tablas generales
        $("#tablas_generales_grid").jqGrid({
            colNames:datos_tabgenerales_grid.colNames(),
            colModel:datos_tabgenerales_grid.colModel(),
            pager: $('#tablas_generales_grid_pager'),
            caption:"ABM Tablas Generales:" ,
			searchToolbarDisplay:true,
            postData:datos_tabgenerales_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",   
            emptyrecords: 'Scroll to bottom to retrieve new page' // the message will be displayed at the bottom,             
        }).navGrid('#tablas_generales_grid_pager',
            {add:true, edit:true, del:true},
            {
                width:700,
                beforeShowForm: defaultBeforeShowForm(function(formid) {
                    $('#c_dato').attr('readonly',true);
                })
            },//edit,
            {
                width:700,
                beforeShowForm: defaultBeforeShowForm(function(formid) {
                    var id= $('#parametros_grid').getGridParam('selrow');
                    var n_tabla2 = $('#parametros_grid').getCell(id,'n_tabla');
                    $('#n_tabla').val(n_tabla2);
                    $('#c_dato').attr('readonly',false);

                }),

                beforeInitData: function(formid) {

                    var id= $('#parametros_grid').getGridParam('selrow');
                    if (id){
                        var n_tabla2 = $('#parametros_grid').getCell(id,'n_tabla');
                        if(n_tabla2!=""){
                            return true;
                        }
                        else{
                            mostrar_cuadro('I', 'ADVERTENCIA', 'Seleccione un par&aacute;metro que tenga asociada una tabla general', function(){}, function(){}, 400, 200);
                            return false;
                        }
                    }else{
                        mostrar_cuadro('I', 'ADVERTENCIA', 'Seleccione un par&aacute;metro por favor', function(){}, function(){}, 400, 200);
                        return false;
                    }
                },
                onclickSubmit: function () { // Para evitar fallos en filas sin refresh
                    var id= $('#parametros_grid').getGridParam('selrow');
                    var n_tabla2 = $('#parametros_grid').getCell(id,'n_tabla');
                    ret = $(this).getGridParam('postData');
                    ret.n_tabla = n_tabla2;
                    return ret;
                },
                closeAfterAdd:true
            },//alta,
            {},//del
            {}//search
        );
    });
</script>

<?php
	require_once(INTRANET."footer.php");
?>
