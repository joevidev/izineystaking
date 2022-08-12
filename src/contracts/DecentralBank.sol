// SPDX-License-Identifier: GPLv3
// Developed by: @joevidev
// v1.0.0

pragma solidity ^0.8.10;

import './IZIN.sol';
import './Tether.sol';

contract DecentralBank {

    string public name = 'Iziney Finance';
    address public owner;
    Tether public tether;
    IZIN public izin;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(IZIN _izin, Tether _tether) {
        izin = _izin;
        tether = _tether;
        owner = msg.sender;
    }

    // STAKING FUNCTION
    function depositTokens(uint _amount) public {
        require(_amount > 0, 'amount cannot be 0');
        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // UnStaking Function
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'Staking balance must be above 0');
        tether.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    // reward function
    function issueTokens() public {
        require(msg.sender == owner, 'Only the owner can make that call');
        for (uint i=0; i<stakers.length; i++) {
              address recipient = stakers[i];
              uint balance = stakingBalance[recipient] / 10;
              if(balance > 0) {
              izin.transfer(recipient, balance);
          }
        }
    }
    
    function airdropTokens(address _user, uint256 _amount) public {
        require(tether.balanceOf(address(this)) >= _amount && izin.balanceOf(address(this)) >= _amount, 'There is not enought tokens to airdrop');
        tether.transfer(_user ,  _amount);
        izin.transfer(_user ,  _amount);
    }

}