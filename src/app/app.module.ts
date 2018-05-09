import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { APP_BASE_HREF } from '@angular/common';
import { EventService } from './service/event.service';
import { DialogModule } from 'primeng/components/dialog/dialog';
// import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScheduleModule,
    DialogModule,
   // InputTextModule,
    FormsModule,
    CalendarModule,
    CheckboxModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
