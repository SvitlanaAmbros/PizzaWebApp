import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  @Output() public menuClick = new EventEmitter<void>();
  @Output() public aboutUsClick = new EventEmitter<void>();
  @Output() public contactsClick = new EventEmitter<void>(); 

  constructor() { }

  ngOnInit() {
  }

  public menuClicked() {
    this.menuClick.emit();
  }

  public aboutUsClicked(){
    this.aboutUsClick.emit();
  }

  public contactsClicked() {
    this.contactsClick.emit();
  }
}
