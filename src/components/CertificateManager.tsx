import { useState, useEffect } from 'react';
import { Award, Download, Eye, Share2, Calendar, Trophy, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Certificate from './Certificate';

interface CertificateRecord {
  id: string;
  courseName: string;
  courseId: string;
  completionDate: string;
  grade: string;
  instructorName: string;
  skills: string[];
  duration: string;
  projectsCompleted: number;
  issuedDate: string;
  blockchainHash?: string;
}

export default function CertificateManager() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'certificate'>('list');

  useEffect(() => {
    if (!user) {
      setCertificates([]);
      return;
    }

    // Load user's certificates from localStorage (in real app, would load from Supabase)
    const savedCertificates = localStorage.getItem(`certificates_${user.id}`);
    
    if (savedCertificates) {
      const userCertificates = JSON.parse(savedCertificates);
      setCertificates(userCertificates);
    } else {
      // Show some demo certificates for new users
      const demoCertificates: CertificateRecord[] = [
        {
          id: 'DEMO-CERT-001',
          courseName: 'Welcome to Blockademia',
          courseId: 'welcome-course',
          completionDate: new Date().toISOString().split('T')[0],
          grade: 'Excellent',
          instructorName: 'Blockademia Team',
          skills: ['Platform Navigation', 'Learning Basics', 'Web3 Introduction'],
          duration: '1 week',
          projectsCompleted: 1,
          issuedDate: new Date().toISOString(),
          blockchainHash: '0x' + Math.random().toString(16).substr(2, 32)
        }
      ];
      
      setCertificates(demoCertificates);
      // Save demo certificate for new users
      localStorage.setItem(`certificates_${user.id}`, JSON.stringify(demoCertificates));
    }
  }, [user]);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGrade = filterGrade === 'all' || cert.grade.toLowerCase() === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const handleViewCertificate = (certificate: CertificateRecord) => {
    setSelectedCertificate(certificate);
    setViewMode('certificate');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedCertificate(null);
  };

  const getGradeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case 'excellent': return 'bg-primary/20 text-primary border-primary/30';
      case 'good': return 'bg-accent/20 text-accent border-accent/30';
      case 'satisfactory': return 'bg-secondary/20 text-secondary border-secondary/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  if (viewMode === 'certificate' && selectedCertificate) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Button 
              onClick={handleBackToList}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              ← Back to Certificates
            </Button>
          </div>
          
          <Certificate
            courseName={selectedCertificate.courseName}
            studentName={user?.name || 'Student'}
            completionDate={selectedCertificate.completionDate}
            courseId={selectedCertificate.courseId}
            grade={selectedCertificate.grade}
            instructorName={selectedCertificate.instructorName}
            certificateId={selectedCertificate.id}
            skills={selectedCertificate.skills}
            duration={selectedCertificate.duration}
            projectsCompleted={selectedCertificate.projectsCompleted}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My Certificates
            </h1>
          </div>
          <p className="text-muted-foreground">
            View and manage your blockchain-verified course completion certificates
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 glass-glow">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <p className="font-heading text-primary">{certificates.length}</p>
                <p className="text-sm text-muted-foreground">Total Certificates</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-glow">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-accent" />
              <div>
                <p className="font-heading text-accent">
                  {certificates.filter(c => c.grade === 'Excellent').length}
                </p>
                <p className="text-sm text-muted-foreground">Excellent Grades</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-glow">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-secondary" />
              <div>
                <p className="font-heading text-secondary">
                  {certificates.length > 0 ? certificates[0].completionDate.split('-')[0] : '2025'}
                </p>
                <p className="text-sm text-muted-foreground">Recent Year</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-glow">
            <div className="flex items-center gap-3">
              <Download className="w-8 h-8 text-primary" />
              <div>
                <p className="font-heading text-primary">
                  {certificates.reduce((sum, cert) => sum + cert.skills.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Skills Earned</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-foreground"
            >
              <option value="all">All Grades</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="satisfactory">Satisfactory</option>
            </select>
          </div>
        </div>

        {/* Certificates List */}
        {filteredCertificates.length === 0 ? (
          <Card className="p-12 glass-glow text-center">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-muted-foreground mb-2">No Certificates Found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || filterGrade !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Complete courses to earn your first certificate'}
            </p>
            <Button 
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
            >
              Browse Courses
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredCertificates.map((certificate) => (
              <Card key={certificate.id} className="p-6 glass-glow hover:bg-card/60 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Certificate Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading text-foreground mb-1">{certificate.courseName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Completed on {new Date(certificate.completionDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getGradeColor(certificate.grade)}>
                        {certificate.grade}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="text-sm font-medium">{certificate.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Projects</p>
                        <p className="text-sm font-medium">{certificate.projectsCompleted}/5</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                        <p className="text-sm font-medium">{certificate.instructorName}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Skills Earned:</p>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.slice(0, 4).map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs border-primary/30 text-primary bg-primary/5"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {certificate.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{certificate.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {certificate.blockchainHash && (
                      <div className="flex items-center gap-2 text-xs text-accent">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span>Verified on blockchain: {certificate.blockchainHash.slice(0, 16)}...</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-3 lg:w-48">
                    <Button 
                      onClick={() => handleViewCertificate(certificate)}
                      className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent flex-1 lg:w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground flex-1 lg:w-full"
                      onClick={() => {
                        // Share certificate
                        if (navigator.share) {
                          navigator.share({
                            title: `${certificate.courseName} Certificate`,
                            text: `Check out my ${certificate.courseName} certificate from Blockademia!`,
                            url: window.location.href
                          });
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}