<?php
 require_once(INTRANET."header.php");
 $p_n_id_menu = $_POST['p_n_id_menu'];
$lista_dominio = fun_id_lista('LISTA DOMINIO CERTIF DE VALUACION');
$lista_dominio_viejo = fun_id_lista('LISTA DOMINIO VIEJO CERTIF DE VALUACION');
$lista_grupos = fun_id_lista('LISTA GRUPOS CERTIF DE VALUACION');
$lista_tipos = fun_id_lista('LISTA TIPOS CERTIF DE VALUACION');
$lista_marcas = fun_id_lista('LISTA MARCAS CERTIF DE VALUACION');
$lista_modelos = fun_id_lista('LISTA MODELOS CERTIF DE VALUACION');
$lista_descripciones = fun_id_lista('LISTA DESCRIP CERTIF DE VALUACION');

include('actualizacion_puntual_valuaciones/html/main.html');

 $fecha_hoy = date('d/m/Y');
?>

<script type='text/javascript' src='actualizacion_puntual_valuaciones/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type="text/javascript" src='actualizacion_puntual_valuaciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type="text/javascript" src='actualizacion_puntual_valuaciones/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_n_id_menu?>';
    var fecha_hoy='<?=$fecha_hoy?>';
    var p_d_patente; 
    var p_c_marca_aut; 
    var p_d_texto_marca; 
    var p_id_modelo; 
    var p_d_Texto_modelo; 
    var p_id_descripcion; 
    var p_d_texto_descripcion; 
    var p_n_peso_cilindrada; 
    var p_n_modelo_año; 
    var p_c_tipo; 
    var p_c_grupo; 
    var p_c_fmcamod;
    var p_n_hp;
    var p_d_descrip_marca; var p_d_descrip_modelo;
    var p_d_descrip_des; 
    var p_d_descrip_tipo;
    var p_año;  
    var p_pos;
    var p_cuota;
    var v_lista_dominio = '<?=$lista_dominio?>';
    var v_lista_dominio_viejo = '<?=$lista_dominio_viejo?>';
    var v_lista_grupos = '<?=$lista_grupos?>';
    var v_lista_tipos = '<?=$lista_tipos?>';
    var v_lista_marcas = '<?=$lista_marcas?>';
    var v_lista_modelos = '<?=$lista_modelos?>';
    var v_lista_descripciones = '<?=$lista_descripciones?>';
    var p_fecha;

$(document).ready(function() {
        init_eventos();
        inicializarGrillas();
    });

</script>

<?php
require_once(FRAMEWORK_DIR."footer.php")
?>