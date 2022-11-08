const Staking = artifacts.require("Staking");
const DevMock = artifacts.require("DevMock");

const fromWei = web3.utils.fromWei;

const { ether } = require("@openzeppelin/test-helpers");
const DEVTOKEN = "TOKEN_ADDRESS";

module.exports = async (deployer, network, accounts) => {
  const rewardPerBlock = await ether("0.5");

  console.log("Address owner: ", accounts[0]);
  const token = await DevMock.at(DEVTOKEN);

  await deployer.deploy(Staking, token.address, token.address, accounts[0]);
  const staking = await Staking.deployed();

  await token.mintArbitrary(accounts[0], await ether("1000000"));
  await token.mintArbitrary(staking.address, await ether("1000000"));
  console.log('owner', await staking.owner());
  await staking.setRewards(
		rewardPerBlock,
		'14825520',
		'876000'
  );

  await token.approve(staking.address, await ether("125000000"));
  await staking.stake(await ether("125000"));

  console.log("Address Staking contract: ", staking.address);
  console.log("Address Token: ", token.address);
  console.log("Address owner: ", accounts[0]);
  console.log("Owner balance: ", fromWei(await token.balanceOf(accounts[0])));
};
