import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, limit, orderBy, OrderByDirection, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { CreateProjectDTO } from '../utils/dto/create.project.dto';
import { ProjectType, ProjectTypeUid } from '../utils/type/project.type';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  
  firestore = inject(Firestore)
  userUid: string;

  constructor(private authService: AuthService) {
    this.userUid = this.authService.currentUser()?.uid as string;
  }

  public async createProject(project: CreateProjectDTO){

    const projectRef = doc(collection(this.firestore, 'project'));
    const userRef    = doc(this.firestore, 'user', this.userUid);

    return await setDoc(projectRef, {
      ...project,
      createdAt: Date.now(),
      userRef: userRef,
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

  
  
  

}
