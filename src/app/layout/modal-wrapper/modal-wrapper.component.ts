import { Component, Injector, OnInit, ViewContainerRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { ModalData, ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-modal-wrapper',
  template: `
    @for (modal of modals(); track modal.id) {
      <dialog id="{{modal.id}}" class="modal" [open]="modal.id">
        <ng-container #container></ng-container>
      </dialog>
    }
  `,
  styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent {
  container = viewChild('container', { read: ViewContainerRef });
  modals = computed(() => this.modalService.getModals());

  modalService = inject(ModalService);
  injector = inject(Injector);

  constructor() {
    effect(() => {
      this.modals().forEach((modal) => {
        const componentRef = this.container()?.createComponent<any>(modal.component, { injector: this.injector });
        
        if (componentRef) {
          Object.assign(componentRef.instance, {
            ...modal.data,
            close: (value?: any) => this.modalService.close(modal.id, value),
          });
          
          componentRef.changeDetectorRef.detectChanges();
        }
      });
    });
  }

  close(id: string) {
    this.modalService.close(id);
  }
}
