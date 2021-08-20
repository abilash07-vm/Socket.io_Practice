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
  messages:string[]=[]
  val!:string
  ngOnInit(): void {
    this.socket.on('message',(data)=>{
      this.messages.push(data.message)
    })
    this.socket.emit('reply',{
      "message": "wooow connected!!!"
    })
  }
  onSend(){
    if(this.val && this.val.length>0){
      this.socket.emit('message',{"message": this.val})
      this.val=''
    }else{
      console.log('message is empty');
      
    }
  }
  
}
