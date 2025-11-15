
import { HISTORICAL_SALES_CONFIG, CURRENT_MONTH_SALES_CONFIG, GOOGLE_API_KEY } from '../config/dataConfig';
import { HistoricalSale, CurrentMonthSale } from '../types';

// ==========================================================================================
// NOTA IMPORTANTE SOBRE LA INTEGRACIÓN REAL
// ==========================================================================================
// Este archivo SIMULA la obtención de datos. Para una implementación real:
// 1. Ve a Google Cloud Platform, crea un proyecto y habilita la API de Google Sheets.
// 2. Crea una clave de API (API Key).
// 3. Configura la clave en tus variables de entorno como `REACT_APP_GOOGLE_API_KEY`.
// 4. Asegúrate de que tus archivos de Google Sheets estén compartidos como "Cualquier persona con el enlace puede ver".
// 5. Instala una librería como 'gapi-script' para facilitar las llamadas a la API.
//    - `npm install gapi-script`
//    - En tu componente principal (App.tsx), inicializa gapi:
//      `import { useEffect } from 'react';`
//      `import { gapi } from 'gapi-script';`
//      `useEffect(() => { gapi.load('client', () => { gapi.client.init({ apiKey: GOOGLE_API_KEY, discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"] }) }) }, [])`
// 6. Descomenta y adapta la función `fetchSheetData` y úsala en lugar de los mocks.
// ==========================================================================================

// Función real para obtener datos (actualmente comentada)
/*
async function fetchSheetData(sheetId: string, sheetName: string): Promise<any[][]> {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: sheetName,
        });
        return response.result.values || [];
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        throw new Error("No se pudieron cargar los datos de Google Sheets. Verifica la configuración.");
    }
}
*/

// --- MOCK IMPLEMENTATION ---

const generateMockHistoricalData = (): HistoricalSale[] => {
    const data: HistoricalSale[] = [];
    const sedes = ['Bogotá', 'Medellín', 'Cali'];
    const vendedores = ['Ana', 'Carlos', 'Luisa', 'Juan', 'Maria'];
    const marcas = ['Marca A', 'Marca B', 'Marca C'];
    const productos = ['Accesorio 1', 'Accesorio 2', 'Lujo 1', 'Lujo 2'];

    for (let i = 0; i < 500; i++) {
        const date = new Date(2022, Math.floor(i / 50), (i % 28) + 1);
        const valorVenta = Math.random() * 500000 + 50000;
        data.push({
            fecha: date,
            ano: date.getFullYear(),
            mes: date.getMonth() + 1,
            sede: sedes[i % sedes.length],
            vendedor: vendedores[i % vendedores.length],
            marca: marcas[i % marcas.length],
            producto: productos[i % productos.length],
            cantidad: Math.floor(Math.random() * 10) + 1,
            valorVenta: valorVenta,
            costo: valorVenta * (Math.random() * 0.3 + 0.5),
        });
    }
    return data;
};

const generateMockCurrentMonthData = (): CurrentMonthSale[] => {
    const data: CurrentMonthSale[] = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const sedes = ['Bogotá', 'Medellín', 'Cali'];
    const vendedores = ['Ana', 'Carlos', 'Luisa', 'Juan', 'Maria'];
    const productos = ['Servicio A', 'Producto X', 'Servicio B', 'Producto Y'];

    for (let i = 1; i <= today.getDate(); i++) {
        for (let j = 0; j < 5; j++) { // 5 ventas por día
             data.push({
                fecha: new Date(year, month, i),
                vendedor: vendedores[j % vendedores.length],
                sede: sedes[j % sedes.length],
                producto: productos[j % productos.length],
                valorVenta: Math.random() * 300000 + 40000,
             });
        }
    }
    return data;
}

export const getHistoricalSales = async (): Promise<HistoricalSale[]> => {
    console.log("Fetching historical sales data (mock)...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula latencia de red
    return generateMockHistoricalData();
};

export const getCurrentMonthSales = async (): Promise<CurrentMonthSale[]> => {
    console.log("Fetching current month sales data (mock)...");
    await new Promise(resolve => setTimeout(resolve, 800)); // Simula latencia de red
    return generateMockCurrentMonthData();
};
