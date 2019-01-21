import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../_models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MessageComponent } from '../commom/message/message.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    _sub$: Subscription
    _showDense: boolean

    users: User[]

    dataSource: MatTableDataSource<User>
    displayedColumns: string[] = ['name', 'phone', 'CPF', 'birthdate', 'star'];
    infoColumnName = 'Nome'


    constructor(
        private userService: UsersService, 
        private router: Router,
        private snack: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        if (window.innerWidth < 576){
            this._showDense = true
            this.displayedColumns = ['name']
            this.infoColumnName = 'Informações'
        }
        this._sub$ = this.userService.getUsers()
            .subscribe( users => {
                setTimeout(() => { // fix for mat-paginator
                    this.users = users 
                    this.dataSource = new MatTableDataSource<User>(users);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator

                    this.paginator._intl.itemsPerPageLabel = 'Exibir'
                })
        })
    }

    ngOnDestroy() {
        this._sub$ && this._sub$.unsubscribe()
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onClick(user: User) {
        this.userService.activeUser = user
        this.router.navigate(['users/', user.id])
    }

    onEdit(user: User) {
        this.userService.activeUser = user
        this.router.navigate(['users/', user.id, 'edit'])
    }
    
    onDelete(user: User) {
        const dialogRef = this.dialog.open(MessageComponent)
        dialogRef.afterClosed().subscribe(res => {
            if( res )
                this.userService.delete(user.id).subscribe(() => {
                    this._successMessage()
                }, err => {
                    this._errMessage()
                })
        })
    }
    
    onDuplicate(user: User) {
        this.userService.duplicate(user).subscribe(() => {
            this._successMessage()
        }, err => {
            this._errMessage()
        })
    }

    /* Only for dev */
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 576) {
            this.displayedColumns = ['name']
            this._showDense = true
            this.infoColumnName = 'Informações'
        }
        else {
            this.displayedColumns = ['name', 'phone', 'CPF', 'birthdate', 'star'];
            this._showDense = false
            this.infoColumnName = 'Nome'
        }
    }
    
    _errMessage() {
        this.snack.open('Erro! Por favor tente novamente', null, {
            duration: 3000
        })
    }
    _successMessage() {
        this.snack.open('Ação realizada com sucesso!', null, {
            duration: 3000
        })
    }
}
