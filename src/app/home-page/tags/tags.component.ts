import { Component, Input, OnInit } from '@angular/core';
import { Tags } from 'src/app/shared/models/tags-interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() tag!: Tags;

  constructor() {}

  ngOnInit(): void {}
}
