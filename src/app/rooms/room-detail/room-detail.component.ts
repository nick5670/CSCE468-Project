import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room!: Room;
  action!: string;

  details = new Array<string>();
  roomForm!: FormGroup;
  
  constructor(private router: Router, private route: ActivatedRoute,
              private modalService: NgbModal, private builder: FormBuilder) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(

      (params) =>{
        this.action = params['action'];
        
      }
    )


    this.roomForm = this.builder.group({
      bookerName : "Please enter your name",
      numOccupants : 0,
      startTime : '',
      endTime : ''
    })
  }

  roomBooked()
  {
    this.router.navigate(['rooms'], {queryParams: {action: 'book',id: this.room.id}})
  }

  roomInfo()
  {
    this.router.navigate(['rooms'], {queryParams : {action: 'info', id: this.room.id}})
  }

  open(content: any)
  {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmit()
  {
    this.details.push(this.roomForm.value['bookerName']);
    this.details.push(this.roomForm.value['numOccupants']);
    this.details.push(this.roomForm.value['startTime']);
    this.details.push(this.roomForm.value['endTime']);

    this.room.bookedRoomDetails= this.details;
    this.room.isOpen= false;

    this.modalService.dismissAll('Saved change');
  }
}
