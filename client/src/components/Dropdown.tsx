"use client"

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Dropdown(){

    const [codeLanguage,setCodeLanguage]=useState("C++");

    return(
        <div className=' flex w-full mt-4'>
            <div className='flex flex-col ml-28 '>
                <label htmlFor='codeLang'> Preferred Code Language:</label>
                <DropdownMenu >
                    <DropdownMenuTrigger className="flex justify-around bg-slate-700 w-40 hover:cursor-pointer rounded-sm  p-1 text-lg font-medium text-white">
                        <p className="">{codeLanguage}</p>
                        <KeyboardArrowDownIcon/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" border-1 border-slate-700 rounded-none w-40 bg-slate-700 text-white -mt-3">
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("C++")}} textValue="C++"  className=" text-lg font-medium" >C++</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("Java")}} textValue="Java"  className=" text-lg font-medium" >Java</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("JavaScript")}} textValue="JavaScript"  className=" text-lg font-medium" >JavaScript</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("Python")}} textValue="Python"  className=" text-lg font-medium" >Python</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
    
}