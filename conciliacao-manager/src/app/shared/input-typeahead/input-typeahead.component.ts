import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead';

@Component({
  selector: 'app-input-typeahead',
  templateUrl: './input-typeahead.component.html',
  styleUrls: ['./input-typeahead.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTypeaheadComponent),
      multi: true
    }
  ]
})
export class InputTypeaheadComponent implements OnInit, ControlValueAccessor {

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  @Input()
  model: any = '';
  @Input()
  search: any ;
  @Input()
  formatter: any;
  @Input()
  placeholder: string;
  @Output()
  onSelect: EventEmitter<NgbTypeaheadSelectItemEvent> = new EventEmitter<NgbTypeaheadSelectItemEvent>();

  onChangeFn: any;
  onTouchedFn: any;

  constructor() { }

  ngOnInit() {
  }

  onSelectItem($event) {
    this.onSelect.emit($event);
    if (this.onChangeFn) {
      this.onChangeFn($event.item);
    }
  }
  onBlur($event) {
    if (this.onTouchedFn) {
      this.onTouchedFn();
    }
  }

  clearValue() {
    this.model = null;
  }
  writeValue(obj: any): void {
    this.model = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
}
