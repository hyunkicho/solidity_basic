# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

# 실행순서 

1. npm install
2. npx hardhat compile
3. npx hardhat run scripts/0.deployStorage.js --network wemixTestnet

# 테스트 코드 작성 시에 사용가능한 모듈

1. 테스트 코드 커버리지 체크
```
npx hardhat coverage
```
결과 값
```
--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
 contracts/   |      100 |      100 |      100 |      100 |                |
  Storage.sol |      100 |      100 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|
All files     |      100 |      100 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|
```

2. gas calculator

```
REPORT_GAS=true npx hardhat test
```

결과 값
```
·-----------------------|---------------------------|----------------|-----------------------------·
|  Solc version: 0.8.0  ·  Optimizer enabled: true  ·  Runs: 100000  ·  Block limit: 30000000 gas  │
························|···························|················|······························
|  Methods                                                                                         │
·············|··········|·············|·············|················|···············|··············
|  Contract  ·  Method  ·  Min        ·  Max        ·  Avg           ·  # calls      ·  usd (avg)  │
·············|··········|·············|·············|················|···············|··············
|  Storage   ·  store   ·      26428  ·      43528  ·         34978  ·            8  ·          -  │
·············|··········|·············|·············|················|···············|··············
|  Deployments          ·                                            ·  % of limit   ·             │
························|·············|·············|················|···············|··············
|  Storage              ·          -  ·          -  ·         95545  ·        0.3 %  ·          -  │
·-----------------------|-------------|-------------|----------------|---------------|-------------·
```

3. 그 외에 사용가능한 모듈

UML 생성
```
https://www.npmjs.com/package/sol2uml
```

설치
```
npm i sol2uml
npm install -g sol2uml
```

사용
```
sol2uml contracts/
```
