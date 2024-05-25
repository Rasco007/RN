<?php

/* 
Descripcion: Este PHP sirve para emitir la boletas enviadas por mail
Pasos:
    1) Validar que los datos enviados por GET existan en la base
    2) Si existe imprimo reporte de boleta asociado
    3) Sino envio error
    4) Mostrar mensaje de actualziación exitosa
*/

session_start();

//*****Conexión de Web Service
define("ID_MENU", "10970");
$titulo = "Imprima su Boleta";

$param['id_menu'] = ID_MENU;

//recupero codigo recibido por url
$param['campo1'] = $_GET['campo1'];
$param['campo2'] = $_GET['campo2'];

if(isset($param['campo1']) && isset($param['campo2'])){
    switch($param['campo1']){
        case 0:
            $tipo_consulta = 'boleta_individual';
            $p_id_boleta = $param['campo2'];
        break;

        case 1:
            $tipo_consulta = 'boleta_grilla';
            $p_id_contrib = $param['campo2'];
        break;
    }
}else{
    header('Location: https://agencia.rionegro.gov.ar/');
}

require_once SCF.'header.php';
?>

<link rel="stylesheet" type="text/css" href="imprime_boleta_scf/css/tables.css">
<script type='text/javascript' src='imprime_boleta_scf/js/eventos.js'></script>
<script type='text/javascript' src='imprime_boleta_scf/js/funciones.js'></script>

<div id="div_main" name="main" hidden>
    <center><h4 id="msj_boleta">
    En caso que la boleta no se abra de forma automática presione <a href="">aquí</a>. Recuerde tener las ventanas emergentes desbloqueadas.
    </h4></center>
</div>

<!-- TABLA PRINCIPAL-->
<div id="div_detalle" class="scroll" hidden>
    <div id="tabla_principal">
        <table>
            <thead>
            <tr>
                <th scope="col">Nro. Boleta</th>
                <th scope="col">Partida</th>
                <th scope="col">Nomenclatura</th>
                <th scope="col">Regante / Parcela</th>
                <th scope="col">F. 1er. Vto.</th>
                <th scope="col">Importe 1er. Vto.</th>
                <th scope="col">F. 2do. Vto.</th>
                <th scope="col">Importe 2do. Vto.</th>
                <th scope="col">Botón Imprimir</th>
            </tr>
            </thead>
            <tbody id="table_body"></tbody>
        </table>
    </div>
</div>

<script> 
    var v_id_menu = '<?=$param["id_menu"]?>';
    var p_tipo_consulta = '<?=$tipo_consulta?>';
    var p_id_boleta = '<?=$p_id_boleta?>';
    var p_id_contrib = '<?=$p_id_contrib?>';
    var v_data = '<?=$data?>';
    var ajax_autocomplete = null;
    var v_id_sesion;
    var v_n_orden;
    var v_id_boleta;
    var v_nro_envio;

    $(document).ready(function () {
        inicializarEventos();
    });
</script>

<?php
require_once SCF."footer.php";
?>

