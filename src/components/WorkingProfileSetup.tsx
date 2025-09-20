import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  User,
  MapPin,
  Globe,
  Mail,
  Camera,
  Plus,
  X,
  Target,
  Code,
  ArrowLeft,
  CheckCircle,
  Settings
} from 'lucide-react';

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
  'Understand Web3 fundamentals'
];

export default function ProfileSetup({ isEdit = false, onComplete }: ProfileSetupProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.user_metadata.name || '',
    bio: user?.profile.bio || '',
    location: user?.profile.location || '',
    website: '',
    skills: user?.profile.skills || [],
    learningGoals: user?.profile.learning_goals || [],
    avatar_url: user?.user_metadata.avatar_url || ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-background to-secondary flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please log in to access profile settings</p>
          <Button onClick={() => navigate('/auth')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile updated successfully!');
      
      if (onComplete) {
        onComplete();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addGoal = (goal: string) => {
    if (goal && !formData.learningGoals.includes(goal)) {
      setFormData(prev => ({
        ...prev,
        learningGoals: [...prev.learningGoals, goal]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.filter(goal => goal !== goalToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Profile Settings
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border border-border/50 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl">
                {isEdit ? 'Edit Your Profile' : 'Complete Your Profile'}
              </CardTitle>
              <CardDescription>
                Customize your learning experience and showcase your expertise
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="City, Country"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself, your interests, and your goals..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Skills & Technologies
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
                      />
                      <Button 
                        type="button" 
                        onClick={() => addSkill(newSkill)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions.slice(0, 8).map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skill)}
                          className="text-xs"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-destructive" 
                            onClick={() => removeSkill(skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Learning Goals */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Learning Goals
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Add a learning goal..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal(newGoal))}
                      />
                      <Button 
                        type="button" 
                        onClick={() => addGoal(newGoal)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {goalSuggestions.slice(0, 6).map((goal) => (
                        <Button
                          key={goal}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addGoal(goal)}
                          className="text-xs justify-start"
                        >
                          {goal}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      {formData.learningGoals.map((goal) => (
                        <div key={goal} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="flex-1 text-sm">{goal}</span>
                          <X 
                            className="w-4 h-4 cursor-pointer hover:text-destructive" 
                            onClick={() => removeGoal(goal)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold px-8"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {isEdit ? 'Update Profile' : 'Complete Setup'}
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}