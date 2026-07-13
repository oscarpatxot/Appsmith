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

	generarHTMLAAF() {

		const aaf = appsmith.store.aafImpresion;

		return `

<html>

<head>

<title>

Aplicación ${aaf.id_detalle}

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

.columna {
	width:50%;
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

</style>

</head>

<body>

<div class="titulo">

	APLICACIÓN DE AVANCE

</div>

<div class="fila">

	<div class="columna">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>

				DATOS DE LA APLICACIÓN

			</div>

			<div class="linea">

				<span class="label">
					ID:
				</span>

				${aaf.id_detalle}

			</div>

			<div class="linea">

				<span class="label">
					Fecha aplicación:
				</span>

				${aaf.fecha_aplicacion.split('-').reverse().join('/')}

			</div>

			<div class="linea">

				<span class="label">
					Monto aplicado:
				</span>

				${this.formatoAccounting(
					aaf.monto_aplicado
				)}

			</div>

		</div>

	</div>

	<div class="columna">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>

				DATOS DEL AVANCE

			</div>
			
						<div class="linea">

				<span class="label">
					Avance:
				</span>

				${aaf.numero_avance}

			</div>

			<div class="linea">

				<span class="label">
					Fecha:
				</span>

				${aaf.fecha_avance.split('-').reverse().join('/')}

			</div>

			<div class="linea">

				<span class="label">
					Orden:
				</span>

				${aaf.numero_orden}

			</div>

			<div class="linea">

				<span class="label">
					Proyecto:
				</span>

				${aaf.nombre_proyecto}

			</div>

			<div class="linea">

				<span class="label">
					Suplidor:
				</span>

				${aaf.razon_social}

			</div>

			<div class="linea">

				<span class="label">
					Moneda:
				</span>

				${aaf.codigo_iso}

			</div>

			<div class="linea">

				<span class="label">
					Concepto:
				</span>

				${aaf.concepto || ""}

			</div>

			<div class="linea">

				<span class="label">
					Referencia:
				</span>

				${aaf.referencia || ""}

			</div>

			<hr>

			<div class="linea">

				<span class="label">
					Monto del avance:
				</span>

				${this.formatoAccounting(
					aaf.monto_avanzado
				)}

			</div>

		</div>

	</div>

</div>

<div class="fila">

	<div class="columna">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>

				DATOS DE LA FACTURA

			</div>

			<div class="linea">

				<span class="label">
					Factura:
				</span>

				${aaf.numero_factura}

			</div>

			<div class="linea">

				<span class="label">
					Fecha:
				</span>

				${aaf.fecha_factura.split('-').reverse().join('/')}

			</div>

			<div class="linea">

				<span class="label">
					NCF:
				</span>

				${aaf.ncf || ""}

			</div>

			<hr>

			<div class="linea">

				<span class="label">
					Monto factura:
				</span>

				${this.formatoAccounting(
					aaf.monto_total
				)}

			</div>

		</div>

	</div>
	
		<div class="columna">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>

				RESUMEN

			</div>

			<div class="linea">

				<span class="label">
					Monto aplicado:
				</span>

				${this.formatoAccounting(
					aaf.monto_aplicado
				)}

			</div>

			<div class="linea">

				<span class="label">
					Moneda:
				</span>

				${aaf.codigo_iso}

			</div>

		</div>

	</div>

</div>

</body>

</html>

		`;

	}

}