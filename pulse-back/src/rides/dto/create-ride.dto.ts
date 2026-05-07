export class CreateRideDto {
    id_rides:number;
    depature_time: Date;
    price: number;
    available_seats: number;
    description: string;
    departure_commune_id: number;
    arrival_commune_id: number;
    id_users: number;
    id_events: number;
}
