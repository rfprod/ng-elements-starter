import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { ChatWidgetComponent } from './chat-widget.component';
import { ChatConfigComponent } from '../chat-config/chat-config.component';
import { ChatInputComponent } from '../chat-input/chat-input.component.js';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component.js';

describe('ChatWidgetComponent', () => {

  let component: ChatWidgetComponent;
  let fixture: ComponentFixture<ChatWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, CustomMaterialModule, FlexLayoutModule
      ],
      declarations: [
        ChatWidgetComponent, ChatConfigComponent, ChatInputComponent, ChatAvatarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
