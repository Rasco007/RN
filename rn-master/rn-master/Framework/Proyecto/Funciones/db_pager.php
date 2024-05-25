<?php

/*

function log_error($error) {
    
    $db_query = new DB_Query("INSERT INTO ERRORES (D_PROCESO, C_CODIGO, D_DESCRIP, F_CORRIDA, D_USUARIO, D_COMANDO, N_LINEA)
                               VALUES (:D_PROCESO, :C_CODIGO, :D_DESCRIP, sysdate, :D_USUARIO, :D_COMANDO, :N_LINEA)");
   
    $par = array(
            ':D_PROCESO' => $error->getFile(),
            ':C_CODIGO' => $error->getCode(),
            ':D_DESCRIP' => ('Mensaje: '. $error->getMessage() . chr(10) . chr(13)
                            .'StackTrace: '. $error->getTraceAsString()),
            ':D_USUARIO' => $error->getUsuario(),
            ':D_COMANDO' => ('Query: '. $error->getQuery() . chr(10) . chr(13)
                            .'Parametros: '. $error->getParametrosJSON()),
            ':N_LINEA' => $error->getLine()
     );
    $db_query->do_query($par);
    
    $db_query->db_commit();
    
}

class DB_Pager {
    
    var $db_query;
    
    var $page;
    var $limit;
    var $sidx;
    var $sord;
    var $autoquery;
    
    // Funciona como un Strategy
    var $ql;
    
    function DB_Pager($_ql, $_autoquery = 'S', $_page = 1, $_limit = 50, $_sidx = '1', $_sord = 'asc') {
        
        $this->page = $_page;
        $this->limit = $_limit;
        $this->sidx = $_sidx;
        $this->sord = $_sord;
        $this->autoquery = $_autoquery;
        
        $this->ql = $_ql;
        
        $this->db_query = new DB_Query();
    }
    
    function do_pager($param = null) {
        
        if ($this->autoquery == 'N'){
            $response->page=1;
            $response->total=1;
            $response->records=0;
            
            return $response;
        }
        
        $sql = $this->ql->getQuery();
        
        $query_count = "select count(*) cant from ($sql) v";
        $this->db_query->setQuery($query_count);
        
        try{
            $row = $this->db_query->do_query($param);
        }catch(Exc_EjecutarConsulta $error) {
            log_error($error);
            die($error->getMessage());
        }
        
        $count = $row[0]['CANT'];
        
        if($count>0)$total_pages = ceil($count / $this->limit);
        else $total_pages = 1;
        
        if ($this->page > $total_pages) $this->page = $total_pages;
        
        $start = $this->limit * ($this->page - 1) + 1;
        $limit = $this->limit * $this->page;
        if($limit > $count) $limit = $count;
        
        $query_pager = "SELECT *
        FROM(
            SELECT v1.*, rownum r
            FROM (".$sql."
                  ORDER BY ".$this->sidx." ".$this->sord.") v1
            ) v2
        WHERE r between ".$start." AND ".$limit;
        
        $this->db_query->setQuery($query_pager);
        
        try{
            $rows = $this->db_query->do_query($param,OCI_NUM);
        }catch(Exc_EjecutarConsulta $error) {
            log_error($error);
            die($error->getMessage());
        }
        
        $response->page=$this->page;
        $response->total=$total_pages;
        $response->records=$count;
        
        foreach($rows as $ix => $valor) {
            $response->rows[$ix]['id'] = $ix;
            $response->rows[$ix]['cell'] = $valor;
        }
        
        return $response;
    }

    function setQuery_loader($_ql) {
        $this->$ql = $_ql;
    }

}
*/


