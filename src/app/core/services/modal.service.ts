import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { uniqueId } from 'lodash';

export interface ModalData {
  id: string;
  component: any;
  data?: any;
  resolve?: (value: any) => void;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly modals = signal<ModalData[]>([]);

  getModals() {
    return this.modals();
  }

  open<T>(component: any, data?: any): Promise<T> {
    return new Promise<T>((resolve) => {
      this.modals.update((modals) => [
        ...modals,
        { id: uniqueId('modal-'), component, data, resolve },
      ]);
    });
  }

  close(id: string, value?: any) {
    const modalToClose = this.modals().find((modal) => modal.id === id);
    if (modalToClose?.resolve) {
      modalToClose.resolve(value);
    }
    this.modals.update((modals) => modals.filter((modal) => modal.id !== id));
  }

  closeAll() {
    this.modals.set([]);
  }
}
