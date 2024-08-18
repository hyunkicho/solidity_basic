# solidity_basic
basic practice for solidity
Solidity 코드를 작성하기 위해서 기본적인 문법을 공부하고 넘어가도록 하겠습니다.

# 컨트렉트의 구조

컨트렉트에서 선언할 수 있는 값들은 무엇이 있을까요? 선언할 수 있는 요소들을 먼저 살펴보도록 하겠습니다.

먼저 기본적으로 contract를 선언해주는 부분이 가장 우선시 된다고 볼 수 있습니다. 컨트렉트를 선언할 때는 다음과 같이 선언하면 됩니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract example {

}
```

이렇게 아무것도 추가하지 않더라도 컨트렉트를 선언하기만 하면 배포가 가능합니다. 그럼 이 안에 들어갈 수 있는 요소들은 무엇이 있을까요? 하나씩 살펴보도록 하겠습니다.

## 상태변수

먼저 상태 변수에 대해 알아야 합니다. Solidity에서는 자료형을 앞에 표시한 후 뒤에 변수명을 정의합니다. 예시를 보도록 하겠습니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

위의 코드에서 storedData의 경우 숫자형을 나타내는 변수입니다. uint는 숫자를 나타내는 자료형으로 uint256과 같은 의미인데 뒤에 해당 변수의 저장공간을 나타내는 256이 생략되어 있다고 보시면 되겠습니다. 이렇게 변수를 선언하고 해당 값을 변화시키면 블록체인의 모든 장부에서 해당 값이 업데이트 되게 됩니다. 이러한 변화를 상태변화라고 부르며 이렇게 정의된 값들을 상태 변수(State variable)이라고 부릅니다. 다른 코드에서 변수를 정의하는 것과 별반 다를 것이 없지만 이더리움에서의 상태변수를 선언하고 값을 대입하는 행위는 그만큼 가스비용을 지불해야 하기 때문에 상태변화가 많으면 좋지 않다고 볼 수 있습니다.

## 함수

Solidity에서는 함수를 아래와 같이 이용합니다. 함수의 경우 컨트렉트 안에서 주로 작성되지만 밖에서 정의되어도 사용이 가능합니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;

contract SimpleAuction {
    function bid() public payable { // Function
        // ...
    }
}

// Helper function defined outside of a contract
function helper(uint x) pure returns (uint) {
    return x * 2;
}
```

함수를 부르는 행위 (Function calls)의 경우 내부호출(internal call)과 외부호출(external call) 두 종류가 모두 가능합니다. 또한 다른 컨트렉트와 상호작용을 할 수 있는지에 대한 여부를 가시성(Visibility)로 지정해 둡니다. 함수는 입력값을 받아온 후 결과값을 리턴하는 형태로 사용됩니다. 그렇다면 이에 대해 조금 더 자세히 알아보고 넘어가도록 하겠습니다.

### 가시성

앞으로 우리가 볼 함수와 변수 앞에는 public, external, internal, private와 같은 visibility를 설정해 주어야 합니다. 어떠한 설정도 하지 않는다면 기본적으로 internal로 설정이 되게 되지만, Public을 사용하게 되면 contract의 내부, 외부에서 모두 사용할 수 있게 됩니다. 모든 참여자가 볼 수 있게 설정된 값입니다. external은 public과 동일하지만 this를 사용하지 않으면 컨트랙트 내에서 호출할 수 없습니다. 반면 internal은 Contract내부 또는 그 Contract를 상속받는 Contract에서만 사용할 수 있습니다. 외부의 참여자들이 보는 정보 값이 아닌 내부적인 계산을 할 때 사용되는 값이 이에 해당됩니다. 다음으로 private가 있습니다. 이는 상속한 Contract에서도 사용할 수 없고 해당 Contract안에서만 사용이 가능하게 됩니다.

### 저장위치

선언된 변수들은 2개의 저장공간에 나누어서 저장됩니다. 이 2개의 저장공간은 각각 Memory와 Storage라고 불립니다. Storage는 영구적으로 블록체인에 저장시켜 두고 사용할 변수이고 Memory는 함수의 input, output 등의 일시적으로 저장되는 변수들이 저장되는 공간입니다. 따로 memory나 storage 표기를 해주지 않는다면 함수의 input, output값은 memory 나머지 값들은 storage에 저장된다고 보시면 되겠습니다.

