
var datos_main_grid = new GridParam({
	id_menu: v_id_menu,
	n_grid:0,
	m_autoquery:v_m_autoquery
});

//console.log(datos_main_grid.colModel());

$(document).ready(function() {

	$("#main_grid").jqGrid({
		colNames: datos_main_grid.colNames(),
		colModel: datos_main_grid.colModel(),
		pager: $('#main_grid_pager'),
		caption: "Menús para Migrar",
		postData: datos_main_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		height: 400,
		multiselect: true,
		rowattr: function (row) {
			return true;
		}
	}).navGrid('#main_grid_pager',
		{add:false, edit:false, del:false},
		{}, //edit
		{}, //add
		{} //del
	).navButtonAdd('#main_grid_pager',{
		caption:"Migrar menús",
		buttonicon:"ui-icon-del",
		onClickButton: function(){
			migrarMenus();
		},
		position:"last"
	});

	//inicializa_botones();
	//eventos_modals();
});

function migrarMenus() {

	var grid = $("#main_grid");
	var rowKey = grid.getGridParam("selrow");

	if (!rowKey)
		alert("No rows are selected");
	else {
		var selectedIDs = grid.getGridParam("selarrrow");

		var fila = null;
		for (var i = 0; i < selectedIDs.length; i++) {

			fila = grid.getRowData(selectedIDs[i]);

			$.ajax({
				type:'POST',
				url: FUNCIONES_BASEPATH+'maestro_abm.php',
				data:{
					"p_id_menu": fila.ID_MENU,
					"id_menu":v_id_menu, //11001,
					"n_orden":0
				},
				dataType:'json',
				success: function( data ) {
					if(data.resultado == 'OK'){
						mostrar_cuadro('I', 'Info', 'Menu migrado');
						$("#main_grid").trigger('reloadGrid');
						return;
					}
					else{
						mostrar_cuadro('E', 'Error', data.resultado);
						return;
					}
				}
			});

		}
	}

}