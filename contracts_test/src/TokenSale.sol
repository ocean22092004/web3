// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {IERC20}         from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable}        from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard}from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenSale is Ownable, ReentrancyGuard {
    IERC20  public immutable token;
    uint256 public rate; // tokens per 1 ETH (tính theo smallest unit)

    event Bought(address indexed buyer, address indexed to, uint256 ethIn, uint256 tokensOut);
    event RateUpdated(uint256 newRate);
    event WithdrawETH(address indexed to, uint256 amount);

    constructor(address token_, uint256 rate_) Ownable(msg.sender) {
        require(token_ != address(0), "token=0");
        require(rate_ > 0, "rate=0");
        token = IERC20(token_);
        rate  = rate_;
    }

    function setRate(uint256 newRate) external onlyOwner {
        require(newRate > 0, "rate=0");
        rate = newRate;
        emit RateUpdated(newRate);
    }

    function buy(address to) external payable nonReentrant {
        require(msg.value > 0, "Send ETH");
        uint256 tokensOut = (msg.value * rate) / 1e18;
        require(token.balanceOf(address(this)) >= tokensOut, "Not enough liquidity");
        address receiver = (to == address(0)) ? msg.sender : to;
        require(token.transfer(receiver, tokensOut), "transfer failed");
        emit Bought(msg.sender, receiver, msg.value, tokensOut);
    }

    function withdrawETH(address payable to, uint256 amount) external onlyOwner {
        (bool ok,) = to.call{value: amount}("");
        require(ok, "withdraw failed");
        emit WithdrawETH(to, amount);
    }

    receive() external payable {}
}
