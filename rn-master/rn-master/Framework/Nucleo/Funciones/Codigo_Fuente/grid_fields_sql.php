<?php

checklogin($_POST['id_menu']);
session_write_close();
$id_menu = $_POST['id_menu'];
$n_grid = $_POST['n_grid'];

// Select * para que cada campo agregado a la tabla se pueda ver en el javascript.
$db_query = new DB_Query("SELECT c.*,
                                 td.d_dato2 d_valida_dato,
                                 td.d_dato3 d_clase,
								 td.d_dato7 mascara,
								 PAC_PHP_GRILLAS.FUN_EXTRA_PARAM_DEFAULT(c.id_grid_column) D_EXTRA_PARAM_DEFAULT,
                 q.m_columns M_COLUMNS
                          from grid_queries q
                          join grid_columns c on c.id_grid_query = q.id_grid_query
                          left join tablas_generales td on td.n_tabla = c.n_tabla_tipo_dato and td.c_dato = c.c_tipo_dato
                          where id_menu = :id_menu and n_grid = :n_grid
                          order by c.n_column asc");
						  
$var = array(':id_menu' => $id_menu, ':n_grid' => $n_grid);						 

$response = $db_query->do_query($var);

session_start();
echo json_encode($response);

?>