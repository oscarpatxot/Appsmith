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

	generarHTMLANCF() {

		const ancf = appsmith.store.ancfImpresion;

		return `

<html>

<head>

<title>

Aplicación ${ancf.id_detalle_nc_aplicada}

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

	APLICACIÓN DE NOTA DE CRÉDITO

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

				${ancf.id_detalle_nc_aplicada}

			</div>

			<div class="linea">

				<span class="label">
					Fecha aplicación:
				</span>

				${ancf.fecha_aplicacion.split('-').reverse().join('/')}

			</div>

			<div class="linea">

				<span class="label">
					Monto aplicado:
				</span>

				${this.formatoAccounting(
					ancf.monto_aplicado
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

				DATOS DE LA NOTA DE CRÉDITO

			</div>
			
						<div class="linea">

				<span class="label">
					Nota de Crédito:
				</span>

				${ancf.numero_nota_credito}

			</div>

			<div class="linea">

				<span class="label">
					Fecha:
				</span>

				${ancf.fecha_nota_credito.split('-').reverse().join('/')}

			</div>

			<div class="linea">

				<span class="label">
					Proyecto:
				</span>

				${ancf.nombre_proyecto}

			</div>

			<div class="linea">

				<span class="label">
					Suplidor:
				</span>

				${ancf.razon_social}

			</div>

			<div class="linea">

				<span class="label">
					Moneda:
				</span>

				${ancf.codigo_iso}

			</div>

			<div class="linea">

				<span class="label">
					Concepto:
				</span>

				${ancf.concepto || ""}

			</div>

			<div class="linea">

				<span class="label">
					Comentario:
				</span>

				${ancf.comentarios || ""}

			</div>

			<hr>

			<div class="linea">

				<span class="label">
					Monto de la Nota de Crédito:
				</span>

				${this.formatoAccounting(
					ancf.monto_nota_credito
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
					ID:
				</span>

				${ancf.id_factura_compra}

			</div>

			<div class="linea">

				<span class="label">
					Factura:
				</span>

				${ancf.numero_factura}

			</div>

			<div class="linea">

				<span class="label">
					Fecha:
				</span>

				${ancf.fecha_factura.split('-').reverse().join('/')}

			</div>

			<div class="linea">

				<span class="label">
					Proyecto:
				</span>

				${ancf.proyecto_factura}

			</div>

			<div class="linea">

				<span class="label">
					Suplidor:
				</span>

				${ancf.suplidor_factura}

			</div>

			<div class="linea">

				<span class="label">
					Moneda:
				</span>

				${ancf.moneda_factura}

			</div>

			<div class="linea">

				<span class="label">
					NCF:
				</span>

				${ancf.ncf_factura || ""}

			</div>

			<hr>

			<div class="linea">

				<span class="label">
					Monto factura:
				</span>

				${this.formatoAccounting(
					ancf.monto_factura
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
					ancf.monto_aplicado
				)}

			</div>

			<div class="linea">

				<span class="label">
					Moneda:
				</span>

				${ancf.codigo_iso}

			</div>

		</div>

	</div>

</div>

</body>

</html>

		`;

	}

}