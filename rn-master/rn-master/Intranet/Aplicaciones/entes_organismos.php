<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_entes = fun_id_lista('LISTADO DE ENTES');

#HTML PRINCIPAL
include('entes_organismos/html/entes_organismos.html');
?>
<style>
    .dropdown-menu{
        max-width: 1px;
    }

    .cDropdown {
        padding: 5px 12px;
        color: #555;
        text-transform: none;
        font-weight: unset;
        font-size: 11px;
        border: 1px solid #c2cad8 !important;
        background-color: white !important;
    }

    .cDropdown :hover{
        background-color: white !important;
        color: #555;
    }
</style>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_lista_entes = '<?=$lista_entes?>';

</script>

<script type='text/javascript' src='entes_organismos/js/entes_organismos.js'></script>

<?php
require_once(INTRANET."footer.php");
?>