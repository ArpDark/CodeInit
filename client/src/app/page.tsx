"use client";
import dotenv from "dotenv";
import { useEffect,useState,useRef,createContext } from "react";
import Dropdown from "@/components/Dropdown";
import CodeArea from "@/components/CodeArea";
import InputArea from "@/components/InputArea";
import { SourceCodeContext,StdinContext,CodeLangContext } from "@/components/MyContext";
import axios from "axios";
import Prism from "prismjs";
import "./prism-vsc-dark-plus.css";
import qs from "qs";
dotenv.config();

export default function Home() {


  // const [username, setUsername] = useState(``);
  const [codeLanguage, setCodeLanguage] = useState("C++");
  const [sourceCode, setSourceCode] = useState(``);
  const [stdin, setStdin] = useState(``);
  const [output, setOutput] = useState(``);

  const apiUrl=process.env.NEXT_PUBLIC_SERVER;
  
  // const apiUrl="http://localhost:8000";



  const handleSubmit=(e:any)=>{
    e.preventDefault();
    console.log(sourceCode);
    
    const data={
      lang:codeLanguage,
      stdin:stdin,
      code:sourceCode,
    }
    console.log(data);
    // console.log(apiUrl);

    const config = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      // url: "http://localhost:8000/submit"
      url: apiUrl+"/submit"
    };
    axios(config)
    .then((result)=>{
      console.log(result);
      setOutput(result.data);
    })
    .catch((err)=>{
      console.log(err);
    });
    

  }

  

  return (
    <div className='flex flex-col items-center max-w-screen bg-gradient-to-bl from-slate-500 via-white to-slate-300 overflow-y-auto border border-green-400  font-semibold'>
      <div className="font-mono text-3xl mt-4">
        C0deIn1t
      </div>
      <form className='flex flex-col w-full items-center border border-red-500 my-4 ' onSubmit={handleSubmit}>
        <div className="flex justify-around items-end  w-full">
          <CodeLangContext.Provider value={{codeLanguage,setCodeLanguage}}>
            <Dropdown/>
          </CodeLangContext.Provider>
          <button className=' w-fit h-fit shadow-md shadow-slate-400 hover:shadow-none bg-slate-700 px-4 py-2 hover:px-[0.95rem] hover:py-[0.45rem] text-white rounded-md  ' type="submit">Run</button>
          <div className="border-2 border-green-400 w-fit h-fit px-20 py-4"></div>
        </div>
        <div className=" flex flex-col lg:flex-row w-full lg:justify-around items-center ">
          
          <SourceCodeContext.Provider value={{sourceCode, setSourceCode}}>
            <CodeArea/>
          </SourceCodeContext.Provider>
          
          <StdinContext.Provider value={{stdin,setStdin}}>
            <InputArea/>
          </StdinContext.Provider>
        </div>
        <div className="flex flex-col ">
          <p className="">Result:</p>
          <div className="">
            {output}
          </div>
        </div>
      </form>
    </div>
  );
}
