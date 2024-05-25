<?php
checklogin();
session_write_close();
define('CANT_COLS', 2);

define('COD_LUPA', "LUPA");
define('COD_INPUT', "INPUT");
define('COD_INPUT_LUPA', "INPUT_LUPA");
define('COD_HIDDEN', "HIDDEN");
define('COD_SELECT', "SELECT");

define('PREFIJO_ID_OPERADOR', 'operador_');
define('PREFIJO_VALOR_CAMPO', "valor_campo_");
define('PREFIJO_VALOR_CAMPO_DESC_LUPA', "valor_campo_d_lupa_");
define('PREFIJO_VALOR_CAMPO_DESDE', "valor_campo_desde_");
define('PREFIJO_VALOR_CAMPO_HASTA', "valor_campo_hasta_");
define('PREFIJO_VALOR_CAMPO_LUPA', "lupa_");

$oper = $_POST["oper"];
$nombre_grilla = $_POST["nombre_grilla"];

$result = array();
switch($oper){
	case "CARGA_COMPLETA":
		$sql = "SELECT  f.n_id_filtro, f.d_label, f.d_tipo_dato, f.n_id_lista, f.d_tipo_dato, f.d_param_lista, op.c_operador, tg.d_dato, f.m_obligatorio, (f.n_columna - 1) n_columna, (f.n_fila - 1) n_fila
						FROM filtros f, filtros_operadores op, parametros p, tablas_generales tg
						WHERE f.n_id_filtro = op.n_id_filtro
						AND f.n_id_menu= :id_menu
						AND f.n_grilla = :id_grilla  
						AND op.c_operador = tg.c_dato
						AND tg.n_tabla = p.n_tabla
						AND p.c_constante = 'OPERADORES'
						AND op.n_id_filtro= f.n_id_filtro			  
						ORDER BY d_label, lpad(tg.d_dato5,2,'0')";

		$param = array( 
						':id_menu' => $_POST['id_menu'], 
						':id_grilla' => $_POST['id_grilla']
					);
					
		$db_query = new DB_Query($sql);
		$regs = $db_query->do_query($param);

		$result = obtenerFiltrosNormalizado($regs, $nombre_grilla);
	break;
	case "CARGA_CAMPO_VALOR":
		$sql = "SELECT d_tipo_dato, n_id_lista, d_param_lista, m_obligatorio
				FROM filtros
				WHERE n_id_filtro= :id_filtro";
				
		$param = array(':id_filtro' => $_POST['id_filtro']);
					
		$db_query = new DB_Query($sql);
		$regs = $db_query->do_query($param);
		$result = obtenerCampoValor($_POST['id'], $regs[0]['N_ID_LISTA'], $regs[0]['D_PARAM_LISTA'], $_POST['cod_operador'], $regs[0]['D_TIPO_DATO'], $regs[0]['M_OBLIGATORIO'], $nombre_grilla);
	break;
}
session_start();
echo json_encode($result);

function obtenerFiltrosNormalizado($regs, $nombre_grilla){
	$data = array();
	$id = 0;
	
	foreach($regs as $indice => $registro){
		$id_filtro = $registro['N_ID_FILTRO'];
		
		if (!$data["filtros"][$id_filtro]){
			$data["filtros"][$id_filtro] = obtenerDatosGralesFiltro($id, $registro, $nombre_grilla);
			$data["filtros"][$id_filtro]['operadores']['elementos'][0] = obtenerOperadorFiltro($id, $nombre_grilla);
			$id++;
		}
			
		$data["filtros"][$id_filtro]['operadores']['elementos'][0]['opciones'][] = obtenerOperadorFiltroOpciones($registro);
		
		$operadores = $data["filtros"][$registro['N_ID_FILTRO']]['operadores'];
		
		if (esPrimerOperador($operadores)){
			$id_lista = obtenerIdLista($registro['N_ID_LISTA']);
			$filtros_lista = obtenerFiltrosLista($registro['D_PARAM_LISTA']);						
			$cod_operador = $operadores['elementos'][0]['opciones'][0]['codigo'];
			
			$tipo_dato = $registro['D_TIPO_DATO']; 
			$obligatorio = $registro['M_OBLIGATORIO'];
			$data["filtros"][$id_filtro]['campo_valor'] = obtenerCampoValor(($id - 1), $id_lista, $filtros_lista, $cod_operador, $tipo_dato, $obligatorio, $nombre_grilla);
		}
	}
	
	$data = agregarDatosVistaTabla($data);

	return $data;
}

function agregarDatosVistaTabla($data){
	$cant_filtros = count($data["filtros"]);
	$data["filtros"] = ($cant_filtros == 0)?"":normalizarFilasColumnasFiltros($data["filtros"]);
	$data["cols"] = ($cant_filtros == 0)?0:obtenerCantColumnas();
	$data["filas"] = ($cant_filtros == 0)?0:obtenerCantFilas($data["filtros"]);
	$data["cant_filtros"] = $cant_filtros;
	
	return $data; 
}

function normalizarFilasColumnasFiltros($filtros){
	if (!filtrosContienenFilaColumna($filtros)){
		$col = $fil = 0;
		
		foreach ($filtros as $k => $v){
			$filtros[$k]["fil"] = $fil;
			$filtros[$k]["col"] = $col;
			$col++;
			
			if ($col == CANT_COLS){
				$col = 0;
				$fil++;
			}
		}
	}

	return $filtros;
}

function filtrosContienenFilaColumna($filtros){
	foreach ($filtros as $k => $v){
		if (filtroFilaColumnaVacia($v['fil'], $v['col'])) return false;
		if (filtroFilaColumnaValorInvalido($v['fil'], $v['col'])) return false;
	}
	
	return true;
}

