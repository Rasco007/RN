<?php
require_once(INTRANET . "header.php");
$mostrarInspecciones = $_POST['p_m_inspecciones'];
if ($mostrarInspecciones ==='S'){
    $solo_multas_fisca = 'S';
}else{
    $solo_multas_fisca = 'N';
}

$db_query = new DB_Query();

$query = "    
            select id_inspeccion, n_expediente ||'/'||n_anio_expediente d_expediente, n_cuit, d_denominacion
            from inspecciones inner join contribuyentes using(id_contribuyente)
            where c_estado != '5'
         ";

$db_query ->setQuery($query);
$param = array();
$inspecciones = $db_query->do_query($param);



$query = "  select  id_infraccion, 
                    d_infraccion, 
                    d_articulo,
                    NVL((SELECT 'S' FROM DUAL WHERE EXISTS (SELECT 1 FROM PARAM_INFRACCIONES_VALORES piv WHERE C_TRIBUTO IS NOT NULL AND pi.id_infraccion = piv.id_infraccion)),'N') AS M_OBLIGACION 
            from PARAM_INFRACCIONES pi
            where c_ente = 'ART'
            and m_generacion_manual = 'S' 
            and (
                    (id_infraccion in (33) and :solo_fisca='S') 
                    or 
                    :solo_fisca = 'N'
            )
         ";

$db_query ->setQuery($query);
$param = array(':solo_fisca'=>$solo_multas_fisca);

$infracciones = $db_query->do_query($param);

#El siguiente php, setea la variable $fecha_hoy con la fecha del dia si es habil, caso contrario siguiente dia habil.
#Este PHP, tambien obtiene los feriados y los guardas en la variable global disabledDays
include('modal_emitir_boleta.php');
?>
<style >

    .c-input-group {
        display: table;
        border-collapse: separate;
    }
    .c-input-group, .input-group-btn, .input-group-btn > .btn {
        position: relative;
    }

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

    .dropdown-menu {
        font-size: 12px;
    }

    input[type=date]{
        padding-top: 0px;
        padding-bottom: 0px;
    }
</style>

