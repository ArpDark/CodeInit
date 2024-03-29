"use client"
import { useEffect, useState, useRef ,useContext } from "react";
import { SourceCodeContext } from "./MyContext";

export default function CodeArea(){

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const linenumRef = useRef<HTMLDivElement>(null);
    const {sourceCode, setSourceCode} = useContext(SourceCodeContext);
    const [lineNumber, setLineNumber]=useState([1]);
    useEffect(() => {
        const handleScroll = () => {
          if( textareaRef.current!=null && linenumRef.current)
            linenumRef.current.scrollTop = textareaRef.current.scrollTop;
        };
        const handleScroll2 = () => {
          if( linenumRef.current!=null && textareaRef.current)
            textareaRef.current.scrollTop = linenumRef.current.scrollTop;
        };
        textareaRef.current?.addEventListener('scroll', handleScroll);
        linenumRef.current?.addEventListener('scroll', handleScroll2);
      }, []);

    function handleChange(e: any) {
    setSourceCode(e.target.value);
    const str = e.target.value;
    let index = str.indexOf("\n");
    let c = 0;
    while (index !== -1) {
      c++;
      index = str.indexOf("\n", index + 1);
    }

    let arr: any[0] = [1];
    let a;
    for (a = 1; a <= c; a++) {
      arr[a] = a + 1;
    }
    setLineNumber(arr);
  }

      const newLine=(e:any)=>{
        if(e.code=="Tab")
        {
          e.preventDefault();
          const { selectionStart, selectionEnd } = e.target;
          const newCode = sourceCode.substring(0, selectionStart) + '    ' + sourceCode.substring(selectionEnd);
          setSourceCode(newCode);
          if(textareaRef.current)
          {
            textareaRef.current.value=newCode;
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd =selectionStart + 4;
          }
        }
      }

    return (
        <div className='flex flex-col w-7/12 mt-4'>
            <label htmlFor='code'>Source Code:</label>

            <div className="flex  rounded-sm p-5  h-96 bg-slate-700 shadow-md shadow-gray-400">

              <div ref={linenumRef} className=" no-scrollbar text-gray-200/90 pr-1 curs border-2 border-red-500 overflow-y-auto ">
                {lineNumber.map((line) => (
                  <p key={"a"+line} >{line} </p>
                ))}
              </div>
              <textarea ref={textareaRef} onKeyDown={newLine}   name='code' className='  resize-none  max-h-max outline-none w-full h-full rounded-sm text-white border-2 border-yellow-300  bg-transparent ' value={sourceCode} onChange={handleChange} />
          </div>
        </div>
    );
}