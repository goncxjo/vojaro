import { AfterViewInit, Component, DoCheck, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { Departamento, UniversidadesService } from 'src/app/api';

@Component({
  selector: 'app-departamento-select',
  templateUrl: './departamento-select.component.html',
  styleUrls: ['./departamento-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DepartamentoSelectComponent),
      multi: true
    }
  ]
})
export class DepartamentoSelectComponent implements OnInit, ControlValueAccessor, DoCheck, AfterViewInit {
  value!: Departamento;
  control!: NgControl;
  isDisabled!: boolean;
  @Input() mostrarOpcionTodos: boolean = true;

  data$: Observable<Departamento[]> = this.service.getAllMiniDepartamentos();

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

  writeValue(value: Departamento): void {
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

  compareSelectedValue(item: Departamento, value: Departamento) {
    return (!item || !value) ? false : item.id === value.id
  }
}

