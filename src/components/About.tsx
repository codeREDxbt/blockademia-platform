import { motion } from 'motion/react';
import { 
  Target, 
  Users, 
  Zap, 
  Globe, 
  Award, 
  Code, 
  Rocket, 
  Heart,
  BookOpen,
  TrendingUp,
  Shield,
  Coins,
  ChevronRight,
  CheckCircle2,
  Star,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function About() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Learners', value: '10,000+', icon: Users },
    { label: 'Courses Available', value: '20+', icon: BookOpen },
    { label: 'BLOCK Tokens Distributed', value: '100K+', icon: Coins },
    { label: 'Success Rate', value: '95%', icon: TrendingUp }
  ];

  const features = [
    {
      icon: Code,
      title: 'Hands-on Coding',
      description: 'Learn by building real projects with interactive coding environments.'
    },
    {
      icon: Coins,
      title: 'Token Rewards',
      description: 'Earn BLOCK tokens for completing lessons and achieving milestones.'
    },
    {
      icon: Globe,
      title: 'Web3 Integration',
      description: 'Connect your wallet and experience blockchain technology firsthand.'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Unlock badges and certificates as you progress through your learning journey.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a vibrant community of learners and developers from around the world.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Built with security and Indian regulatory compliance in mind.'
    }
  ];

  const team = [
    {
      name: 'Development Team',
      role: 'Full-Stack Engineers',
      bio: 'Passionate developers building the future of education technology.',
      avatar: '👨‍💻'
    },
    {
      name: 'Blockchain Team',
      role: 'Web3 Specialists',
      bio: 'Experts in smart contracts and decentralized technologies.',
      avatar: '⛓️'
    },
    {
      name: 'Education Team',
      role: 'Curriculum Designers',
      bio: 'Creating engaging, practical content for modern learners.',
      avatar: '📚'
    }
  ];

  const milestones = [
    { year: '2025', title: 'Platform Launch', description: 'Blockademia goes live with 20+ comprehensive courses' },
    { year: '2025', title: 'Web3 Integration', description: 'BLOCK token rewards system and Monad testnet integration' },
    { year: '2025', title: 'Community Growth', description: 'Growing community of tech-savvy learners and developers' },
    { year: 'Future', title: 'Mainnet Launch', description: 'Full blockchain integration with real-world token economics' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-accent/50 mb-6"
          >
            <Rocket className="w-4 h-4 text-accent" />
            <span className="text-sm font-code text-accent">About Blockademia</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6"
          >
            Revolutionizing{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tech Education
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We're building the future of learning with cutting-edge technology, blockchain integration, 
            and a community-first approach. Join thousands of learners mastering web development 
            and blockchain technology through hands-on projects and real-world applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-semibold font-tech btn-pulse-glow group"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Explore Courses
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-glow text-center h-full">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/50 mb-6"
              >
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-code text-primary">Our Mission</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-heading mb-6"
              >
                Making Tech Education{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Accessible & Rewarding
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4 text-muted-foreground"
              >
                <p>
                  At Blockademia, we believe that quality tech education should be accessible to everyone. 
                  Our platform combines traditional learning with cutting-edge blockchain technology to 
                  create an engaging, rewarding educational experience.
                </p>
                <p>
                  We're not just teaching code – we're building the next generation of developers who 
                  understand both web technologies and blockchain fundamentals, preparing them for the 
                  future of technology.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 space-y-3"
              >
                {[
                  'Free access to high-quality courses',
                  'Earn BLOCK tokens while learning',
                  'Real-world project-based learning',
                  'Community-driven support system'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-glow rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-4">Innovation at Core</h3>
                <p className="text-muted-foreground">
                  Combining traditional education with blockchain rewards, 
                  gamification, and Web3 integration for a truly modern learning experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading mb-4"
          >
            What Makes Us{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Different
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the unique features that set Blockademia apart from traditional learning platforms
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-glow h-full hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading mb-4"
          >
            Meet Our{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Team
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Passionate professionals dedicated to revolutionizing tech education
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-glow text-center h-full">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-4 border-accent text-accent">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading mb-4"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center font-bold text-accent-foreground flex-shrink-0">
                  {milestone.year}
                </div>
                <Card className="glass-glow flex-1">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <Card className="glass-glow">
          <CardContent className="p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-accent" />
                <Star className="w-6 h-6 text-primary" />
                <Heart className="w-6 h-6 text-accent" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading mb-4">
                Ready to{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Transform Your Future?
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of learners who are already building their tech careers with Blockademia. 
                Start your journey today and earn BLOCK tokens while mastering cutting-edge technologies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/auth')}
                  size="lg"
                  className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate text-accent-foreground font-semibold font-tech btn-pulse-glow group"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Get Started Free
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  onClick={() => navigate('/premium')}
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Premium
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}