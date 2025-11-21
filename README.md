# Fonti San Bernardino - Web3 Certification Platform

A Web3 application that allows users to mint NFT certifications for Fonti San Bernardino bottle labels, ensuring authenticity and traceability on the blockchain.

## Features

- 🏔️ **Brand Showcase**: Beautiful homepage showcasing the three water types (Pure Spring, Sparkling Crest, Alpine Burst)
- 🎨 **NFT Minting**: Mint certification NFTs from bottle labels
- 🔗 **Web3 Integration**: Connect with MetaMask and other wallets via RainbowKit
- 📱 **Responsive Design**: Modern, elegant UI matching the brand aesthetic
- 🌱 **Sustainability Focus**: Highlighting the brand's commitment to sustainability
- 🎯 **3D Visualization**: Interactive 3D bottle models with GLB/GLTF support
- 🤖 **AI 3D Generation**: Integration with Tencent Hunyuan3D for AI-generated 3D models

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: Wagmi, Viem, RainbowKit
- **Animations**: Framer Motion
- **Smart Contracts**: Solidity (OpenZeppelin)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+ (for 3D generation API - optional)
- MetaMask or another Web3 wallet
- WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sbern
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your:
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- `NEXT_PUBLIC_CONTRACT_ADDRESS` (after deploying the smart contract)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Optional: Set up 3D Generation API

If you want to use AI-powered 3D model generation:

1. Navigate to the 3D folder:
```bash
cd 3D
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. (Optional) Set up Hugging Face token:
```bash
cp .env.example .env
# Edit .env and add your HF_TOKEN
```

4. Start the API server:
```bash
python api_server.py
# Or use the script:
./start_server.sh
```

The API server will run on `http://localhost:8000`

## Smart Contract Deployment

### Prerequisites

- Hardhat or Foundry installed
- Test ETH for deployment

### Deploy Steps

1. Install OpenZeppelin contracts:
```bash
npm install @openzeppelin/contracts
```

2. Compile the contract:
```bash
npx hardhat compile
```

3. Deploy to your network (e.g., Sepolia testnet):
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

4. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local` with the deployed address

## IPFS Setup

For storing NFT metadata and images, you'll need to set up an IPFS service. Options:

1. **NFT.Storage** (Recommended for beginners)
   - Sign up at [nft.storage](https://nft.storage)
   - Get your API key
   - Add to `.env.local`

2. **Pinata**
   - Sign up at [pinata.cloud](https://pinata.cloud)
   - Get API keys
   - Add to `.env.local`

3. **Web3.Storage**
   - Sign up at [web3.storage](https://web3.storage)
   - Get your API key
   - Add to `.env.local`

Then implement the IPFS upload function in `components/MintInterface.tsx`.

## Project Structure

```
sbern/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── mint/
│   │   └── page.tsx        # NFT minting page
│   ├── api/
│   │   └── hunyuan3d/     # Hunyuan3D API proxy
│   ├── providers.tsx       # Web3 providers setup
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── Products.tsx        # Product showcase
│   ├── Sustainability.tsx  # Sustainability section
│   ├── MintInterface.tsx   # NFT minting interface
│   ├── Bottle3D.tsx        # 3D bottle visualization
│   ├── Bottle3DViewer.tsx  # 3D viewer component
│   ├── Hunyuan3DGenerator.tsx # AI 3D generator
│   └── Footer.tsx          # Footer
├── 3D/                     # Python API server
│   ├── hunyuan3d_api.py    # Hunyuan3D client
│   ├── api_server.py       # FastAPI server
│   └── requirements.txt    # Python dependencies
├── contracts/
│   └── CertificationNFT.sol # Smart contract
├── lib/
│   ├── contracts.ts        # Contract ABI and config
│   └── hunyuan3d.ts        # Hunyuan3D TypeScript client
├── public/
│   └── models/             # 3D model files (GLB/GLTF)
└── package.json
```

## Features to Implement

- [ ] Complete IPFS integration for image and metadata upload
- [ ] View user's minted NFTs
- [ ] NFT marketplace integration
- [ ] QR code generation for bottle labels
- [ ] Batch minting for retailers
- [ ] Analytics dashboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email info@fsb-sa.ch or open an issue in the repository.

