import axios from 'axios';

export class BicicletaService {
    baseUrl = "http://localhost:3001/bicicleta/api/";

/*     getAll() {
        return axios.get(this.baseUrl + "all").then(res => { 
            console.log(res);
        });
    } */

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }


    save(bicicleta) {
        return axios.post(this.baseUrl + "save", bicicleta).then(res => res.data);
    }


    delete(id) {
        return axios.post(this.baseUrl + "delete/"+id, null).then(res => res.data);
    }
}
