import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container">
      @for (toast of toastSvc.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type" (click)="toastSvc.remove(toast.id)">
          <span class="toast-icon">
            @if (toast.type === 'success') {
              ✓
            } @else if (toast.type === 'error') {
              ✕
            } @else {
              ℹ
            }
          </span>
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .toast {
        padding: 0.9rem 1.4rem;
        border-radius: 12px;
        font-weight: 500;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        animation: slideIn 0.3s ease;
        cursor: pointer;
        min-width: 240px;
      }
      .toast-success {
        background: rgba(34, 197, 94, 0.15);
        border: 1px solid rgba(34, 197, 94, 0.4);
        color: #22c55e;
      }
      .toast-error {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.4);
        color: #ef4444;
      }
      .toast-info {
        background: rgba(108, 99, 255, 0.15);
        border: 1px solid rgba(108, 99, 255, 0.4);
        color: #a78bfa;
      }
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class ToastComponent {
  toastSvc = inject(ToastService);
}
