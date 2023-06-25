// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SolInsurance{

    address public owner;
    address public repaymentAddress;
    uint256 public assetValue;

    constructor(address _owner,uint256 _assetValue,address _repaymentAddress){
        owner = _owner;
        assetValue = _assetValue;
        repaymentAddress = _repaymentAddress;
    }

    modifier _onlyRepaymentContract(){
        require(msg.sender == repaymentAddress,"Only repayment contract can call this function");
        _;
    }

    function repay(address userWallet) external _onlyRepaymentContract{

    }

}