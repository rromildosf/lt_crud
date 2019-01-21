import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    
    private _userListKey = 'user_list'
    private _activeUser: User
    private _subject$ : BehaviorSubject<User[]>
    
    constructor() { }


    get activeUser() {
        return this._activeUser
    }
    set activeUser(user: User) {
        this._activeUser = user
    }

    private next(value) {
        if (!this._subject$)
            this._subject$ = new BehaviorSubject(value)
        else this._subject$.next(value)
    }

    registerUser( user: User ): Observable<any> {
        return timer(200).pipe(
            map( () => {
                const users = this._getUsers() || []
                user.id = Date.now()+'' /* not work for many req at same time */
                users.unshift( user )
                localStorage.setItem(this._userListKey, JSON.stringify(users))
                
                this.next(users)
                return user.id
            }))
    }

    updateUser( userId: string, user: User ): Observable<any> {
        return timer(200).pipe(
            map( () => {
                const users = this._getUsers()
                const index = users.findIndex( (u) => u.id === userId )
                user.id = userId // for security
                users[index] = user
                localStorage.setItem(this._userListKey, JSON.stringify(users))
                
                this.next(users)
                return user.id
            })
        )
    }

    getUsers(): Observable<User[]> {
        const users = this._getUsers()
        this.next(users)
        return this._subject$
    }


    getUser(userId: string, checkLoaded = false): Observable<User> {
        if ( checkLoaded && this._activeUser ) {
            return of(this._activeUser)
        }
        return this.getUsers().pipe(
            map( users => users.filter(u => u.id == userId) ),
            map( users => users.length > 0 ? users[0] : {} )
        )
    }

    duplicate(user: User): Observable<string> {
        return this.registerUser(user)
    }

    delete(userId: string): Observable<User> {
        return timer(200).pipe(
            map(() => {
                const users = this._getUsers()
                const index = users.findIndex( u => u.id == userId )
                const removed = users.splice(index, 1)
                localStorage.setItem(this._userListKey, JSON.stringify(users))
                this.next(users)
                return removed.length > 0 ? removed[0] : null
            })
        )
    }
    
    private _getUsers(): User[] {
        return JSON.parse(localStorage.getItem(this._userListKey))
    }

    private _parseString<T>(str): T {
        return JSON.parse(str)
    }
}
