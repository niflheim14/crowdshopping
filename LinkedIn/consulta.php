<?php


       $nombre=$_POST("nombre");
	   $contraseña=$_POST("");
	   $repcontraseña=$_POST("");
	   $rfc=$_POST("");
       $correo=$_POST("");
	   $casado=$_POST("");
       $soltero=$_POST("");
	   $domicilio=$_POST("");

mysql_connect("localhost", "usuario_mysql", "contraseña_mysql") or
    die("No se pudo conectar: " . mysql_error());


$consulta= mysql_query("SELECT nombre, contra, repcontraseña, rfc... FROM datos");

     echo"<tr>";
     echo"<td>No</td>";
     echo"<td>Nombre</td>";
     echo"<td>COntraseña</td>";
     echo"<td>Contraseña 2</td>";
     echo"<td>RFC</td>";
     echo"<td>Correo</td>";
     echo"<td>Casado</td>";
     echo"<td>Soltero</td>";
     echo"<td>Domicilio</td>";     
     echo"</tr>";
     

while ($extraer = mysql_fetch_array($consulta))
{
     echo"<tr>"
     echo"<td>$fila["index"]</td>";
     echo"<td>$fila["nombre"]</td>";
     echo"<td>$fila["contraseña"]</td>";
     echo"<td>$fila["repcontraseña"]</td>";
     echo"<td>$fila["rfc"]</td>";
     echo"<td>$fila["correo"]</td>";
     echo"<td>$fila["casado"]</td>";
     echo"<td>$fila["soltero"]</td>";
     echo"<td>$fila["domicilio"]</td>";
     echo"</tr>";
}

?>