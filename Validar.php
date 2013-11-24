<?php
include 'conexion2.php';

function validaIngreso($valor)
{
	if(eregi("^[a-zA-Z0-9.@ ]{4,40}$", $valor)) return TRUE;
	else return FALSE;
}

function verificaExistencia($apodo)
{
	$consulta=mysql_query("SELECT Id FROM usuarios WHERE Nombre='$apodo'") or die(mysql_error());
	$registro=mysql_fetch_row($consulta);
	
	if(!empty($registro)) return TRUE;
	else return FALSE;
}

if(isset($_POST["ingreso"]))
{
	$valor=trim($_POST["ingreso"]);
	if(validaIngreso($valor))
	{
		conectar();
		
		$consulta=mysql_query("SELECT COUNT(*) FROM usuarios") or die(mysql_error());
		$registro=mysql_fetch_row($consulta);
		if($registro[0]>=600) { echo "Hay demasiados registros en la Base de Datos"; die(); }
		if(verificaExistencia($valor)) echo "Tu apodo ya existe en la base de datos";
		else 
		{
			mysql_query("INSERT INTO usuarios (Nombre) VALUES ('$valor')") or die(mysql_error());
			echo "Tu nombre de usuario ha sido ingresado";
		}
		desconectar();
	}
}
elseif(isset($_POST["verificacion"]))
{
	$valor=trim($_POST["verificacion"]);
	if(validaIngreso($valor))
	{
		conectar();
		if(verificaExistencia($valor)) echo "Tu apodo ya existe en la base de datos";
		else echo "Apodo disponible";
		desconectar();
	}
}
?>