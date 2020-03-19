import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cmd-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  header {
    background-color: var(--primary);
    height: 33vh;
    clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0% 70%, 0 0);
  }
`]
})
export class LayoutComponent {}
