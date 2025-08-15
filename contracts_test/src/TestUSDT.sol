// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ERC20}   from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TestUSDT is ERC20, Ownable {
    uint8 private immutable _decimals;

    constructor(uint256 initialSupply, uint8 decimals_)
        ERC20("Tether USD (Test)", "USDT")
        Ownable(msg.sender) // OZ v5: truyền owner lúc khởi tạo
    {
        _decimals = decimals_;
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
