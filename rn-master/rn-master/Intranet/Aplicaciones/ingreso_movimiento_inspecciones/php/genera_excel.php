<?php
    require_once(FUNCIONES_FRAMEWORK_PROY."TDIExcel.php");
        
    $db_query = new DB_Query();

    $id_inspeccion = $_POST['p_id_inspeccion'];
    $id_menu = $_POST['p_n_id_menu'];
    $id_evento = $_POST['p_id_evento'];
    $n_movimiento = $_POST['p_n_movimiento'];
    $n_grid = $_POST['n_grid'];
	$filename = 'Grupos';

    $parametres = array( 
		':p_id_inspeccion' => $id_inspeccion,
		':p_id_evento' => $id_evento,
		':p_n_movimiento' => $n_movimiento);
       // die(var_dump($parametres));
    $sql = "SELECT ID_INSPECCION     ,
    D_VALOR1         ,
    D_VALOR2        ,
    D_VALOR3          ,
    D_VALOR4          ,
    D_VALOR5          ,
    D_VALOR6        ,
    D_VALOR7         ,
    D_VALOR8         
FROM movimientos_grupos_detalle
    JOIN movimientos USING (id_inspeccion, n_movimiento)
WHERE     id_inspeccion = :p_id_inspeccion
    AND id_evento = :p_id_evento
    AND n_movimiento = :p_n_movimiento";

 $sql_titulos = "SELECT d_titulo, 'descrip' dataType
 FROM movimientos_detalle  movd
      JOIN movimientos USING (n_movimiento, id_inspeccion)
      JOIN eventos USING (id_evento)
      JOIN eventos_detalle USING (id_evento, n_secuencia)
 WHERE     id_inspeccion = :p_id_inspeccion
      AND id_evento = :p_id_evento
      AND n_secuencia_hijo <> 0";

     
   

     $query = new DB_Query($sql_titulos);
     $row_titulos = $query->do_query($parametres);
     $indexTitles=0;
    foreach($row_titulos as $titulo){
        $titulos[$indexTitles] = array($titulo['D_TITULO'] => 'descrip');
        $indexTitles++;
    }
    // $titulos = array(0 => array('ID_INSPECCION' => 'number'),
    //                  1 => array('CODIGO_TRIBUTO' => 'descrip'),
    //                  2 => array('NRO_OBJETO_IMPONIBLE' => 'descrip'),
    //                  3 => array('POSICION_DESDE' => 'descrip'),
    //                  4 => array('CUOTA_DESDE' => 'descrip'),
    //                  5 => array('POSICION_HASTA' => 'descrip'),
    //                  6 => array('CUOTA_HASTA' => 'descrip'),
    //                  7 => array('TRAMITE_DESDE' => 'descrip'),
    //                  8 => array('TRAMITE_HASTA' => 'descrip'));


     $excel = new TDIExcelXLSX($filename);

	 $excel->downloadExcel($sql,$parametres,$titulos);

?>