var DaysInMonth = new Array()
DaysInMonth[0] = 31 //Los dias de Enero
DaysInMonth[1] = 0 //Los dias de Febrero se calculan mas adelante por si el año es bisiesto
DaysInMonth[2] = 31 //Los dias de Marzo
DaysInMonth[3] = 30 //Los dias de Abril
DaysInMonth[4] = 31 //Los dias de Mayo
DaysInMonth[5] = 30 //Los dias de Junio
DaysInMonth[6] = 31 //Los dias de Julio
DaysInMonth[7] = 31 //Los dias de Agosto
DaysInMonth[8] = 30 //Los dias de Septiembre
DaysInMonth[9] = 31 //Los dias de Octubre
DaysInMonth[10] = 30 //Los dias de Noviembre
DaysInMonth[11] = 31 //Los dias de Diciembre

//la funcion IsInteger(Chain) chequea si "Chain" es un numero entero sin signo valido
//La variable "Chain" es una cadena de caracteres
function IsInteger(Chain)
{
var Template = /^\d+$/ //Formato de numero entero sin signo
return Template.test(Chain) //Compara "Chain" con el formato "Template"
}

//La funcion "IsDay(Day, Month)" chequea si "Day" es un numero de dia valido para el mes "Month"
//Las variables "Day" y "Month" son cadenas de caracteres
function IsDay(Day, Month)
{
if (IsInteger(Day) && IsMonth(Month)) //Si "Day" es un numero entero valido y "Month" es un numero de mes valido
{
return (parseInt(Day)>0 && parseInt(Day)<=DaysInMonth[Month - 1]) ? 1 : 0 //Si "Day" esta entre 1 y los dias que tiene el mes "Month" devuelve verdadero si no devuelve falso
}
else return 0 //Si "Day" no es un numero entero valido o "Month" no es un numero de mes valido devuelve falso
}

//La funcion "IsMonth(Month)" chequea si "Month" es un numero de mes valido
//La variable "Month" es una cadena de caracteres
function IsMonth(Month)
{
if (IsInteger(Month)) //Si "Month" es un número entero valido
{
return (parseInt(Month)>0 && parseInt(Month)<=12) ? 1 : 0 //Si "Month" esta entre 1 y 12 devuelve verdadero si no devuelve falso
}
else return 0 //Si "Month" no es un numero entero valido devuelve falso
}

//La funcion "IsYear(Year)" chequea si "Year" es un numero de año valido
//La variable "Year" es una cadena de caracteres
function IsYear(Year)
{
if (IsInteger(Year)) //Si "Year" es un numero entero valido
{
return (Year.length == 4) ? 1 : 0 //Si "Year" tiene cuatro digitos devuelve verdadero si no devuelve falso
}
else return 0 //Si "Year" no es un numero entero valido devuelve falso
}

//La funcion IsLeapYear(Year) chequea si "Year" es un año es bisiesto
//La variable "Year" es una cadena de caracteres
function IsLeapYear(Year)
{
if (IsInteger(Year)) //Si "Year" es un numero entero valido
{
return ((Year % 4 == 0 && Year % 100 != 0) || (Year % 400 == 0)) ? 1 : 0// Si "Year" es un año es bisiesto devuelve verdadero si no devuelve falso
}
else return 0 //Si "Year" no es un numero entero valido devuelve falso
}

//La funcion IsDate(YourDate, YourDateSeparator) chequea si "YourDate" es una fecha valida con el separador de fecha "YourDateSeparator"
//Las variables "YourDate" y "YourDateSeparator" son cadenas de caracteres
function IsDate(YourDate, YourDateSeparator)
{
var IsAllOK = 1 //Variable iniciada como verdadera para saber si todas las validaciones fueron correctas
var YourDateParts = new Array() //Variable donde se almacenaran las partes de la fecha (dia, mes y año) tras haber eliminado el separador de la fecha
YourDateParts = YourDate.split(YourDateSeparator) //Se crean las partes de la fecha (dia, mes y año) eliminando el separador de la fecha
var Day = YourDateParts[0] //El dia corresponde al primer elemento del array
var Month = YourDateParts[1] //El mes corresponde al segundo elemento del array
var Year = YourDateParts[2] //El año corresponde al tercer elemento del array
if (IsYear(Year) && !IsLeapYear(Year)) //Si "Year" es un numero de año valido y no es bisiesto
{
DaysInMonth[1] = 28 //Como "Year" no es bisiesto Febrero tiene entonces 28 dias
}
else if (IsYear(Year) && IsLeapYear(Year)) //Si "Year" es un numero de año valido y es bisiesto
{
DaysInMonth[1] = 29 //Como "Year" es bisiesto Febrero tiene entonces 29 dias
}
else IsAllOK = 0 //Si "Year" no es un numero de año valido la variable pasa a ser falsa
IsAllOK = (IsMonth(Month)) ? IsAllOK : 0 //Si "Month" es un numero de mes valido la variable se queda como esta si no pasa a ser falsa
IsAllOK = (IsDay(Day, Month)) ? IsAllOK : 0 //Si "Day" es un numero de dia valido para el mes "Month" la variable se queda como esta si no pasa a ser falsa
return IsAllOK //Finalmente se devuelve el valor de la variable como verdadero o falso
}