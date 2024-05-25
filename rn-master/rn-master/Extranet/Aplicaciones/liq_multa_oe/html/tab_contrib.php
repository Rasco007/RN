<div class="tab-pane" role="tabpanel" id="contribuyente">
	<div class="panel panel-primary">
		<div class="panel-heading">Contribuyente</div>
		<div class="panel-body">
			<form id="form_contrib">
				<div class="row">
					<div class="form-group col-md-3"></div>
					<div class="form-group col-md-2">
						<label for="n_cuit">CUIT *</label>
					</div>
					<div class="form-group col-md-4">
						<input type="text" class="form-control input-sm text-right mascara_cuit validate[required,custom[validaCuit]]" id="n_cuit">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-3"></div>
					<div class="form-group col-md-2">
						<label for="d_denominacion">Denominación *</label>
					</div>
					<div class="form-group col-md-4">
						<input type="text" class="form-control input-sm text-left validate[required] mayusculas" id="d_denominacion">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-3"></div>
					<div class="form-group col-md-2">
						<label for="sel_personeria">Personería *</label>
					</div>
					<div id="div_sel_personeria" class="form-group col-md-4">
						<select id="sel_personeria" name="sel_personeria" class="input-sm form-control">
							<option value="N/A">Ingrese el nro. de CUIT</option>
						</select>
					</div>
				</div>
				<div class="row wrap_jur">
					<div class="form-group col-md-3"></div>
					<div class="form-group col-md-2">
						<label for="sel_forma_jur">Forma jurídica *</label>
					</div>
					<div id="div_sel_forma_jur" class="form-group col-md-4"></div>
				</div>
				<div class="row wrap_hum">
					<div class="form-group col-md-3"></div>
					<div class="form-group col-md-2">
						<label for="sel_documento">Tipo documento *</label>
					</div>
					<div id="div_sel_doc" class="form-group col-md-4"></div>
				</div>
				<div class="row wrap_hum">
					<div class="form-group col-md-3"></div>
					<div class="form-group col-md-2">
						<label for="n_documento">Nro. documento *</label>
					</div>
					<div class="form-group col-md-4">
						<input type="text" class="form-control input-sm text-right mascara_entero" id="n_documento">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-2"></div>
					<div class="form-group col-md-1" style="text-align:right;">
						<span class="glyphicon glyphicon-earphone"></span>
					</div>
					<div class="form-group col-md-2">
						<label for="n_telefono">Teléfono *</label>
					</div>
					<div class="form-group col-md-4">
						<input type="text" class="form-control input-sm text-right" id="n_telefono" maxlength="50">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-2"></div>
					<div class="form-group col-md-1" style="text-align:right;">
						<span class="glyphicon glyphicon-envelope"></span>
					</div>
					<div class="form-group col-md-2">
						<label for="d_mail">Email *</label>
					</div>
					<div class="form-group col-md-4">
						<input type="text" class="form-control input-sm text-left" id="d_mail" maxlength="50">
					</div>
				</div>
				<input type="hidden" id="id_contrib" class="form-control" disabled="disabled"/>
			</form>
		</div>
	</div>
</div>