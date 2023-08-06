import { Injectable } from '@angular/core';
import { getApp } from '@angular/fire/app';
import { Firestore, collection, query, where, collectionData, limit, orderBy, doc, getDoc, DocumentData, updateDoc, getFirestore,increment} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private firestore: Firestore) { }

  getDataFeatured(): Observable<any[]> {
    const postCollection = collection(this.firestore, 'posts');
    const q = query(postCollection, where('isFeatured', '==', true), limit(4)); // Add limit(4) to the query
    return collectionData(q, { idField: 'id' });
  }

  getDataLatest(): Observable<any[]> {
    const postCollection = collection(this.firestore, 'posts');
    const q = query(postCollection, orderBy('cretaedAt')); 
    return collectionData(q, { idField: 'id' });
  }

  loadCategoryPost(categoryId:any): Observable<any[]> {
    const postCollection = collection(this.firestore, 'posts');
    const q = query(postCollection, where('category.categoryId', '==', categoryId), limit(4)); // Add limit(4) to the query
    return collectionData(q, { idField: 'id' });
  }
  
  getPostDetails(postId: any): Observable<any> {
    const postDocRef = doc(this.firestore, 'posts', postId);
    return from(getDoc(postDocRef)).pipe(
      map((docSnap) => docSnap.data() as DocumentData)
    );
  }
  loadSimilar(catId:any){
    const postCollection = collection(this.firestore, 'posts');
    const q = query(postCollection, where('category.categoryId', '==', catId), limit(4)); // Add limit(4) to the query
    return collectionData(q, { idField: 'id' });
  }

  countViews(postId: any): void {
    const postDocRef = doc(this.firestore, 'posts', postId);
    const firestore = getFirestore(); // Get the actual Firestore instance
    updateDoc(postDocRef, {
      views: increment(1) // Use increment function from Firestore SDK
    });
  }

}
