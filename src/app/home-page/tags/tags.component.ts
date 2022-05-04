import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tags } from 'src/app/shared/models/tags-interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() tag!: Tags;
  @Output() sendTag = new EventEmitter();
  tagName!: string;

  constructor() {}

  ngOnInit(): void {}

  public clickTag(tag: any) {
    this.tagName = tag;
    this.sendTag.emit(this.tagName);
  }
}
