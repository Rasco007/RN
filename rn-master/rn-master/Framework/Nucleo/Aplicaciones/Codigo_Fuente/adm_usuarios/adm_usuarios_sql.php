<?php
$tipo_usuario = $_GET['tipo'];

/*** esto quedó viejo, habría que modificar la aplicación para que use bien el framework ****/
$cond3 = json_decode($_POST['cond']);

if($cond3->campo == ''){
    $p_m_autoquery = 'S';
}

if($p_m_autoquery == 'S'){
    $condicion = " WHERE 1=1 ";
}else{
    if ($cond3->campo!='') {
        $condicion = createquery("operadores",$cond3->equiv,$cond3->campo,$cond3->text);
    }else{
        $condicion =" WHERE 1=2 ";
    }
}

$query = "SELECT pac_seguridad.fun_perfil_modif_usu() tiene_perfil
			FROM dual";

$db_query = new DB_Query($query);
$params = array();
$row_query = $db_query->do_query($params);

if($row_query[0]['TIENE_PERFIL'] == 'N'){
    $condicion .= " AND u.c_tipo_usuario IN ('EXTERNO', 'AMBOS') ";
}

$from = " 	FROM usuarios u LEFT JOIN v_rel_persona c ON 
			u.id_rel_persona=c.id_rel_persona ";


$select= "SELECT 	u.c_tipo_usuario d_tipo,
					u.c_usuario c_usuario,
					u.id_rel_persona id_rel_persona,
					(select v.n_documento
						from v_rel_persona v
						where v.id_rel_persona = u.id_rel_persona) codigo,
					fun_xss_filter(u.d_denominacion) d_denominacion,
					u.f_caducidad_clave f_caducidad_clave,
					CASE  
						WHEN (u.c_tipo_usuario = 'EXTERNO') OR (u.c_tipo_usuario IN ('INTERNO', 'AMBOS') AND pac_seguridad.fun_perfil_modif_usu() = 'S') THEN 
							'<button type=''button'' class=''btn_con ui-button ui-widget ui-state-default ui-corner-all'' onClick=''reset_user(".SINGLE_ESC."'||c_usuario||'".SINGLE_ESC.")''><span>Resetear</span></button>' 
					END boton_reset,
					fun_xss_filter(u.d_mail) d_mail,
					fun_xss_filter(u.d_sello) d_sello,
					u.f_baja f_baja,
					DECODE(u.m_log, 'S', 'SI', 'N', 'NO','') m_log";

$sql = 	$select.$from.$condicion;

$parametros = array();
$db_pager = new DB_Pager(new QL_String($sql),$_POST['m_autoquery'], $_POST['page'],$_POST['rows'],$_POST['sidx'],$_POST['sord']);

$response = $db_pager->do_pager($parametros);

echo json_encode($response);

?>