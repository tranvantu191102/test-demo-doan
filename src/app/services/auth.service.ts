import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthRepository } from "../repositories/auth.repository";
import { UserInfo } from "../models";

@Injectable()
export class AuthService implements AuthRepository {

    constructor(private httpClient: HttpClient){}

     login(): Observable<UserInfo> {
        return this.httpClient.get<UserInfo>('')
    }

     logout(): Observable<void> {
        return this.httpClient.get<void>('')
    }
}