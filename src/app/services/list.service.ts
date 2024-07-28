import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { ITodo } from '../interfaces/itodo';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiURL:string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }


  getPosts(): Observable<IPost[]>{
    return this.http.get<IPost[]>(this.apiURL + '/posts');
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiURL + '/users')
  }

  getUserPosts(userId: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiURL+ '/posts?userId=' + userId)
  }

  getPost(postId: number): Observable<IPost> {
    return this.http.get<IPost>(this.apiURL+ '/posts/' + postId)
  }

  getUserTodo(userId: number): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.apiURL+ '/todos?userId=' + userId)
  }

  getPostsWithUsernames(): Observable<IPost[]> {
    return forkJoin([this.getPosts(), this.getUsers()]).pipe(
      map(([posts, users]) => {
        return posts.map(post => {
          const user = users.find(u => u.id === post.userId);
          return { ...post, username: user ? user.username : 'Unknown' };
        });
      })
    );
  }


}
