// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Test.sol";
import "../src/Transactions.sol";

contract TransactionsTest is Test {
    Transactions txs;
    address alice = address(0xA11CE);
    address bob   = address(0xB0B);

    function setUp() public {
        txs = new Transactions();
        vm.deal(alice, 10 ether);
    }

    function testAddAndRead() public {
        vm.prank(alice);
        txs.addToBlockchain(payable(bob), "hi");
        vm.deal(address(this), 1 ether);
        txs.addToBlockchain{value: 1 ether}(payable(bob), "gm"); // from this contract

        Transactions.TransferStruct[] memory arr = txs.getAllTransactions();
        assertEq(arr.length, 2);
        assertEq(arr[0].message, "hi");
        assertEq(arr[1].amount, 1 ether);
    }
}
