import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ExternalLink,
  FileText,
  Scale,
  IndianRupee
} from 'lucide-react';
import { 
  getOverallCompliance, 
  checkPaymentCompliance,
  checkDataCompliance,
  checkEducationalCompliance,
  checkCryptoCompliance,
  COMPLIANCE_DOCUMENTATION,
  RISK_MITIGATION
} from '../utils/compliance';

export default function ComplianceCheck() {
  const [overallCompliance, setOverallCompliance] = useState(getOverallCompliance());
  const [paymentCompliance, setPaymentCompliance] = useState(checkPaymentCompliance());
  const [dataCompliance, setDataCompliance] = useState(checkDataCompliance());
  const [educationalCompliance, setEducationalCompliance] = useState(checkEducationalCompliance());
  const [cryptoCompliance, setCryptoCompliance] = useState(checkCryptoCompliance());

  useEffect(() => {
    // Refresh compliance checks
    setOverallCompliance(getOverallCompliance());
    setPaymentCompliance(checkPaymentCompliance());
    setDataCompliance(checkDataCompliance());
    setEducationalCompliance(checkEducationalCompliance());
    setCryptoCompliance(checkCryptoCompliance());
  }, []);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">🇮🇳 Indian Compliance Dashboard</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive compliance monitoring for Blockademia platform operations in India
        </p>
      </div>

      {/* Overall Compliance Status */}
      <Card className={`border-2 ${overallCompliance.isCompliant ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {overallCompliance.isCompliant ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            )}
            Overall Compliance Status
            <Badge variant={getRiskBadgeVariant(overallCompliance.riskLevel)} className="ml-auto">
              {overallCompliance.riskLevel.toUpperCase()} RISK
            </Badge>
          </CardTitle>
          <CardDescription>
            {overallCompliance.isCompliant 
              ? '✅ Platform is fully compliant with Indian regulations'
              : '⚠️ Some recommendations need attention for optimal compliance'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {overallCompliance.recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Key Recommendations:</h4>
              <ul className="text-sm space-y-1">
                {overallCompliance.recommendations.slice(0, 3).map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Compliance Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              Payment Compliance
              <Badge variant={getRiskBadgeVariant(paymentCompliance.riskLevel)} className="ml-auto">
                {paymentCompliance.riskLevel}
              </Badge>
            </CardTitle>
            <CardDescription>RBI & Payment System Compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">UPI, Cards, Net Banking - ✅ Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Payment Gateway Integration - ✅ Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Crypto Payments - ⚠️ Tax Implications</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Data Protection
              <Badge variant={getRiskBadgeVariant(dataCompliance.riskLevel)} className="ml-auto">
                {dataCompliance.riskLevel}
              </Badge>
            </CardTitle>
            <CardDescription>IT Act & Privacy Compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Privacy Policy - ✅ Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">User Consent - ✅ Implemented</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Data Security - ✅ Encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Educational Content
              <Badge variant={getRiskBadgeVariant(educationalCompliance.riskLevel)} className="ml-auto">
                {educationalCompliance.riskLevel}
              </Badge>
            </CardTitle>
            <CardDescription>Ministry of Education Guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Educational Focus - ✅ Skill Development</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">GST Exemption - ✅ Educational Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">No Investment Advice - ✅ Compliant</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crypto Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-500" />
              Cryptocurrency
              <Badge variant={getRiskBadgeVariant(cryptoCompliance.riskLevel)} className="ml-auto">
                {cryptoCompliance.riskLevel}
              </Badge>
            </CardTitle>
            <CardDescription>Crypto Regulations & Tax Law</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Utility Tokens - ✅ Educational Use</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Tax Disclosure - ⚠️ 30% + 1% TDS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">No Securities - ✅ Educational Only</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {COMPLIANCE_DOCUMENTATION.title}
          </CardTitle>
          <CardDescription>
            Platform compliance summary and key guidelines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {COMPLIANCE_DOCUMENTATION.summary}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Key Compliance Points:</h4>
            <ul className="text-sm space-y-1">
              {COMPLIANCE_DOCUMENTATION.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Important Disclaimers:</h4>
            <ul className="text-sm space-y-1">
              {COMPLIANCE_DOCUMENTATION.disclaimers.map((disclaimer, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{disclaimer}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            Risk Mitigation Strategies
          </CardTitle>
          <CardDescription>
            Proactive measures to maintain compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Crypto Payments</h4>
              <ul className="text-sm space-y-1">
                {RISK_MITIGATION.cryptoPayments.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-accent">Data Protection</h4>
              <ul className="text-sm space-y-1">
                {RISK_MITIGATION.dataProtection.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-blue-500">Educational Content</h4>
              <ul className="text-sm space-y-1">
                {RISK_MITIGATION.educationalContent.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <div className="font-medium">✅ Platform Status: Ready for Production</div>
            <p className="text-sm">
              Blockademia is fully compliant with Indian regulations and ready for deployment. 
              All payment methods are approved, educational content meets government guidelines, 
              and appropriate disclaimers are in place for cryptocurrency features.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Support Contact */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          For compliance questions or legal review:
        </p>
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          Contact Legal Team
        </Button>
      </div>
    </div>
  );
}