import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

// Types for our gamification system
export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXP: number;
  blocktokens: number; // Our testnet token
  coursesCompleted: string[];
  streakDays: number;
  lastActivity: Date;
  achievements: Achievement[];
  courseProgress: { [courseId: string]: CourseProgress };
}

export interface CourseProgress {
  courseId: string;
  progress: number; // 0-100
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: Date;
  xpEarned: number;
  completed: boolean;
  completedAt?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  xpReward: number;
  tokenReward: number;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  cost: number; // in BLOCK tokens
  type: 'coupon' | 'course_unlock' | 'premium_access' | 'special';
  discount?: number;
  icon: string;
  available: boolean;
}

interface GameContextType {
  userProgress: UserProgress | null;
  isLoading: boolean;
  
  // XP and leveling functions
  addXP: (amount: number, source: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  completeCourse: (courseId: string) => void;
  completeLesson: (lessonId: string, score: number) => void;
  
  // Token functions
  addTokens: (amount: number, reason: string) => void;
  faucetTokens: (amount: number, reason: string) => void;
  faucetToWallet: (amount: number, reason: string) => Promise<boolean>;
  spendTokens: (amount: number, itemId: string) => boolean;
  
  // Progress tracking
  getCourseProgress: (courseId: string) => CourseProgress | null;
  getOverallProgress: () => number;
  getStats: () => { totalCourses: number; completedCourses: number; totalLessons: number; completedLessons: number };
  
  // Project completion bonuses
  awardProjectBonus: (projectType: string, difficulty: 'easy' | 'medium' | 'hard', score: number) => void;
  
  // Marketplace
  marketplaceItems: MarketplaceItem[];
  purchaseItem: (itemId: string) => boolean;
  
  // Achievements
  checkAchievements: () => void;
  unlockAchievement: (achievementId: string) => void;
  
  // Web3 integration
  getWeb3Integration: () => { hasWallet: boolean; canReceiveTokens: boolean };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// XP calculation constants
const XP_PER_LESSON = 50;
const XP_PER_COURSE = 200;
const XP_DAILY_BONUS = 25;
const BASE_XP_FOR_LEVEL_UP = 1000;
const TOKENS_PER_LEVEL = 100;

// Level calculation function
const calculateLevel = (totalXP: number): number => {
  return Math.floor(totalXP / BASE_XP_FOR_LEVEL_UP) + 1;
};

const calculateXPToNextLevel = (totalXP: number): number => {
  const currentLevel = calculateLevel(totalXP);
  const xpForNextLevel = currentLevel * BASE_XP_FOR_LEVEL_UP;
  return xpForNextLevel - totalXP;
};

// Mock marketplace items
const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'discount_10',
    name: '10% Course Discount',
    description: 'Get 10% off any premium course',
    cost: 150,
    type: 'coupon',
    discount: 10,
    icon: '🎫',
    available: true
  },
  {
    id: 'discount_25',
    name: '25% Course Discount',
    description: 'Get 25% off any premium course',
    cost: 300,
    type: 'coupon',
    discount: 25,
    icon: '🎟️',
    available: true
  },
  {
    id: 'premium_month',
    name: '1 Month Premium Access',
    description: 'Unlock all premium courses for 30 days',
    cost: 500,
    type: 'premium_access',
    icon: '👑',
    available: true
  },
  {
    id: 'solana_unlock',
    name: 'Solana Fellowship Access',
    description: 'Unlock the exclusive Solana Fellowship course',
    cost: 750,
    type: 'course_unlock',
    icon: '⚡',
    available: true
  },
  {
    id: 'smart_contracts_unlock',
    name: 'Smart Contract Development',
    description: 'Unlock advanced smart contract course',
    cost: 600,
    type: 'course_unlock',
    icon: '🔗',
    available: true
  },
  {
    id: 'exclusive_nft',
    name: 'Blockademia NFT Certificate',
    description: 'Limited edition blockchain certificate',
    cost: 1000,
    type: 'special',
    icon: '🏆',
    available: true
  }
];

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    xpReward: 50,
    tokenReward: 25
  },
  {
    id: 'first_course',
    name: 'Course Crusher',
    description: 'Complete your first course',
    icon: '📚',
    xpReward: 200,
    tokenReward: 100
  },
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    xpReward: 100,
    tokenReward: 150
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    xpReward: 300,
    tokenReward: 200
  },
  {
    id: 'blockchain_master',
    name: 'Blockchain Master',
    description: 'Complete 5 blockchain courses',
    icon: '⛓️',
    xpReward: 500,
    tokenReward: 500
  }
];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [marketplaceItems] = useState<MarketplaceItem[]>(MARKETPLACE_ITEMS);
  
  // Web3 integration (will be injected by Web3Provider)
  const [web3Context, setWeb3Context] = useState<any>(null);

  // Initialize user progress when user logs in
  useEffect(() => {
    if (user) {
      initializeUserProgress();
    } else {
      setUserProgress(null);
      setIsLoading(false);
    }
  }, [user]);

  const initializeUserProgress = () => {
    // In a real app, this would fetch from Supabase
    // For now, we'll use localStorage with some mock data
    const savedProgress = localStorage.getItem(`userProgress_${user?.id}`);
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      // Convert dates back from strings
      progress.lastActivity = new Date(progress.lastActivity);
      progress.achievements = progress.achievements.map((ach: any) => ({
        ...ach,
        unlockedAt: new Date(ach.unlockedAt)
      }));
      setUserProgress(progress);
    } else {
      // Create new user progress
      const newProgress: UserProgress = {
        userId: user!.id,
        level: 1,
        xp: 0,
        xpToNextLevel: BASE_XP_FOR_LEVEL_UP,
        totalXP: 0,
        blocktokens: 100, // Starting tokens
        coursesCompleted: [],
        streakDays: 0,
        lastActivity: new Date(),
        achievements: [],
        courseProgress: {}
      };
      setUserProgress(newProgress);
      saveUserProgress(newProgress);
    }
    setIsLoading(false);
  };

  const saveUserProgress = (progress: UserProgress) => {
    localStorage.setItem(`userProgress_${user?.id}`, JSON.stringify(progress));
  };

  const addXP = (amount: number, source: string) => {
    if (!userProgress) return;

    const newTotalXP = userProgress.totalXP + amount;
    const newLevel = calculateLevel(newTotalXP);
    const newXPToNext = calculateXPToNextLevel(newTotalXP);
    const currentXP = newTotalXP % BASE_XP_FOR_LEVEL_UP;

    const updatedProgress = {
      ...userProgress,
      xp: currentXP,
      totalXP: newTotalXP,
      xpToNextLevel: newXPToNext,
      level: newLevel,
      lastActivity: new Date()
    };

    // Check for level up
    if (newLevel > userProgress.level) {
      const tokensAwarded = (newLevel - userProgress.level) * TOKENS_PER_LEVEL;
      updatedProgress.blocktokens += tokensAwarded;
      
      toast.success(`🎉 Level Up! You're now level ${newLevel}!`, {
        description: `Earned ${tokensAwarded} BLOCK tokens!`
      });
      
      // Trigger token faucet to wallet if available, fallback to local
      setTimeout(async () => {
        const success = await faucetToWallet(tokensAwarded, `Level ${newLevel} reached`);
        if (!success) {
          faucetTokens(tokensAwarded, `Level ${newLevel} reached`);
        }
      }, 1000);
    }

    toast.success(`+${amount} XP from ${source}`, {
      description: `Total XP: ${newTotalXP}`
    });

    setUserProgress(updatedProgress);
    saveUserProgress(updatedProgress);
    checkAchievements();
  };

  const completeLesson = (lessonId: string, score: number) => {
    if (!userProgress) return;

    // Award XP based on lesson score
    const xpReward = Math.floor((score / 100) * XP_PER_LESSON);
    addXP(xpReward, `Lesson completed: ${lessonId}`);

    // Award bonus tokens for high scores
    if (score >= 90) {
      const tokenBonus = 25;
      addTokens(tokenBonus, 'Lesson excellence bonus (90%+ score)');
    } else if (score >= 75) {
      const tokenBonus = 15;
      addTokens(tokenBonus, 'Lesson proficiency bonus (75%+ score)');
    }

    toast.success('🎓 Lesson Completed!', {
      description: `Score: ${score}% | +${xpReward} XP`
    });
  };

  const addTokens = (amount: number, reason: string) => {
    if (!userProgress) return;

    const updatedProgress = {
      ...userProgress,
      blocktokens: userProgress.blocktokens + amount
    };

    setUserProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    toast.success(`💰 +${amount} BLOCK tokens`, {
      description: reason
    });
  };

  const awardProjectBonus = (projectType: string, difficulty: 'easy' | 'medium' | 'hard', score: number) => {
    if (!userProgress) return;

    // Calculate bonus based on project difficulty and score
    const difficultyMultipliers = {
      easy: 1,
      medium: 1.5,
      hard: 2
    };

    const baseBonus = 50;
    const difficultyBonus = Math.floor(baseBonus * difficultyMultipliers[difficulty]);
    const scoreMultiplier = score / 100;
    const finalBonus = Math.floor(difficultyBonus * scoreMultiplier);

    const xpBonus = finalBonus;
    const tokenBonus = Math.floor(finalBonus / 2);

    addXP(xpBonus, `${projectType} project completed`);
    
    // Try to send tokens to wallet first
    setTimeout(async () => {
      const success = await faucetToWallet(tokenBonus, `${projectType} project bonus`);
      if (!success) {
        addTokens(tokenBonus, `${projectType} project bonus`);
      }
    }, 500);

    // Extra rewards for perfect scores
    if (score === 100) {
      const perfectBonus = 25;
      addTokens(perfectBonus, 'Perfect project score bonus!');
      
      toast.success('🏆 Perfect Score!', {
        description: `Additional ${perfectBonus} BLOCK tokens awarded!`
      });
    }

    toast.success(`🛠️ Project Completed!`, {
      description: `${difficulty.toUpperCase()} ${projectType} | Score: ${score}% | +${xpBonus} XP +${tokenBonus} tokens`
    });
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    if (!userProgress) return;

    const currentProgress = userProgress.courseProgress[courseId] || {
      courseId,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 10, // Default, could be dynamic
      lastAccessed: new Date(),
      xpEarned: 0,
      completed: false
    };

    const progressDifference = Math.max(0, progress - currentProgress.progress);
    const xpGained = Math.floor((progressDifference / 100) * XP_PER_COURSE);

    const updatedCourseProgress = {
      ...currentProgress,
      progress,
      lastAccessed: new Date(),
      xpEarned: currentProgress.xpEarned + xpGained,
      lessonsCompleted: Math.floor((progress / 100) * currentProgress.totalLessons)
    };

    const updatedProgress = {
      ...userProgress,
      courseProgress: {
        ...userProgress.courseProgress,
        [courseId]: updatedCourseProgress
      }
    };

    setUserProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    if (xpGained > 0) {
      addXP(xpGained, `Course progress: ${courseId}`);
    }
  };

  const completeCourse = (courseId: string, courseName: string = 'Unknown Course') => {
    if (!userProgress) return;

    const courseProgress = userProgress.courseProgress[courseId];
    if (courseProgress && !courseProgress.completed) {
      const updatedCourseProgress = {
        ...courseProgress,
        progress: 100,
        completed: true,
        completedAt: new Date()
      };

      const updatedProgress = {
        ...userProgress,
        coursesCompleted: [...userProgress.coursesCompleted, courseId],
        courseProgress: {
          ...userProgress.courseProgress,
          [courseId]: updatedCourseProgress
        }
      };

      setUserProgress(updatedProgress);
      saveUserProgress(updatedProgress);

      // Generate certificate
      generateCertificate(courseId, courseName, updatedCourseProgress);

      // Award completion XP and tokens
      addXP(XP_PER_COURSE, `Course completed: ${courseId}`);
      
      // Try to send tokens to wallet first
      setTimeout(async () => {
        const success = await faucetToWallet(TOKENS_PER_LEVEL, `Course completion bonus`);
        if (!success) {
          faucetTokens(TOKENS_PER_LEVEL, `Course completion bonus`);
        }
      }, 500);

      toast.success('🎉 Course Completed! 🏆', {
        description: `You earned ${XP_PER_COURSE} XP, ${TOKENS_PER_LEVEL} BLOCK tokens, and a certificate!`
      });

      // Show certificate notification
      setTimeout(() => {
        toast.success('📜 Certificate Generated!', {
          description: `Your completion certificate for ${courseName} has been added to your profile.`,
          action: {
            label: 'View Certificate',
            onClick: () => window.open('/certificates', '_blank')
          }
        });
      }, 2000);
    }
  };

  const generateCertificate = (courseId: string, courseName: string, courseProgress: CourseProgress) => {
    if (!user || !userProgress) return;

    // Calculate grade based on XP earned and course performance
    const grade = calculateGrade(courseProgress, userProgress);
    
    // Generate certificate ID
    const certificateId = `CERT-${courseId.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Get course skills based on courseId
    const skills = getCourseSkills(courseId);
    
    // Create certificate record
    const certificate = {
      id: certificateId,
      courseId,
      courseName,
      studentName: user.name,
      completionDate: new Date().toISOString().split('T')[0],
      grade,
      instructorName: getInstructorName(courseId),
      skills,
      duration: getCourseDuration(courseId),
      projectsCompleted: Math.floor((courseProgress.xpEarned / XP_PER_COURSE) * 5), // Estimate projects
      issuedDate: new Date().toISOString(),
      blockchainHash: generateBlockchainHash()
    };

    // Save certificate to user's profile
    saveCertificate(certificate);
  };

  const calculateGrade = (courseProgress: CourseProgress, userProgress: UserProgress): string => {
    const completionRatio = courseProgress.xpEarned / XP_PER_COURSE;
    
    if (completionRatio >= 0.9) return 'Excellent';
    if (completionRatio >= 0.7) return 'Good';
    return 'Satisfactory';
  };

  const getCourseSkills = (courseId: string): string[] => {
    const skillsMap: { [key: string]: string[] } = {
      'blockchain_fundamentals': ['Blockchain Basics', 'Cryptography', 'Consensus Mechanisms', 'Smart Contracts', 'DeFi'],
      'web_development': ['React', 'TypeScript', 'Node.js', 'MongoDB', 'API Design'],
      'smart_contracts': ['Solidity', 'Web3.js', 'Smart Contract Security', 'DApp Development', 'Testing'],
      'defi_protocols': ['DeFi Protocols', 'Liquidity Pools', 'AMM', 'Yield Farming', 'Governance'],
      'data_science': ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'Visualization']
    };
    
    return skillsMap[courseId] || ['Programming', 'Problem Solving', 'Critical Thinking'];
  };

  const getInstructorName = (courseId: string): string => {
    const instructors: { [key: string]: string } = {
      'blockchain_fundamentals': 'Dr. Sarah Chen',
      'web_development': 'Alex Rodriguez',
      'smart_contracts': 'Dr. Michael Kim',
      'defi_protocols': 'Jennifer Martinez',
      'data_science': 'Dr. David Thompson'
    };
    
    return instructors[courseId] || 'Blockademia Team';
  };

  const getCourseDuration = (courseId: string): string => {
    const durations: { [key: string]: string } = {
      'blockchain_fundamentals': '8 weeks',
      'web_development': '6 weeks',
      'smart_contracts': '10 weeks',
      'defi_protocols': '12 weeks',
      'data_science': '8 weeks'
    };
    
    return durations[courseId] || '6 weeks';
  };

  const generateBlockchainHash = (): string => {
    return '0x' + Math.random().toString(16).substr(2, 32);
  };

  const saveCertificate = (certificate: any) => {
    if (!user) return;
    
    // Get existing certificates
    const existingCertificates = JSON.parse(localStorage.getItem(`certificates_${user.id}`) || '[]');
    
    // Add new certificate
    const updatedCertificates = [...existingCertificates, certificate];
    
    // Save to localStorage (in real app, would save to Supabase)
    localStorage.setItem(`certificates_${user.id}`, JSON.stringify(updatedCertificates));
  };

  const faucetTokens = (amount: number, reason: string) => {
    if (!userProgress) return;

    const updatedProgress = {
      ...userProgress,
      blocktokens: userProgress.blocktokens + amount
    };

    setUserProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    toast.success(`💰 +${amount} BLOCK tokens`, {
      description: reason
    });
  };

  const faucetToWallet = async (amount: number, reason: string): Promise<boolean> => {
    if (!userProgress) return false;

    // Try to get Web3 context from window (injected by Web3Provider)
    const web3 = (window as any).__blockademia_web3_context;
    
    if (web3?.wallet && web3.faucetTokens) {
      try {
        const success = await web3.faucetTokens(amount, reason);
        if (success) {
          // Also update local balance for consistency
          const updatedProgress = {
            ...userProgress,
            blocktokens: userProgress.blocktokens + amount
          };
          setUserProgress(updatedProgress);
          saveUserProgress(updatedProgress);
          return true;
        }
      } catch (error) {
        console.error('Web3 faucet failed:', error);
      }
    }
    
    // Fallback to local faucet
    faucetTokens(amount, reason + ' (Local)');
    return false;
  };

  const spendTokens = (amount: number, itemId: string): boolean => {
    if (!userProgress || userProgress.blocktokens < amount) {
      toast.error('Insufficient BLOCK tokens', {
        description: `You need ${amount} tokens but only have ${userProgress?.blocktokens || 0}`
      });
      return false;
    }

    const updatedProgress = {
      ...userProgress,
      blocktokens: userProgress.blocktokens - amount
    };

    setUserProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    toast.success(`Purchased successfully!`, {
      description: `Spent ${amount} BLOCK tokens`
    });

    return true;
  };

  const getCourseProgress = (courseId: string): CourseProgress | null => {
    return userProgress?.courseProgress[courseId] || null;
  };

  const getOverallProgress = (): number => {
    if (!userProgress) return 0;
    
    const progressValues = Object.values(userProgress.courseProgress);
    if (progressValues.length === 0) return 0;
    
    const totalProgress = progressValues.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / progressValues.length);
  };

  const purchaseItem = (itemId: string): boolean => {
    const item = marketplaceItems.find(i => i.id === itemId);
    if (!item) return false;

    return spendTokens(item.cost, itemId);
  };

  const checkAchievements = () => {
    if (!userProgress) return;

    ACHIEVEMENTS.forEach(achievement => {
      const alreadyUnlocked = userProgress.achievements.some(a => a.id === achievement.id);
      if (alreadyUnlocked) return;

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first_lesson':
          shouldUnlock = userProgress.totalXP > 0;
          break;
        case 'first_course':
          shouldUnlock = userProgress.coursesCompleted.length > 0;
          break;
        case 'level_5':
          shouldUnlock = userProgress.level >= 5;
          break;
        case 'streak_7':
          shouldUnlock = userProgress.streakDays >= 7;
          break;
        case 'blockchain_master':
          shouldUnlock = userProgress.coursesCompleted.length >= 5;
          break;
      }

      if (shouldUnlock) {
        unlockAchievement(achievement.id);
      }
    });
  };

  const unlockAchievement = (achievementId: string) => {
    if (!userProgress) return;

    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) return;

    const newAchievement: Achievement = {
      ...achievement,
      unlockedAt: new Date()
    };

    const updatedProgress = {
      ...userProgress,
      achievements: [...userProgress.achievements, newAchievement],
      blocktokens: userProgress.blocktokens + achievement.tokenReward
    };

    setUserProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`, {
      description: `+${achievement.xpReward} XP, +${achievement.tokenReward} BLOCK tokens`
    });

    // Award XP separately to trigger level-up check
    setTimeout(() => addXP(achievement.xpReward, `Achievement: ${achievement.name}`), 500);
    
    // Try to send achievement tokens to wallet
    setTimeout(async () => {
      const success = await faucetToWallet(achievement.tokenReward, `Achievement: ${achievement.name}`);
      if (!success) {
        // Token reward already added to local balance above
      }
    }, 1000);
  };

  const getStats = () => {
    if (!userProgress) {
      return { totalCourses: 0, completedCourses: 0, totalLessons: 0, completedLessons: 0 };
    }

    const courseProgressEntries = Object.values(userProgress.courseProgress);
    const totalCourses = courseProgressEntries.length || 5; // Default to 5 if no progress yet
    const completedCourses = userProgress.coursesCompleted.length;
    const totalLessons = courseProgressEntries.reduce((sum, course) => sum + course.totalLessons, 0) || 50; // Default estimate
    const completedLessons = courseProgressEntries.reduce((sum, course) => sum + course.lessonsCompleted, 0);

    return { totalCourses, completedCourses, totalLessons, completedLessons };
  };

  const getWeb3Integration = () => {
    const web3 = (window as any).__blockademia_web3_context;
    return {
      hasWallet: !!web3?.wallet,
      canReceiveTokens: !!web3?.wallet && (
        web3.wallet.network === 'Monad Testnet' || 
        web3.wallet.network === 'Monad Testnet (Mock)'
      )
    };
  };

  const value: GameContextType = {
    userProgress,
    isLoading,
    addXP,
    updateCourseProgress,
    completeCourse,
    completeLesson,
    addTokens,
    faucetTokens,
    faucetToWallet,
    spendTokens,
    getCourseProgress,
    getOverallProgress,
    getStats,
    awardProjectBonus,
    marketplaceItems,
    purchaseItem,
    checkAchievements,
    unlockAchievement,
    getWeb3Integration
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}