import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public title: string = '';
  public name: string = '';
  public idQuestionSelected: string = '';
  public courses: any;
  public subjects: any;
  public question: any;

  constructor(
    private questionService: QuestionsService, 
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {;
    this.loadCourses();
    this.loadSubjects();
    this.idQuestionSelected = this.route.snapshot.paramMap.get('id') as any;
    if(this.idQuestionSelected){
     this.title = 'Editar Questão';
     this.loadQuestion(this.idQuestionSelected);
    }else{
      this.title = 'Cadastrar Questão';
      this.setForm();
    }
  }
  
  public setForm(){
    this.question = {
      number: "",
      year: "",
      course: [],
      subject: [],
      description: "",
      answer: ""
    }
  }

  public save(){
    if(this.question.number && this.question.year && this.question.course.length && this.question.subject.length && this.question.description && this.question.answer){
      if(this.idQuestionSelected){
        this.questionService.updateQuestion(this.idQuestionSelected, this.question).subscribe(response => {
          this.router.navigate(['/questoes-listar']);
        });
      }else{
        this.questionService.createQuestion(this.question).subscribe(response => {
          this.setForm();
        });
      }
    }else{
      alert('Preencha todos os campos para continuar');
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

  public loadCourses(){
    this.coursesService.getCourses().subscribe(response => {
      this.courses = response;
    })
  }

  public loadSubjects(){
    this.subjectsService.getSubjects().subscribe(response => {
      this.subjects = response;
    })
  }

}