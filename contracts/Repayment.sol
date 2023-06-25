// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SolInsurance.sol";

contract Repayment{
    struct InsurancePaymentRequest {
        address insuranceContractAddress;
        string reason;
        //TODO File id should be added
    }

    struct InsurancePayment{
        address insuranceContractAddress;
        string reason;
        uint256 totalVotes;
        uint256 positiveVotes;
        bool votingCompleted;
        //TODO File id should be added
    }

    uint256 public currentSessionForRepay;
    InsurancePayment[] public repay;
    bool public hasActiveRepayVote;
    mapping(uint => mapping(address => bool)) public hasVotedForRepay;
    InsurancePaymentRequest[] public repayQueue;
    address public stNearTokenAddress;
    IERC20 public stNear;
    uint256 public currentSession;

    uint256 public approvalThreshold;
    uint256 public voteFee;

    constructor(address _stNearTokenAddress, uint256 _approvalThreshold, uint256 _voteFee) {
        currentSession = 1;
        approvalThreshold = _approvalThreshold;
        voteFee = _voteFee;
        stNearTokenAddress = _stNearTokenAddress;
        stNear = IERC20(_stNearTokenAddress);
    }

    modifier _hasNoActiveRepayVote() {
        require(!hasActiveRepayVote, "There is an active repay vote.");
        _;
    }

    modifier _hasActiveRepayVote() {
        require(hasActiveRepayVote, "There is an active repay vote.");
        _;
    }
    
    function startVoteForRepay(address contractAddress, string memory reason) internal _hasNoActiveRepayVote {
        repay.push(InsurancePayment(contractAddress,reason,0,0,false));
        hasActiveRepayVote = true;
    }

    function requestPayment(address contractAddress, string calldata reason) external{
        require(!hasVotedForRepay[currentSession][msg.sender], "You have already voted.");
        repayQueue.push(InsurancePaymentRequest(contractAddress, reason));
    
        if (!hasActiveRepayVote) {
            processNextRepayVoteRequest();
        }
    }

    function processNextRepayVoteRequest() internal {
        require(!hasActiveRepayVote, "There is an active vote. Please wait for the current vote to complete.");
        require(repayQueue.length > 0, "Voting queue is empty.");
        InsurancePaymentRequest storage nextRequest = repayQueue[0];
        startVoteForRepay(nextRequest.insuranceContractAddress, nextRequest.reason);
        repayQueue.pop();
    }

    function vote(bool _approval) public _hasActiveRepayVote {
            require(!hasVotedForRepay[currentSession][msg.sender], "You have already voted.");

            // Check if the sender has enough stNEAR tokens to pay the fee
            require(stNear.balanceOf(msg.sender) >= voteFee, "Insufficient stNEAR balance for voting.");

            // Deduct the vote fee from the sender's stNEAR balance
            stNear.transferFrom(msg.sender, address(this), voteFee);

            uint256 currentVoteIndex = repay.length - 1;
            InsurancePayment storage currentVote = repay[currentVoteIndex];
            currentVote.totalVotes += 1;

            if (currentVote.positiveVotes <= approvalThreshold && _approval) {
                currentVote.positiveVotes += 1;
            }

            if (currentVote.positiveVotes > approvalThreshold && !currentVote.votingCompleted) {
                currentVote.votingCompleted = true;
                //TODO transfer money from contract to user
                hasActiveRepayVote = false;
                currentSession++;   

            
            if (repayQueue.length > 0) {
                processNextRepayVoteRequest();
            }
        }

        hasVotedForRepay[currentSession][msg.sender] = true;
    } 
}