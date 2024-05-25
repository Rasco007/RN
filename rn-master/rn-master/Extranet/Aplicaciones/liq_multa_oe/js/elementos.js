function inicializarElementos(p_n_id_menu) {
	$('#contribuyente').addClass('active');
	
    $('.nav-tabs > li a[title]').tooltip();
	
	$('.wrap_jur').hide();
	$('.wrap_hum').hide();
	$('.automatico').hide();
	
	$('#div_sel_forma_jur').html('<select id="sel_forma_jur" name="sel_forma_jur" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
	$('#div_sel_doc').html('<select id="sel_documento" name="sel_documento" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
	$('#n_documento').val('');
	$('#n_documento').removeClass('validate[required,]');
}