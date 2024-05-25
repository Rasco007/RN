<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$db_query = new DB_query("SELECT to_char(trunc(sysdate),'YYYY') año from dual");
$row = $db_query->do_query();

$v_año = $row[0]['AÑO'];


$db_query = new DB_query("SELECT FUN_TIENE_PERMISO('AUT_ALLANAMIENTO') aut_allanamiento from dual");
$row = $db_query->do_query();
$v_allanamiento = $row[0]['AUT_ALLANAMIENTO'];

if ($v_allanamiento === 'S') {
    $perm_allanamiento = true;
}else{
    $perm_allanamiento = false;
}

$db_query = new DB_query("SELECT FUN_TIENE_PERMISO('AUT_ADD_INSTANCIA') AUT_ADD_INSTANCIA from dual");
$row = $db_query->do_query();
$v_add_instancia = $row[0]['AUT_ADD_INSTANCIA'];

if ($v_add_instancia === 'S') {
    $perm_add_instancia = true;
}else{
    $perm_add_instancia = false;
}



#HTML PRINCIPAL
include('adm_instancias/html/modal_instancia.php');
include('adm_instancias/html/modal_adjunto.php');
include('adm_instancias/html/adm_instancias.html');
include('adm_instancias/html/modal_allanamiento.html');


?>

<SCRIPT>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_año = '<?=$v_año?>';

    var v_perm_allanamiento   = '<?=$perm_allanamiento?>';
    var v_perm_add_instancia = '<?=$perm_add_instancia?>';



</script>

<script type='text/javascript' src='adm_instancias/js/funciones.js'></script>
<script type='text/javascript' src='adm_instancias/js/adm_instancias.js'></script>
<script type='text/javascript' src='adm_instancias/js/eventos.js'></script>

<script>
    $(document).ready(function() {
         inicializarEventos();
    });
</script>
<?php
require_once(INTRANET."footer.php");
?>