<div class="panel panel-primary">
<div id="multa" class="panel-heading"> Datos de la Multa </div>
    <div class="panel-body">
        <form class="form-horizontal" id="frm_multa">
            <div class="form-group">
                <label for="f_generacion" class="col-sm-2 control-label">F. Generación *</label>
                <div class="col-sm-2 c-input-group" >
                    <input type="input" class="form-control input-sm text-center input_fecha" id="f_generacion" placeholder="DD/MM/AAAA">
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span>  </span>
                </div>
            </div>
            <div class="form-group">
                <label for="n_cuit" class="col-sm-2 control-label">CUIT *</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control input-sm text-center" id="n_cuit" placeholder="">
                    <input type="hidden" class="form-control input-sm text-center" id="id_contribuyente" placeholder="">
                </div>
                <label for="d_denominacion" class="col-sm-2 control-label">Denominación *</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control input-sm" id="d_denominacion" placeholder="">
                </div>
            </div>
            <?php if ($mostrarInspecciones ==='S'){?>
            <div class="form-group">
                <label for="id_inspeccion" class="col-sm-2 control-label">Inspección</label>
                <div class="col-sm-8">
                    <select id="id_inspeccion" data-live-search="true" title="Inspección Relacionada" class="selectpicker form-control input-sm " data-style="cDropdown">
                        <?php foreach ($inspecciones as $inspeccion): ?>
                            <option value="<?=$inspeccion['ID_INSPECCION']; ?>"> N° <?=$inspeccion['ID_INSPECCION']; ?> - Exp: <?=$inspeccion['D_EXPEDIENTE']; ?> CUIT: <?=$inspeccion['N_CUIT']; ?> - <?=$inspeccion['D_DENOMINACION']; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <?php } ?>
            <div class="form-group" id="div_c_multa">
                <label for="c_multa" class="col-sm-2 control-label">Concepto de Multa *</label>
                <div class="col-sm-8">
                    <select id="c_multa" data-live-search="true" title="Infracción Detectada" class="selectpicker form-control input-sm" data-style="cDropdown">
                        <?php foreach ($infracciones as $infraccion): ?>
                            <option value="<?=$infraccion['ID_INFRACCION']; ?>" data-oblig="<?=$infraccion['M_OBLIGACION']; ?>"> <?=$infraccion['D_INFRACCION']; ?> - Art: <?=$infraccion['D_ARTICULO']; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <div class="form-group" id="div_oblig">
                <label for="id_obligacion" class="col-sm-2 control-label">Oblig. Origen *</label>
                <div class="col-sm-8 c-input-group" id="lupa_obl">
                    <input type="hidden" class="form-control input-sm" id="id_obligacion" placeholder="Obligación Relacionada">
                    <input type="text" class="form-control input-sm" id="id_obligacion_desc" placeholder="Obligación Relacionada">
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-search"></span> </span>
                </div>
            </div>

            <div class="form-group" id="div_c_valor">
                <label for="c_valor" class="col-sm-2 control-label">Tipo Multa *</label>
                <div class="col-sm-8">
                    <select id="c_valor" data-live-search="true" title="Tipo de Multa" class="selectpicker form-control input-sm" data-style="cDropdown">

                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="d_aplicacion" class="col-sm-2 control-label">Aplicación *</label>
                <div class="col-sm-8">
                    <input type="hidden" id="c_aplicacion">
                    <input type="text" class="form-control input-sm" id="d_aplicacion" disabled placeholder="Indica si la Multa impacta automáticamente en Cuenta Corriente">
                </div>
            </div>
            <div class="form-group">
                <label for="d_expediente" class="col-sm-2 control-label">Expediente</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control input-sm" id="d_expediente" placeholder="999999Ryyyy o 999999Ayyyy" maxlength="11">
                </div>
            </div>
            <div class="form-group">
                <label for="f_vto" class="col-sm-7 control-label aplicacion_automatica">F. Vencimiento *</label>
                <div class="col-sm-3 c-input-group aplicacion_automatica" >
                    <input type="input" class="form-control input-sm text-center input_fecha" id="f_vto" placeholder="DD/MM/AAAA" >
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span>  </span>
                </div>
            </div>
            <div class="form-group">
                <label for="i_multa" class="col-sm-7 control-label">Monto de Multa *</label>
                <div class="col-sm-3 c-input-group">
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-usd"></span>  </span>
                    <input type="text" class="form-control input-sm mascara_importe" id="i_multa" placeholder="Monto de Multa">
                </div>
            </div>
            <div class="form-group">
                <label for="f_vto_desc" class="col-sm-2 control-label aplicacion_automatica">F. Vto. Desc.</label>
                <div class="col-sm-3 c-input-group aplicacion_automatica" >
                    <input type="input" class="form-control input-sm text-center input_fecha" id="f_vto_desc" placeholder="DD/MM/AAAA" >
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span>  </span>
                </div>
                <label for="i_descuento_vto" class="col-sm-2 control-label aplicacion_automatica">Descuento Vto.</label>
                <div class="col-sm-3 c-input-group aplicacion_automatica">
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-usd"></span>  </span>
                    <input type="text" class="form-control input-sm mascara_importe" id="i_descuento_vto" placeholder="Descuento al Vto." disabled>
                </div>
            </div>
            <div class="form-group">
            <label for="i_descuento_notif" class="col-sm-2 control-label aplicacion_automatica col-sm-offset-5">Descuento Notif.</label>
                <div class="col-sm-3 c-input-group aplicacion_automatica">
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-usd"></span>  </span>
                    <input type="text" class="form-control input-sm mascara_importe" id="i_descuento_notif" placeholder="Descuento al Notif." disabled>
                </div>
            </div>
            <div class="form-group">
                <label for="i_total" class="col-sm-2 control-label col-sm-offset-5">Total *</label>
                <div class="col-sm-3 c-input-group">
                    <span class="input-group-addon"> <span class="glyphicon glyphicon-usd"></span>  </span>
                    <input type="text" class="form-control input-sm mascara_importe" id="i_total" placeholder="Total Determinado" disabled>
                </div>
            </div>
            <div class="form-group">
                 <label for="d_observaciones" class="col-sm-2 control-label">Observaciones</label>

                <div class="col-sm-8">
                    <input type="text" class="form-control input-sm" id="d_observaciones" placeholder="Observaciones" maxlength="3500">
                </div>
            </div>
            <br>
            <div class="form-group col-sm-10">
                <button type="button" id="btn_limpiar"  class="btn-info btn-sm" style="float: left;" onclick="limpiar_formulario()">Limpiar Formulario</button>
                <button type="button" id="btn_generar"  class="btn-danger btn-sm" style="float: right;">Generar</button>
            </div>
        </form>

    </div>
</div>

<script type="text/javascript" src="liq_multa_art/js/funciones.js"></script>
<script type="text/javascript" src="liq_multa_art/js/liq_multa_art.js"></script>

<script>
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_m_automatica;
    $('#n_cuit').attr('disabled',false);
    $('#d_denominacion').attr('disabled',false);

    <?php if ($mostrarInspecciones === 'S'){?>
        $('#n_cuit').attr('disabled',true);
        $('#d_denominacion').attr('disabled',true);
    <?php } ?>

</script>
<?php
require_once(INTRANET."footer.php");
?>
