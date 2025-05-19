import { inject, Injectable } from '@angular/core';
import { arrayRemove, arrayUnion, collection, doc, Firestore, getDoc, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  firestore = inject(Firestore)
  userUid!: string;

  constructor(private authService: AuthService) {
      this.userUid = this.authService.currentUser()?.uid as string;
  }

  async saveProject(projectUid: string){
    const projectRef = doc(this.firestore, 'project', projectUid);
    const userRef    = doc(this.firestore, 'user', this.userUid);

    await updateDoc(userRef, {
      savedProjects: arrayUnion(projectRef.id)
    })

    const profile = await getDoc(userRef)

    sessionStorage.setItem("profile", JSON.stringify(profile.data()))
    return
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

  async listSavedProjects(){
    const profile = JSON.parse(sessionStorage.getItem("profile")!)

  }

}
