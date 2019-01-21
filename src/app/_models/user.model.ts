import { Address } from './address.model';
import { Vehicle } from './vehicle.model';

export interface User {
    id?: string // necessary to avoid same id
    name?:  string
    phone?: string
    CPF?: string
    birthdate?: Date
    address?: Address
    vehicle?: Vehicle
}
