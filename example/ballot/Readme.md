스마트 컨트렉트의 구조에 대해서 학습하였으니 이를 바탕으로 예제를 하나 살펴보도록 하겠습니다. 해당 예제는 솔리디티 공식 문서에 있는 대표 예제로서 Solidity by Example 이라는 부분에 나와있는 예제이자 Remix라는 컴파일러를 키게 되면 처음 보이는 컨트렉트입니다. 

## Remix에서 대표 예제 살펴보기

해당 컨트렉트를 직접 실행시켜 보고 싶으시다면 구글 검색창에 remix를 검색하셔서 https://remix.ethereum.org/

위의 주소로 들어가주시면 됩니다. 해당 주소를 클릭한 후 좌측 contracts 폴더에서 Ballot.sol을 클릭하면 이번에 살펴볼 코드를 보실 수 있습니다. 만약 리믹스가 업데이트 된다면 솔리디티 공식 문서의 example을 보셔도 좋습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2eaab54f-2909-4562-9369-fc508c637d58/Untitled.png)

리믹스는 온라인 IDE로서 따로 개발환경을 설치하지 않아도 어디서든지 컨트렉트를 작성하고 배포해 볼 수 있기 때문에 매우 유용한 툴입니다. 실제로 현업에서 개발을 할때는 ganache와 truffle이나 waffle과 hardhat 같은 가상 네트워크 및 툴에서 배포를 하고 테스트 스크립트를 직접 작성하여 수정사항이 있을 때마다 테스트를 반복적으로 진행하지만 초기에 컨트렉트를 작성할 때는 리믹스를 종종 사용하기도 합니다. 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a424b56-2d6e-428e-9cc8-7c9e55df8a31/Untitled.png)

맨 좌측 메뉴에서 compile 3_Ballot.sol을 클릭하시거나 Auto compile을 클릭하시게 되면 솔리디티 언어로 된 코드가 블록체인에 배포될 수 있는 형태인 bytecode 형태로 변환이 되게 됩니다. 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/43a3b4ae-28c5-4682-9cf0-9f3b938ce6ba/Untitled.png)

변환이 이루어지면 위의 사진과 같이 contract에 대한 배포 정보가 뜨고 하단에 ABI 와 Bytecode가 표시되는 것을 확인할 수 있습니다. Bytecode의 경우 블록에 직접 기록되어 EVM이 실행하게 되는 코드로서 이더스캔에서 표시가 되기도 합니다. 또한 ABI 는 함수의 이름이나 가시성, 입력값 등과 같은 메타데이터들을 모아놓은 키, 벨류 형태의 데이터 입니다. 스마트컨트렉트가 배포되고 나서 나오는 컨트렉트 주소와 ABI가 있다면 블록체인에 저장되어 있는 bytecode를 찾아가서 함수를 실행 시키는 원리입니다. 특히 컨트렉트와 상호작용을 하기위한 개발을 진행할 때 ABI와 컨트렉트 주소가 필수적이므로, 배포시에 잘 저장해 두어야 합니다. 

마지막으로 맨 왼쪽 메뉴중 마지막 버튼을 누르면 컨트렉트를 원하는 환경에 배포할 수 있습니다. 해당 컨트렉트는 생성자에서 bytes32 값의 문자열을 받아와야 하므로 임의로 test를 의미하는 

0x7465737400000000000000000000000000000000000000000000000000000000

를 bytes32의 자리에 넣어서 배포를 해보겠습니다. 이렇게 문자열을 bytes32 등으로 형변환을 하려면 ethers.js 나 web3.js 같은 모듈들을 사용하는 것이 일반적이지만 여기서는 일단 입력값을 가져와서 입력하도록 하겠습니다.

뒷부분에서 학습을 하겠지만 이렇게 생성자의 경우에는 스마트컨트렉트가 배포될 당시에 입력값을 넣어주면 값을 초기화 시켜주는 역할을 하게 됩니다. 만약 생성자가 파라미터를 받는 경우 파라미터를 배포시에 넣지 않으면 배포가 되지 않습니다. 현재 생성자의 경우 배열 형태이므로 [”0x7465737400000000000000000000000000000000000000000000000000000000”] 와 같이 입력값을 넣고 배포를 하도록 하겠습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c37178f9-138a-478b-99a1-5700cb0baffd/Untitled.png)

