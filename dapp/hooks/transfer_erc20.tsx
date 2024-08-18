import * as React from 'react';
import { useWriteContract } from 'wagmi';
import { abi_erc20 } from '../src/abi';
import styles from '../styles/Home.module.css';

export function TransferERC20({ contractAddress }: { contractAddress: any }) {

  // Function to transfer tokens
  const { writeContract } = useWriteContract();

  async function transferToken(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const toAddress = formData.get('to') as `0x${string}`;
    const amount = formData.get('amount') as string;

    try {
      const tx = await writeContract({
        address: contractAddress,
        abi: abi_erc20,
        functionName: 'transfer',
        args: [toAddress, BigInt(amount)],
      });
      console.error("tx >>", tx);

    } catch (err) {
      console.error("Error >>", err);
      alert(`err : ${err}`);
    }
  }

  return (        
  <form onSubmit={transferToken} className={styles.form}>
    <div>
      <label htmlFor="to">Recipient Address:</label>
      <input
        type="text"
        id="to"
        name="to"
        placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        required
        className={styles.input}
      />
    </div>
    <div>
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="1"
        required
        className={styles.input}
      />
    </div>
    <button type="submit" className={styles.submitButton}>Transfer Tokens</button>
  </form>
  );
}
