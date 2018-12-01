import { Coords } from "./coords";
import { Bike } from "./bike";

export interface Robbery {
    id? : string;
    dateRegister? : Date;
    userReport? : string;
    uid? : string;
    nickName? : string;
    coords?  : Coords;
    bike? : Bike;
}
