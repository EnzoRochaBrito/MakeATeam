import { inject, Injectable, OnInit } from '@angular/core';
import { arrayRemove, arrayUnion, collection, doc, Firestore, getDoc, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { IUserProfile } from '../utils/dto/user.dto';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit {

  firestore = inject(Firestore)
  authService = inject(AuthService)
  userUid!: string;

  constructor(readonly toastr: ToastrService){}

  ngOnInit(): void {
    this.userUid = JSON.parse(sessionStorage.getItem('profile')!).uid;
  }

  async getUser(userUid: string){
    const userRef = doc(this.firestore, 'user', userUid);
    const profile = await getDoc(userRef)
    return profile.data()
  }

  async addOwnedProject(projectUid: string, userUid: string){
    const projectRef = doc(this.firestore, 'project', projectUid);
    const userRef    = doc(this.firestore, 'user', userUid);
    await updateDoc(userRef, {
      projectsOwned: arrayUnion(projectRef.id)
    })
    const profile = await getDoc(userRef)
    sessionStorage.setItem("profile", JSON.stringify(profile.data()))
    return
  }

  async removeOwnedProject(projectUid: string){
    const projectRef = doc(this.firestore, 'project', projectUid);
    const userRef    = doc(this.firestore, 'user', this.userUid);
    await updateDoc(userRef, {
      projectsOwned: arrayRemove(projectRef)
    })
    const profile = await getDoc(userRef)
    sessionStorage.setItem("profile", JSON.stringify(profile.data()))
    return
  }

  async saveProject(projectUid: string, userUid: string){
    try {
      
      const projectRef = doc(this.firestore, 'project', projectUid);    
      const userRef    = doc(this.firestore, 'user', userUid);
      await updateDoc(userRef, {
        savedProjects: arrayUnion(projectRef.id)
      })
      const profile = await getDoc(userRef)
      sessionStorage.setItem("profile", JSON.stringify(profile.data()))
      this.toastr.success('Projeto salvo com sucesso')
      return
      
    } catch (error) {
      
      this.toastr.success('Erro ao salvar projeto')
      console.log(error);
    
    }
  }

  async removeSavedProject(projectUid: string){
    const projectRef = doc(this.firestore, 'project', projectUid);
    const userRef    = doc(this.firestore, 'user', this.userUid);
    await updateDoc(userRef, {
      savedProjects: arrayRemove(projectRef)
    })
    const profile = await getDoc(userRef)
    sessionStorage.setItem("profile", JSON.stringify(profile.data()))
    return
  }

  async updateUser(user: IUserProfile){
    try {
      const userRef = doc(this.firestore, 'user', user.uid);
      await updateDoc(userRef, {
        description: user.description,
        stack: user.stack
      })
      const profile = await getDoc(userRef)
      sessionStorage.setItem("profile", JSON.stringify(profile.data()))
      this.toastr.success('Informações atualizadas com sucesso')      
      return
    } catch (error) {

      this.toastr.success('Erro ao atualizar informações')      
      console.log(error);
      
    }
  }

}
