import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators as vl, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import * as moment from 'moment';
import { User } from '../_models/user.model';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {
    @Input() info: User
    @Output() onChanges = new EventEmitter()
    personalForm: FormGroup;
    startDate: Date
    
    _sub$: Subscription
    phoneMask: Subject<string> = new Subject();

    constructor(private fb: FormBuilder) {
        this.startDate = moment().subtract(18, 'years').toDate()
        this.createForm()
    }

    ngOnInit() { }

    ngOnChanges(changes){
        if ( changes.info && this.personalForm ){
            if ( this.info && this.info.CPF )
                this.setFormData()
            else this.personalForm.reset()            
        }
    }

    setFormData() {
        const { name, CPF, birthdate, phone } = this.info
        this.personalForm.setValue({ name, CPF, birthdate, phone })
    }

    createForm() {
        
        this.personalForm = this.fb.group({
            name: ["", vl.required],
            CPF: ["", [vl.required, vl.minLength(11), cpfValidator]],
            phone: ["", [vl.required, vl.minLength(8)]],
            birthdate: ["", vl.required]
        });

        this._sub$ = this.personalForm.valueChanges.subscribe(value => {
            const valid = this.personalForm.valid
            this.onChanges.emit({ valid, value: { ...value } })
        })
    }


    ngOnDestroy() {
        if (this._sub$) this._sub$.unsubscribe()
    }    

    onPhoneChange(ev: string) {
        if (ev.length <= 14) this.phoneMask.next('(00) 0000-00000')
        else this.phoneMask.next('(00) 00000-0000')
    }
}

function checkCPF(cpf: string) {
    let i
    for( i = 1; i < cpf.length; i++)
        if( cpf[0] != cpf[i] ) break
    
    if ( i == 11 ) return false // all items are equals
    
    let sum10 = 0, sum11 = 0, rest
    for (i = 11; i > 1; i--) {
        sum10 += (i != 11) ? parseInt(cpf[10-i]) * i : 0
        sum11 += parseInt(cpf[11-i]) * i
    }

    rest = (sum10 * 10) % 11
    rest = (rest == 10) || (rest == 11) ? 0 : rest
    if (rest != cpf[9]) return false

    rest = (sum11 * 10) % 11
    rest = (rest == 10) || (rest == 11) ? 0 : rest
    if (rest != cpf[10]) return false

    return true;
}


function cpfValidator(control: FormControl) {
    const cpf =  control.value
    if ( cpf && !checkCPF(cpf) )
        return { message: 'CPF inválido' }
    return null
}
