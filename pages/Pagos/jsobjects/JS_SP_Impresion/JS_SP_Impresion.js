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

	generarHTMLSP() {

		const sp = appsmith.store.spImpresion;

		const detalle =
					appsmith.store.detalleSPImpresion || [];

		let filasDetalle = "";

		detalle.forEach(x => {

			filasDetalle += `

		<tr>

			<td>${x.id_factura_compra}</td>

			<td>${x.numero_factura}</td>

			<td>
				${x.fecha_factura.split('-').reverse().join('/')}
			</td>

			<td style="text-align:right;">
				${this.formatoAccounting(
				x.monto_solicitado
			)}
			</td>

		</tr>

		`;

		});

		return `

<html>

<head>

<title>
${sp.numero_solicitud_pago}
</title>

<style>

body {
	font-family: Arial, sans-serif;
	font-size: 12px;
	margin: 20px;
}

.titulo {
	text-align:center;
	font-size:34px;
	font-weight:bold;
	margin-bottom:20px;
}

.fila {
	display:flex;
	gap:20px;
	margin-bottom:20px;
}

.izquierda {
	width:${sp.otra_moneda ? "55%" : "100%"};
}

.derecha {
	width:45%;
}

.caja {
	border:1px solid #999;
	border-radius:4px;
	padding:12px;
}

.linea {
	margin-bottom:10px;
}

.label {
	font-weight:bold;
}

.tabla-detalle {
	width:100%;
	border-collapse:collapse;
	margin-top:20px;
	margin-bottom:30px;
}

.tabla-detalle th {
	border:1px solid #999;
	padding:4px;
	background:#f0f0f0;
	font-size:10px;
}

.tabla-detalle td {
	border:1px solid #999;
	padding:4px;
	font-size:10px;
}

</style>

</head>

<body>

<div class="titulo">

	SOLICITUD DE PAGO

</div>

<div class="fila">

	<div class="izquierda">

		<div class="caja">

			<div class="linea">
				Proyecto:
			</div>

			<div class="linea">
				<strong>${sp.nombre_proyecto}</strong>
			</div>

			<div class="linea">
				RNC:
			</div>

			<div class="linea">
				<strong>${sp.rnc || ""}</strong>
			</div>

		</div>

		<br>

		<div class="caja">

			<div class="linea">
				Suplidor:
			</div>

			<div class="linea">
				<strong>${sp.razon_social}</strong>
			</div>

			<div class="linea">
				RNC / Cédula:
			</div>

			<div class="linea">
				<strong>${sp.numero_documento || ""}</strong>
			</div>

		</div>

	</div>

	<div class="derecha">

		<div class="caja">

			<div class="linea" style="text-align:center;font-size:16px;">
				<strong>ID:</strong>
				${sp.id_solicitud_pago}
			</div>

			<div class="linea">
				<span class="label">Solicitud:</span>
				${sp.numero_solicitud_pago}
			</div>

			<div class="linea">
				<span class="label">Fecha:</span>
				${sp.fecha_solicitud.split('-').reverse().join('/')}
			</div>

			<div class="linea">
				<span class="label">Moneda:</span>
				${sp.codigo_iso}
			</div>

			<div class="linea">
				<span class="label">Estado:</span>
				${sp.estado}
			</div>

			<div class="linea">
				<span class="label">Concepto:</span>
				${sp.concepto || ""}
			</div>

		</div>

	</div>

</div>

<table class="tabla-detalle">

	<thead>

		<tr>

			<th>ID Factura</th>
			<th>Número Factura</th>
			<th>Fecha Factura</th>
			<th>Monto Solicitado</th>

		</tr>

	</thead>

	<tbody>

		${filasDetalle}

	</tbody>

</table>
<div class="fila">

	<div class="izquierda">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>
				RESUMEN FINANCIERO
			</div>

			<div class="linea">
				<span class="label">
					Total solicitado:
				</span>
				${this.formatoAccounting(
			sp.total_solicitado
		)}
			</div>
${
	sp.retencion_itbis_posible > 0
	? `
			<div class="linea">
				<span class="label">
					Retención ITBIS:
				</span>
				${this.formatoAccounting(
			sp.retencion_itbis_posible
		)}
			</div>
	`
	: ""
}

${
	sp.retencion_dgii_posible > 0
	? `			
<div class="linea">
				<span class="label">
					Retención DGII:
				</span>
				${this.formatoAccounting(
			sp.retencion_dgii_posible
		)}
			</div>
	`
	: ""
}

${
	sp.retencion_garantia_posible > 0
	? `
			<div class="linea">
				<span class="label">
					Retención Garantía:
				</span>
				${this.formatoAccounting(
			sp.retencion_garantia_posible
		)}
			</div>
	`
	: ""
}
${
	sp.retencion_tss_posible > 0
	? `
			<div class="linea">
				<span class="label">
					Retención TSS:
				</span>
				${this.formatoAccounting(
			sp.retencion_tss_posible
		)}
			</div>
	`
	: ""
}

			<hr>

			<div class="linea">

	<span class="label">
		Total retenciones:
	</span>

	${this.formatoAccounting(
			sp.total_retenciones
		)}

</div>

<hr>

<div class="linea">

	<span class="label">
		Total solicitado neto:
	</span>

	${this.formatoAccounting(
		sp.total_desembolso
	)}

</div>

		</div>

	</div>
${
	sp.otra_moneda
	? `

	<div class="derecha">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>
				DESEMBOLSO
			</div>

			<div class="linea">
				<span class="label">
					Moneda pago:
				</span>
				${sp.moneda_pago}
			</div>

			<div class="linea">
				<span class="label">
					Tasa:
				</span>
				${this.formatoAccounting(
					sp.tasa_pago_otra_moneda
				)}
			</div>

			<hr>

			<div class="linea">
				<span class="label">
					Total solicitado ${sp.moneda_pago}:
				</span>
				${this.formatoAccounting(
					sp.aplicado_otra_moneda
				)}
			</div>

			<div class="linea">
				<span class="label">
					Total desembolso ${sp.moneda_pago}:
				</span>
				${this.formatoAccounting(
					sp.desembolso_otra_moneda
				)}
			</div>

		</div>

	</div>

	`
	: ""
}
</div>

<div style="
	margin-top:100px;
	text-align:center;
">

	<div style="
		width:250px;
		margin:0 auto;
		border-top:1px solid #000;
		padding-top:8px;
		font-weight:bold;
	">

		AUTORIZADO POR

	</div>

</div>

</body>

</html>

	`;

	}

}