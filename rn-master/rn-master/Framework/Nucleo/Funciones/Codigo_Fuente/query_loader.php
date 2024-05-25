<?php

// Clase Strategy que arma la query a ejecutar por el DB_Pager
abstract class Query_Loader{

	var $query;

	function getQuery(){
		return $this->query;
	}

}

// Estrategia que pasa un string como query.
class QL_String extends Query_Loader {

	function QL_String($_query) {

		$this->query = $_query;
	}

}

// Estrategia que carga el query de las tablas GRID_QUERIES y GRID_COLUMNS
abstract class QL_Grid_Abs extends Query_Loader {

	var $id_menu;
	var $n_grid;
	var $type_column;

	function load_query() {

		$db_query = new DB_Query("select id_grid_query,
                                         d_from,
                                         nvl(d_where,'1=1') d_where,
                                         d_group_by
                                  from grid_queries
                                  where id_menu = :id_menu
                                    and n_grid = :n_grid");
		$var = array(':id_menu' => $this->id_menu, ':n_grid' => $this->n_grid);
		$row_query = $db_query->do_query($var);

		$db_query->setQuery("select d_column_name,
                                    d_column_query,
                                    c_Tipo_dato,
                                    n_tabla_tipo_dato,
                                    n_id_lista,
                                    d_param_lista
                             from grid_columns
                             where id_grid_query = :id_grid_query
                             order by n_column asc");

		$var2 = array(':id_grid_query' => $row_query[0]['ID_GRID_QUERY']);
		$rows_columns = $db_query->do_query($var2);

		$query = "SELECT ";

		foreach($rows_columns as $row_column) {
			$column = '';
			if($row_column['N_ID_LISTA']) {
				$array_param = explode(',',$row_column['D_PARAM_LISTA']);
				$ql_lista = new QL_Lista($row_column['N_ID_LISTA'], $array_param);
				$column = '('.str_replace(REEMP_LISTA,'('.$ql_lista->getQuery().')',$row_column['D_COLUMN_QUERY']).')';
			} else
				$column = $row_column['D_COLUMN_QUERY'];

			if($row_column['C_TIPO_DATO'] == 'TXT' || $row_column['C_TIPO_DATO'] == 'TXTMIN' || $row_column['C_TIPO_DATO'] == 'TXTMAY') $column = 'fun_xss_filter(to_char('.$column.'))';

			if($row_column['C_TIPO_DATO'] == 'ROWID'){
				$column = 'ROWIDTOCHAR('.$column.')';
			}

			$colname = $row_column['D_COLUMN_NAME'];

			if($row_column['C_TIPO_DATO'] == "DATETIME"){
				$column = "to_char(" . $column . ", 'dd/mm/yyyy hh24:mi:ss')";
				$colname = $row_column['D_COLUMN_NAME'] . "_fhora";
			}
			//$column .= ' as '. $row_column['D_COLUMN_NAME'] .', ';
			$column .= ' as '. $colname .', ';


			$query .= $column;


		}

		$query = substr($query, 0, -2).' '.
			$row_query[0]['D_FROM'] .' '.
			'WHERE '. $this->d_where() .' and '. $row_query[0]['D_WHERE'] .' '.
			$row_query[0]['D_GROUP_BY'];

		return $query;

	}

	abstract function d_where();

}

// No tiene ningún "Where" extra
class QL_Grid extends QL_Grid_Abs {

	function QL_Grid($_id_menu, $_n_grid){

		$this->id_menu = $_id_menu;
		$this->n_grid = $_n_grid;
		$this->query = $this->load_query();
	}

	function d_where(){
		return '1=1';
	}
}

// Estrategia que carga el query filtrado con el CrearBúsqueda
class QL_Busqueda extends QL_Grid_Abs {
	var $m_autoquery;
	var $cond;
	var $adv;
	var $condGrillas;

	function QL_Busqueda($_id_menu, $_n_grid, $_m_autoquery = 'N', $_adv = 'N', $_cond){

		$this->id_menu = $_id_menu;
		$this->n_grid = $_n_grid;
		$this->m_autoquery = $_m_autoquery;
		$this->cond = $_cond->busqueda;		
		$this->condGrillas = $_cond->grilla;		
		$this->adv = $_adv;
		$this->query = $this->load_query();
		
	}

	function d_where(){

		if ($this->m_autoquery == 'S') {
			//return '1=1';
		}

		if ($this->adv == 'S') {
			//BUSQUEDA AVANZADA
			$primer_condicion = true;
			for($i=0; $i <= $this->cond['num_filtros']; $i++) {
				
				$nombre_grilla_filtros = $this->cond['nombre_grilla_filtros'];
				$adv_cond=$nombre_grilla_filtros."_"."operador_".$i;
				$adv_combo=$nombre_grilla_filtros."_"."campo_".$i;
				$adv_txt=$nombre_grilla_filtros."_"."valor_campo_".$i;
				$adv_src_desde = $nombre_grilla_filtros."_"."valor_campo_desde_".$i;
				$adv_src_hasta = $nombre_grilla_filtros."_"."valor_campo_hasta_".$i;
				
				$this->cond[$adv_txt] = str_replace("'","''",$this->cond[$adv_txt]);
				$operadores_sin_valor = array("NULL", "NNULL", "nu");
				
				if ((!in_array($this->cond[$adv_cond], $operadores_sin_valor)) && $this -> filtroVacio($this->cond[$adv_txt], $this->cond[$adv_src_desde], $this->cond[$adv_src_hasta])){
					continue;
				}
				
				$db_query = new DB_Query("SELECT f.d_where d_where, 
									tg.d_dato1 d_dato1, 
									tg.d_dato2 d_dato2, 
									tg.d_dato3 d_dato3, 		
									tg.d_dato4 d_dato4, 
									tg.d_dato6 d_dato6, 
									f.d_tipo_dato d_tipo_dato
	                  FROM filtros f, filtros_operadores op, parametros p, tablas_generales tg
	                  WHERE f.n_id_filtro=op.n_id_filtro
	                  AND p.n_tabla = tg.n_tabla
	                  AND p.c_constante = 'OPERADORES'
	                  AND op.c_operador = tg.c_dato
	                  AND tg.c_dato= :equiv
	                  AND f.n_id_filtro=:campo");

				$var = array(':equiv' => $this->cond[$adv_cond], ':campo' => $this->cond[$adv_combo]);
				$row_query = $db_query->do_query($var);

				$cond=str_replace(REEMP_OPERADOR, $row_query[0]['D_DATO1'], $row_query[0]['D_WHERE']); //coloca el operador

				//obtiene el tipo de dato
				switch($row_query[0]['D_TIPO_DATO']) {
					case "NUM":
						if($this->cond[$adv_cond]=='LIKE' || $this->cond[$adv_combo]=='NLIKE') {
							$tipo_dato="T";
						}else{
							$tipo_dato="N";
						}
						break;
					case "DATE":
						$tipo_dato="F";
						break;
					case "DATETIME":
						$tipo_dato="FH";
						break;
					case "VARCHAR2":
					default:
						$tipo_dato="T";
						break;
				}
				//echo $row_query[0]['D_TIPO_DATO']; die();
				if($row_query[0]['D_DATO6']=='S') {
					//separa los terminos si es una lista
					$text_array=explode(",",$this->cond[$adv_txt]);
					foreach ($text_array as $array) {
						if($i==0){
							$text2.=fun_limpia_dato($array,$tipo_dato);
						}else{
							$text2.=",".fun_limpia_dato($array,$tipo_dato);
						}
						$i++;
					}
					//coloca los caracteres previos
					$texto=$row_query[0]['D_DATO2'].$text2.$row_query[0]['D_DATO3'];
					$cond=str_replace(REEMP_PVALOR, $texto , $cond);
				}else{
					if($row_query[0]['D_DATO4']=="S") {
						//coloca los caracteres previos
						$texto=$row_query[0]['D_DATO2'].$this->cond[$adv_txt].$row_query[0]['D_DATO3'];

						//si es un between arma la query correcta
						if($row_query[0]['D_DATO1']=="BETWEEN") {
							if($tipo_dato=="F") {
								$texto=" TO_DATE('".$this->cond[$adv_src_desde]."','dd/mm/rrrr') AND TO_DATE('".$this->cond[$adv_src_hasta]."','dd/mm/rrrr')";
							}else{
								$texto=$this->cond[$adv_src_desde]." AND ".$this->cond[$adv_src_hasta];
							}
						}else if($row_query[0]['D_DATO1']=="RANGO"){
							$texto = " TO_DATE('".$this->cond[$adv_src_desde]."','dd/mm/rrrr') AND TO_DATE('".$this->cond[$adv_src_hasta]."','dd/mm/rrrr')";
							$campos_rango = explode(" ",$cond);
							$p_desde = " TO_DATE('".$this->cond[$adv_src_desde]."','dd/mm/rrrr')";
							$p_hasta = " TO_DATE('".$this->cond[$adv_src_hasta]."','dd/mm/rrrr')";
							$p_hasta_nulo = " TO_DATE('31/12/3000','dd/mm/rrrr')";
							$c_desde = $c_hasta = $campos_rango[0];

							$cond =
								"(($p_desde between $c_desde and nvl($c_hasta, $p_hasta_nulo) )
							 or
							 ($p_hasta between $c_desde and nvl($c_hasta, $p_hasta_nulo) )
							 or
							 ($p_desde <= $c_desde and nvl($c_hasta, $p_hasta_nulo) <= $p_hasta)
							)";
						}else{
							$texto=fun_limpia_dato($texto,$tipo_dato);
						}
						$cond = str_replace(REEMP_PVALOR, $texto, $cond);

					}else{
						//IS NULL o IS NOT NULL
						//$cond=str_replace(REEMP_PVALOR, "", $cond);
						$cond = strstr($row_query[0]['D_WHERE'], REEMP_OPERADOR, true);
						$cond .= $row_query[0]['D_DATO1']; 
					}
				}
				
				$op = "";
				if (($i < $this->cond['num_filtros']) && (!$primer_condicion)) $op = "AND";
				$condicion.=" $op ".$cond;
				$primer_condicion = false;
			}
			//die($condicion);
		}
		
		//AGREGO FILTROS DE GRILLA
		if ($this->condGrillas != null) {
			
			$oper = $this->condGrillas['groupOp'];
			
			foreach ($this->condGrillas['rules'] as $filtro) {
				/*estructura de array
					$filtro[field] -> nombre de campo
					$filtro[op] -> operador 'IGU' , 'MAY' , etc
					$filtro[data] -> valor
				*/
				if ($condicion != ''){
					$condicion .= ' '.$oper. ' ' ;
				}
				
				$db_query = new DB_Query("select '('||GC.D_COLUMN_QUERY||')' campo,
								        tg.d_dato1 d_dato1, 
								        tg.d_dato2 d_dato2, 
								        tg.d_dato3 d_dato3,         
								        tg.d_dato4 d_dato4, 
								        tg.d_dato6 d_dato6, 
								        gc.c_tipo_dato C_TIPO_DATO
								from grid_queries g,grid_columns gc,parametros p,tablas_generales tg
								where g.id_menu = :id_menu
								and g.n_grid = :n_grid
								and g.id_grid_query = gc.id_grid_query 
								and d_column_name = :campo
								and p.c_constante = 'OPERADORES'
								and tg.c_dato = :equiv");

				$par = array(':equiv' => $filtro['op'], ':campo' => $filtro['field'],
							':id_menu' => $this->id_menu, ':n_grid' => $this->n_grid);
				$row_query = $db_query->do_query($par);
				
				switch($row_query[0]['C_TIPO_DATO']) {
					case "NUM": case "INT": case "DEC": 
					case "PORC": case "SEQ":case "HORA": 
					case "IMP": case "IMP_3": case "COD_BARRAS":
						if($equiv=='LIKE' || $equiv=='NLIKE') {
							$tipo_dato="T";
						}else{
							$tipo_dato="N";
						}
						break;
					case "DATE":
						$tipo_dato="F";
						break;
					case "DATETIME":
						$tipo_dato="FH";
						break;
					case "VARCHAR2":
					default:
						$tipo_dato="T";
						break;
				}
				
				if ($row_query[0]['D_DATO1'] == 'IS NULL'){
					$condicion .= $row_query[0]['CAMPO'] .' '.$row_query[0]['D_DATO1'];
					
				}elseif($row_query[0]['D_DATO1'] == 'LIKE'){
					/*
					$valor=$row_query[0]['D_DATO2'].$filtro['data'].$row_query[0]['D_DATO3'];
					$valor = fun_limpia_dato($valor, 'T');
					$filtro_grilla_campo = $row_query[0]['CAMPO'];
					$condicion .= ' FUN_TRANSFORMAR_CADENA('.$filtro_grilla_campo .') ' . $row_query[0]['D_DATO1'].' FUN_TRANSFORMAR_CADENA('. $valor.') ' ;
					*/
					
					$valor=$row_query[0]['D_DATO2'].$filtro['data'].$row_query[0]['D_DATO3'];
					$valor = fun_limpia_dato($valor, 'T');
					
					$filtro_grilla_campo = $row_query[0]['CAMPO'];
					$filtro_grilla_valor = ' UPPER('. $valor.') ';
					
					/** Se agrega la excepcion de no aplicar la funcion UPPER al campo para no perder performance (indice) **/
					if (!esCampoCodigo($filtro['field'])){
						$filtro_grilla_campo = ' FUN_TRANSFORMAR_CADENA('.$filtro_grilla_campo.') ';
						$filtro_grilla_valor = ' FUN_TRANSFORMAR_CADENA('. $valor.') ';
					}
					
					$condicion .= ' '.$filtro_grilla_campo .' ' . $row_query[0]['D_DATO1'].' '.$filtro_grilla_valor;
		
				}else{
					if($row_query[0]['D_DATO4']=='S') {
						//coloca los caracteres previos (Ej. %DATO%)
						$valor=$row_query[0]['D_DATO2'].$filtro['data'].$row_query[0]['D_DATO3'];
						
					}else{
						$valor = $filtro['data'];
					}
				
					$valor = fun_limpia_dato($valor,$tipo_dato);
					
					$filtro_grilla_campo = $row_query[0]['CAMPO'];
					
					switch ($tipo_dato){
						case "T":
							
							$filtro_grilla_valor = ' UPPER('. $valor.') ';
							
							/** Se agrega la excepcion de no aplicar la funcion FUN_TRANSFORMAR_CADENA al campo para no perder performance (indice) **/
							if (!esCampoCodigo($filtro['field'])){
								$filtro_grilla_campo = ' FUN_TRANSFORMAR_CADENA('.$filtro_grilla_campo.') ';
								$filtro_grilla_valor = ' FUN_TRANSFORMAR_CADENA('. $valor.') ';
							}
							
							$valor = $filtro_grilla_valor;
							
							/*
							$filtro_grilla_campo = ' FUN_TRANSFORMAR_CADENA('.$filtro_grilla_campo.') ';
							$valor = ' FUN_TRANSFORMAR_CADENA('.$valor.') ';
							*/
						break;
						case "N":
							$filtro_grilla_campo = ' fun_convierte_a_numero('.$filtro_grilla_campo .') ';
						break;
					}
					
					$condicion .= ' '.$filtro_grilla_campo .' ' . $row_query[0]['D_DATO1'].' '. $valor ;
					
				}
				
			}
		}
		
		
		if($condicion == ''){
			$condicion = '1=1';
		}
		//die($condicion);
		return $condicion;

	}

	function d_where_adv(){
		return '3=3';
	}
	
	function filtroVacio($campo_valor, $campo_valor_desde, $campo_valor_hasta){
		return (($campo_valor == "") && ($campo_valor_desde == "") && ($campo_valor_hasta == ""));
	}
}

// Estrategia que carga el query de la tabla LISTAS
class QL_Lista extends Query_Loader {

	var $id_lista;
	var $parametros;
	var $campos;
	var $exacto;
	var $condicion;

	function QL_Lista($_id_lista, $_parametros, $_campos=null, $_condicion=null, $_campo_exacto=null, $desde_grid='S'){
		$this->id_lista = $_id_lista;
		$this->parametros = $_parametros;
		$this->campos = $_campos;
		$this->condicion = $_condicion;
		$this->campo_exacto =$_campo_exacto;
		$this->desde_grid = $desde_grid;
		$this->query = $this->load_query();
	}

	function load_query() {

		$db_query = new DB_Query("select d_query                                      
                                  from listas
                                  where n_id_lista = :id_lista");

		$var = array(':id_lista' => $this->id_lista);
		$row_query = $db_query->do_query($var);

		$query_lista = $row_query[0]['D_QUERY'];

		for($j=0;$j<count($this->parametros);$j++){
			if ($this->desde_grid == 'S'){
				if($this->parametros[$j] == null) $this->parametros[$j] = 'null';
				$query_lista=str_replace(NOT_PLISTA.$j.NOT_SIGN,$this->parametros[$j], $query_lista);
				$query_lista=str_replace(NNULL,'null', $query_lista);
			}else{
				$query_lista=str_replace(NOT_PLISTA.$j.NOT_SIGN,':p_filtro_lista'.$j.'', $query_lista);
				$query_lista=str_replace(ESC_PFILTRO.$j.ESC_CHAR,':p_filtro_lista'.$j.'', $query_lista);//quita comillas de los parametros por si el programador declara con comillas
			}
		}
		if(strlen($this->condicion) > 0) {
			if($this->campo_exacto){
				$cond = "WHERE ".$this->campo_exacto." = '".$this->condicion."'";
			}else{
				$cond="	WHERE fun_transformar_cadena(".$this->campos[0].") like fun_transformar_cadena('%".$this->condicion."%')";
				for($j=1;$j<count($this->campos);$j++){
					$cond .="	OR fun_transformar_cadena(".$this->campos[$j].") like fun_transformar_cadena('%".$this->condicion."%')";
				}
			}
		}

		$query_lista = "SELECT * FROM (".$query_lista.") v ".$cond;
		return $query_lista;
	}

}

function esCampoCodigo($filtro_nombre){
	$filtro_nombre_mayus = strtoupper ($filtro_nombre);
	if (substr_count($filtro_nombre_mayus, 'C_') == 0){
		return false;
	}
	
	return true;
}

// funcion que limpia dato sql
function fun_limpia_dato($texto,$tipo) {
	$texto=trim($texto);
	switch($tipo) {
		default:
		case "T":
			$texto = str_replace(DOBLE_ESC, DOBLE_SINGQUOTE, $texto);
			$texto = str_replace(TRIPLE_ESC, SINGLE_ESC, $texto);
			if (strlen($texto)==0) {
				$texto="NULL";
			}else{
				$texto="'".$texto."'";
			}
			break;
		case "N":
			if (strlen($texto)==0) {
				$texto="NULL";
			}
			/*
			$texto = str_replace('.', '', $texto);
			$texto = str_replace(',', '.', $texto);
			*/
			$texto = "fun_convierte_a_numero('".$texto."')";
			
			break;
		case "NCF":
			if (strlen($texto)==0) {
				$texto="NULL";
			}else{
				$texto = str_replace('.', '', $texto);
				$texto = str_replace(',', '.', $texto);
			}
			break;
		case "F":
			if (strlen($texto)<8) {
				$texto="NULL";
			}else{
				$texto="to_date('".$texto."','dd/mm/rrrr')";
			}
			break;
		case "FH":
			if (strlen($texto)<8) {
				$texto="NULL";
			}else{
				$texto="to_date('".$texto."','dd/mm/rrrr hh24:mi:ss')";
			}
			break;

	}
	return $texto;
}

?>