https://lh3.googleusercontent.com/I-kMvn1trRtYuvMnXtUPqWfln_zWoobBcGw6ut042M3natFyx1ghGONQ_aoyd9fQGCO_gv0NroTUxGagjCEEsTWYTzsaWV9H1ug-t5fLC6ffjbC2TqFKnYFmhw6_DOFc098uhV0

Storage는 Key Value 형식으로 저장되어 있기 때문에 한번 정의해두면 예를 들어 string public TokenName 을 선언하고 TokenName = “Hyunki”이라고 정의해두면 TokenName이라는 key값과 Hyunki 이라는 문자열이 value값이 저장되어 함수가 실행된 이후에도 불러올 수 있습니다. 그러나 모든 데이터들을 storage에 저장시킨다면 나중에 모든 결과값을 불러올 수 있지만 저장에 gas 비용이 너무 많이 든다는 단점이 있습니다. 서비스를 기획하는 입장에서 수수료가 많이 발생하는 것은 매우 치명적이기 때문에 Storage를 너무 많이 사용하면 안됩니다. 따라서 함수에서 한번 실행하고 저장하지 않을 정보들은 memory라는 저장공간을 사용하게 됩니다. Memory에 저장된 데이터들은 한번의 call이 끝나면 (한번의 함수 실행이 끝나면) 휘발성으로 지워지게 됩니다. 대신 Storage에 저장시키는것보다 gas비용이 훨씬 적게 듭니다. 그러나 Memory는 많이 사용하게 되면 그에 비례하여 더 많은 gas비용이 청구되게 되므로 call을 여러 번으로 나누어서 gas 비용을 분산시키는 것이 더 유용합니다. 마지막으로 Stack이라는 공간이 있는데 이더리움에서 코드를 실행하는 EVM은 명령어를 Stack에 쌓아둔 상태로 실행하기 때문에 stack이라는 저장공간을 가지고 있습니다. 실제 코드를 구현할 대는 Strorage 와 Memory의 차이점을 이해하고 최대한 gas비용이 적게 작성하도록 하는 것이 중요합니다.

### 함수의 기본 구성

이제 위에서 정리한 내용을 바탕으로 함수의 기본 구성에 대하여 알아보도록 하겠습니다.

```jsx
function <함수이름>( ) {public|private|internal|external} { }
```

다음과 같이 function example( ) public { }; 이런 식으로 만든다면 example이라는 이름의 함수가 나오게 됩니다.

```jsx
function <함수이름>(<parameter>) {public|private|internal|external} { }
```

( ) 안에는 함수의 입력값(parameter)가 들어오게 됩니다. 예를 들어 function add( uint a, uint b) { return a+b }; 와 같은 함수를 만들게 되면 a와 b를 더하는 기능을 하는 함수가 나오게 됩니다.

```jsx
function <함수이름>(<parameter>) {public|private|internal|external} [pure|view|payable]{ }
```

가시성을 나타낸 이후에는 함수의 동작에 영향을 주는 키워드가 들어갈 수 있습니다. pure의 경우에는 storage를 사용하지 않는 함수입니다. 따라서 상태변화를 일으키지 않고 gas비용도 들지 않게 됩니다. view의 경우에는 pure와 마찬가지로 함수를 변경하지 않는 함수로 조회를 하는 경우에 주로 사용합니다. 여기서는 public을 이용하여 변수를 선언하였지만 실제로는 private으로 변수를 선언하고 view를 사용하여 정보를 조회하는 식으로 많이 쓰입니다. payable의 경우에는 이더리움을 입금 받을 수 있는 함수입니다. 만약 스마트컨트렉트의 CA에서 이더리움을 받아서 관리하고 싶으면 이더리움을 받아올 역할을 하는 함수에 payable을 명시해 주어야 합니다.

**virtual & override**

```jsx
function <함수이름>(<parameter>) {public|private|internal|external} [pure|view|payable] [virtual] [override] { }
```

