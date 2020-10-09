import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {DragDropModule} from 'primeng/dragdrop';
import {DragDropModule as AngularDrag} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    DragDropModule,
    AngularDrag
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
