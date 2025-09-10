import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { 
  CheckCircle, FileText, Brain, Download, Upload, Star, 
  ArrowRight, Zap, Shield, Users, BarChart3, Sparkles,
  Rocket, Award, Clock, Target, TrendingUp, Globe, ChevronDown
} from "lucide-react";

export default function GoogleIndex() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background font-body matrix-bg">
      {/* Terminal Header */}
      <header className="border-b border-primary/30 bg-background/95 backdrop-blur-xl sticky top-0 z-50 shadow-terminal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          {/* Desktop Header */}
          <div className="hidden lg:grid grid-cols-3 items-center gap-4">
            {/* Logo Section - Left */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-accent border border-primary rounded flex items-center justify-center shadow-terminal transform hover:scale-105 transition-all duration-300">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-terminal-blink"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary tracking-tight glow-text">
                  &gt; CareerCraft_
                </span>
                <div className="flex items-center gap-2 -mt-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-terminal-blink"></div>
                  <span className="text-xs text-primary font-medium uppercase tracking-widest">AI_POWERED</span>
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
              </div>
            </div>

            {/* Terminal Navigation - Center */}
            <nav className="flex items-center justify-center space-x-6 xl:space-x-8 2xl:space-x-12">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group text-muted-foreground hover:text-primary transition-all duration-300 font-medium cursor-pointer relative terminal-text"
              >
                ./features
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
              <Link
                to="/examples"
                className="group text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative terminal-text"
              >
                ./examples
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <a
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group text-muted-foreground hover:text-primary transition-all duration-300 font-medium cursor-pointer relative terminal-text"
              >
                ./reviews
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center justify-end space-x-2 lg:space-x-3 xl:space-x-4">
              {user ? (
                <div className="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
                  <Link
                    to="/dashboard"
                    className="px-3 lg:px-4 py-2 text-muted-foreground hover:text-primary transition-all duration-300 font-medium rounded hover:bg-primary/10 terminal-text text-sm lg:text-base"
                  >
                    $ dashboard
                  </Link>
                  <Link
                    to="/builder"
                    className="px-3 lg:px-4 py-2 text-muted-foreground hover:text-primary transition-all duration-300 font-medium rounded hover:bg-primary/10 terminal-text text-sm lg:text-base"
                  >
                    $ builder
                  </Link>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:bg-primary/10 terminal-text px-3 lg:px-4 text-sm lg:text-base"
                  >
                    $ logout
                  </Button>
                  <Link to="/ai-analysis">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-terminal hover:shadow-glow transition-all duration-300 font-semibold px-4 lg:px-6 border border-primary text-sm lg:text-base">
                      <Brain className="w-3 lg:w-4 h-3 lg:h-4 mr-1 lg:mr-2" />
                      AI_ANALYSIS
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <Link
                    to="/login"
                    className="px-4 lg:px-6 py-2 text-muted-foreground hover:text-primary transition-all duration-300 font-medium rounded hover:bg-primary/10 terminal-text text-sm lg:text-base"
                  >
                    $ login
                  </Link>
                  <Link to="/register">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-terminal hover:shadow-glow transition-all duration-300 font-semibold px-4 lg:px-8 border border-primary text-sm lg:text-base">
                      <Rocket className="w-3 lg:w-4 h-3 lg:h-4 mr-1 lg:mr-2" />
                      INIT_USER
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Terminal Header */}
          <div className="lg:hidden flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-accent border border-primary rounded flex items-center justify-center shadow-terminal">
                <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold font-mono text-primary glow-text">&gt; CareerCraft_</span>
                <div className="flex items-center gap-1 -mt-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary font-medium terminal-text">AI</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {user && (
                <Link to="/dashboard">
                  <Button size="sm" variant="outline" className="bg-transparent border-primary text-foreground hover:bg-primary hover:text-primary-foreground px-2 sm:px-3">
                    <span className="hidden sm:inline">$ dash</span>
                    <span className="sm:hidden">$</span>
                  </Button>
                </Link>
              )}
              <Link to={user ? "/ai-analysis" : "/login"}>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-terminal border border-primary px-3 sm:px-4">
                  {user ? "AI" : "INIT"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Terminal Hero Section */}
      <section className="py-20 lg:py-32 bg-background scan-line">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            {/* Terminal Window */}
            <div className="flex justify-center mb-8">
              <div className="terminal-window max-w-md mx-auto">
                <div className="terminal-header">
                  <div className="flex space-x-2">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">~/careercraft/status</span>
                </div>
                <div className="p-4 bg-background">
                  <div className="terminal-text text-sm">
                    <span className="text-primary">$</span> system_status --ai-platform
                    <br />
                    <span className="text-primary animate-terminal-blink">█</span> ONLINE: AI-Powered Career Platform
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-mono">
              <span className="text-muted-foreground">$ ./build_resume --mode=</span>
              <span className="text-primary glow-text">PERFECT</span>
              <span className="text-muted-foreground block mt-2">$ ./integrate --ai=</span>
              <span className="text-primary glow-text">INTELLIGENCE</span>
              <span className="terminal-cursor ml-2"></span>
            </h1>

            {/* Terminal Description */}
            <div className="terminal-window max-w-3xl mx-auto">
              <div className="terminal-header">
                <div className="flex space-x-2">
                  <div className="terminal-dot terminal-dot-red"></div>
                  <div className="terminal-dot terminal-dot-yellow"></div>
                  <div className="terminal-dot terminal-dot-green"></div>
                </div>
                <span className="text-xs text-muted-foreground ml-4">~/careercraft/description.txt</span>
              </div>
              <div className="p-6 bg-background">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed terminal-text">
                  <span className="text-primary">#</span> Transform your professional journey with:<br />
                  <span className="text-primary">-</span> Cutting-edge AI analysis<br />
                  <span className="text-primary">-</span> Intelligent optimization<br />
                  <span className="text-primary">-</span> Industry-specific insights<br />
                  <span className="text-primary animate-terminal-blink">█</span>
                </p>
              </div>
            </div>

            {/* Terminal Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={user ? "/builder" : "/login"}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-terminal hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold rounded border border-primary font-mono"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {user ? "$ ./launch_builder" : "$ ./init_session"}
                </Button>
              </Link>
              <Link to={user ? "/ai-analysis" : "/register"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-accent border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-terminal hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold rounded font-mono"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  {user ? "$ ./run_analysis" : "$ ./demo_mode"}
                </Button>
              </Link>
            </div>

            {/* Terminal Status Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary/30">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent border border-primary rounded flex items-center justify-center mx-auto mb-3 shadow-terminal">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground terminal-text">ATS_OPTIMIZED</div>
                <div className="text-xs text-primary">100% Compatible</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent border border-primary rounded flex items-center justify-center mx-auto mb-3 shadow-terminal">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground terminal-text">50K+ USERS</div>
                <div className="text-xs text-primary">Trusted Globally</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent border border-primary rounded flex items-center justify-center mx-auto mb-3 shadow-terminal">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground terminal-text">4.9/5 RATING</div>
                <div className="text-xs text-primary">Highly Rated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-accent">
        <div className="container mx-auto px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex space-x-2">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">~/features.sh</span>
                </div>
                <div className="px-4 py-2 bg-background">
                  <span className="terminal-text text-sm">
                    <span className="text-primary">$</span> ls -la ./features/
                  </span>
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground max-w-3xl mx-auto leading-tight font-mono">
              <span className="text-muted-foreground">$ ./scan --target=</span>
              <span className="text-primary glow-text">CAREER_SUCCESS</span>
              <span className="terminal-cursor"></span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed terminal-text">
              <span className="text-primary">#</span> Our AI-powered platform provides cutting-edge tools to create, optimize, and share your professional resume.
            </p>
          </div>

          {/* Simple Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* AI Analysis */}
            <Card className="minimal-card p-6 hover:shadow-glow transition-all duration-300 text-center hover:border-primary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-background border border-primary rounded flex items-center justify-center mx-auto mb-4 shadow-terminal">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-3 terminal-text">
                  AI_POWERED_ANALYSIS
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed terminal-text">
                  <span className="text-primary">&gt;</span> Get intelligent suggestions to improve your resume with our advanced AI system.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Scoring System */}
            <Card className="minimal-card p-6 hover:shadow-glow transition-all duration-300 text-center hover:border-primary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-background border border-primary rounded flex items-center justify-center mx-auto mb-4 shadow-terminal">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-3 terminal-text">
                  SMART_SCORING_SYSTEM
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed terminal-text">
                  <span className="text-primary">&gt;</span> Real-time ATS compatibility scoring with detailed feedback and recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Professional Templates */}
            <Card className="minimal-card p-6 hover:shadow-glow transition-all duration-300 text-center hover:border-primary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-background border border-primary rounded flex items-center justify-center mx-auto mb-4 shadow-terminal">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-3 terminal-text">
                  PROFESSIONAL_TEMPLATES
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed terminal-text">
                  <span className="text-primary">&gt;</span> 10+ industry-optimized designs that are ATS-friendly and professional.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Import & Export */}
            <Card className="minimal-card p-6 hover:shadow-glow transition-all duration-300 text-center hover:border-primary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-background border border-primary rounded flex items-center justify-center mx-auto mb-4 shadow-terminal">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-3 terminal-text">
                  SMART_IMPORT_EXPORT
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed terminal-text">
                  <span className="text-primary">&gt;</span> Multiple format support including PDF, Word, and plain text formats.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Security */}
            <Card className="minimal-card p-6 hover:shadow-glow transition-all duration-300 text-center hover:border-primary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-background border border-primary rounded flex items-center justify-center mx-auto mb-4 shadow-terminal">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-3 terminal-text">
                  SECURITY_PRIVACY
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed terminal-text">
                  <span className="text-primary">&gt;</span> Enterprise-grade encryption and data protection for your information.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* 24/7 Support */}
            <Card className="minimal-card p-6 hover:shadow-glow transition-all duration-300 text-center hover:border-primary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-background border border-primary rounded flex items-center justify-center mx-auto mb-4 shadow-terminal">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-3 terminal-text">
                  24_7_AI_SUPPORT
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed terminal-text">
                  <span className="text-primary">&gt;</span> Real-time analysis and optimization whenever you need it.
                </CardDescription>
              </CardHeader>
            </Card>

          </div>
        </div>
      </section>

      {/* Terminal Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex space-x-2">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">~/testimonials.log</span>
                </div>
                <div className="px-4 py-2 bg-background">
                  <span className="terminal-text text-sm">
                    <span className="text-primary">$</span> cat user_feedback.txt
                  </span>
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight font-mono">
              <span className="text-muted-foreground">$ grep -r "</span>
              <span className="text-primary glow-text">USER_FEEDBACK</span>
              <span className="text-muted-foreground">" ./reviews/</span>
              <span className="terminal-cursor"></span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Real success stories from professionals who landed their dream jobs with CareerCraft.
            </p>
          </div>

          {/* Simple Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">

            {/* Testimonial Card 1 */}
            <div className="minimal-card p-6 hover:shadow-glow transition-all duration-300 hover:border-primary/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-background border border-primary rounded flex items-center justify-center mr-3 shadow-terminal">
                  <span className="text-primary font-bold terminal-text">SJ</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground terminal-text">Sarah Johnson</h4>
                  <p className="text-muted-foreground text-sm terminal-text">Software Engineer @ Google</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed terminal-text">
                <span className="text-primary">&gt;</span> "CareerCraft's AI analysis helped me identify weak points in my resume. Got 3 interview calls within a week!"
              </p>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="minimal-card p-6 hover:shadow-glow transition-all duration-300 hover:border-primary/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-background border border-primary rounded flex items-center justify-center mr-3 shadow-terminal">
                  <span className="text-primary font-bold terminal-text">MR</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground terminal-text">Michael Rodriguez</h4>
                  <p className="text-muted-foreground text-sm terminal-text">Marketing Director @ Microsoft</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed terminal-text">
                <span className="text-primary">&gt;</span> "The professional templates are amazing. My resume looks so much more polished and professional now."
              </p>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="minimal-card p-6 hover:shadow-glow transition-all duration-300 hover:border-primary/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-background border border-primary rounded flex items-center justify-center mr-3 shadow-terminal">
                  <span className="text-primary font-bold terminal-text">AC</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground terminal-text">Amanda Chen</h4>
                  <p className="text-muted-foreground text-sm terminal-text">Data Scientist @ Netflix</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed terminal-text">
                <span className="text-primary">&gt;</span> "The ATS optimization feature is a game-changer. Finally, my resume passes through automated systems!"
              </p>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Terminal FAQ Section */}
      <section className="py-32 bg-accent relative overflow-hidden">

        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary/10 rotate-45"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 border border-primary/5 rounded-full"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex space-x-2">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">~/faq.txt</span>
                </div>
                <div className="px-4 py-2 bg-background">
                  <span className="terminal-text text-sm">
                    <span className="text-primary">$</span> ./help --interactive
                  </span>
                </div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-mono text-foreground mb-6 max-w-4xl mx-auto leading-tight">
              <span className="text-muted-foreground">$ find ./faq -name "*</span>
              <span className="text-primary glow-text">QUESTIONS</span>
              <span className="text-muted-foreground">*"</span>
              <span className="terminal-cursor"></span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Everything you need to know about CareerCraft's AI-powered resume platform
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            <div className="minimal-card p-8 hover:shadow-glow transition-all duration-300 group hover:border-primary/50">
              <div className="flex justify-between items-center cursor-pointer group-hover:text-primary transition-colors">
                <h3 className="font-bold text-foreground text-xl group-hover:text-primary transition-colors terminal-text">$ ./how_ai_analysis_works.sh</h3>
                <ChevronDown className="w-6 h-6 text-primary group-hover:rotate-180 transition-transform duration-300" />
              </div>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed terminal-text">
                <span className="text-primary">&gt;</span> Our AI analyzes your resume content, structure, and formatting against industry standards and ATS requirements to provide personalized improvement suggestions.
              </p>
            </div>

            <div className="minimal-card p-8 hover:shadow-glow transition-all duration-300 group hover:border-primary/50">
              <div className="flex justify-between items-center cursor-pointer group-hover:text-primary transition-colors">
                <h3 className="font-bold text-foreground text-xl group-hover:text-primary transition-colors terminal-text">$ ./security_check.sh --privacy</h3>
                <ChevronDown className="w-6 h-6 text-primary group-hover:rotate-180 transition-transform duration-300" />
              </div>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed terminal-text">
                <span className="text-primary">&gt;</span> Absolutely. We use enterprise-grade encryption and never share your personal information. Your resume data is processed securely and can be deleted at any time.
              </p>
            </div>

            <div className="minimal-card p-8 hover:shadow-glow transition-all duration-300 group hover:border-primary/50">
              <div className="flex justify-between items-center cursor-pointer group-hover:text-primary transition-colors">
                <h3 className="font-bold text-foreground text-xl group-hover:text-primary transition-colors terminal-text">$ ./export_formats.sh --list</h3>
                <ChevronDown className="w-6 h-6 text-primary group-hover:rotate-180 transition-transform duration-300" />
              </div>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed terminal-text">
                <span className="text-primary">&gt;</span> Yes! You can export your resume as PDF, Word document, or plain text format. All exports maintain professional formatting and ATS compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Stats Section */}
      <section className="py-32 bg-background relative overflow-hidden">

        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-32 h-32 bg-primary/10 rotate-45 rounded-sm"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-primary/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex space-x-2">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">~/global_stats.sh</span>
                </div>
                <div className="px-4 py-2 bg-background">
                  <span className="terminal-text text-sm">
                    <span className="text-primary">$</span> ./analyze_global_impact.sh
                  </span>
                </div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-mono text-foreground mb-6 max-w-4xl mx-auto leading-tight">
              <span className="text-muted-foreground">$ echo "Trusted by </span>
              <span className="text-primary glow-text">PROFESSIONALS_WORLDWIDE</span>
              <span className="text-muted-foreground">"</span>
              <span className="terminal-cursor"></span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 minimal-card hover:shadow-glow transition-all duration-500 transform hover:scale-110 group hover:border-primary/50">
              <div className="text-5xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300 terminal-text glow-text">50K+</div>
              <div className="text-muted-foreground font-medium text-lg terminal-text">RESUMES_CREATED</div>
              <div className="w-full h-1 bg-primary/20 rounded-full mt-4">
                <div className="h-full bg-primary rounded-full w-3/4 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>

            <div className="text-center p-8 minimal-card hover:shadow-glow transition-all duration-500 transform hover:scale-110 group hover:border-primary/50">
              <div className="text-5xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300 terminal-text glow-text">95%</div>
              <div className="text-muted-foreground font-medium text-lg terminal-text">SUCCESS_RATE</div>
              <div className="w-full h-1 bg-primary/20 rounded-full mt-4">
                <div className="h-full bg-primary rounded-full w-[95%] group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>

            <div className="text-center p-8 minimal-card hover:shadow-glow transition-all duration-500 transform hover:scale-110 group hover:border-primary/50">
              <div className="text-5xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300 terminal-text glow-text">4.9/5</div>
              <div className="text-muted-foreground font-medium text-lg terminal-text">USER_RATING</div>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-current" />
                ))}
              </div>
            </div>

            <div className="text-center p-8 minimal-card hover:shadow-glow transition-all duration-500 transform hover:scale-110 group hover:border-primary/50">
              <div className="text-5xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300 terminal-text glow-text">24/7</div>
              <div className="text-muted-foreground font-medium text-lg terminal-text">AI_SUPPORT</div>
              <div className="w-full h-1 bg-primary/20 rounded-full mt-4">
                <div className="h-full bg-primary rounded-full w-full group-hover:animate-pulse transition-all duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal CTA Section */}
      <section className="py-20 lg:py-32 bg-accent">
        <div className="container mx-auto px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">

            <div className="inline-block mb-4">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex space-x-2">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">~/start_session.sh</span>
                </div>
                <div className="px-4 py-2 bg-background">
                  <span className="terminal-text text-sm">
                    <span className="text-primary">$</span> ./get_started --today
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight font-mono">
              <span className="text-muted-foreground">$ ready --build </span>
              <span className="text-primary glow-text">PERFECT_RESUME</span>
              <span className="text-muted-foreground"> ?</span>
              <span className="terminal-cursor"></span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed terminal-text">
              <span className="text-primary">#</span> Join <span className="text-primary font-semibold glow-text">50,000+</span> professionals who have successfully landed their dream jobs with CareerCraft.
            </p>

            <Link to={user ? "/builder" : "/register"}>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-terminal hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold rounded border border-primary font-mono"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {user ? "$ ./start_building_now" : "$ ./get_started_free"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Terminal Footer */}
      <footer className="bg-background text-foreground border-t border-primary/30">
        <div className="container mx-auto px-8 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-accent border border-primary rounded flex items-center justify-center shadow-terminal">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-mono text-primary glow-text">&gt; CareerCraft_</span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-sm text-primary font-bold terminal-text">AI</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm terminal-text">
                <span className="text-primary">#</span> Build professional resumes with AI-powered suggestions and ATS optimization. Trusted by professionals worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-8 text-lg font-mono terminal-text">$ ./product/</h3>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li><a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-colors cursor-pointer">Features</a></li>
                <li><Link to="/examples" className="hover:text-primary transition-colors">Examples</Link></li>
                <li><Link to="/builder" className="hover:text-primary transition-colors">Builder</Link></li>
                <li><Link to="/ai-analysis" className="hover:text-primary transition-colors">AI Analysis</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-6 terminal-text">$ ./company/</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-primary transition-colors cursor-pointer">About</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors cursor-pointer">Contact</a></li>
                <li><Link to="/upload" className="hover:text-primary transition-colors">Upload Resume</Link></li>
                <li><Link to="/cover-letter" className="hover:text-primary transition-colors">Cover Letter</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-6 terminal-text">$ ./legal/</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#privacy" className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a></li>
                <li><a href="#cookies" className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm terminal-text">
              <span className="text-primary">$</span> echo "© 2024 CareerCraft. All rights reserved. Built with <span className="text-primary">❤️</span> for job seekers worldwide."
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