이렇게 입력값을 넣어 준 후 transact를 누르게 되면 해당 입력값을 가지고 스마트컨트렉트가 배포됩니다. 배포가 완료되면 트랜잭션 수수료가 발생하는 트랜잭션 호출의 부분은 주황색으로 표시되며 단순히 조회만 해오는 것은 파란색으로 호출됩니다. public 선언을 할 경우 getter가 자동적으로 생성이 되어서 별다른 과정 없이 변수에 대한 조회가 가능하게 나옵니다. 만약 이번 예제에 대한 실습을 빠르게 해보시려는 경우 이처럼 리믹스에서 배포 후 테스트 하는것을 추천드립니다.

## 투표 예제 코드 설명

스마트컨트렉트로 투표를 구현한 예제이기 때문에 앞서 학습한 다양한 구조와 타입들이 사용됩니다. 이후에 다양한 서비스에서 코드가 어떻게 쓰여있는지를 이해하려면 일단 코드를 읽고 이해하는 능력이 필요할 것입니다. 이번 장에서는 예제를 자세히 살펴보면서 코드를 분석해보도록 하겠습니다.

일단 전체적인 코드를 보고 어떤 내용인지 한번 읽어보시는 것을 추천드립니다. 한번 읽어보신 이후에 하나씩 살펴가면서 어떠한 의미로 쓰인 코드인지 살펴보도록 하겠습니다.

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {
   
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    struct Proposal {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public chairperson;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    /** 
     * @dev Create a new ballot to choose one of 'proposalNames'.
     * @param proposalNames names of proposals
     */
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        for (uint i = 0; i < proposalNames.length; i++) {
            // 'Proposal({...})' creates a temporary
            // Proposal object and 'proposals.push(...)'
            // appends it to the end of 'proposals'.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }
    
    /** 
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param voter address of voter
     */
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /**
     * @dev Delegate your vote to the voter 'to'.
     * @param to address to which vote is delegated
     */
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");
        require(to != msg.sender, "Self-delegation is disallowed.");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight += sender.weight;
        }
    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param proposal index of proposal in the proposals array
     */
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /** 
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /** 
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}
```

처음 부분부터 살펴보면 Ballot이라는 이름으로 컨트렉트를 만들고 구조체를 먼저 정의한 것을 보실 수 있습니다. 여기서 구조체는 각각 투표자(Voter)와 제안(Propsal)을 나타냅니다. 투표자라는 구조체 안에는 다양한 타입의 변수가 선언되어 있는 것을 볼 수 있습니다. 우선 정수형 으로 weight라는 가중치가 선언되어 있습니다. 또한 bool 타입으로 true 또는 false로 투표를 하였는지의 여부를 변수로 담고 있습니다. address라는 타입의 변수는 어떤 주소에 투표권을 위임하였는지, 즉 누군가에게 투표권을 넘겨주었는지를 표시해주고 있습니다. 나중에 구현한 함수에서 보겠지만 delegate라는 함수를 실행하면 투표권을 다른 투표자에게 넘기고 해당 투표자는 가중치가 올라가는 구조입니다. 마지막으로 후보자의 인덱스 즉, 후보의 기호에 해당하는 숫자값을 저장하고 있습니다. 한마디로 투표자에 대한 개념을 객체화 하여 그 안에 “해당 투표자가 얼마나 많은 표를 다른 투표자에게 위임 했거나 또는 몇번 후보에게 투표를 하였는가? 에 대한 정보를 담는 개념입니다. 이제 두번째로 선언된 구조체를 살펴보겠습니다. 구조체의 이름은 프로포절 즉 제안을 의미하며 bytes32 형태로 이름을 저장시킵니다. 만약 사람이 읽을 수 있는 글자로 이름을 저장시키고 싶다면 타입을 string으로 두면 되지만 여기서는 자료형에 맞게 바이트 형태의 코드만 들어가게 됩니다. 또한 숫자형태로 해당 제안이 몇표나 받았는지를 기록하고 있습니다. 이렇게 구조체와 같은 변수나 자료형의 선언은 주로 컨트렉트 최상단에서 이루어집니다.

```jsx
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }
```

이어서 코드를 살펴보도록 하겠습니다. 구조체를 선언하고 난 후에는 이후 컨트렉트에서 사용될 다른 상태변수오 mapping, 배열을 선언한 것을 볼 수 있습니다. 먼저 address 를 public으로 공개하여서 chairperson이라는 변수로 선언하였습니다. 이렇게 퍼블릭 선언을 하게되면 누구나 와서 chairperson에 대한 주소를 조회할 수 있게 됩니다. 이더스캔과 같이 공개된 공간에서도 로그인 없이도 소스코드가 공개만 되어있다면 누구나 조회가 가능하도록 getter라는 기능이 활성화 됩니다. 따라서 공개가 필요한 변수만 public으로 두는 것이 좋으며, 대부분의 경우 따로 조회 함수를 만들고 선언은 private으로 하는것이 더 안전합니다. 다음으로 voters라는 mapping 자료형이 선언되어 있습니다. 해당 매핑의 경우 주소값을 키값으로 넣으면 Voter라는 구조체가 value 값으로 반환됩니다. 지갑 주소를 넣으면 해당 지갑주소에 대한 투표자로서의 정보가 나오게 되는것입니다. 이렇게 구조체를 만들고 키값을 연결하는 형태로 투표자의 투표 정보를 블록체인에 기록하는것을 쉽게 구현할 수 있습니다. 마지막으로 proposals라는 이름의 가변 길이 배열을 선언한것을 볼 수 있습니다. 또한 배열 앞에 Prposal 구조체가 선언이 되어 있기 때문에 Proposal 타입을 가진 데이터만 해당 배열에 저장이 됩니다. 제안이라는 배열을 만들고 그안에 제안의 내용과 받은 투표수를 기록하는 구조체를 담아두어서 제안자가 받은 투표에 대한 내용과 각 제안에 대한 정보값이 블록체인에 저장되도록 구현되었습니다.

```jsx
    address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;
```

이제 컨트렉트에서 사용할 타입과 변수에 대한 선언을 마쳤습니다. 다음으로 컨트렉트를 생성할 때 기본적으로 설정해주는 부분인 constructor 즉 생성자 부분이 나오게 됩니다. 생성자의 경우 컨트렉트가 만들어지면서 바로 실행이 되기 때문에 초기에 값을 설정해 주기 위하여 활용합니다. 생성자에서는 파라미터를 받아올 수 있는데 여기서는 popsalName을 생성자에 받아옵니다. 생성자에서 받아오는 값들은 배포시에 직접 넣어서 배포를 하게 됩니다. 여기서는 제안에 대한 이름을 넣어서 배포를 하게 되면 해당 변수를 propsals 배열의 Propsal 구조체에 넣어서 저장을 해줍니다. 해당 파라미터는 배열 형태로 받아오고 있기 때문에 for 반복문을 사용하여 입력받은 배열의 요소만큼을 반복해가며 제안에 넣고 초기값이 정해지는 것을 볼 수 있습니다. 생성자의 경우 이런식으로 안에 함수를 직접 짜기도 하지만 내부적으로 호출하는 함수를 통해 초기화를 시키는 경우도 많이 있습니다. 또한 컨트렉트끼리 연결이 필요하거나 값을 파라미터에 맞게 초기화 시키는데 자주 사용되기 때문에 생성자를 상황에 맞게 유연하게 사용하는것은 특히 중요하다고 할 수 있습니다.

```jsx
    /// Create a new ballot to choose one of `proposalNames`.
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
```

다음으로 함수를 선언하고 구현한 부분을 살펴보도록 하겠습니다. 첫번째 함수는 투표를 할 권한을 부여하는 함수 입니다. 해당 함수는 voter라는 address 타입의 입력값을 받은 후 해당 트랜잭션을 실행시키는 msg.sender가 chairperson으로 지정된 사람인지 체크를 하고, 해당 주소를 키값으로 입력 하였을때 나오는 구조체인 voter의 voted 값을 체크하여 이미 투표가 끝났는지를 확인합니다. 또한 가중치가 0 인것도 확인하고 이 모든 조건이 통과되어 의장이 보내는 트랜잭션이고 투표권을 받는 사람이 현재 투표권이 없고 투표를 하지 않았을 경우에 weight을 1로 주어 투표권을 부여해주는 것으로 볼 수 있습니다.

```jsx
    /** 
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param voter address of voter
     */
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }
```

그 다음은 delegate라는 함수로 투표권을 다른 사람에게 위임해주는 기능을 구현합니다. delegate 함수는 address 타입의 to에 해당하는 주소를 파라미터로 받아왔으며 가시성에 대해서는 public을 지정해 두었습니다. 누구나 와서 함수를 실행할 수 있다는 의미입니다. 하지만 앞부분에 require 문이 들어가 있는것을 보실 수 있습니니다. 함수는 누구나 실행 시킬 수 있지만 실행시킨 msg.sender를 키값으로 넣었을때 나오는 Voter 구조체를 sender라는 이름으로 가져와서 해당 구조체의 voted에 이미 투표를 했다고 표시가 되어 있거나 to를 자신의 주소로 넣어서 자기 자신에게 투표권을 위임하는 행위가 이루어질 경우 에러를 반환합니다.

다음으로 입력받은 to를 통하여 voters[to]의 delegate를 가져와서 to가 delegate 하려는 사람으로 주소를 업데이트 시켜줍니다. 그 후 If, else 분기를 통하여 위임받은 to 주소가 투표가 되어 있지 않다면 weight만 늘려주고 만약 위임 받은 사람이 이미 투표를 했다면, 위임받은 사람이 투표한 제안에 투표수를 바로 추가해 줍니다.

이처럼 조건문이나 구조체 등을 활용하면 스마트컨트렉트를 통해 위임 투표와 같이 상대적으로 복잡한 기능도 구현할 수 있습니다.

```jsx
/**
     * @dev Delegate your vote to the voter 'to'.
     * @param to address to which vote is delegated
     */
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");
        require(to != msg.sender, "Self-delegation is disallowed.");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight += sender.weight;
        }
    }