0.6 버전이 업데이트되게 되면서 새로 virtual과 override에 대한 개념이 들어오게 되었습니다. 간단하게 설명하자면 다른 곳에서 불러와서 한번 더 쓰는 함수인 modifier나 library이외에 정의한 함수를 다른 곳에서 불러와서 변경해서 쓰려면(오버라이딩을 하려면) virtual이라는 값을 써주어야 합니다. 정의해둔 함수를 다른 곳에서 상속받거나 가져와서 사용할 때 변경을 해준다면 override를 명시해 두어야 합니다. 물론 vitrual이 정의되어 있지 않은 함수는 override를 사용할 수 없습니다. 낮은 버전에서는 쓰이지 않지만 해당 교재에서는 계속해서 언급이 될 내용이므로 익숙해지시게 될겁니다.

## 제한자(Modefier)

스마트컨트렉트에서는 반복되는 조건을 선언해놓고 불러오는 문법을 종종 사용합니다. 이때 사용되는 것이 바로 제한자(Modefier) 입니다. 아래의 코드를 보면 onlySeller라는 제한자를 정의해 두었습니다. 이렇게 제한자가 정의가 된다면 안에 있는 require 문이 그 뒤의 코드가 실행되기 전에 먼저 실행된 후에 뒤의 코드가 실행되게 됩니다. 따라서 msg.sender 즉 메세지를 보내는 주체가 seller로 등록되지 않은 주체라면 해당 조건문이 함수의 시작과 함께 발동하여서 함수가 실행되지 않게 됩니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Purchase {
    address public seller;

    modifier onlySeller() { // Modifier
        require(
            msg.sender == seller,
            "Only seller can call this."
        );
        _;
    }

    function abort() public view onlySeller { // Modifier usage
        // ...
    }
}
```

제한자를 사용하실 때 특히 주의하셔야 하는 점은 마지막에 _; 를 추가해야 한다는 점입니다. 제한자의 경우 들어가는 부분에서 require 문과 같이 조건을 주어서 제한하는 부분이 통과하게 되면 빠져나가서 뒤의 코드를 이어서 실행시켜주어야 합니다. 이때 _; 가 빠져나가는 명령어에 해당되는 부분으로 마지막에 넣어주어야 에러가 나지 않습니다. 한번만 쓰이는 제한자의 경우 굳이 제한자를 생성하여 사용할 필요가 없지만 계속해서 조건 검사가 반복되는 경우에는 자주 사용하게 됩니다. 앞으로 살펴볼 코드에서 자주 등장할 onlyOwner와 같이 관리자 권한을 설정하는데 특히 많이 사용되는것을 볼 수 있습니다.

## 이벤트

이전에 스토리지와 메모리지에 대해 학습하며, 스토리지에 데이터를 저장하면 영구적으로 기록되면서 가스비가 많이 소모되기 때문에 단기적으로 저장하려는 경우 메모리에 담아야 한다고 배웠습니다. 하지만 가스 연산이 크지 않으면서도 해당 상태에서 이벤트 로그를 남겨서 데이터의 상태를 기록하는 이벤트 문법이 있습니다.

이벤트는 EVM에 로그를 남기는 기능으로서 이벤트를 사용하는 경우 상태변화를 일으키지 않아 가스비 소모가 적게 들기 때문에 가능한 상태 변수를 통해 기록을 남기기 보다는 이벤트를 사용할 수 있다면 이벤트를 사용하는 것이 선호됩니다. 다만, 해당 이벤트는 특정 블록에서만 기록되어 있기 때문에 불러와서 스토리지와 같이 저장해 놓았다가 다시 꺼내서 연산에 사용될 수 없습니다.  

그러나 추후 컨트렉트 코드를 배포하고 이벤트 로그를 남길 때 매우 유용하게 사용됩니다. 코드를 살펴보겠습니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21 <0.9.0;

contract SimpleAuction {
    event HighestBidIncreased(address bidder, uint amount); // Event

    function bid() public payable {
        // ...
        emit HighestBidIncreased(msg.sender, msg.value); // Triggering event
    }
}
```

