<?php
if (!isset($tipoBoleta)){
    $tipoBoleta = 'PUNTUAL';
}

$param = null;

$sql = "select siguiente_dia_habil(trunc(sysdate)) fecha from dual";

$db_query = new DB_Query($sql);
$results = $db_query->do_query($param);
$fecha_hoy = $results[0]['FECHA'];
?>

<style>
    #ui-datepicker-div {
        z-index: 11000 !important;
        position: absolute !important;
    }
</style>

<!-- Modal Confirmación de Multa -->
<div class="modal fade" id="modal_emitir_boleta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="exampleModalLiveLabel">Impresión de Boleta</h5>
            </div>
            <div class="modal-body">
                <form id="form_modal_emitir">
                    <div class="form-group">
                        <label for="f_emision">Fecha Emisión (*)</label>
                    </div>
                    <div class="form-group">
                        <input type="hidden" id="id_obligacion_emitir">
                        <div class="input-group">
                            <input type="text" class="form-control input-sm datepicker text-center validate[required] input_fecha" name="f_emision" id="f_emision" placeholder="(DD/MM/AAAA)" maxlength="10" autocomplete="off" style="text-align: center;" readonly>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="text-center">
                    <button type="button" class="btn btn-sm" id="btn_modal_emitir"><span class="glyphicon glyphicon-print" aria-hidden="true"></span> Emitir Boleta</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>

    var disabledDays = <?php echo getFeriados(date("Y")) ?>;
    
    $(document).ready(function() {

        $('.datepicker').datepicker({
            dateFormat:'dd/mm/yy',
            changeMonth:true,
            changeYear:true,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        }).mask("99/99/9999").change(function () {
            if ($(this).val().length != 10){
                mostrar_error("El Formato de la Fecha ingresada no es válido.");
                $(this).val(null);
            }
        });
          
        $("#f_emision").datepicker("option","beforeShowDay",function(date){
            return noWeekendsOrHolidays(date,disabledDays);
        });
        
        $('#modal_emitir_boleta').on('shown.bs.modal', function (e) {
            
            if($('#f_emision').val() == null || $('#f_emision').val() == ''){
               
                if ($('#f_actualizacion').val() == 'undefined' || $('#f_actualizacion').val() == '' || $('#f_actualizacion').val() == null){
                    $('#f_emision').datepicker('setDate',fecha_hoy);                   
                }else{
                    $('#f_emision').val($('#f_actualizacion').val());
                }       
            }
               
        });

        $('#f_emision').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
            $(this).val(fecha_hoy);
            }
        });

        $('#btn_modal_emitir').click(function () {
            if ($('#form_modal_emitir').validationEngine('validate')){
                $('#main').procOverlay({visible:true,zIndex:59000});

               
                    $.ajax({
                        type:'POST',
                        url: 'ajax_genericos/validaBoleta.php',
                        data:{
                            "p_oper":'controlarFechaEmision',
                            "p_filtro":$('#f_emision').val()
                        },
                        dataType:'json',
                        success: function( data ) {
                            /*$('#main').procOverlay({visible:false});*/
                            if(data.resultado == 'OK'){
                                if ('<?php echo $tipoBoleta?>' == 'MASIVA'){
                                    $.ajax({
                                        type:'POST',
                                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                        data:{
                                            "p_id_obligaciones":$('#id_obligacion_emitir').val(),
                                            "p_f_actualizacion":$('#f_emision').val(),
                                            "p_id_transaccion": g_id_transaccion, //variable global seteada al generar la transaccion
                                            "id_menu":10734,
                                            "n_orden":0
                                        },
                                        dataType:'json',
                                        success: function( data ) {
                                            $('#main').procOverlay({visible:false});
                                            if(data.resultado == 'OK'){
                                                llamar_report('BOLETA_AGR','p_id_boleta|'+data.p_id_boleta,'PDF');
                                                mostrar_mensaje_modal('S','Emitir Boleta','Se ha generado con éxito la Boleta N°: '+data.p_id_boleta+'.',function () {
                                                    $('#modal_emitir_boleta').modal('hide');
                                                });
                                            }
                                            else{
                                                mostrar_cuadro('E', 'Error', data.resultado);
                                                return;
                                            }
                                        }
                                    });
                                }else{
                                    $.ajax({
                                            type:'POST',
                                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                            data:{
                                                "p_id_obligacion":$('#id_obligacion_emitir').val(),
                                                "p_f_actualizacion":$('#f_emision').val(),
                                                "p_id_transaccion": g_id_transaccion, //variable global seteada al generar la transaccion
                                                "id_menu":10736,
                                                "n_orden":0
                                            },
                                            dataType:'json',
                                            success: function( data ) {
                                                $('#main').procOverlay({visible:false});
                                                if(data.resultado == 'OK'){
                                                    llamar_report('BOLETA_AGR','p_id_boleta|'+data.p_id_boleta,'PDF');
                                                    mostrar_mensaje_modal('S','Emitir Boleta','Se ha generado con éxito la Boleta N°: '+data.p_id_boleta+'.',function () {
                                                        $('#modal_emitir_boleta').modal('hide');
                                                    });
                                                }
                                                else{
                                                    mostrar_cuadro('E', 'Error', data.resultado);
                                                    return;
                                                }
                                            }
                                        });
                                }
                            }
                            else{
                                $('#main').procOverlay({visible:false});
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    });
                
            }
        });
    });
</script>