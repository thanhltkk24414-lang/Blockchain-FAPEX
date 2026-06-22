/**
 * Export contract ABIs from Hardhat artifacts to backend/src/abi/.
 * Run from repo root: npm run export-abis
 */
const fs = require("fs");
const path = require("path");

const CONTRACTS = [
  {
    name: "ReputationStore",
    artifact: "artifacts/contracts/FreelanceSystem.sol/ReputationStore.json",
  },
  {
    name: "PlatformTreasury",
    artifact: "artifacts/contracts/FreelanceSystem.sol/PlatformTreasury.json",
  },
  {
    name: "JobRegistry",
    artifact: "artifacts/contracts/FreelanceSystem.sol/JobRegistry.json",
  },
  {
    name: "ArbitratorPanel",
    artifact: "artifacts/contracts/FreelanceSystem.sol/ArbitratorPanel.json",
  },
  {
    name: "EscrowVault",
    artifact: "artifacts/contracts/FreelanceSystem.sol/EscrowVault.json",
  },
  {
    name: "MockUSDC",
    artifact: "artifacts/contracts/MockUSDC.sol/MockUSDC.json",
  },
];

const root = path.join(__dirname, "..");
const outDir = path.join(root, "backend", "src", "abi");

function main() {
  fs.mkdirSync(outDir, { recursive: true });

  let exported = 0;
  for (const { name, artifact } of CONTRACTS) {
    const artifactPath = path.join(root, artifact);
    if (!fs.existsSync(artifactPath)) {
      console.error(`Missing artifact: ${artifactPath}`);
      console.error("Run `npm run compile` first.");
      process.exitCode = 1;
      return;
    }

    const { abi } = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    if (!Array.isArray(abi) || abi.length === 0) {
      console.error(`Empty ABI for ${name}`);
      process.exitCode = 1;
      return;
    }

    const outFile = path.join(outDir, `${name}.json`);
    fs.writeFileSync(outFile, JSON.stringify(abi, null, 2));
    console.log(`Exported ${name}: ${abi.length} entries -> ${path.relative(root, outFile)}`);
    exported++;
  }

  console.log(`Done. Exported ${exported} ABI file(s) to backend/src/abi/`);
}

main();
