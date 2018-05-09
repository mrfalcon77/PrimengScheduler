import { Component } from '@angular/core';
import { EventService } from './service/event.service';
import {MyEvent} from './event/event';

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
	console.log('LOADING ' +  event.view.start);
        // In real time the service call filtered based on start and end dates
        this.eventService.getEvents().subscribe((events: any) => {this.events = events.data; this.events.forEach(function(e){console.log(e)});});
	
    }
    handleDayClick(event: any) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
    }

    handleEventClick(e: any) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        const start = e.calEvent.start;
        const end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        // update
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