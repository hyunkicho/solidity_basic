import * as React from 'react';
import { useReadContract } from 'wagmi';
import { abi_erc20 } from '../src/abi';
import styles from '../styles/Home.module.css'; // Assuming styles are in Home.module.css

export function GetBalanceOf({ contractAddress }: { contractAddress: any }) {
  const [account, setAccount] = React.useState<any>('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  const [balance, setBalance] = React.useState<bigint>(BigInt(0));

  const { data, refetch, error } = useReadContract({
    address: contractAddress,
    abi: abi_erc20,
    functionName: 'balanceOf',
    args: [account],
  });

  React.useEffect(() => {
    console.log("account >>", account);
    console.log("data >>", data);
    if (data!=undefined) {
      setBalance(BigInt(data.toString()));
    } else if (error) {
      console.error("Failed to fetch balance or account address is invalid.", error);
    }
  }, [data, error]);

  const checkBalanceOf = () => {
    // 최신 입력값으로 상태를 업데이트하고 나서 refetch를 호출합니다.
    refetch();
  };

  return (
    <div>
      <div>
        <label htmlFor="account">Account: </label>
        <input
          type="text"
          id="account"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value); // 상태 업데이트
          }}
          className={styles.input}
          placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        />
      </div>
      <button onClick={checkBalanceOf} className={styles.submitButton}>
        Check Balance
      </button>
        <div>
          <p>Balance: {balance.toString()}</p>
        </div>
    </div>
  );
}
