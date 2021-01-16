import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel, SignUpModel} from '../models/auth.model';
import {MemberModel} from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  AUTH_URL = '/auth/';
  MEMBERS_URL = '/members/';

  constructor(private http: HttpClient) {
  }

  login(data: LoginModel): any {
    return this.http.post(`${this.AUTH_URL}login`, data);
  }

  signUp(data: SignUpModel): any {
    return this.http.post(`${this.AUTH_URL}new/user`, data);
  }

  addMembers(data: MemberModel): any {
    return this.http.post(this.MEMBERS_URL, data);
  }

  getMemberById(id: string): any {
    return this.http.get(`${this.MEMBERS_URL}${id}`);
  }

  updateMemberData(data: MemberModel): any {
    console.log(data)
    return this.http.patch(`${this.MEMBERS_URL}`, data)
  }

  deleteMember(member: MemberModel): any {
    return this.http.delete(`${this.MEMBERS_URL}${member.id}`)
  }

  getAllMembers(): any {
    return this.http.get(this.MEMBERS_URL);
  }
}
