export interface Timetable {
  day: string;
  hours: string;
}

export interface Coach {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  rate: number; // USD per hour
  phone: string;
  address: string;
  location: string; // City/Area
  avatar: string;
  timetable: Timetable[];
}