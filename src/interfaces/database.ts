import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";
import { Customer } from "./customers";

export interface Database {
  customers: Customer;
}

export type customers = Selectable<Customer>;
export type newPerson = Insertable<Customer>;
export type updatedPerson = Updateable<Customer>;
