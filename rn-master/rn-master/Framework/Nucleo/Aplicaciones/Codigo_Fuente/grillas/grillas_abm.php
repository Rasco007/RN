<?php
$parametros['oper'] = $_POST['oper'];
$parametros[':n_id_menu'] = fun_dato_base($_POST['n_id_menu'],'N');
$parametros[':nro_grid'] = fun_dato_base($_POST['nro_grid'],'N');
$parametros[':d_from'] = fun_dato_base($_POST['d_from'],'T');
$parametros[':id_grid_query'] = fun_dato_base($_POST['id_grid_query'],'N');
$parametros[':d_where'] = fun_dato_base($_POST['d_where'],'T');
$parametros[':d_group_by'] = fun_dato_base($_POST['d_group_by'],'T');
$parametros[':d_prc_validacion'] = fun_dato_base($_POST['d_prc_validacion'],'T');
$parametros[':m_columns'] = fun_dato_base($_POST['m_columns'],'T');
$parametros[':p_error'] = null;
$parametros[':p_error_ora'] = null;

$db_query = new DB_Procedure("begin prc_abm_grilla(:oper, 
													:id_grid_query, 
													:n_id_menu,
													:nro_grid,
													:d_from,
													:d_where,
													:d_group_by,
													:d_prc_validacion,
													:m_columns,
													:p_error,
													:p_error_ora); END;");
							
$resultado = $db_query->execute_query($parametros);

echo(json_encode($resultado));
?>