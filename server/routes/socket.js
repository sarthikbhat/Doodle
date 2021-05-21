const Document = require('../models/document')

const socks = socket=>{
    
    socket.on('get-document',async docId=>{
        const document = await findOrCreateDoc(docId)
        socket.join(docId)
        socket.emit('load-document',document.data)
        socket.emit('load-name',document.name)
        socket.on('send-changes',delta=>{
            socket.broadcast.to(docId).emit("receive-changes",delta)
        })
        socket.on('change-name',async name=>{
            await Document.findByIdAndUpdate(docId,{name})
            socket.broadcast.to(docId).emit("receive-name",name)
        })
        socket.on("save-doc",async data=>{
            await Document.findByIdAndUpdate(docId,{data})
        })
    })
}


async function findOrCreateDoc(id){
    if(id==null) return
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({_id:id,data:'',name:'Untitled Document'})
}




module.exports = socks;