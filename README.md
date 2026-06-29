# Fapex

**FAPEX** — nền tảng freelance Web3 với escrow on-chain (MockUSDC), IPFS, SIWE, và tranh chấp qua arbitrator có stake trên **Ethereum Sepolia**.

> **English:** Web3 freelance escrow dApp — clients fund jobs on-chain, freelancers deliver via IPFS, disputes resolved by a staked commit–reveal arbitrator panel.

**Cập nhật:** 2026-06-30

---

## Monorepo

| Thư mục | Repo | Mô tả |
|---------|------|--------|
| [`contracts/`](contracts/) | blockchain-contracts | Solidity + Hardhat (submodule) |
| [`backend/`](backend/) | blockchain-backend | Node API, indexer, Pinata IPFS |
| [`frontend/`](frontend/) | blockchain-frontend | Vite + React 19 + wagmi |
| [`docs/`](docs/) | Blockchain-docs | Báo cáo, manual, demo script |

```bash
git clone --recurse-submodules https://github.com/thanhltkk24414-lang/Blockchain.git
cd Blockchain && git checkout dev
```

---

## Chạy nhanh (local)

```bash
# Contracts (root)
npm install && npm run compile

# Backend
cd backend && npm install && cp .env.example .env && npm run dev

# Frontend
cd frontend && npm install && cp .env.example .env && npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://127.0.0.1:5000 (`/health`, `/api/config`) |

---

## Sepolia

Địa chỉ deploy: [`deployments/sepolia.json`](deployments/sepolia.json) · `disputeTimings: demo`

| Contract | Address |
|----------|---------|
| MockUSDC | `0x2293193Eaa5CE5253d5e081046a06dB077f26f8e` |
| JobRegistry | `0x302629f82d51b0972ffc3A99cbE355F4acEf908d` |
| EscrowVault | `0x5f8C4c552F49103cA84dF455571155C8268C2aF5` |
| ArbitratorPanel | `0x490Afc952af85aB0dEb375Bd36A65db5E1F47418` |

```bash
npm run deploy:sepolia       # demo dispute timings (phút)
npm run deploy:sepolia:prod  # production timings (giờ)
npm run seed:arbitrators     # pool ≥5 dispute; ≥10 cho appeal
npm run check:dispute
```

**Demo dispute windows:** evidence 0–10 min · commit 10–13 · reveal 13–16 · appeal 30 min

---

## Production

| Dịch vụ | URL |
|---------|-----|
| **Backend** | https://fapex-backend-production.up.railway.app |
| **Frontend** | Vercel (`*.vercel.app`) |
| **CORS** | `ALLOWED_ORIGINS` gồm `https://*.vercel.app` |

---

## Tài liệu

**Index đầy đủ:** [docs/README.md](docs/README.md)

| Tài liệu | Link |
|----------|------|
| Tổng quan | [docs/guides/overview-vi.md](docs/guides/overview-vi.md) |
| Tech stack | [docs/guides/tech-stack-vi.md](docs/guides/tech-stack-vi.md) |
| Báo cáo dự án | [docs/guides/project-report-vi.md](docs/guides/project-report-vi.md) |
| Thiết kế hệ thống | [docs/guides/system-design-vi.md](docs/guides/system-design-vi.md) |
| Manual | [docs/guides/manual-vi.md](docs/guides/manual-vi.md) |
| Luồng E2E | [docs/guides/workflow-e2e-vi.md](docs/guides/workflow-e2e-vi.md) |
| Demo script | [docs/guides/demo-script-vi.md](docs/guides/demo-script-vi.md) |
| Q&A phòng vấn | [docs/guides/demo-qa-defense-vi.md](docs/guides/demo-qa-defense-vi.md) |
| Cơ chế nền tảng | [docs/guides/platform-mechanisms-vi.md](docs/guides/platform-mechanisms-vi.md) |
| Governance roles | [docs/guides/admin-roles-vi.md](docs/guides/admin-roles-vi.md) |
| Chainlink | [docs/guides/chainlink-integration-vi.md](docs/guides/chainlink-integration-vi.md) |
| Audit matrix | [docs/guides/issue-audit-status-vi.md](docs/guides/issue-audit-status-vi.md) |

---

## Tech stack (tóm tắt)

| Lớp | Stack |
|-----|-------|
| Contracts | Solidity 0.8.20, Hardhat, OpenZeppelin patterns |
| Backend | Node, Express, MongoDB, Socket.io, SIWE, ethers indexer, Pinata |
| Frontend | Vite, React 19, wagmi, RainbowKit, Tailwind (English UI) |
| Chain | Sepolia · Chainlink documented (VRF v2 deferred) |
