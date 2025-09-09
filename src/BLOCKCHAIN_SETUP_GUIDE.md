# 🔗 Blockademia Token Setup Guide

## 📋 Overview
This guide will help you deploy and configure your BLOCK token on Monad testnet for the Blockademia platform.

---

## 🚀 Step 1: Deploy Your BLOCK Token

### A. Smart Contract Code

Create this ERC-20 token contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockademiaToken is ERC20, Ownable {
    uint256 public constant FAUCET_AMOUNT = 100 * 10**18; // 100 BLOCK tokens
    uint256 public constant MAX_FAUCET_PER_USER = 1000 * 10**18; // 1000 BLOCK max per user
    
    mapping(address => uint256) public faucetClaimed;
    
    event FaucetUsed(address indexed user, uint256 amount);
    event RewardDistributed(address indexed user, uint256 amount, string reason);
    
    constructor() ERC20("Blockademia Token", "BLOCK") {
        // Mint initial supply to contract owner (1 million tokens)
        _mint(msg.sender, 1000000 * 10**18);
    }
    
    /**
     * @dev Faucet function for users to claim test tokens
     */
    function faucet() external {
        require(
            faucetClaimed[msg.sender] + FAUCET_AMOUNT <= MAX_FAUCET_PER_USER,
            "Faucet limit exceeded"
        );
        
        faucetClaimed[msg.sender] += FAUCET_AMOUNT;
        _mint(msg.sender, FAUCET_AMOUNT);
        
        emit FaucetUsed(msg.sender, FAUCET_AMOUNT);
    }
    
    /**
     * @dev Owner function to distribute rewards to learners
     */
    function distributeReward(
        address recipient, 
        uint256 amount, 
        string memory reason
    ) external onlyOwner {
        _mint(recipient, amount);
        emit RewardDistributed(recipient, amount, reason);
    }
    
    /**
     * @dev Batch reward distribution for efficient gas usage
     */
    function batchDistributeRewards(
        address[] memory recipients,
        uint256[] memory amounts,
        string memory reason
    ) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
            emit RewardDistributed(recipients[i], amounts[i], reason);
        }
    }
    
    /**
     * @dev Check how much a user can still claim from faucet
     */
    function remainingFaucetAmount(address user) external view returns (uint256) {
        uint256 claimed = faucetClaimed[user];
        if (claimed >= MAX_FAUCET_PER_USER) {
            return 0;
        }
        return MAX_FAUCET_PER_USER - claimed;
    }
}
```

### B. Deployment Steps

1. **Set up development environment:**
   ```bash
   npm install -g @remix-project/remixd
   # or use Hardhat/Truffle
   ```

2. **Add Monad Testnet to MetaMask:**
   - Network Name: `Monad Testnet`
   - RPC URL: `https://testnet1.monad.xyz`
   - Chain ID: `666`
   - Currency Symbol: `MON`
   - Block Explorer: `https://testnet-explorer.monad.xyz`

3. **Get testnet MON tokens:**
   - Visit: https://testnet-faucet.monad.xyz
   - Request MON tokens for gas fees

4. **Deploy the contract:**
   - Use Remix IDE: https://remix.ethereum.org
   - Compile with Solidity 0.8.19+
   - Deploy to Monad Testnet
   - **Save the contract address!**

---

## ⚙️ Step 2: Configure Blockademia

### A. Update Blockchain Configuration

Edit `/config/blockchain.ts`:

```typescript
export const BLOCKCHAIN_CONFIG = {
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

  BLOCK_TOKEN: {
    // 🚨 REPLACE WITH YOUR ACTUAL CONTRACT ADDRESS
    address: '0xYOUR_DEPLOYED_CONTRACT_ADDRESS_HERE',
    name: 'Blockademia Token',
    symbol: 'BLOCK',
    decimals: 18,
    
    hasFaucetFunction: true,
    hasOwnerMint: true,
    
    rewards: {
      lessonCompletion: 50,      // 50 BLOCK per lesson
      courseCompletion: 200,     // 200 BLOCK per course
      levelUp: 100,              // 100 BLOCK per level
      dailyStreak: 25,           // 25 BLOCK for streaks
      achievementBonus: {
        min: 25,
        max: 500,
      },
    },
  },
};
```

