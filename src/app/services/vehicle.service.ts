import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface APIResponse {
    nome: string,
    codigo: string
    modelos?: string
}
export interface ItemGroup {
    letter: string,
    items: Item[]
}
export interface Item {
    name: string,
    code: string
}


@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private api = 'https://parallelum.com.br/fipe/api/v1/carros'

    constructor(private http: HttpClient) { }
    getBrands(): Observable<ItemGroup[]> {
        return this.http.get<ItemGroup[]>(`${this.api}/marcas`)
            .pipe(
                map( (data: any[]) => {
                    return this.formatItems(data)
                })
            )
    }

    private formatItems(data: APIResponse[] ): ItemGroup[] {
        let tempItemNames: Item[] = []
        let tempLetter = data[0].nome.substr(0, 1)
        let itemsFormated: ItemGroup[] = []


        data.forEach((item: { nome: string, codigo: string }, index) => {
            item.nome = item.nome.toUpperCase()
            if (!item.nome.startsWith(tempLetter)) {
                itemsFormated.push({
                    letter: tempLetter,
                    items: tempItemNames
                })
                tempItemNames = []
                tempLetter = item.nome.substr(0, 1)
            }
            
            this._addItem(item, tempItemNames)

            if (index === data.length-1){
                itemsFormated.push({
                    letter: tempLetter,
                    items: tempItemNames
                })
            }
        })
        return itemsFormated
    }

    private _addItem = (item, arr: any[]) => arr.push({
        name: item.nome,
        code: item.codigo
    })

    getVehicleModels( brandId: string ): Observable<ItemGroup[]> {
        return this.http.get(`${this.api}/marcas/${brandId}/modelos`)
            .pipe(
                map((data: any) => {
                    return this.formatItems(data.modelos)
                })
            )
    }
    
    getModelYears( brandId: string, modelId: string ): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.api}/marcas/${brandId}/modelos/${modelId}/anos`)
            .pipe(
                map((data: any) => {
                    return data.map( (it:APIResponse) => ({ name: it.nome, code: it.codigo }) )
                })
            )
    }

    getVehicleInfo(  brandId: string, modelId: string, yearId: string ): Observable<any> {
        return this.http
            .get<any>(`${this.api}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`)
            .pipe( map( data => {
                return {
                    price: data.Valor,
                    brand: data.Marca,
                    model: data.Modelo,
                    year: data.AnoModelo,
                    modelYear: data.AnoModelo+' '+data.Combustivel,
                    fuel: data.Combustivel,
                    refMonth: data.MesReferencia,
                    vehicleType: data.TipoVeiculo,
                    shortFuelName: data.SiglaCombustivel
                }
            }))
    }

}
