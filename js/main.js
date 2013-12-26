
var crono = $("span#crono");
var cronoId = null;
var cronoActivo = false;
var centesimas, segundos, minutos = 0;
var nParcial;
var valorCrono;
var arrayParciales = new Array();
	


function pararCrono(){
	if(cronoActivo)
	{
		clearTimeout(cronoId);
		cronoActivo = false;
	}
	else
	{
		cronoActivo = false;
	}
};
function inicializarCrono(){

	if(cronoActivo == false)
	{
		centesimas = 0;
		segundos = 0;
		minutos = 0;

		//Reseteamos a 0 los marcadores.
		$('#crono').val(minutos+':'+segundos+':'+centesimas);
		localStorage.clear();
	}

	
	

};
function mostrarCrono() { 
	centesimas++;
	if(centesimas > 99)
	{
		centesimas = 0;
		segundos++;
		if(segundos > 9)
		{
			segundos = segundos;
		}
		else
		{
			segundos = '0' + segundos;
		}
		if(segundos > 59)
		{
			segundos = 0;
			minutos++;
			if(minutos > 59){
				alert('Fin de la cuenta!');
					pararCrono();
					return true;
			}
		}
	}

	cronoId = setTimeout("javascript:void(0);mostrarCrono()",10);
	cronoActivo = true;

	
	//Y Lo sacamos por pantalla.
	valorCrono = minutos+':'+segundos+':'+centesimas;

	$('#crono').val( minutos+':'+segundos+':'+centesimas);
};

function arrancarCrono(){
	pararCrono();
	inicializarCrono();
	mostrarCrono();
};

function parcialesCrono(){
	//Obtenemos el parcial del crono.
	var parcial;

	nParcial = nParcial || 1;
	parcial = $('#crono').val();
	//Declaramos una variable por defecto.
	localStorage.parcialCrono = localStorage.parcialCrono || '';
	arrayParciales.push(valorCrono+'<br/>');
	localStorage.parcialCrono += valorCrono+'<br/>';

	$('<tr><td>'+nParcial+'</td><td>'+parcial+'</td></tr>').appendTo('table.parciales > tbody');
	nParcial++;
	
};



function eventosTactiles(){
	var i = $('div.marcador');
	var xIni, yIni;

	i.on('touchstart', function(e){
		xIni = e.targetTouches[0].pageX;
		yIni = e.targetTouches[0].pageY;
	});

	i.on('touchmove', function(e){
		if (e.targetTouches[0].pageX > xIni+10){pararCrono();};
		if (e.targetTouches[0].pageX < xIni-10){pararCrono();inicializarCrono();};
	});
	i.on('tap', function(e){
		if(cronoActivo == false)
		{
			mostrarCrono();
			parcialesCrono();
		}
		else
		{
			pararCrono();
		}
	});
	
};

