import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  public title: string = '';
  public selectedSubject: any;
  public subjects: any;

  constructor(private subjectsService: SubjectsService, private router: Router) { }

  ngOnInit(): void {
    this.title = 'Editar Disciplina';
    this.loadSubjects();
  }

  public edit(){
    if(this.selectedSubject){
      this.router.navigate([`/disciplinas/${this.selectedSubject._id}`]);
    }else{
      alert('Selecione a disciplina');
    } 
  }

  public delete(){
    if(this.selectedSubject){
      this.subjectsService.deleteSubject(this.selectedSubject._id).subscribe(response => {
        this.router.navigate([`/disciplinas-listar`]);
        this.selectedSubject = null;
        this.loadSubjects();
      });
    }else{
      alert('Selecione a disciplina');
    }
  }

  public loadSubjects(){
    this.subjectsService.getSubjects().subscribe(response => {
      this.subjects = response;
    })
  }

}
