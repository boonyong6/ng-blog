import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { timer } from 'rxjs';

@Component({
  selector: 'app-clipboard-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './clipboard-button.component.html',
  styleUrl: './clipboard-button.component.css',
})
export class ClipboardButtonComponent {
  isCopied = false;

  constructor(private destroyRef: DestroyRef) {}

  onClick() {
    this.isCopied = true;

    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isCopied = false;
      });
  }
}
