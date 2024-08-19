import * as React from 'react';
import { useState } from 'react';
import { useWatchContractEvent } from 'wagmi';
import { abi_erc20 } from '../src/abi';
import styles from '../styles/Home.module.css';

export function TransferEventERC20({ contractAddress }: { contractAddress: any }) {
  const [logs, setLogs] = useState<any[]>([]);

  useWatchContractEvent({
    address: contractAddress,
    abi: abi_erc20,
    batch: true, 
    eventName: 'Transfer',
    onLogs(newLogs: any) {
      console.log('New logs!', newLogs);
      
      setLogs((prevLogs) => {
        // Filter out logs that are already in the state based on transactionHash
        const filteredLogs = newLogs.filter(
          (newLog: any) =>
            !prevLogs.some((prevLog) => prevLog.transactionHash === newLog.transactionHash)
        );
        
        // Append the filtered new logs to the existing logs
        return [...prevLogs, ...filteredLogs];
      });
    },
    pollingInterval: 10_000, 
  });

  return (
    <div className={styles.eventsContainer}>
      <h3>Transfer Events</h3>
      <ul className={styles.eventList}>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <li key={index} className={styles.eventItem}>
              <p><strong>From:</strong> {log.args._from}</p>
              <p><strong>To:</strong> {log.args._to}</p>
              <p><strong>Amount:</strong> {log.args._value.toString()}</p>
              <p><strong>TxHash:</strong> {log.transactionHash}</p>
            </li>
          ))
        ) : (
          <p>No Transfer events detected yet.</p>
        )}
      </ul>
    </div>
  );
}
