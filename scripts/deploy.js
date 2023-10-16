const { ethers } = require('hardhat');

async function main() {
  // Retrieve the contract factory
  const Voting = await ethers.getContractFactory('Voting');

  // Define the constructor arguments 
  const stNearTokenAddress = '0xe09D8aDae1141181f4CddddeF97E4Cf68f5436E6'; // Aurora testnet faucet token
  const approvalThreshold = 2; 
  const voteFee = '0.0001'; 

  const weiEquivalent = ethers.utils.parseEther(voteFee);
  // Deploy the contract
  const voting = await Voting.deploy(stNearTokenAddress, approvalThreshold, weiEquivalent);

  console.log('Voting deployed to:', voting.address);


//     // Retrieve the contract Insurance
//     const Insurance = await ethers.getContractFactory('SolInsurance');

//     // Deploy the contract
//     const insurance = await Insurance.deploy();

//     console.log('Insurance deployed to:', insurance.address);

      // Retrieve the contract Repayment
  const Repayment = await ethers.getContractFactory('Repayment');

  // Deploy the contract
  const repayment = await Repayment.deploy(stNearTokenAddress, approvalThreshold, weiEquivalent);

  console.log('Repayment deployed to:', repayment.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});