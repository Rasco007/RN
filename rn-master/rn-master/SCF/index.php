<?php
session_start();

//*****Conexión de Web Service
define("ID_MENU", "100231");

require_once SCF.'header.php';


$param['id_menu'] = ID_MENU;
$resultado = ejecutar_curl(WEBSERVICE_URL.'get_scf_menus/',$param);

$menus = ''; 
if (count($resultado) > 0){
	$resultado = json_decode($resultado);
	foreach ($resultado as $menu){
		$url = $menu -> D_URL;
		if ($menu -> D_PARAMETROS){
			$url = $menu -> D_URL.'?'.$menu -> D_PARAMETROS;
		}		
		$menus .= '<a href="'.APLICACIONES_BASEPATH.$url.'" target="_blank" class="list-group-item">'.$menu -> D_TITULO.'</a>';
	}
}
?>

<div class="container" id="main" name="main" >
    <h1 style="text-align: center">Aplicaciones</h1>
    <div class="list-group">
        <?=$menus?>
    </div>
</div>


<?php
require_once SCF."footer.php";
?>

<style>
    a {
        font-size: 18px;
        
    }
</style>
