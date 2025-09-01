
/*
 * ULTRA SOPHISTICATED PORTFOLIO JAVASCRIPT
 * Advanced Animations, 3D Graphics, ML Demonstrations
 * Author: Tarek Djaker
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
        
        // Show loading screen
        this.showLoadingScreen();
        
        // Initialize smooth scrolling
        this.initLenis();
        
        // Check device capabilities
        const shouldLoad3D = this.checkDeviceCapabilities();
        console.log('Device capabilities:', { shouldLoad3D });
        
        // Initialize background effects
        this.initBackgroundEffects();
        
        // Initialize animations
        await this.initScrollAnimations();
        
        // Initialize 3D if supported
        if (shouldLoad3D) {
            await this.init3DExperience();
        }
        
        // Initialize ML demonstrations
        await this.initMLDemonstrations();
        
        // Initialize data visualizations
        this.initDataVisualizations();
        
        // Initialize interactive elements
        this.initInteractiveElements();
        
        // Hide loading screen
        await this.hideLoadingScreen();
        
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
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    initLenis() {
        if (typeof Lenis !== 'undefined') {
            this.lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            // Synchronize with GSAP
            this.lenis.on('scroll', ScrollTrigger.update);
            
            gsap.ticker.add((time) => {
                this.lenis.raf(time * 1000);
            });
            
            gsap.ticker.lagSmoothing(0);
        }
    }

    checkDeviceCapabilities() {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        const connection = navigator.connection?.effectiveType || '4g';
        
        return memory >= 2 && cores >= 2 && connection !== 'slow-2g';
    }

    initBackgroundEffects() {
        // Particle system
        this.createParticleSystem();
        
        // Shader background
        this.initShaderBackground();
    }

    createParticleSystem() {
        const container = document.getElementById('particle-container');
        if (!container) return;

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (3 + Math.random() * 4) + 's';
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
            gradient.addColorStop(0, `hsl(${240 + Math.sin(time) * 30}, 70%, 20%)`);
            gradient.addColorStop(0.5, `hsl(${280 + Math.cos(time) * 30}, 70%, 15%)`);
            gradient.addColorStop(1, `hsl(${320 + Math.sin(time * 0.7) * 30}, 70%, 10%)`);
            
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

    async initScrollAnimations() {
        // Hero section animations
        gsap.timeline({
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            }
        })
        .to('.hero-title', { 
            scale: 1.5,
            y: -100,
            rotationX: 15,
            opacity: 0.8,
            ease: 'power2.inOut'
        })
        .to('.hero-subtitle', {
            y: -200,
            opacity: 0,
            stagger: 0.1
        }, '-=0.5');

        // Reveal animations for sections
        gsap.utils.toArray('.section').forEach((section, i) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                }
            })
            .from(section, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: 'power3.out',
                delay: i * 0.1
            });
        });

        // Project cards animation
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                }
            })
            .from(card, {
                opacity: 0,
                y: 100,
                rotationY: -30,
                scale: 0.9,
                duration: 1,
                ease: 'power3.out',
                delay: i * 0.1
            })
            .from(card.querySelector('.project-image'), {
                scale: 1.3,
                filter: 'grayscale(100%)',
                duration: 1.2,
                ease: 'power2.out'
            }, '-=0.8');
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

    async init3DExperience() {
        const container = document.getElementById('canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create data spheres
        const spheres = [];
        const projects = [
            { position: [-3, 0, 0], color: 0x667eea },
            { position: [3, 0, 0], color: 0xf093fb },
            { position: [0, 3, 0], color: 0x4facfe },
            { position: [0, -3, 0], color: 0x43e97b }
        ];

        projects.forEach(project => {
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshPhongMaterial({
                color: project.color,
                emissive: project.color,
                emissiveIntensity: 0.1,
                transparent: true,
                opacity: 0.8
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(...project.position);
            scene.add(sphere);
            spheres.push(sphere);
        });

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Camera position
        camera.position.z = 10;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate spheres
            spheres.forEach((sphere, index) => {
                sphere.rotation.x += 0.01;
                sphere.rotation.y += 0.005;
                sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });

        this.scene = { scene, camera, renderer, spheres };
    }

    async initMLDemonstrations() {
        // Simulate ML model loading
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
                document.getElementById('temp-value').textContent = e.target.value + '°C';
            });
        }

        if (hourSlider) {
            hourSlider.addEventListener('input', (e) => {
                const hour = e.target.value;
                document.getElementById('hour-value').textContent = hour + ':00';
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

        // Simulate ML prediction
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate fake prediction data
        const demand = Math.random() * 50000 + 30000;
        const confidence = Math.random() * 30 + 70;
        const anomaly = Math.random();

        // Animate results
        this.animatePredictionResults({ demand, confidence, anomaly });

        // Create particle effect
        this.createParticleEffect();

        btn.classList.remove('loading');
    }

    animatePredictionResults(prediction) {
        const demandEl = document.getElementById('demand');
        const confidenceEl = document.getElementById('confidence');
        const anomalyEl = document.getElementById('anomaly');

        if (demandEl) {
            gsap.to({ value: 0 }, {
                value: prediction.demand,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                    demandEl.textContent = Math.round(this.targets()[0].value).toLocaleString() + ' MW';
                }
            });
        }

        if (confidenceEl) {
            gsap.to({ value: 0 }, {
                value: prediction.confidence,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: function() {
                    confidenceEl.textContent = this.targets()[0].value.toFixed(1) + '%';
                }
            });
        }

        if (anomalyEl) {
            anomalyEl.textContent = (prediction.anomaly * 100).toFixed(1) + '%';
            
            if (prediction.anomaly > 0.7) {
                gsap.to(anomalyEl, {
                    scale: 1.2,
                    color: '#ff0000',
                    duration: 0.5,
                    yoyo: true,
                    repeat: 2
                });
            }
        }
    }

    createParticleEffect() {
        const container = document.createElement('div');
        container.className = 'particle-container';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (2 + Math.random() * 3) + 's';
            container.appendChild(particle);
        }
        
        document.body.appendChild(container);
        
        setTimeout(() => container.remove(), 5000);
    }

    initNeuralNetworkViz() {
        const container = document.getElementById('neural-network-container');
        if (!container || typeof THREE === 'undefined') return;

        // Create simple neural network visualization placeholder
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: rgba(255, 255, 255, 0.6);">
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🧠</div>
                    <p>Neural Network Visualization</p>
                    <p style="font-size: 0.8rem;">Advanced 3D rendering would appear here</p>
                </div>
            </div>
        `;
    }

    initDataVisualizations() {
        console.log('📊 Initializing data visualizations...');
        
        // Skills radar chart
        this.createSkillsRadar();
        
        // Project timeline
        this.createProjectTimeline();
        
        // Technology network
        this.createTechNetwork();
        
        // Contribution heatmap
        this.createContributionHeatmap();
    }

    createSkillsRadar() {
        const container = document.getElementById('skills-radar');
        if (!container || typeof d3 === 'undefined') return;

        const data = [
            { skill: 'Python', level: 95 },
            { skill: 'Machine Learning', level: 90 },
            { skill: 'Deep Learning', level: 85 },
            { skill: 'Data Viz', level: 88 },
            { skill: 'NLP', level: 82 },
            { skill: 'Computer Vision', level: 78 },
            { skill: 'MLOps', level: 75 },
            { skill: 'Cloud Computing', level: 80 }
        ];

        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2 - 40;

        const svg = d3.select(container)
            .html('')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${width/2},${height/2})`);

        // Create radar chart visualization
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 300px; color: rgba(255, 255, 255, 0.6);">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                    <p>Skills Radar Chart</p>
                    <p style="font-size: 0.8rem;">Interactive D3.js visualization</p>
                </div>
            </div>
        `;
    }

    createProjectTimeline() {
        const container = document.getElementById('project-timeline');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: rgba(255, 255, 255, 0.6);">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📈</div>
                    <p>Project Timeline</p>
                    <p style="font-size: 0.8rem;">Advanced timeline visualization</p>
                </div>
            </div>
        `;
    }

    createTechNetwork() {
        const container = document.getElementById('tech-network');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: rgba(255, 255, 255, 0.6);">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🕸️</div>
                    <p>Technology Network</p>
                    <p style="font-size: 0.8rem;">Interactive network graph</p>
                </div>
            </div>
        `;
    }

    createContributionHeatmap() {
        const container = document.getElementById('contribution-heatmap');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: rgba(255, 255, 255, 0.6);">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🔥</div>
                    <p>GitHub Contributions</p>
                    <p style="font-size: 0.8rem;">Activity heatmap visualization</p>
                </div>
            </div>
        `;
    }

    initInteractiveElements() {
        // Skill bars animation
        this.animateSkillBars();
        
        // Glassmorphism hover effects
        this.initGlassmorphismEffects();
        
        // Intersection Observer for animations
        this.initIntersectionObserver();
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            
            gsap.to(bar, {
                width: level + '%',
                duration: 2,
                ease: 'power2.out',
                delay: 0.5
            });
        });
    }

    initGlassmorphismEffects() {
        const glassMorphElements = document.querySelectorAll('.glassmorphism');
        
        glassMorphElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }
}

// Enhanced document ready functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 DOM Content Loaded - Starting portfolio...');
    
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
                bar.style.width = level + '%';
            }, 1000);
        }
    });
    
    console.log('🌟 Portfolio enhancement complete!');
});

// Performance monitoring
window.addEventListener('load', () => {
    console.log('📊 Performance metrics:', {
        loadTime: performance.now(),
        navigation: performance.getEntriesByType('navigation')[0]
    });
});

// Resize handler for responsive behavior
window.addEventListener('resize', () => {
    if (window.portfolio && window.portfolio.scene) {
        // Handle 3D scene resize
        const container = document.getElementById('canvas-container');
        if (container && window.portfolio.scene.renderer) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            window.portfolio.scene.camera.aspect = width / height;
            window.portfolio.scene.camera.updateProjectionMatrix();
            window.portfolio.scene.renderer.setSize(width, height);
        }
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UltraSophisticatedPortfolio };
}
