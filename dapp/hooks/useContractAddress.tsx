import { useState } from 'react';
import styles from '../styles/Home.module.css';

export function useContractAddress(initialAddress: `0x${string}` | '' = '') {
  const [contractAddress, setContractAddress] = useState<`0x${string}` | ''>(initialAddress);

  const handleContractAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractAddress(e.target.value as `0x${string}`);
  };

  const ContractAddressInput = (
    <div className={styles.contractAddressInput}>
      <label htmlFor="contractAddress">Contract Address:</label>
      <input
        type="text"
        id="contractAddress"
        value={contractAddress}
        onChange={handleContractAddressChange}
        placeholder="0xYourContractAddress"
        className={styles.input}
      />
    </div>
  );

  return {
    contractAddress,
    ContractAddressInput,
  };
}