```

다음으로 vote 함수를 살펴보도록 하겠습니다. vote 함수의 경우 일반 투표를 하는 기능으로 위의 위임투표보다 간단하다고 볼 수 있습니다. 정수형의 propsal 즉 제안의 후보번호를 받아와서 투표를 하는 함수입니다. 먼저 sender라는 이름으로 Voter 구조체를 가져와서 정의해 두었습니다.  가져온 구조체는 msg.sender즉 트랜잭션을 실행시킨 주체의 정보를 불러옵니다. 그 후 만약 가중치가 0이 아니라 투표권이 있고 이미 투표한 상황이 아닌경우에는 투표 여부를 true로 바꾸면서 해당 후보에게 투표를 한걸 기록한 후 해당 후보의 투표수에 weight만큼을 추가하여 투표를 진행합니다.

```jsx
    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param proposal index of proposal in the proposals array
     */
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }
```

다음은 최종적으로 승리한 제안과 승리한 제안의 이름을 보여주는 함수입니다. 해당 두 함수의 경우 트랜잭션을 일으키면서 상태변화를 일으키지 않고 단순히 조회만 해오기 때문에 누구나 와서 가스비 걱정없이 조회를 할 수 있습니다. 솔리디티 코드를 작성할때는 기본적으로 변수는 private 하게 두고 함수를 통해 가져오는 방식을 주로 택합니다. winningProposal과 winnerName은 모두 입력값을 받지 않고 실행시 결과만 보여주게 됩니다. winningProposal의 경우 반복문을 통하여서 후보번호를 하나씩 올려가며 비교를 합니다. 모든 후보의 비교가 끝나면 최고 득표수를  계산한 후에 결과값을 후보 번호로 나타냅니다. winnerName()과 같은 경우 winnerProposal()을 불러와서 해당 후보번호의 이름 정보를 보여줍니다. 이런식으로 조회를 해오는 함수의 경우 계산은 있지만 블록체인 장부를 변화시키지는 않습니다. 계산만 하고 기록은 하지 않기 때문입니다. 따라서 비용이 부과되지 않습니다. 그러므로 조회와 같은 경우 상태변화를 일으키는 함수보다 더 자유롭게 사용해도 됩니다.

```jsx
    /** 
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /** 
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
```

이렇게 솔리디티에 대한 기본적인 설명과 함께 기본적인 예제도 살펴보았습니다. 기본적인 예제이지만 내용자체가 쉽지는 않습니다. 솔리디티에 대한 기본적인 공부는 여기에서 마치고 추후 해당 교재에서 실제 서비스의 다양한 케이스를 코드를 통해서 직접 살펴보도록 하겠습니다.