import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { LoginDTO, RegisterDTO } from '../utils/dto/auth.dto';
import { Firestore, doc, setDoc, getDoc, Timestamp } from '@angular/fire/firestore';
import { UserProfileDTO } from '../utils/dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly auth: Auth = inject(Auth)
  private  firestore = inject(Firestore)
  readonly currentUser = signal<User | null>(null); 
  readonly isLogged = signal(false);

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.currentUser.set(user);
      this.isLogged.set(!!user)
    });
  }

  register(user: RegisterDTO){
    return from(
      createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then( async (cred) => {
        await updateProfile(cred.user, {displayName: user.name});

        const profile = doc(this.firestore, 'user', cred.user.uid);
        
        await setDoc(profile, {
          name: user.name,
          email: user.email,
          createdAt: Timestamp.now(),
          uid: cred.user.uid
        });

        return cred
      })
    );
  }

  login(user: LoginDTO){
    return from(signInWithEmailAndPassword(this.auth, user.email, user.password)).pipe(
      switchMap(async (cred) => {

        const uid = cred.user.uid;
        const profileRef = doc(this.firestore, 'user', uid);
        const snapshot = await getDoc(profileRef)

        if (!snapshot.exists()) {
          throw new Error('Perfil não encontrado');
        }

        const profile = snapshot.data() as UserProfileDTO;
        
        sessionStorage.setItem("profile", JSON.stringify(profile))

        return profile;
      })
    );
  }

  logout(){
    return from(signOut(this.auth));
  }

}
