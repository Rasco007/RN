<?php
// phpinfo();

// Para hacerlo funcionar descargar el dll https://pecl.php.net/package/ssh2/1.3.1/windows (Thread safe) y colocarlo en la carpeta ext del php utilizado, luego reiniciar el wamp

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");

$fechaYHoraActual = date("Y-m-d_H-i-s");
$carpeta_de_archivos = "C:/rn/rn/Intranet/archivos_tmp/TRIBA056_" . $fechaYHoraActual; //cambiar la direccion de la ruta a la que se desee

$archivo = $_FILES['file']['tmp_name'];

$response = new stdClass();

$zip = new ZipArchive;
if ($zip->open($archivo) === TRUE) {
    // crea la carpeta si no existe
    if (!is_dir($carpeta_de_archivos)) {
        mkdir($carpeta_de_archivos, 0755, true);
    }

    // extrae el zip
    $zip->extractTo($carpeta_de_archivos);
    $zip->close();

    // obtiene los nombres de los archivos extraídos
    $archivos_extraidos = glob($carpeta_de_archivos . '/*');

    // cuenta la cantidad de archivos extraídos
    $numArchivosExtraidos = count($archivos_extraidos);

    if ($numArchivosExtraidos != 18) {
        rmdir($carpeta_de_archivos);
        $response->resultado = 'No todos los archivos han sido transferidos correctamente';
        die(json_encode($response));
        foreach ($archivos_extraidos as $file) {
            unlink($file);
        }
        return;
    } else {
        $sftpServer = '10.10.144.238';
        $sftUsuario = 'root';
        $sftpPassword = 'admintdi#2015'; // consultar a lauti por usr y pass

        // establezco conexion
        $sftpConexion = ssh2_connect($sftpServer);

        if ($sftpConexion) {
            // autenticacion
            if (ssh2_auth_password($sftpConexion, $sftUsuario, $sftpPassword)) {

                // Inicializa el subsistema SFTP
                $sftp = ssh2_sftp($sftpConexion);

                // establece el directorio remoto
                $remoteDir = '/mnt/proyectos_nas01/SIAT-RN_2023/';

                // proceso de a 3 archivos (esta dando timeout sino)
                $batchSize = 3;

                foreach (array_chunk($archivos_extraidos, $batchSize) as $batchFiles) {
                    foreach ($batchFiles as $file) {
                        $remoteFile = basename($file);
                        $remoteFilePath = $remoteDir . $remoteFile;

                        // Abre un flujo de archivo remoto
                        $stream = fopen("ssh2.sftp://$sftp$remoteFilePath", 'w');
                        if (!$stream) {
                            rmdir($carpeta_de_archivos);
                            die("No se pudo abrir el flujo de archivo remoto.");
                        }

                        // Abre un flujo de archivo local
                        $localStream = fopen($file, 'r');
                        if (!$localStream) {
                            rmdir($carpeta_de_archivos);
                            die("No se pudo abrir el flujo de archivo local.");
                        }

                        // Copia el contenido del archivo local al archivo remoto
                        $bytesCopied = stream_copy_to_stream($localStream, $stream);
                        if ($bytesCopied === false) {
                            rmdir($carpeta_de_archivos);
                            die("Error al copiar el archivo.");
                        }

                        // Cierra los flujos de archivo
                        fclose($localStream);
                        fclose($stream);

                        // Elimina el archivo local después de la transferencia
                        unlink($file);
                    }
                }

                // Cierre la conexión SSH
                ssh2_disconnect($sftpConexion);

                $response->resultado = 'OK';
                die(json_encode($response));

            } else {
                rmdir($carpeta_de_archivos);
                $response->resultado =  'Error de autenticación en el servidor SFTP';
                die(json_encode($response));
            }
        } else {
            rmdir($carpeta_de_archivos);
            $response->resultado =  'Error de conexión en el servidor SFTP';
            die(json_encode($response));
        }
    }
} else {
    rmdir($carpeta_de_archivos);
    $response->resultado =  'Error abriendo ZIP';
    die(json_encode($response));
}
?>
