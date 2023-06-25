// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SolInsurance.sol";

contract Voting {
    mapping(address => bool) public hasVoted;
    uint256 public approvalThreshold;
    address public generatedContract;
    uint256 public voteFee;
    TotalVote[] votes;
    bool public hasActiveVote;

    //TODO vaiting votes can be added here
    
    struct Asset{
        address ownerWallet;
        uint256 assetValue;
    }

    struct TotalVote {
        Asset asset;
        uint256 totalVotes;
        uint256 positiveVotes;
    }

    
    address public stNearTokenAddress;
    IERC20 public stNear;

    constructor(address _stNearTokenAddress,uint256 _approvalThreshold, uint256 _voteFee) {
        approvalThreshold = _approvalThreshold;
        voteFee = _voteFee;
        stNearTokenAddress = _stNearTokenAddress;
        stNear = IERC20(_stNearTokenAddress);
    }

    modifier hasNoActiveVote() {
        require(!hasActiveVote, "Only coin holders can vote.");
        _;
    }

    modifier _hasActiveVote() {
        require(hasActiveVote, "Only coin holders can vote.");
        _;
    }

    function startVote(address userWallet,uint256 assetValue) public hasNoActiveVote{
        votes.push(TotalVote(Asset(userWallet,assetValue),0,0));
        hasActiveVote = true;
    }

    function vote(bool _approval) public _hasActiveVote{
        require(generatedContract != address(0) && generatedContract != address(1), "There is no active vote.");
        require(!hasVoted[msg.sender], "You have already voted.");

        // Check if the sender has enough stNEAR tokens to pay the fee
        require(stNear.balanceOf(msg.sender) >= voteFee, "Insufficient stNEAR balance for voting.");

        // Deduct the vote fee from the sender's stNEAR balance
        stNear.transferFrom(msg.sender, address(this), voteFee);

        hasVoted[msg.sender] = true;
        votes[votes.length-1].totalVotes +=1;
        
        if (votes[votes.length-1].positiveVotes <= approvalThreshold && _approval) {
            votes[votes.length-1].positiveVotes +=1;
        }else{
            address ownerWallet = votes[votes.length-1].asset.ownerWallet;
            uint256 assetValue = votes[votes.length-1].asset.assetValue;
            address(SolInsurance(ownerWallet,assetValue));
        }
    }
}
