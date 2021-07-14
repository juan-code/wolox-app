import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { StorageService } from '@app/shared/services';
import { environment } from '@env/environment';

import { ResponseSession, Login, User } from './session.entity';

@Injectable()
export class SessionService {
  private readonly apiAuth:string = environment.apiAuth;
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) { }

  public signIn(body:Login):Observable<ResponseSession> {
    return this.http.post<ResponseSession>(`${this.apiAuth}/login`, body)
    .pipe(
      tap(response => {
        this.storageService.setTokenStorage(response.token);
        return response
      })
    )
  }

  public signUp(body:User): Observable<ResponseSession> {
    return this.http.post<ResponseSession>(`${this.apiAuth}/signup`, body)
    .pipe(
      tap(response => {
        this.storageService.setTokenStorage(response.token);
        return response;
      })
    );
  }
}
