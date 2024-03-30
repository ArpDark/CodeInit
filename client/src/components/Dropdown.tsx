"use client"

import { useState,useContext } from "react";
import { CodeLangContext } from "./MyContext";
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

    const {codeLanguage,setCodeLanguage}=useContext(CodeLangContext);

    return(
        <div className=' flex w-fit mt-4'>
            <div className='flex flex-col '>
                <DropdownMenu >
                    <DropdownMenuTrigger className="flex justify-around bg-slate-700 w-32 hover:cursor-pointer rounded-sm  p-1 text-lg font-medium text-white">
                        <p className="w-24">{codeLanguage}</p>
                        <KeyboardArrowDownIcon/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" shadow-md shadow-gray-800 border-1 border-slate-700 rounded-none w-32 h-fit bg-slate-700/90 text-white ">
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("C")}} textValue="C"  className=" text-lg cursor-pointer focus:bg-slate-800  font-medium" >C</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("C++")}} textValue="C++"  className=" text-lg cursor-pointer focus:bg-slate-800  font-medium" >C++</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("Java")}} textValue="Java"  className=" text-lg cursor-pointer focus:bg-slate-800 font-medium" >Java</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("JavaScript")}} textValue="JavaScript"  className=" text-lg cursor-pointer focus:bg-slate-800 font-medium" >JavaScript</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setCodeLanguage("Python")}} textValue="Python"  className=" text-lg cursor-pointer focus:bg-slate-800 font-medium" >Python</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
    
}