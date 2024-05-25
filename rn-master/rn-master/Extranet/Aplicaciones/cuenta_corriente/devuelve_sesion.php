<?php

/*require_once('../../funciones/db_pager.php');
require_once('../../funciones/query_loader.php');
require_once('../../funciones/funciones.php');
checklogin();*/
/*require_once(FUNCIONES_FRAMEWORK."db_pager.php");
require_once(FUNCIONES_FRAMEWORK."query_loader.php");
require_once(FUNCIONES_FRAMEWORK.'funciones.php');*/

    // Se obtiene un nuevo ID de sesion
    $db_query = new DB_Query("SELECT id_sesion_bol_agr.NEXTVAL AS v_id_sesion FROM DUAL");
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);

?>