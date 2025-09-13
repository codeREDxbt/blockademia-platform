export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'interactive' | 'quiz' | 'project';
  completed?: boolean;
  locked?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  students: number;
  rating: number;
  price: number;
  originalPrice?: number;
  image: string;
  tags: string[];
  modules: CourseModule[];
  learningOutcomes: string[];
  prerequisites: string[];
  tools: string[];
  certificate: boolean;
  featured: boolean;
  premium?: boolean;
  learningPath?: string;
}

export const courses: Course[] = [
  // BLOCKCHAIN DEVELOPMENT PATH
  {
    id: 'blockchain-fundamentals',
    title: 'Blockchain Fundamentals',
    description: 'Understand the core concepts of blockchain technology and decentralized systems',
    longDescription: 'Start your blockchain journey with this comprehensive introduction to distributed ledger technology. Learn how blockchain works, understand cryptocurrency basics, and explore the revolutionary potential of decentralized systems. Perfect foundation for any blockchain career.',
    instructor: 'Dr. Ryan Mitchell',
    duration: '8 weeks',
    level: 'Beginner',
    students: 12300,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1653179675238-cc722693b666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTcyNjcyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Blockchain', 'Cryptocurrency', 'Bitcoin', 'Ethereum'],
    certificate: true,
    featured: true,
    learningPath: 'Blockchain Development',
    modules: [
      {
        id: 'intro',
        title: 'Introduction to Blockchain',
        description: 'Learn what blockchain is and why it matters',
        duration: '2 weeks',
        lessons: [
          { id: 'what-is-blockchain', title: 'What is Blockchain?', duration: '25 min', type: 'video' },
          { id: 'history', title: 'History of Blockchain and Bitcoin', duration: '20 min', type: 'video' },
          { id: 'key-concepts', title: 'Key Blockchain Concepts', duration: '30 min', type: 'interactive' },
          { id: 'quiz-intro', title: 'Introduction Quiz', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 'cryptography',
        title: 'Cryptography Basics',
        description: 'Understand the cryptographic foundations',
        duration: '3 weeks',
        lessons: [
          { id: 'hash-functions', title: 'Hash Functions', duration: '30 min', type: 'video' },
          { id: 'digital-signatures', title: 'Digital Signatures', duration: '35 min', type: 'interactive' },
          { id: 'crypto-project', title: 'Build a Simple Hash', duration: '45 min', type: 'project' }
        ]
      },
      {
        id: 'networks',
        title: 'Blockchain Networks',
        description: 'Explore different blockchain networks',
        duration: '3 weeks',
        lessons: [
          { id: 'bitcoin-network', title: 'Bitcoin Network', duration: '40 min', type: 'video' },
          { id: 'ethereum-basics', title: 'Ethereum Basics', duration: '35 min', type: 'video' },
          { id: 'wallet-setup', title: 'Create Your First Wallet', duration: '30 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Understand blockchain fundamentals and terminology',
      'Explain how cryptocurrencies work',
      'Set up and use cryptocurrency wallets',
      'Identify different blockchain use cases'
    ],
    prerequisites: [
      'Basic computer literacy',
      'No prior blockchain knowledge required'
    ],
    tools: ['MetaMask', 'Blockchain Explorers', 'Bitcoin Core']
  },
  {
    id: 'blockchain-intermediate',
    title: 'Intermediate Blockchain Development',
    description: 'Dive deeper into blockchain protocols and smart contract fundamentals',
    longDescription: 'Build on your blockchain foundation with intermediate concepts including consensus mechanisms, smart contract basics, and DApp architecture. Learn to interact with blockchain networks programmatically and understand the technical details that power Web3.',
    instructor: 'Sofia Petrova',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 6800,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1593720219128-218edc93bdc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpZGl0eSUyMHByb2dyYW1taW5nJTIwc21hcnQlMjBjb250cmFjdHN8ZW58MXx8fHwxNzU3MjY3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Smart Contracts', 'Solidity', 'Web3', 'DApps'],
    certificate: true,
    featured: true,
    learningPath: 'Blockchain Development',
    modules: [
      {
        id: 'consensus',
        title: 'Consensus Mechanisms',
        description: 'Learn how blockchain networks reach agreement',
        duration: '3 weeks',
        lessons: [
          { id: 'proof-of-work', title: 'Proof of Work Deep Dive', duration: '35 min', type: 'video' },
          { id: 'proof-of-stake', title: 'Proof of Stake Explained', duration: '30 min', type: 'video' },
          { id: 'consensus-project', title: 'Simulate Consensus', duration: '60 min', type: 'project' }
        ]
      },
      {
        id: 'smart-contracts-intro',
        title: 'Smart Contract Basics',
        description: 'Introduction to programmable blockchain contracts',
        duration: '4 weeks',
        lessons: [
          { id: 'smart-contract-concept', title: 'What are Smart Contracts?', duration: '25 min', type: 'video' },
          { id: 'solidity-intro', title: 'Introduction to Solidity', duration: '40 min', type: 'interactive' },
          { id: 'first-contract', title: 'Deploy Your First Contract', duration: '50 min', type: 'project' }
        ]
      },
      {
        id: 'web3-development',
        title: 'Web3 Development Basics',
        description: 'Connect applications to blockchain networks',
        duration: '3 weeks',
        lessons: [
          { id: 'web3-libraries', title: 'Web3.js and Ethers.js', duration: '35 min', type: 'video' },
          { id: 'dapp-architecture', title: 'DApp Architecture', duration: '30 min', type: 'interactive' },
          { id: 'simple-dapp', title: 'Build a Simple DApp', duration: '90 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Understand consensus mechanisms and their trade-offs',
      'Write and deploy basic smart contracts',
      'Connect frontend applications to blockchain networks',
      'Build simple decentralized applications'
    ],
    prerequisites: [
      'Completed Blockchain Fundamentals',
      'Basic programming experience',
      'Understanding of JavaScript'
    ],
    tools: ['Solidity', 'Remix IDE', 'Web3.js', 'MetaMask', 'Hardhat']
  },
  {
    id: 'blockchain-advanced',
    title: 'Advanced Blockchain Architecture',
    description: 'Master enterprise blockchain development and advanced protocols',
    longDescription: 'Become a blockchain expert with advanced topics including Layer 2 solutions, cross-chain protocols, MEV, and enterprise blockchain architecture. This premium course covers cutting-edge developments and prepares you for senior blockchain developer roles.',
    instructor: 'Dr. Marcus Chen',
    duration: '16 weeks',
    level: 'Advanced',
    students: 2100,
    rating: 4.9,
    price: 150,
    image: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhbmElMjBydXN0JTIwYmxvY2tjaGFpbiUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NzI2NzI4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Layer 2', 'Cross-chain', 'MEV', 'Enterprise', 'Advanced'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Blockchain Development',
    modules: [
      {
        id: 'layer2',
        title: 'Layer 2 Solutions',
        description: 'Master scaling solutions for blockchain networks',
        duration: '4 weeks',
        lessons: [
          { id: 'rollups', title: 'Optimistic and ZK Rollups', duration: '45 min', type: 'video' },
          { id: 'sidechains', title: 'Sidechains and State Channels', duration: '40 min', type: 'video' },
          { id: 'l2-project', title: 'Deploy to Layer 2', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'cross-chain',
        title: 'Cross-Chain Development',
        description: 'Build applications that work across multiple blockchains',
        duration: '5 weeks',
        lessons: [
          { id: 'bridge-protocols', title: 'Cross-Chain Bridge Protocols', duration: '50 min', type: 'video' },
          { id: 'interoperability', title: 'Blockchain Interoperability', duration: '45 min', type: 'interactive' },
          { id: 'cross-chain-dapp', title: 'Build Cross-Chain DApp', duration: '180 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-topics',
        title: 'Cutting-Edge Blockchain Topics',
        description: 'Explore the latest in blockchain technology',
        duration: '7 weeks',
        lessons: [
          { id: 'mev', title: 'Maximal Extractable Value (MEV)', duration: '50 min', type: 'video' },
          { id: 'zero-knowledge', title: 'Zero-Knowledge Proofs', duration: '60 min', type: 'video' },
          { id: 'enterprise-blockchain', title: 'Enterprise Blockchain Solutions', duration: '45 min', type: 'interactive' },
          { id: 'final-capstone', title: 'Capstone Project', duration: '300 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Design and implement Layer 2 scaling solutions',
      'Build cross-chain applications and bridges',
      'Understand MEV and advanced blockchain economics',
      'Architect enterprise blockchain solutions'
    ],
    prerequisites: [
      'Completed Intermediate Blockchain Development',
      'Strong programming background',
      'Experience with smart contract development'
    ],
    tools: ['Polygon', 'Arbitrum', 'Chainlink', 'The Graph', 'Foundry', 'Rust']
  },

  // WEB3 FRONTEND PATH
  {
    id: 'web3-frontend-basics',
    title: 'Web3 Frontend Fundamentals',
    description: 'Learn to build user interfaces for decentralized applications',
    longDescription: 'Master the art of building Web3 user interfaces with React and modern frontend tools. Learn to connect your applications to blockchain networks, handle wallet interactions, and create seamless user experiences for decentralized applications.',
    instructor: 'Sarah Chen',
    duration: '10 weeks',
    level: 'Beginner',
    students: 8900,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIzJTIwZnJvbnRlbmQlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTcyNjcyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'Web3', 'Frontend', 'JavaScript'],
    certificate: true,
    featured: true,
    learningPath: 'Web3 Frontend',
    modules: [
      {
        id: 'react-web3',
        title: 'React for Web3',
        description: 'Learn React fundamentals with Web3 focus',
        duration: '4 weeks',
        lessons: [
          { id: 'react-basics', title: 'React Components for Web3', duration: '30 min', type: 'video' },
          { id: 'state-management', title: 'State Management in DApps', duration: '35 min', type: 'interactive' },
          { id: 'first-web3-app', title: 'Build Your First Web3 App', duration: '60 min', type: 'project' }
        ]
      },
      {
        id: 'wallet-integration',
        title: 'Wallet Integration',
        description: 'Connect applications to cryptocurrency wallets',
        duration: '3 weeks',
        lessons: [
          { id: 'metamask-integration', title: 'MetaMask Integration', duration: '25 min', type: 'video' },
          { id: 'wallet-connect', title: 'WalletConnect Protocol', duration: '30 min', type: 'interactive' },
          { id: 'multi-wallet-support', title: 'Multi-Wallet Support', duration: '45 min', type: 'project' }
        ]
      },
      {
        id: 'web3-ui',
        title: 'Web3 User Experience',
        description: 'Design intuitive interfaces for blockchain apps',
        duration: '3 weeks',
        lessons: [
          { id: 'web3-ux-principles', title: 'Web3 UX Principles', duration: '25 min', type: 'video' },
          { id: 'transaction-states', title: 'Handling Transaction States', duration: '30 min', type: 'interactive' },
          { id: 'responsive-dapp', title: 'Build Responsive DApp', duration: '90 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build React applications for Web3',
      'Integrate multiple cryptocurrency wallets',
      'Handle blockchain transactions in the frontend',
      'Design user-friendly Web3 interfaces'
    ],
    prerequisites: [
      'Basic HTML, CSS, and JavaScript',
      'Understanding of React concepts',
      'Basic blockchain knowledge helpful'
    ],
    tools: ['React', 'Web3.js', 'Ethers.js', 'MetaMask', 'WalletConnect']
  },
  {
    id: 'web3-frontend-intermediate',
    title: 'Advanced Web3 Frontend',
    description: 'Master complex Web3 UI patterns and state management',
    longDescription: 'Take your Web3 frontend skills to the next level with advanced patterns, state management, and integration with complex smart contracts. Learn to build production-ready DApps with optimized performance and excellent user experience.',
    instructor: 'Alex Thompson',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 4200,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1644938297138-fde22c59b32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGphdmFzY3JpcHQlMjBmcm9udGVuZCUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NzI2NzI4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Advanced React', 'State Management', 'Performance', 'DApp'],
    certificate: true,
    featured: true,
    learningPath: 'Web3 Frontend',
    modules: [
      {
        id: 'advanced-patterns',
        title: 'Advanced React Patterns for Web3',
        description: 'Master complex patterns for Web3 applications',
        duration: '4 weeks',
        lessons: [
          { id: 'context-patterns', title: 'Context Patterns for Web3', duration: '35 min', type: 'video' },
          { id: 'custom-hooks', title: 'Custom Hooks for Blockchain', duration: '40 min', type: 'interactive' },
          { id: 'advanced-project', title: 'Build Complex DApp Component', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'performance',
        title: 'Web3 Performance Optimization',
        description: 'Optimize DApps for speed and efficiency',
        duration: '4 weeks',
        lessons: [
          { id: 'caching-strategies', title: 'Blockchain Data Caching', duration: '30 min', type: 'video' },
          { id: 'lazy-loading', title: 'Lazy Loading for DApps', duration: '25 min', type: 'interactive' },
          { id: 'performance-project', title: 'Optimize DApp Performance', duration: '90 min', type: 'project' }
        ]
      },
      {
        id: 'testing-deployment',
        title: 'Testing and Deployment',
        description: 'Test and deploy Web3 applications',
        duration: '4 weeks',
        lessons: [
          { id: 'testing-dapps', title: 'Testing Web3 Applications', duration: '35 min', type: 'video' },
          { id: 'deployment-strategies', title: 'DApp Deployment Strategies', duration: '30 min', type: 'interactive' },
          { id: 'production-dapp', title: 'Deploy Production DApp', duration: '150 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Implement advanced React patterns for Web3',
      'Optimize DApp performance and user experience',
      'Test Web3 applications effectively',
      'Deploy production-ready decentralized applications'
    ],
    prerequisites: [
      'Completed Web3 Frontend Fundamentals',
      'Solid React experience',
      'Understanding of smart contracts'
    ],
    tools: ['React', 'TypeScript', 'Jest', 'Cypress', 'IPFS', 'Vercel']
  },
  {
    id: 'web3-frontend-advanced',
    title: 'Enterprise Web3 Frontend',
    description: 'Build scalable Web3 applications for enterprise use',
    longDescription: 'Master enterprise-level Web3 frontend development with advanced architecture patterns, micro-frontends, and integration with complex DeFi protocols. This premium course prepares you for senior frontend roles in Web3 companies.',
    instructor: 'Emma Davis',
    duration: '14 weeks',
    level: 'Advanced',
    students: 1800,
    rating: 4.9,
    price: 150,
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIzJTIwZnJvbnRlbmQlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTcyNjcyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Enterprise', 'Architecture', 'Micro-frontends', 'Advanced'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Web3 Frontend',
    modules: [
      {
        id: 'enterprise-architecture',
        title: 'Enterprise Web3 Architecture',
        description: 'Design scalable Web3 frontend architectures',
        duration: '5 weeks',
        lessons: [
          { id: 'micro-frontends', title: 'Micro-frontends for Web3', duration: '45 min', type: 'video' },
          { id: 'state-machines', title: 'State Machines for Complex DApps', duration: '50 min', type: 'interactive' },
          { id: 'architecture-project', title: 'Design Enterprise Architecture', duration: '180 min', type: 'project' }
        ]
      },
      {
        id: 'defi-integration',
        title: 'Advanced DeFi Integration',
        description: 'Integrate complex DeFi protocols',
        duration: '5 weeks',
        lessons: [
          { id: 'protocol-integration', title: 'Multi-Protocol Integration', duration: '50 min', type: 'video' },
          { id: 'yield-farming', title: 'Yield Farming Interfaces', duration: '45 min', type: 'interactive' },
          { id: 'defi-dashboard', title: 'Build DeFi Dashboard', duration: '240 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-topics',
        title: 'Cutting-Edge Frontend Topics',
        description: 'Explore the latest in Web3 frontend development',
        duration: '4 weeks',
        lessons: [
          { id: 'web3-gaming', title: 'Web3 Gaming Interfaces', duration: '40 min', type: 'video' },
          { id: 'ar-vr-web3', title: 'AR/VR for Web3', duration: '45 min', type: 'video' },
          { id: 'enterprise-capstone', title: 'Enterprise Capstone Project', duration: '360 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Design enterprise-scale Web3 applications',
      'Implement micro-frontend architectures',
      'Integrate complex DeFi protocols',
      'Build cutting-edge Web3 user experiences'
    ],
    prerequisites: [
      'Completed Advanced Web3 Frontend',
      'Experience with enterprise applications',
      'Deep understanding of DeFi protocols'
    ],
    tools: ['React', 'TypeScript', 'Module Federation', 'GraphQL', 'The Graph', 'Three.js']
  },

  // DEFI DEVELOPMENT PATH
  {
    id: 'defi-basics',
    title: 'DeFi Fundamentals',
    description: 'Understand decentralized finance protocols and mechanisms',
    longDescription: 'Enter the world of decentralized finance with this comprehensive introduction to DeFi protocols, yield farming, liquidity provision, and automated market makers. Learn how traditional finance is being revolutionized by blockchain technology.',
    instructor: 'Michael Torres',
    duration: '8 weeks',
    level: 'Beginner',
    students: 7500,
    rating: 4.6,
    price: 0,
    image: 'https://images.unsplash.com/photo-1667984510054-d4562f93621d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkZWZpJTIwZGVjZW50cmFsaXplZCUyMGZpbmFuY2UlMjBldGhlcmV1bXxlbnwxfHx8fDE3NTcyNjcyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['DeFi', 'Finance', 'AMM', 'Yield Farming'],
    certificate: true,
    featured: true,
    learningPath: 'DeFi Development',
    modules: [
      {
        id: 'defi-intro',
        title: 'Introduction to DeFi',
        description: 'Learn the basics of decentralized finance',
        duration: '3 weeks',
        lessons: [
          { id: 'defi-overview', title: 'What is DeFi?', duration: '25 min', type: 'video' },
          { id: 'defi-vs-cefi', title: 'DeFi vs Traditional Finance', duration: '30 min', type: 'video' },
          { id: 'defi-ecosystem', title: 'DeFi Ecosystem Overview', duration: '35 min', type: 'interactive' }
        ]
      },
      {
        id: 'amm-basics',
        title: 'Automated Market Makers',
        description: 'Understand how AMMs work',
        duration: '3 weeks',
        lessons: [
          { id: 'amm-concept', title: 'AMM Concepts', duration: '30 min', type: 'video' },
          { id: 'liquidity-pools', title: 'Liquidity Pools', duration: '25 min', type: 'interactive' },
          { id: 'provide-liquidity', title: 'Provide Liquidity to a Pool', duration: '45 min', type: 'project' }
        ]
      },
      {
        id: 'yield-farming',
        title: 'Yield Farming Basics',
        description: 'Learn about yield farming strategies',
        duration: '2 weeks',
        lessons: [
          { id: 'yield-concepts', title: 'Yield Farming Concepts', duration: '25 min', type: 'video' },
          { id: 'farming-strategies', title: 'Basic Farming Strategies', duration: '30 min', type: 'interactive' },
          { id: 'calculate-yields', title: 'Calculate Yield Returns', duration: '40 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Understand DeFi protocols and mechanisms',
      'Use automated market makers effectively',
      'Participate in yield farming safely',
      'Analyze DeFi investment opportunities'
    ],
    prerequisites: [
      'Basic blockchain knowledge',
      'Understanding of cryptocurrency wallets',
      'Basic financial concepts'
    ],
    tools: ['Uniswap', 'Compound', 'Aave', 'MetaMask', 'DeFiPulse']
  },
  {
    id: 'defi-intermediate',
    title: 'DeFi Protocol Development',
    description: 'Build your own DeFi protocols and smart contracts',
    longDescription: 'Learn to develop DeFi protocols from scratch, including lending platforms, DEXs, and yield farming contracts. Master the smart contract patterns that power the decentralized finance ecosystem.',
    instructor: 'Dr. Lisa Chang',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 3200,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1593720219128-218edc93bdc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpZGl0eSUyMHByb2dyYW1taW5nJTIwc21hcnQlMjBjb250cmFjdHN8ZW58MXx8fHwxNzU3MjY3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Smart Contracts', 'Lending', 'DEX', 'Protocols'],
    certificate: true,
    featured: true,
    learningPath: 'DeFi Development',
    modules: [
      {
        id: 'defi-patterns',
        title: 'DeFi Smart Contract Patterns',
        description: 'Learn common DeFi development patterns',
        duration: '4 weeks',
        lessons: [
          { id: 'erc20-advanced', title: 'Advanced ERC-20 Patterns', duration: '35 min', type: 'video' },
          { id: 'governance-tokens', title: 'Governance Token Mechanics', duration: '40 min', type: 'interactive' },
          { id: 'token-economics', title: 'Build Tokenomics Model', duration: '90 min', type: 'project' }
        ]
      },
      {
        id: 'dex-development',
        title: 'DEX Development',
        description: 'Build decentralized exchanges',
        duration: '4 weeks',
        lessons: [
          { id: 'dex-architecture', title: 'DEX Architecture', duration: '40 min', type: 'video' },
          { id: 'swap-mechanisms', title: 'Swap Mechanisms', duration: '35 min', type: 'interactive' },
          { id: 'build-dex', title: 'Build Mini DEX', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'lending-protocols',
        title: 'Lending Protocol Development',
        description: 'Create lending and borrowing platforms',
        duration: '4 weeks',
        lessons: [
          { id: 'lending-mechanics', title: 'Lending Mechanics', duration: '45 min', type: 'video' },
          { id: 'risk-management', title: 'Risk Management in DeFi', duration: '40 min', type: 'interactive' },
          { id: 'lending-platform', title: 'Build Lending Platform', duration: '180 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Develop DeFi smart contracts',
      'Build decentralized exchanges',
      'Create lending and borrowing protocols',
      'Implement governance mechanisms'
    ],
    prerequisites: [
      'Completed DeFi Fundamentals',
      'Solid Solidity programming skills',
      'Understanding of financial concepts'
    ],
    tools: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Chainlink', 'The Graph']
  },
  {
    id: 'defi-advanced',
    title: 'Advanced DeFi Engineering',
    description: 'Master complex DeFi protocols and risk management',
    longDescription: 'Become a DeFi expert with advanced topics including derivatives, options, insurance protocols, and sophisticated yield strategies. This premium course covers the cutting-edge of decentralized finance development.',
    instructor: 'Dr. James Rodriguez',
    duration: '16 weeks',
    level: 'Advanced',
    students: 1100,
    rating: 4.9,
    price: 150,
    image: 'https://images.unsplash.com/photo-1667984510054-d4562f93621d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkZWZpJTIwZGVjZW50cmFsaXplZCUyMGZpbmFuY2UlMjBldGhlcmV1bXxlbnwxfHx8fDE3NTcyNjcyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Derivatives', 'Options', 'Insurance', 'Advanced DeFi'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'DeFi Development',
    modules: [
      {
        id: 'derivatives',
        title: 'DeFi Derivatives',
        description: 'Build derivatives and options protocols',
        duration: '6 weeks',
        lessons: [
          { id: 'options-theory', title: 'Options and Derivatives Theory', duration: '50 min', type: 'video' },
          { id: 'perpetual-swaps', title: 'Perpetual Swaps', duration: '45 min', type: 'interactive' },
          { id: 'options-protocol', title: 'Build Options Protocol', duration: '240 min', type: 'project' }
        ]
      },
      {
        id: 'insurance-protocols',
        title: 'DeFi Insurance',
        description: 'Create decentralized insurance protocols',
        duration: '5 weeks',
        lessons: [
          { id: 'insurance-theory', title: 'DeFi Insurance Mechanisms', duration: '40 min', type: 'video' },
          { id: 'parametric-insurance', title: 'Parametric Insurance', duration: '45 min', type: 'interactive' },
          { id: 'insurance-platform', title: 'Build Insurance Platform', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-strategies',
        title: 'Advanced DeFi Strategies',
        description: 'Master sophisticated DeFi strategies',
        duration: '5 weeks',
        lessons: [
          { id: 'yield-optimization', title: 'Yield Optimization Strategies', duration: '45 min', type: 'video' },
          { id: 'arbitrage-mev', title: 'Arbitrage and MEV in DeFi', duration: '50 min', type: 'video' },
          { id: 'strategy-vault', title: 'Build Strategy Vault', duration: '300 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build complex derivatives protocols',
      'Create decentralized insurance platforms',
      'Implement advanced yield strategies',
      'Master DeFi risk management'
    ],
    prerequisites: [
      'Completed DeFi Protocol Development',
      'Advanced Solidity skills',
      'Deep understanding of financial markets'
    ],
    tools: ['Solidity', 'Foundry', 'Chainlink', 'Gelato', 'Keep3r', 'Flashloan protocols']
  },

  // SMART CONTRACT DEVELOPMENT (PREMIUM)
  {
    id: 'smart-contract-development',
    title: 'Advanced Smart Contract Development',
    description: 'Master professional smart contract development with security best practices',
    longDescription: 'Become a professional smart contract developer with this comprehensive premium course covering advanced Solidity patterns, security audits, gas optimization, and enterprise-grade development practices.',
    instructor: 'Dr. Sarah Kim',
    duration: '20 weeks',
    level: 'Advanced',
    students: 850,
    rating: 4.9,
    price: 150,
    image: 'https://images.unsplash.com/photo-1593720219128-218edc93bdc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpZGl0eSUyMHByb2dyYW1taW5nJTIwc21hcnQlMjBjb250cmFjdHN8ZW58MXx8fHwxNzU3MjY3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Smart Contracts', 'Solidity', 'Security', 'Auditing', 'Professional'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Smart Contract Development',
    modules: [
      {
        id: 'advanced-solidity',
        title: 'Advanced Solidity Patterns',
        description: 'Master complex Solidity programming patterns',
        duration: '6 weeks',
        lessons: [
          { id: 'proxy-patterns', title: 'Proxy and Upgrade Patterns', duration: '60 min', type: 'video' },
          { id: 'factory-patterns', title: 'Factory and Clone Patterns', duration: '55 min', type: 'video' },
          { id: 'diamond-standard', title: 'Diamond Standard (EIP-2535)', duration: '70 min', type: 'interactive' },
          { id: 'assembly-optimization', title: 'Assembly and Gas Optimization', duration: '80 min', type: 'code' },
          { id: 'advanced-contract-project', title: 'Build Advanced Contract System', duration: '240 min', type: 'project' }
        ]
      },
      {
        id: 'security-auditing',
        title: 'Smart Contract Security & Auditing',
        description: 'Learn to secure and audit smart contracts',
        duration: '7 weeks',
        lessons: [
          { id: 'common-vulnerabilities', title: 'Common Smart Contract Vulnerabilities', duration: '50 min', type: 'video' },
          { id: 'reentrancy-attacks', title: 'Reentrancy and State Manipulation', duration: '45 min', type: 'interactive' },
          { id: 'access-control', title: 'Access Control and Permission Systems', duration: '40 min', type: 'video' },
          { id: 'formal-verification', title: 'Formal Verification Techniques', duration: '60 min', type: 'video' },
          { id: 'audit-tools', title: 'Automated Auditing Tools', duration: '35 min', type: 'interactive' },
          { id: 'manual-audit', title: 'Manual Security Audit Process', duration: '90 min', type: 'project' },
          { id: 'bug-bounty', title: 'Bug Bounty and Responsible Disclosure', duration: '30 min', type: 'video' }
        ]
      },
      {
        id: 'enterprise-development',
        title: 'Enterprise Smart Contract Development',
        description: 'Professional development practices and deployment',
        duration: '7 weeks',
        lessons: [
          { id: 'testing-strategies', title: 'Comprehensive Testing Strategies', duration: '50 min', type: 'video' },
          { id: 'ci-cd-blockchain', title: 'CI/CD for Blockchain Projects', duration: '45 min', type: 'interactive' },
          { id: 'multi-chain-deployment', title: 'Multi-Chain Deployment Strategies', duration: '55 min', type: 'video' },
          { id: 'monitoring-analytics', title: 'Contract Monitoring and Analytics', duration: '40 min', type: 'video' },
          { id: 'governance-dao', title: 'DAO and Governance Contracts', duration: '70 min', type: 'interactive' },
          { id: 'capstone-enterprise', title: 'Enterprise Capstone Project', duration: '360 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Master advanced Solidity programming patterns',
      'Conduct professional smart contract security audits',
      'Implement enterprise-grade development practices',
      'Deploy and monitor multi-chain contract systems',
      'Design and implement DAO governance systems'
    ],
    prerequisites: [
      'Completed Intermediate Blockchain Development',
      'Strong programming background (JavaScript/Python)',
      'Understanding of software engineering principles',
      'Basic knowledge of cryptography'
    ],
    tools: ['Solidity', 'Foundry', 'Hardhat', 'Slither', 'Mythril', 'OpenZeppelin', 'Tenderly', 'Defender']
  },

  // SOLANA FELLOWSHIP (PREMIUM)
  {
    id: 'solana-fellowship',
    title: 'Solana Fellowship Program',
    description: 'Comprehensive Solana blockchain development program with mentorship',
    longDescription: 'Join our exclusive Solana Fellowship - a premium mentorship program covering Rust programming, Solana development, program architecture, and real-world project building. Includes 1-on-1 mentoring and job placement assistance.',
    instructor: 'Alex Chen & Solana Team',
    duration: '24 weeks',
    level: 'Advanced',
    students: 420,
    rating: 4.95,
    price: 150,
    image: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhbmElMjBydXN0JTIwYmxvY2tjaGFpbiUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NzI2NzI4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Solana', 'Rust', 'Fellowship', 'Mentorship', 'Job Placement'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Solana Development',
    modules: [
      {
        id: 'rust-fundamentals',
        title: 'Rust Programming for Blockchain',
        description: 'Master Rust programming language for Solana development',
        duration: '8 weeks',
        lessons: [
          { id: 'rust-basics', title: 'Rust Language Fundamentals', duration: '90 min', type: 'video' },
          { id: 'ownership-borrowing', title: 'Ownership and Borrowing', duration: '75 min', type: 'interactive' },
          { id: 'error-handling', title: 'Error Handling in Rust', duration: '60 min', type: 'video' },
          { id: 'traits-generics', title: 'Traits and Generics', duration: '80 min', type: 'code' },
          { id: 'async-programming', title: 'Async Programming in Rust', duration: '70 min', type: 'video' },
          { id: 'rust-blockchain-project', title: 'Build Blockchain Components in Rust', duration: '180 min', type: 'project' }
        ]
      },
      {
        id: 'solana-architecture',
        title: 'Solana Blockchain Architecture',
        description: 'Deep dive into Solana\'s unique architecture and consensus',
        duration: '6 weeks',
        lessons: [
          { id: 'solana-overview', title: 'Solana Architecture Overview', duration: '45 min', type: 'video' },
          { id: 'proof-of-history', title: 'Proof of History Consensus', duration: '50 min', type: 'interactive' },
          { id: 'cluster-validation', title: 'Cluster and Validation', duration: '40 min', type: 'video' },
          { id: 'accounts-model', title: 'Solana Accounts Model', duration: '55 min', type: 'interactive' },
          { id: 'runtime-bpf', title: 'Runtime and BPF Programs', duration: '60 min', type: 'video' },
          { id: 'transaction-processing', title: 'Transaction Processing Deep Dive', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'program-development',
        title: 'Solana Program Development',
        description: 'Build sophisticated Solana programs and dApps',
        duration: '10 weeks',
        lessons: [
          { id: 'first-program', title: 'Your First Solana Program', duration: '60 min', type: 'code' },
          { id: 'anchor-framework', title: 'Anchor Framework Mastery', duration: '90 min', type: 'interactive' },
          { id: 'token-program', title: 'SPL Token Program Integration', duration: '70 min', type: 'video' },
          { id: 'pda-accounts', title: 'Program Derived Addresses (PDAs)', duration: '65 min', type: 'code' },
          { id: 'cross-program-invocation', title: 'Cross-Program Invocation (CPI)', duration: '75 min', type: 'interactive' },
          { id: 'defi-program', title: 'Build DeFi Program on Solana', duration: '240 min', type: 'project' },
          { id: 'nft-marketplace', title: 'NFT Marketplace Program', duration: '180 min', type: 'project' },
          { id: 'gaming-program', title: 'GameFi Program Development', duration: '200 min', type: 'project' },
          { id: 'oracles-integration', title: 'Oracles and External Data', duration: '45 min', type: 'video' },
          { id: 'fellowship-capstone', title: 'Fellowship Capstone Project', duration: '480 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Master Rust programming for blockchain development',
      'Understand Solana\'s unique architecture and consensus',
      'Build sophisticated Solana programs using Anchor',
      'Develop real-world dApps on Solana',
      'Get personalized career guidance and mentorship',
      'Access to exclusive job opportunities'
    ],
    prerequisites: [
      'Strong programming background (any language)',
      'Basic understanding of blockchain concepts',
      'Commitment to 20+ hours per week study',
      'Completion of application and interview process'
    ],
    tools: ['Rust', 'Solana CLI', 'Anchor', 'Phantom Wallet', 'Metaplex', 'Serum DEX', 'Jupiter']
  },

  // NFT DEVELOPMENT PATH
  {
    id: 'nft-basics',
    title: 'NFT Fundamentals',
    description: 'Learn about Non-Fungible Tokens and digital ownership',
    longDescription: 'Discover the world of NFTs and digital ownership. Learn how non-fungible tokens work, explore different NFT use cases, and understand the technology that powers digital collectibles, art, and gaming assets.',
    instructor: 'Jessica Liu',
    duration: '6 weeks',
    level: 'Beginner',
    students: 9800,
    rating: 4.5,
    price: 0,
    image: 'https://images.unsplash.com/photo-1646299220293-3ae516d9c275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxuZnQlMjBkaWdpdGFsJTIwYXJ0JTIwYmxvY2tjaGFpbnxlbnwxfHx8fDE3NTcyNjcyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['NFT', 'Digital Art', 'Collectibles', 'Ownership'],
    certificate: true,
    featured: true,
    learningPath: 'NFT Development',
    modules: [
      {
        id: 'nft-intro',
        title: 'Introduction to NFTs',
        description: 'Learn what NFTs are and how they work',
        duration: '2 weeks',
        lessons: [
          { id: 'what-are-nfts', title: 'What are NFTs?', duration: '20 min', type: 'video' },
          { id: 'nft-standards', title: 'NFT Standards (ERC-721, ERC-1155)', duration: '25 min', type: 'video' },
          { id: 'nft-marketplaces', title: 'NFT Marketplaces Overview', duration: '30 min', type: 'interactive' }
        ]
      },
      {
        id: 'creating-nfts',
        title: 'Creating Your First NFT',
        description: 'Learn to create and mint NFTs',
        duration: '2 weeks',
        lessons: [
          { id: 'digital-art-basics', title: 'Digital Art for NFTs', duration: '25 min', type: 'video' },
          { id: 'metadata-ipfs', title: 'Metadata and IPFS', duration: '30 min', type: 'interactive' },
          { id: 'mint-first-nft', title: 'Mint Your First NFT', duration: '45 min', type: 'project' }
        ]
      },
      {
        id: 'nft-ecosystem',
        title: 'NFT Ecosystem',
        description: 'Explore the broader NFT ecosystem',
        duration: '2 weeks',
        lessons: [
          { id: 'nft-use-cases', title: 'NFT Use Cases Beyond Art', duration: '25 min', type: 'video' },
          { id: 'royalties-licensing', title: 'Royalties and Licensing', duration: '20 min', type: 'interactive' },
          { id: 'nft-collection', title: 'Create NFT Collection', duration: '60 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Understand NFT technology and standards',
      'Create and mint your own NFTs',
      'Navigate NFT marketplaces',
      'Understand NFT use cases and applications'
    ],
    prerequisites: [
      'Basic blockchain knowledge',
      'Understanding of digital art (helpful)',
      'Cryptocurrency wallet setup'
    ],
    tools: ['OpenSea', 'Rarible', 'IPFS', 'MetaMask', 'Photoshop/GIMP']
  },
  {
    id: 'nft-intermediate',
    title: 'NFT Smart Contract Development',
    description: 'Build advanced NFT contracts and marketplace features',
    longDescription: 'Learn to develop sophisticated NFT smart contracts with advanced features like royalties, batch minting, and marketplace integration. Master the technical aspects of NFT development for games, collectibles, and utility tokens.',
    instructor: 'David Park',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 4100,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1593720219128-218edc93bdc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpZGl0eSUyMHByb2dyYW1taW5nJTIwc21hcnQlMjBjb250cmFjdHN8ZW58MXx8fHwxNzU3MjY3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Smart Contracts', 'ERC-721', 'ERC-1155', 'Marketplace'],
    certificate: true,
    featured: true,
    learningPath: 'NFT Development',
    modules: [
      {
        id: 'nft-contracts',
        title: 'Advanced NFT Contracts',
        description: 'Build sophisticated NFT smart contracts',
        duration: '4 weeks',
        lessons: [
          { id: 'erc721-advanced', title: 'Advanced ERC-721 Features', duration: '35 min', type: 'video' },
          { id: 'erc1155-multi', title: 'ERC-1155 Multi-Token Standard', duration: '40 min', type: 'interactive' },
          { id: 'nft-contract-project', title: 'Build Advanced NFT Contract', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'marketplace-development',
        title: 'NFT Marketplace Development',
        description: 'Create your own NFT marketplace',
        duration: '3 weeks',
        lessons: [
          { id: 'marketplace-architecture', title: 'Marketplace Architecture', duration: '30 min', type: 'video' },
          { id: 'auction-mechanisms', title: 'Auction Mechanisms', duration: '35 min', type: 'interactive' },
          { id: 'build-marketplace', title: 'Build NFT Marketplace', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'nft-utilities',
        title: 'NFT Utilities and Gaming',
        description: 'Create utility NFTs and gaming assets',
        duration: '3 weeks',
        lessons: [
          { id: 'utility-nfts', title: 'Utility NFTs and Access Control', duration: '30 min', type: 'video' },
          { id: 'gaming-nfts', title: 'Gaming NFTs and Assets', duration: '35 min', type: 'interactive' },
          { id: 'utility-project', title: 'Build Utility NFT System', duration: '100 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Develop advanced NFT smart contracts',
      'Build NFT marketplace platforms',
      'Create utility and gaming NFTs',
      'Implement royalty and licensing systems'
    ],
    prerequisites: [
      'Completed NFT Fundamentals',
      'Solid Solidity programming skills',
      'Understanding of smart contract development'
    ],
    tools: ['Solidity', 'Hardhat', 'OpenZeppelin', 'IPFS', 'The Graph']
  },
  {
    id: 'nft-advanced',
    title: 'Enterprise NFT Solutions',
    description: 'Build scalable NFT platforms for enterprise use',
    longDescription: 'Master enterprise-level NFT development with advanced topics including cross-chain NFTs, fractional ownership, and enterprise NFT solutions. This premium course covers the cutting-edge of NFT technology for business applications.',
    instructor: 'Dr. Amanda Foster',
    duration: '12 weeks',
    level: 'Advanced',
    students: 900,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1646299220293-3ae516d9c275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxuZnQlMjBkaWdpdGFsJTIwYXJ0JTIwYmxvY2tjaGFpbnxlbnwxfHx8fDE3NTcyNjcyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Enterprise NFT', 'Cross-chain', 'Fractional', 'Advanced'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'NFT Development',
    modules: [
      {
        id: 'cross-chain-nfts',
        title: 'Cross-Chain NFTs',
        description: 'Build NFTs that work across multiple blockchains',
        duration: '4 weeks',
        lessons: [
          { id: 'cross-chain-theory', title: 'Cross-Chain NFT Theory', duration: '40 min', type: 'video' },
          { id: 'bridge-protocols', title: 'NFT Bridge Protocols', duration: '45 min', type: 'interactive' },
          { id: 'cross-chain-project', title: 'Build Cross-Chain NFT', duration: '180 min', type: 'project' }
        ]
      },
      {
        id: 'fractional-nfts',
        title: 'Fractional NFT Ownership',
        description: 'Create fractional ownership systems',
        duration: '4 weeks',
        lessons: [
          { id: 'fractional-theory', title: 'Fractional Ownership Theory', duration: '35 min', type: 'video' },
          { id: 'governance-fractions', title: 'Governance for Fractions', duration: '40 min', type: 'interactive' },
          { id: 'fractional-platform', title: 'Build Fractional Platform', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'enterprise-nfts',
        title: 'Enterprise NFT Solutions',
        description: 'Build NFT solutions for enterprise use',
        duration: '4 weeks',
        lessons: [
          { id: 'enterprise-use-cases', title: 'Enterprise NFT Use Cases', duration: '35 min', type: 'video' },
          { id: 'compliance-regulations', title: 'Compliance and Regulations', duration: '30 min', type: 'interactive' },
          { id: 'enterprise-platform', title: 'Build Enterprise NFT Platform', duration: '300 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build cross-chain NFT solutions',
      'Implement fractional NFT ownership',
      'Create enterprise NFT platforms',
      'Navigate NFT compliance and regulations'
    ],
    prerequisites: [
      'Completed NFT Smart Contract Development',
      'Advanced smart contract skills',
      'Understanding of enterprise software'
    ],
    tools: ['Solidity', 'Polygon', 'Arbitrum', 'LayerZero', 'Chainlink', 'IPFS']
  },

  // CRYPTOCURRENCY TRADING PATH
  {
    id: 'crypto-trading-basics',
    title: 'Cryptocurrency Trading Fundamentals',
    description: 'Learn the basics of cryptocurrency trading and market analysis',
    longDescription: 'Start your cryptocurrency trading journey with fundamental analysis, technical analysis, risk management, and trading psychology. Learn to read charts, understand market dynamics, and develop a systematic approach to crypto trading.',
    instructor: 'Robert Kim',
    duration: '8 weeks',
    level: 'Beginner',
    students: 11200,
    rating: 4.4,
    price: 0,
    image: 'https://images.unsplash.com/photo-1579225663317-c0251b4369bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmclMjBmaW5hbmNpYWwlMjBjaGFydHN8ZW58MXx8fHwxNzU3MjY3MjczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Trading', 'Technical Analysis', 'Risk Management', 'Charts'],
    certificate: true,
    featured: true,
    learningPath: 'Cryptocurrency Trading',
    modules: [
      {
        id: 'trading-basics',
        title: 'Trading Fundamentals',
        description: 'Learn the basics of cryptocurrency trading',
        duration: '3 weeks',
        lessons: [
          { id: 'market-basics', title: 'Cryptocurrency Markets Basics', duration: '25 min', type: 'video' },
          { id: 'exchanges', title: 'Cryptocurrency Exchanges', duration: '30 min', type: 'interactive' },
          { id: 'first-trade', title: 'Make Your First Trade', duration: '40 min', type: 'project' }
        ]
      },
      {
        id: 'technical-analysis',
        title: 'Technical Analysis',
        description: 'Learn to read charts and analyze price action',
        duration: '3 weeks',
        lessons: [
          { id: 'chart-reading', title: 'Chart Reading Basics', duration: '30 min', type: 'video' },
          { id: 'indicators', title: 'Technical Indicators', duration: '35 min', type: 'interactive' },
          { id: 'analysis-project', title: 'Perform Technical Analysis', duration: '60 min', type: 'project' }
        ]
      },
      {
        id: 'risk-management',
        title: 'Risk Management',
        description: 'Learn to manage risk and protect your capital',
        duration: '2 weeks',
        lessons: [
          { id: 'position-sizing', title: 'Position Sizing', duration: '25 min', type: 'video' },
          { id: 'stop-losses', title: 'Stop Losses and Take Profits', duration: '30 min', type: 'interactive' },
          { id: 'risk-strategy', title: 'Develop Risk Strategy', duration: '45 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Understand cryptocurrency market basics',
      'Perform technical analysis and chart reading',
      'Implement proper risk management',
      'Develop a systematic trading approach'
    ],
    prerequisites: [
      'Basic understanding of finance',
      'Cryptocurrency wallet setup',
      'Basic mathematical skills'
    ],
    tools: ['TradingView', 'Binance', 'Coinbase Pro', 'CoinGecko', 'Fear & Greed Index']
  },
  {
    id: 'crypto-trading-intermediate',
    title: 'Advanced Trading Strategies',
    description: 'Master advanced trading strategies and DeFi trading',
    longDescription: 'Take your trading to the next level with advanced strategies including derivatives, arbitrage, and DeFi trading. Learn to use leverage responsibly, implement automated trading strategies, and navigate complex DeFi protocols for trading opportunities.',
    instructor: 'Maria Gonzalez',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 5600,
    rating: 4.6,
    price: 0,
    image: 'https://images.unsplash.com/photo-1579225663317-c0251b4369bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmclMjBmaW5hbmNpYWwlMjBjaGFydHN8ZW58MXx8fHwxNzU3MjY3MjczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Advanced Trading', 'Derivatives', 'Arbitrage', 'DeFi Trading'],
    certificate: true,
    featured: true,
    learningPath: 'Cryptocurrency Trading',
    modules: [
      {
        id: 'derivatives-trading',
        title: 'Derivatives and Leverage',
        description: 'Learn to trade futures and options',
        duration: '4 weeks',
        lessons: [
          { id: 'futures-basics', title: 'Crypto Futures Trading', duration: '35 min', type: 'video' },
          { id: 'options-trading', title: 'Options Trading Strategies', duration: '40 min', type: 'interactive' },
          { id: 'leverage-project', title: 'Practice Leveraged Trading', duration: '90 min', type: 'project' }
        ]
      },
      {
        id: 'arbitrage-strategies',
        title: 'Arbitrage Trading',
        description: 'Master arbitrage opportunities',
        duration: '3 weeks',
        lessons: [
          { id: 'arbitrage-theory', title: 'Arbitrage Theory and Types', duration: '30 min', type: 'video' },
          { id: 'cross-exchange', title: 'Cross-Exchange Arbitrage', duration: '35 min', type: 'interactive' },
          { id: 'arbitrage-bot', title: 'Build Arbitrage Alert System', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'defi-trading',
        title: 'DeFi Trading Strategies',
        description: 'Trade on decentralized exchanges',
        duration: '3 weeks',
        lessons: [
          { id: 'dex-trading', title: 'DEX Trading Strategies', duration: '30 min', type: 'video' },
          { id: 'yield-strategies', title: 'Yield Trading Strategies', duration: '35 min', type: 'interactive' },
          { id: 'defi-portfolio', title: 'Build DeFi Trading Portfolio', duration: '100 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Trade derivatives and use leverage safely',
      'Identify and execute arbitrage opportunities',
      'Implement DeFi trading strategies',
      'Build automated trading systems'
    ],
    prerequisites: [
      'Completed Cryptocurrency Trading Fundamentals',
      'Experience with basic trading',
      'Understanding of DeFi protocols'
    ],
    tools: ['Binance Futures', 'Deribit', 'Uniswap', 'PancakeSwap', 'Python', 'APIs']
  },
  {
    id: 'crypto-trading-advanced',
    title: 'Institutional Trading & Quantitative Analysis',
    description: 'Master institutional-level trading and quantitative strategies',
    longDescription: 'Learn institutional-level trading strategies, quantitative analysis, and algorithmic trading. This premium course covers market making, statistical arbitrage, and building sophisticated trading systems used by hedge funds and professional traders.',
    instructor: 'Dr. Kevin Liu',
    duration: '14 weeks',
    level: 'Advanced',
    students: 1300,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1579225663317-c0251b4369bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmclMjBmaW5hbmNpYWwlMjBjaGFydHN8ZW58MXx8fHwxNzU3MjY3MjczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Quantitative', 'Algorithmic', 'Market Making', 'Institutional'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Cryptocurrency Trading',
    modules: [
      {
        id: 'quantitative-analysis',
        title: 'Quantitative Trading Models',
        description: 'Build statistical trading models',
        duration: '5 weeks',
        lessons: [
          { id: 'statistical-models', title: 'Statistical Trading Models', duration: '45 min', type: 'video' },
          { id: 'backtesting', title: 'Backtesting Strategies', duration: '50 min', type: 'interactive' },
          { id: 'quant-strategy', title: 'Build Quantitative Strategy', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'algorithmic-trading',
        title: 'Algorithmic Trading Systems',
        description: 'Build professional trading bots',
        duration: '5 weeks',
        lessons: [
          { id: 'trading-bots', title: 'Advanced Trading Bot Architecture', duration: '50 min', type: 'video' },
          { id: 'execution-algorithms', title: 'Execution Algorithms', duration: '45 min', type: 'interactive' },
          { id: 'institutional-bot', title: 'Build Institutional Trading Bot', duration: '300 min', type: 'project' }
        ]
      },
      {
        id: 'market-making',
        title: 'Market Making Strategies',
        description: 'Learn professional market making',
        duration: '4 weeks',
        lessons: [
          { id: 'market-making-theory', title: 'Market Making Theory', duration: '40 min', type: 'video' },
          { id: 'liquidity-provision', title: 'Liquidity Provision Strategies', duration: '45 min', type: 'interactive' },
          { id: 'market-maker-bot', title: 'Build Market Making Bot', duration: '250 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build quantitative trading models',
      'Develop professional algorithmic trading systems',
      'Implement market making strategies',
      'Master institutional trading techniques'
    ],
    prerequisites: [
      'Completed Advanced Trading Strategies',
      'Strong programming skills (Python)',
      'Advanced mathematics and statistics'
    ],
    tools: ['Python', 'TradingView', 'QuantLib', 'PostgreSQL', 'AWS', 'Professional APIs']
  },

  // FULL STACK DEVELOPMENT PATH
  {
    id: 'fullstack-fundamentals',
    title: 'Full Stack Development Fundamentals',
    description: 'Learn the complete web development stack from frontend to backend',
    longDescription: 'Start your full stack journey with comprehensive coverage of HTML, CSS, JavaScript, and basic server concepts. Build your first complete web applications and understand how frontend and backend work together.',
    instructor: 'Rachel Kim',
    duration: '12 weeks',
    level: 'Beginner',
    students: 18500,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTcyNjc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Full Stack'],
    certificate: true,
    featured: true,
    learningPath: 'Full Stack Development',
    modules: [
      {
        id: 'web-basics',
        title: 'Web Development Basics',
        description: 'Learn HTML, CSS, and JavaScript fundamentals',
        duration: '4 weeks',
        lessons: [
          { id: 'html-fundamentals', title: 'HTML Structure and Semantics', duration: '30 min', type: 'video' },
          { id: 'css-styling', title: 'CSS Styling and Layout', duration: '40 min', type: 'interactive' },
          { id: 'js-basics', title: 'JavaScript Fundamentals', duration: '45 min', type: 'video' },
          { id: 'first-website', title: 'Build Your First Website', duration: '90 min', type: 'project' }
        ]
      },
      {
        id: 'responsive-design',
        title: 'Responsive Web Design',
        description: 'Create websites that work on all devices',
        duration: '4 weeks',
        lessons: [
          { id: 'flexbox-grid', title: 'Flexbox and CSS Grid', duration: '35 min', type: 'video' },
          { id: 'media-queries', title: 'Media Queries and Breakpoints', duration: '30 min', type: 'interactive' },
          { id: 'responsive-project', title: 'Build Responsive Portfolio', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'backend-intro',
        title: 'Backend Development Introduction',
        description: 'Learn server-side development basics',
        duration: '4 weeks',
        lessons: [
          { id: 'server-concepts', title: 'Server and Database Concepts', duration: '25 min', type: 'video' },
          { id: 'nodejs-intro', title: 'Introduction to Node.js', duration: '35 min', type: 'interactive' },
          { id: 'fullstack-app', title: 'Build Full Stack Todo App', duration: '180 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build complete web applications from scratch',
      'Create responsive designs for all devices',
      'Understand frontend and backend integration',
      'Deploy applications to the web'
    ],
    prerequisites: [
      'Basic computer literacy',
      'No prior programming experience required'
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'VS Code', 'Git']
  },
  {
    id: 'mern-stack-development',
    title: 'MERN Stack Development',
    description: 'Master MongoDB, Express, React, and Node.js for full stack development',
    longDescription: 'Build modern full stack applications using the MERN stack. Learn to create RESTful APIs, manage databases, implement authentication, and deploy scalable web applications with industry-standard tools and practices.',
    instructor: 'David Chen',
    duration: '16 weeks',
    level: 'Intermediate',
    students: 9800,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTcyNjc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'MERN'],
    certificate: true,
    featured: true,
    learningPath: 'Full Stack Development',
    modules: [
      {
        id: 'mern-setup',
        title: 'MERN Stack Setup',
        description: 'Set up your MERN development environment',
        duration: '2 weeks',
        lessons: [
          { id: 'environment-setup', title: 'Development Environment Setup', duration: '30 min', type: 'interactive' },
          { id: 'project-structure', title: 'Project Structure and Architecture', duration: '25 min', type: 'video' },
          { id: 'initial-setup', title: 'Create MERN Boilerplate', duration: '60 min', type: 'project' }
        ]
      },
      {
        id: 'backend-api',
        title: 'Backend API Development',
        description: 'Build RESTful APIs with Express and MongoDB',
        duration: '6 weeks',
        lessons: [
          { id: 'express-advanced', title: 'Advanced Express.js', duration: '40 min', type: 'video' },
          { id: 'mongodb-integration', title: 'MongoDB Integration', duration: '45 min', type: 'interactive' },
          { id: 'auth-implementation', title: 'Authentication System', duration: '50 min', type: 'video' },
          { id: 'api-project', title: 'Build Complete API', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'frontend-react',
        title: 'Frontend with React',
        description: 'Build dynamic user interfaces with React',
        duration: '6 weeks',
        lessons: [
          { id: 'react-advanced', title: 'Advanced React Patterns', duration: '40 min', type: 'video' },
          { id: 'state-management', title: 'State Management with Context', duration: '35 min', type: 'interactive' },
          { id: 'api-integration', title: 'API Integration and Error Handling', duration: '45 min', type: 'video' },
          { id: 'frontend-project', title: 'Build React Frontend', duration: '180 min', type: 'project' }
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment and Production',
        description: 'Deploy MERN applications to production',
        duration: '2 weeks',
        lessons: [
          { id: 'production-build', title: 'Production Build Process', duration: '30 min', type: 'video' },
          { id: 'deployment-strategies', title: 'Deployment Strategies', duration: '35 min', type: 'interactive' },
          { id: 'final-deployment', title: 'Deploy Full Stack App', duration: '120 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build full stack applications with the MERN stack',
      'Create and consume RESTful APIs',
      'Implement user authentication and authorization',
      'Deploy applications to cloud platforms'
    ],
    prerequisites: [
      'Completed Full Stack Development Fundamentals',
      'Good understanding of JavaScript',
      'Basic React knowledge'
    ],
    tools: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Heroku', 'Netlify']
  },
  {
    id: 'enterprise-fullstack-architecture',
    title: 'Enterprise Full Stack Architecture',
    description: 'Master enterprise-level full stack development and system design',
    longDescription: 'Learn to design and build enterprise-scale full stack applications with microservices, advanced databases, caching, monitoring, and DevOps practices. This premium course covers everything needed for senior full stack roles.',
    instructor: 'Dr. Maria Santos',
    duration: '20 weeks',
    level: 'Advanced',
    students: 2400,
    rating: 4.9,
    price: 0,
    image: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTcyNjc4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Microservices', 'System Design', 'DevOps', 'Enterprise', 'Architecture'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Full Stack Development',
    modules: [
      {
        id: 'system-design',
        title: 'System Design and Architecture',
        description: 'Design scalable full stack systems',
        duration: '6 weeks',
        lessons: [
          { id: 'architecture-patterns', title: 'Enterprise Architecture Patterns', duration: '50 min', type: 'video' },
          { id: 'microservices-design', title: 'Microservices Design', duration: '55 min', type: 'interactive' },
          { id: 'system-design-project', title: 'Design Enterprise System', duration: '300 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-backend',
        title: 'Advanced Backend Engineering',
        description: 'Build high-performance backend systems',
        duration: '8 weeks',
        lessons: [
          { id: 'microservices-impl', title: 'Microservices Implementation', duration: '60 min', type: 'video' },
          { id: 'caching-strategies', title: 'Caching and Performance', duration: '45 min', type: 'interactive' },
          { id: 'event-driven', title: 'Event-Driven Architecture', duration: '50 min', type: 'video' },
          { id: 'backend-system', title: 'Build Microservices System', duration: '400 min', type: 'project' }
        ]
      },
      {
        id: 'devops-deployment',
        title: 'DevOps and Production',
        description: 'Master DevOps practices for full stack applications',
        duration: '6 weeks',
        lessons: [
          { id: 'containerization', title: 'Docker and Kubernetes', duration: '55 min', type: 'video' },
          { id: 'ci-cd-pipelines', title: 'CI/CD Pipelines', duration: '50 min', type: 'interactive' },
          { id: 'monitoring-logging', title: 'Monitoring and Logging', duration: '45 min', type: 'video' },
          { id: 'enterprise-deployment', title: 'Enterprise Deployment Project', duration: '500 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Design enterprise-scale full stack architectures',
      'Implement microservices and distributed systems',
      'Master DevOps practices and CI/CD pipelines',
      'Build high-performance, scalable applications'
    ],
    prerequisites: [
      'Completed MERN Stack Development',
      'Strong full stack development experience',
      'Understanding of databases and system design'
    ],
    tools: ['Docker', 'Kubernetes', 'AWS', 'Redis', 'GraphQL', 'TypeScript', 'Jest']
  },

  // FRONTEND DEVELOPMENT PATH
  {
    id: 'frontend-fundamentals',
    title: 'Frontend Development Fundamentals',
    description: 'Master modern frontend development with HTML, CSS, and JavaScript',
    longDescription: 'Build beautiful, interactive user interfaces with modern frontend technologies. Learn responsive design, CSS frameworks, JavaScript DOM manipulation, and create stunning web experiences.',
    instructor: 'Emily Zhang',
    duration: '10 weeks',
    level: 'Beginner',
    students: 16200,
    rating: 4.6,
    price: 0,
    image: 'https://images.unsplash.com/photo-1720329461027-f34c265b1d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm9udGVuZCUyMGRldmVsb3BtZW50JTIwcmVzcG9uc2l2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTcyNjc4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Frontend'],
    certificate: true,
    featured: true,
    learningPath: 'Frontend Development',
    modules: [
      {
        id: 'html-css-mastery',
        title: 'HTML & CSS Mastery',
        description: 'Master semantic HTML and modern CSS',
        duration: '4 weeks',
        lessons: [
          { id: 'semantic-html', title: 'Semantic HTML5', duration: '25 min', type: 'video' },
          { id: 'css-flexbox-grid', title: 'CSS Flexbox and Grid', duration: '40 min', type: 'interactive' },
          { id: 'css-animations', title: 'CSS Animations and Transitions', duration: '35 min', type: 'video' },
          { id: 'landing-page', title: 'Build Stunning Landing Page', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'javascript-dom',
        title: 'JavaScript and DOM',
        description: 'Make websites interactive with JavaScript',
        duration: '4 weeks',
        lessons: [
          { id: 'js-fundamentals', title: 'JavaScript Fundamentals', duration: '35 min', type: 'video' },
          { id: 'dom-manipulation', title: 'DOM Manipulation', duration: '40 min', type: 'interactive' },
          { id: 'event-handling', title: 'Event Handling and Forms', duration: '30 min', type: 'video' },
          { id: 'interactive-app', title: 'Build Interactive Web App', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'responsive-frameworks',
        title: 'Responsive Design & Frameworks',
        description: 'Create responsive designs with CSS frameworks',
        duration: '2 weeks',
        lessons: [
          { id: 'responsive-principles', title: 'Responsive Design Principles', duration: '30 min', type: 'video' },
          { id: 'css-frameworks', title: 'CSS Frameworks (Bootstrap, Tailwind)', duration: '35 min', type: 'interactive' },
          { id: 'responsive-portfolio', title: 'Build Responsive Portfolio', duration: '100 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Create semantic, accessible HTML structures',
      'Design responsive layouts with CSS Grid and Flexbox',
      'Build interactive experiences with JavaScript',
      'Use modern CSS frameworks effectively'
    ],
    prerequisites: [
      'Basic computer skills',
      'No programming experience required'
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'VS Code']
  },
  {
    id: 'modern-frontend-frameworks',
    title: 'Modern Frontend Frameworks',
    description: 'Master React, Vue, and Angular for building dynamic applications',
    longDescription: 'Learn the most popular frontend frameworks and libraries. Compare React, Vue, and Angular, understand when to use each, and build complex single-page applications with component-based architecture.',
    instructor: 'Alex Rodriguez',
    duration: '14 weeks',
    level: 'Intermediate',
    students: 8600,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1720329461027-f34c265b1d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm9udGVuZCUyMGRldmVsb3BtZW50JTIwcmVzcG9uc2l2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTcyNjc4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'Vue', 'Angular', 'SPA', 'Component Architecture'],
    certificate: true,
    featured: true,
    learningPath: 'Frontend Development',
    modules: [
      {
        id: 'react-deep-dive',
        title: 'React Deep Dive',
        description: 'Master React and its ecosystem',
        duration: '5 weeks',
        lessons: [
          { id: 'react-advanced', title: 'Advanced React Concepts', duration: '45 min', type: 'video' },
          { id: 'hooks-context', title: 'Hooks and Context API', duration: '40 min', type: 'interactive' },
          { id: 'react-router', title: 'React Router and Navigation', duration: '30 min', type: 'video' },
          { id: 'react-app', title: 'Build React E-commerce App', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'vue-framework',
        title: 'Vue.js Framework',
        description: 'Learn Vue.js for progressive web development',
        duration: '4 weeks',
        lessons: [
          { id: 'vue-basics', title: 'Vue.js Fundamentals', duration: '35 min', type: 'video' },
          { id: 'vuex-routing', title: 'Vuex and Vue Router', duration: '40 min', type: 'interactive' },
          { id: 'vue-project', title: 'Build Vue Dashboard', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'angular-framework',
        title: 'Angular Framework',
        description: 'Build enterprise applications with Angular',
        duration: '5 weeks',
        lessons: [
          { id: 'angular-fundamentals', title: 'Angular Fundamentals', duration: '40 min', type: 'video' },
          { id: 'services-routing', title: 'Services and Routing', duration: '45 min', type: 'interactive' },
          { id: 'angular-project', title: 'Build Angular CRM System', duration: '250 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build complex SPAs with React, Vue, and Angular',
      'Understand component-based architecture',
      'Implement state management solutions',
      'Choose the right framework for different projects'
    ],
    prerequisites: [
      'Completed Frontend Development Fundamentals',
      'Strong JavaScript knowledge',
      'Understanding of ES6+ features'
    ],
    tools: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Redux', 'Vuex', 'RxJS']
  },
  {
    id: 'advanced-frontend-architecture',
    title: 'Advanced Frontend Architecture',
    description: 'Master advanced frontend patterns and performance optimization',
    longDescription: 'Learn advanced frontend architecture patterns, micro-frontends, performance optimization, testing strategies, and build tools. This premium course covers everything needed for senior frontend engineering roles.',
    instructor: 'Dr. Sophie Chen',
    duration: '16 weeks',
    level: 'Advanced',
    students: 3200,
    rating: 4.9,
    price: 0,
    image: 'https://images.unsplash.com/photo-1720329461027-f34c265b1d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm9udGVuZCUyMGRldmVsb3BtZW50JTIwcmVzcG9uc2l2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTcyNjc4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Micro-frontends', 'Performance', 'Testing', 'Architecture', 'Advanced'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Frontend Development',
    modules: [
      {
        id: 'micro-frontends',
        title: 'Micro-Frontend Architecture',
        description: 'Build scalable micro-frontend systems',
        duration: '6 weeks',
        lessons: [
          { id: 'micro-frontend-concepts', title: 'Micro-Frontend Concepts', duration: '45 min', type: 'video' },
          { id: 'module-federation', title: 'Module Federation', duration: '50 min', type: 'interactive' },
          { id: 'micro-frontend-project', title: 'Build Micro-Frontend System', duration: '300 min', type: 'project' }
        ]
      },
      {
        id: 'performance-optimization',
        title: 'Performance Optimization',
        description: 'Optimize frontend applications for maximum performance',
        duration: '5 weeks',
        lessons: [
          { id: 'performance-metrics', title: 'Performance Metrics and Monitoring', duration: '40 min', type: 'video' },
          { id: 'optimization-techniques', title: 'Advanced Optimization Techniques', duration: '45 min', type: 'interactive' },
          { id: 'performance-project', title: 'Optimize Real Application', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'testing-deployment',
        title: 'Testing and Deployment Strategies',
        description: 'Master frontend testing and deployment',
        duration: '5 weeks',
        lessons: [
          { id: 'testing-strategies', title: 'Advanced Testing Strategies', duration: '40 min', type: 'video' },
          { id: 'e2e-testing', title: 'End-to-End Testing', duration: '35 min', type: 'interactive' },
          { id: 'deployment-strategies', title: 'Advanced Deployment Strategies', duration: '40 min', type: 'video' },
          { id: 'enterprise-frontend', title: 'Enterprise Frontend Project', duration: '400 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Design and implement micro-frontend architectures',
      'Optimize applications for maximum performance',
      'Implement comprehensive testing strategies',
      'Master advanced deployment and CI/CD practices'
    ],
    prerequisites: [
      'Completed Modern Frontend Frameworks',
      'Strong experience with frontend frameworks',
      'Understanding of build tools and bundlers'
    ],
    tools: ['Webpack', 'Vite', 'Jest', 'Cypress', 'Lighthouse', 'Docker', 'GitHub Actions']
  },

  // BACKEND DEVELOPMENT PATH
  {
    id: 'backend-fundamentals',
    title: 'Backend Development Fundamentals',
    description: 'Learn server-side development with Node.js and Python',
    longDescription: 'Start your backend development journey with server-side programming fundamentals. Learn Node.js, Python, databases, API design, and build scalable server applications.',
    instructor: 'Michael Torres',
    duration: '12 weeks',
    level: 'Beginner',
    students: 14800,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwc2VydmVyJTIwZGV2ZWxvcG1lbnQlMjBBUEl8ZW58MXx8fHwxNzU3MjY3ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Node.js', 'Python', 'API', 'Database', 'Backend'],
    certificate: true,
    featured: true,
    learningPath: 'Backend Development',
    modules: [
      {
        id: 'server-concepts',
        title: 'Server-Side Concepts',
        description: 'Understand how servers and backend systems work',
        duration: '3 weeks',
        lessons: [
          { id: 'http-protocols', title: 'HTTP Protocols and Web Servers', duration: '30 min', type: 'video' },
          { id: 'api-concepts', title: 'API Design Concepts', duration: '25 min', type: 'video' },
          { id: 'first-server', title: 'Build Your First Server', duration: '60 min', type: 'project' }
        ]
      },
      {
        id: 'nodejs-development',
        title: 'Node.js Development',
        description: 'Build APIs with Node.js and Express',
        duration: '5 weeks',
        lessons: [
          { id: 'nodejs-fundamentals', title: 'Node.js Fundamentals', duration: '35 min', type: 'video' },
          { id: 'express-framework', title: 'Express.js Framework', duration: '40 min', type: 'interactive' },
          { id: 'middleware-routing', title: 'Middleware and Routing', duration: '30 min', type: 'video' },
          { id: 'nodejs-api', title: 'Build RESTful API', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'databases',
        title: 'Database Integration',
        description: 'Work with databases and data persistence',
        duration: '4 weeks',
        lessons: [
          { id: 'database-concepts', title: 'Database Concepts', duration: '25 min', type: 'video' },
          { id: 'mongodb-integration', title: 'MongoDB Integration', duration: '35 min', type: 'interactive' },
          { id: 'sql-basics', title: 'SQL and PostgreSQL', duration: '30 min', type: 'video' },
          { id: 'data-project', title: 'Build Data-Driven API', duration: '180 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build RESTful APIs with Node.js',
      'Integrate databases with backend applications',
      'Understand server architecture and design patterns',
      'Handle authentication and data validation'
    ],
    prerequisites: [
      'Basic JavaScript knowledge',
      'Understanding of web development concepts',
      'Command line familiarity'
    ],
    tools: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Postman', 'VS Code']
  },
  {
    id: 'api-development-databases',
    title: 'Advanced API Development & Databases',
    description: 'Master API design, database optimization, and authentication systems',
    longDescription: 'Build professional-grade APIs with advanced features like authentication, caching, rate limiting, and database optimization. Learn microservices patterns and prepare for production deployment.',
    instructor: 'Dr. James Wilson',
    duration: '14 weeks',
    level: 'Intermediate',
    students: 7400,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwc2VydmVyJTIwZGV2ZWxvcG1lbnQlMjBBUEl8ZW58MXx8fHwxNzU3MjY3ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['API Design', 'Authentication', 'Database Optimization', 'Microservices'],
    certificate: true,
    featured: true,
    learningPath: 'Backend Development',
    modules: [
      {
        id: 'advanced-api-design',
        title: 'Advanced API Design',
        description: 'Design scalable and maintainable APIs',
        duration: '5 weeks',
        lessons: [
          { id: 'api-architecture', title: 'API Architecture Patterns', duration: '40 min', type: 'video' },
          { id: 'graphql-apis', title: 'GraphQL vs REST APIs', duration: '45 min', type: 'interactive' },
          { id: 'api-versioning', title: 'API Versioning and Documentation', duration: '35 min', type: 'video' },
          { id: 'advanced-api', title: 'Build Advanced API System', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'authentication-security',
        title: 'Authentication & Security',
        description: 'Implement secure authentication systems',
        duration: '4 weeks',
        lessons: [
          { id: 'jwt-oauth', title: 'JWT and OAuth Implementation', duration: '40 min', type: 'video' },
          { id: 'security-best-practices', title: 'API Security Best Practices', duration: '35 min', type: 'interactive' },
          { id: 'auth-system', title: 'Build Complete Auth System', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'database-optimization',
        title: 'Database Optimization',
        description: 'Optimize database performance and scalability',
        duration: '5 weeks',
        lessons: [
          { id: 'query-optimization', title: 'Query Optimization Techniques', duration: '35 min', type: 'video' },
          { id: 'database-scaling', title: 'Database Scaling Strategies', duration: '40 min', type: 'interactive' },
          { id: 'caching-strategies', title: 'Caching and Performance', duration: '35 min', type: 'video' },
          { id: 'optimized-system', title: 'Build Optimized Data System', duration: '250 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Design scalable API architectures',
      'Implement secure authentication and authorization',
      'Optimize database performance and queries',
      'Build production-ready backend systems'
    ],
    prerequisites: [
      'Completed Backend Development Fundamentals',
      'Good understanding of databases',
      'Experience with Node.js or Python'
    ],
    tools: ['Node.js', 'GraphQL', 'Redis', 'JWT', 'Docker', 'PostgreSQL', 'MongoDB']
  },
  {
    id: 'microservices-cloud-architecture',
    title: 'Microservices & Cloud Architecture',
    description: 'Master microservices, cloud deployment, and distributed systems',
    longDescription: 'Learn to design and build enterprise-scale backend systems with microservices architecture, cloud deployment, containerization, and distributed system patterns. This premium course covers advanced backend engineering.',
    instructor: 'Dr. Lisa Chang',
    duration: '18 weeks',
    level: 'Advanced',
    students: 2800,
    rating: 4.9,
    price: 0,
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwc2VydmVyJTIwZGV2ZWxvcG1lbnQlMjBBUEl8ZW58MXx8fHwxNzU3MjY3ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Microservices', 'Cloud', 'Kubernetes', 'Distributed Systems', 'Advanced'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Backend Development',
    modules: [
      {
        id: 'microservices-architecture',
        title: 'Microservices Architecture',
        description: 'Design and implement microservices systems',
        duration: '7 weeks',
        lessons: [
          { id: 'microservices-patterns', title: 'Microservices Design Patterns', duration: '50 min', type: 'video' },
          { id: 'service-communication', title: 'Service Communication Patterns', duration: '45 min', type: 'interactive' },
          { id: 'distributed-data', title: 'Distributed Data Management', duration: '40 min', type: 'video' },
          { id: 'microservices-project', title: 'Build Microservices System', duration: '400 min', type: 'project' }
        ]
      },
      {
        id: 'containerization-orchestration',
        title: 'Containerization & Orchestration',
        description: 'Master Docker and Kubernetes',
        duration: '6 weeks',
        lessons: [
          { id: 'docker-advanced', title: 'Advanced Docker Concepts', duration: '45 min', type: 'video' },
          { id: 'kubernetes-deployment', title: 'Kubernetes Deployment', duration: '55 min', type: 'interactive' },
          { id: 'service-mesh', title: 'Service Mesh and Istio', duration: '40 min', type: 'video' },
          { id: 'k8s-project', title: 'Deploy to Kubernetes', duration: '300 min', type: 'project' }
        ]
      },
      {
        id: 'cloud-deployment',
        title: 'Cloud Deployment & Monitoring',
        description: 'Deploy and monitor cloud applications',
        duration: '5 weeks',
        lessons: [
          { id: 'cloud-platforms', title: 'Cloud Platform Comparison', duration: '40 min', type: 'video' },
          { id: 'monitoring-logging', title: 'Monitoring and Logging', duration: '45 min', type: 'interactive' },
          { id: 'devops-practices', title: 'DevOps Best Practices', duration: '35 min', type: 'video' },
          { id: 'enterprise-deployment', title: 'Enterprise Cloud Deployment', duration: '500 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Design and implement microservices architectures',
      'Master containerization with Docker and Kubernetes',
      'Deploy applications to major cloud platforms',
      'Implement monitoring and observability systems'
    ],
    prerequisites: [
      'Completed Advanced API Development & Databases',
      'Strong backend development experience',
      'Understanding of system design principles'
    ],
    tools: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Terraform', 'Prometheus']
  },

  // WEB DEVELOPMENT PATH
  {
    id: 'web-development-basics',
    title: 'Web Development Fundamentals',
    description: 'Complete introduction to web development and modern web standards',
    longDescription: 'Start your web development journey with a comprehensive foundation in HTML, CSS, JavaScript, and web standards. Learn to build responsive, accessible websites and understand how the web works.',
    instructor: 'Sarah Johnson',
    duration: '10 weeks',
    level: 'Beginner',
    students: 22500,
    rating: 4.5,
    price: 0,
    image: 'https://images.unsplash.com/photo-1691073112675-9685bc6779bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNwb25zaXZlJTIwd2ViJTIwZGVzaWduJTIwbW9iaWxlfGVufDF8fHx8MTc1NzI2NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Standards', 'Responsive'],
    certificate: true,
    featured: true,
    learningPath: 'Web Development',
    modules: [
      {
        id: 'web-fundamentals',
        title: 'Web Fundamentals',
        description: 'Understanding how the web works',
        duration: '3 weeks',
        lessons: [
          { id: 'how-web-works', title: 'How the Web Works', duration: '25 min', type: 'video' },
          { id: 'html-structure', title: 'HTML Structure and Semantics', duration: '35 min', type: 'interactive' },
          { id: 'css-styling', title: 'CSS Styling Fundamentals', duration: '40 min', type: 'video' },
          { id: 'first-webpage', title: 'Build Your First Webpage', duration: '90 min', type: 'project' }
        ]
      },
      {
        id: 'responsive-design',
        title: 'Responsive Web Design',
        description: 'Create websites that work on all devices',
        duration: '4 weeks',
        lessons: [
          { id: 'mobile-first', title: 'Mobile-First Design Approach', duration: '30 min', type: 'video' },
          { id: 'css-grid-flexbox', title: 'CSS Grid and Flexbox Mastery', duration: '45 min', type: 'interactive' },
          { id: 'media-queries', title: 'Media Queries and Breakpoints', duration: '25 min', type: 'video' },
          { id: 'responsive-site', title: 'Build Responsive Website', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'javascript-interactivity',
        title: 'JavaScript Interactivity',
        description: 'Add interactivity to your websites',
        duration: '3 weeks',
        lessons: [
          { id: 'js-basics', title: 'JavaScript Basics', duration: '30 min', type: 'video' },
          { id: 'dom-events', title: 'DOM Manipulation and Events', duration: '35 min', type: 'interactive' },
          { id: 'interactive-features', title: 'Build Interactive Features', duration: '120 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build responsive websites from scratch',
      'Understand web standards and accessibility',
      'Create interactive user experiences',
      'Deploy websites to the internet'
    ],
    prerequisites: [
      'Basic computer literacy',
      'No prior coding experience required'
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'VS Code', 'Git', 'GitHub Pages']
  },
  {
    id: 'responsive-design-performance',
    title: 'Responsive Design & Performance Optimization',
    description: 'Master advanced responsive design and web performance optimization',
    longDescription: 'Take your web development skills to the next level with advanced responsive design techniques, performance optimization, accessibility, and modern web development workflows.',
    instructor: 'Carlos Martinez',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 9200,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1691073112675-9685bc6779bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNwb25zaXZlJTIwd2ViJTIwZGVzaWduJTIwbW9iaWxlfGVufDF8fHx8MTc1NzI2NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Responsive Design', 'Performance', 'Accessibility', 'CSS Advanced'],
    certificate: true,
    featured: true,
    learningPath: 'Web Development',
    modules: [
      {
        id: 'advanced-css',
        title: 'Advanced CSS Techniques',
        description: 'Master advanced CSS features and methodologies',
        duration: '4 weeks',
        lessons: [
          { id: 'css-grid-advanced', title: 'Advanced CSS Grid Layouts', duration: '40 min', type: 'video' },
          { id: 'css-custom-properties', title: 'CSS Custom Properties and Theming', duration: '35 min', type: 'interactive' },
          { id: 'css-animations', title: 'Complex CSS Animations', duration: '45 min', type: 'video' },
          { id: 'advanced-layout', title: 'Build Advanced Layout System', duration: '180 min', type: 'project' }
        ]
      },
      {
        id: 'performance-optimization',
        title: 'Web Performance Optimization',
        description: 'Optimize websites for maximum performance',
        duration: '4 weeks',
        lessons: [
          { id: 'performance-metrics', title: 'Performance Metrics and Tools', duration: '30 min', type: 'video' },
          { id: 'image-optimization', title: 'Image and Asset Optimization', duration: '35 min', type: 'interactive' },
          { id: 'lazy-loading', title: 'Lazy Loading and Code Splitting', duration: '30 min', type: 'video' },
          { id: 'performance-project', title: 'Optimize Website Performance', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'accessibility-seo',
        title: 'Accessibility & SEO',
        description: 'Build accessible and SEO-friendly websites',
        duration: '4 weeks',
        lessons: [
          { id: 'web-accessibility', title: 'Web Accessibility Guidelines', duration: '35 min', type: 'video' },
          { id: 'seo-fundamentals', title: 'SEO Fundamentals', duration: '30 min', type: 'interactive' },
          { id: 'accessible-site', title: 'Build Accessible Website', duration: '120 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Create advanced responsive layouts',
      'Optimize websites for maximum performance',
      'Build accessible and inclusive web experiences',
      'Implement SEO best practices'
    ],
    prerequisites: [
      'Completed Web Development Fundamentals',
      'Good understanding of HTML, CSS, and JavaScript',
      'Experience building basic websites'
    ],
    tools: ['CSS3', 'Sass/SCSS', 'Lighthouse', 'WebPageTest', 'Figma', 'Photoshop']
  },
  {
    id: 'progressive-web-apps',
    title: 'Progressive Web Apps & Modern Standards',
    description: 'Build PWAs and master cutting-edge web technologies',
    longDescription: 'Master the latest web technologies including Progressive Web Apps, Web Components, Service Workers, and modern browser APIs. This premium course covers the cutting edge of web development.',
    instructor: 'Dr. Anna Peterson',
    duration: '14 weeks',
    level: 'Advanced',
    students: 4100,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1691073112675-9685bc6779bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNwb25zaXZlJTIwd2ViJTIwZGVzaWduJTIwbW9iaWxlfGVufDF8fHx8MTc1NzI2NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['PWA', 'Service Workers', 'Web Components', 'Modern Web', 'Advanced'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Web Development',
    modules: [
      {
        id: 'progressive-web-apps',
        title: 'Progressive Web Applications',
        description: 'Build app-like web experiences',
        duration: '5 weeks',
        lessons: [
          { id: 'pwa-concepts', title: 'PWA Concepts and Architecture', duration: '40 min', type: 'video' },
          { id: 'service-workers', title: 'Service Workers and Caching', duration: '45 min', type: 'interactive' },
          { id: 'web-app-manifest', title: 'Web App Manifest and Installation', duration: '35 min', type: 'video' },
          { id: 'pwa-project', title: 'Build Complete PWA', duration: '300 min', type: 'project' }
        ]
      },
      {
        id: 'web-components',
        title: 'Web Components',
        description: 'Create reusable web components',
        duration: '4 weeks',
        lessons: [
          { id: 'custom-elements', title: 'Custom Elements API', duration: '35 min', type: 'video' },
          { id: 'shadow-dom', title: 'Shadow DOM and Encapsulation', duration: '40 min', type: 'interactive' },
          { id: 'component-library', title: 'Build Component Library', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'modern-web-apis',
        title: 'Modern Web APIs',
        description: 'Leverage cutting-edge browser APIs',
        duration: '5 weeks',
        lessons: [
          { id: 'web-apis', title: 'Modern Browser APIs', duration: '45 min', type: 'video' },
          { id: 'webrtc-websockets', title: 'WebRTC and WebSockets', duration: '50 min', type: 'interactive' },
          { id: 'web-assembly', title: 'Introduction to WebAssembly', duration: '40 min', type: 'video' },
          { id: 'modern-web-project', title: 'Build Modern Web Application', duration: '400 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Build Progressive Web Applications',
      'Create reusable Web Components',
      'Implement Service Workers and offline functionality',
      'Use modern browser APIs and technologies'
    ],
    prerequisites: [
      'Completed Responsive Design & Performance Optimization',
      'Strong JavaScript knowledge',
      'Experience with modern web development'
    ],
    tools: ['PWA Tools', 'Workbox', 'Lit', 'Stencil', 'WebAssembly', 'Modern Browsers']
  },

  // PROGRAMMING LANGUAGES
  {
    id: 'python-programming-basics',
    title: 'Python Programming Fundamentals',
    description: 'Master Python programming from basics to advanced concepts',
    longDescription: 'Learn Python, one of the most popular programming languages. Master syntax, data structures, object-oriented programming, and popular libraries for web development, data science, and automation.',
    instructor: 'Dr. Lisa Wang',
    duration: '14 weeks',
    level: 'Beginner',
    students: 28500,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBwcm9ncmFtbWluZyUyMGxhbmd1YWdlJTIwY29kZXxlbnwxfHx8fDE3NTcyNjc4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Python', 'Programming', 'Data Science', 'Automation', 'OOP'],
    certificate: true,
    featured: true,
    learningPath: 'Programming Languages',
    modules: [
      {
        id: 'python-basics',
        title: 'Python Fundamentals',
        description: 'Learn Python syntax and basic concepts',
        duration: '4 weeks',
        lessons: [
          { id: 'python-intro', title: 'Introduction to Python', duration: '25 min', type: 'video' },
          { id: 'variables-types', title: 'Variables and Data Types', duration: '30 min', type: 'interactive' },
          { id: 'control-flow', title: 'Control Flow and Loops', duration: '35 min', type: 'video' },
          { id: 'first-program', title: 'Build Your First Python Program', duration: '60 min', type: 'project' }
        ]
      },
      {
        id: 'data-structures',
        title: 'Data Structures and Functions',
        description: 'Master Python data structures and functions',
        duration: '5 weeks',
        lessons: [
          { id: 'lists-tuples', title: 'Lists, Tuples, and Dictionaries', duration: '40 min', type: 'video' },
          { id: 'functions', title: 'Functions and Modules', duration: '35 min', type: 'interactive' },
          { id: 'file-handling', title: 'File Handling and I/O', duration: '30 min', type: 'video' },
          { id: 'data-project', title: 'Build Data Processing Tool', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'oop-libraries',
        title: 'OOP and Popular Libraries',
        description: 'Learn object-oriented programming and libraries',
        duration: '5 weeks',
        lessons: [
          { id: 'oop-concepts', title: 'Object-Oriented Programming', duration: '45 min', type: 'video' },
          { id: 'popular-libraries', title: 'Popular Python Libraries', duration: '40 min', type: 'interactive' },
          { id: 'web-scraping', title: 'Web Scraping with Python', duration: '35 min', type: 'video' },
          { id: 'final-project', title: 'Build Complete Python Application', duration: '240 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Write clean, efficient Python code',
      'Understand object-oriented programming principles',
      'Use popular Python libraries and frameworks',
      'Build automation scripts and applications'
    ],
    prerequisites: [
      'Basic computer literacy',
      'No prior programming experience required'
    ],
    tools: ['Python', 'PyCharm/VS Code', 'Jupyter Notebook', 'pip', 'NumPy', 'Pandas']
  },
  {
    id: 'typescript-development',
    title: 'TypeScript Development',
    description: 'Master TypeScript for large-scale application development',
    longDescription: 'Learn TypeScript, the typed superset of JavaScript. Master type systems, interfaces, generics, and advanced TypeScript features for building maintainable, scalable applications.',
    instructor: 'Alex Kim',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 12400,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1672308627194-9a2c28daa17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBlc2NyaXB0JTIwamF2YXNjcmlwdCUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc1NzI2NzgxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['TypeScript', 'JavaScript', 'Type Safety', 'Large Scale', 'Development'],
    certificate: true,
    featured: true,
    learningPath: 'Programming Languages',
    modules: [
      {
        id: 'typescript-fundamentals',
        title: 'TypeScript Fundamentals',
        description: 'Learn TypeScript basics and type system',
        duration: '4 weeks',
        lessons: [
          { id: 'ts-intro', title: 'Introduction to TypeScript', duration: '25 min', type: 'video' },
          { id: 'basic-types', title: 'Basic Types and Type Annotations', duration: '30 min', type: 'interactive' },
          { id: 'interfaces', title: 'Interfaces and Type Aliases', duration: '35 min', type: 'video' },
          { id: 'first-ts-app', title: 'Build Your First TypeScript App', duration: '90 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-types',
        title: 'Advanced TypeScript Features',
        description: 'Master advanced TypeScript concepts',
        duration: '3 weeks',
        lessons: [
          { id: 'generics', title: 'Generics and Utility Types', duration: '40 min', type: 'video' },
          { id: 'decorators', title: 'Decorators and Metadata', duration: '35 min', type: 'interactive' },
          { id: 'advanced-project', title: 'Build Type-Safe Library', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'typescript-ecosystem',
        title: 'TypeScript Ecosystem',
        description: 'Use TypeScript with popular frameworks',
        duration: '3 weeks',
        lessons: [
          { id: 'react-typescript', title: 'TypeScript with React', duration: '35 min', type: 'video' },
          { id: 'node-typescript', title: 'TypeScript with Node.js', duration: '30 min', type: 'interactive' },
          { id: 'fullstack-ts', title: 'Build Full Stack TypeScript App', duration: '180 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Write type-safe JavaScript applications',
      'Master advanced TypeScript features',
      'Use TypeScript with popular frameworks',
      'Build maintainable large-scale applications'
    ],
    prerequisites: [
      'Strong JavaScript knowledge',
      'Experience with modern JavaScript features',
      'Understanding of object-oriented programming'
    ],
    tools: ['TypeScript', 'VS Code', 'Node.js', 'React', 'Express.js', 'Jest']
  },
  {
    id: 'java-enterprise-development',
    title: 'Java Enterprise Development',
    description: 'Master Java for enterprise application development',
    longDescription: 'Learn Java, one of the most popular enterprise programming languages. Master object-oriented programming, Spring framework, microservices, and build scalable enterprise applications.',
    instructor: 'Dr. Robert Chen',
    duration: '16 weeks',
    level: 'Intermediate',
    students: 15800,
    rating: 4.6,
    price: 0,
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhJTIwcHJvZ3JhbW1pbmclMjBlbnRlcnByaXNlJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU3MjY3ODE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Java', 'Spring', 'Enterprise', 'Microservices', 'Backend'],
    certificate: true,
    featured: true,
    learningPath: 'Programming Languages',
    modules: [
      {
        id: 'java-fundamentals',
        title: 'Java Fundamentals',
        description: 'Master Java syntax and OOP concepts',
        duration: '6 weeks',
        lessons: [
          { id: 'java-basics', title: 'Java Syntax and Basics', duration: '35 min', type: 'video' },
          { id: 'java-oop', title: 'Object-Oriented Programming in Java', duration: '45 min', type: 'interactive' },
          { id: 'collections', title: 'Collections and Data Structures', duration: '40 min', type: 'video' },
          { id: 'java-project', title: 'Build Java Console Application', duration: '180 min', type: 'project' }
        ]
      },
      {
        id: 'spring-framework',
        title: 'Spring Framework',
        description: 'Learn the Spring ecosystem',
        duration: '6 weeks',
        lessons: [
          { id: 'spring-core', title: 'Spring Core and Dependency Injection', duration: '40 min', type: 'video' },
          { id: 'spring-boot', title: 'Spring Boot Applications', duration: '45 min', type: 'interactive' },
          { id: 'spring-data', title: 'Spring Data and JPA', duration: '40 min', type: 'video' },
          { id: 'spring-project', title: 'Build Spring Boot API', duration: '240 min', type: 'project' }
        ]
      },
      {
        id: 'enterprise-patterns',
        title: 'Enterprise Development Patterns',
        description: 'Master enterprise Java patterns',
        duration: '4 weeks',
        lessons: [
          { id: 'design-patterns', title: 'Java Design Patterns', duration: '40 min', type: 'video' },
          { id: 'microservices-java', title: 'Microservices with Java', duration: '45 min', type: 'interactive' },
          { id: 'enterprise-project', title: 'Build Enterprise Java System', duration: '300 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Master Java programming and OOP concepts',
      'Build applications with Spring Framework',
      'Understand enterprise development patterns',
      'Create scalable Java microservices'
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of object-oriented concepts',
      'Familiarity with databases'
    ],
    tools: ['Java', 'Spring Boot', 'Maven/Gradle', 'IntelliJ IDEA', 'PostgreSQL', 'Docker']
  },
  {
    id: 'rust-systems-programming',
    title: 'Rust Systems Programming',
    description: 'Master Rust for high-performance systems programming',
    longDescription: 'Learn Rust, the systems programming language focused on safety and performance. Master memory management, concurrency, and build high-performance applications and blockchain systems.',
    instructor: 'Dr. Sarah Mitchell',
    duration: '12 weeks',
    level: 'Advanced',
    students: 6200,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1514070706115-47c142769603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0JTIwcHJvZ3JhbW1pbmclMjBzeXN0ZW1zJTIwbGFuZ3VhZ2V8ZW58MXx8fHwxNzU3MjY3ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Rust', 'Systems Programming', 'Performance', 'Memory Safety', 'Concurrency'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Programming Languages',
    modules: [
      {
        id: 'rust-fundamentals',
        title: 'Rust Fundamentals',
        description: 'Learn Rust syntax and ownership system',
        duration: '4 weeks',
        lessons: [
          { id: 'rust-intro', title: 'Introduction to Rust', duration: '30 min', type: 'video' },
          { id: 'ownership-borrowing', title: 'Ownership and Borrowing', duration: '45 min', type: 'interactive' },
          { id: 'structs-enums', title: 'Structs, Enums, and Pattern Matching', duration: '40 min', type: 'video' },
          { id: 'first-rust-program', title: 'Build Your First Rust Program', duration: '120 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-rust',
        title: 'Advanced Rust Concepts',
        description: 'Master advanced Rust features',
        duration: '4 weeks',
        lessons: [
          { id: 'traits-generics', title: 'Traits and Generics', duration: '40 min', type: 'video' },
          { id: 'error-handling', title: 'Error Handling and Result Types', duration: '35 min', type: 'interactive' },
          { id: 'concurrency', title: 'Concurrency and Async Programming', duration: '45 min', type: 'video' },
          { id: 'advanced-rust-project', title: 'Build Concurrent Rust Application', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'systems-development',
        title: 'Systems Development with Rust',
        description: 'Build systems and blockchain applications',
        duration: '4 weeks',
        lessons: [
          { id: 'systems-programming', title: 'Systems Programming Concepts', duration: '40 min', type: 'video' },
          { id: 'web-apis-rust', title: 'Building Web APIs with Rust', duration: '45 min', type: 'interactive' },
          { id: 'blockchain-rust', title: 'Blockchain Development with Rust', duration: '50 min', type: 'video' },
          { id: 'systems-project', title: 'Build High-Performance System', duration: '300 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Master Rust programming and memory safety',
      'Build high-performance systems applications',
      'Understand concurrent and async programming',
      'Develop blockchain applications with Rust'
    ],
    prerequisites: [
      'Strong programming background',
      'Understanding of systems programming concepts',
      'Experience with compiled languages'
    ],
    tools: ['Rust', 'Cargo', 'VS Code', 'Tokio', 'Serde', 'Actix-web']
  },
  {
    id: 'go-cloud-development',
    title: 'Go Cloud Development',
    description: 'Master Go programming for cloud and distributed systems',
    longDescription: 'Learn Go (Golang), the language designed for cloud computing. Master Go syntax, concurrency patterns, and build scalable microservices and cloud applications.',
    instructor: 'Michael Zhang',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 8900,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbyUyMGdvbGFuZyUyMHByb2dyYW1taW5nJTIwY2xvdWR8ZW58MXx8fHwxNzU3MjY3ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Go', 'Golang', 'Cloud', 'Microservices', 'Concurrency'],
    certificate: true,
    featured: true,
    learningPath: 'Programming Languages',
    modules: [
      {
        id: 'go-fundamentals',
        title: 'Go Programming Fundamentals',
        description: 'Learn Go syntax and basic concepts',
        duration: '4 weeks',
        lessons: [
          { id: 'go-intro', title: 'Introduction to Go', duration: '25 min', type: 'video' },
          { id: 'go-syntax', title: 'Go Syntax and Data Types', duration: '35 min', type: 'interactive' },
          { id: 'functions-packages', title: 'Functions and Packages', duration: '30 min', type: 'video' },
          { id: 'first-go-app', title: 'Build Your First Go Application', duration: '90 min', type: 'project' }
        ]
      },
      {
        id: 'concurrency-patterns',
        title: 'Go Concurrency Patterns',
        description: 'Master Go concurrency with goroutines',
        duration: '4 weeks',
        lessons: [
          { id: 'goroutines', title: 'Goroutines and Channels', duration: '40 min', type: 'video' },
          { id: 'concurrency-patterns', title: 'Common Concurrency Patterns', duration: '45 min', type: 'interactive' },
          { id: 'sync-primitives', title: 'Synchronization Primitives', duration: '35 min', type: 'video' },
          { id: 'concurrent-app', title: 'Build Concurrent Application', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'cloud-microservices',
        title: 'Cloud and Microservices',
        description: 'Build cloud applications and microservices',
        duration: '4 weeks',
        lessons: [
          { id: 'web-services', title: 'Building Web Services in Go', duration: '40 min', type: 'video' },
          { id: 'microservices-go', title: 'Microservices Architecture', duration: '45 min', type: 'interactive' },
          { id: 'cloud-deployment', title: 'Cloud Deployment and Containerization', duration: '35 min', type: 'video' },
          { id: 'cloud-project', title: 'Build Cloud Microservice System', duration: '250 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Master Go programming language',
      'Build concurrent applications with goroutines',
      'Create scalable microservices',
      'Deploy applications to cloud platforms'
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of web development concepts',
      'Familiarity with command line'
    ],
    tools: ['Go', 'Docker', 'Kubernetes', 'VS Code', 'PostgreSQL', 'Redis']
  },

  // BLOCKCHAIN SECURITY PATH  
  {
    id: 'blockchain-security-basics',
    title: 'Blockchain Security Fundamentals',
    description: 'Learn the basics of blockchain and smart contract security',
    longDescription: 'Understand the security landscape of blockchain technology, common vulnerabilities, and best practices for secure development. Learn to identify and prevent security issues in smart contracts and DApps.',
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    students: 6400,
    rating: 4.7,
    price: 0,
    image: 'https://images.unsplash.com/photo-1660836814985-8523a0d713b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjeWJlcnNlY3VyaXR5JTIwYmxvY2tjaGFpbiUyMG5ldHdvcmslMjBzZWN1cml0eXxlbnwxfHx8fDE3NTcyNjcyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Security', 'Smart Contracts', 'Vulnerabilities', 'Best Practices'],
    certificate: true,
    featured: true,
    learningPath: 'Blockchain Security',
    modules: [
      {
        id: 'security-intro',
        title: 'Blockchain Security Overview',
        description: 'Introduction to blockchain security concepts',
        duration: '3 weeks',
        lessons: [
          { id: 'security-landscape', title: 'Blockchain Security Landscape', duration: '25 min', type: 'video' },
          { id: 'threat-models', title: 'Threat Models and Attack Vectors', duration: '30 min', type: 'video' },
          { id: 'security-analysis', title: 'Analyze Security Incident', duration: '45 min', type: 'project' }
        ]
      },
      {
        id: 'smart-contract-security',
        title: 'Smart Contract Security',
        description: 'Learn common smart contract vulnerabilities',
        duration: '3 weeks',
        lessons: [
          { id: 'common-vulnerabilities', title: 'Common Smart Contract Vulnerabilities', duration: '35 min', type: 'video' },
          { id: 'security-patterns', title: 'Security Patterns and Best Practices', duration: '30 min', type: 'interactive' },
          { id: 'vulnerability-assessment', title: 'Perform Security Assessment', duration: '60 min', type: 'project' }
        ]
      },
      {
        id: 'security-tools',
        title: 'Security Tools and Testing',
        description: 'Learn to use security tools and testing frameworks',
        duration: '2 weeks',
        lessons: [
          { id: 'security-tools', title: 'Security Analysis Tools', duration: '30 min', type: 'video' },
          { id: 'testing-frameworks', title: 'Security Testing Frameworks', duration: '25 min', type: 'interactive' },
          { id: 'security-audit', title: 'Conduct Security Audit', duration: '90 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Understand blockchain security fundamentals',
      'Identify common smart contract vulnerabilities',
      'Use security analysis tools',
      'Implement security best practices'
    ],
    prerequisites: [
      'Basic blockchain knowledge',
      'Understanding of smart contracts',
      'Basic programming experience'
    ],
    tools: ['Slither', 'MythX', 'Echidna', 'Hardhat', 'OpenZeppelin']
  },
  {
    id: 'blockchain-security-intermediate',
    title: 'Advanced Security Analysis',
    description: 'Master advanced security analysis and auditing techniques',
    longDescription: 'Develop advanced skills in security analysis, formal verification, and professional auditing. Learn to conduct comprehensive security assessments and build secure blockchain applications from the ground up.',
    instructor: 'Alex Zhang',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 2800,
    rating: 4.8,
    price: 0,
    image: 'https://images.unsplash.com/photo-1660836814985-8523a0d713b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjeWJlcnNlY3VyaXR5JTIwYmxvY2tjaGFpbiUyMG5ldHdvcmslMjBzZWN1cml0eXxlbnwxfHx8fDE3NTcyNjcyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Security Auditing', 'Formal Verification', 'Advanced Analysis'],
    certificate: true,
    featured: true,
    learningPath: 'Blockchain Security',
    modules: [
      {
        id: 'formal-verification',
        title: 'Formal Verification',
        description: 'Learn formal verification techniques',
        duration: '4 weeks',
        lessons: [
          { id: 'formal-methods', title: 'Formal Methods in Blockchain', duration: '40 min', type: 'video' },
          { id: 'specification-languages', title: 'Specification Languages', duration: '35 min', type: 'interactive' },
          { id: 'formal-verification-project', title: 'Formal Verification Project', duration: '150 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-auditing',
        title: 'Professional Auditing',
        description: 'Learn professional auditing methodologies',
        duration: '4 weeks',
        lessons: [
          { id: 'audit-methodologies', title: 'Audit Methodologies', duration: '35 min', type: 'video' },
          { id: 'reporting', title: 'Audit Reporting and Documentation', duration: '30 min', type: 'interactive' },
          { id: 'professional-audit', title: 'Conduct Professional Audit', duration: '200 min', type: 'project' }
        ]
      },
      {
        id: 'security-architecture',
        title: 'Security Architecture',
        description: 'Design secure blockchain architectures',
        duration: '4 weeks',
        lessons: [
          { id: 'secure-design', title: 'Secure Design Patterns', duration: '35 min', type: 'video' },
          { id: 'defense-depth', title: 'Defense in Depth Strategies', duration: '30 min', type: 'interactive' },
          { id: 'secure-system', title: 'Design Secure System', duration: '180 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Perform formal verification of smart contracts',
      'Conduct professional security audits',
      'Design secure blockchain architectures',
      'Implement advanced security measures'
    ],
    prerequisites: [
      'Completed Blockchain Security Fundamentals',
      'Solid smart contract development experience',
      'Understanding of cryptography'
    ],
    tools: ['Certora', 'K Framework', 'Dafny', 'TLA+', 'Manticore']
  },
  {
    id: 'blockchain-security-advanced',
    title: 'Enterprise Security & Incident Response',
    description: 'Master enterprise-level security and incident response',
    longDescription: 'Become a blockchain security expert with enterprise-level security frameworks, incident response procedures, and advanced threat detection. This premium course covers the highest levels of blockchain security for enterprise and government applications.',
    instructor: 'Dr. Jennifer Martinez',
    duration: '16 weeks',
    level: 'Advanced',
    students: 800,
    rating: 4.9,
    price: 0,
    image: 'https://images.unsplash.com/photo-1660836814985-8523a0d713b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjeWJlcnNlY3VyaXR5JTIwYmxvY2tjaGFpbiUyMG5ldHdvcmslMjBzZWN1cml0eXxlbnwxfHx8fDE3NTcyNjcyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Enterprise Security', 'Incident Response', 'Threat Detection', 'Advanced'],
    certificate: true,
    featured: true,
    premium: true,
    learningPath: 'Blockchain Security',
    modules: [
      {
        id: 'enterprise-frameworks',
        title: 'Enterprise Security Frameworks',
        description: 'Implement enterprise security frameworks',
        duration: '6 weeks',
        lessons: [
          { id: 'security-frameworks', title: 'Enterprise Security Frameworks', duration: '45 min', type: 'video' },
          { id: 'compliance', title: 'Regulatory Compliance in Blockchain', duration: '40 min', type: 'interactive' },
          { id: 'framework-implementation', title: 'Implement Security Framework', duration: '300 min', type: 'project' }
        ]
      },
      {
        id: 'incident-response',
        title: 'Incident Response & Forensics',
        description: 'Master incident response procedures',
        duration: '5 weeks',
        lessons: [
          { id: 'incident-response', title: 'Blockchain Incident Response', duration: '45 min', type: 'video' },
          { id: 'forensic-analysis', title: 'Blockchain Forensic Analysis', duration: '50 min', type: 'interactive' },
          { id: 'incident-simulation', title: 'Incident Response Simulation', duration: '250 min', type: 'project' }
        ]
      },
      {
        id: 'advanced-threats',
        title: 'Advanced Threat Detection',
        description: 'Detect and prevent advanced threats',
        duration: '5 weeks',
        lessons: [
          { id: 'threat-intelligence', title: 'Blockchain Threat Intelligence', duration: '40 min', type: 'video' },
          { id: 'anomaly-detection', title: 'Anomaly Detection Systems', duration: '45 min', type: 'interactive' },
          { id: 'threat-detection-system', title: 'Build Threat Detection System', duration: '400 min', type: 'project' }
        ]
      }
    ],
    learningOutcomes: [
      'Implement enterprise security frameworks',
      'Lead blockchain incident response efforts',
      'Build advanced threat detection systems',
      'Manage blockchain security at scale'
    ],
    prerequisites: [
      'Completed Advanced Security Analysis',
      'Professional security experience',
      'Advanced technical knowledge'
    ],
    tools: ['Splunk', 'ELK Stack', 'Chainalysis', 'Elliptic', 'TRM Labs', 'Custom tools']
  }
];

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getCoursesByLevel(level: Course['level']): Course[] {
  return courses.filter(course => course.level === level);
}

export function getCoursesByLearningPath(path: string): Course[] {
  return courses.filter(course => course.learningPath === path);
}

export function getPremiumCourses(): Course[] {
  return courses.filter(course => course.premium);
}

export function getFreeCourses(): Course[] {
  return courses.filter(course => !course.premium);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter(course => course.featured);
}

export function getLearningPaths(): string[] {
  const paths = courses
    .filter(course => course.learningPath)
    .map(course => course.learningPath!)
    .filter((path, index, arr) => arr.indexOf(path) === index);
  return paths;
}
