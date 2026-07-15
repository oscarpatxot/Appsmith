export default {

	formatoAccounting(valor) {

		const numero = Number(valor || 0);

		if (numero === 0)
			return "-";

		return numero.toLocaleString(
			"en-US",
			{
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}
		);

	},

	generarHTML() {

		const os = appsmith.store.osImpresion;

		return `

<html>

<head>

<title>

${os.numero_otras_solicitudes}

</title>

<style>

body{

	font-family:Arial,sans-serif;
	font-size:12px;
	margin:40px;
	color:#000;

}

.encabezado{

	width:100%;
	border-top:2px solid #000;
	border-bottom:1px solid #000;
	padding:4px 0;
	margin-bottom:20px;

}

.encabezado table{

	width:100%;
	border-collapse:collapse;

}

.titulo{

	font-size:16px;
	font-weight:bold;

}

.numero{

	text-align:right;
	font-weight:bold;

}

.proyecto{

	font-size:18px;
	margin-top:18px;

}

.rnc{

	font-size:14px;
	margin-top:4px;

}

.telefono{

	margin-top:22px;

}

.fecha{

	margin-top:22px;
	margin-bottom:35px;

}

.parrafo{

	margin-top:18px;
	font-size:15px;

}

.destinatario{

	margin-top:22px;
	margin-bottom:15px;

}

.tablaMonto{

	border-collapse:collapse;
	margin-top:10px;
	margin-bottom:25px;

}

.tablaMonto th{

	border:1px solid #000;
	padding:4px 8px;
	background:#efefef;
	font-size:13px;

}

.tablaMonto td{

	border:1px solid #000;
	padding:4px 10px;
	font-size:14px;

}

.derecha{

	text-align:right;

}

.conceptoTitulo{

	font-weight:bold;
	font-size:15px;
	margin-bottom:8px;

}

.concepto{

	text-align:justify;
	line-height:1.7;
	font-size:14px;

}

.firma{

	width:260px;
	margin:120px auto 0 auto;
	text-align:center;

}

.lineaFirma{

	border-top:1px solid #000;
	margin-bottom:4px;

}

</style>

</head>

<body>

<div class="encabezado">

<table>

<tr>

<td class="titulo">

SOLICITUD

</td>

<td class="numero">

Solicitud #

${os.numero_otras_solicitudes}

</td>

</tr>

</table>

</div>

<div class="proyecto">

<strong>

${os.nombre_proyecto}

</strong>

</div>

<div class="rnc">

RNC: ${os.rnc}

</div>

<div class="telefono">

Tel.: (809) 518-8771

</div>

<div class="fecha">

Santo Domingo, D.N.<br>

${os.fecha_solicitud.split("-").reverse().join("/")}

</div>

<div class="destinatario">

<strong>

${os.razon_social}

</strong>

<br>

RNC / Cédula:
${os.numero_documento}

</div>

<table class="tablaMonto">

<tr>

<th>

Moneda

</th>

<th>

Monto

</th>

</tr>

<tr>

<td>

${os.codigo_iso}

</td>

<td class="derecha">

${this.formatoAccounting(os.monto)}

</td>

</tr>

</table>

<div class="conceptoTitulo">

Asunto:

</div>

<div class="parrafo">

<strong>

${os.referencia || ""}

</strong>

</div>

<br>

<div class="concepto">

${os.solicitud.replace(/\n/g,"<br>")}

</div>

<div class="firma">

	<div class="lineaFirma"></div>

	<strong>

	FIDEICOMITENTE

	</strong>

</div>

</body>

</html>

		`;

	}

}