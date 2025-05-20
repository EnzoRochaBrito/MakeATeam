import { inject, Injectable } from '@angular/core';
import { arrayRemove, arrayUnion, collection, doc, Firestore, getDoc, getDocs, limit, orderBy, OrderByDirection, query, setDoc, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { CreateProjectDTO } from '../utils/dto/create.project.dto';
import { ProjectType, ProjectTypeUid } from '../utils/type/project.type';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  
  firestore = inject(Firestore)
  userUid!: string;

  constructor(private authService: AuthService, readonly userService: UserServiceService) {
    try {
      this.userUid = JSON.parse(sessionStorage.getItem('profile') as string).uid
    } catch(error) {
      console.log("usuário não está logado");
    }
  }

  public async createProject(project: CreateProjectDTO){

    const projectRef = doc(collection(this.firestore, 'project'));
    const userRef    = doc(this.firestore, 'user', this.userUid);

    await this.userService.addOwnedProject(projectRef.id, this.userUid)
    
    return await setDoc(projectRef, {
      ...project,
      createdAt: Date.now(),
      userRef: userRef,
      open: true,
      members: [],
      creator: this.authService.currentUser()?.displayName
    })
  } 

  public async searchProject(experience: string = '*', category: string = '*', tech: string[] = [], order: OrderByDirection = 'desc'): Promise<ProjectTypeUid[]> {
  
    const projectRef = collection(this.firestore, 'project');

    let q = query(
      projectRef,
      orderBy('createdAt', order),
      limit(15)
    );
  
    if (category !== '*') {
      q = query(q, where('category', '==', Number(category)));
    }
  
    if (experience !== '*') {
      q = query(q, where('experience', 'array-contains', experience));
    }

    if (tech && (tech.length > 0) && (tech.length <= 10) && (tech[0] != "")) {
      q = query(q, where('technologies', 'array-contains-any', tech))
    }

    const querySnapshot = await getDocs(q);
  
    const posts = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      peopleIn: 0,
      open: true,
      members: [],
      requests: [],
      memberRequest: [],
      ...doc.data() as ProjectType
    }));
  
    return posts;
  }

  public async getProjectByUid(uid: string): Promise<ProjectTypeUid | null> {
    const projectRef = doc(this.firestore, 'project', uid);
    const docSnap = await getDoc(projectRef);
  
    if (docSnap.exists()) {
      return {
        uid: docSnap.id,
        ...docSnap.data()
      } as ProjectTypeUid;
    } else {
      return null;
    }

  }
  
  public async sendMemberRequest(projectUid: string){
    const projectRef = doc(this.firestore, 'project', projectUid);

    await updateDoc(projectRef, {
    memberRequest: arrayUnion(this.userUid)
    });
  }

  public async addMember(projectUid: string, userUid: string){
    const projectRef = doc(this.firestore, 'project', projectUid);

    await updateDoc(projectRef, {
      memberRequest: arrayRemove(userUid),
      members: arrayUnion(userUid)
    });
  }

  public async deleteRequest(projectUid: string, userUid: string){
    const projectRef = doc(this.firestore, 'project', projectUid);

    await updateDoc(projectRef, {
      memberRequest: arrayRemove(userUid)
    });
  }
}
