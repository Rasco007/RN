<?php

class DB_llamada_fun {
    var $query;
    var $id_menu;
    var $n_orden;
    var $tipo;


    function DB_llamada_fun($_id_menu,$_n_orden,$_tipo) {
        $this->id_menu = $_id_menu;
        $this->n_orden = $_n_orden;
        $this->tipo = $_tipo;
        $this->query = $this->load_llamada();

    }

    function load_llamada(){

        $db_query = new DB_Query("select d_procedure,id_menu_procedure
                                from menu_procedures
                                where n_id_menu = :id_menu
                                    and n_orden = :n_orden");

        $var = array(':id_menu' => $this->id_menu, ':n_orden' => $this->n_orden, ':tipo' => $this->tipo);
        $row_query = $db_query->do_query($var);

        $db_query->setQuery("select d_parametro,tg.d_dato4 d_dato,tg.d_dato5 fun_validacion
                            from procedures_parametros mp, tablas_generales tg
                            where id_menu_procedure = :id_menu_procedure
                                and n_tabla_dato = tg.n_tabla
                                and c_tipo_dato = tg.c_dato
                            order by n_orden asc");

        $par = array(':id_menu_procedure' => $row_query[0]['ID_MENU_PROCEDURE']);
        $rows_columns = $db_query->do_query($par);

        /*if($this->tipo == 'D_VALIDACION'){
            $nombre_prc = $row_query[0]['D_VALIDACION'];
            if($nombre_prc == null) return $llamada_prc = 'NOOK';
        }else{
            $nombre_prc = $row_query[0]['D_PROCEDURE'];
        }*/

        //$llamada_prc = "BEGIN ".$nombre_prc ."(";
		$llamada_fun = "SELECT ".$row_query[0]['D_PROCEDURE']."(";
		
        foreach($rows_columns as $row_column) {
            if($row_column['D_DATO'] != null){
                $llamada_fun .= str_replace(REEMP_QUERY,":".$row_column['D_PARAMETRO'],$row_column['D_DATO']).",";
            }else{
                $llamada_fun .= ":".$row_column['D_PARAMETRO'].",";
            }
        }
		
		$llamada_fun = substr($llamada_fun,0,-1).") RETORNO FROM DUAL";

        /*if($row_query[0]['M_ORA'] == 'S'){
            $llamada_prc .= ":p_error,:p_error_ora);END;";
        }else{
            $llamada_prc = substr($llamada_prc, 0, -1) . ");END;";
        }*/


        return $llamada_fun;
    }

}