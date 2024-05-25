<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];


$query = "SELECT C_DATO c_constancia,
                 D_DATO d_constancia,
                 NVL (D_DATO2, 'N') pide_objeto
          FROM TABLAS_GENERALES A, PARAMETROS B
          WHERE B.C_CONSTANTE = 'TCONST' 
          AND A.N_TABLA = B.N_TABLA
          AND A.C_DATO NOT IN (2,9)
          ORDER BY 1";

$db_query ->setQuery($query);
$param = array();
$constancias = $db_query->do_query($param);


$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');

#HTML PRINCIPAL
include('reimprimir_constancias/html/principal.html');
?>
    <script type='text/javascript' src='reimprimir_constancias/js/elementos.js'></script>
    <script type='text/javascript' src='reimprimir_constancias/js/eventos.js'></script>
    <script type='text/javascript' src='reimprimir_constancias/js/funciones.js'></script>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var pide_objeto;
    //LISTAS
    var v_lista_tdoc = '<?=$lista_tdoc?>';
    
    //AUTOCOMPLETE
    var ajax_autocomplete; 

    $(document).ready(function() {
        inicializarElementos();
        inicializarEventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>