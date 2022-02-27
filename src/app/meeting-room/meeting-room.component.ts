import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { createCall, SlCall } from 'sl_rtc';
import {CallEndReason, PCState} from "sl_rtc/src/call/interface";


@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent implements OnInit {

  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then((local_stream: MediaStream) => {
        console.log( 'video=' + this.myVideo );
        this.myStarLeafCall(local_stream);
      });
  }

  myStarLeafCall(local_stream: MediaStream) {
    createCall('acme@example.com', 'My Name')
      .then((call: SlCall) => {
        console.log( 'in then after createCall() : call =   ' + call );
        // add event handlers

        this.myVideo.nativeElement.srcObject = local_stream;

        call.on('ringing', () => {
          console.log('ringing...');
        });
        call.on('in_call', () => {
          console.log('in call ...');
        });
        call.on('renegotiated', () => {
          console.log('renegotiated');
        });
        call.on('audio_only', (is_audio_only: boolean) => {
          console.log('is_audio_only: ' + is_audio_only);
        });
        call.on('remove_stream', (stream: MediaStream) => {
          console.log('remove stream');
        });
        call.on('pc_state', (pc_state: PCState) => {
          console.log('pc_state = ', pc_state);
        });
        call.on('ending', () => {
          console.log('');
        });
        call.on('ended', (reason: CallEndReason) => {
          console.log('ended, reason = ' + reason);
        });


        call.on('add_stream', (remoteStream: MediaStream) => {
          console.log('got remoteStream = ' + remoteStream);
          this.remoteVideo.nativeElement.srcObject = remoteStream;
          this.remoteVideo.nativeElement.play();
        })

        // Start the call`
        call.dial(local_stream);
        console.log('dial called!');
      });
  }


}