아래와 같이 HighestBidIncreased 라는 이벤트 로그를 먼저 정의를 한 후에 뒤에 emit을 똑같은 이름으로 명시하여서 안에 입력값에 넣어주는 식으로 사용됩니다.

emit 안에 입력되는 값은 추후 블록의 로그에 해당되는 공간에 남겨져 있기 때문에 특정 시점에 해당 값이 어떤 값이 였는지 남길때 유용합니다. 또한 indexed를 붙이게 되면 해당 이벤트에 대한 상세 쿼리가 가능하기 때문에 인덱스처럼 사용될 이벤트에는 indexed를 붙여주는 것이 좋습니다. 하나의 이벤트에는 최대 3개까지 indexed를 남길 수 있습니다.

```jsx
emit HighestBidIncreased(indexed msg.sender, indexed msg.value);
```

이벤트에 인덱스를 적용하면 위와 같은 코드가 나옵니다. 해당 부분은 블록체인 위의 온체인 개발 영역 밖에서 다양한 기능을 구현하기 위해서도 사용됩니다. 가장 대표적인 케이스가 특정 토큰의 전체 홀더 수를 계산하는 기능입니다. 해당 기능은 이더스캔같은 페이지에 기록되어 있는데. 이러한 편리한 조회 기능들은 모두 이벤트 발생을 가져와서 오프체인 영역에서 합산하여 보여주는 형태로 구현이 됩니다. 따라서 이벤트를 작성하고 사용하는 기능은 데이터를 다루는 백엔드 영역의 개발자 또한 데이터 담당자나 기획자와의 회의를 통해서 추가하거나 수정하는 경우가 종종 발생합니다.

## 구조체

구조체의 경우 하나의 구조체 안에 여러개의 변수를 담기 위하여 사용됩니다. 구조체를 이용하면 하나의 객체를 만들고 그 안에 특성을 부여하여서 다양한 개념을 구현할 수 있습니다. 코드를 통해 살펴보겠습니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Ballot {
		    struct Voter { // Struct
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
}
```

위의 코드는 투표를 구현한 컨트렉트입니다. Voter라는 이름의 struct 자료형 즉, 구조체가 사용된 케이스입니다. 투표자를 나타내는 해당 구조체에서는 투표하는 사람에 대한 여러 특징 들을 담고 있습니다. 무게, 투표여부, 투표한 사람에 대한 지갑주소, 몇표를 하였는지에 대한 정보 등을 변수를 통해 표현합니다. 이런식으로 Voter를 구조체를 만들어서 나타내는 식으로 사용하면 여러 데이터를 묶어서 효과적으로 관리할 수 있습니다.

## Enum

Enum은 사용자가 커스터마이징 할 수 있는 타입입니다. 코드를 통해 살펴보겠습니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Purchase {
    enum State { Created, Locked, Inactive } // Enum
}
```

위의 코드와 같이 타입을 정의하고 해당 타입에 어떤 변수가 들어올 수 있는지를 정의를 해두면 유용하게 사용이 가능합니다.

### Error

에러의 경우 주로 require 다음에 나오는 문자열로 많이 쓰입니다. 하지만 Error를 정의하면 가스비를 더 절약할 수 있다는 장점과 에러 문구에 특정 변수를 넣을 수 있다는 점이 있습니다. 마치 console로 로그를 찍듯이 에러 메세지에도 변수를 쓰고 싶다면 아래 코드처럼 사용하면 됩니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

/// Not enough funds for transfer. Requested `requested`,
/// but only `available` available.
error NotEnoughFunds(uint requested, uint available);

contract Token {
    mapping(address => uint) balances;
    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];
        if (balance < amount)
            revert NotEnoughFunds(amount, balance);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        // ...
    }
}
```

# 타입 (Type)

지금까지 컨트렉트를 선언하는 방법과 컨트렉트안에 정의할 수 있는 구조가 무엇이 있는지에 대해 알아봤습니다. 하지만 솔리티디티에서 선언을 하기 위해서는 타입에 대하여 알아야 합니다. 솔리디티에서도 uint나 bool, string과 같이 다른 프로그래밍 언어와 비슷하게 타입이 정해져 있지만 address 같은 처음 보시는 타입도 존재합니다. 따라서 가볍게 보고 넘어가도록 하겠습니다.

## Value Type

솔리디티에서는 특정 값을 정의할 때 타입도 같이 지정해 줍니다. 이를 값에 대한 타입 (value type)이라고 합니다. 다른 프로그래밍 언어에서와 마찬가지로 변수를 선언하거나 함수의 입력값에 타입을 지정해주어야 하기 때문에 꼭 숙지하시고 넘어가야합니다.

### Boolean (참거짓)

Boolean은 True나 False에 대한 타입입니다. 다른 언어에서와 마찬가지로 사용된다고 보시면 되겠습니다. Bool 타입은 논리 연산자와 함께 많이 쓰입니다. 대표적으로 사용되는 논리연산을 살펴보도록 하겠습니다.

```jsx
연산자:

