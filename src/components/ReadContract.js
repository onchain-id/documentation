import React from 'react';
import { ethers } from 'ethers';
import {useBlockchain} from "./BlockchainContext";

export default function ReadContract({ abi }) {
  const blockchain = useBlockchain();

  const [result, setResult] = React.useState({});
  const [parsedInterface, setParsedInterface] = React.useState(null);
  const [providerUrl, setProviderUrl] = React.useState('');
  const [contractAddress, setContractAddress] = React.useState('');
  const [args, setArgs] = React.useState({});

  React.useEffect(() => {
    const parsed = new ethers.utils.Interface([abi]);

    setParsedInterface(parsed);
  }, [abi]);

  React.useEffect(() => {
    setProviderUrl(blockchain.providerUrl);
    setContractAddress(blockchain.contractAddress);
  }, [blockchain.providerUrl, blockchain.contractAddress]);

  async function readContract(event) {
    event?.preventDefault();
    setResult(null);
    blockchain.setProviderUrl(providerUrl);
    blockchain.setContractAddress(contractAddress);

    try {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const contract = new ethers.Contract(contractAddress,[abi], provider);

      const res = await contract[parsedInterface.fragments[0].name](...Object.values(args));

      setResult({
        success: true,
        error: false,
        content: res,
      });
    } catch (error) {
      console.error(error);
      setResult({
        error: true,
        success: false,
        content: error,
      });
    }
  }

  return (
    <div style={{ border: '1px solid purple', borderRadius: '15px', padding: '10px'}}>
      <h2>Read Contract</h2>
      {parsedInterface ? (
        <form onSubmit={readContract} style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" placeholder="Provider URL" value={providerUrl} onChange={e => setProviderUrl(e.target.value)} style={{ padding: "4px", margin: '4px' }} />
          <input type="text" placeholder="Contract Address" value={contractAddress} onChange={e => setContractAddress(e.target.value)}  style={{ padding: "4px", margin: '4px' }} />

          {parsedInterface.fragments[0].inputs.map((input, index) => (
            <input key={index} type="text" placeholder={input.name} value={args[index]} onChange={e => setArgs({ ...args, [index]: e.target.value})}  style={{ padding: "4px", margin: '4px' }} />
          ))}

          <input type="submit" value="Read" style={{ padding: "4px", margin: '4px' }} />
        </form>
      ) : (
        <p>Loading interactive component...</p>
      )}

      <hr/>

      {result && result.error && (
        <p>{result.content.name}: {result.content.message}</p>
      )}
      {result && result.success && (
        <>
          {parsedInterface.fragments[0].outputs.map((output, index) => (
            <p key={index}>{output.name}: {result.content[index]}</p>
          ))}
        </>
      )}
    </div>
  );
}
