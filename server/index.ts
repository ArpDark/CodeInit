import express,{Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const app = express();
const port = process.env.PORT||8000;

app.get('/', (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');
});

app.post("/submit",async(req,res)=>{
  console.log(req.body.user);
  console.log(req.body.lang);
  console.log(req.body.stdin);
  console.log(req.body.code);
  console.log(req.body.date);
  const buffer = Buffer.from(req.body.code);
  const code = buffer.toString('base64');

  const buffer2 = Buffer.from(req.body.stdin);
  const stdin = buffer2.toString('base64');
  let langId=54;
  if(req.body.lang=="C++") langId=54;
  if(req.body.lang=="Java") langId=62;
  if(req.body.lang=="JavaScript") langId=63;
  if(req.body.lang=="Python") langId=71;
  let x="";
  const options = {
      // c++ id:54
      //  java id: 62
      //  JS id: 63
      //  py id: 71
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        wait: 'true',
        fields: '*',
      },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
        'X-RapidAPI-Host': process.env.X_RapidAPI_Host
      },
      data: {
        language_id: langId,
        source_code: code,
        stdin: stdin
      }
  };
    
  try {
      const response = await axios.request(options);
      console.log(response.data);
      const buffer= Buffer.from(response.data.stdout, 'base64');
      console.log(buffer.toString());
      x=buffer.toString();
      res.send(x);
  } catch (error) {
      console.error(error);
  }
  
  
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});