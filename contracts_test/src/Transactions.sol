// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Transactions {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct TransferStruct {
        address from;
        address to;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] private transactions;

    function addToBlockchain(address payable to, string calldata message) external payable {
        require(msg.value > 0, "Send some ETH");
        transactions.push(TransferStruct(msg.sender, to, msg.value, message, block.timestamp));
        emit Transfer(msg.sender, to, msg.value, message, block.timestamp);

        (bool ok, ) = to.call{value: msg.value}("");
        require(ok, "ETH transfer failed");
    }

    function getAllTransactions() external view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionsCount() external view returns (uint256) {
        return transactions.length;
    }
}
