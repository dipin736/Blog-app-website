import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  constructor(private firestore: Firestore) {}

  async addSub(subData: any) {
    const email = subData.email; // Assuming the email is in the 'email' property of the 'subData' object
    const subscribersCollection = collection(this.firestore, 'subscribers');

    // Query to check if the email already exists in the collection
    const q = query(subscribersCollection, where('email', '==', email));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        console.error('Email already exists. Only one email can be used to subscribe.');
        return true; // Email already exists
      }

      await addDoc(subscribersCollection, subData);
      console.log('Subscriber saved successfully');
      return false; // Email does not exist, subscriber added successfully
    } catch (err) {
      console.error('Error adding subscriber: ', err);
      return false; // Error occurred while adding subscriber
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const subscribersCollection = collection(this.firestore, 'subscribers');

    // Query to check if the email exists in the collection
    const q = query(subscribersCollection, where('email', '==', email));

    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.size > 0;
    
      // Return true if email exists, false otherwise
    } catch (err) {
      console.error('Error checking email existence: ', err);
      return false; // Error occurred while checking email existence
    }
  }
}