function log_error($error)
{

    $db_query = new DB_Query("INSERT INTO ERRORES (D_PROCESO, C_CODIGO, D_DESCRIP, F_CORRIDA, D_USUARIO, D_COMANDO, N_LINEA)
                               VALUES (:D_PROCESO, :C_CODIGO, :D_DESCRIP, sysdate, :D_USUARIO, :D_COMANDO, :N_LINEA)");
    $file = $error->getFile();

    if (strpos($file, 'Framework') !== false) {
        $d_proceso = 'FRAMEWORK';
    } elseif (strpos($file, 'Intranet') !== false) {
        $d_proceso = 'INTRANET';
    } elseif (strpos($file, 'Extranet') !== false) {
        $d_proceso = 'EXTRANET';
    } else {
        $d_proceso = 'INDETERMINADO';
    }

    $par = array(
        ':D_PROCESO' => $error->getFile(),
        ':C_CODIGO' => $error->getCode(),
        ':D_DESCRIP' => ('Mensaje: ' . $error->getMessage() . chr(10) . chr(13)
            . 'StackTrace: ' . $error->getTraceAsString()),
        ':D_USUARIO' => $error->getUsuario(),
        ':D_COMANDO' => ('Query: ' . $error->getQuery() . chr(10) . chr(13)
            . 'Parametros: ' . $error->getParametrosJSON()),
        ':N_LINEA' => $error->getLine()
    );
    $db_query->do_query($par);

    $db_query->db_commit();

}

class DB_Pager
{

    var $db_query;

    var $page;
    var $limit;
    var $sidx;
    var $sord;
    var $autoquery;

    // Funciona como un Strategy
    var $ql;

    function DB_Pager($_ql, $_autoquery = 'S', $_page = 1, $_limit = 50, $_sidx = '1', $_sord = 'asc')
    {

        $this->page = $_page;
        $this->limit = $_limit;
        $this->sidx = $_sidx;
        $this->sord = $_sord;
        $this->autoquery = $_autoquery;

        $this->ql = $_ql;

        $this->db_query = new DB_Query();
    }

    function do_pager($param = null)
    {

        $param_origen['id_menu'] = $this->ql->id_menu;
        $param_origen['n_grid'] = $this->ql->n_grid;
        $id_log = start_log($param, 'FRMWK_GRID', $param_origen);

        if ($this->autoquery == 'N') {
            $response->page = 1;
            $response->total = 1;
            $response->records = 0;

            end_log($id_log);
            return $response;
        }

        $sql = $this->ql->getQuery();

        $query_count = "select count(*) cant from ($sql) v";
        $this->db_query->setQuery($query_count);

        try {
            $row = $this->db_query->do_query($param);
        } catch (Exc_EjecutarConsulta $error) {
            log_error($error);
            fail_log($id_log,
                $error->getMessage() . chr(10) . chr(13) . 'StackTrace: ' . $error->getTraceAsString(),
                'Query: ' . $error->getQuery() . chr(10) . chr(13) . 'Parametros: ' . $error->getParametrosJSON()
            );
            die($error->getMessage());
        }

        $count = $row[0]['CANT'];

        if ($count > 0) $total_pages = ceil($count / $this->limit);
        else $total_pages = 1;

        if ($this->page > $total_pages) $this->page = $total_pages;

        $start = $this->limit * ($this->page - 1) + 1;
        $limit = $this->limit * $this->page;
        if($limit > $count) $limit = $count;

        if ($this->sidx != '' && $this->sidx != null) {
            if (substr(trim($this->sidx), -1) == ',') {
                $v_sidx = substr(trim($this->sidx), 0, -1);
                $v_sord = '';
            } else {
                $v_sidx = $this->sidx;
                $v_sord = $this->sord;
            }
        } else {
            $v_sidx = '1';
            $v_sord = 'asc';
        }

        $query_pager = "SELECT *
        FROM(
            SELECT v1.*, rownum r
            FROM (".$sql."
                  ORDER BY ".$v_sidx." ".$v_sord.") v1
            ) v2
        WHERE r between ".$start." AND ".$limit;

        $this->db_query->setQuery($query_pager);

        try {
            $rows = $this->db_query->do_query($param, OCI_NUM);
        } catch (Exc_EjecutarConsulta $error) {
            log_error($error);
            fail_log($id_log,
                $error->getMessage() . chr(10) . chr(13) . 'StackTrace: ' . $error->getTraceAsString(),
                'Query: ' . $error->getQuery() . chr(10) . chr(13) . 'Parametros: ' . $error->getParametrosJSON()
            );
            die($error->getMessage());
        }

        $response->page = $this->page;
        $response->total = $total_pages;
        $response->records = $count;

        foreach ($rows as $ix => $valor) {
            $response->rows[$ix]['id'] = $ix + $start;
            $response->rows[$ix]['cell'] = $valor;
        }
        end_log($id_log);
        return $response;
    }

    function setQuery_loader($_ql)
    {
        $this->$ql = $_ql;
    }

    function get_header($type, $id_menu, $n_grid)
    {
        $_ql = $this->ql->getQuery();
        if ($type == 'SQL') {
            $param = array(':sql' => $_ql);

            $db_query = new DB_Query("SELECT COLUMN_VALUE FROM TABLE(PAC_PHP_GRILLAS.FUN_OBTENER_COLUMNAS_SQL(:sql))");
            $response = $db_query->do_query($param);
        } else {
            $db_query = new DB_Query("SELECT c.d_column_title as COLUMN_VALUE,
                                            M_OBLIGATORIO,
                                            TD.D_DATO2 D_VALIDA_DATO,
                                            D_VALIDACION,
                                            TD.D_DATO3 D_CLASE,
                                            D_EDITOPTIONS,
                                            M_READONLY,
                                            N_ID_LISTA,
                                            D_COLUMN_NAME,
                                            M_VISIBLE,
                                            M_EDITABLE,
                                            PAC_PHP_GRILLAS.FUN_EXTRA_PARAM_DEFAULT(c.id_grid_column) D_EXTRA_PARAM_DEFAULT
                                        from grid_queries q
                                        join grid_columns c on c.id_grid_query = q.id_grid_query
                                        left join tablas_generales td on td.n_tabla = c.n_tabla_tipo_dato and td.c_dato = c.c_tipo_dato
                                        where id_menu = :id_menu and n_grid = :n_grid
                                        order by c.n_column asc");

            $param = array(':id_menu' => $id_menu, ':n_grid' => $n_grid);

            $response = $db_query->do_query($param);
        }
        return $response;
    }
}

?>