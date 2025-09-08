
/*
 * ULTRA SOPHISTICATED PORTFOLIO JAVASCRIPT
 * Advanced Animations, 3D Graphics, ML Demonstrations
 * Author: Tarek Djaker
 * Enhanced with performance optimizations and accessibility
 */

// Performance monitoring
const performanceMonitor = {
    startTime: performance.now(),
    metrics: {},
    
    mark(name) {
        this.metrics[name] = performance.now() - this.startTime;
    },
    
    measure(name, startMark, endMark) {
        const start = this.metrics[startMark] || 0;
        const end = this.metrics[endMark] || performance.now() - this.startTime;
        this.metrics[name] = end - start;
        return this.metrics[name];
    },
    
    getMetrics() {
        return {
            ...this.metrics,
            totalLoadTime: performance.now() - this.startTime,
            userAgent: navigator.userAgent.slice(0, 100) + '...'
        };
    }
};

// Early performance mark
performanceMonitor.mark('scriptStart');

// Fallback functions for when external libraries are not available
const createFallbacks = () => {
    // GSAP fallback
    if (typeof gsap === 'undefined') {
        window.gsap = {
            registerPlugin: () => {},
            to: (target, options) => {
                if (typeof target === 'string') {
                    const elements = document.querySelectorAll(target);
                    elements.forEach(el => applySimpleAnimation(el, options));
                } else if (target instanceof Element) {
                    applySimpleAnimation(target, options);
                }
            },
            timeline: () => ({
                to: () => ({ to: () => {} }),
                from: () => ({ from: () => {} })
            }),
            utils: {
                toArray: (selector) => Array.from(document.querySelectorAll(selector))
            },
            ticker: {
                add: (fn) => setInterval(fn, 16),
                lagSmoothing: () => {}
            }
        };
        
        window.ScrollTrigger = {
            update: () => {}
        };
    }

    // Lenis fallback
    if (typeof Lenis === 'undefined') {
        window.Lenis = class {
            constructor() {}
            on() {}
            raf() {}
        };
    }

    // Three.js basic fallback
    if (typeof THREE === 'undefined') {
        window.THREE = {
            Scene: class {},
            PerspectiveCamera: class {},
            WebGLRenderer: class {},
            SphereGeometry: class {},
            MeshPhongMaterial: class {},
            Mesh: class {},
            AmbientLight: class {},
            PointLight: class {}
        };
    }

    // D3 fallback
    if (typeof d3 === 'undefined') {
        window.d3 = {
            select: () => ({
                html: () => ({ append: () => ({ attr: () => ({}) }) }),
                append: () => ({ attr: () => ({}) })
            })
        };
    }
};

// Simple animation helper
const applySimpleAnimation = (element, options) => {
    if (!element || !options) return;
    
    const duration = (options.duration || 1) * 1000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply transformations
        if (options.scale !== undefined) {
            element.style.transform = `scale(${options.scale})`;
        }
        if (options.y !== undefined) {
            element.style.transform = `translateY(${options.y}px)`;
        }
        if (options.opacity !== undefined) {
            element.style.opacity = options.opacity;
        }
        if (options.width !== undefined) {
            element.style.width = options.width;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else if (options.onComplete) {
            options.onComplete();
        }
    };
    
    requestAnimationFrame(animate);
};

// Theme toggle setup with ARIA state management
const setupThemeToggle = () => {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return;

    const htmlEl = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    htmlEl.setAttribute('data-theme', initialTheme);
    toggleButton.setAttribute('aria-pressed', initialTheme === 'dark');

    toggleButton.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        toggleButton.setAttribute('aria-pressed', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    });
};

