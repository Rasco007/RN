<?php

function log_error_prc($error) {

    $db_query = new DB_Query("INSERT INTO ERRORES (D_PROCESO, C_CODIGO, D_DESCRIP, F_CORRIDA, D_USUARIO, D_COMANDO, N_LINEA)
                               VALUES (:D_PROCESO, :C_CODIGO, :D_DESCRIP, sysdate, :D_USUARIO, :D_COMANDO, :N_LINEA)");
    $file = $error->getFile();

    if (strpos($file, 'Framework') !== false) {
        $d_proceso = 'FRAMEWORK';
    }elseif (strpos($file, 'Intranet') !== false){
        $d_proceso = 'INTRANET';
    }elseif (strpos($file, 'Extranet') !== false){
        $d_proceso = 'EXTRANET';
    }else{
        $d_proceso = 'INDETERMINADO';
    }

    $param = array(
        ':D_PROCESO' => $d_proceso,
        ':C_CODIGO' => $error->getCode(),
        ':D_DESCRIP' => ('Mensaje: '. $error->getMessage() . chr(10) . chr(13)
            .'StackTrace: '. $error->getTraceAsString()),
        ':D_USUARIO' => $error->getUsuario(),
        ':D_COMANDO' => ('Query: '. $error->getQuery() . chr(10) . chr(13)
            .'Parametros: '. $error->getParametrosJSON()),
        ':N_LINEA' => $error->getLine()
    );

    $db_query->do_query($param);

    $db_query->db_commit();

}

class DB_Procedure {

    var $db_query;

    var $query;

    function DB_Procedure($_query) {
        $this->query = $_query;
        $this->cant_param = $_cant_param;
        $this->db_query = new DB_Query();
    }

    function execute_query(&$param,&$parametros_array = null,$commit = TRUE,$p_log = true) {
        $response = new stdClass();
        $this->db_query->setQuery($this->query);

        try{

            if ($p_log === true) {
                $param_origen['id_menu'] = $param['menux'];
                $param_origen['n_orden'] =  $param['ordeny'];
                $id_log_cab = start_log ($param,'FRMWK_PRC',$param_origen);
            }

            $resultado = $this->db_query->do_query($param,OCI_ASSOC,$parametros_array);

            if((isset($param[':p_error']) && $param[':p_error'] != null)
                || (isset($param[':p_error_ora']) && $param[':p_error_ora'] != null)){

                $this->db_query->db_rollback();
                if ($p_log === true) {
                    fail_log($id_log_cab,$param[':p_error'],$param[':p_error_ora']);
                }

                $d_error = new Exc_EjecutarConsulta($param[':p_error'].' - '.$param[':p_error_ora'], $this->query, $param, $_SESSION['usuario'], null);
                log_error_prc($d_error);
                $response->resultado = $param[':p_error'];
                $response->ora = $param[':p_error_ora'];
            }
            else{
                if($commit) $this->db_query->db_commit();

                if ($p_log === true) {
                    end_log($id_log_cab);
                }
                $response->resultado = "OK";
            }
        }catch(Exc_EjecutarConsulta $error) {
            $this->db_query->db_rollback();

            if ($p_log === true) {
                fail_log(  $id_log_cab,
                    $error->getMessage() . chr(10) . chr(13).'StackTrace: '. $error->getTraceAsString(),
                    'Query: '. $error->getQuery() . chr(10) . chr(13) .'Parametros: '. $error->getParametrosJSON()
                );
            }

            log_error_prc($error);
            $response->resultado = "Ocurri&oacute; un error durante la ejecuci&oacute;n, porfavor comun&iacute;quese con el departamento de sistemas.<br />C&oacute;digo de Error Interno: <b>".$error->getCode()."</b>";
        }

        $init = array(':id_menu' =>  $param['menux'] , ':n_orden' => $param['ordeny']);

        $this->db_query->setQuery("select d_parametro,d_post
							from MENU_PROCEDURES m,PROCEDURES_PARAMETROS p
							where m.n_id_menu = :id_menu
							and m.n_orden = :n_orden
							and m.id_menu_procedure = p.id_menu_procedure
							and (p.c_tipo = 'OUT' or p.c_tipo = 'INOUT')");

        $row_query = $this->db_query->do_query($init);
        for($i=0;$i<count($row_query);$i++){
            $var = $row_query[$i]['D_POST'];
            //$response->$row_query[$i]['D_POST']; = $param[':'.$row_query[$i]['D_PARAMETRO']];
            $response->$var = $param[':'.$row_query[$i]['D_PARAMETRO']];
        }

        return $response;

    }

    function db_commit() {
        $this->db_query->db_commit();
        return $this;
    }

    function db_rollback() {
        $this->db_query->db_rollback();
        return $this;
    }

    function setQuery($_query) {
        $this->query = $_query;
        return $this;
    }

}