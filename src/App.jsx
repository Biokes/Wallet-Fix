// import { useState, useEffect } from "react";
// import abi from "../abi.json";
// import { ethers } from "ethers";
// import './app.css'
// import {ToastContainer , toast} from "react-toastify"; 
// const contractAddress = "0x9da4195efb3f0da96a22eef5e7a24cd71b968b2e";

// function App() {
//   const [text, setText] = useState("");
//   const [message, setMessage] = useState("");
//   const [hasMetaMask, setHasMetaMask] = useState(false);

// useEffect(() => {
//   if (window.ethereum) setHasMetaMask(true);
// }, []);
//   async function requestAccount() {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//   }

//   const handleSet = async () => {
//     try {
//       if (!text) {
//         toast("Please enter a message before setting.",{type:"info"});
//         return;
//       }

//       if (hasMetaMask) {
//         await requestAccount();
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const contract = new ethers.Contract(contractAddress, abi, signer);

//         const tx = await contract.setMessage(text); 
//         const txReceipt = await tx.wait();
//         console.log("Transaction successful:", txReceipt);
//         toast.
//         setText("")
//       } else {
//         console.error("MetaMask not found. Please install MetaMask to use this application.");
//         toast.error("Metamask not installed.")
//       }
//     } catch (error) {
//       console.error("Error setting message:", error);
//       toast.error("An error Occurred.")
//     }
//   };
    
//   const handleGet = async () => {
//     try {
//       if (!message && hasMetaMask) {
//         await requestAccount();
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const contract = new ethers.Contract(contractAddress, abi, signer);
//         const tx = await contract.getMessage();
//         setMessage(tx);
//       }
//     } catch (error) {
//       console.error("Error setting message:", error);
//       toast.error("An Error Occurred.");
//     }
//   }
//   return (
//     <div className="flex flex-col display-center items-center bg-gray-500 shadow-lg rounded p-4 shadow-md w-full max-w-[450px]">
//       <div style={{ padding: "2rem",display:`${message.length<0 ?"flex":"hidden" }`,flexDirection: "column", alignItems: "center", gap:"10px"}}>
//         <h5 className="text-[1rem] w-full text-center border-1 rounded border-gray-300 bg-gray-800 font-bold text-nowrap p-2" >Set Message on Smart Contract</h5>
//         <input
//           type="text"
//           placeholder="Set message"
//           value={text}
//           className="w-[90%] h-[70px] my-8 outline-0 border-[1px] border-gray-300 rounded p-2" 
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button onClick={handleSet}>Set Message</button>
//       </div>
//       <button onClick={handleGet} className={''}>Get Message</button>
//       <ToastContainer/>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import abi from "../abi.json";
import { ethers } from "ethers";
import './app.css'
import { ToastContainer, toast } from "react-toastify"; 

const contractAddress = "0x9da4195efb3f0da96a22eef5e7a24cd71b968b2e";

function App() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    if (window.ethereum) setHasMetaMask(true);
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const handleSet = async () => {
    try {
      if (!text) {
        toast("Please enter a message before setting.", { type: "info" });
        return;
      }

      if (hasMetaMask) {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.setMessage(text); 
        const txReceipt = await tx.wait();
        console.log("Transaction successful:", txReceipt);
        toast.success("Message successfully set.");
        setText("");
      } else {
        console.error("MetaMask not found. Please install MetaMask to use this application.");
        toast.error("Metamask not installed.");
      }
    } catch (error) {
      console.error("Error setting message:", error);
      toast.error("An error occurred.");
    }
  };

  const handleGet = async () => {
    try {
      if (hasMetaMask) {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.getMessage();
        setMessage(tx);
      }
    } catch (error) {
      console.error("Error getting message:", error);
      toast.error("An error occurred.");
    }
  }

  return (
    <div className="flex flex-col display-center items-center bg-gray-500 shadow-lg rounded p-4 shadow-md w-full max-w-[450px]">
      <div
        style={{
          padding: "2rem",
          display: !message ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <h5 className="text-[1rem] w-full text-center border-1 rounded border-gray-300 bg-gray-800 font-bold text-nowrap p-2">
          Set Message on Smart Contract
        </h5>
        <input
          type="text"
          placeholder="Set message"
          value={text}
          className="w-[90%] h-[70px] my-8 outline-0 border-[1px] border-gray-300 rounded p-2"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSet}>Set Message</button>
      </div>
      <button onClick={handleGet} className={''}>Get Message</button>
      <ToastContainer />
    </div>
  );
}

export default App;
