import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public title: string = '';
  public name: string = '';
  public idSubjectSelected: string = '';

  constructor(private subjectsService: SubjectsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idSubjectSelected = this.route.snapshot.paramMap.get('id') as any;
    if(this.idSubjectSelected){
     this.title = 'Editar Disciplina';
     this.loadSubject(this.idSubjectSelected);
    }else{
      this.title = 'Cadastrar Disciplina';
    }
  }

  public save(){
    if(this.name.length >= 2){
      if(this.idSubjectSelected){
        this.subjectsService.updateSubject(this.idSubjectSelected, { name: this.name }).subscribe(response => {
          this.router.navigate(['/disciplinas-listar']);
        });
      }else{
        this.subjectsService.createSubject({ name: this.name }).subscribe(response => {
          this.name = "";
        });
      }
    }else{
      alert('O nome da disciplina deve conter no mínimo de 2 caracteres');
    }
  }

  public clear(){
    this.name = '';
  }

  public loadSubject(id: string){
    this.subjectsService.getSubjectById(id).subscribe((response: any) => {
      this.name = response.name;
    })
  }

  public loadSubjects(){
    this.subjectsService.getSubjects().subscribe(response => {
      console.log(response);
    })
  }

}