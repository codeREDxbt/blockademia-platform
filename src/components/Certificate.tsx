import { Award, Download, Share2, Calendar, CheckCircle, Star, Trophy, Medal } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BlockademiaLogo from './BlockademiaLogo';

interface CertificateProps {
  courseName: string;
  studentName: string;
  completionDate: string;
  courseId: string;
  grade?: string;
  instructorName?: string;
  certificateId: string;
  skills?: string[];
  duration?: string;
  projectsCompleted?: number;
}

export default function Certificate({
  courseName,
  studentName,
  completionDate,
  courseId,
  grade = "Excellent",
  instructorName = "Blockademia Team",
  certificateId,
  skills = [],
  duration = "8 weeks",
  projectsCompleted = 5
}: CertificateProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // In a real implementation, you would generate a PDF or high-resolution image
    // For now, we'll simulate the download process
    try {
      // Simulate PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a download link (in real implementation, this would be a generated PDF)
      const link = document.createElement('a');
      link.href = '#'; // Would be actual PDF blob URL
      link.download = `Blockademia_Certificate_${courseName.replace(/\s+/g, '_')}_${certificateId}.pdf`;
      
      // For demo purposes, show success message
      alert(`Certificate downloaded! In a real implementation, this would download a PDF of your ${courseName} certificate.`);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${studentName} - ${courseName} Certificate`,
        text: `I just completed ${courseName} at Blockademia! 🎉`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support native sharing
      const text = `I just completed ${courseName} at Blockademia! 🎉 Check out my certificate: ${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('Certificate link copied to clipboard!');
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case 'excellent': return 'text-primary';
      case 'good': return 'text-accent';
      case 'satisfactory': return 'text-secondary';
      default: return 'text-primary';
    }
  };

  const getGradeIcon = (grade: string) => {
    switch (grade.toLowerCase()) {
      case 'excellent': return <Trophy className="w-5 h-5" />;
      case 'good': return <Medal className="w-5 h-5" />;
      case 'satisfactory': return <Award className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Certificate Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent gradient-animate flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? 'Generating PDF...' : 'Download Certificate'}
        </Button>
        <Button 
          onClick={handleShare}
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground flex-1"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Achievement
        </Button>
      </div>

      {/* Certificate Design */}
      <Card 
        ref={certificateRef}
        className="relative overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-2 border-primary/30 shadow-2xl"
        style={{ aspectRatio: '1.414/1', minHeight: '600px' }} // A4 aspect ratio
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255, 215, 0, 0.1) 20px,
              rgba(255, 215, 0, 0.1) 40px
            )`
          }} />
        </div>

        {/* Decorative Border */}
        <div className="absolute inset-4 border-2 border-gradient-to-r from-primary via-accent to-primary rounded-lg opacity-30" />
        <div className="absolute inset-6 border border-accent/20 rounded-lg" />

        {/* Corner Decorations */}
        <div className="absolute top-6 left-6 w-16 h-16 border-l-4 border-t-4 border-primary rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-16 h-16 border-r-4 border-t-4 border-primary rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-l-4 border-b-4 border-accent rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-r-4 border-b-4 border-accent rounded-br-lg" />

        <div className="relative z-10 p-12 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <BlockademiaLogo size="lg" className="text-primary" />
              <div>
                <h1 className="font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Blockademia
                </h1>
                <p className="text-sm text-muted-foreground font-tech">Blockchain Education Platform</p>
              </div>
            </div>
            
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
            
            <h2 className="font-heading text-foreground mb-2">
              Certificate of Completion
            </h2>
            <p className="text-muted-foreground font-body">
              This is to certify that
            </p>
          </div>

          {/* Student Name */}
          <div className="text-center mb-8">
            <h3 className="font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              {studentName}
            </h3>
            <div className="w-48 h-0.5 bg-border mx-auto" />
          </div>

          {/* Course Information */}
          <div className="text-center mb-8 flex-1 flex flex-col justify-center">
            <p className="text-muted-foreground mb-4 font-body">
              has successfully completed the course
            </p>
            
            <h4 className="font-heading text-foreground mb-6 text-center leading-relaxed">
              {courseName}
            </h4>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className={`flex items-center justify-center gap-1 mb-1 ${getGradeColor(grade)}`}>
                  {getGradeIcon(grade)}
                  <span className="font-heading">{grade}</span>
                </div>
                <p className="text-xs text-muted-foreground">Grade</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-heading">{projectsCompleted}</span>
                </div>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1 text-secondary">
                  <Calendar className="w-5 h-5" />
                  <span className="font-heading">{duration}</span>
                </div>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
            </div>

            {/* Skills Learned */}
            {skills.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Skills Mastered:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {skills.slice(0, 5).map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-primary/30 text-primary bg-primary/5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Date */}
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-1">Date of Completion</p>
              <p className="font-heading text-foreground">{completionDate}</p>
            </div>

            {/* Verification */}
            <div className="text-center">
              <div className="mb-2">
                <CheckCircle className="w-8 h-8 text-accent mx-auto" />
              </div>
              <p className="text-xs text-muted-foreground">Verified on Blockchain</p>
              <p className="text-xs font-code text-accent">{certificateId}</p>
            </div>

            {/* Instructor */}
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-1">Instructor</p>
              <p className="font-heading text-foreground">{instructorName}</p>
              <div className="w-20 h-0.5 bg-accent mx-auto md:ml-auto md:mr-0 mt-2" />
            </div>
          </div>

          {/* Verification QR Code Area (placeholder) */}
          <div className="absolute bottom-4 right-4 opacity-30">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded border-2 border-primary/30 flex items-center justify-center">
              <Star className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Floating blockchain elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-32 right-24 w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </Card>

      {/* Certificate Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="p-6 glass-glow">
          <h3 className="font-heading text-accent mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Verification Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Certificate ID:</span>
              <span className="font-code text-accent">{certificateId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Course ID:</span>
              <span className="font-code">{courseId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Issued Date:</span>
              <span>{completionDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blockchain:</span>
              <span className="text-accent">Monad Testnet</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass-glow">
          <h3 className="font-heading text-primary mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievement Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Final Grade:</span>
              <span className={`font-medium ${getGradeColor(grade)}`}>{grade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projects Completed:</span>
              <span className="text-accent">{projectsCompleted}/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Study Duration:</span>
              <span>{duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Skills Earned:</span>
              <span className="text-primary">{skills.length} Skills</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