! (logical negation) //논리적으로 부정하는 경우

&& (logical conjunction, “and”) // and 논리연산

|| (logical disjunction, “or”)// or 논리연산

== (equality) //동일한 경우

!= (inequality) //동일하지 않은 경우
```

위와 같은 연산자들은 스마트컨트렉트를 실행할 때 조건 검사에 특히 많이 사용됩니다. 조건에 대한 검사를 하고 해당 값이 참인 경우 통과를 시키거나 거짓인 경우 에러를 발생시키는 등의 문법은 솔리디티에서도 자주 사용되며, 다른 언어에서와 크게 다른점이 없다고 보시면 되겠습니다.

### Integer (정수형)

정수 형태의 타입은 다른 언어에서와 같이 int와 uint를 사용합니다. 각각 singed integer, unsinged integer를 의미합니다. 해당 타입은 각각 uint8, uint256 과 int8, int256으로 선언되어 쓰이며, 그냥 uint를 선언하여도 uint256과 동일한 값에 해당되며 int는 int256과 동일한 값입니다. 해당 정수형에 대한 연산자는 아래와 같습니다.

```jsx
연산자:

비교: <=, <, ==, !=, >=, > (bool로 평가)

비트 연산자: &, |, ^(비트 배타적 or), ~(비트 부정)

시프트 연산자: <<(왼쪽 시프트), >>(오른쪽 시프트)

산술 연산자: +, -, 단항 -(부호 있는 정수에만 해당), *, /, %(모듈로), **(지수)
```

보시는 것 처럼 일반적인 비교 부호, 비트연산자 부호 , 시프트 연산자 부호,  산술 연산자 부호와 동일하게 사용됩니다.

 정수형 연산에 있어서는 유의할 점이 두가지가 있습니다. 우선 solidity 코드에서는 연산에 비례하여 가스 소모량이 많이 들기 때문에 꼭 필요한 연산만 남기는 것이 중요합니다. 두번째로 정수 자료형에서는 위에서 언급한것과 같이 타입에 따라서 표현이 가능한 값이 제한되어 있습니다. 만약 최소값과 최대값을 넘기게 되면 오버플로우나 언더플로우가 발생하여 값이 초기화 될 수 있습니다.  따라서 solidity contract에서는 이를 막기 위한 SafeMath 라이브러리가 자주 사용됩니다. 그러나 0.8.0 버전에서는 오버플로우나 언더플로우를 코드에서 막아주기 때문에 따로 SafeMath 같은 라이브러를 사용할 필요가 없습니다. 이에 따라서 0.8.0 버전 이후애서는 정수 X가 있을 때 type(X).min 및 type(X).max를 사용하여 해당 유형이 나타낼 수 있는 최소값 및 최대값에 액세스할 수 있습니다. 해당 서적에서는 0.8.0 버전을 기준으로 하기 때문에 SafeMath는 생략되지만, 현재 이전 버전을 사용하는 많은 DAPP들이 SafeMath를 사용하고 있습니다.

### 주소

주소는 지갑 주소 EOA(Externally Owned Account)와 컨트렉트 주소 (Contract Account)가 모두 같은 형태로 나타납니다. 대신 코드 안에서 이더리움을 직접적으로 받는 주소의 경우 payable을 붙여주게 되어서 address에는 총 2개의 표현이 있습니다. payable이  없는 주소에서는 스마트컨트렉트에서 명시하여도 이더리움을 보낼 수 없습니다. 이더리움을 보내는 것은 매우 중요한 행위이므로 payable을 붙여서 꼭 지정된 주소한테만 이더리움이 가도록 설정해 둔 것입니다.

```jsx
address: 20바이트 값(이더리움 주소 크기)을 보유합니다.

