import { Component, OnInit, Input } from "@angular/core";
import { UsersService } from '../services/users.service';
import { User } from '../_models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: "app-user-register",
    templateUrl: "./user-register.component.html",
    styleUrls: ["./user-register.component.scss"],
})
export class UserRegisterComponent implements OnInit {
    @Input() user: User

    personalInfo: any = {}
    addressInfo: any = {}
    vehicleInfo: any = {}
    formValid: boolean
    userId: string

    private myId = Date.now()
    private params$: Subscription
    private user$: Subscription

    constructor(
        private userService: UsersService,
        private route: ActivatedRoute,
        private router: Router,
        private snack: MatSnackBar
    ) { }


    ngOnInit() {
        // this.userId = this.route.snapshot.paramMap.get('id')
        this.params$ = this.route.paramMap.subscribe(params => {
            this.userId = params.get('id')
            
            if (this.userId) {
                this.user$ = this.userService.getUser(this.userId, true)
                .subscribe(user => {
                    this.user = user
                    
                    if(!user)
                        setTimeout(()=> { // fix to avoid ChangeAfterViewChecked
                            this.snack.open(`Erro obter ao dados do usuário, por favor verifique 
                            o identificador na URL e tente novamente.`, null, {duration: 5000})
                        })
                }, () => {
                    this.snack.open(`Erro obter ao dados do usuário, por favor tente novamente.`, 
                            null, { duration: 5000 })
                })
            }
        })

    }

    ngOnDestroy() {
        this.params$ && this.params$.unsubscribe()
        this.user$ && this.user$.unsubscribe()
    }

    onSubmit() {

        let user: User = {
            ... this.personalInfo.value,
            address: { ... this.addressInfo.value },
            vehicle: { ... this.vehicleInfo.value }
        }

        if (this.userId) this.updateUser(this.userId, user)
        else this.registerUser(user)
    }

    /**
     * Update an existing user
     * @param user User
     */
    updateUser(userId: string, user: User) {
        this.formValid = false
        this.userService.updateUser(userId, user).subscribe( () => {
            this.clearData()
            this.router.navigate(['users'])
            
            this.snack.open(`Dados atualizados com sucesso!`, null, { duration: 3000 })
        }, err => {
            this.formValid = true
            this.snack.open(`Erro ao atualizar os dados, por favor tente novamente!`,
                null, { duration: 3000 })
        })
    }

    /**
     * Register an user
     * @param user User
     */
    registerUser(user: User) {
        this.userService.registerUser(user).subscribe( () => {
            this.clearData()
            this.router.navigate(['users/new'])
            this.snack.open(`Cadastro realizado com sucesso!`, null, { duration: 5000 })
        }, (err) => {
            this.snack.open(`Erro no cadastro, por favor tente novamente!`, null, { duration: 3000 })
        })
    }

    /**
     * Clear data after register or update user, to clear forms
     */
    private clearData() {
        this.userId = null
        this.user = {address:{}, vehicle:{}}
        this.personalInfo = {}
        this.addressInfo = {}
        this.vehicleInfo = {}
    }

    onChildFormChange(data, key) {
        this[key] = data
        this.formValid = this.addressInfo.valid &&
            this.personalInfo.valid &&
            this.vehicleInfo.valid
    }
}