export interface LoginResponse {
  token: string;
  rol: 'admin' | 'docente';
  nombre?: string;
}