address payable : 주소와 동일하나 이더리움을 이체하여 발송할 수 있습니다.
```

address payable 을 address 자료형을 바꿀때는 따로 작업을 할 필요가 없지만 address를 address payable로 바꿀때는 payable(<address>) 과 같이 표현하여야 바뀌게 됩니다. 만약에 컨트렉트 형태의 주소인 경우 payable(<addrss>)로 이더리움을 보내는 주소로 만들 수 있지만, 컨트렉트에서 fallback 함수에서 이더리움을 받아오거나 receive() external payable { ... } 와 같이 receive 가 정의되어 이더리움을 받을 수 있게 설계된 컨트렉트가 아니라면 address payable 형태로 만들 수 없습니다.

```jsx
address payable x = payable(0x123);
address myAddress = address(this);
if (x.balance < 10 && myAddress.balance >= 10) x.transfer(10);
```

또한 address와 같은 자료형 에서는 balance 나 transfer를 사용하여서 이더리움 잔고를 조회하거나 이더리움을 보내는 행위를 할 수도 있습니다.

### 문자형

문자형은 `"foo"`or `'bar'`  과 같이 “” 또는 ‘’ 과 함께 사용됩니다. 

```jsx
string a = "foo";
string b = 'bar';
```

문자형의 경우 함수에서 input 값에 들어갈 경우 string memory 를 명시해 주어서 메모리 영역에 일시적으로 저장됨을 확인해야 합니다.

## Reference Type

참조형 타입의 경우 데이터의 위치를 지정해 주어야 하는 타입입니다. Array, Mapping, Struct와 같은 요소들이 참조형 타입이라고 볼 수 있습니다. 참조형 타입을 사용할 때 사용이 가능한 데이터 저장 공간에 대한 값들은 아래 3가지 입니다.

memory : external function call에서 잠시 쓰이는 휘발성 메모리

storage: 상태변수에 저장되는 타입들로 컨트렉트가 없어지기 전까지 저장됨

calldata: 함수의 입력값이 저장되는 특별한 저장 장소로 memory와 비슷하게 작동하며 변경이 불가능하다.

0.6.9버전 이전에서는 calldata가 external 함수에 대해서만 사용이 가능했지만, 현재는 가시성과 상관없이 memory와 calldata를 모두 사용할 수 있습니다. 

### 구조체

구조체의 경우 위에서 살펴 봤기 때문에 코드로 다시 한번 보고 넘어가도록 하겠습니다. 해당 예제에서는 mapping도 다루고 있기 때문에 다음에 설명되어 있는 mapping 부분을 보고 오시기를 추천드립니다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

// Funder라는 구조체에는 2개의 타입을 내부적으로 정의하고 있습니다.
struct Funder {
    address addr;
    uint amount;
}

contract CrowdFunding {
		//구조체의 경우에는 컨트렉트 안에도 정의할 수 있습니다. 또한 내부적으로 배열이나 mapping을 선언할 수도 있습니다.
    struct Campaign {
        address payable beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
        mapping (uint => Funder) funders;
    }

    uint numCampaigns;
    mapping (uint => Campaign) campaigns;

    function newCampaign(address payable beneficiary, uint goal) public returns (uint campaignID) {
        campaignID = numCampaigns++; // campaignID는 mapping에서 Index 역할을 합니다. 
        Campaign storage c = campaigns[campaignID]; // 입력된 인덱스에 Campagin 타입의 구조체를 저장하게 됩니다.
        c.beneficiary = beneficiary; // 이와 같이 구조체에 들어가는 요소들을 지정하여 넣어 줄 수 있습니다.
        c.fundingGoal = goal;
    }

    function contribute(uint campaignID) public payable {
        Campaign storage c = campaigns[campaignID]; //
        c.funders[c.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
        c.amount += msg.value;
    }

    function checkGoalReached(uint campaignID) public returns (bool reached) {
        Campaign storage c = campaigns[campaignID];
        if (c.amount < c.fundingGoal)
            return false;
        uint amount = c.amount;
        c.amount = 0;
        c.beneficiary.transfer(amount);
        return true;
    }
}
```

