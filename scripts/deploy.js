const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  const CertificationNFT = await hre.ethers.getContractFactory("CertificationNFT");
  const certificationNFT = await CertificationNFT.deploy(deployer.address);

  await certificationNFT.waitForDeployment();

  const address = await certificationNFT.getAddress();
  console.log("CertificationNFT deployed to:", address);
  
  console.log("\nNext steps:");
  console.log("1. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local with:", address);
  console.log("2. Verify the contract on Etherscan (if on testnet/mainnet)");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

