/**
 * Verify deployed Sepolia contracts on Etherscan.
 * Requires ETHERSCAN_API_KEY in contracts/.env (or root .env).
 *
 * Usage: npm run verify:sepolia
 */
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const DEPLOYMENT_FILE = path.join(__dirname, "..", "deployments", "sepolia.json");

async function verify(name, address, constructorArguments = []) {
  console.log(`\nVerifying ${name} at ${address}...`);
  try {
    await hre.run("verify:verify", {
      address,
      constructorArguments,
    });
    console.log(`✅ ${name} verified`);
  } catch (error) {
    const msg = error.message || String(error);
    if (msg.includes("Already Verified") || msg.includes("already verified")) {
      console.log(`ℹ️  ${name} already verified`);
      return;
    }
    console.error(`❌ ${name} verification failed:`, msg);
    throw error;
  }
}

async function main() {
  if (!process.env.ETHERSCAN_API_KEY) {
    console.error(
      "ETHERSCAN_API_KEY is not set. Add it to contracts/.env (see .env.example)."
    );
    process.exitCode = 1;
    return;
  }

  if (!fs.existsSync(DEPLOYMENT_FILE)) {
    console.error(`Deployment file not found: ${DEPLOYMENT_FILE}`);
    console.error("Run `npm run deploy:sepolia` first.");
    process.exitCode = 1;
    return;
  }

  const deployment = JSON.parse(fs.readFileSync(DEPLOYMENT_FILE, "utf8"));
  const { addresses } = deployment;

  const {
    MockUSDC,
    ReputationStore,
    PlatformTreasury,
    JobRegistry,
    ArbitratorPanel,
    EscrowVault,
  } = addresses;

  await verify("MockUSDC", MockUSDC, []);
  await verify("ReputationStore", ReputationStore, []);
  await verify("PlatformTreasury", PlatformTreasury, [MockUSDC]);
  await verify("JobRegistry", JobRegistry, [ReputationStore]);
  await verify("ArbitratorPanel", ArbitratorPanel, [
    ReputationStore,
    JobRegistry,
    PlatformTreasury,
  ]);
  await verify("EscrowVault", EscrowVault, [
    MockUSDC,
    JobRegistry,
    PlatformTreasury,
    ArbitratorPanel,
    ReputationStore,
  ]);

  console.log("\nAll verification tasks finished.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
