import { Component, Input } from '@angular/core';

/**
 * @title Chat avatar component
 */
@Component({
  selector: 'chat-avatar',
  template: `
    <img [attr.src]="image" class="avatar" />
  `,
  styles: [`
    .avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  `],
  host: {
    class: 'mat-body-1'
  }
})
export class ChatAvatarComponent {

  @Input() public image: string;

}
