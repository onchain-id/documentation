import React from 'react';

export const BlockchainContext = React.createContext();

export function BlockchainContextProvider({ children }) {
  const [providerUrl, setProviderUrl] = React.useState('');
  const [contractAddress, setContractAddress] = React.useState('');

  const value = {
    providerUrl,
    setProviderUrl,
    contractAddress,
    setContractAddress,
  };
  return (
    <BlockchainContext.Provider value={value}>{children}</BlockchainContext.Provider>
  );
}

export const useBlockchain = () => React.useContext(BlockchainContext);
