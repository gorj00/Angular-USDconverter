import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() languagePicked = new EventEmitter<string>();

  constructor() { }

  onLanguagePick(lang: string) {
    this.languagePicked.emit(lang);
  }

  ngOnInit() {
  }

}
