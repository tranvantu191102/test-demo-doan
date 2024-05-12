import { Observable } from "rxjs";
import { UserInfo } from "../models";

export abstract class AuthRepository {
    abstract login(): Observable<UserInfo>;

    abstract logout(): Observable<void>;
}