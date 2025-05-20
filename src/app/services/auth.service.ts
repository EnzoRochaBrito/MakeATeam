import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { LoginDTO, RegisterDTO } from '../utils/dto/auth.dto';
import { Firestore, doc, setDoc, getDoc, Timestamp } from '@angular/fire/firestore';
import { UserProfileDTO } from '../utils/dto/user.dto';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly auth: Auth = inject(Auth)
  private  firestore = inject(Firestore)
  readonly currentUser = signal<User | null>(null); 
  readonly isLogged = signal(false);

  constructor(readonly toastr: ToastrService) {
    onAuthStateChanged(this.auth, user => {
      this.currentUser.set(user);
      this.isLogged.set(!!user)
    });
  }

  register(user: RegisterDTO){
    return from(
      createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then( async (cred) => {
        try {

          await updateProfile(cred.user, {displayName: user.name});

          const createProfile = doc(this.firestore, 'user', cred.user.uid);
          
          await setDoc(createProfile, {
            name: user.name,
            email: user.email,
            createdAt: Timestamp.now(),
            uid: cred.user.uid
          });

          const profileRef = doc(this.firestore, 'user', cred.user.uid);
          const snapshot = await getDoc(profileRef)
          const profile = snapshot.data() as UserProfileDTO;
          
          sessionStorage.setItem("profile", JSON.stringify(profile))

          this.toastr.success('Cadastrado com sucesso!')
          
          return cred
          
        } catch (error) {
          
          this.toastr.success('Um erro ocorreu durante o cadastro')
          console.log(error)

        }
      return
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
          this.toastr.error('Perfil não encontrado');
          return false
        }

        try {
          const profile = snapshot.data() as UserProfileDTO;
          
          sessionStorage.setItem("profile", JSON.stringify(profile))
          
          this.toastr.success('Logado com sucesso')
          
          return profile;
          
        } catch (error) {
          this.toastr.error('Um erro ocorreu durante o login')
          console.log(error);
        }

        return
      })
    );
  }

  logout(){
    this.toastr.info('Deslogando')
    return from(signOut(this.auth));
  }

}
