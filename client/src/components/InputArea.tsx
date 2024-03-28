"use client";

import { useEffect, useState, useRef ,useContext } from "react";
import { StdinContext } from "./MyContext";


export default function InputArea(){

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const linenumRef = useRef<HTMLDivElement>(null);
    const {stdin, setStdin} = useContext(StdinContext);
    const [lineNumber, setLineNumber]=useState([1]);
    const [lineCounter, setLineCounter]=useState(1);

    useEffect(() => {
        const handleScroll = () => {
          if( textareaRef.current!=null && linenumRef.current)
            linenumRef.current.scrollTop = textareaRef.current.scrollTop;
        };
        const handleScroll2 = () => {
          if( linenumRef.current!=null && textareaRef.current)
            textareaRef.current.scrollTop = linenumRef.current.scrollTop;
        };
    
        // textareaRef.current?.addEventListener('scroll', handleScroll);
        textareaRef.current?.addEventListener('scroll', handleScroll);
        linenumRef.current?.addEventListener('scroll', handleScroll2);
        // return () => {
        //     textareaRef.current?.removeEventListener('scroll', handleScroll);
        // };
      }, []);

      const handleChange=(e:any)=>{
        setStdin(e.target.value);
        const str=e.target.value;
        let index = str.indexOf("\n");
        let c=0;
        while (index !== -1) {
          c++;
          index = str.indexOf("\n", index + 1);
        }
        console.log(c);
        
        let arr: any[0]=[1];
        let a;
        for(a=1;a<=c;a++)
        {
          arr[a]=a+1;
        }
        setLineNumber(arr);
        setLineCounter(c);
      }
      const newLine=(e:any)=>{
        if(e.code=="Tab")
        {
          e.preventDefault();
          // console.log("Space 4 time");
          setStdin(stdin+"    ");
        }
      }

    return(

        <div className="flex flex-col w-6/12 lg:w-[20%] mt-4">
            <label htmlFor='input'>Standard Input (stdin):</label>
            
            <div className="flex  rounded-sm p-5  h-72 bg-slate-700 shadow-md shadow-gray-400">
                <div ref={linenumRef} className=" no-scrollbar text-gray-200/90 pr-1 curs border-2 border-red-500 overflow-y-auto ">
                    {lineNumber.map((line) => (
                        <p key={"a"+line} >{line} </p>
                        ))}
                </div>
                <textarea ref={textareaRef} value={stdin} className='resize-none  max-h-max outline-none w-full h-full rounded-sm text-white border-2 border-yellow-300  bg-transparent ' wrap="off" name='input' onChange={handleChange} />
            </div>
        </div>

    );

}