'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';
import { motion } from 'framer-motion';
import Bottle3DViewer from './Bottle3DViewer';

// Smart Contract ABI - Update with your deployed contract address
const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'string', name: 'tokenURI', type: 'string' },
      { internalType: 'string', name: 'bottleType', type: 'string' },
      { internalType: 'string', name: 'serialNumber', type: 'string' },
    ],
    name: 'mintCertification',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Update this with your deployed contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

const BOTTLE_TYPES = {
  still: 'Pure Spring',
  sparkling: 'Sparkling Crest',
  'extra-sparkling': 'Alpine Burst',
};

export default function MintInterface() {
  const { address, isConnected } = useAccount();
  const [bottleType, setBottleType] = useState<string>('still');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [labelImage, setLabelImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [depthMap, setDepthMap] = useState<File | null>(null);
  const [depthMapPreview, setDepthMapPreview] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [tokenId, setTokenId] = useState<string | null>(null);

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: confirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    // Get bottle type from URL params
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type && BOTTLE_TYPES[type as keyof typeof BOTTLE_TYPES]) {
      setBottleType(type);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLabelImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDepthMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDepthMap(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDepthMapPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToIPFS = async (file: File): Promise<string> => {
    // For production, use a proper IPFS service like Pinata, NFT.Storage, or Web3.Storage
    // This is a placeholder - you'll need to implement actual IPFS upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Example using NFT.Storage or similar service
      // const response = await fetch('YOUR_IPFS_UPLOAD_ENDPOINT', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // return data.ipfsHash;

      // For now, return a placeholder
      return 'ipfs://placeholder-hash';
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  };

  const createMetadata = async (): Promise<string> => {
    if (!labelImage) throw new Error('No image selected');

    const imageHash = await uploadToIPFS(labelImage);

    const metadata = {
      name: `Fonti San Bernardino - ${BOTTLE_TYPES[bottleType as keyof typeof BOTTLE_TYPES]} Certification`,
      description: `Certified NFT for ${BOTTLE_TYPES[bottleType as keyof typeof BOTTLE_TYPES]} bottle. Serial Number: ${serialNumber || 'N/A'}`,
      image: imageHash,
      attributes: [
        { trait_type: 'Bottle Type', value: BOTTLE_TYPES[bottleType as keyof typeof BOTTLE_TYPES] },
        { trait_type: 'Serial Number', value: serialNumber || 'N/A' },
        { trait_type: 'Certification Date', value: new Date().toISOString() },
        { trait_type: 'Brand', value: 'Fonti San Bernardino' },
        { trait_type: 'Origin', value: 'Swiss Alps' },
      ],
    };

    // Upload metadata to IPFS
    // In production, upload this JSON to IPFS and return the hash
    return 'ipfs://metadata-hash';
  };

  const handleMint = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!labelImage) {
      alert('Please upload a label image');
      return;
    }

    if (!serialNumber.trim()) {
      alert('Please enter a serial number');
      return;
    }

    setMinting(true);
    setMintSuccess(false);

    try {
      const tokenURI = await createMetadata();

      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'mintCertification',
        args: [address, tokenURI, bottleType, serialNumber],
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Error minting NFT. Please try again.');
      setMinting(false);
    }
  };

  useEffect(() => {
    if (confirmed) {
      setMinting(false);
      setMintSuccess(true);
      // In a real implementation, you would get the tokenId from the transaction receipt
      setTokenId('1'); // Placeholder
    }
  }, [confirmed]);

  if (!isConnected) {
    return (
      <div className="bg-transparent backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20">
        <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Connetti il tuo Wallet</h2>
        <p className="text-white mb-6 drop-shadow-md">
          Connetti il tuo wallet per iniziare a certificare le tue bottiglie come NFT
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="bg-transparent backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
      {mintSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Certificazione Creata con Successo!
          </h2>
          <p className="text-white mb-4 drop-shadow-md">
            Il tuo NFT è stato creato sulla blockchain
          </p>
          {tokenId && (
            <p className="text-sm text-white drop-shadow-sm">
              Token ID: {tokenId}
            </p>
          )}
          <button
            onClick={() => {
              setMintSuccess(false);
              setSerialNumber('');
              setLabelImage(null);
              setImagePreview(null);
              setDepthMap(null);
              setDepthMapPreview(null);
            }}
            className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Certifica un'altra Bottiglia
          </button>
        </motion.div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">Certifica la tua Bottiglia</h2>

          {/* 3D Preview */}
          {(imagePreview || depthMapPreview) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white drop-shadow-md">Anteprima 3D</h3>
              <Bottle3DViewer
                bottleType={bottleType as 'still' | 'sparkling' | 'extra-sparkling'}
                depthMapUrl={depthMapPreview || undefined}
                labelImageUrl={imagePreview || undefined}
                showControls={true}
              />
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2 drop-shadow-sm">
                Tipo di Bottiglia
              </label>
              <select
                value={bottleType}
                onChange={(e) => setBottleType(e.target.value)}
                className="w-full px-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
              >
                <option value="still">Pure Spring (Still)</option>
                <option value="sparkling">Sparkling Crest (Sparkling)</option>
                <option value="extra-sparkling">Alpine Burst (Extra Sparkling)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 drop-shadow-sm">
                Numero di Serie
              </label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Inserisci il numero di serie della bottiglia"
                className="w-full px-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 drop-shadow-sm">
                Immagine Etichetta
              </label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="label-upload"
                />
                <label
                  htmlFor="label-upload"
                  className="cursor-pointer block"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Label preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <div>
                      <svg
                        className="mx-auto h-12 w-12 text-white/70"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-white drop-shadow-sm">
                        Clicca per caricare l'immagine dell'etichetta
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 drop-shadow-sm">
                Depth Map (Opzionale) - Per creare un modello 3D dettagliato
              </label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDepthMapChange}
                  className="hidden"
                  id="depthmap-upload"
                />
                <label
                  htmlFor="depthmap-upload"
                  className="cursor-pointer block"
                >
                  {depthMapPreview ? (
                    <div>
                      <img
                        src={depthMapPreview}
                        alt="Depth map preview"
                        className="max-w-full max-h-48 mx-auto rounded-lg mb-2"
                      />
                      <p className="text-xs text-white drop-shadow-sm">Depth map caricata</p>
                    </div>
                  ) : (
                    <div>
                      <svg
                        className="mx-auto h-10 w-10 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-white drop-shadow-sm">
                        Carica una depth map per un modello 3D più dettagliato
                      </p>
                      <p className="mt-1 text-xs text-white drop-shadow-sm">
                        (Immagine in scala di grigi che rappresenta la profondità)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/80 backdrop-blur-sm border border-red-300 text-white px-4 py-3 rounded-lg drop-shadow-md">
                Errore: {error.message}
              </div>
            )}

            <button
              onClick={handleMint}
              disabled={minting || isPending || isConfirming || !labelImage || !serialNumber}
              className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {minting || isPending || isConfirming
                ? 'Certificazione in corso...'
                : 'Certifica come NFT'}
            </button>

            <p className="text-sm text-white text-center drop-shadow-sm">
              La certificazione verrà creata come NFT sulla blockchain Ethereum.
              Potrebbero essere necessarie alcune commissioni di rete (gas fees).
            </p>
          </div>
        </>
      )}
    </div>
  );
}

