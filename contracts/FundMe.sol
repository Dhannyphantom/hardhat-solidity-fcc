// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    address public owner;
    uint256 minimumUsd = 50 * 1e18;

    constructor() {
        owner = msg.sender;
    }

    // function fund() public payable {

    // }

    function getPrice() public view returns (uint256) {
        // gets the price of eth -> usd
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price * 1e10); // converts the price in 8 decimals to 18 -> 1eth in wei
    }

    function getConversionRate(uint256 _amountInWei)
        public
        view
        returns (uint256)
    {
        return getPrice() * _amountInWei; // wei -> USD
    }

    function retrieveBalance() public view returns (uint256) {
        return owner.balance;
    }
}
