import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { images } from '../assets/images.js';
import Footer from '../components/Footer';
import AnimatedElement from '../components/AnimatedElement';
import StaggeredAnimation from '../components/StaggeredAnimation';

const HomePage = () => {
  const canvasRef = useRef(null);
  const heroLogoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle hash navigation on page load
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  // Interactive Hero Logo Effect
  useEffect(() => {
    const logo = heroLogoRef.current;
    if (!logo) return;

    let isDirectlyHovering = false;
    
    const handleGlobalMouseMove = (e) => {
      const rect = logo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate relative position from logo center (always active)
      const deltaX = (mouseX - centerX) / window.innerWidth;
      const deltaY = (mouseY - centerY) / window.innerHeight;
      
      // Always apply tilt based on mouse position, stronger when hovering
      const baseTiltMultiplier = 15; // Always active tilt
      const hoverBonus = isDirectlyHovering ? 10 : 0; // Extra tilt when hovering
      const tiltX = deltaY * (baseTiltMultiplier + hoverBonus);
      const tiltY = deltaX * -(baseTiltMultiplier + hoverBonus);
      
      // Scale and translate based on hover state
      const scale = isDirectlyHovering ? 1.08 : 1.02;
      const translateZ = isDirectlyHovering ? 25 : 8;
      const translateY = isDirectlyHovering ? -8 : -2;
      
      logo.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale}) translateZ(${translateZ}px) translateY(${translateY}px)`;
    };
    
    const handleMouseEnter = () => {
      isDirectlyHovering = true;
      logo.style.transition = 'transform 0.15s ease-out';
    };
    
    const handleMouseLeave = () => {
      isDirectlyHovering = false;
      logo.style.transition = 'transform 0.3s ease-out';
    };
    
    // Listen to global mouse movement
    document.addEventListener('mousemove', handleGlobalMouseMove);
    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // EXACT WebGL Ocean Waves implementation from vanilla version
    const mouse = {
      x: undefined, y: undefined, isDown: false
    };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseDown = () => { mouse.isDown = true; };
    const handleMouseUp = () => { mouse.isDown = false; };
    
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
      }
    };
    const handleTouchStart = (e) => {
      mouse.isDown = true;
      if (e.touches && e.touches.length > 0) {
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => { 
      mouse.isDown = false; 
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true }); 
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    const webglCanvas = canvasRef.current;
    let gl;

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse_pixels;
      uniform float u_mouse_down;

      varying vec2 v_uv;
      
      vec3 COL_DEEP_BLUE      = vec3(10./255., 16./255., 26./255.);
      vec3 COL_PRIMARY_BLUE   = vec3(13./255., 47./255., 95./255.);
      vec3 COL_HIGHLIGHT_BLUE = vec3(26./255., 115./255., 232./255.);
      vec3 COL_FOAM           = vec3(206./255., 212./255., 218./255.);

      #define PI 3.14159265359
      #define NUM_WAVES 5

      struct Wave {
          vec2 direction;
          float amplitude;
          float wavelength;
          float speed;
          float steepness;
      };

      const vec2 WAVE_DIR_0 = normalize(vec2(0.75, 0.65));
      const vec2 WAVE_DIR_1 = normalize(vec2(0.85, 0.55));
      const vec2 WAVE_DIR_2 = normalize(vec2(0.60, 0.80));
      const vec2 WAVE_DIR_3 = normalize(vec2(0.55, 0.85));
      const vec2 WAVE_DIR_4 = normalize(vec2(0.90, 0.40));
      
      vec3 getWaveHeightAndDerivatives(vec2 p, float time, Wave wave_params) {
          float k = 2.0 * PI / wave_params.wavelength;
          float omega = wave_params.speed * k;
          float D_dot_P = dot(wave_params.direction, p);
          float phase_argument = k * D_dot_P - omega * time;
          float sin_val = sin(phase_argument);
          float cos_val = cos(phase_argument);
          float H_base = wave_params.amplitude * sin_val;
          float dH_dx_base = wave_params.amplitude * cos_val * k * wave_params.direction.x;
          float dH_dy_base = wave_params.amplitude * cos_val * k * wave_params.direction.y;
          float h_contrib_steep = 0.0;
          float dH_dx_contrib_steep = 0.0;
          float dH_dy_contrib_steep = 0.0;
          if (wave_params.steepness > 0.0) {
              float term_val = sin_val * 0.5 + 0.5;
              h_contrib_steep = wave_params.amplitude * wave_params.steepness * (term_val * term_val - 0.25);
              float common_steep_deriv_factor = wave_params.amplitude * wave_params.steepness * term_val * cos_val * k;
              dH_dx_contrib_steep = common_steep_deriv_factor * wave_params.direction.x;
              dH_dy_contrib_steep = common_steep_deriv_factor * wave_params.direction.y;
          }
          return vec3(H_base + h_contrib_steep, dH_dx_base + dH_dx_contrib_steep, dH_dy_base + dH_dy_contrib_steep);
      }

      void main() {
          vec2 uv_screen = v_uv;
          vec2 uv_world = v_uv;

          float aspect = u_resolution.x / u_resolution.y;
          uv_world = (uv_world - 0.5) * 2.5; 
          if (aspect > 1.0) { uv_world.x *= aspect; } 
          else { uv_world.y /= aspect; }

          vec2 mouse_uv_normalized = u_mouse_pixels / u_resolution;
          mouse_uv_normalized.y = 1.0 - mouse_uv_normalized.y;
          vec2 mouse_world_coords = (mouse_uv_normalized - 0.5) * 2.5;
          if (aspect > 1.0) { mouse_world_coords.x *= aspect; } 
          else { mouse_world_coords.y /= aspect; }

          float dist_to_mouse_world = distance(uv_world, mouse_world_coords);
          
          float base_mouse_influence_radius = 0.55;
          float dynamic_radius_bonus = u_mouse_down * 0.15; 
          float current_mouse_influence_radius = base_mouse_influence_radius + dynamic_radius_bonus;
          float mouse_interaction_falloff = smoothstep(current_mouse_influence_radius, 0.05, dist_to_mouse_world);

          vec2 world_coord_sampler = uv_world;

          if (u_mouse_down > 0.5) { 
              if (dist_to_mouse_world < current_mouse_influence_radius && dist_to_mouse_world > 0.001) {
                  vec2 push_direction = normalize(uv_world - mouse_world_coords);
                  float push_magnitude_base = 0.30; 
                  float push_effect = push_magnitude_base * mouse_interaction_falloff * sqrt(max(0.0, mouse_interaction_falloff)); 
                  push_effect *= (1.0 + 0.4 * sin(dist_to_mouse_world * 7.0 - u_time * 2.5));
                  world_coord_sampler += push_direction * push_effect;
              }
          }
          
          float total_height = 0.0;
          float total_dHdx = 0.0;
          float total_dHdy = 0.0;

          Wave waves[NUM_WAVES];
          waves[0] = Wave(WAVE_DIR_0, 0.045, 2.8, 0.18, 0.28); 
          waves[1] = Wave(WAVE_DIR_1, 0.035, 2.0, 0.22, 0.22);
          waves[2] = Wave(WAVE_DIR_2, 0.025, 1.4, 0.28, 0.35); 
          waves[3] = Wave(WAVE_DIR_3, 0.020, 1.0, 0.32, 0.18); 
          waves[4] = Wave(WAVE_DIR_4, 0.015, 0.7, 0.35, 0.15);

          for (int i = 0; i < NUM_WAVES; i++) {
              vec3 wave_contrib = getWaveHeightAndDerivatives(world_coord_sampler, u_time, waves[i]);
              total_height += wave_contrib.x;
              total_dHdx   += wave_contrib.y;
              total_dHdy   += wave_contrib.z;
          }

          if (u_mouse_down > 0.5) { 
              float mouse_swell_amplitude_base = 0.075; 
              float current_mouse_swell_effect = mouse_swell_amplitude_base * mouse_interaction_falloff;
              
              float norm_dist_rad = clamp(dist_to_mouse_world / current_mouse_influence_radius, 0.0, 1.0);
              current_mouse_swell_effect *= (1.0 - norm_dist_rad * sqrt(norm_dist_rad)); 
              current_mouse_swell_effect *= (1.0 + 0.6 * sin(dist_to_mouse_world * 9.0 - u_time * 3.0)); 
              total_height += current_mouse_swell_effect;
          }

          vec3 normal = normalize(vec3(-total_dHdx * 0.12, -total_dHdy * 0.12, 1.0));
          
          vec3 light_dir = normalize(vec3(0.5, 0.8, 0.6));
          float diffuse = max(0.0, dot(normal, light_dir));

          float h_norm = (total_height / 0.15 + 1.0) * 0.5;
          h_norm = clamp(h_norm, 0.0, 1.0);

          vec3 color = mix(COL_DEEP_BLUE, COL_PRIMARY_BLUE, h_norm * h_norm * 0.75 + 0.25);
          color *= (0.55 + 0.45 * diffuse);

          vec3 view_dir = vec3(0.0, 0.0, 1.0);
          vec3 reflect_dir = reflect(-light_dir, normal);
          float specular_strength = pow(max(0.0, dot(view_dir, reflect_dir)), 32.0); 
          color += COL_HIGHLIGHT_BLUE * specular_strength * 0.6;

          float foam_threshold = 0.68; 
          float foam_factor = smoothstep(foam_threshold, foam_threshold + 0.12, h_norm);
          foam_factor *= smoothstep(0.35, 0.65, diffuse);
          color = mix(color, COL_FOAM, foam_factor * 0.75);

          if (u_mouse_down > 0.5) { 
              float mouse_glow_strength_base = 0.40; 
              float mouse_glow_falloff_screen = smoothstep(0.25, 0.0, distance(uv_screen, mouse_uv_normalized));
              float current_mouse_glow = mouse_glow_falloff_screen * mouse_glow_falloff_screen * (0.4 + 0.6 * sin(u_time * 2.5 + distance(uv_screen, mouse_uv_normalized) * 12.0)); 
              color += COL_HIGHLIGHT_BLUE * current_mouse_glow * mouse_glow_strength_base * 0.45;
          }

          float vignette_strength = 1.15;
          float vignette_val = length(uv_screen - 0.5) * vignette_strength;
          float vignette = 1.0 - (vignette_val * vignette_val); 
          color *= smoothstep(0.0, 1.0, vignette);

          color = clamp(color, vec3(0.0), vec3(1.0));
          gl_FragColor = vec4(color, 1.0);
      }
    `;
    
    function initWebGLWaves() {
      if (!webglCanvas || !webglCanvas.parentElement) return false;
      gl = webglCanvas.getContext('webgl', { antialias: false }) || webglCanvas.getContext('experimental-webgl', { antialias: false });
      if (!gl) { console.error('WebGL not supported.'); return false; }
      
      const heroElement = webglCanvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      webglCanvas.width = heroElement.offsetWidth * dpr;
      webglCanvas.height = heroElement.offsetHeight * dpr;
      gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
      
      const program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
      if (!program) return false;
      gl.useProgram(program);
      
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
      
      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      webglCanvas.uniforms = {
        time: gl.getUniformLocation(program, 'u_time'),
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        mousePixels: gl.getUniformLocation(program, 'u_mouse_pixels'),
        mouseDown: gl.getUniformLocation(program, 'u_mouse_down')
      };
      
      return true;
    }
    
    function createShaderProgram(gl, vsSource, fsSource) {
      const vs = compileShader(gl, vsSource, gl.VERTEX_SHADER);
      const fs = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error('Shader program link error: ' + gl.getProgramInfoLog(p));
        gl.deleteProgram(p); gl.deleteShader(vs); gl.deleteShader(fs); return null;
      }
      return p;
    }

    function compileShader(gl, source, type) {
      const s = gl.createShader(type);
      gl.shaderSource(s, source); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(`Shader compile error (${type === gl.VERTEX_SHADER ? "VS" : "FS"}): ${gl.getShaderInfoLog(s)}`);
        gl.deleteShader(s); return null;
      }
      return s;
    }
    
    function renderWebGLWaves(timestamp) {
      if (!gl || !webglCanvas.uniforms) return;
      
      const time = timestamp * 0.00055;

      gl.uniform1f(webglCanvas.uniforms.time, time);
      gl.uniform2f(webglCanvas.uniforms.resolution, webglCanvas.width, webglCanvas.height);
      
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const mouseX = mouse.x !== undefined ? mouse.x * dpr : webglCanvas.width / 2;
      const mouseY = mouse.y !== undefined ? mouse.y * dpr : webglCanvas.height / 2;
      gl.uniform2f(webglCanvas.uniforms.mousePixels, mouseX, mouseY);
      gl.uniform1f(webglCanvas.uniforms.mouseDown, mouse.isDown ? 1.0 : 0.0);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    
    const handleResize = () => {
      if (!webglCanvas || !webglCanvas.parentElement) return;
      const heroElementResize = webglCanvas.parentElement;
      const dpr_resize = Math.min(window.devicePixelRatio, 1.5);
      webglCanvas.width = heroElementResize.offsetWidth * dpr_resize;
      webglCanvas.height = heroElementResize.offsetHeight * dpr_resize;
      gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
    };

    window.addEventListener('resize', handleResize);
    
    let animationFrameId = null;
    function animate(timestamp) {
      renderWebGLWaves(timestamp);
      animationFrameId = requestAnimationFrame(animate);
    }
    
    if (initWebGLWaves()) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
       document.body.style.backgroundColor = 'var(--apex-blue-deep)';
    }

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);


  return (
    <>
      {/* Hero Section */}
      <header id="top" className="hero">
        <canvas ref={canvasRef} id="ocean-waves-canvas"></canvas>
        <div className="hero-photo-overlay"></div>
        <div className="hero-watermark"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <AnimatedElement animation="fadeInUp" duration={0.8}>
              <div className="hero-logo-container">
                <img 
                  ref={heroLogoRef}
                  src={images.logoTransparentCapitalAdvisors} 
                  alt="TransWestern Capital Advisors Logo" 
                  className="hero-interactive-logo"
                />
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeInUp" delay={0.2} duration={0.8}>
              <h1>
                Institutional Fixed Income Portfolios—Engineered to Last. 
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="fadeInUp" delay={0.3} duration={0.8}>
              <p className="hero-subtitle large-copy-target">
                We provide our financial institution clients with world-class fixed income solutions and advanced risk management, tailored to address the specific needs and goals of each. TransWestern was formed in 2005, built upon decades of capital markets and banking experience. Today we harness future-forward technology, and serve with an unwavering commitment to client partnership. This is financial evolution.
              </p>
            </AnimatedElement>
            
          </div>
        </div>
      </header>

      {/* Mission Section */}
      <section className="mission-bg">
        <div className="mission-content-wrapper">
          <AnimatedElement animation="fadeInBlur" duration={1}>
            <div className="mission-content">
              <p>
                BRIDGE represents the way for you to take your Financial Institution’s balance sheet where you want to go. Markets have a way of moving in unexpected ways, at unforeseen times—throwing balance sheet planning off course. The painful rate selloff that began in 2022 is just the most recent example, but there have been many more in the modern era, and from here, the only certainty is uncertainty itself. The consequences that run through the investment and liquidity portfolios can set Financial Institutions and their stakeholders back several years if not positioned properly.
              </p>
              <p>
                BRIDGE connects community institutions to the best resources that modern fixed income and liquidity management have to offer. BRIDGE lets you cross over the roiling waters and choppy seas that are filled with intermediaries whose interests too often compete with yours—to leave your balance sheet in the best possible position, given the direction set by you, the client. BRIDGE offers the CFO unrivalled operational leverage, as they get support from the leading asset management resources that this country has to offer, to benefit from enhanced performance and controlled risk like never before.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container contact-container">
          <div className="contact-content">
            <AnimatedElement animation="fadeInLeftSmall" duration={0.9}>
              <div className="contact-left">
                <h3 className="section-title-left">Inquire directly to schedule a discussion.</h3>
                <p className="section-subtitle section-subtitle-left contact-cta-text">
                </p>
                <address>
                  <p><strong>TransWestern Capital Advisors, LLC</strong></p>
                  <p>An SEC-registered investment advisor</p>
                  <p>
                    <i className="fas fa-map-marker-alt icon-left"></i> Newport, Rhode Island
                  </p>
                  <p>
                    <i className="fas fa-phone icon-left"></i>
                    <a href="tel:+18009970718" aria-label="Call TransWestern Capital Advisors, LLC at (800) 997-0718">(800) 997-0718</a>
                  </p>
                  <p>
                    <i className="fas fa-envelope icon-left"></i>
                    <a href="mailto:admin@TransWestCap.com" aria-label="Email TransWestern Capital Advisors, LLC at admin@TransWestCap.com">admin@TransWestCap.com</a>
                  </p>
                </address>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeInRightSmall" delay={0.2} duration={0.9}>
              <div className="contact-right">
                <img 
                  src={images.arielNewport} 
                  alt="Ariel - TransWestern Capital Advisors" 
                  className="ariel-newport-img"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;