
export interface HistoricalSale {
  fecha: Date;
  ano: number;
  mes: number;
  sede: string;
  vendedor: string;
  marca: string;
  producto: string;
  cantidad: number;
  valorVenta: number;
  costo: number;
}

export interface CurrentMonthSale {
  fecha: Date;
  vendedor: string;
  sede: string;
  producto: string;
  valorVenta: number;
  metaDia?: number;
}

export interface KPI {
  label: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export type ChartData = {
  name: string;
  [key: string]: string | number;
};
