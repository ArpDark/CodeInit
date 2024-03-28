import React,{ createContext } from 'react';

interface SourceCodeContextType {
    sourceCode: string;
    setSourceCode: React.Dispatch<React.SetStateAction<string>>;
  }
interface StdinContextType {
    stdin: string;
    setStdin: React.Dispatch<React.SetStateAction<string>>;
  }
interface CodeLangContextType {
    codeLanguage: string;
    setCodeLanguage: React.Dispatch<React.SetStateAction<string>>;
  }

// export const SourceCodeContext = createContext({});
export const SourceCodeContext = createContext<SourceCodeContextType>({
    sourceCode: '',
    setSourceCode: () => {}, // Placeholder function
  });
export const StdinContext = createContext<StdinContextType>({
    stdin: '',
    setStdin: () => {}, // Placeholder function
  });
export const CodeLangContext = createContext<CodeLangContextType>({
    codeLanguage: '',
    setCodeLanguage: () => {}, // Placeholder function
  });