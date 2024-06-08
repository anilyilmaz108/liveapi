import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { api } from '../constants';
import { ShareModel } from '../models/share.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public share?: Observable<any>;
  private shareSubject: BehaviorSubject<any>;
  httpClient = inject(HttpClient);
  constructor() {
    this.shareSubject = new BehaviorSubject<any>(this.share);
    this.share = this.shareSubject.asObservable();
  }

  // Bist100 Arama Verileri 
  getShareById(share: string) {
    return this.httpClient.get<ShareModel>(api + '/market/bist/' + share);
  }

  // Bist100 Tüm Veriler
  getShare() {
    return this.httpClient.get<any[]>(api + '/market/bist100/true');
  }

  // Takip Listesi Verileri
  getFollowList(userId: number) {
    return this.httpClient.get<any>(api + '/follow/getFollow/' + userId);
  }

  // Takip Listesine Ekleme
  createFollow(userId: any, shareSymbol: any): Observable<any> {
    return this.httpClient.post(`${api}/follow/createFollow`, {"user" : userId, "shareSymbol" : shareSymbol}).pipe(
      map((res) => {
        this.shareSubject.next(res);
        return res;
      })
    );
  }

  // Takip Listesinden Silme
  public deleteFollow(userId: any, shareSymbol: any): Observable<any> {
    return this.httpClient.delete(api + '/follow/deleteFollow/' + userId + '/' + shareSymbol);
  }
}
