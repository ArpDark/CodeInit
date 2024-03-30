"use client"
import { useEffect, useState, useRef ,useContext } from "react";
import { SourceCodeContext } from "./MyContext";
import { FaCode } from "react-icons/fa";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
// import { obsidian,nightOwl, qtcreatorDark, paraisoDark, xcode, } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { vsDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
        <div className='flex flex-col rounded-sm w-7/12 my-4 bg-slate-700 shadow-md shadow-gray-400'>
            <label className="flex items-center justify-between w-16 mx-5 mt-2 text-white" htmlFor='code'><FaCode/>Code</label>
            <div className="flex ml-2 mr-5 mb-5 mt-2 h-96 border-2 border-slate-600 rounded-sm ">

              <div ref={linenumRef} className=" no-scrollbar bg-slate-800 px-1.5 py-2 text-gray-300/90 overflow-y-auto ">
                {lineNumber.map((line) => (
                  <p key={"a"+line} >{line}</p>
                ))}
              </div>

              {/* <div className="flex w-full h-full border-2 border-green-400 ">
                
              <div className=" z-10 relative w-full h-full">
                <SyntaxHighlighter  language="c" style={vscDarkPlus}>
                  {sourceCode}
              </SyntaxHighlighter>
              </div>
                <textarea  ref={textareaRef} onKeyDown={newLine}   name='code' className=' border-2 border-blue-500 absolute z-20 caret-black  text-transparent resize-none outline-none pl-1 py-2 whitespace-nowrap h rounded-sm text-white  bg-transparent ' value={sourceCode} onChange={handleChange} />
              </div> */}
              <textarea  ref={textareaRef} onKeyDown={newLine}   name='code' className='h-full w-full resize-none outline-none pl-1 py-2 whitespace-nowrap h rounded-sm text-white  bg-transparent ' value={sourceCode} onChange={handleChange} />
          </div>
        </div>
    );
}