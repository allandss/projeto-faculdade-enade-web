import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  public title: string = '';
  public selectedCourse: any;
  public courses: any;

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.title = 'Editar Curso';
    this.loadCourses();
  }

  public edit(){
    if(this.selectedCourse){
      this.router.navigate([`/cursos/${this.selectedCourse._id}`]);
    }else{
      alert('Selecione o curso');
    } 
  }

  public delete(){
    if(this.selectedCourse){
      this.coursesService.deleteCourse(this.selectedCourse._id).subscribe(response => {
        this.router.navigate([`/cursos-listar`]);
        this.selectedCourse = null;
        this.loadCourses();
      });
    }else{
      alert('Selecione o curso');
    }
  }

  public loadCourses(){
    this.coursesService.getCourses().subscribe(response => {
      this.courses = response;
    })
  }

}
