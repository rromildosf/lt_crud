import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators as vl, FormGroup, FormControl } from "@angular/forms";
import { Address } from '../_models/address.model';

@Component({
    selector: 'app-address',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
    @Input() address: Address
    @Output() onChanges = new EventEmitter()
    
    group: any = {}
    addressForm: FormGroup

    formItems = [
        {key: 'street', required: true, placeholder: 'Rua'},
        {key: 'number', required: true, placeholder: 'Nº', mask:"0*"},
        {key: 'district', required: true, placeholder: 'Bairro'},
        {key: 'city', required: true, placeholder: 'Cidade'},
        {key: 'state', required: true, placeholder: 'Estado'},
        {key: 'zipCode', required: false, placeholder: 'CEP', mask:"00000-000"},
        {key: 'complement', required: false, placeholder: 'Complemento'},
    ]

    constructor(private fb: FormBuilder) { 
        this.createForm()

    }

    ngOnChanges(changes: SimpleChanges): void {
        if( changes.address && this.addressForm ){
            if ( this.address && this.address.city )
                this.addressForm && this.addressForm.setValue(this.address||{})
            else this.addressForm.reset()
        }
    }

    ngOnInit() { }

    createForm() {
        this.formItems.forEach( item => {
            this.group[item.key] = item.required
                ? new FormControl('', [vl.required]) 
                : new FormControl('')
        })
        this.addressForm = new FormGroup(this.group)
        this.addressForm.get('zipCode').setValidators(vl.minLength(8))

        this.addressForm.valueChanges.subscribe(value => {
            const valid = this.addressForm.valid
            this.onChanges.emit( {valid, value: {...value}})
        })   
    }
    
}
