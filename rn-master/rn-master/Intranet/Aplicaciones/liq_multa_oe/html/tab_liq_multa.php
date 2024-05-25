<div class="tab-pane" role="tabpanel" id="liquidacion_multa">
	<div class="panel panel-primary">
		<div class="panel-heading">Liquidación de multa</div>
		<div class="panel-body">
			<form id="form_liq_mul">
				<div class="row">
					<div class="form-group col-md-1" style="text-align:right;">
						<span class="glyphicon glyphicon-home"></span>
					</div>
					<div class="form-group col-md-2">
						<label for="sel_ente">Ente *</label>
					</div>
					<div id="div_sel_ente" class="form-group col-md-3"></div>
					<div class="form-group col-md-2">
						<label for="sel_delegacion">Deleg/Org. *</label>
					</div>
					<div id="div_sel_delegacion" class="form-group col-md-3">
						<select id="sel_delegacion" name="sel_delegacion" class="input-sm form-control">
							<option value="N/A">Seleccione el Ente</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-1" style="text-align:right;">
						<span class="glyphicon glyphicon-option-vertical"></span>
					</div>
					<div class="form-group col-md-2">
						<label for="sel_tipo_mul">Tipo de multa *</label>
					</div>
					<div id="div_sel_tipo_mul" class="form-group col-md-3">
						<select id="sel_tipo_mul" name="sel_tipo_mul" class="input-sm form-control">
							<option value="N/A">Seleccione el Organismo</option>
						</select>
					</div>
					<div class="form-group col-md-2">
						<label for="f_generacion">F. Generación *</label>
					</div>
					<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
						<div class="form-group">
							<div class="input-group date">
								<input type="text" class="form-control input-sm text-center input_fecha validate[required,custom[date]]" name="f_generacion" id="f_generacion" placeholder="(DD/MM/AAAA)" readonly="readonly">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-1"></div>
					<div class="form-group col-md-2">
						<label for="sel_multa">Multa *</label>
					</div>
					<div id="div_sel_multa" class="form-group col-md-3">
						<select id="sel_multa" name="sel_multa" class="input-sm form-control">
							<option value="N/A">Seleccione la fecha de generación</option>
						</select>
					</div>
					<div class="form-group col-md-2">
						<label for="d_aplicacion">Aplicación</label>
					</div>
					<div class="form-group col-md-3">
						<input type="text" class="form-control input-sm text-right" id="d_aplicacion" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-1" style="text-align:right;">
						<span class="glyphicon glyphicon-usd"></span>
					</div>
					<div class="form-group col-md-2">
						<label for="i_multa">Monto de la multa *</label>
					</div>
					<div class="form-group col-md-3">
						<input type="text" class="form-control input-sm text-right validate[required,custom[number]] mascara_importe" id="i_multa">
					</div>
					<div class="form-group col-md-2 automatico">
						<label for="f_vencimiento">Vencimiento</label>
					</div>
					<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3 automatico">
						<div class="form-group">
							<div class="input-group date">
								<input type="text" class="form-control input-sm text-center input_fecha validate[,custom[date]]" name="f_vencimiento" id="f_vencimiento" placeholder="(DD/MM/AAAA)" readonly="readonly">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-1"></div>
					<div class="form-group col-md-2 automatico">
						<label for="i_descuento">Descuento</label>
					</div>
					<div class="form-group col-md-3 automatico">
						<input type="text" class="form-control input-sm text-right" id="i_descuento" readonly="readonly">
					</div>
					<div class="form-group col-md-2 automatico">
						<label for="i_total">Total</label>
					</div>
					<div class="form-group col-md-3 automatico">
						<input type="text" class="form-control input-sm text-right" id="i_total" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-1" style="text-align:right;">
						<span class="glyphicon glyphicon-pencil"></span>
					</div>
					<div class="form-group col-md-2">
						<label for="d_observ">Observaciones</label>
					</div>
					<div class="form-group col-md-8">
						<input type="text" class="form-control input-sm text-left" id="d_observ">
					</div>
				</div>
			</form>
		</div>
	</div>
</div>