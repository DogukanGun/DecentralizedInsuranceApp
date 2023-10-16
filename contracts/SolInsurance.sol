// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SolInsurance{

    address private _tokenAddress;
    address public owner;
    address public repaymentAddress;
    uint256 public assetValue;

    address public stNearTokenAddress;
    IERC20 public stNear;

    constructor(address _owner,uint256 _assetValue,address _repaymentAddress,address _stNearTokenAddress){
        owner = _owner;
        assetValue = _assetValue;
        repaymentAddress = _repaymentAddress;
        stNearTokenAddress = _stNearTokenAddress;
        stNear = IERC20(_stNearTokenAddress);
    }

    modifier _onlyRepaymentContract(){
        require(msg.sender == repaymentAddress,"Only repayment contract can call this function");
        _;
    }

    function repay(address userWallet) external _onlyRepaymentContract{
        stNear.transferFrom(address(this), userWallet, assetValue);
    }

}