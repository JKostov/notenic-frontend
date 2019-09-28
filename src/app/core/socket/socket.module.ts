import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';



@NgModule({
  imports: [
    CommonModule,
    SocketIoModule,
  ]
})
export class SocketModule { }
