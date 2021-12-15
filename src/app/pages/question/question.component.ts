import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public title: string = '';
  public name: string = '';
  public idQuestionSelected: string = '';
  public question: any = {
    number: "",
    year: "",
    course: [],
	  subject: [],
    description: "",
    answer: ""
  }

  constructor(private questionService: QuestionsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idQuestionSelected = this.route.snapshot.paramMap.get('id') as any;
    if(this.idQuestionSelected){
     this.title = 'Editar Questão';
     this.loadQuestion(this.idQuestionSelected);
    }else{
      this.title = 'Cadastrar Questão';
    }
  }

  public save(){
    if(true){
      if(this.idQuestionSelected){
        this.questionService.updateQuestion(this.idQuestionSelected, this.question).subscribe(response => {
          this.router.navigate(['/cursos-listar']);
        });
      }else{
        this.questionService.createQuestion(this.question).subscribe(response => {
          this.name = "";
        });
      }
    }else{
      alert('O nome do curso deve conter no mínimo de 2 caracteres');
    }
  }

  public clear(){
    console.log('setForm');
  }

  public loadQuestion(id: string){
    this.questionService.getQuestionById(id).subscribe((response: any) => {
      this.question = response;
    })
  }

  public loadQuestions(){
    this.questionService.getQuestions().subscribe(response => {
      console.log(response);
    })
  }

}