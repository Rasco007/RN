function llenar_dominio_anterior(){
    $.ajax({                     
        url: "consulta_historica_movimientos/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'getDomAnt', p_d_patente:$('#d_patente').val()},                     
        success: function (res) {  
            if (res){
                if(res.D_PATENTE_VIEJA){
                    $('#d_patente_vieja').val(res.D_PATENTE_VIEJA);
                }
            }
        }                 
    });
};