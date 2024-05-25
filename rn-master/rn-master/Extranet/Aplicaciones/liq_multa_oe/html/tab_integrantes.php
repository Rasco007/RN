<div class="tab-pane" role="tabpanel" id="integrantes">
	<div class="panel panel-primary">
		<div class="panel-heading">Integrantes de la persona Jurídica</div>
		<div class="panel-body">
			<form id="form_int">
				<div class="row">
					<div class="form-group col-md-2">
						<label for="n_cuit_int">CUIT *</label>
					</div>
					<div class="form-group col-md-2">
						<input type="text" class="form-control input-sm text-right mascara_cuit validate[required,custom[validaCuit]]" id="n_cuit_int">
					</div>
					<div class="form-group col-md-2">
						<label for="d_deno_int">Denominación *</label>
					</div>
					<div class="form-group col-md-6">
						<input type="text" class="form-control input-sm text-left validate[required] mayusculas integrantes" id="d_deno_int">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-2">
						<label for="sel_doc_int">Tipo documento *</label>
					</div>
					<div id="div_sel_doc_int" class="form-group col-md-2"></div>
					<div class="form-group col-md-2">
						<label for="n_doc_int">Nro. documento *</label>
					</div>
					<div class="form-group col-md-2">
						<input type="text" class="form-control input-sm text-right validate[required,] integrantes mascara_entero" id="n_doc_int">
					</div>
					<div class="form-group col-md-4"></div>
				</div>
				<div class="row">
					<div class="form-group col-md-2">
						<label for="sel_caracter">Carácter firma *</label>
					</div>
					<div id="div_sel_caracter" class="form-group col-md-2"></div>
					<div class="form-group col-md-2">
						<label for="sel_tipo_res">Tipo responsable *</label>
					</div>
					<div id="div_sel_tipo_res" class="form-group col-md-2"></div>
					<div class="form-group col-md-4"></div>
				</div>
				<div class="row">
					<div class="form-group col-md-2">
						<label for="sel_cargo">Cargo *</label>
					</div>
					<div id="div_sel_cargo" class="form-group col-md-2"></div>
					<div class="form-group col-md-8"></div>
				</div>
				<div class="row">
					<div class="form-group col-md-2">
						<label for="sel_prov_int">Provincia *</label>
					</div>
					<div id="div_sel_prov_int" class="form-group col-md-4"></div>
					<div class="form-group col-md-2">
						<label for="sel_dep_int">Departamento *</label>
					</div>
					<div id="div_sel_dep_int" class="form-group col-md-4">
						<select id="sel_dep_int" name="sel_dep_int" class="input-sm  form-control">
							<option value="N/A">Seleccione la Provincia</option>
						</select>
					</div>
				</div>
                <div class="row">
                    <div class="form-group col-md-2">
                        <label for="sel_loc_int">Localidad *</label>
                    </div>
                    <div id="div_sel_loc_int" class="form-group col-md-4">
                        <select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control">
                            <option value="N/A">Seleccione el Departamento</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="c_postal_int">C. Postal *</label>
                    </div>
                    <div id="div_c_postal_int" class="form-group col-md-2">
                        <input type="text" id="c_postal_int" name="c_postal_int" class="input-sm form-control text-right validate[required] integrantes">
                    </div>
                </div>
				<div class="row">
					<div class="form-group col-md-2">
						<label for="d_calle_int">Calle *</label>
					</div>
					<div class="form-group col-md-6">
						<input type="text" class="form-control input-sm text-left validate[required] mayusculas integrantes" id="d_calle_int">
					</div>
					<div class="form-group col-md-2">
						<label for="n_calle_int">Nro *</label>
					</div>
					<div class="form-group col-md-2">
						<input type="text" class="form-control input-sm text-right validate[required,] integrantes mascara_entero" id="n_calle_int">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-2">
						<label for="n_piso_int">Piso</label>
					</div>
					<div class="form-group col-md-1">
						<input type="text" class="form-control input-sm text-right integrantes mascara_entero" id="n_piso_int">
					</div>
					<div class="form-group col-md-1">
						<label for="d_dpto_int">Dpto</label>
					</div>
					<div class="form-group col-md-1">
						<input type="text" class="form-control input-sm text-left integrantes" id="d_dpto_int">
					</div>
					<div class="form-group col-md-1">
						<label for="d_puerta_int">Puerta</label>
					</div>
					<div class="form-group col-md-2">
						<input type="text" class="form-control input-sm text-left integrantes" id="d_puerta_int">
					</div>
					<div class="form-group col-md-2">
						<label for="d_oficina_int">Oficina</label>
					</div>
					<div class="form-group col-md-2">
						<input type="text" class="form-control input-sm text-left integrantes" id="d_oficina_int">
					</div>
				</div>
				<input type="hidden" id="id_contrib_int" class="form-control" disabled="disabled"/>
			</form>
		</div>
	</div>
</div>