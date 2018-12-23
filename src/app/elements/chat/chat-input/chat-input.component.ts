import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';

/**
 * @title Chat input component
 */
@Component({
  selector: 'chat-input',
  template: `
    <textarea type="text" class="chat-input-text" placeholder="Type message..."
              #message (keydown.enter)="onSubmit()" (keyup.enter)="message.value = ''" (keyup.escape)="dismiss.emit()"></textarea>
    <button type="submit" class="chat-input-submit" (click)="onSubmit()">
      {{buttonText}}
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat-input.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class ChatInputComponent implements OnInit {

  @Input() public buttonText = '↩︎';

  @Input() public focus = new EventEmitter();

  @Output() public send = new EventEmitter();

  @Output() public dismiss = new EventEmitter();

  @ViewChild('message') message: ElementRef;

  public focusMessage() {
    this.message.nativeElement.focus();
  }

  public getMessage() {
    return this.message.nativeElement.value;
  }

  public clearMessage() {
    this.message.nativeElement.value = '';
  }

  onSubmit() {
    const message = this.getMessage();
    if (message.trim() === '') {
      return;
    }
    this.send.emit({ message });
    this.clearMessage();
    this.focusMessage();
  }

  ngOnInit() {
    this.focus.subscribe(() => this.focusMessage());
  }

}
