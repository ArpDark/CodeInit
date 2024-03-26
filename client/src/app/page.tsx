"use client";
import { useEffect,useState,useRef } from "react";
import Dropdown from "@/components/Dropdown";
import axios from "axios";
// import qs from "qs";

export default function Home() {

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const linenumRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("C++");
  const [stdin, setStdin] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [lineNumber, setLineNumber]=useState([1]);
  const [lineCounter, setLineCounter]=useState(1);
  const apiUrl=process.env.BACKEND_URL;

  useEffect(() => {
    const handleScroll = () => {
      if( textareaRef.current!=null && linenumRef.current)
        linenumRef.current.scrollTop = textareaRef.current.scrollTop;
    };

    // textareaRef.current?.addEventListener('scroll', handleScroll);
    textareaRef.current?.addEventListener('scroll', handleScroll);
    // return () => {
    //     textareaRef.current?.removeEventListener('scroll', handleScroll);
    // };
  }, []);

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    const data={
      user:username,
      lang:codeLanguage,
      stdin:stdin,
      code:sourceCode,
      date:new Date()
    }

  }

  const handleChange=(e:any)=>{
    setSourceCode(e.target.value);
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
    // console.log(sourceCode.at(sourceCode.length-1));
    // if(e.code==="Enter")
    // {
    //   setLineNumber([...lineNumber,lineCounter+1]);
    //   setLineCounter(lineCounter+1);
    // }
    if(e.code=="Tab")
    {
      e.preventDefault();
      console.log("Space 4 time");
      setSourceCode(sourceCode+"    ");
    }
    if(e.code == "Backspace")
    {
      if(sourceCode.at(sourceCode.length-1)=="\n")
      {
        setLineCounter(lineCounter-1);
        setLineNumber(lineNumber.slice(0,-1));
      }
      
    }
  }

  return (
    <div className='flex flex-col items-center max-w-screen bg-gradient-to-bl from-slate-500 via-white to-slate-300 overflow-y-auto border border-green-400  font-semibold'>
      <div className="font-mono text-3xl mt-4">
        C0deIn1t
      </div>
      <form className='flex flex-col w-full items-center border border-red-500 ' onSubmit={handleSubmit}>
        <Dropdown/>
        <div className=" flex flex-col lg:flex-row w-full lg:justify-around items-center ">
          <div className='flex flex-col w-7/12 mt-4'>
            <label htmlFor='code'>Source Code:</label>

            <div className="flex  rounded-sm p-5  h-96 text-white bg-slate-700 shadow-md shadow-gray-400">

              <div ref={linenumRef} className="border-2 border-red-500 h-64 overflow-y-auto ">
                {lineNumber.map((line) => (
                  <p key={"a"+line} >{line}. </p>
                ))}
              </div>
              <textarea ref={textareaRef}  name='code' onKeyDown={newLine} className=' resize-none max-h-max outline-none w-full h-64 border-2 border-yellow-300  bg-transparent ' value={sourceCode} onChange={handleChange} />
                
            </div>
          </div>

          <div className="flex flex-col w-6/12 lg:w-[20%] mt-4">
            <label htmlFor='input'>Standard Input (stdin):</label>
            <textarea value={stdin} className='outline-none overflow-x-auto resize-none h-72 text-white bg-slate-700 rounded-sm shadow-md shadow-gray-400 p-4' wrap="off" name='input' onChange={(e) => setStdin(e.target.value)} />
          </div>
        </div>
        <button className=' my-8 rounded-md border-2 text-white border-sky-500 text-lg bg-sky-800 w-fit px-5  py-2 ' type="submit">Submit</button>
      </form>
    </div>
  );
}