### B. Test Token Integration

1. **Connect wallet to your site**
2. **Switch to Monad testnet**
3. **Test faucet function:**
   ```javascript
   // This should work in your dApp
   const faucetResult = await tokenContract.faucet();
   ```
4. **Verify balance updates**

---

## 🔧 Step 3: Web3 Integration Testing

### A. Test Wallet Connection
- [ ] MetaMask connects successfully
- [ ] Network switches to Monad testnet automatically
- [ ] Wallet address displays correctly

### B. Test Token Functions
- [ ] Faucet function works (users can claim tokens)
- [ ] Balance displays correctly
- [ ] Token transfers work
- [ ] Reward distribution functions

### C. Test Learning Rewards
- [ ] Lesson completion awards tokens
- [ ] Course completion awards tokens
- [ ] Level up awards tokens
- [ ] Achievement unlocks award tokens

---

## 📊 Step 4: Monitor & Verify

### A. Block Explorer Verification
1. Visit: https://testnet-explorer.monad.xyz
2. Search for your contract address
3. Verify contract code (optional but recommended)
4. Monitor transactions

### B. Contract Verification (Recommended)
```bash
# Using Hardhat verify plugin
npx hardhat verify --network monad_testnet YOUR_CONTRACT_ADDRESS

# Or manually on explorer
# Copy your contract source code to the block explorer verification page
```

### C. Set Up Monitoring
- Monitor contract transactions
- Track token distribution
- Monitor faucet usage
- Log user interactions

---

## 🛡️ Security Considerations

### A. Rate Limiting
Your contract includes:
- Maximum 1000 BLOCK tokens per user from faucet
- 100 BLOCK tokens per faucet call

### B. Access Control
- Only contract owner can distribute rewards
- Faucet has built-in limits
- Standard ERC-20 security practices

### C. Upgrade Path
- Consider using OpenZeppelin's upgradeable contracts for future versions
- Plan for mainnet deployment later

---

## 📈 Usage Analytics

### A. Track These Metrics
- Total tokens distributed
- Active users claiming rewards
- Course completion rates
- Token circulation

### B. Dashboard Integration
Your Blockademia platform will automatically track:
- User token balances
- Reward distribution history
- Learning progress correlation with token earnings

---

## 🚨 Troubleshooting

### Common Issues:

1. **"Gas estimation failed"**
   - Ensure you have enough MON tokens for gas
   - Check if faucet limit is reached

2. **"Transaction failed"**
   - Verify contract address is correct
   - Check network connection

3. **"Contract not found"**
   - Double-check the contract address
   - Ensure you're on Monad testnet

4. **Tokens not showing in wallet**
   - Add token manually to MetaMask
   - Use contract address and 18 decimals

---

## ✅ Deployment Checklist

- [ ] BLOCK token contract deployed to Monad testnet
- [ ] Contract address updated in `/config/blockchain.ts`
- [ ] Faucet function tested and working
- [ ] Reward distribution tested
- [ ] Block explorer verification completed
- [ ] MetaMask integration tested
- [ ] Token balance display working
- [ ] Learning rewards distribution working

---

## 🎉 You're Ready!

Once you complete this checklist, your Blockademia platform will have:
- ✅ Full Web3 integration
- ✅ Token-based reward system
- ✅ Seamless wallet connection
- ✅ Automated learning incentives

Your users can now:
1. Connect their MetaMask wallet
2. Claim BLOCK tokens from the faucet
3. Earn tokens by completing lessons
4. Track their token balance and rewards
5. Use tokens within the platform economy

Deploy with confidence! 🚀