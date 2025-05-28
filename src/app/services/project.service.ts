import { inject, Injectable } from '@angular/core';
import { arrayRemove, arrayUnion, collection, doc, Firestore, getDoc, getDocs, limit, orderBy, OrderByDirection, query, setDoc, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { CreateProjectDTO } from '../utils/dto/create.project.dto';
import { ProjectType, ProjectTypeUid } from '../utils/type/project.type';
import { UserServiceService } from './user-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  
  firestore = inject(Firestore)
  userUid!: string;

  constructor(private authService: AuthService, readonly userService: UserServiceService, readonly toastr: ToastrService) {
    try {
      this.userUid = JSON.parse(sessionStorage.getItem('profile') as string).uid
    } catch(error) {
      console.log("usuário não está logado");
    }
  }

  public async createProject(project: CreateProjectDTO){
      try{

        const projectRef = doc(collection(this.firestore, 'project'));
        const userRef    = doc(this.firestore, 'user', this.userUid);
        
        await this.userService.addOwnedProject(projectRef.id, this.userUid)
        
        await setDoc(projectRef, {
        ...project,
        createdAt: Date.now(),
        userRef: userRef,
        open: true,
        members: [],
        creator: this.authService.currentUser()?.displayName
      })

      this.toastr.success('Projeto criado com sucesso!')
      
      return true

    } catch(err) {
        return false
    }
  } 

  public async searchProject(experience: string = '*', category: string = '*', tech: string[] = [], order: OrderByDirection = 'desc'): Promise<ProjectTypeUid[]> {
  
    const projectRef = collection(this.firestore, 'project');

    let q = query(
      projectRef,
      orderBy('createdAt', order),
      where('open', '==', true),
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
    try {
      
      const projectRef = doc(this.firestore, 'project', projectUid);
  
      console.log(this.userUid)
      await updateDoc(projectRef, {
      memberRequest: arrayUnion(this.userUid)
      });
      
      this.toastr.success('Requisição enviada com sucesso!')

    } catch (error) {

      this.toastr.error('Erro ao mandar a requisição')

    }
  }

  public async closeProject(projectUid: string){
    try {
      const projectRef = doc(this.firestore, 'project', projectUid);
      await updateDoc(projectRef, {
        open: false
      });
      this.toastr.warning('Quantidade máxima atingida!', 'Projeto Fechado')
    } catch (error) {
      console.log(error)
    }
  }
  
  public async openProject(projectUid: string){
    try {
      const projectRef = doc(this.firestore, 'project', projectUid);
      await updateDoc(projectRef, {
        open: true
      });
      this.toastr.warning('Projeto Reaberto!')
    } catch (error) {
      console.log(error)
    }
  }

  public async addMember(project: ProjectTypeUid, userUid: string){
    
    const projectUid = project.uid

    if (project.members.length == (project.vancancy-1)){
      await this.closeProject(projectUid)
    }

    try {
      const projectRef = doc(this.firestore, 'project', projectUid);
      const userRef    = doc(this.firestore, 'user', userUid);
  
      await updateDoc(projectRef, {
        memberRequest: arrayRemove(userUid),
        members: arrayUnion(userUid)
      });

      await updateDoc(userRef, {
        memberOf: arrayUnion(projectUid)
      })

      this.toastr.info('Usuário adicionado com sucesso!')
    } catch (error) {
      
      this.toastr.error('Erro ao adicionar o usuário')
      console.log(error)
      
    }
    
  }
  
  public async removeMember(project: ProjectTypeUid, userUid: string){
    
    const projectUid = project.uid

    try {
      const projectRef = doc(this.firestore, 'project', projectUid);
      const userRef    = doc(this.firestore, 'user', userUid);
  
      await updateDoc(projectRef, {
        members: arrayRemove(userUid)
      });

      await updateDoc(userRef, {
        memberOf: arrayRemove(projectUid)
      })

      this.toastr.info('Usuário removido com sucesso!')
    } catch (error) {
      
      this.toastr.error('Erro ao remover o usuário')
      console.log(error)
      
    }
    
  }

  public async deleteRequest(project: ProjectTypeUid, userUid: string){
    try {
      const projectRef = doc(this.firestore, 'project', project.uid);
      
      await updateDoc(projectRef, {
        memberRequest: arrayRemove(userUid)
      });
      
      this.toastr.info('Usuário removido com sucesso!')
    } catch (error) {

      this.toastr.info('Erro ao remover o usuário')
      console.log(error)

    }
  }

  public async editUserTag(project: ProjectTypeUid, userUid: string, tag: string) {
    try {
      const projectRef = doc(this.firestore, 'project', project.uid);
      
      await updateDoc(projectRef, {
        tags: {[userUid]: tag}
      });
      
      this.toastr.success('Tag atribuida com sucesso')
    } catch (error) {

      this.toastr.info('Erro ao atribuir tag')
      console.log(error)
    }
  }
}
