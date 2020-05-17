import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cmd-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      b {
        color: var(--primary);
      }

      a {
        color: var(--dark);
      }
    `,
  ],
})
export class ContactComponent {}
