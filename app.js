const app=require('express')();
const server=require('http').Server(app);
const io=require('socket.io')(server);

const PORT=process.env.port || 3000;

server.listen(PORT,()=>{
    console.log('Server running at',PORT);
})

io.on('connection',(socket)=>{
    let room=''
    socket.on('join',(room)=>{
        socket.join(room);
        io.in(room).emit('message',{"message": `A user joined in ${room} room `})
    })

    socket.on('message',(data)=>{
        console.log('message logged!!');
        io.in(data.room).emit('message',data);
    })
    socket.on('disconnect',()=>{
        console.log('a user disconnected');
        io.emit('message',{"message":"A user disconnected"})
    })
})
