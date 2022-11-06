// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    address public immutable owner;
    uint256 constant minimumUsd = 50 * 1e18;

    AggregatorV3Interface public priceFeed;
    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized request");
        _;
    }

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(
            getConversionRate(msg.value) >= minimumUsd,
            "Minimum funding is 50USD"
        );
        addressToAmountFunded[msg.sender] = msg.value;
        funders.push(msg.sender);
    }

    function withdraw() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);

        // reset all variables
        for (uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
    }

    function getConversionRate(uint256 _ethAmount)
        public
        view
        returns (uint256)
    {
        (, int256 price, , , ) = priceFeed.latestRoundData();

        uint256 ethPrice = uint256(price * 1e10);

        return (ethPrice * _ethAmount) / 1e18;
    }

    function retrieveBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
