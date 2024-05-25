<?php
require_once(EXTRANET . "header.php");
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

#HTML PRINCIPAL
include('pmensual_tpeaje/html/principal.html');
include('pmensual_tpeaje/html/modal_comprar_pase.html');
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
    <script type='text/javascript' src='pmensual_tpeaje/js/grillas.js'></script>
    <script type='text/javascript' src='pmensual_tpeaje/js/eventos.js'></script>
    <script type='text/javascript' src='pmensual_tpeaje/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var id_cont = '<?=$_SESSION['id_rel_persona']?>';

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{'p_id_contribuyente':id_cont,
                    'p_d_patente':null,
                    'p_pase_vigente':null}
        });

        $(document).ready(function() {

            inicializarGrillas();
            inicializarEventos();

        });

        $(document).on('change', '.form-check-input', function() {
            $('#c_clase_aut').val($(this).val());
            $('#campo_importe').val($(this).attr('imp'));
            $('#campo_importe').text('Importe: $'+$(this).attr('impform'));
            $('#campo_importe, #btn_modal_comprar').show();
        });
    </script>

<?php
require_once(EXTRANET."footer.php");
?>