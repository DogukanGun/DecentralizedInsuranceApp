// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SolInsurance.sol";

contract Voting {
    struct Asset {
        address ownerWallet;
        uint256 assetValue;
        //TODO File id should be added
    }

    struct Vote {
        Asset asset;
        uint256 totalVotes;
        uint256 positiveVotes;
        address insuranceContract;
        bool votingCompleted;
        //TODO File id should be added

    }

    struct VotingRequest {
        address userWallet;
        uint256 assetValue;
    }
    uint256 public currentSession;
    mapping(uint => mapping(address => bool)) public hasVoted;

    uint256 public approvalThreshold;
    uint256 public voteFee;
    Vote[] public votes;
    bool public hasActiveVote;
    VotingRequest[] public votingQueue;

    address public repaymentContractAddress;

    address public stNearTokenAddress;
    IERC20 public stNear;

    constructor(address _stNearTokenAddress, uint256 _approvalThreshold, uint256 _voteFee) {
        currentSession = 1;
        approvalThreshold = _approvalThreshold;
        voteFee = _voteFee;
        stNearTokenAddress = _stNearTokenAddress;
        stNear = IERC20(_stNearTokenAddress);
    }

    modifier hasNoActiveVote() {
        require(!hasActiveVote, "There is an active vote.");
        _;
    }

    modifier _hasActiveVote() {
        require(hasActiveVote, "There is no active vote.");
        _;
    }

    function startVote(address userWallet, uint256 assetValue) internal hasNoActiveVote {
        votes.push(Vote(Asset(userWallet, assetValue), 0, 0, address(0), false));
        hasActiveVote = true;

    }

    function requestVote(address userWallet, uint256 assetValue) public {
        require(!hasVoted[currentSession][msg.sender], "You have already voted.");
        votingQueue.push(VotingRequest(userWallet, assetValue));
    
        if (!hasActiveVote) {
            processNextVoteRequest();
        }
    }   

    function processNextVoteRequest() internal {
        require(!hasActiveVote, "There is an active vote. Please wait for the current vote to complete.");
        require(votingQueue.length > 0, "Voting queue is empty.");
        VotingRequest storage nextRequest = votingQueue[0];
        startVote(nextRequest.userWallet, nextRequest.assetValue);
        votingQueue.pop();
    }

    function vote(bool _approval) public _hasActiveVote {
        require(!hasVoted[currentSession][msg.sender], "You have already voted.");
        // require(msg.sender != votingQueue[0].userWallet, "You cannot vote for yourself.");


        // Check if the sender has enough stNEAR tokens to pay the fee
        require(stNear.balanceOf(msg.sender) >= voteFee, "Insufficient stNEAR balance for voting.");

        // Deduct the vote fee from the sender's stNEAR balance
        stNear.transferFrom(msg.sender, address(this), voteFee);

        uint256 currentVoteIndex = votes.length - 1;
        Vote storage currentVote = votes[currentVoteIndex];
        currentVote.totalVotes += 1;

        if (currentVote.positiveVotes <= approvalThreshold && _approval) {
            currentVote.positiveVotes += 1;
            hasVoted[currentSession][msg.sender] = true;

        }

        if (currentVote.positiveVotes > approvalThreshold && !currentVote.votingCompleted) {
            currentVote.votingCompleted = true;
            address ownerWallet = currentVote.asset.ownerWallet;
            uint256 assetValue = currentVote.asset.assetValue;
            currentVote.insuranceContract = address(new SolInsurance(ownerWallet, assetValue, repaymentContractAddress, stNearTokenAddress));
            stNear.transferFrom(address(this),currentVote.insuranceContract,voteFee);
            hasActiveVote = false;
            hasVoted[currentSession][msg.sender] = true;
            currentSession++;

            if (votingQueue.length > 0) {
                processNextVoteRequest();
            }
        }

    } 

    function setRepaymentContractAddress(address _repaymentContractAddress) external {
        repaymentContractAddress = _repaymentContractAddress;
    }

}
