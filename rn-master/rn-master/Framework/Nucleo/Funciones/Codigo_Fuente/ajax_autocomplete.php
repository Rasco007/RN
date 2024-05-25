<?php

function busca_filtro($id_menu){
    $voConn=_connect();
    
    $query_filtro = "SELECT n_id_filtro, d_label FROM sl_filtros WHERE n_id_menu = $id_menu";

    //die($query_filtro); 
    $result_filtro=@mysql_query($query_filtro,$voConn);

    echo("<select name='src_condicion' id='src_condicion' style='width:220px;' onchange='modifica_oper()'>");
    while($filtro=mysql_fetch_array($result_filtro,MYSQL_ASSOC)){
        echo("<option value='".$filtro['n_id_filtro']."'>".$filtro['d_label']."</option>");
    }
    echo("</select>");
}

function busca_oper($id_filtro){
    $voConn=_connect();
    
    $query_oper = "SELECT c_operador, (SELECT d.d_descripcion FROM sl_dominios d WHERE d.c_dominio = 'OPERADORES' AND d.c_codigo = fo.c_operador) AS descrip
                   FROM sl_filtros_operadores fo
                   WHERE fo.n_id_filtro = $id_filtro";

    //die($query_oper);
    $result_oper=@mysql_query($query_oper,$voConn);

    echo("<select name='src_operador' id='src_operador' style='width:220px;'>");
    while($oper=mysql_fetch_array($result_oper,MYSQL_ASSOC)){
        echo("<option value='".$oper['c_operador']."'>".$oper['descrip']."</option>");
    }
    echo("</select>");
}


function busqueda_ajax($id_filtro, $info){
    
    $voConn=_connect();
    
    if($info == '' || $info == null){
        $where = "WHERE 1=2";
    }else{
        $where = "WHERE lower(d_descripcion) LIKE '%$info%'";
    }

    $lista = "SELECT d_query FROM sl_listas WHERE n_id_lista = (SELECT n_id_lista FROM sl_filtros WHERE n_id_filtro = $id_filtro)";
    
    $result=@mysql_query($lista,$voConn);
    //die($result);
    $query_lista=mysql_fetch_array($result,MYSQL_ASSOC);
    
    $lista_completa = $query_lista['d_query'];
    //die($lista_completa);
    $sql = "SELECT d_descripcion FROM ($lista_completa) AS t ".$where." LIMIT 10";
    
    //die($sql);
    
    $resultado=@mysql_query($sql,$voConn);
    
    while($row=mysql_fetch_array($resultado,MYSQL_ASSOC)){
        echo($row['d_descripcion']."\n");
    }
    
}



$tipo = $_GET['tipo'];

if($tipo == 'FIL'){
    busca_filtro($_GET['id_menu']);
    
}else if($tipo == 'OPER'){
    busca_oper($_GET['id_filtro']);
    
}else if($tipo == 'COMP'){
    busqueda_ajax($_GET['id_filtro'], $_GET['q']);
}

?>
