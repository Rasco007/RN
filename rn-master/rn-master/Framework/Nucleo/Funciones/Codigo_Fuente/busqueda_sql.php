<?php

checklogin();
session_write_close();
$parametros = json_decode($_POST['param']);
$cond = json_decode($_POST['cond'],true);
$filters = json_decode($_POST['filters'],true);

if($cond['equiv']=='LUPA_EXP'){
    //{"campo":"10108","equiv":"LUPA_EXP","d_dato":"ACUÑA GLADIS","c_dato":"I065","numero":"3252","anio":"2014"}

    $db_query = new DB_Query("select id_grid_query, d_from, nvl(d_where,'1=1') d_where, d_group_by from grid_queries
                            where id_menu = :id_menu
                            and n_grid = :n_grid");

    $var = array(':id_menu' => $parametros->id_menu, ':n_grid' => $parametros->n_grid);
    $row_query = $db_query->do_query($var);


    $c_dato = ($cond['c_dato']=='')? null : $cond['c_dato'];
    $numero = ($cond['numero']=='')? 'null' : $cond['numero'];
    $anio = ($cond['anio']=='')? 'null' : $cond['anio'];

    $id_grid = $row_query[0]['ID_GRID_QUERY'];

    $db_query->setQuery("select d_column_name, d_column_query, c_Tipo_dato, n_tabla_tipo_dato, n_id_lista, d_param_lista
                             from grid_columns where id_grid_query = :id_grid_query order by n_column asc");

    $var2 = array(':id_grid_query' => $row_query[0]['ID_GRID_QUERY']);
    $rows_sel = $db_query->do_query($var2);

    $text_sql = "SELECT ";
    foreach($rows_sel as $row_column) {
        $columns .= $row_column['D_COLUMN_QUERY'] .' as '. $row_column['D_COLUMN_NAME'] .', ';
    }
    $text_sql .= substr($columns, 0, -2);

    $text_sql .= ' '.$row_query[0]['D_FROM']." WHERE xp.c_codigo='$c_codigo'
        AND xp.n_numero=$n_numero
        AND xp.n_anio=$n_anio AND ";
    $text_sql .= " ".$row_query[0]['D_WHERE']." ".$row_query[0]['D_GROUP_BY'];
    //echo $text_sql;
    $db_pager = new DB_Pager(new DB_Query($text_sql),$_POST['m_autoquery'],
        $_POST['page'],$_POST['rows'],$_POST['sidx'],$_POST['sord']);

    $response = $db_pager->do_pager($parametros);
}
else{
    
    $filtros =  fun_union_filters($cond, $filters);
    
    $db_pager = new DB_Pager(new QL_Busqueda($_POST['id_menu'],$_POST['n_grid'],$_POST['m_autoquery'],$_POST['adv'],
					$filtros),$_POST['m_autoquery'],
                     $_POST['page'],$_POST['rows'],$_POST['sidx'],$_POST['sord']);
	//print_r($db_pager);
    $response = $db_pager->do_pager($parametros);
}

session_start();
echo json_encode($response);


function fun_union_filters($filtersBusqueda, $filtersGrid){    
    $filtros->busqueda = $filtersBusqueda;
    $filtros->grilla = $filtersGrid;
    return $filtros;
}

?>
