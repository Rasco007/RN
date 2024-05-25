<div class="tab-pane" role="tabpanel" id="domicilio">
	<div class="panel panel-primary">
		<div class="panel-heading">Domicilio Fiscal del Contribuyente</div>
		<div class="panel-body">
			<form id="form_dom">
				<div class="row">
					<div class="form-group col-md-1"></div>
					<div class="form-group col-md-2">
						<label for="sel_provincia">Provincia *</label>
					</div>
					<div id="div_sel_provincia" class="form-group col-md-5"></div>
				</div>
				<div class="row">
					<div class="form-group col-md-1"></div>
					<div class="form-group col-md-2">
						<label for="sel_departamento">Departamento *</label>
					</div>
					<div id="div_sel_departamento" class="form-group col-md-5">
						<select id="sel_departamento" name="sel_departamento" class="input-sm form-control">
							<option value="N/A">Seleccione la Provincia</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-1"></div>
					<div class="form-group col-md-2">
						<label for="sel_localidad">Localidad *</label>
					</div>
					<div id="div_sel_localidad" class="form-group col-md-5">
						<select id="sel_localidad" name="sel_localidad" class="input-sm form-control">
							<option value="N/A">Seleccione el Departamento</option>
						</select>
					</div>
                    <div class="form-group col-md-2" style="margin-right: -8.3%;">
                        <label for="c_postal">C. Postal *</label>
                    </div>
                    <div id="div_c_postal" class="form-group col-md-1">
                        <input type="text" id="c_postal" name="c_postal" class="input-sm form-control text-left validate[required]">
                    </div>
				</div>
				<div class="row">
					<div class="form-group col-md-1"></div>
					<div class="form-group col-md-2">
						<label for="d_calle">Calle *</label>
					</div>
					<div class="form-group col-md-5">
						<input type="text" class="form-control input-sm text-left validate[required] mayusculas" id="d_calle">
					</div>
					<div class="form-group col-md-1">
						<label for="n_calle">Nro *</label>
					</div>
					<div class="form-group col-md-1">
						<input type="text" class="form-control input-sm text-right validate[required,] mascara_entero" id="n_calle">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-1"></div>
					<div class="form-group col-md-2">
						<label for="n_piso">Piso</label>
					</div>
					<div class="form-group col-md-1">
						<input type="text" class="form-control input-sm text-right mascara_entero" id="n_piso">
					</div>
					<div class="form-group col-md-1">
						<label for="d_dpto">Dpto</label>
					</div>
					<div class="form-group col-md-1">
						<input type="text" class="form-control input-sm text-left" id="d_dpto">
					</div>
					<div class="form-group col-md-1">
						<label for="d_puerta">Puerta</label>
					</div>
					<div class="form-group col-md-1">
						<input type="text" class="form-control input-sm text-left" id="d_puerta">
					</div>
					<div class="form-group col-md-1">
						<label for="d_oficina">Oficina</label>
					</div>
					<div class="form-group col-md-1">
						<input type="text" class="form-control input-sm text-left" id="d_oficina">
					</div>
				</div>
			</form>
		</div>
	</div>
</div>