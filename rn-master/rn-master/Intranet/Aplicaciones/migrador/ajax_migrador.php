<?php

$accion = $_POST['accion'];


switch ($accion){
    case 'migrar_menu':
        $id_menu = $_POST['id_menu'];
        migrarMenu();
}

function migrarMenu(){

}