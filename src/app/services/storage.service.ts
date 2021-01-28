import {Injectable} from '@angular/core';
import {Members} from '../dashboard/members';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  addStaffDialog: boolean;
  addMemberDialog: boolean;
  private _membersData: Members[] = [];

  get membersData(): Members[] {
    return this._membersData;
  }

  set membersData(value: Members[]) {
    this._membersData = value;
  }

  constructor() {
  }

  saveUserData(data): void {
    localStorage.setItem('_user_', data);
  }

  saveToken(token): void {
    localStorage.setItem('_token_', token);
  }

  getToken(): any {
    return localStorage.getItem('_token_');
  }

  getUserData(): any {
    return localStorage.getItem('_user_');
  }

  isLoggedIn(): boolean {
    if(this.getUserData()){
    return true;
  } else return false
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
