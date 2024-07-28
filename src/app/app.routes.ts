import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { Component } from '@angular/core';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';


export const routes: Routes = [

  {
    path: "home",
    title: "Home",
    component: HomeComponent
  },
  {
    path: "posts",
    title: "Posts",
    component: PostsComponent
  },
  {
    path: "users",
    title: "Users",
    component: UsersComponent
  },
  {
    path: "detail/:id",
    title: "Details",
    component: PostDetailComponent
  },
  {
    path: "todo/:id",
    title: "todo",
    component: TodoDetailComponent
  },
  {
    path: "",
    redirectTo:"home",
    pathMatch:'full'
  },
  {
    path: "**",
    title: "404 - Page Not Found",
    component: PageNotFoundComponent
  },
];
