import { Role } from './role';
import {dateSelectionJoinTransformer} from "@fullcalendar/angular";

export class User {
  _id: number;
  email: string;
  first_name: string;
  avatar: string;
  role: Role;
  token?: string;
  dob:string;
  status:boolean;
  last_name: string;
}
