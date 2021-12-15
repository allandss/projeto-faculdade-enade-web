import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  public title: string = '';
  public name: string = '';
  public idCourseSelected: string = '';

  constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idCourseSelected = this.route.snapshot.paramMap.get('id') as any;
    if(this.idCourseSelected){
     this.title = 'Editar Curso';
     this.loadCourse(this.idCourseSelected);
    }else{
      this.title = 'Cadastrar Curso';
    }
  }

  public save(){
    if(this.name.length >= 2){
      if(this.idCourseSelected){
        this.coursesService.updateCourse(this.idCourseSelected, { name: this.name }).subscribe(response => {
          this.router.navigate(['/cursos-listar']);
        });
      }else{
        this.coursesService.createCourse({ name: this.name }).subscribe(response => {
          this.name = "";
        });
      }
    }else{
      alert('O nome do curso deve conter no mínimo de 2 caracteres');
    }
  }

  public clear(){
    this.name = '';
  }

  public loadCourse(id: string){
    this.coursesService.getCourseById(id).subscribe((response: any) => {
      this.name = response.name;
    })
  }

  public loadCourses(){
    this.coursesService.getCourses().subscribe(response => {
      console.log(response);
    })
  }

}
