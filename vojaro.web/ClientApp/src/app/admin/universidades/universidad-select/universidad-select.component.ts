import { AfterViewInit, Component, DoCheck, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { Universidad, UniversidadesService } from 'src/app/api';

@Component({
  selector: 'app-universidad-select',
  templateUrl: './universidad-select.component.html',
  styleUrls: ['./universidad-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UniversidadSelectComponent),
      multi: true
    }
  ]
})
export class UniversidadSelectComponent implements OnInit, ControlValueAccessor, DoCheck, AfterViewInit {
  value!: Universidad;
  control!: NgControl;
  isDisabled!: boolean;
  @Input() mostrarOpcionTodos: boolean = true;

  data$: Observable<Universidad[]> = this.service.getAllMini();

  @ViewChild('input', { static: false, read: NgControl }) input: any;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(
    private injector: Injector,
    private service: UniversidadesService,
  ) { }

  ngDoCheck(): void {
    if (this.input && this.control) {
      if (this.control.touched) {
        this.input.control.markAsTouched();
      } else {
        this.input.control.markAsUntouched();
      }
    }
  }

  ngAfterViewInit() {
    if (this.control != null) {
      this.input.control.setValidators(this.control.control?.validator);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: Universidad): void {
    this.value = value;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.control = this.injector.get(NgControl);
  }

  onModelChange(_event: any) {
    this.notifyValueChange();
  }

  notifyValueChange() {
    if (this.onChange) {
      this.onChange(this.value);
    }

    if (this.onTouch) {
      this.onTouch();
    }
  }

  compareSelectedValue(item: Universidad, value: Universidad) {
    return (!item || !value) ? false : item.id === value.id
  }
}

