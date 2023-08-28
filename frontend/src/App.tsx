import React, {useEffect, useState} from 'react';
import './App.css';
import { Types, AptosClient } from 'aptos';

const gameAddress = '0x61315d864828f1508e77744a0f05c26bb10dafbe8a669b894eefb2114016e7f6'

function App() {
  // Retrieve aptos.account on initial render and store it.
  const [address, setAddress] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [tokenAmount, setTokenAmount] = useState<string>('0');
  const [cardName, setCardName] = useState<string>('');
  const [cardDescription, setCardDescription] = useState<string>('');

  /**
   * 
   * init function
   */
  const init = async() => {
    // connect
    try {
    if (window && (!window.martian)) {
      console.log('Martian not found')
      return { aptos: [], sui: [] };
    }

    const data = await window.martian.connect();

    const { result } = data;
    const address = result.aptos[0].address;
    const publicKey = result.aptos[0].publicKey;
    setAddress(address);
    setPublicKey(publicKey);
  } catch (e) {
    console.log(e);
  }
  }
  
  useEffect(() => {
     init();
  }, []);

  const mintToken = async(amount: string) => {
    const payload = {
      function: `${gameAddress}::game::mint_token`,
      type_arguments: [],
      arguments: [amount],
    }
    console.log(payload);

    const result = await window.martian.generateSignAndSubmitTransaction(address, payload);
    console.log(result);
  }

  const mintCard = async(name: string, description: string) => {
    const payload = {
      function: `${gameAddress}::game::mint_card`,
      type_arguments: [],
      arguments: [name, description],
    }
    console.log(payload);

    const result = await window.martian.generateSignAndSubmitTransaction(address, payload);
    console.log(result);
  }

  return (
    <div className="App">
      <p className="wallet">Account Address: 0xfafa364c5a5552de36ca20b94efed1914b17cdcca8f8227c47057a285ce5d7e6 <code>{ address }</code></p>
      <p className="wallet">Account Public Key: 0x2e37601fceafb383c499ba63912ae4ebc8bc1774db6788443b884bee25f122eb <code>{ publicKey }</code></p>
      <input className="main" type="text" id="tokenAmount" placeholder="Token Amount" value={tokenAmount} onChange={(v) => setTokenAmount(v.target.value)}/>
      <button className='button' onClick={() => mintToken(tokenAmount)}> Click to Mint Tokens! </button>
      <input className="main" type="text" id="cardName" placeholder="Card Name" value={cardName} onChange={(v) => setCardName(v.target.value)}/>
      <input className="main" type="text" id="cardDescription" placeholder="Card Description" value={cardDescription} onChange={(v) => setCardDescription(v.target.value)}/>
      <button className='button' onClick={() => mintCard(cardName, cardDescription)}> Click to Mint Card! </button>
    </div>
  );
}

export default App;
