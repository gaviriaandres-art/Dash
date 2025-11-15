
/**
 * =================================================================
 * CONFIGURACIÓN DE FUENTES DE DATOS (GOOGLE DRIVE/SHEETS)
 * =================================================================
 * Aquí se centraliza la configuración para conectar la app a los archivos de Google.
 * Modifica estos valores para apuntar a tus propios archivos y columnas.
 */

// 1. Configuración de la API de Google
// Debes crear estas variables en tu entorno (ej. en un archivo .env.local)
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY';

// 2. Archivo de Ventas Históricas (Excel en Drive o Google Sheet)
export const HISTORICAL_SALES_CONFIG = {
  sheetId: '1Uhj96LLcT_CvQwPvd8hn3M2ydwijoZJo', // Reemplaza con el ID de tu archivo
  sheetName: 'BD', // Nombre de la hoja
  // Mapeo de columnas: la clave es el nombre que usamos en la app, 
  // el valor es el nombre EXACTO de la columna en el archivo.
  columnMapping: {
    fecha: 'Fecha de venta',
    ano: 'Año',
    mes: 'Mes',
    sede: 'Departamento / Sede / Ciudad',
    vendedor: 'Vendedor / Asesor comercial',
    marca: 'Fabricante / Marca',
    producto: 'Descripción de producto',
    cantidad: 'Cantidad / unidades',
    valorVenta: 'Valor de venta (ingreso)',
    costo: 'Costo',
  },
};

// 3. Archivo de Ventas del Mes en Curso (Google Sheet)
export const CURRENT_MONTH_SALES_CONFIG = {
  sheetId: '1V3wsFYqf9gI3JY9W_lRYec-QsDDspEwfzUmDvRrRSe4', // Reemplaza con el ID de tu archivo
  sheetName: 'Hoja 1', // Nombre de la hoja
  columnMapping: {
    fecha: 'Fecha de venta / día',
    vendedor: 'Vendedor',
    sede: 'Departamento / Sede / zona',
    producto: 'Producto / servicio',
    valorVenta: 'Valor de venta',
    metaDia: 'Meta diaria/mensual', // Columna opcional
  },
};
