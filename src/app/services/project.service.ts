import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, limit, orderBy, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { CreateProjectDTO } from '../utils/dto/create.project.dto';
import { ProjectType } from '../utils/type/project.type';

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
      createdAt: Timestamp.now(),
      userRef: userRef
    })
  } 

  public async searchProject(experience: string, category: string): Promise<ProjectType[]> {
    
    const projectRef = collection(this.firestore, 'project');
    const q = query(
      projectRef,
      where('category', '==', category),
      where('experience', 'in', experience),
      orderBy('createdAt', 'desc'),
      limit(15)
    );

    const querySnapchot = await getDocs(q);
    const posts = querySnapchot.docs.map(doc => doc.data() as ProjectType)
    return posts
  }
  

}
