export interface Clinic {
  id: string;
  name: string;
  logo: string;
  phone: string;
  address: string;
  distance: string;
}

export const CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'MedCare Clinic Tebrau',
    logo: require('../assets/Medcare clinic tebrau.jpeg'),
    phone: '+60 7-300 4821',
    address: '12, Jalan Harmoni, Tebrau',
    distance: '0.5',
  },
  {
    id: '2',
    name: 'Tebrau Wellness Centre',
    logo: 'https://via.placeholder.com/80x40?text=Tebrau',
    phone: '+60 7-301 5743',
    address: '25, Jalan Sentral, Tebrau',
    distance: '1.8',
  },
  {
    id: '3',
    name: 'PrimeCare Health Clinic',
    logo: 'https://via.placeholder.com/80x40?text=PrimeCare',
    phone: '+60 7-302 6895',
    address: '40, Jalan Damai, Tebrau',
    distance: '2.9',
  },
]; 