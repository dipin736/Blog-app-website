import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {
  emailAlreadyExists = false; // Add this property to track whether the email exists
  isSubscriber=false

  constructor(private subService: SubscribersService) {}

  async onSubmit(formVal: any) {
    console.log(formVal);
    const subData: any = {
      name: formVal.name,
      email: formVal.email
    };

    // Call the service method to check if the email already exists
    this.emailAlreadyExists = await this.subService.checkEmailExists(subData.email);
    
    if (!this.emailAlreadyExists) {
      // If email does not exist, add the subscriber
      this.subService.addSub(subData);
      this.isSubscriber=true

    }
  }
}
