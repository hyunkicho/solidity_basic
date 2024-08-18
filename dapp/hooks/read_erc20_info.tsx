import * as React from 'react';
import { useReadContract } from 'wagmi';
import { abi_erc20 } from '../src/abi';
import styles from '../styles/Home.module.css'; // Assuming styles are in Home.module.css

export function GetERC20Data({ contractAddress }: { contractAddress: any }) {
  const [name, setName] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [totalSupply, setTotalSupply] = React.useState('');
  const [owner, setOwner] = React.useState('');

  const nameData: any = useReadContract({
    address: contractAddress,
    abi: abi_erc20,
    functionName: 'name',
  });

  const symbolData: any = useReadContract({
    address: contractAddress,
    abi: abi_erc20,
    functionName: 'symbol',
  });

  const totalSupplyData: any = useReadContract({
    address: contractAddress,
    abi: abi_erc20,
    functionName: 'totalSupply',
  });


  const ownerData: any = useReadContract({
    address: contractAddress,
    abi: abi_erc20,
    functionName: 'owner',
  });

  const fetchTokenData = () => {
    nameData
    symbolData
    totalSupplyData
    ownerData
    if (nameData.data) setName(nameData.data as string);
    if (symbolData.data) setSymbol(symbolData.data as string);
    if (totalSupplyData.data) setTotalSupply(totalSupplyData.data?.toString() || '');
    if (ownerData.data) setOwner(ownerData.data as string);
  };

  return (
    <div>
      <button onClick={fetchTokenData} className={styles.submitButton}>
        Check Token Data
      </button>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" value={name} readOnly className={styles.input} />
      </div>
      <div>
        <label htmlFor="symbol">Symbol: </label>
        <input type="text" id="symbol" value={symbol} readOnly className={styles.input} />
      </div>
      <div>
        <label htmlFor="totalSupply">Total Supply: </label>
        <input type="text" id="totalSupply" value={totalSupply} readOnly className={styles.input} />
      </div>
      <div>
        <label htmlFor="owner">Owner: </label>
        <input type="text" id="owner" value={owner} readOnly className={styles.input} />
      </div>
    </div>
  );
}