// Ultra Sophisticated Portfolio Class
class UltraSophisticatedPortfolio {
    constructor() {
        this.lenis = null;
        this.scene = null;
        this.mlModels = new Map();
        this.animations = new Map();
        this.performanceMonitor = null;
        this.isLoading = true;
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Ultra Sophisticated Portfolio...');
        
        // Create fallbacks for missing libraries
        createFallbacks();
        
        // Show loading screen briefly
        this.showLoadingScreen();
        
        // Initialize smooth scrolling
        this.initLenis();
        
        // Initialize background effects
        this.initBackgroundEffects();
        
        // Initialize animations
        await this.initScrollAnimations();
        
        // Initialize ML demonstrations
        await this.initMLDemonstrations();
        
        // Initialize data visualizations
        this.initDataVisualizations();
        
        // Initialize interactive elements
        this.initInteractiveElements();
        
        // Hide loading screen
        setTimeout(() => this.hideLoadingScreen(), 1000);
        
        console.log('✅ Portfolio initialization complete!');
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    async hideLoadingScreen() {
        return new Promise(resolve => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    resolve();
                }, 500);
            } else {
                resolve();
            }
        });
    }

    initLenis() {
        try {
            this.lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                smooth: true,
            });

            if (typeof gsap !== 'undefined') {
                this.lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => {
                    this.lenis.raf(time * 1000);
                });
            }
        } catch (error) {
            console.log('Lenis not available, using fallback smooth scroll');
        }
    }

    initBackgroundEffects() {
        // Particle system
        this.createParticleSystem();
        
        // Shader background
        this.initShaderBackground();
        
        // Floating elements animation
        this.animateFloatingElements();
    }

    createParticleSystem() {
        const container = document.getElementById('particle-container');
        if (!container) return;

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                opacity: 0.8;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    }

    initShaderBackground() {
        const canvas = document.getElementById('shader-background');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let time = 0;

        const animate = () => {
            time += 0.01;
            
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `hsla(${240 + Math.sin(time) * 30}, 70%, 20%, 0.1)`);
            gradient.addColorStop(0.5, `hsla(${280 + Math.cos(time) * 30}, 70%, 15%, 0.1)`);
            gradient.addColorStop(1, `hsla(${320 + Math.sin(time * 0.7) * 30}, 70%, 10%, 0.1)`);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            requestAnimationFrame(animate);
        };

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    animateFloatingElements() {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
            const animateElement = () => {
                const duration = 6000 + (index * 1000);
                const startTime = performance.now();
                
                const animate = (currentTime) => {
                    const elapsed = (currentTime - startTime) % duration;
                    const progress = elapsed / duration;
                    
                    const y = Math.sin(progress * Math.PI * 2) * 20;
                    const rotation = progress * 360;
                    
                    element.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
                    
                    requestAnimationFrame(animate);
                };
                
                requestAnimationFrame(animate);
            };
            
            setTimeout(animateElement, index * 2000);
        });
    }

    async initScrollAnimations() {
        // Simple scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease-out';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(section);
        });

        // Typing animation
        this.initTypingAnimation();
    }

    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Spécialiste en transport optimal',
            'Expert en IA et Machine Learning', 
            'Chercheur en génomique spatiale',
            'Développeur Full-Stack'
        ];

        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        const typeText = () => {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        };

        typeText();
    }

    async initMLDemonstrations() {
        console.log('🧠 Loading ML models...');
        
        // Initialize prediction interface
        this.initPredictionInterface();
        
        // Initialize neural network visualization
        this.initNeuralNetworkViz();
    }

    initPredictionInterface() {
        const predictBtn = document.getElementById('predict-btn');
        const tempSlider = document.getElementById('temp');
        const hourSlider = document.getElementById('hour');
        const seasonSelect = document.getElementById('season');

        if (tempSlider) {
            tempSlider.addEventListener('input', (e) => {
                const valueEl = document.getElementById('temp-value');
                if (valueEl) valueEl.textContent = e.target.value + '°C';
            });
        }

        if (hourSlider) {
            hourSlider.addEventListener('input', (e) => {
                const valueEl = document.getElementById('hour-value');
                if (valueEl) valueEl.textContent = e.target.value + ':00';
            });
        }

        if (predictBtn) {
            predictBtn.addEventListener('click', () => this.makePrediction());
        }
    }

    async makePrediction() {
        const btn = document.getElementById('predict-btn');
        if (!btn) return;

        btn.classList.add('loading');
        btn.style.opacity = '0.7';

        // Simulate ML prediction
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate realistic prediction data
        const demand = Math.random() * 20000 + 30000;
        const confidence = Math.random() * 20 + 75;
        const anomaly = Math.random();

        // Animate results
        this.animatePredictionResults({ demand, confidence, anomaly });

        // Create particle effect
        this.createParticleEffect();

        btn.classList.remove('loading');
        btn.style.opacity = '1';
    }

    animatePredictionResults(prediction) {
        const demandEl = document.getElementById('demand');
        const confidenceEl = document.getElementById('confidence');
        const anomalyEl = document.getElementById('anomaly');

        // Animate demand counter
        if (demandEl) {
            let currentValue = 0;
            const targetValue = prediction.demand;
            const duration = 2000;
            const startTime = performance.now();

            const animateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                currentValue = targetValue * progress;
                demandEl.textContent = Math.round(currentValue).toLocaleString() + ' MW';
                
                if (progress < 1) {
                    requestAnimationFrame(animateCounter);
                }
            };
            
            requestAnimationFrame(animateCounter);
        }

        // Animate confidence
        if (confidenceEl) {
            let currentValue = 0;
            const targetValue = prediction.confidence;
            const duration = 1500;
            const startTime = performance.now();

            const animateConfidence = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                currentValue = targetValue * progress;
                confidenceEl.textContent = currentValue.toFixed(1) + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(animateConfidence);
                }
            };
            
            requestAnimationFrame(animateConfidence);
        }

        // Animate anomaly score
        if (anomalyEl) {
            anomalyEl.textContent = (prediction.anomaly * 100).toFixed(1) + '%';
            
            if (prediction.anomaly > 0.7) {
                anomalyEl.style.color = '#ff0000';
                anomalyEl.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    anomalyEl.style.transform = 'scale(1)';
                }, 500);
            }
        }
    }

    createParticleEffect() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: linear-gradient(135deg, #00ff88 0%, #0088ff 100%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleExplode 3s ease-out forwards;
                opacity: 0.8;
            `;
            container.appendChild(particle);
        }
        
        document.body.appendChild(container);
        
        setTimeout(() => container.remove(), 3000);
    }

    initNeuralNetworkViz() {
        const container = document.getElementById('neural-network-container');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: rgba(255, 255, 255, 0.6); flex-direction: column;">
                <div style="font-size: 4rem; margin-bottom: 1rem; animation: pulse 2s ease-in-out infinite;">🧠</div>
                <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Neural Network Visualization</p>
                <p style="font-size: 0.9rem; opacity: 0.7;">Advanced 3D rendering visualization</p>
                <div style="margin-top: 1rem; display: flex; gap: 1rem;">
                    <div style="width: 12px; height: 12px; background: #667eea; border-radius: 50%; animation: pulse 1s ease-in-out infinite;"></div>
                    <div style="width: 12px; height: 12px; background: #f093fb; border-radius: 50%; animation: pulse 1s ease-in-out infinite 0.2s;"></div>
                    <div style="width: 12px; height: 12px; background: #4facfe; border-radius: 50%; animation: pulse 1s ease-in-out infinite 0.4s;"></div>
                </div>
            </div>
        `;
    }

    initDataVisualizations() {
        console.log('📊 Initializing data visualizations...');
        
        this.createSkillsRadar();
        this.createProjectTimeline();
        this.createTechNetwork();
        this.createContributionHeatmap();
    }

    createSkillsRadar() {
        const container = document.getElementById('skills-radar');
        if (!container) return;

        // Create canvas element for custom radar chart
        container.innerHTML = '<canvas id="skills-radar-chart" style="max-height: 300px; width: 100%;"></canvas>';
        
        const canvas = document.getElementById('skills-radar-chart');
        if (!canvas) return;

        // Set canvas size
        const size = Math.min(300, container.clientWidth || 300);
        canvas.width = size;
        canvas.height = size;
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';

        const ctx = canvas.getContext('2d');
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size * 0.35;

        // Skills data - professional competencies for Data Scientist/ML Engineer/Researcher
        const skills = [
            { label: 'Python/Programming', value: 95, color: '#667eea' },
            { label: 'Machine Learning', value: 90, color: '#764ba2' },
            { label: 'Deep Learning', value: 85, color: '#f093fb' },
            { label: 'Data Visualization', value: 88, color: '#4facfe' },
            { label: 'Mathematics/Stats', value: 85, color: '#43e97b' },
            { label: 'Computational Biology', value: 80, color: '#667eea' },
            { label: 'Software Engineering', value: 75, color: '#764ba2' },
            { label: 'Scientific Writing', value: 85, color: '#f093fb' }
        ];

        // Animation state
        let animationProgress = 0;
        const animationDuration = 2000;
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            animationProgress = Math.min(elapsed / animationDuration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
            
            drawRadarChart(easeProgress);
            
            if (animationProgress < 1) {
                requestAnimationFrame(animate);
            }
        }

        function drawRadarChart(progress) {
            ctx.clearRect(0, 0, size, size);
            
            // Set up styling for dark theme
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;

            // Draw concentric circles (grid)
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
                ctx.stroke();
            }

            // Draw axis lines and labels
            const angleStep = (2 * Math.PI) / skills.length;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            skills.forEach((skill, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const x1 = centerX;
                const y1 = centerY;
                const x2 = centerX + Math.cos(angle) * radius;
                const y2 = centerY + Math.sin(angle) * radius;

                // Draw axis line
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                // Draw label
                const labelX = centerX + Math.cos(angle) * (radius + 25);
                const labelY = centerY + Math.sin(angle) * (radius + 25);
                
                // Split long labels into multiple lines
                const words = skill.label.split('/');
                if (words.length > 1) {
                    ctx.fillText(words[0], labelX, labelY - 6);
                    ctx.fillText(words[1], labelX, labelY + 6);
                } else {
                    ctx.fillText(skill.label, labelX, labelY);
                }
            });

            // Draw data polygon with animation
            ctx.strokeStyle = 'rgba(102, 126, 234, 0.8)';
            ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
            ctx.lineWidth = 2;
            ctx.beginPath();

            skills.forEach((skill, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const value = (skill.value / 100) * progress;
                const x = centerX + Math.cos(angle) * (radius * value);
                const y = centerY + Math.sin(angle) * (radius * value);

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Draw data points with glow effect
            skills.forEach((skill, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const value = (skill.value / 100) * progress;
                const x = centerX + Math.cos(angle) * (radius * value);
                const y = centerY + Math.sin(angle) * (radius * value);

                // Glow effect
                ctx.shadowColor = skill.color;
                ctx.shadowBlur = 10;
                ctx.fillStyle = skill.color;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Inner white dot
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, 2 * Math.PI);
                ctx.fill();
            });

            // Draw percentage values near data points
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = '10px Inter, sans-serif';
            skills.forEach((skill, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const value = skill.value * progress;
                const displayRadius = radius * (skill.value / 100) * progress;
                const x = centerX + Math.cos(angle) * (displayRadius + 15);
                const y = centerY + Math.sin(angle) * (displayRadius + 15);

                if (progress > 0.7) { // Only show when animation is nearly complete
                    ctx.fillText(`${Math.round(value)}%`, x, y);
                }
            });
        }

        // Add interactivity
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Convert to canvas coordinates
            const canvasX = (x / rect.width) * canvas.width;
            const canvasY = (y / rect.height) * canvas.height;
            
            // Check if mouse is over a data point
            let hovering = false;
            skills.forEach((skill, index) => {
                const angle = index * (2 * Math.PI) / skills.length - Math.PI / 2;
                const pointX = centerX + Math.cos(angle) * (radius * skill.value / 100);
                const pointY = centerY + Math.sin(angle) * (radius * skill.value / 100);
                
                const distance = Math.sqrt((canvasX - pointX) ** 2 + (canvasY - pointY) ** 2);
                if (distance < 10) {
                    hovering = true;
                    canvas.title = `${skill.label}: ${skill.value}%`;
                }
            });
            
            canvas.style.cursor = hovering ? 'pointer' : 'default';
        });

        // Start animation
        requestAnimationFrame(animate);
    }

    createProjectTimeline() {
        const container = document.getElementById('project-timeline');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: rgba(255, 255, 255, 0.6); flex-direction: column;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">📈</div>
                <p style="font-size: 1rem; margin-bottom: 0.5rem;">Project Timeline</p>
                <p style="font-size: 0.8rem; opacity: 0.7;">Advanced timeline visualization</p>
            </div>
        `;
    }

    createTechNetwork() {
        const container = document.getElementById('tech-network');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: rgba(255, 255, 255, 0.6); flex-direction: column;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🕸️</div>
                <p style="font-size: 1rem; margin-bottom: 0.5rem;">Technology Network</p>
                <p style="font-size: 0.8rem; opacity: 0.7;">Interactive network graph</p>
            </div>
        `;
    }

    createContributionHeatmap() {
        const container = document.getElementById('contribution-heatmap');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: rgba(255, 255, 255, 0.6); flex-direction: column;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🔥</div>
                <p style="font-size: 1rem; margin-bottom: 0.5rem;">GitHub Contributions</p>
                <p style="font-size: 0.8rem; opacity: 0.7;">Activity heatmap visualization</p>
            </div>
        `;
    }

    initInteractiveElements() {
        // Skill bars animation
        this.animateSkillBars();
        
        // Glassmorphism hover effects
        this.initGlassmorphismEffects();
        
        // Photo glow effect
        this.initPhotoGlow();
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach((bar, index) => {
            const level = bar.getAttribute('data-level');
            
            setTimeout(() => {
                bar.style.width = level + '%';
                bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 200);
        });
    }

    initGlassmorphismEffects() {
        const glassMorphElements = document.querySelectorAll('.glassmorphism');
        
        glassMorphElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
                element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initPhotoGlow() {
        const photo = document.querySelector('.profile-photo');
        if (photo) {
            let glowIntensity = 0;
            let increasing = true;
            
            setInterval(() => {
                if (increasing) {
                    glowIntensity += 0.02;
                    if (glowIntensity >= 1) increasing = false;
                } else {
                    glowIntensity -= 0.02;
                    if (glowIntensity <= 0) increasing = true;
                }
                
                photo.style.filter = `drop-shadow(0 20px 40px rgba(102, 126, 234, ${glowIntensity * 0.5}))`;
            }, 50);
        }
    }
}

// Enhanced document ready functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 DOM Content Loaded - Starting portfolio...');
    
    // Add particle effect CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(100vh) scale(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        
        @keyframes particleExplode {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Initialize theme toggle button
    setupThemeToggle();

    // Initialize ultra-sophisticated portfolio
    const portfolio = new UltraSophisticatedPortfolio();
    
    // Make it globally accessible for debugging
    window.portfolio = portfolio;
    
    // Legacy skill bars functionality for fallback
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            setTimeout(() => {
                if (!bar.style.width || bar.style.width === '0px') {
                    bar.style.width = level + '%';
                    bar.style.transition = 'width 2s ease-out';
                }
            }, 1500);
        }
    });
    
    console.log('🌟 Portfolio enhancement complete!');
});

// Performance monitoring
window.addEventListener('load', () => {
    console.log('📊 Performance metrics:', {
        loadTime: performance.now(),
        userAgent: navigator.userAgent,
        deviceMemory: navigator.deviceMemory || 'unknown',
        hardwareConcurrency: navigator.hardwareConcurrency || 'unknown'
    });
});

// Error handling
window.addEventListener('error', (event) => {
    console.log('⚠️ Error caught:', event.error?.message || event.message);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UltraSophisticatedPortfolio };
}
