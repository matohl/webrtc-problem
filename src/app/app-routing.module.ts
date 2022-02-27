import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeetingRoomComponent} from "./meeting-room/meeting-room.component";

const routes: Routes = [
  { path: '', component: MeetingRoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
