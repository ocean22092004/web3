// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Script.sol";
import "../src/TestUSDT.sol";
import "../src/TokenSale.sol";

contract Deploy is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(pk);

        // 1,000,000 USDT (6 decimals)
        TestUSDT usdt = new TestUSDT(1_000_000 * 10**6, 6);

        // rate = 3000 USDT / 1 ETH  => 3000 * 10^6 (vì USDT 6 decimals)
        TokenSale sale = new TokenSale(address(usdt), 3_000_000_000);

        // nạp 600,000 USDT vào sale (owner chuyển token vào contract)
        usdt.transfer(address(sale), 600_000 * 10**6);

        vm.stopBroadcast();

        console2.log("USDT:", address(usdt));
        console2.log("SALE:", address(sale));
    }
}
