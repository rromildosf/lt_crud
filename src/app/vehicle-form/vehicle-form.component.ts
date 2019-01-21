import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, Validators as vl, FormGroup, FormControl } from "@angular/forms";
import { VehicleService, ItemGroup, Item } from '../services/vehicle.service';
import { Vehicle } from '../_models/vehicle.model';

export const _filter = (opt: Item[], value: string): Item[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(it => it.name.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
    @Input() vehicle: Vehicle
    @Output() onChanges = new EventEmitter()
    
    brandGroupOptions: Observable<ItemGroup[]>;
    modelGroupOptions: Observable<ItemGroup[]>;
    yearOptions: Observable<Item[]>;

    private vehicleForm: FormGroup

    brandId: string
    modelId: string
    yearId: string
    
    constructor(private vService: VehicleService, private fb: FormBuilder) {
        this.createForm()
    }


    ngOnInit() {
        /* Gets the brands */
        this.getBrands()
    }

    ngOnChanges(changes){
        if( changes.vehicle && this.vehicleForm ){
            if ( this.vehicle && this.vehicle.brand ){
                const {brand, model, modelYear} = this.vehicle
                const year = modelYear
                this.vehicleForm.setValue({ brand, model, year })
    
                /* Call onSelect to get data from API */
                this.onSelect( this.vehicle.brandId, 'brand' )
                this.onSelect( this.vehicle.modelId, 'model' )
                this.onSelect( this.vehicle.yearId, 'year' )
            }
            else this.vehicleForm.reset()
        }
    }

    createForm() {
        this.vehicleForm = this.fb.group({
            brand: new FormControl('', vl.required),
            model: new FormControl({value: '', disabled:true}, vl.required),
            year:  new FormControl({value: '', disabled:true}, vl.required),
        })

        /* Emits the data as the user fills in the fields. */
        this.vehicleForm.valueChanges
            .subscribe(value => {
                const valid = this.vehicleForm.valid
                this.onChanges.emit({ valid, value: { ...value } })
            })
    }

    onSelect(id: string, type: 'brand'|'model'|'year') {
        switch (type) {
            case 'brand':
                this.brandId = id
                this.getVehicleModels( id )
                break;
            case 'model':
                this.modelId = id
                this.getModelYears( this.brandId, id )
                break;
            
            default:
                this.yearId = id
                this.getVehicleInfo( this.brandId, this.modelId, id )
                break;
        }

    }

    /**
     * Gets the brands from API, organized as
     * {
     *  letter: string, // First letter of brand name
     *  items: Item[], // All brands that starts with 'letter'
     * }
     */
    getBrands() {
        this.vService.getBrands().subscribe(brands => {
            /* Listen for changes in inputs and filters the data */
            this.brandGroupOptions = this.vehicleForm
                .get('brand')!.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filterGroup(brands, value))
                );
        })
    }

    /**
     * Gets all models from selected brand
     * @param brandId API brandId
     */
    getVehicleModels(brandId: string) {
        // Called after choose a brand
        this._clearModel()
        this._clearYear()
        // Clear mode and year after choose a new brand
        this.vehicleForm.get('model').enable()
        this.vehicleForm.get('year').disable()

        if( !brandId ) return  // ignore if only typing

        this.vService.getVehicleModels(brandId).subscribe(models => {
            this.modelGroupOptions = this.vehicleForm
                .get('model')!.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filterGroup(models, value))
                );
            }, err => {
                // TODO
            })
    }
    
    /**
     * Gets all years of the models
     * @param brandId selected brandId 
     * @param modelId selected modelId
     */
    getModelYears(brandId: string, modelId: string) {
        this._clearYear()
        this.vehicleForm.get('year').enable() 

        if (!brandId || !modelId) return  

        this.vService.getModelYears(brandId, modelId).subscribe(years => {
            this.yearOptions = this.vehicleForm
                .get('year')!.valueChanges
                .pipe(
                    startWith(''),
                    map(value => {
                        return years.filter(it => it.name.toLowerCase()
                                            .indexOf((value+''||'').toLowerCase()) === 0)
                    }));
            }, err => {
                // TODO
            })
    }

    /**
     * Gets model information and emits the form data
     * @param brandId selected brandId
     * @param modelId selected modelId
     * @param yearId selected yearId
     */
    getVehicleInfo( brandId: string, modelId: string, yearId: string ){
        const apiInfo = {
            brandId,
            modelId,
            yearId
        }
        const valid = this.vehicleForm.valid

        if (!brandId || !modelId || !yearId ) return  


        this.vService.getVehicleInfo( brandId, modelId, yearId )
            .subscribe( info => {
                this.onChanges.emit({
                    valid,
                    value: {
                        ... info,
                        ... apiInfo
                    }
                })
            }, err => {
                /* In case of error (invalide model or network error) */
                const value = this.vehicleForm.value
                this.onChanges.emit({
                    valid,
                    value: {
                        brand: value.brand,
                        model: value.model,
                        year: value.year,
                        ... apiInfo
                    }
                })
            })
    }

    private _clearModel(){
        this.modelGroupOptions && this.vehicleForm.get('model').setValue('')
    } 
    private _clearYear() {
        this.yearOptions && this.vehicleForm.get('year').setValue('')
    }
    

    private _filterGroup(items: ItemGroup[], value: string): ItemGroup[] {
        if (value) 
            return items
                .map(group => ({ letter: group.letter, items: _filter(group.items, value) }))
                .filter(group => group.items.length > 0)

        return items;
    }

}
