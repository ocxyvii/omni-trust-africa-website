// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title CoursePayment
 * @notice OmniTrust Africa — pay for courses in ETH,
 *         priced in USD using Chainlink ETH/USD Price Feed.
 * @dev Uses Chainlink Data Feeds on Sepolia testnet.
 *      Price Feed address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
 */
contract CoursePayment {
    AggregatorV3Interface public immutable priceFeed;
    address public owner;

    mapping(string => uint256) public coursePrices;
    mapping(address => mapping(string => bool)) public enrollments;

    event CoursePurchased(
        address indexed buyer,
        string courseId,
        uint256 usdPrice,
        uint256 ethPaid,
        int256 ethUsdPrice
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _priceFeed) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function getLatestPrice() public view returns (int256) {
        (, int256 price,, uint256 updatedAt,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        require(updatedAt > block.timestamp - 3600, "Price stale");
        return price;
    }

    function getEthAmount(uint256 usdCents) public view returns (uint256) {
        int256 ethUsdPrice = getLatestPrice();
        return (usdCents * 1e18 * 1e8) / (uint256(ethUsdPrice) * 100);
    }

    function setCoursePrice(string memory courseId, uint256 usdCents) external onlyOwner {
        coursePrices[courseId] = usdCents;
    }

    function purchaseCourse(string memory courseId) external payable {
        require(coursePrices[courseId] > 0, "Course not found");
        require(!enrollments[msg.sender][courseId], "Already enrolled");

        uint256 requiredEth = getEthAmount(coursePrices[courseId]);
        require(msg.value >= (requiredEth * 98) / 100, "Insufficient payment");

        if (msg.value > requiredEth) {
            payable(msg.sender).transfer(msg.value - requiredEth);
        }

        enrollments[msg.sender][courseId] = true;

        emit CoursePurchased(msg.sender, courseId, coursePrices[courseId], msg.value, getLatestPrice());
    }

    function isEnrolled(address user, string memory courseId) external view returns (bool) {
        return enrollments[user][courseId];
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}