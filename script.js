
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
        
        // Initialize A/B testing dashboard
        this.initABTestingDashboard();
        
        // Initialize interactive elements
        this.initInteractiveElements();
        
        // Initialize theme toggle
        this.initThemeToggle();
        
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

        container.innerHTML = '<canvas id="timeline-canvas" style="width: 100%; height: 250px;"></canvas>';
        
        const canvas = document.getElementById('timeline-canvas');
        if (!canvas) return;

        canvas.width = container.clientWidth || 400;
        canvas.height = 250;
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';

        const ctx = canvas.getContext('2d');
        
        // Project timeline data
        const projects = [
            { 
                name: 'Fused Gromov-Wasserstein', 
                start: new Date('2023-06-01'), 
                end: new Date('2024-07-26'), 
                status: 'published',
                color: '#667eea',
                impact: 'Nature Communications'
            },
            { 
                name: 'Mowgli Multi-omics', 
                start: new Date('2022-08-01'), 
                end: new Date('2023-11-01'), 
                status: 'published',
                color: '#f093fb',
                impact: 'bioRxiv 2024'
            },
            { 
                name: 'Wasserstein Singular Vectors', 
                start: new Date('2021-09-01'), 
                end: new Date('2022-06-01'), 
                status: 'published',
                color: '#4facfe',
                impact: 'ICML 2022'
            },
            { 
                name: 'OT-scOmics', 
                start: new Date('2021-03-01'), 
                end: new Date('2022-04-01'), 
                status: 'published',
                color: '#43e97b',
                impact: 'Bioinformatics'
            },
            { 
                name: 'Portfolio Website', 
                start: new Date('2024-01-01'), 
                end: new Date('2024-12-31'), 
                status: 'ongoing',
                color: '#ff6b6b',
                impact: 'Ongoing'
            }
        ];
        
        // Timeline dimensions
        const margin = { top: 40, right: 40, bottom: 60, left: 100 };
        const timelineWidth = canvas.width - margin.left - margin.right;
        const timelineHeight = canvas.height - margin.top - margin.bottom;
        const rowHeight = timelineHeight / projects.length;
        
        // Date range
        const minDate = new Date('2021-01-01');
        const maxDate = new Date('2025-01-01');
        const timeRange = maxDate.getTime() - minDate.getTime();
        
        // Animation state
        let animationProgress = 0;
        const animationDuration = 2500;
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            animationProgress = Math.min(elapsed / animationDuration, 1);
            
            const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
            
            drawTimeline(easeProgress);
            
            if (animationProgress < 1) {
                requestAnimationFrame(animate);
            }
        }

        function drawTimeline(progress) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw title
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Research & Development Timeline', canvas.width / 2, 25);
            
            // Draw time axis
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(margin.left, margin.top);
            ctx.lineTo(margin.left + timelineWidth, margin.top);
            ctx.stroke();
            
            // Draw year markers
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            
            for (let year = 2021; year <= 2024; year++) {
                const yearDate = new Date(year, 0, 1);
                const x = margin.left + ((yearDate.getTime() - minDate.getTime()) / timeRange) * timelineWidth;
                
                // Vertical line
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, margin.top);
                ctx.lineTo(x, margin.top + timelineHeight);
                ctx.stroke();
                
                // Year label
                ctx.fillText(year.toString(), x, margin.top - 10);
            }
            
            // Draw projects
            projects.forEach((project, index) => {
                const y = margin.top + (index * rowHeight) + rowHeight / 2;
                const startX = margin.left + ((project.start.getTime() - minDate.getTime()) / timeRange) * timelineWidth;
                const endX = margin.left + ((project.end.getTime() - minDate.getTime()) / timeRange) * timelineWidth;
                const barWidth = endX - startX;
                
                // Animate project bars
                const projectProgress = Math.max(0, Math.min(1, (progress - index * 0.1) * 2));
                const currentBarWidth = barWidth * projectProgress;
                
                if (projectProgress > 0) {
                    // Project bar
                    ctx.fillStyle = project.color;
                    ctx.fillRect(startX, y - 8, currentBarWidth, 16);
                    
                    // Project bar glow
                    ctx.shadowColor = project.color;
                    ctx.shadowBlur = 10;
                    ctx.fillRect(startX, y - 8, currentBarWidth, 16);
                    ctx.shadowBlur = 0;
                    
                    // Status indicator
                    if (project.status === 'published') {
                        ctx.fillStyle = '#43e97b';
                        ctx.beginPath();
                        ctx.arc(endX, y, 4, 0, 2 * Math.PI);
                        ctx.fill();
                    } else {
                        ctx.strokeStyle = '#ff6b6b';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.arc(endX, y, 4, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                    
                    // Project name
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.font = '12px Inter, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.fillText(project.name, margin.left - 10, y + 4);
                    
                    // Impact/Publication
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.font = '10px Inter, sans-serif';
                    ctx.fillText(project.impact, margin.left - 10, y + 18);
                }
            });
            
            // Legend
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'left';
            
            // Published indicator
            ctx.fillStyle = '#43e97b';
            ctx.beginPath();
            ctx.arc(margin.left, canvas.height - 30, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText('Published', margin.left + 10, canvas.height - 26);
            
            // Ongoing indicator
            ctx.strokeStyle = '#ff6b6b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(margin.left + 80, canvas.height - 30, 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText('Ongoing', margin.left + 90, canvas.height - 26);
        }
        
        // Start animation
        requestAnimationFrame(animate);
        
        // Add hover interaction
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
            
            // Check if hovering over a project bar
            let hovering = false;
            projects.forEach((project, index) => {
                const y = margin.top + (index * rowHeight) + rowHeight / 2;
                const startX = margin.left + ((project.start.getTime() - minDate.getTime()) / timeRange) * timelineWidth;
                const endX = margin.left + ((project.end.getTime() - minDate.getTime()) / timeRange) * timelineWidth;
                
                if (mouseX >= startX && mouseX <= endX && mouseY >= y - 8 && mouseY <= y + 8) {
                    hovering = true;
                    canvas.style.cursor = 'pointer';
                    const startDate = project.start.toLocaleDateString('fr-FR');
                    const endDate = project.end.toLocaleDateString('fr-FR');
                    canvas.title = `${project.name}\n${startDate} - ${endDate}\nStatus: ${project.status}\nPublication: ${project.impact}`;
                }
            });
            
            if (!hovering) {
                canvas.style.cursor = 'default';
                canvas.title = '';
            }
        });
    }

    createTechNetwork() {
        const container = document.getElementById('tech-network');
        if (!container) return;

        container.innerHTML = '<canvas id="tech-network-canvas" style="width: 100%; height: 300px;"></canvas>';
        
        const canvas = document.getElementById('tech-network-canvas');
        if (!canvas) return;

        const size = Math.min(400, container.clientWidth || 300);
        canvas.width = size;
        canvas.height = 300;
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';

        const ctx = canvas.getContext('2d');
        const centerX = size / 2;
        const centerY = 150;

        // Technology nodes with relationships
        const techStack = [
            { name: 'Python', x: centerX, y: centerY, size: 25, color: '#3776ab', connections: [1, 2, 3, 4, 5] },
            { name: 'TensorFlow', x: centerX - 80, y: centerY - 60, size: 20, color: '#ff6f00', connections: [0, 2, 8] },
            { name: 'PyTorch', x: centerX + 80, y: centerY - 60, size: 20, color: '#ee4c2c', connections: [0, 1, 8] },
            { name: 'scikit-learn', x: centerX - 120, y: centerY, size: 18, color: '#f7931e', connections: [0, 4, 5] },
            { name: 'Pandas', x: centerX - 60, y: centerY + 60, size: 18, color: '#150458', connections: [0, 3, 5] },
            { name: 'NumPy', x: centerX + 60, y: centerY + 60, size: 18, color: '#013243', connections: [0, 3, 4] },
            { name: 'Docker', x: centerX + 120, y: centerY, size: 16, color: '#2496ed', connections: [7, 8, 9] },
            { name: 'Kubernetes', x: centerX + 140, y: centerY - 40, size: 15, color: '#326ce5', connections: [6, 8] },
            { name: 'MLflow', x: centerX, y: centerY - 100, size: 16, color: '#0194e2', connections: [1, 2, 6, 7] },
            { name: 'Streamlit', x: centerX + 100, y: centerY + 80, size: 15, color: '#ff4b4b', connections: [6] }
        ];

        // Animation state
        let animationProgress = 0;
        const animationDuration = 3000;
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            animationProgress = Math.min(elapsed / animationDuration, 1);
            
            const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
            
            drawTechNetwork(easeProgress);
            
            if (animationProgress < 1) {
                requestAnimationFrame(animate);
            }
        }

        function drawTechNetwork(progress) {
            ctx.clearRect(0, 0, size, 300);
            
            // Draw connections first (behind nodes)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            
            techStack.forEach((node, index) => {
                if (node.connections) {
                    node.connections.forEach(connectionIndex => {
                        if (connectionIndex > index && techStack[connectionIndex]) {
                            const target = techStack[connectionIndex];
                            const opacity = progress * 0.3;
                            
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(target.x, target.y);
                            ctx.stroke();
                        }
                    });
                }
            });
            
            // Draw nodes
            techStack.forEach((node, index) => {
                const nodeProgress = Math.max(0, Math.min(1, (progress - index * 0.1) * 2));
                const currentSize = node.size * nodeProgress;
                
                // Glow effect
                ctx.shadowColor = node.color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = node.color;
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentSize, 0, 2 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;
                
                // Inner circle
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentSize * 0.6, 0, 2 * Math.PI);
                ctx.fill();
                
                // Label
                if (nodeProgress > 0.5) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.font = '11px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(node.name, node.x, node.y + currentSize + 5);
                }
            });
        }

        // Start animation
        requestAnimationFrame(animate);
        
        // Add hover interaction
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
            
            // Check if hovering over a node
            let hovering = false;
            techStack.forEach(node => {
                const distance = Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2));
                if (distance < node.size) {
                    hovering = true;
                    canvas.style.cursor = 'pointer';
                    // Could add tooltip here
                }
            });
            
            if (!hovering) {
                canvas.style.cursor = 'default';
            }
        });
    }

    createContributionHeatmap() {
        const container = document.getElementById('contribution-heatmap');
        if (!container) return;

        container.innerHTML = '<canvas id="contribution-canvas" style="width: 100%; height: 200px;"></canvas>';
        
        const canvas = document.getElementById('contribution-canvas');
        if (!canvas) return;

        canvas.width = container.clientWidth || 400;
        canvas.height = 200;
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';

        const ctx = canvas.getContext('2d');
        
        // Generate realistic contribution data for the past year
        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        
        const cellSize = Math.min(12, (canvas.width - 80) / 53); // 53 weeks in a year
        const cellGap = 2;
        const startX = 40;
        const startY = 20;
        
        // Generate contribution data (0-4 scale like GitHub)
        const contributions = [];
        for (let week = 0; week < 53; week++) {
            const weekData = [];
            for (let day = 0; day < 7; day++) {
                // Simulate realistic patterns: higher activity on weekdays, some vacation periods
                const isWeekend = day === 0 || day === 6;
                const isVacation = Math.random() < 0.1; // 10% chance of vacation
                const baseActivity = isWeekend ? 0.3 : 0.8;
                const activity = isVacation ? 0 : Math.random() * baseActivity;
                
                let level = 0;
                if (activity > 0.7) level = 4;
                else if (activity > 0.5) level = 3;
                else if (activity > 0.3) level = 2;
                else if (activity > 0.1) level = 1;
                
                weekData.push(level);
            }
            contributions.push(weekData);
        }
        
        // Color scheme (GitHub-like)
        const colors = [
            'rgba(255, 255, 255, 0.1)',  // No contributions
            'rgba(102, 126, 234, 0.3)',  // Low
            'rgba(102, 126, 234, 0.5)',  // Medium-low  
            'rgba(102, 126, 234, 0.7)',  // Medium-high
            'rgba(102, 126, 234, 0.9)'   // High
        ];
        
        // Animation state
        let animationProgress = 0;
        const animationDuration = 2000;
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            animationProgress = Math.min(elapsed / animationDuration, 1);
            
            drawHeatmap(animationProgress);
            
            if (animationProgress < 1) {
                requestAnimationFrame(animate);
            }
        }

        function drawHeatmap(progress) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw day labels
            const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            
            dayLabels.forEach((label, index) => {
                if (label) {
                    ctx.fillText(label, startX - 5, startY + index * (cellSize + cellGap) + cellSize / 2);
                }
            });
            
            // Draw month labels
            const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            
            for (let month = 0; month < 12; month++) {
                const x = startX + (month * 4.4) * (cellSize + cellGap);
                if (x < canvas.width - 30) {
                    ctx.fillText(monthLabels[month], x, startY - 15);
                }
            }
            
            // Draw contribution squares
            const totalCells = 53 * 7;
            contributions.forEach((week, weekIndex) => {
                week.forEach((level, dayIndex) => {
                    const cellIndex = weekIndex * 7 + dayIndex;
                    const cellProgress = Math.max(0, Math.min(1, (progress - cellIndex / totalCells) * 10));
                    
                    if (cellProgress > 0) {
                        const x = startX + weekIndex * (cellSize + cellGap);
                        const y = startY + dayIndex * (cellSize + cellGap);
                        
                        ctx.fillStyle = colors[level];
                        ctx.fillRect(x, y, cellSize * cellProgress, cellSize * cellProgress);
                        
                        // Add subtle border
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                        ctx.lineWidth = 0.5;
                        ctx.strokeRect(x, y, cellSize, cellSize);
                    }
                });
            });
            
            // Add legend
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '9px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Less', canvas.width - 120, canvas.height - 15);
            ctx.fillText('More', canvas.width - 25, canvas.height - 15);
            
            // Legend squares
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = colors[i];
                ctx.fillRect(canvas.width - 100 + i * 12, canvas.height - 25, 8, 8);
            }
        }

        // Start animation
        requestAnimationFrame(animate);
        
        // Add hover effect for individual squares
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
            
            // Calculate which cell is being hovered
            const weekIndex = Math.floor((mouseX - startX) / (cellSize + cellGap));
            const dayIndex = Math.floor((mouseY - startY) / (cellSize + cellGap));
            
            if (weekIndex >= 0 && weekIndex < 53 && dayIndex >= 0 && dayIndex < 7) {
                canvas.style.cursor = 'pointer';
                canvas.title = `Week ${weekIndex + 1}, Day ${dayIndex + 1}: ${contributions[weekIndex][dayIndex]} contributions`;
            } else {
                canvas.style.cursor = 'default';
                canvas.title = '';
            }
        });
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
    
    // ==========================================
    // A/B TESTING DASHBOARD FUNCTIONALITY
    // ==========================================
    
    initABTestingDashboard() {
        console.log('📊 Initializing A/B Testing Dashboard...');
        
        const calculateBtn = document.getElementById('calculate-sample-size');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateSampleSize());
        }
        
        // Initialize charts
        this.initABCharts();
        
        // Add live update listeners
        this.addABEventListeners();
    }
    
    calculateSampleSize() {
        const baselineConversion = parseFloat(document.getElementById('baseline-conversion').value) / 100;
        const minimumEffect = parseFloat(document.getElementById('minimum-effect').value) / 100;
        const statisticalPower = parseFloat(document.getElementById('statistical-power').value);
        const significanceLevel = parseFloat(document.getElementById('significance-level').value);
        
        // Calculate improved conversion rate
        const improvedConversion = baselineConversion * (1 + minimumEffect);
        
        // Z-scores for power and significance
        const zAlpha = this.getZScore(1 - significanceLevel / 2);
        const zBeta = this.getZScore(statisticalPower);
        
        // Sample size calculation using two-proportion z-test formula
        const pooledP = (baselineConversion + improvedConversion) / 2;
        const numerator = Math.pow(zAlpha * Math.sqrt(2 * pooledP * (1 - pooledP)) + 
                                  zBeta * Math.sqrt(baselineConversion * (1 - baselineConversion) + 
                                                   improvedConversion * (1 - improvedConversion)), 2);
        const denominator = Math.pow(improvedConversion - baselineConversion, 2);
        
        const sampleSizePerGroup = Math.ceil(numerator / denominator);
        
        // Estimate duration (assuming 1000 visitors per day per group)
        const visitorsPerDay = 1000;
        const estimatedDuration = Math.ceil(sampleSizePerGroup / visitorsPerDay);
        
        // Update UI with results
        this.updateABResults({
            sampleSize: sampleSizePerGroup,
            duration: estimatedDuration,
            confidence: (1 - significanceLevel) * 100,
            improvement: minimumEffect * 100
        });
        
        // Update charts
        this.updateABCharts({
            baselineConversion,
            improvedConversion,
            sampleSize: sampleSizePerGroup,
            significanceLevel,
            statisticalPower
        });
    }
    
    getZScore(probability) {
        // Approximate inverse normal distribution for common values
        const zScores = {
            0.90: 1.282, 0.95: 1.645, 0.975: 1.96, 0.99: 2.326, 0.995: 2.576
        };
        
        // Find closest match or interpolate
        const keys = Object.keys(zScores).map(Number).sort((a, b) => a - b);
        for (let i = 0; i < keys.length; i++) {
            if (probability <= keys[i]) {
                return zScores[keys[i]];
            }
        }
        return 2.576; // Default for very high confidence
    }
    
    updateABResults(results) {
        document.getElementById('sample-size-result').textContent = results.sampleSize.toLocaleString();
        document.getElementById('duration-result').textContent = results.duration.toLocaleString();
        document.getElementById('confidence-result').textContent = results.confidence.toFixed(1) + '%';
        document.getElementById('improvement-result').textContent = results.improvement.toFixed(1) + '%';
        
        // Animate the numbers
        this.animateABNumbers();
    }
    
    animateABNumbers() {
        const metrics = document.querySelectorAll('.ab-metric-card');
        metrics.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
    
    initABCharts() {
        this.drawDistributionChart();
        this.drawBayesianChart();
    }
    
    updateABCharts(params) {
        this.drawDistributionChart(params);
        this.updateBayesianAnalysis(params);
    }
    
    drawDistributionChart(params = null) {
        const canvas = document.getElementById('ab-distribution-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Default parameters for visualization
        const defaultParams = {
            baselineConversion: 0.05,
            improvedConversion: 0.06,
            sampleSize: 1000,
            significanceLevel: 0.05
        };
        
        const p = params || defaultParams;
        
        // Draw axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        ctx.lineTo(canvas.width - 20, canvas.height - 50);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(50, canvas.height - 50);
        ctx.stroke();
        
        // Draw normal distributions for H0 and H1
        this.drawNormalDistribution(ctx, canvas, p, 'H0', '#667eea');
        this.drawNormalDistribution(ctx, canvas, p, 'H1', '#f093fb');
        
        // Add labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText('Différence de taux de conversion', canvas.width / 2 - 80, canvas.height - 20);
        
        // Rotate and draw Y-axis label
        ctx.save();
        ctx.translate(20, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Densité de probabilité', -40, 0);
        ctx.restore();
    }
    
    drawNormalDistribution(ctx, canvas, params, hypothesis, color) {
        const { baselineConversion, improvedConversion, sampleSize } = params;
        
        // Calculate distribution parameters
        const p1 = baselineConversion;
        const p2 = hypothesis === 'H0' ? baselineConversion : improvedConversion;
        const mean = p2 - p1;
        const standardError = Math.sqrt((p1 * (1 - p1) + p2 * (1 - p2)) / sampleSize);
        
        // Draw the curve
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const xMin = -0.05;
        const xMax = 0.05;
        const steps = 200;
        
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = this.normalPDF(x, mean, standardError);
            
            const canvasX = 50 + (x - xMin) / (xMax - xMin) * (canvas.width - 70);
            const canvasY = canvas.height - 50 - y * 2000; // Scale for visibility
            
            if (i === 0) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        
        ctx.stroke();
    }
    
    normalPDF(x, mean, std) {
        return (1 / (std * Math.sqrt(2 * Math.PI))) * 
               Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
    }
    
    drawBayesianChart() {
        const canvas = document.getElementById('bayesian-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw placeholder Bayesian visualization
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Analyse Bayésienne', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText('Distributions Beta posteriori', canvas.width / 2, canvas.height / 2 + 10);
    }
    
    updateBayesianAnalysis(params) {
        // Simplified Bayesian analysis
        const priorAlpha = parseFloat(document.getElementById('prior-alpha').value) || 1;
        const priorBeta = parseFloat(document.getElementById('prior-beta').value) || 1;
        
        // Simulate some data for demonstration
        const sampleSizeA = 1000;
        const conversionsA = Math.round(sampleSizeA * params.baselineConversion);
        const sampleSizeB = 1000;
        const conversionsB = Math.round(sampleSizeB * params.improvedConversion);
        
        // Beta posterior parameters
        const alphaA = priorAlpha + conversionsA;
        const betaA = priorBeta + sampleSizeA - conversionsA;
        const alphaB = priorAlpha + conversionsB;
        const betaB = priorBeta + sampleSizeB - conversionsB;
        
        // Monte Carlo simulation for P(B > A)
        const simulations = 10000;
        let bBetterCount = 0;
        
        for (let i = 0; i < simulations; i++) {
            const sampleA = this.betaRandom(alphaA, betaA);
            const sampleB = this.betaRandom(alphaB, betaB);
            if (sampleB > sampleA) bBetterCount++;
        }
        
        const probBBetter = bBetterCount / simulations;
        const expectedImprovement = (alphaB / (alphaB + betaB) - alphaA / (alphaA + betaA)) * 100;
        
        // Update UI
        document.getElementById('prob-b-better').textContent = (probBBetter * 100).toFixed(1) + '%';
        document.getElementById('expected-improvement').textContent = expectedImprovement.toFixed(2) + '%';
    }
    
    betaRandom(alpha, beta) {
        // Simple Beta distribution sampling using Gamma distributions
        const gamma1 = this.gammaRandom(alpha);
        const gamma2 = this.gammaRandom(beta);
        return gamma1 / (gamma1 + gamma2);
    }
    
    gammaRandom(shape) {
        // Simplified Gamma distribution sampling
        if (shape < 1) {
            return this.gammaRandom(shape + 1) * Math.pow(Math.random(), 1/shape);
        }
        
        const d = shape - 1/3;
        const c = 1 / Math.sqrt(9 * d);
        
        for (let i = 0; i < 100; i++) {
            let x, v;
            do {
                x = this.normalRandom();
                v = 1 + c * x;
            } while (v <= 0);
            
            v = v * v * v;
            const u = Math.random();
            
            if (u < 1 - 0.0331 * x * x * x * x || 
                Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
                return d * v;
            }
        }
        return 1; // Fallback
    }
    
    normalRandom() {
        // Box-Muller transform
        if (this.spare !== undefined) {
            const temp = this.spare;
            delete this.spare;
            return temp;
        }
        
        const u = Math.random();
        const v = Math.random();
        const mag = Math.sqrt(-2 * Math.log(u));
        this.spare = mag * Math.cos(2 * Math.PI * v);
        return mag * Math.sin(2 * Math.PI * v);
    }
    
    addABEventListeners() {
        // Add live update listeners for form inputs
        const inputs = [
            'baseline-conversion', 'minimum-effect', 
            'statistical-power', 'significance-level',
            'prior-alpha', 'prior-beta'
        ];
        
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => {
                    // Debounce the calculations
                    clearTimeout(this.abCalculationTimeout);
                    this.abCalculationTimeout = setTimeout(() => {
                        this.calculateSampleSize();
                    }, 500);
                });
            }
        });
    }
    
    // ==========================================
    // THEME TOGGLE FUNCTIONALITY
    // ==========================================
    
    initThemeToggle() {
        console.log('🎨 Initializing theme toggle...');
        
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        // Get current theme from localStorage or default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(currentTheme);
        
        // Add click listener
        themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Add keyboard support
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Update button icon based on current theme
        this.updateThemeToggleIcon(currentTheme);
    }
    
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Smooth transition
        html.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Set new theme
        this.setTheme(newTheme);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update button
        this.updateThemeToggleIcon(newTheme);
        
        // Remove transition after animation
        setTimeout(() => {
            html.style.transition = '';
        }, 300);
        
        console.log(`🎨 Theme switched to: ${newTheme}`);
    }
    
    setTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        
        // Update aria-pressed for accessibility
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
        }
    }
    
    updateThemeToggleIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        // Clear existing content
        themeToggle.innerHTML = '';
        
        // Create icon element
        const icon = document.createElement('span');
        icon.className = 'theme-icon';
        icon.setAttribute('aria-hidden', 'true');
        
        if (theme === 'dark') {
            // Show sun icon for switching to light
            icon.innerHTML = '☀️';
            icon.style.filter = 'drop-shadow(0 0 8px rgba(255, 193, 7, 0.6))';
        } else {
            // Show moon icon for switching to dark
            icon.innerHTML = '🌙';
            icon.style.filter = 'drop-shadow(0 0 8px rgba(108, 117, 125, 0.6))';
        }
        
        themeToggle.appendChild(icon);
        
        // Add screen reader text
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre';
        themeToggle.appendChild(srText);
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