function filtroFilaColumnaVacia($fil, $col){
	return (($fil == "") || ($col == ""));
}

function filtroFilaColumnaValorInvalido($fil, $col){
	return (($fil < 0) || ($col < 0));
}

function obtenerCantFilas($data){
	$max_fil = 0;
	foreach ($data as $k => $v){
		if ($max_fil < $v['fil']) $max_fil = $v['fil'];
	}

	return ($max_fil + 1);
}

function obtenerCantColumnas(){
	return CANT_COLS;
}

function obtenerDatosGralesFiltro($id, $registro, $nombre_grilla){
	$id_lista = obtenerIdLista($registro['N_ID_LISTA']);
	$filtros_lista = obtenerFiltrosLista($registro['D_PARAM_LISTA']);
	$label = str_replace(" ", "&nbsp;", $registro['D_LABEL']);
	
	return array(
					'id' 			=> $id,
					'id_filtro' 	=> $registro['N_ID_FILTRO'],
					'label' 		=> $label,
					'id_lista' 		=> $id_lista,
					'filtros_lista' => $filtros_lista,
					'col' 			=> $registro['N_COLUMNA'],
					'fil' 			=> $registro['N_FILA'],
					'obligatorio' 	=> $registro['M_OBLIGATORIO'],
					'nombre_grilla' => $nombre_grilla
			);
}

function obtenerOperadorFiltro($id, $nombre_grilla){
	return array(
					'tipo' => COD_SELECT,
					'tipo_dato' => 'TXT',
					'name' => $nombre_grilla.'_'.PREFIJO_ID_OPERADOR.$id,
					'id' => $nombre_grilla.'_'.PREFIJO_ID_OPERADOR.$id,
					'opciones' => array()
			);
}

function obtenerOperadorFiltroOpciones($registro){
	return array(
					'codigo' => $registro['C_OPERADOR'],
					'valor' => $registro['D_DATO']
			);
}

function esPrimerOperador($operadores){
	return (count($operadores) == 1);
}

function obtenerCampoValor($id, $id_lista, $filtros_lista, $cod_operador, $tipo_dato, $obligatorio, $nombre_grilla){
	$campo_valor = array();
	$id_elemento = 0;
	
	$campo_valor['elementos'][$id_elemento] = obtenerDatosBaseElemento(COD_INPUT, $tipo_dato, $id, $obligatorio, PREFIJO_VALOR_CAMPO, 'N', $nombre_grilla);
								
	if(strlen($id_lista) > 0){
		$campo_valor['elementos'][$id_elemento] = obtenerDatosBaseElemento(COD_HIDDEN, $tipo_dato, $id, 'N', PREFIJO_VALOR_CAMPO, 'N', $nombre_grilla);
		$id_elemento++;
		$campo_valor['elementos'][$id_elemento] = obtenerDatosBaseElemento(COD_INPUT_LUPA, $tipo_dato, $id, $obligatorio, PREFIJO_VALOR_CAMPO_DESC_LUPA, 'S', $nombre_grilla);		
		$id_elemento++;
		$campo_valor['elementos'][$id_elemento] = obtenerDatosBaseElemento(COD_LUPA, COD_LUPA, $id, 'N', PREFIJO_VALOR_CAMPO_LUPA, 'N', $nombre_grilla);
		$campo_valor['elementos'][$id_elemento]['id_lista'] = $id_lista;
		$campo_valor['elementos'][$id_elemento]['filtros_lista'] = $filtros_lista;
		$campo_valor['elementos'][$id_elemento]['c_lupa_id'] = $nombre_grilla.'_'.PREFIJO_VALOR_CAMPO.$id;
		$campo_valor['elementos'][$id_elemento]['d_lupa_id'] = $nombre_grilla.'_'.PREFIJO_VALOR_CAMPO_DESC_LUPA.$id;
		
	}else{
		if(($cod_operador == 'BETWEEN') || ($cod_operador == 'RANGO')) {
			$campo_valor['elementos'][$id_elemento] = obtenerDatosBaseElemento(COD_INPUT, $tipo_dato, $id, $obligatorio, PREFIJO_VALOR_CAMPO_DESDE, 'N', $nombre_grilla);
			$id_elemento++;
			$campo_valor['elementos'][$id_elemento] = obtenerDatosBaseElemento(COD_INPUT, $tipo_dato, $id, $obligatorio, PREFIJO_VALOR_CAMPO_HASTA, 'N', $nombre_grilla);
		}else if(($cod_operador == 'NNULL') || ($cod_operador == 'NULL') || ($cod_operador == 'nu')){
			$campo_valor['elementos'][$id_elemento] = obtenerDatosBaseElemento(COD_HIDDEN, $tipo_dato, $id, $obligatorio, PREFIJO_VALOR_CAMPO, 'N', $nombre_grilla);
		}	
	}
	
	return $campo_valor;
}

function obtenerDatosBaseElemento($tipo, $tipo_dato, $id, $obligatorio, $name, $readonly, $nombre_grilla){
	return array(
					'tipo' 		  => $tipo,
					'tipo_dato'   => $tipo_dato,
					'name' 		  => $nombre_grilla.'_'.$name.$id,
					'id' 		  => $nombre_grilla.'_'.$name.$id,
					'obligatorio' => $obligatorio,
					'readonly' 	  => $readonly
				);
}

function obtenerIdLista($id_lista){
	$id = ($id_lista)?$id_lista:"";
	return $id;
}

function  obtenerFiltrosLista($param_lista){
	$filtros_lista = explode(',', $param_lista);
	if ($filtros_lista[0] == null) $filtros_lista = "";
	return $filtros_lista;
}
?>