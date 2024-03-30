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

        <div className="flex flex-col rounded-sm w-6/12 lg:w-[20%] mt-4  bg-slate-700 shadow-md shadow-gray-400">
            <label className="text-white mx-5 mt-2" htmlFor='input'>Input</label>
            
            <div className="flex ml-2 mr-5 mb-5 mt-2 h-72 border-2 border-slate-600 rounded-sm ">
                <div ref={linenumRef} className=" o-scrollbar bg-slate-800 px-1.5 py-2 text-gray-300/90 overflow-y-auto ">
                    {lineNumber.map((line) => (
                        <p key={"a"+line} >{line} </p>
                        ))}
                </div>
                <textarea ref={textareaRef} value={stdin} className='resize-none  max-h-max outline-none w-full h-full pl-1 py-2 rounded-sm text-white whitespace-nowrap text bg-transparent ' wrap="off" name='input' onChange={handleChange} />
            </div>
        </div>

    );

}