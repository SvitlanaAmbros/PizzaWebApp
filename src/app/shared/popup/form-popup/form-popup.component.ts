import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent implements OnInit, OnDestroy {
  // public generatedId: string = this.popupService.generateId();

  @Input() public position?: string;
  @Input() public header: string;
  @Input() public buttonAction: string;
  @Input() public buttonCancel: string;

  public config = {
    position: 'center-center' || 'center-top'
  };

  constructor(private popupService: PopupService) { }

  ngOnInit() {
    this.initConfig();
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  private initConfig() {
    
    this.config = {
      position: this.position || 'center-center'
    }

  }


}
