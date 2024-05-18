import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    this.isLoggedInSubject.next(true);
  }

  async register(email: string, password: string): Promise<void> {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.isLoggedInSubject.next(true);
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
