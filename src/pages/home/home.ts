import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactlist = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public platform: Platform, public contacts: Contacts) {
    this.platform.ready().then(() => {
      this.contacts.find(['displayName','emails'], {filter: "", multiple: true}).then((contacts) => {
      for(let i = 0; i < contacts.length; i++){
        let contact=contacts[i];
        if(contact.emails != null){
          this.contactlist.push(contact);
        }
      }
        console.log('Contacts'+this.contactlist);
      }, (error) => {
        console.log(error);
      })
   })
  }

  doCheckbox() {  
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Contacts To Send Invitation');
    for(let contact of this.contactlist){
        alert.addInput({
        type: 'checkbox',
        label: contact.displayName,
        value: contact.emails
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Submit',
      handler: (data: any) => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }
}
