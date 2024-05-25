<?php

    function obtener_url($nombre_report,$parametros,$c_reporte=null){

        $wsdl = buscar_parametro('JSR_REPO');
        $username = buscar_parametro('JSR_UNAME');
        $password = buscar_parametro('JSR_PASSWD');
        $report_dir = buscar_parametro('JSR_REP_DIR');

        $db_query = new DB_Query();

        $param_prc= array(':p_id_reporte'=>null);

        $db_procedure = new DB_Procedure("BEGIN prc_devuelve_id_reporte(:p_id_reporte); END;");

        $null=null;

        $result = $db_procedure->execute_query($param_prc,$null,TRUE);

        $id_sesion = $param_prc[':p_id_reporte'];

        $url = $wsdl.$report_dir.$nombre_report.'.pdf?p_id_sesion='.$id_sesion;

        $url = $url.'&j_username='.$username.'&j_password='.$password; //URL

        $db_procedure = new DB_Procedure("BEGIN prc_ins_web_llamadas(:id_sesion, :url, :parametros,:p_c_tipo_reporte); END;");
        $param_prc = array(
            ':id_sesion' => $id_sesion,
            ':url' => $url,
            ':parametros' => $parametros,
	          ':p_c_tipo_reporte' => $c_reporte
        );
        $result = $db_procedure->execute_query($param_prc);

        return $url;
    }


?>