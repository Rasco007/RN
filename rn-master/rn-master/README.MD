

PASOS PARA DESCARGAR LOS CAMBIOS EN EL SERVIDOR

1. Conectarse con Putty o alguna consola con servicio telnet
server:10.1.1.125
u:desa
p:desa4321

2. Ejecutar estos comandos
cd /sistema     ------> para pararse dentro de la carpeta raiz del proyecto
git pull        ------> para descargar los cambios desde el repositorio

3. Ingresar usuario y contraseña de LDAP


CLONAR
 git clone https://gitlab.dgr.gov.ar/art-servicios-web/intranet-siat-web.git

En caso de necesitar configurar proxy
Clear old settings:
>git config --global --unset https.proxy
>git config --global --unset http.proxy
Set new settings:
>git config --global https.proxy https://USER:PWD@proxy.whatever:80
>git config --global http.proxy http://USER:PWD@proxy.whatever:80

Verify new settings:
>git config --get https.proxy
>git config --get http.proxy


Subir cambios al repositorio

Agregar los cambios locales
git add .

Hacer el commit con un mensaje
git commit -m "el mensaje"

subir los cambios a Master
git push -u origin master

para cancelar la verificacion SSL
git config --global http.sslVerify false



Subir cambios puntuale al repositorio

$ git add ejemplo.html → Escribes git add seguido del nombre del archivo que vas a subir. Con esto subes cada archivo en especifico, si quieres subir mas solo separa los archivos con espacio (git add ejemplo.html ejemplo2.html).


prueba ramas