<?php

function ordenGrid($id_menu, $id_grid_query){
    $db_query = new DB_Query();
    $params = array(':id_menu' => $id_menu, ':id_grid_query' => $id_grid_query);

    if(isset($id_menu)){
        $query = "SELECT NVL(MAX(n_grid),-1) + 1 N_ORDEN
                    FROM grid_queries gq
                   WHERE gq.id_menu = :id_menu";
    }
    else if(isset($id_grid_query)){
        $query = "SELECT NVL(MAX(n_column),-1) + 1 N_ORDEN
                    FROM grid_columns gc
                   WHERE gc.id_grid_query = :id_grid_query";
    }
    else{
        throw new Exception("Ningún parámetro para obtener el orden de Grilla.", 1);
    }

    $db_query->setQuery($query);

    $row_query = $db_query->do_query($params);
    
    $retorno = $row_query[0]['N_ORDEN'];

    return $retorno;
}

function ordenProcedure($id_menu, $id_menu_procedure){
    $db_query = new DB_Query();
    $params = array(':id_menu' => $id_menu, ':id_menu_procedure' => $id_menu_procedure);

    if(isset($id_menu)){
        $query = "SELECT NVL(MAX(n_orden),-1) + 1 N_ORDEN
                    FROM menu_procedures mp
                   WHERE mp.n_id_menu = :id_menu";
    }
    else if(isset($id_menu_procedure)){
        $query = "SELECT NVL(MAX(n_orden),-1) + 1 N_ORDEN
                    FROM procedures_parametros pp
                   WHERE pp.id_menu_procedure = :id_menu_procedure";
    }
    else{
        throw new Exception("Ningún parámetro para obtener el orden de Procedimiento.", 1);
    }

    $db_query->setQuery($query);

    $row_query = $db_query->do_query($params);
    
    $retorno = $row_query[0]['N_ORDEN'];

    return $retorno;
}

function ordenMenu($id_menu, $id_menu_padre){
    $db_query = new DB_Query();
    $params = array(':id_menu' => $id_menu, ':id_menu_padre' => $id_menu_padre);

    if(isset($id_menu_padre)){
        $query = "SELECT NVL(MAX(n_orden),-1) + 1 N_ORDEN
                    FROM menu m
                   WHERE m.id_menu_padre = :id_menu_padre";
    }
    else{
        throw new Exception("Ningún parámetro para obtener el orden de Menú.", 1);
    }

    $db_query->setQuery($query);

    $row_query = $db_query->do_query($params);
    
    $retorno = $row_query[0]['N_ORDEN'];

    return $retorno;
}


$tipo =              $_POST['tipo'];
$id_menu_padre =     $_POST['id_menu_padre'];
$id_menu =           $_POST['id_menu'];
$id_grid_query =     $_POST['id_grid_query'];
$id_menu_procedure = $_POST['id_menu_procedure'];

try{
    switch($tipo){
        case 'GRID':
            $orden = ordenGrid($id_menu,$id_grid_query);
            break;
        case 'PROCEDURE':
            $orden = ordenProcedure($id_menu,$id_menu_procedure);
            break;
        case 'MENU':
            $orden = ordenMenu($id_menu,$id_menu_padre);
            break;
    }

    $respuesta->orden = $orden;
    $respuesta->resultado = 'OK';
}
catch(Exception $e){
    $respuesta->resultado = 'ERROR';
    $respuesta->error = $e->getMessage();
}

echo json_encode($respuesta);

?>
