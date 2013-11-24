<?php
function conectar()
{
	mysql_connect("localhost", "root", "");
	mysql_select_db("registro");
}

function desconectar()
{
	mysql_close();
}
?>