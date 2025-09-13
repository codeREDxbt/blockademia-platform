// 🔧 BLOCKCHAIN CONFIGURATION
// Update this file with your actual Monad testnet token details

export const BLOCKCHAIN_CONFIG = {
  // 🌐 MONAD TESTNET CONFIGURATION
  MONAD_TESTNET: {
    chainId: 666,
    chainIdHex: '0x29A',
    name: 'Monad Testnet',
    rpcUrl: 'https://testnet1.monad.xyz',
    blockExplorer: 'https://testnet-explorer.monad.xyz',
    nativeCurrency: {
      name: 'Monad',
      symbol: 'MON',
      decimals: 18,
    },
  },

  // 🪙 YOUR BLOCK TOKEN CONFIGURATION
  // TODO: Update these values with your deployed token details
  BLOCK_TOKEN: {
    // ⚠️ IMPORTANT: Replace with your actual token contract address
    // Mock address for development - replace with your real contract address
    address: '0x1234567890123456789012345678901234567890',
    name: 'Blockademia Token',
    symbol: 'BLOCK',
    decimals: 18,
    
    // Optional: If your token has special functions
    hasFaucetFunction: true, // Set to true if your contract has a faucet() function
    hasOwnerMint: false,     // Set to true if only owner can mint/transfer
    
    // Token economics for the learning platform
    rewards: {
      lessonCompletion: 50,      // BLOCK tokens per lesson
      courseCompletion: 200,     // BLOCK tokens per course
      levelUp: 100,              // BLOCK tokens per level up
      dailyStreak: 25,           // BLOCK tokens for daily learning
      achievementBonus: {
        min: 25,                 // Minimum achievement reward
        max: 500,                // Maximum achievement reward
      },
    },
  },
};

// 📋 ERC-20 ABI for token interactions
export const ERC20_ABI = [
  // Read functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function totalSupply() view returns (uint256)',
  
  // Write functions
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  
  // Optional faucet function (if your contract has one)
  'function faucet(address to, uint256 amount) returns (bool)',
  'function faucet(uint256 amount) returns (bool)',
  'function claim() returns (bool)',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
];

// 🛠️ DEPLOYMENT CHECKLIST
export const DEPLOYMENT_CHECKLIST = [
  '1. Deploy your BLOCK token contract to Monad testnet',
  '2. Update BLOCK_TOKEN.address in this file',
  '3. Test token transfer functions',
  '4. Verify contract on Monad explorer',
  '5. Fund the contract or set up faucet mechanism',
  '6. Test wallet connection with real users',
];

// 📝 QUICK SETUP GUIDE
export const SETUP_GUIDE = {
  title: 'Setting up your Monad testnet token',
  steps: [
    {
      step: 1,
      title: 'Get Monad testnet MON tokens',
      description: 'Visit Monad testnet faucet to get test MON tokens for gas fees',
      link: 'https://testnet-faucet.monad.xyz',
    },
    {
      step: 2,
      title: 'Deploy your BLOCK token contract',
      description: 'Deploy your ERC-20 token contract to Monad testnet',
      note: 'Make sure to include a faucet function for easy distribution',
    },
    {
      step: 3,
      title: 'Update configuration',
      description: 'Replace YOUR_TOKEN_CONTRACT_ADDRESS_HERE with your actual contract address',
      file: '/config/blockchain.ts',
    },
    {
      step: 4,
      title: 'Test the integration',
      description: 'Connect wallet, switch to Monad testnet, and test token distribution',
    },
  ],
};

// 🔍 HELPER FUNCTIONS
export const validateConfig = () => {
  const issues = [];
  const warnings = [];
  const isMockAddress = BLOCKCHAIN_CONFIG.BLOCK_TOKEN.address === '0x1234567890123456789012345678901234567890';
  const isPlaceholder = BLOCKCHAIN_CONFIG.BLOCK_TOKEN.address === 'YOUR_TOKEN_CONTRACT_ADDRESS_HERE';
  
  // Critical errors (prevent functionality)
  if (isPlaceholder) {
    issues.push('⚠️ Token contract address not set - using placeholder');
  }
  
  if (!BLOCKCHAIN_CONFIG.BLOCK_TOKEN.address.startsWith('0x') && !isPlaceholder) {
    issues.push('⚠️ Invalid contract address format - must start with 0x');
  }
  
  if (BLOCKCHAIN_CONFIG.BLOCK_TOKEN.address.length !== 42 && !isPlaceholder) {
    issues.push('⚠️ Contract address should be 42 characters long');
  }
  
  // Development warnings (non-critical)
  if (isMockAddress) {
    warnings.push('🔧 Using mock contract address for development');
  }
  
  return {
    isValid: issues.length === 0,
    isProduction: !isMockAddress && !isPlaceholder,
    isMock: isMockAddress,
    issues,
    warnings,
  };
};

export default BLOCKCHAIN_CONFIG;
