export default {

    generarHTML() {

        const s = qrySupEnc.data[0];

        let html = `
        <html>

        <head>

            <title>${s.razon_social}</title>

            <style>

body{
    font-family: Arial, sans-serif;
    margin:40px;
    font-size:14px;
}

                <h1>FICHA DE SUPLIDOR</h1>

<h3 style="text-align:center; margin-top:-10px;">
    ${s.razon_social}
</h3>

                table{
                    width:100%;
                    border-collapse:collapse;
                    margin-top:15px;
                }

                th, td{
                    border:1px solid #d1d5db;
                    padding:6px;
                    text-align:left;
                }

                th{
                    background:#f3f4f6;
                }

                .campo{
                    margin-bottom:8px;
                }

                .titulo{
                    margin-top:25px;
                    margin-bottom:10px;
                }

            </style>

        </head>

        <body>

            <h1>FICHA DE SUPLIDOR</h1>

            <div class="campo">
                <strong>Razón Social:</strong>
                ${s.razon_social || ''}
            </div>

            <div class="campo">
                <strong>${s.tipo_documento}:</strong>
                ${s.numero_documento || ''}
            </div>

            <div class="campo">
                <strong>Nombre Comercial:</strong>
                ${s.nombre_comercial || ''}
            </div>

            <div class="campo">
                <strong>Teléfono:</strong>
                ${s.telefono_suplidor || ''}
            </div>

            <div class="campo">
                <strong>Correo:</strong>
                ${s.correo_proveedor || ''}
            </div>

            <div class="campo">
                <strong>Dirección:</strong>
                ${s.direccion_proveedor || ''}
            </div>

            <h2 class="titulo">
                Cuentas Bancarias
            </h2>

            <table>

                <tr>
                    <th>Banco</th>
                    <th>Cuenta</th>
                    <th>Tipo</th>
                    <th>Moneda</th>
                    <th>Principal</th>
                </tr>
        `;

        qrySupDet.data.forEach(c => {

            html += `
                <tr>
                    <td>${c.banco || ''}</td>
                    <td>${c.numero_cuenta || ''}</td>
                    <td>${c.tipo_cuenta || ''}</td>
                    <td>${c.moneda || ''}</td>
                    <td>${c.es_principal ? 'Sí' : 'No'}</td>
                </tr>
            `;

        });

        html += `
            </table>

        </body>

        </html>
        `;

        return html;

    }

}