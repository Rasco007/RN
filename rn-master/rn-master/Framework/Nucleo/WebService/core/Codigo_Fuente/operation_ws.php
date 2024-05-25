<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', '1');
*/
require_once 'autoload_ws.php';

function get_sql_loader($sql, $param){
    try{
        $result = new stdClass();
        $ql_grid = new QL_String($sql);
        $pager = new DB_Pager($ql_grid, 'S', 1, 20, '1', 'asc');
        $grid_fields = $pager->do_pager($param);

        $result->header = $pager->get_header('SQL');
        $result->rows = $grid_fields->rows;    
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function get_menu_grid_loader($param){
    try{
        $grid = new stdClass();
        $result = new stdClass();
        $pager = new DB_Pager(new QL_Grid($param['id_menu'], $param['n_grid']), $param['autoquery'], $param['page'], 50, $param['field_order'], $param['sort_ord']);
        $grid_fields = $pager->do_pager();

        $grid->header = $pager->get_header('GRID');
        $grid->page = $grid_fields->page;
        $grid->total = $grid_fields->total;
        $grid->rows = $grid_fields->rows;

        $result->grid = $grid;
        $result->code = 'OK';
    }
    catch(Exception $e){
        $result->code = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function get_header_loader($param){
    try{
        $result = new stdClass();
        $grid = new stdClass();
        $pager = new DB_Pager(new QL_Grid($param->id_menu, $param->n_grid), $param->autoquery, $param->page, 50, $param->field_order, $param->sort_ord);
        $grid->header = $pager->get_header('GRID', $param->id_menu, $param->n_grid);

        $result->grid = $grid;
        $result->code = 'OK';
    }
    catch(Exception $e){
        $result->code = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function get_data_loader($param){
    try{
        $result = new stdClass();
        $pager = new DB_Pager(new QL_Grid($param->id_menu, $param->n_grid), $param->autoquery, $param->page, $param->rows, $param->field_order, $param->sort_ord);
        $extra = json_decode($param->param, true);
        $grid_fields = $pager->do_pager($extra);

        /** rowcount para records */

        $result->page = $grid_fields->page;
        $result->total = $grid_fields->total;
        $result->records = $grid_fields->records;
        $result->rows = $grid_fields->rows;
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function maestro_abm($param){
    try{
        $db_query = new DB_Query();
        $oper = $param->p_oper;
        $response = new stdClass();

        $init = array(':id_menu' => $param->id_menu, ':n_orden' => $param->n_orden);
        $db_query->setQuery("select d_parametro,d_post,tg.d_dato5 fun_validacion,p.m_obligatorio m_oblig,
                                p.d_descripcion descripcion, p.d_default as d_default, m.d_object_type
    					 from MENU_PROCEDURES m, PROCEDURES_PARAMETROS p, tablas_generales tg
    					 where m.n_id_menu = :id_menu
    					 and m.n_orden = :n_orden
    					 and p.c_tipo_dato = tg.c_dato
    					 and p.n_tabla_dato = tg.n_tabla
    					 and m.id_menu_procedure = p.id_menu_procedure");

        $row_query = $db_query->do_query($init);

        $tipo_objeto = $row_query[0]['D_OBJECT_TYPE'];

        for($i=0;$i < count($row_query);$i++){
            //valido con la funcion parametrizada en el d_dato4 de tablas generales
            if($row_query[$i]['FUN_VALIDACION'] != null && ($oper != 'del' || is_null($oper))){
                $fun_valida = $row_query[$i]['FUN_VALIDACION'];
                $name_param = $row_query[$i]['D_POST'];
                $response->resultado = $fun_valida($param->$name_param, $row_query[$i]['M_OBLIG'], $row_query[$i]['DESCRIPCION']);


                if($response->resultado != 'OK') break;
            }

            if(isset($row_query[$i]['M_OBLIG']) && isset($row_query[$i]['D_DEFAULT'])){
                $parametros[":".$row_query[$i]['D_PARAMETRO']] = $row_query[$i]['D_DEFAULT'];
            }
            else{
                $name_param = $row_query[$i]['D_POST'];
                $parametros[":".$row_query[$i]['D_PARAMETRO']] = $param->$name_param;
            }
        }

        if($response->resultado == 'OK' || $response->resultado == null){
            switch ($tipo_objeto){
                case 'PROCEDURE':
                    $parametros[':p_error'] = null;
                    $parametros[':p_error_ora'] = null;
                    $parametros['menux'] = $param->id_menu;
                    $parametros['ordeny'] = $param->n_orden;

                    $db_llamada_val = new DB_llamada_prc($param->id_menu, $param->n_orden, 'D_VALIDACION');

                    if($db_llamada_val->query != 'NOOK'){
                        $db_validacion = new DB_procedure($db_llamada_val->query);

                        $response = $db_validacion->execute_query($parametros);
                    }

                    if($response->resultado == 'OK' || $response->resultado == null){
                        $db_llamada_prc = new DB_llamada_prc($param->id_menu, $param->n_orden, 'D_PROCEDURE');

                        $db_procedure = new DB_procedure ($db_llamada_prc->query);

                        $response = $db_procedure->execute_query($parametros);
                    }
                    break;
                case 'FUNCTION':

                    $db_llamada_fun = new DB_llamada_fun($param->id_menu, $param->n_orden,'D_PROCEDURE');

                    $db_query = new DB_Query ($db_llamada_fun->query);

                    try{
                        $row_query = $db_query->do_query($parametros);
                        $response->resultado = 'OK';
                        $response->retorno = $row_query[0]['RETORNO'];
                    }
                    catch(Exc_EjecutarConsulta $e){
                        $response->resultado = $e->getMessage();
                        $response->retorno = null;
                    }
                    break;
            }
        }
    }
    catch(Exception $e){
        $response->resultado = 'NOOK';
        $response->error = $e->getMessage();
    }

    return $response;
}

function llamar_reporte($param){
    try{
        $result = new stdClass();

        $result = get_url_report($param->c_tipo_reporte,$param->param,$param->server_name,$param->c_impresion);

        if ($result->formats !=''){

            $result->resultado = 'OK';

        }else{
            $result->resultado = 'NOOK';
        }
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
    
}

function get_autocomplete_data_loader($param_autocomplete){
    try{
        $result_grid = new stdClass();
        $result_autocomplete = new stdClass();

        $db_query = new DB_Query("SELECT gq.id_menu, gq.n_grid
                                    FROM grid_queries gq, menu m
                                   WHERE gq.id_menu = m.id_menu
                                     AND m.d_url = :d_url");

        $param_query = array(':d_url' =>$param_autocomplete->d_url);

        $row_query = $db_query->do_query($param_query);     

        if(count($row_query)<= 0){
            $error = 'No existe la consulta para esa dirección.';
            log_error($error);
            die($error);
        }    

        $param->id_menu    = $row_query[0]['ID_MENU'];
        $param->n_grid     = $row_query[0]['N_GRID'];
        $param->autoquery  = 'S';
        $param->n_orden    = null;
        $param->param      = json_encode($param_autocomplete->param);
        $param->rows       = $param_autocomplete->rows;
        $param->page       = $param_autocomplete->page;
        $param->field_order= $param_autocomplete->field_order;
        $param->sord       = $param_autocomplete->sord;

        $result_grid = get_data_loader($param);

        $aux = autocomplete_format($result_grid->rows,$param);
        $result_autocomplete->rows = $aux;
    }
    catch(Exception $e){
        $result_autocomplete->resultado = 'NOOK';
        $result_autocomplete->error = $e->getMessage();
    }

    return $result_autocomplete;

}

function autocomplete_format($data,$param){
    try{
        $id_menu = $param->id_menu;
        $n_grid = $param->n_grid;
        $table = array();
        $record = array();

        $db_query = new DB_Query("SELECT gc.d_column_name
                                    FROM grid_queries gq, grid_columns gc
                                   WHERE gq.id_grid_query = gc.id_grid_query
                                     AND gq.id_menu = :id_menu
                                     AND gq.n_grid = :n_grid
                                    ORDER BY gc.n_column ASC ");

        $param_query = array(
                                ':id_menu' => $id_menu,
                                ':n_grid'  => $n_grid
                             );

        $row_query = $db_query->do_query($param_query);      

        $i = 0;
        $j = 0;
        foreach ($data as $row) {
            foreach($row_query as $valor){
                $record[$valor['D_COLUMN_NAME']] = $row['cell'][$j];
                $j = $j + 1;
            }

            $table[$i] = $record;
            $i = $i + 1;
            $j = 0;
        }
    }
    catch(Exception $e){
        throw new Exception('Error en el formateo del autocomplete: '.$e->getMessage());
    }

    return $table;
}

function get_lupa_data_loader($param){
    try{
        $filtros = $param->filtros;
        $campos = $param->campos;
        $id_lista = $param->id_lista;
        $cond =  $param->cond;
        $exacto =  $param->exacto;

        $db_pager = new DB_Pager(new QL_Lista($id_lista,$filtros,$campos,$cond,$exacto),
            'S',
            $param->page,
            htmlentities($param->rows),
            $param->sidx,
            $param->sord
        );

        $parametros = array(null);

        for($j=0;$j<count($filtros);$j++){
           $parametros[0][':p_filtro_lista'.$j.''] = $filtros[$j];
        }
        $response = $db_pager->do_pager( $parametros[0] );  
    }
    catch(Exception $e){
        $response->resultado = 'NOOK';
        $response->error = $e->getMessage();
    }

    return $response;
}

function get_lupa_cod_data($param){
    try{
        $filtros = $param->filtros;
        $campos = $param->campos;
        $id_lista = $param->id_lista;
        $cond =  $param->cond;
        $exacto =  $param->exacto;

        $queryl = new QL_Lista($id_lista,$filtros,$campos,$cond,$exacto);
        $db_query = new DB_Query($queryl->getQuery());

        $parametros = array(null);

        for($j=0;$j<count($filtros);$j++){
            $parametros[0][':p_filtro_lista'.$j.''] = $filtros[$j];
        }
        $response = $db_query->do_query($parametros[0]);
        $response = $response[0];
    }
    catch(Exception $e){
        $response->resultado = 'NOOK';
        $response->error = $e->getMessage();
    }

    return $response;
}

function get_export_pdf_data_loader($param){

        $orientacion = $param->orientacion;
        $title = $param->title;
        $columnas_ar = json_decode($param->columnas);
        $parametros = json_decode($param->param);
        $cond = json_decode($param->cond,true);

        if($orientacion == 'V'){
            $ancho_leyenda = '400px';
        }
        if($orientacion == 'H'){
            $ancho_leyenda = '750px';
        }


        $sql = "SELECT c.d_column_title, c.m_visible, c.d_column_name, c.d_extra_param,
                (select d_titulo from menu where id_menu = :id_menu) as TITULO_MENU,
                (select D_VARIABLE from parametros  where c_constante = 'LEYENDA_REPORT') as LEYENDA_REPORT
                FROM grid_queries q
                JOIN grid_columns c ON c.id_grid_query = q.id_grid_query
                WHERE q.id_menu = :id_menu
                    and q.n_grid = :n_grid
                order by n_column asc";
        $db_query = new DB_Query($sql);
        $param_query = array(':id_menu' => $param->id_menu,
            ':n_grid' => $param->n_grid);
        $row_titulos = $db_query->do_query($param_query);

        $ql = new QL_Busqueda($param->id_menu,$param->n_grid,$param->m_autoquery,$param->adv,$cond);

        $sql = $ql->getQuery();

        $sql = $sql ." ORDER BY ".$param->sidx.' '.$param->sord;

        $db_query->setQuery($sql);
        $rows = $db_query->do_query($parametros, OCI_NUM);

        $excel_final = '
            <html>
                <body>
                    <style>
                        body{font-family: Tahoma;}
                        .header{width: 100%;  font-size: 10px; }
                        .header .superior{width: 100%;}
                        .header .superior .logo{width: 160px; float:left;}
                        .header .superior .leyenda_report{ font-weight:bold; font-size: 12px; width: '.$ancho_leyenda.'; float:left; text-align:center;}
                        .header .superior .info{width: 130px; float:right; font-size: 10px;}
                        .header .titulo{width: 100%; font-size: 15px; font-weight: bold; text-align:center;}
                        .table_pdf{
                            font-size: 10px;
                            border: 1px solid #000;
                            border-collapse: collapse;
                            margin: 0 auto;
                        }
                        .table_pdf th, .table_pdf td{border: 1px solid #000; padding:2px}
                        .table_pdf th{background:#999999; color:#ffffff;}
                        
                        
                        .caja_filtros{ font-size: 10px; border: solid 1px #000; padding:3px; margin-bottom:5px; border-radius:2px; background:#e0e0e0; }
                        .caja_filtros .titulo_filtros{font-weight:bold; font-size: 13px; }
                        ul.text_filtros{ padding:0 0 0 20px; margin:0; list-style-type: none}
                        
                        .comentario{font-size: 10px; padding-bottom:5px;}
                        
                        .footer{ font-size: 10px; border-top: solid 2px #000000; padding:5px 5px 0px 5px ;}
                        .footer .nombre_reporte{text-align:left; float: left; width:150px;}
                        .footer .pagina{text-align:right; float: right; width:150px;}
                    </style>';

        if($param->html_filtros != ''){

            $html_filtros = str_replace('#A_B#','<b>',$param->html_filtros);
            $html_filtros = str_replace('#C_B#','</b>',$html_filtros);

            $html_filtros = str_replace('#A_LI#','<li>',$html_filtros);
            $html_filtros = str_replace('#C_LI#','</li>',$html_filtros);

            $html_filtros = str_replace('#FLECHA#','&rarr;',$html_filtros);

            $excel_final .= '<div class="caja_filtros">
                                <span class="titulo_filtros">Filtros utilizados</span>
                                <ul class="text_filtros">
                                    '.$html_filtros.'
                                </ul>
                            </div>';
        }



        if($param->txt_comentario_informe != ''){
            $excel_final .= '<div class="comentario">'.nl2br($param->txt_comentario_informe).'</div>';
        }

        $excel_final .= '<table class="table_pdf"><tr>';

        // Arma los títulos
        foreach($row_titulos as $titulo){
            if($titulo['M_VISIBLE'] == 'S' && in_array( $titulo['D_COLUMN_NAME'], $columnas_ar)){
                $excel_final .= '<th>'.$titulo['D_COLUMN_TITLE'].'</th>';
            }
        }

        $excel_final .= '</tr>';

        foreach($rows as $row){

            $excel_final .= '<tr>';
            for($i=0;$i < count($row); $i++) {
                $row_titulos[$i]['D_EXTRA_PARAM'] = str_replace(":","=",$row_titulos[$i]['D_EXTRA_PARAM']);
                $row_titulos[$i]['D_EXTRA_PARAM'] = str_replace(","," ",$row_titulos[$i]['D_EXTRA_PARAM']);
                if($row_titulos[$i]['M_VISIBLE'] == 'S'  && in_array( $row_titulos[$i]['D_COLUMN_NAME'], $columnas_ar)) $excel_final.= '<td '.$row_titulos[$i]['D_EXTRA_PARAM'].'>'.$row[$i] .'</td>';
            }
            $excel_final .= '</tr>';

        }

        $excel_final .= '</table>
            </body>
        </html>';

        $filename = 'TDI_'.$title.'-'.date("YmdHi",time()).'.pdf';

        $header = '<div class="header">
                        <div class="superior">
                            <div class="logo">
                                <img width="180px" src="../Framework/Imagenes/logo_pdf.png" />
                            </div>
                            <div class="leyenda_report">
                                '.$titulo['LEYENDA_REPORT'].'
                            </div>
                            <div class="info">
                                <b>Usuario</b>: '.$_SESSION['usuario'].'<br>
                                <b>Fecha</b>: '.date('d/m/Y H:i').'
                            </div>
                        </div>
                        <div class="titulo">'.$titulo['TITULO_MENU'].' &rArr; '.$title.'</div>
                    </div>';

        $footer = '<div class="footer">
                        <div class="nombre_reporte">Cantidad total de registros: '.count($rows).'</div>
                        <div class="pagina">P&aacute;gina <span>{PAGENO}</span> de <span>{nb}</span></div>
                    </div>';

        $response->title = 'TDI - '.$titulo['TITULO_MENU'].' - '.$title;
        $response->header = $header;
        $response->footer = $footer;
        $response->excel_final = $excel_final;
        $response->filename = $filename;

    return $response;
}

function get_export_excel_data_loader($param){
    $html = '';

    $columnas = str_replace('["',"'",$param->columnas);
    $columnas = str_replace('"]',"'",$columnas);
    $columnas = str_replace('"',"'",$columnas);


    $columna_tr = str_replace('["',"'<tr><td>'||",$param->columnas);
    $columna_tr = str_replace('"]',"||'</td></tr>'",$columna_tr);
    $columna_tr = str_replace('","',"||'</td><td>'||",$columna_tr);

    //die($columna_tr);
    $parametros = json_decode($param->param);
    $cond = json_decode($param->cond,true);

    $sql = "SELECT c.d_column_title, c.m_visible
            FROM grid_queries q
            JOIN grid_columns c ON c.id_grid_query = q.id_grid_query
            WHERE q.id_menu = :id_menu
                and q.n_grid = :n_grid
                AND c.d_column_name IN(".$columnas.")";
                
    $db_query = new DB_Query($sql);
    $param_query = array(':id_menu' => $param->id_menu,
                   ':n_grid' => $param->n_grid);
    $row_titulos = $db_query->do_query($param_query);

    $ql = new QL_Busqueda($param->id_menu,$param->n_grid,$param->m_autoquery,$param->adv,$cond);
    $sql = $ql->getQuery();
    $sql = $sql ." ORDER BY ".$param->sidx.' '.$param->sord;

    $sql = 'SELECT '.$columna_tr.' as CAMPO FROM ('.$sql.')';

    //die($sql);

    $db_query->setQuery($sql);
    $rows = $db_query->do_query($parametros);

    $html = '<table><tr>';
    foreach($row_titulos as $titulo){
        $html .= utf8_decode('<th>'.$titulo['D_COLUMN_TITLE'].'</th>');
    }
    $html .= '</tr>';
    //die($html);

    $html .= utf8_decode(implode('',array_column($rows, 'CAMPO') ));

    //foreach($rows as $row)echo $row['CAMPO'];

    $html .= '</table>';

    return $html;
}

function get_scf_menus(){
	$query = "SELECT d_titulo, d_url, d_parametros
				  FROM MENU
				  WHERE c_tipo_menu = 'ITEM' 
				  AND c_grupo_menu = 'SCF'
				  AND m_visible = 'S'
				  ORDER by n_orden";
		  
	$db_query = new DB_Query($query);
	$var = array();
	$response = $db_query->do_query($var);
	
	return $response;
}

function llamar_reporte_file($param){
    require_once(FUNCIONES_FRAMEWORK . "llamar_report_file.php");
	try{
        $result = new stdClass();

        $url = obtener_url($param->c_tipo_reporte,$param->param);

        if ($url){

            $result->resultado = 'OK';
            $result->url = $url;

        }else{
            $result->resultado = 'NOOK';
        }
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}
