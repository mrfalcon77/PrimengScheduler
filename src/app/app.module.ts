import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
// import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AbmSharedModule } from '../../shared';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/components/button/button';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { EventService } from './service/event.service';



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
    CheckboxModule,
    ButtonModule,
    TooltipModule,
    FormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
