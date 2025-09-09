import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner@2.0.3';
import { 
  User,
  MapPin,
  Globe,
  Github,
  Chrome,
  Mail,
  Camera,
  Plus,
  X,
  Target,
  Code,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import BlockademiaLogo from './BlockademiaLogo';

interface ProfileSetupProps {
  isEdit?: boolean;
  onComplete?: () => void;
}

const skillSuggestions = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Solidity',
  'Web3', 'Blockchain', 'Smart Contracts', 'DeFi', 'NFTs', 'CSS',
  'HTML', 'Next.js', 'Vue.js', 'Angular', 'Express', 'MongoDB',
  'PostgreSQL', 'Docker', 'AWS', 'Git', 'GraphQL', 'REST APIs'
];

const goalSuggestions = [
  'Build full-stack applications',
  'Learn blockchain development',
  'Master smart contracts',
  'Get certified in web development',
  'Start a career in tech',
  'Build my own cryptocurrency',
  'Create NFT projects',
  'Learn DeFi protocols',
  'Build decentralized applications',
  'Master React development',
  'Learn backend development',
  'Understand database design'
];

export default function ProfileSetup({ isEdit = false, onComplete }: ProfileSetupProps) {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    skills: user?.skills || [],
    learningGoals: user?.learningGoals || []
  });

  useEffect(() => {
    if (user && isEdit) {
      setProfileData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        skills: user.skills || [],
        learningGoals: user.learningGoals || []
      });
    }
  }, [user, isEdit]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (skill: string) => {
    if (!profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addGoal = (goal: string) => {
    if (!profileData.learningGoals.includes(goal)) {
      setProfileData(prev => ({
        ...prev,
        learningGoals: [...prev.learningGoals, goal]
      }));
    }
  };

  const removeGoal = (goal: string) => {
    setProfileData(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.filter(g => g !== goal)
    }));
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    try {
      const success = await updateProfile({
        ...profileData,
        profileComplete: true
      });
      
      if (success) {
        toast.success(isEdit ? 'Profile updated successfully!' : 'Welcome to Blockademia! Your profile is now complete.');
        if (onComplete) {
          onComplete();
        } else {
          navigate('/');
        }
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  const getProviderIcon = () => {
    switch (user.provider) {
      case 'google':
        return <Chrome className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getProviderColor = () => {
    switch (user.provider) {
      case 'google':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'github':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-3 sm:px-4">
      <div className="w-full max-w-2xl">
        <Card className="border border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BlockademiaLogo className="w-8 h-8" />
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blockademia
              </span>
            </div>
            
            <div>
              <CardTitle className="text-2xl font-heading">
                {isEdit ? 'Edit Your Profile' : 'Complete Your Profile'}
              </CardTitle>
              <CardDescription>
                {isEdit 
                  ? 'Update your information and preferences'
                  : 'Tell us about yourself to personalize your learning experience'
                }
              </CardDescription>
            </div>

            {!isEdit && (
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNum <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {stepNum < step ? <CheckCircle className="w-4 h-4" /> : stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        stepNum < step ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {(step === 1 || isEdit) && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="secondary" className={getProviderColor()}>
                        {getProviderIcon()}
                        {user.provider === 'email' ? 'Email' : user.provider?.charAt(0).toUpperCase() + user.provider?.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {profileData.bio.length}/500
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="City, Country"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://yourwebsite.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {!isEdit && (
                  <div className="flex justify-end pt-4">
                    <Button onClick={() => setStep(2)}>
                      Next: Skills <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Skills */}
            {(step === 2 || isEdit) && !isEdit && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <Code className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-lg font-semibold">What skills do you have?</h3>
                  <p className="text-sm text-muted-foreground">
                    Select your current skills or technologies you're familiar with
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-primary/20 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Suggested Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skillSuggestions
                        .filter(skill => !profileData.skills.includes(skill))
                        .slice(0, 12)
                        .map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/20"
                          onClick={() => addSkill(skill)}
                        >
                          {skill} <Plus className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Next: Goals <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Learning Goals */}
            {(step === 3 || isEdit) && !isEdit && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <Target className="w-12 h-12 text-accent mx-auto" />
                  <h3 className="text-lg font-semibold">What do you want to learn?</h3>
                  <p className="text-sm text-muted-foreground">
                    Select your learning goals to get personalized course recommendations
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profileData.learningGoals.map((goal) => (
                      <Badge 
                        key={goal} 
                        variant="secondary" 
                        className="bg-accent/10 text-accent border-accent/20 cursor-pointer"
                        onClick={() => removeGoal(goal)}
                      >
                        {goal} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Suggested Goals</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {goalSuggestions
                        .filter(goal => !profileData.learningGoals.includes(goal))
                        .slice(0, 8)
                        .map((goal) => (
                        <Badge 
                          key={goal} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-accent/10 hover:text-accent hover:border-accent/20"
                          onClick={() => addGoal(goal)}
                        >
                          {goal} <Plus className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleComplete} disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Setting up...
                      </div>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Edit Mode - All Steps Combined */}
            {isEdit && (
              <div className="space-y-8">
                {/* Skills Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    <Label className="text-base font-medium">Skills</Label>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-primary/20 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions
                      .filter(skill => !profileData.skills.includes(skill))
                      .slice(0, 8)
                      .map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/20"
                        onClick={() => addSkill(skill)}
                      >
                        {skill} <Plus className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Learning Goals Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    <Label className="text-base font-medium">Learning Goals</Label>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {profileData.learningGoals.map((goal) => (
                      <Badge 
                        key={goal} 
                        variant="secondary" 
                        className="bg-accent/10 text-accent border-accent/20 cursor-pointer"
                        onClick={() => removeGoal(goal)}
                      >
                        {goal} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {goalSuggestions
                      .filter(goal => !profileData.learningGoals.includes(goal))
                      .slice(0, 6)
                      .map((goal) => (
                      <Badge 
                        key={goal} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent/10 hover:text-accent hover:border-accent/20"
                        onClick={() => addGoal(goal)}
                      >
                        {goal} <Plus className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleComplete} disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}