해당 코드는 구조체를 이용하여서 크라우드 펀딩을 구현한 코드입니다. 해당 코드에서는 우선 Funder라는 구조체를 선언하였습니다. 이는 컨트렉트 외부에서 그리고 Campaign은 컨트렉트 내부에서 선언이 되어 있습니다. 안에는 각각 크라우드 펀딩에 참여하는 사람의 정보와 해당 캠페인에 대한 정보가 변수로 선언이 되어 있습니다. 이렇게 크라우드 펀딩이라는 서비스가 있을 때 구조체를 사용하면 각 주체에 대한 정보를 객체화 시켜서 관리가 가능합니다. 새로운 크라우드 펀딩의 캠폐인을 만드는 과정은 newCampaign이라는 함수로 구현하였는데 이때 campaignID라는 인덱스 값을 선언한 후 이를 mapping의 키 값으로 지정하여서 구조체를 mapping으로 효과적으로 관리하는 모습을 볼 수 있습니다. 해당 구조체는 c로 정의한 후 c.beneficiary, c.fundingGoal과 같이 각 구조체에서 정의된 상태변수에 값을 대입함으로서 새로운 캠폐인에 대한 정보를 입력해 줍니다. 

두번재 함수로는 contribute가 있습니다. 해당 함수에서는 campaginID를 받아와서 해당 ID에 매핑된 주소로 이더리움을 보내주는 역할을 합니다. 여기서 msg.sender는 트랜잭션을 보내는 지갑 주소를 의미하고 msg.value는 보내는 이더리움의 양을 나타냅니다. 또한 보낸 사람과 보낸 양에 대한 정보는 구조체에 업데이트가 되게 되어서 크라우드 펀딩의 해당 캠폐인에 해당하는 값들에 추가가 되게 됩니다. 

마지막 함수로는 checkGoalReached가 있습니다. 해당 함수는 campaignID를 받아와서 크라우드 펀딩 목표액에 도달했는지 여부를 체크해주는 함수입니다. 만약에 구조체 안에 있는 fundingGoal이 amount보다 작다면 false를 반환하고 목표액을 넘겼다면 해당 금액을 0으로 구조체에 업데이트 한 후 대상이 되는 컨트렉트에 이더리움을 보내게 됩니다.

### 배열

배열의 경우 가변 배열과 고정 배열이 있습니다. 배열의 경우 T[3] 과 같이 선언한 경우 크기가 3인 배열 T가 나타납니다. 또한 push() 와 Pop()을 사용하여서 배열의 요소를 추가하거나 제거할 수 있습니다. 배열의 경우 다른 프로그래밍 언어와 동일하게 길이가 고정된 배열과 길이가 정해지지 않은 가변 길이의 배열이 존재합니다. 또한 배열 안에는 정의된 타입에 대한 값을 넣을 수 있습니다. 배열의 경우 유형이나 상황에 따라 다양한 사용법이 있지만 본 교재에서는 예제를 통하여 많이 활용할 예정이므로, 대표적인 예시를 하나만 보고 넘어가도록 하겠습니다. 해당 예시는 구조체를 다루는 배열입니다. [] 앞에 자료형을 넣은 후 뒤에 가시성에 대한 사항을 정해준 후 배열 이름을 명시하면 배열을 정의할 수 있습니다.

```jsx
Proposal[] public proposals;
```

위의 코드는 크기가 정해져 있지 않은 가변길이의 배열 입니다. 

```jsx
Proposal[][5] public proposals;
```

