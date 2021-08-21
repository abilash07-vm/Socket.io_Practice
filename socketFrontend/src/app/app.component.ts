import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  socket=io('http://localhost:3000',{
    transports: ['websocket','polling']
  });
  room:string=''
  messages:string[]=[]
  val!:string
  ngOnInit(): void {
    this.socket.on('connection',()=>{
      this.socket.emit('join',this.room);
    })
    this.socket.on('message',(data)=>{
      this.messages.push(data.message)
    })

  }
  onConnectRoom(name:string){
    this.messages=[]
    this.room=name
    this.socket.emit('join',name);
    console.log(name);
  }
  onSend(){
    if(this.val && this.val.length>0){
      this.socket.emit('message',{"message": this.val,room:this.room})
      this.val=''
    }else{
      console.log('message is empty');
    }
  }
  
}
