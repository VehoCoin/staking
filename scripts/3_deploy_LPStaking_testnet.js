const LPStaking = artifacts.require("LPStaking");
const DevMock = artifacts.require("DevMock");

const fromWei = web3.utils.fromWei;

const { ether } = require("@openzeppelin/test-helpers");

// const LPToken = "TOKEN_ADDRESS"; // uniswap V2, mDEV/ETH
// const LPToken = "TOKEN_ADDRESS"; // uniswap V2, mDEV/USDT
const LPToken = "TOKEN_ADDRESS"; // pancakeswap V2, mDEV/TBNB
const DEVTOKEN = "TOKEN_ADDRESS";

module.exports = async (deployer, network, accounts) => {
  const rewardPerBlock = await ether("0.2");

  console.log("Address owner: ", accounts[0]);
  // const devToken = await DevMock.deployed();
  const devToken = await DevMock.at(DEVTOKEN);

  await deployer.deploy(LPStaking, LPToken, devToken.address, accounts[0]);
  const staking = await LPStaking.deployed();

  await devToken.mintArbitrary(accounts[0], await ether("1000000"));
  await devToken.mintArbitrary(staking.address, await ether("2000000"));
  console.log('owner', await staking.owner());
  await staking.setRewards(
		rewardPerBlock,
		'14825520',
		'876000'
  );

  console.log("Address LP Staking contract: ", staking.address);
  console.log("Address LP Token: ", LPToken);
  console.log("Address DEVTOKEN Token: ", devToken.address);
  console.log("Address owner: ", accounts[0]);
  console.log("Owner balance: ", fromWei(await devToken.balanceOf(accounts[0])));
};
