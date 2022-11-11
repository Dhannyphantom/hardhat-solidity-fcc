// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error FundMe__NotOwner();
error FundMe__LowETH();

contract FundMe {
    address public immutable owner;
    uint256 constant minimumUsd = 50 * 1e18;

    AggregatorV3Interface public s_priceFeed;
    mapping(address => uint256) public s_addressToAmountFunded;
    address[] public s_funders;

    modifier onlyOwner() {
        if (msg.sender != owner) revert FundMe__NotOwner();
        _;
    }

    constructor(address s_priceFeedAddress) {
        owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(s_priceFeedAddress);
    }

    function fund() public payable {
        if (getConversionRate(msg.value) < minimumUsd) revert FundMe__LowETH();
        s_addressToAmountFunded[msg.sender] = msg.value;
        s_funders.push(msg.sender);
    }

    function withdraw() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);

        address[] memory funders = s_funders;

        // reset all variables
        for (uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            s_addressToAmountFunded[funder] = 0;
        }

        s_funders = new address[](0);
    }

    function getConversionRate(uint256 _ethAmount)
        public
        view
        returns (uint256)
    {
        (, int256 price, , , ) = s_priceFeed.latestRoundData();

        uint256 ethPrice = uint256(price * 1e10);

        return (ethPrice * _ethAmount) / 1e18;
    }

    function getFunder(uint256 _index) public view returns (address) {
        return s_funders[_index];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }

    function getAddressToAmountFunded(address _address)
        public
        view
        returns (uint256)
    {
        return s_addressToAmountFunded[_address];
    }
}
