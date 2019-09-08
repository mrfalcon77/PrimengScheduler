import { Component,
         OnInit,
         OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription ,  Observable ,  Subject } from 'rxjs';

import { MyEvent } from './event/event';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { EventService } from './service/event.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  events: any[];
  event: MyEvent;
  header: any;
  dialogVisible = false;
  idGen = 100;
  datePipe: DatePipe;

  constructor(private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvents().subscribe((events: any) => {this.events = events.data; });
        
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
	
    }
    loadEvents(event: any) {
        const start = event.view.start;
        const end = event.view.end;
        console.log(event.view.name);
	console.log('LOADING ' +  event.view.start + ' and ' + event.view.end);
	console.log('LOADING formatted ' +  event.view.start.format() + ' and ' + event.view.end.format());
	console.log('Moment ' +  moment(event.view.start) + ' and ' + moment(event.view.start).startOf('month'));
	if(moment(event.view.start).isSame(moment(event.view.start).startOf('month'))) {
		console.log('First day');
		console.log(moment(event.view.start).format('YYYY-MM'));
	} else {
		console.log('Last day');
		console.log(moment(event.view.start).endOf('month').add(1,'days').format('YYYY-MM'));
	}
        // In real time the service call filtered based on start and end dates
        this.eventService.getEvents().subscribe((events: any) => {this.events = events.data; this.events.forEach(function(e){console.log(e)});});
	
    }
    handleDayClick(event: any) {
        this.event = new MyEvent();
        let start: Date;
        if (event.view.name === 'month') {
            start = event.date;
            // start.setDate(12);
            let today = moment(event.date);
	    let tomorrow = moment(today).add(8, 'hours'); // startOf('hour');
            console.log('Month! ' + event.date.format());
            console.log('Month2! ' + JSON.stringify(start));
            console.log('Month3! ' + JSON.stringify(today));
            console.log('Month4! ' + JSON.stringify(tomorrow));
            this.event.start = tomorrow.toDate();
        } else {
            console.log('Daily! ' + event.date.format());        
        }
        this.dialogVisible = true;
    }

    handleEventClick(e: any) {
	console.log('I am here');
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        const start = new DatePipe('en-US')
                            .transform(e.calEvent.start, 'yyyy-MM-dd HH:mm');
        const end = new DatePipe('en-US')
                            .transform(e.calEvent.end, 'yyyy-MM-dd HH:mm');
	console.log('start ' + e.calEvent.start);
	console.log('end ' + e.calEvent.end);
	console.log('e.view.name = '+ e.view.name);
	// console.log(start.format('YYYY-MM-DD hh:mm'));
	console.log('Aft ' + start);
	console.log('START l ' + this.event.start);
        if (e.view.name === 'month') {
           // start.stripTime();
        }

        if (end) {
            // end.stripTime();
           // this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        // this.event.start = start.format();
	this.event.start = new Date(e.calEvent.start);
	this.event.end = new Date(e.calEvent.end);
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        // update
	console.log('SAVING');
	console.log(this.event.start);
        if ( this.event.id) {
            const index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        } else {
            this.event.id = this.idGen++;
            this.events.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        const index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
}