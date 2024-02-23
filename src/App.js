import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";


function App() {

  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState([]);

  const getLang = async () => {

    const res = await axios("https://libretranslate.com/languages");

    console.log(res);
    setOptions(res.data);

  }

  const translate = async () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    const res = await axios.post('https://libretranslate.de/translate',params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log(res);
    setOutput(res.data.translatedText);
  }

  useEffect(()=>{
    getLang();
  },[]);

  return (
    <div className=" min-h-screen bg-gray-200 w-screen cursor-pointer">

      <h1 className=" text-center text-2xl pt-5 hover:underline">
        Language Translator
      </h1>

      <div className=" w-full p-10 pt-5">


        <div className=" flex items-center justify-between">

          <div className="">
            From:
            <select onChange={(e) => {
              setFrom(e.target.value);
            }}
            value={from}
            className=" min-w-[30%] p-1 mr-3 rounded-md ml-1">
              {
                options.map((opt) => (
                  <option value={opt.code}>
                    {opt.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="">
            To:
            <select
            onChange={(e) => {
              setTo(e.target.value);
            }}
            value={to}
            className="min-w-[30%] p-1 rounded-md ml-1">
              {
                options.map((opt) => (
                  <option value={opt.code}>
                    {opt.name}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        <div className=" mt-3 w-full">
          <textarea cols="50" rows="10"
          onInput={(e) => {
            setInput(e.target.value)
          }}
          className="w-full p-2 rounded-md"
          placeholder="Enter Input"
          value={input}></textarea>
        </div>

        <div className=" mt-3 w-full">
          <textarea cols="50" rows="10"
          value={output}
          className="w-full p-2 rounded-md" 
          placeholder="Output"></textarea>
        </div>

        <div className="">
          <button onClick={() => {
            translate();
          }}
          className=" p-1 mt-2 w-full bg-blue-400 hover:bg-blue-500 rounded-md text-white">
            Translate
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
