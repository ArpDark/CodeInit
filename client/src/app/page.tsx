"use client";
import dotenv from "dotenv";
import { useEffect,useState,useRef,createContext } from "react";
import Dropdown from "@/components/Dropdown";
import CodeArea from "@/components/CodeArea";
import InputArea from "@/components/InputArea";
import { SourceCodeContext,StdinContext,CodeLangContext } from "@/components/MyContext";
import axios from "axios";
// import DOMPurify from 'dompurify';
// import Prism from "prismjs";
// import "./prism-vsc-dark-plus.css";
import CircularProgress from '@mui/material/CircularProgress';
import qs from "qs";
dotenv.config();

export default function Home() {


  // const [username, setUsername] = useState(``);
  const [codeLanguage, setCodeLanguage] = useState("C");
  const [sourceCode, setSourceCode] = useState(``);
  const [stdin, setStdin] = useState(``);
  const [output, setOutput] = useState(``);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const apiUrl=process.env.NEXT_PUBLIC_SERVER;
  // const sanitizer = DOMPurify.sanitize();




  const handleSubmit=(e:any)=>{
    e.preventDefault();
    setLoading(true);
    setClicked(true);
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
      url: apiUrl+"/submit"
    };
    axios(config)
    .then((result)=>{
      console.log(result);
      let x=result.data;
      setOutput(x.toString());
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const setNewline=(text:string)=>{
    console.log(typeof(text));
    return text.replace(/\n/g, "<br>");
  }
  // return text.split("\n").join("<br />");

  return (
    <div className='flex flex-col items-center max-w-screen bg-gradient-to-bl from-slate-500 via-white to-slate-300 overflow-y-auto font-medium'>
      <div className="font-mono text-3xl mt-4">
        C0deIn1t
      </div>
      <form className='flex flex-col w-full items-center my-4 ' onSubmit={handleSubmit}>
        <div className="flex justify-around items-end  w-full">
          <CodeLangContext.Provider value={{codeLanguage,setCodeLanguage}}>
            <Dropdown/>
          </CodeLangContext.Provider>
          <button className=' w-fit h-fit shadow-md shadow-slate-400 hover:shadow-none bg-slate-700 px-4 py-2 hover:px-[0.95rem] hover:py-[0.45rem] text-white rounded-md  ' type="submit">Run</button>
          <div className="w-fit h-fit px-20 py-4"></div>
        </div>
        <div className=" flex flex-col lg:flex-row w-full lg:justify-around items-center ">
          
          <SourceCodeContext.Provider value={{sourceCode, setSourceCode}}>
            <CodeArea/>
          </SourceCodeContext.Provider>
          
          <StdinContext.Provider value={{stdin,setStdin}}>
            <InputArea/>
          </StdinContext.Provider>
        </div>

        <div className={`flex flex-col w-[40%] p-5 rounded-sm h-72 bg-slate-700 items-center  ${clicked? '':'hidden'}`} >
          <p className=" mb-2 text-white self-start">Output</p>
        {loading?(
          <div className={`${loading?'':'hidden'}`}>
            <CircularProgress color="inherit" size={"2rem"}/>
          </div>
        ):(

            <div className="w-full h-full px-1 py-2 rounded-sm border-2 border-slate-600 whitespace-nowrap overflow-auto text-white " dangerouslySetInnerHTML={{__html: setNewline(output)}} />
            )
          } 
        </div>

      </form>
    </div>
  );
}
