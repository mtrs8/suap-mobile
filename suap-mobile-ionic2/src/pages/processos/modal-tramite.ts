import { Component } from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'modal-tramite',
  templateUrl: 'modal-tramite.html'
})
export class DetalheTramiteModal {
    private tramite;
    
    constructor(
        private platform: Platform,
        private params: NavParams,
        private viewCtrl: ViewController
    ) {
        this.tramite = params.get('tramite');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}