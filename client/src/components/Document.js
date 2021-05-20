import { useCallback } from 'react'
import Quill from 'quill'
import { toolbarOptions } from '../constants/toolbarOptions'

export default function Document() {
    
    const ediRef =  useCallback((wrapper) => {
        if (wrapper==null) return
        wrapper.innerHTML=''
        const editor = document.createElement('div')
        wrapper.append(editor)
        new Quill(editor,{theme:'snow',modules:{toolbar:toolbarOptions}})
    }, [])

    return (  
      <div ref={ediRef} className="container">
        
      </div>
    )
}
