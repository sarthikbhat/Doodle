import { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import { toolbarOptions } from '../constants/toolbarOptions'
import Header from './Header'
import { useParams } from 'react-router-dom';

export default function Document({socket}) {
  const { id: docId } = useParams()
  const [quill, setQuill] = useState();
  
  useEffect(() => {
    if (quill == null || socket == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit('get-document', docId)
  }, [socket, quill, docId])

  useEffect(() => {
    if (quill == null || socket == null) return
    const handleChange = (delta, oldDelta, source) => {
      if (source !== 'user') return
      socket.emit('send-changes', delta)
      socket.emit('save-doc', quill.getContents())
    }
    quill.on('text-change', handleChange)
    return () => {
      quill.off('text-change', handleChange)
    }
  }, [socket, quill])

  useEffect(() => {
    if (quill == null || socket == null) return
    const handleChange = (changes) => {
      quill.updateContents(changes)
    }
    socket.on('receive-changes', handleChange)
    return () => {
      socket.off('receive-changes', handleChange)
    }
  }, [socket, quill])

  const ediRef = useCallback((wrapper) => {
    if (wrapper == null) return
    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor, { theme: 'snow', modules: { toolbar: toolbarOptions } })
//     q.disable()
//     q.setText('Please wait while we set up !!')
    q.formatLine(4, 4, 'align', 'center'); 
    setQuill(q);
  }, [])

  return (
    <>
     <Header socket={socket} />
    <div ref={ediRef} className="container">
      
    </div>
</>
  )
}
