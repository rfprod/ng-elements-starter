import { animate, style, transition, trigger } from '@angular/animations';
import { ETIMEOUT } from 'src/app/utils';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [style({ opacity: 0 }), animate(ETIMEOUT.SHORTEST)]),
  transition('* => void', [
    animate(
      ETIMEOUT.SHORTEST,
      style({
        opacity: 0,
      }),
    ),
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [style({ opacity: 0 }), animate(ETIMEOUT.SHORTER)]),
  transition(':leave', [style({ opacity: 0 }), animate(1)]),
]);
