// import { isNotEmpty } from 'class-validator';

export class ListUsersDTO {
    //? INV: it does not assign default values
    limit: number = 1;
    offset: number = 0;
}