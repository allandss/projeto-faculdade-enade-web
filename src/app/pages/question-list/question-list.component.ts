import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from 'src/app/services/courses.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  public title: string = '';
  public questions: any = [];
  public courses: any;
  public subjects: any;
  public question: any = {
    number: "",
    year: "",
    course: [],
    subject: [],
  }
  public numbers: any = [];
  public years: any = [];

  constructor(
    private questionService: QuestionsService, 
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private route: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadOptions();
    this.loadCourses();
    this.loadSubjects();
    this.title = 'Editar Questão';
  }

  public edit(question: any){
    console.log('edit');
    this.router.navigate([`/questoes/${question._id}`]);
  }

  public delete(question: any){
    this.questionService.deleteQuestion(question._id).subscribe(response => {
      this.toastr.success('', 'Deletado com sucesso');
      this.questionService.getQuestions().subscribe(response => {
        this.questions = response;
      })
    });

  }

  public clear(){
    this.setFilter();
    this.questions = [];
  }

  public setFilter(){
    this.question = {
      number: "",
      year: "",
      course: [],
      subject: [],
    }
  }

  public filterQuestions(){
    this.questionService.getQuestions().subscribe(response => {
      this.questions = response;
      if(this.question.number){
        this.questions = this.questions.filter((item: any) => { return parseInt(item.number) == parseInt(this.question.number) });
      }
      if(this.question.year){
        this.questions = this.questions.filter((item: any) => { return parseInt(item.year) == parseInt(this.question.year) });
      }

      if(this.question.course.length){
        let items: any = [];
        this.question.course.map((selected: any)=> {
          this.questions.map((question: any) => {
            question.course.map((course: any) => { 
              if(course.name === selected.name){
                const exists = items.filter((item: any) => { return item._id  === question._id});
                if(!exists.length){
                  items.push(question);
                }
              }
            })
          })
        });
        this.questions = items;
      }

      if(this.question.subject.length){
        let items: any = [];
        this.question.subject.map((selected: any)=> {
          this.questions.map((question: any) => {
            question.subject.map((subject: any) => { 
              if(subject.name === selected.name){
                const exists = items.filter((item: any) => { return item._id  === question._id});
                if(!exists.length){
                  items.push(question);
                }
              }
            })
          })
        });
        this.questions = items;
      }
    });
  }


  public loadOptions(){
    this.questionService.getQuestions().subscribe(response => {
      const numbers = response.map(item => { return item.number }).sort();
      const years = response.map(item => { return item.year }).sort();

      this.numbers = numbers.filter((item, i) => numbers.indexOf(item) === i);
      this.years = years.filter((item, i) => years.indexOf(item) === i);
    });
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

