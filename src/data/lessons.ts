// Interactive Lesson Content with Real-Time Tasks
export interface LessonTask {
  id: string;
  type: 'code' | 'quiz' | 'interactive' | 'simulation' | 'drag-drop';
  title: string;
  description: string;
  points: number;
  timeLimit?: number; // in minutes
  content: any; // Specific content based on type
}

export interface LessonContent {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number; // in minutes
  tasks: LessonTask[];
  rewards: {
    xp: number;
    tokens: number;
  };
  prerequisites?: string[];
}

// Import comprehensive lessons
import comprehensiveLessons from './comprehensive-lessons';

// Real-time interactive lesson content with comprehensive educational material
export const lessonContent: LessonContent[] = [
  // Include all comprehensive lessons
  ...comprehensiveLessons,
  // Blockchain Fundamentals - Interactive Lessons
  {
    id: 'what-is-blockchain',
    courseId: 'blockchain-fundamentals',
    moduleId: 'intro',
    title: 'What is Blockchain?',
    description: 'Interactive introduction to blockchain technology with real-time simulations',
    duration: 25,
    tasks: [
      {
        id: 'blockchain-definition',
        type: 'quiz',
        title: 'Blockchain Basics Quiz',
        description: 'Test your understanding of blockchain fundamentals',
        points: 50,
        timeLimit: 10,
        content: {
          questions: [
            {
              id: 'q1',
              question: 'What is a blockchain?',
              options: [
                'A distributed ledger technology',
                'A type of cryptocurrency',
                'A computer programming language',
                'A social media platform'
              ],
              correct: 0,
              explanation: 'A blockchain is a distributed ledger technology that maintains a continuously-growing list of records, called blocks.'
            },
            {
              id: 'q2',
              question: 'What makes blockchain secure?',
              options: [
                'Passwords',
                'Cryptographic hashing',
                'User permissions',
                'Cloud storage'
              ],
              correct: 1,
              explanation: 'Cryptographic hashing ensures the integrity and immutability of data in a blockchain.'
            },
            {
              id: 'q3',
              question: 'Who controls a decentralized blockchain?',
              options: [
                'The government',
                'A single company',
                'Network participants collectively',
                'The blockchain creator'
              ],
              correct: 2,
              explanation: 'In a decentralized blockchain, no single entity has control; instead, the network participants collectively maintain the system.'
            }
          ]
        }
      },
      {
        id: 'block-structure',
        type: 'interactive',
        title: 'Build a Block',
        description: 'Create your own blockchain block and understand its structure',
        points: 75,
        timeLimit: 15,
        content: {
          simulation: 'block-builder',
          steps: [
            {
              step: 1,
              instruction: 'Add transaction data to your block',
              action: 'drag-transactions',
              validation: 'minimum-3-transactions'
            },
            {
              step: 2,
              instruction: 'Generate a hash for your block',
              action: 'calculate-hash',
              validation: 'valid-hash-format'
            },
            {
              step: 3,
              instruction: 'Link to the previous block',
              action: 'set-previous-hash',
              validation: 'correct-previous-hash'
            },
            {
              step: 4,
              instruction: 'Add timestamp and nonce',
              action: 'complete-block',
              validation: 'valid-block-structure'
            }
          ]
        }
      },
      {
        id: 'chain-simulation',
        type: 'simulation',
        title: 'Blockchain Network Simulation',
        description: 'Watch how blocks are added to a blockchain network in real-time',
        points: 100,
        content: {
          simulationType: 'network-consensus',
          parameters: {
            nodes: 5,
            transactionRate: 2,
            blockTime: 10,
            consensusType: 'proof-of-work'
          },
          interactions: [
            'add-transaction',
            'mine-block',
            'broadcast-block',
            'validate-block'
          ]
        }
      }
    ],
    rewards: {
      xp: 225,
      tokens: 50
    }
  },

  // Smart Contract Development - Advanced Interactive Lessons
  {
    id: 'first-contract',
    courseId: 'blockchain-intermediate',
    moduleId: 'smart-contracts-intro',
    title: 'Deploy Your First Contract',
    description: 'Write, compile, and deploy a smart contract with real-time feedback',
    duration: 50,
    tasks: [
      {
        id: 'write-contract',
        type: 'code',
        title: 'Write a Simple Token Contract',
        description: 'Create an ERC-20 token contract using Solidity',
        points: 150,
        timeLimit: 30,
        content: {
          language: 'solidity',
          template: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        // TODO: Mint initial supply to the deployer
        // Hint: Use _mint(address, amount)
    }
    
    function mint(address to, uint256 amount) public {
        // TODO: Add access control
        // TODO: Mint tokens to the specified address
    }
}`,
          solution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`,
          tests: [
            {
              name: 'Contract compiles successfully',
              type: 'compilation'
            },
            {
              name: 'Initial supply is minted',
              type: 'assertion',
              condition: 'totalSupply() > 0'
            },
            {
              name: 'Mint function works',
              type: 'function-call',
              function: 'mint',
              params: ['0x123...', '1000']
            }
          ]
        }
      },
      {
        id: 'deploy-contract',
        type: 'interactive',
        title: 'Deploy to Testnet',
        description: 'Deploy your contract to a real testnet and interact with it',
        points: 200,
        content: {
          simulation: 'contract-deployment',
          network: 'monad-testnet',
          steps: [
            {
              step: 1,
              instruction: 'Connect your wallet to Monad testnet',
              action: 'connect-wallet',
              validation: 'wallet-connected'
            },
            {
              step: 2,
              instruction: 'Compile your contract',
              action: 'compile-contract',
              validation: 'compilation-successful'
            },
            {
              step: 3,
              instruction: 'Deploy to testnet',
              action: 'deploy-contract',
              validation: 'deployment-successful'
            },
            {
              step: 4,
              instruction: 'Verify contract on explorer',
              action: 'verify-contract',
              validation: 'contract-verified'
            }
          ]
        }
      }
    ],
    rewards: {
      xp: 350,
      tokens: 100
    }
  },

  // Web3 Frontend - Interactive UI Building
  {
    id: 'first-web3-app',
    courseId: 'web3-frontend-basics',
    moduleId: 'react-web3',
    title: 'Build Your First Web3 App',
    description: 'Create a React app that connects to blockchain networks',
    duration: 60,
    tasks: [
      {
        id: 'setup-react-app',
        type: 'code',
        title: 'Setup Web3 React App',
        description: 'Initialize a React app with Web3 dependencies',
        points: 100,
        content: {
          language: 'typescript',
          template: `import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  
  const connectWallet = async () => {
    // TODO: Check if MetaMask is installed
    // TODO: Request account access
    // TODO: Get the connected account
    // TODO: Get the account balance
  };
  
  return (
    <div className="App">
      <h1>My First Web3 App</h1>
      {/* TODO: Add wallet connection UI */}
      {/* TODO: Display account and balance */}
    </div>
  );
}

export default App;`,
          solution: `import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        
        setAccount(address);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };
  
  return (
    <div className="App">
      <h1>My First Web3 App</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}

export default App;`,
          tests: [
            {
              name: 'App component renders',
              type: 'render'
            },
            {
              name: 'Connect wallet function exists',
              type: 'function-exists',
              function: 'connectWallet'
            },
            {
              name: 'Displays account when connected',
              type: 'conditional-render',
              condition: 'account-connected'
            }
          ]
        }
      },
      {
        id: 'wallet-integration',
        type: 'interactive',
        title: 'Test Wallet Integration',
        description: 'Test your Web3 app with real wallet connections',
        points: 150,
        content: {
          simulation: 'wallet-testing',
          steps: [
            {
              step: 1,
              instruction: 'Run your React app',
              action: 'start-dev-server',
              validation: 'app-running'
            },
            {
              step: 2,
              instruction: 'Click connect wallet button',
              action: 'click-connect',
              validation: 'metamask-prompt'
            },
            {
              step: 3,
              instruction: 'Approve wallet connection',
              action: 'approve-connection',
              validation: 'wallet-connected'
            },
            {
              step: 4,
              instruction: 'Verify account display',
              action: 'check-display',
              validation: 'account-shown'
            }
          ]
        }
      }
    ],
    rewards: {
      xp: 250,
      tokens: 75
    }
  },

  // DeFi Development - Advanced Interactive Tasks
  {
    id: 'build-dex',
    courseId: 'defi-intermediate',
    moduleId: 'dex-development',
    title: 'Build Mini DEX',
    description: 'Create a simple decentralized exchange with automated market maker',
    duration: 150,
    tasks: [
      {
        id: 'amm-contract',
        type: 'code',
        title: 'AMM Smart Contract',
        description: 'Implement an automated market maker contract',
        points: 300,
        timeLimit: 90,
        content: {
          language: 'solidity',
          template: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SimpleDEX is ReentrancyGuard {
    IERC20 public tokenA;
    IERC20 public tokenB;
    
    uint256 public reserveA;
    uint256 public reserveB;
    
    mapping(address => uint256) public liquidity;
    uint256 public totalLiquidity;
    
    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }
    
    function addLiquidity(uint256 amountA, uint256 amountB) external nonReentrant {
        // TODO: Implement liquidity addition logic
        // Hint: Calculate liquidity tokens to mint
        // Hint: Transfer tokens from user
        // Hint: Update reserves
    }
    
    function swap(uint256 amountIn, bool AforB) external nonReentrant {
        // TODO: Implement swap logic using constant product formula
        // Hint: x * y = k formula
        // Hint: Calculate output amount with fee
        // Hint: Update reserves
    }
    
    function getAmountOut(uint256 amountIn, bool AforB) public view returns (uint256) {
        // TODO: Calculate output amount for given input
        // Hint: Use constant product formula
    }
}`,
          solution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SimpleDEX is ReentrancyGuard {
    IERC20 public tokenA;
    IERC20 public tokenB;
    
    uint256 public reserveA;
    uint256 public reserveB;
    
    mapping(address => uint256) public liquidity;
    uint256 public totalLiquidity;
    
    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }
    
    function addLiquidity(uint256 amountA, uint256 amountB) external nonReentrant {
        require(amountA > 0 && amountB > 0, "Amounts must be greater than 0");
        
        uint256 liquidityToMint;
        
        if (totalLiquidity == 0) {
            liquidityToMint = sqrt(amountA * amountB);
        } else {
            liquidityToMint = min(
                (amountA * totalLiquidity) / reserveA,
                (amountB * totalLiquidity) / reserveB
            );
        }
        
        require(liquidityToMint > 0, "Insufficient liquidity minted");
        
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
        
        liquidity[msg.sender] += liquidityToMint;
        totalLiquidity += liquidityToMint;
        
        reserveA += amountA;
        reserveB += amountB;
    }
    
    function swap(uint256 amountIn, bool AforB) external nonReentrant {
        require(amountIn > 0, "Amount must be greater than 0");
        
        uint256 amountOut = getAmountOut(amountIn, AforB);
        require(amountOut > 0, "Insufficient output amount");
        
        if (AforB) {
            tokenA.transferFrom(msg.sender, address(this), amountIn);
            tokenB.transfer(msg.sender, amountOut);
            reserveA += amountIn;
            reserveB -= amountOut;
        } else {
            tokenB.transferFrom(msg.sender, address(this), amountIn);
            tokenA.transfer(msg.sender, amountOut);
            reserveB += amountIn;
            reserveA -= amountOut;
        }
    }
    
    function getAmountOut(uint256 amountIn, bool AforB) public view returns (uint256) {
        require(amountIn > 0, "Amount must be greater than 0");
        
        uint256 reserveIn = AforB ? reserveA : reserveB;
        uint256 reserveOut = AforB ? reserveB : reserveA;
        
        require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity");
        
        uint256 amountInWithFee = amountIn * 997; // 0.3% fee
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;
        
        return numerator / denominator;
    }
    
    function sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        uint256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }
    
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}`,
          tests: [
            {
              name: 'Contract compiles without errors',
              type: 'compilation'
            },
            {
              name: 'Add liquidity function works',
              type: 'function-call',
              function: 'addLiquidity',
              params: ['1000', '2000']
            },
            {
              name: 'Swap function calculates correctly',
              type: 'assertion',
              condition: 'getAmountOut(100, true) > 0'
            },
            {
              name: 'Constant product maintained',
              type: 'invariant',
              condition: 'reserveA * reserveB >= initial_k'
            }
          ]
        }
      },
      {
        id: 'dex-frontend',
        type: 'interactive',
        title: 'DEX Frontend Interface',
        description: 'Build a user interface for your DEX',
        points: 200,
        content: {
          simulation: 'dex-ui-builder',
          components: [
            'liquidity-provider',
            'swap-interface',
            'pool-statistics',
            'transaction-history'
          ],
          steps: [
            {
              step: 1,
              instruction: 'Create swap interface',
              action: 'build-swap-ui',
              validation: 'swap-form-complete'
            },
            {
              step: 2,
              instruction: 'Add liquidity provision',
              action: 'build-liquidity-ui',
              validation: 'liquidity-form-complete'
            },
            {
              step: 3,
              instruction: 'Display pool statistics',
              action: 'add-pool-stats',
              validation: 'stats-displayed'
            },
            {
              step: 4,
              instruction: 'Test with real transactions',
              action: 'test-dex',
              validation: 'successful-swap'
            }
          ]
        }
      }
    ],
    rewards: {
      xp: 500,
      tokens: 200
    },
    prerequisites: ['defi-basics-completed', 'smart-contract-basics']
  }
];

// Progress tracking for real-time updates
export interface LessonProgress {
  lessonId: string;
  userId: string;
  startedAt: Date;
  completedTasks: string[];
  currentTask?: string;
  score: number;
  timeSpent: number; // in minutes
  completed: boolean;
  completedAt?: Date;
}

// Real-time task validation
export interface TaskValidation {
  taskId: string;
  isValid: boolean;
  feedback: string;
  hints?: string[];
  nextSteps?: string[];
}