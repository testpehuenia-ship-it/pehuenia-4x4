export type Tab = 'inicio' | 'circuito' | 'galeria' | 'quienes-somos';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string;
  people: string;
  vehicle: string;
  message: string;
  status: 'Pendiente de Confirmación' | 'Confirmada' | 'Rechazada';
  createdAt: string;
}
