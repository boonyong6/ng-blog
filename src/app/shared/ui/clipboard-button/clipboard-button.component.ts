import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-clipboard-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './clipboard-button.component.html',
  styleUrl: './clipboard-button.component.css',
})
export class ClipboardButtonComponent implements OnDestroy {
  private destroyed = new Subject<void>();
  isCopied = false;

  onClick() {
    this.isCopied = true;

    timer(2000)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.isCopied = false;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
