function nuevoAjax()
{ 
	var xmlhttp=false; 
	try 
	{ 
		xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); 
	}
	catch(e)
	{ 
		try
		{ 
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
		} 
		catch(E) { xmlhttp=false; }
	}
	if (!xmlhttp && typeof XMLHttpRequest!="undefined") { xmlhttp=new XMLHttpRequest(); } 

	return xmlhttp; 
}

function eliminaEspacios(cadena)
{
	var x=0, y=cadena.length-1;
	while(cadena.charAt(x)==" ") x++;	
	while(cadena.charAt(y)==" ") y--;	
	return cadena.substr(x, y-x+1);
}

function validaIngreso(valor)
{
	/* Funcion encargada de validar lo ingresado por el usuario. Se devuelve TRUE en caso de ser 
	valido, FALSE en caso contrario */
	var reg=/(^[a-zA-Z0-9.@ ]{4,40}$)/;
	if(reg.test(valor)) return true;
	else return false;
}
function nuevoEvento(evento)
{
	var divMensaje=document.getElementById("error");
	if(evento=="ingreso")
	{
		var input=document.getElementById("ingreso");
		var boton=document.getElementById("botonIngreso");
		var valor=input.value;
		var textoAccion="Ingresando...";
	}
	else
	{
		var input=document.getElementById("verificacion");
		var boton=document.getElementById("botonVerificacion");
		var valor=input.value;
		var textoAccion="Comprobando...";
	}
	valor=eliminaEspacios(valor);
	if(!validaIngreso(valor)) 
	{
		divMensaje.innerHTML="El texto ingresado contiene caracteres o longitud inv&aacute;lida";
	}
	else
	{
		boton.disabled=true; input.disabled=true;
		input.value=textoAccion;
		var ajax=nuevoAjax();
		ajax.open("POST", "Validar.php", true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(evento+"="+valor);
		ajax.onreadystatechange=function()
		{
			if (ajax.readyState==4)
			{
				input.value="";
				boton.disabled=false; input.disabled=false;
				divMensaje.innerHTML=ajax.responseText;
			}
		}
	}
}