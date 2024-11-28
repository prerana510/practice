import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChartBar, 
  Users, 
  Briefcase, 
  ShoppingCart, 
  Server,
  BarChart2,
  PieChart,
  TrendingUp,
  FileSpreadsheet,
  Database
} from 'lucide-react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Analytics-themed icons
    const icons = [
      { icon: 'bar', color: 'rgba(79,70,229,0.2)' },
      { icon: 'pie', color: 'rgba(124,58,237,0.2)' },
      { icon: 'line', color: 'rgba(99,102,241,0.2)' },
      { icon: 'file', color: 'rgba(59,130,246,0.2)' }
    ];

    // Particle class
    class AnalyticsParticle {
      x: number = 0;
      y: number = 0;
      radius: number = 0;
      color: string = '';
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0.1;
      type: string = '';

      constructor(private canvasWidth: number, private canvasHeight: number) {
        this.reset();
      }

      reset() {
        const icon = icons[Math.floor(Math.random() * icons.length)];
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.radius = Math.random() * 40 + 20;
        this.color = icon.color;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.type = icon.icon;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.globalAlpha = this.opacity;
        
        switch(this.type) {
          case 'bar':
            ctx.fillStyle = this.color;
            ctx.fillRect(
              this.x - this.radius/2, 
              this.y - this.radius, 
              this.radius/2, 
              this.radius * 2
            );
            break;
          case 'pie':
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius/2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'line':
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(this.x - this.radius, this.y);
            ctx.lineTo(this.x + this.radius, this.y - this.radius/2);
            ctx.stroke();
            break;
          case 'file':
            ctx.fillStyle = this.color;
            ctx.fillRect(
              this.x - this.radius/2, 
              this.y - this.radius/2, 
              this.radius, 
              this.radius
            );
            break;
        }
        ctx.closePath();
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Fade in and out
        if (this.opacity < 0.3) {
          this.opacity += 0.01;
        } else if (this.opacity > 0.3) {
          this.opacity -= 0.01;
        }

        // Wrap around screen
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
      }
    }

    // Create particles
    const particlesArray: AnalyticsParticle[] = [];
    const numberOfParticles = 50;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new AnalyticsParticle(canvas.width, canvas.height));
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.draw(ctx);
        particle.update(canvas.width, canvas.height);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    const resizeHandler = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeHandler);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-10 pointer-events-none"
    />
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleRetailClick = () => {
    navigate('/retail/signin');
  };

  const handleSoftwareClick = () => {
    navigate('/crm/signup');
  };

  const iconFeatures = [
    { 
      icon: <ChartBar className="w-12 h-12 text-indigo-600" />, 
      title: "Advanced Analytics",
      description: "Deep insights into your sales performance"
    },
    { 
      icon: <Users className="w-12 h-12 text-purple-600" />, 
      title: "Customer Management",
      description: "Comprehensive CRM solutions"
    },
    { 
      icon: <ShoppingCart className="w-12 h-12 text-emerald-600" />, 
      title: "Retail Optimization",
      description: "Streamline your retail operations"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content Container */}
      <div className="relative z-10 flex-grow">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Server className="w-10 h-10" />
              <h1 className="text-2xl font-bold">Sales ERP</h1>
            </div>
            <nav className="space-x-4">
              <a href="#features" className="hover:text-indigo-200 transition-colors">Features</a>
              <a href="#solutions" className="hover:text-indigo-200 transition-colors">Solutions</a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text 
              bg-gradient-to-r from-indigo-600 to-purple-600">
                Empower Your Sales
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Manage your sales, contacts, and projects from one powerful, 
                intelligent platform designed to accelerate your business growth.
              </p>
              <div className="flex space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={handleRetailClick}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                  text-white rounded-lg shadow-xl hover:shadow-2xl transition-all 
                  transform hover:-translate-y-1"
                >
                  Retail Solutions
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSoftwareClick}
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 
                  rounded-lg hover:bg-indigo-50 transition-all transform hover:-translate-y-1"
                >
                  CRM Platform
                </motion.button>
              </div>
            </motion.div>

            {/* Right Side - Features */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 gap-6"
            >
              {iconFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 
                  border border-gray-100 hover:border-indigo-200 transition-all"
                >
                  {feature.icon}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 text-center z-10">
        <p className="text-gray-600">
          © 2024 Sales ERP. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;