만약 고정된 사이즈의 배열을 원한다면 위와 같이 자료형을 정해준 후 그 뒤의 [] 안에 배열의 크기를 지정해 주면됩니다.

 proposals라는 배열 안에는 Proposal이라는 구조체를 저장합니다. Proposal이라는 구조체에 해당 제안이 몇표나 받았는지에 대한 정보인 voteCount에 해당하는 정보가 있다면 다음과 같이 배열에 있는 요소를 가져와서 정보를 업데이트 시킬 수도 있습니다.

```jsx
proposals[proposal].voteCount += sender.weight;
```

이런 식으로 배열을 활용하여 데이터를 관리해가면서 업데이트를 하거나 조회하는 식으로 활용하는것이 가능합니다.

## **Mapping Type**

3번째 타입인 Mapping에 대해서 알아보겠습니다. 해당 타입은 매우 빈번하게 쓰이는 타입으로 예시를 통해서 자세히 알아보고 넘어가도록 하겠습니다. 일단 Mapping은 Key => value 형태로 선언하여 사용되게 됩니다. Mapping의 문법은 다음과 같습니다.

```jsx
//mapping(KeyType => ValueType) VariableName
mapping (Key => value) visibility 이름
```

key를 넣으면 value 값이 나오는 구조로 이해하면 됩니다. key 값에는 mapping, 구조체, 배열, enum같이 복잡한 타입들이 올 수 없습니다. 하지만 value 값에는 제한 없이 모든 값들이 올 수 있습니다.  심지어 mapping 자체도 value값 안에 포함 될 수 있습니다.

```jsx
import "./Ownable.sol";

contract MyToken is Context, Ownable{
    
    uint256 public _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    
    mapping (address => uint256) public _balances;
    
    constructor (string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;
        _decimals = 18;
    }
    
}
```

임의로 작성한 간단한 토큰 코드입니다. 여기서 mapping이 쓰였는데 이렇게 mapping이 사용되게 되면 address가 키 값으로 uint256이 value값으로 나오게 됩니다. 이렇게 될 경우 특정 주소가 나오면 숫자값이 리턴되게 되므로, 함수를 다양하게 구현하여 해당 값이 송금을 하거나 발행, 소각을 할때 적절히 조정된다면 마치 사람들은 자신의 주소를 key값으로 넣었을 때 나오는 금액인 value값을 마치 자신의 잔고처럼 느끼게 됩니다. 실제 토큰의 잔고 구현도 mapping으로 이루어져 있으며, 인덱스를 통해서 복잡한 데이터들을 다룰 때도 자주 사용되는 자료형 입니다. mapping의 경우에는 이중 mapping도 가능합니다. mapping안에 value값을 다시 mapping으로 넣어서 키값을 2개를 받아오는 mapping입니다. 예시를 통해서 살펴보도록 하겠습니다.

```jsx
mapping (address => mapping (address => uint256)) private _allowances;
```

다음은 erc20 표준에서 쓰이는 allowance라는 mapping입니다. 해당 mapping의 경우 첫번째 키값으로 address를 받아오고 그 결과로 mapping (address ⇒ uint256)을 리턴합니다. 이에 따라 두번째로 들어간 address의 키값으로 나오게 되는 숫자가 최종적으로 도출되는 값입니다. allowance의 경우 키값으로 주소 2개가 들어가야 합니다. 첫번째 주소가 두번째 주소에서 결과값으로 나오는 만큼의 잔고를 사용할 권한을 넘겨주는 내용이기 때문입니다. 두개의 주소를 같이 가져와서 mapping안에 넣어줘야 숫자값이 나오기 때문에 첫번째 주소로부터 두번째 주소에게 uint256 만큼의 토큰을 빌릴 권리를 준다와 같은 행위를 표현할 수 있게 됩니다. 이처럼 mapping안에 mapping을 한번 더 넣거나 위의 구조체에서의 예시처럼 구조체와 함께 사용한다면 표현하고자 하는 복잡한 로직도 솔리디티 코드 안에 풀어 낼 수 있습니다. 해당 코드에 대한 자세한 내용은 뒤의 챕터에 나오는 ERC 표준을 분석하는 부분에서 다룰 예정이므로 여기서는 이만큼만 다루고 넘어가도록 하겠습니다.