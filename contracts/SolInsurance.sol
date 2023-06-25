// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SolInsurance{

    address public owner;
    uint256 public assetValue;

    constructor(address _owner,uint256 _assetValue){
        owner = _owner;
        assetValue = _assetValue;
    }

}