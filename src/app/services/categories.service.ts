import { Injectable } from '@angular/core';
import {Firestore,collection,collectionData} from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore:Firestore) { }

  getData(): Observable<any[]> {
    const categoriesCollection = collection(this.firestore, 'categories');
    return collectionData(categoriesCollection, { idField: 'id' });
  }

}
