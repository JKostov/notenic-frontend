import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { NotenicModule } from '@notenic/notenic.module';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'environments/environment';

const config: SocketIoConfig = { url: environment.notificationsUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SocketIoModule.forRoot(config),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          headerIds: true,
          smartypants: true,
          tables: true,
        }
      }
    }),
    SharedModule,
    NotenicModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
