import { Params } from '@angular/router';

export interface INoteRouteParams extends Params {
  user: string;
  note: string;
}
