import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseComponent } from './pages/course/course.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { QuestionComponent } from './pages/question/question.component';
import { SearchComponent } from './pages/search/search.component';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { SubjectComponent } from './pages/subject/subject.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cursos', component: CourseComponent },
  { path: 'cursos/:id', component: CourseComponent },
  { path: 'cursos-listar', component: CourseListComponent },
  { path: 'disciplinas', component: SubjectComponent },
  { path: 'disciplinas/:id', component: SubjectComponent },
  { path: 'disciplinas-listar', component: SubjectListComponent },
  { path: 'questoes', component: QuestionComponent },
  { path: 'questoes/:id', component: QuestionComponent },
  { path: 'questoes-listar', component: QuestionListComponent },
  { path: 'consultar', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
