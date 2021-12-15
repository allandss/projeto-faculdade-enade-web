import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public question: any = {
    number: "",
    year: "",
    course: [],
    subject: [],
    description: "",
    answer: "",
    file: ""
  }
  public imageSrc: string = '';

  constructor(
    private questionService: QuestionsService, 
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private route: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService
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
      answer: "",
      file: ""
    }
  }

  public save(){
    if(this.question.number && this.question.year && this.question.course.length && this.question.subject.length && this.question.description && this.question.answer){
      if(this.idQuestionSelected){
        this.questionService.updateQuestion(this.idQuestionSelected, this.question).subscribe(response => {
          this.toastr.success('', 'Alterado com sucesso');
          setTimeout(() => {
            this.router.navigate(['/questoes-listar']);
            this.imageSrc = "";
          }, 1000);
        });
      }else{
        this.questionService.createQuestion(this.question).subscribe(response => {
          this.setForm();
          this.toastr.success('', 'Cadastrado com sucesso');
          this.imageSrc = "";
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
      this.imageSrc = response.file;
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

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.question.file = this.imageSrc;
  }

}