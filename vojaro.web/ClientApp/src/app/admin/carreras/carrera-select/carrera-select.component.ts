import { AfterViewInit, Component, DoCheck, forwardRef, Injector, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { take } from 'rxjs';
import { Carrera, CarrerasService, Universidad } from 'src/app/api';

@Component({
  selector: 'app-carrera-select',
  templateUrl: './carrera-select.component.html',
  styleUrls: ['./carrera-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CarreraSelectComponent),
      multi: true
    }
  ]
})
export class CarreraSelectComponent implements OnInit, ControlValueAccessor, DoCheck, AfterViewInit {
  value!: Carrera;
  control!: NgControl;
  isDisabled!: boolean;
  @Input() mostrarOpcionTodos: boolean = true;
  @Input() universidad!: Universidad | undefined | null;

  data$: Carrera[] = []; 

  @ViewChild('input', { static: false, read: NgControl }) input: any;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(
    private injector: Injector,
    private service: CarrerasService,
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

  writeValue(value: Carrera): void {
    this.value = value;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.control = this.injector.get(NgControl);
    this.refreshData(false);
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

  compareSelectedValue(item: Carrera, value: Carrera) {
    return (!item || !value) ? false : item.id === value.id
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if(propName != 'mostrarOpcionTodos') {
        const changedProp = changes[propName];
        if (changedProp.isFirstChange()) {
          this.refreshData(false);
        } else {
          const from = JSON.stringify(changedProp.previousValue);
          const to = JSON.stringify(changedProp.currentValue);
          if(to != from) this.refreshData(true);
        }
      }
    }
  }

  private refreshData(refreshValue: boolean) {
    let universidadId = this.universidad && this.universidad["id"] ? this.universidad["id"] : null;
    if(universidadId) {
      this.service.getAllMini(universidadId)
      .pipe(take(1))
      .subscribe((data: Carrera[]) => {
        this.data$ = data;
        if (this.value && refreshValue) {
          this.value = data[0];
        }
      });
    } else {
      this.data$ = [];
    }
  }
}
