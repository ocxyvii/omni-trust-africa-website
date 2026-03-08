import { ethers } from 'hardhat';

async function main() {
  // Chainlink ETH/USD Price Feed on Sepolia
  const SEPOLIA_ETH_USD_FEED = '0x694AA1769357215DE4FAC081bf1f309aDC325306';

  console.log('Deploying CoursePayment contract...');
  
  const CoursePayment = await ethers.getContractFactory('CoursePayment');
  const contract = await CoursePayment.deploy(SEPOLIA_ETH_USD_FEED);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`✅ CoursePayment deployed to: ${address}`);

  // Set course prices in USD cents
  console.log('Setting course prices...');
  await contract.setCoursePrice('web-security-101', 19900);
  await contract.setCoursePrice('network-security', 29900);
  await contract.setCoursePrice('penetration-testing-101', 39900);
  await contract.setCoursePrice('incident-response', 49900);

  console.log('✅ Course prices set!');
  console.log('\n👉 Add this to your .env:');
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main().catch(console.error);