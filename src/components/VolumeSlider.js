import "../assets/CSS/VolumeSlider.css";
import p5 from "p5";

import React, { useRef, useEffect, useState } from 'react';


export const VolumeSlider = () => {
  const sketchRef = useRef(null);
  const [p5Instance, setP5Instance] = useState(null);

  useEffect(() => {
    // Sketch configuration
    const Sketch = (p) => {
      let colorBG, colorFG, colorSlider, colorSliderFill;
      let sliderY, sliderX1, sliderX2, sliderLength;
      let knobX, knobSize;
      let volume;
      let dragging, animating;
      let iconFont, iconGlyph, iconSize;
      let force, ease;
      let dest, step, distance, bounce;
      let canvas;

      p.preload = () => {
        iconFont = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/webfonts/fa-solid-900.ttf');
      };

      p.setup = () => {
        canvas = p.createCanvas(350,50);
        p.fill(0);
        
        colorBG = "#121212";
        colorFG = "#fff";
        colorSlider = "rgba(70, 130, 78, 0.3)";
        colorSliderFill = "#bae6c1";

        sliderY = p.height/2;
        sliderX1 = p.width/3;
        sliderX2 = p.width - p.width/3;
        sliderLength = sliderX2 - sliderX1;
        knobX = sliderX1;
        knobSize = 16;
        volume = 0;
        dragging = false;
        animating = false;
        iconGlyph = "\u{F028}";
        iconSize = 20;
        ease = 0.1;
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.background(colorBG);
        drawSlider();
        drawFlag(sliderX2, sliderY);
        drawIcon();
        drawKnob();
        
        if (dragging)
          drawForce();
        if (animating)
          moveKnob();
        
      };

      p.mousePressed = () => {
        let knobTarget = p.dist(p.mouseX, p.mouseY, knobX, sliderY);
        let muteTarget = p.dist(p.mouseX, p.mouseY, sliderX1-iconSize-20, sliderY-3);
        if (animating === false) {
          if (knobTarget < knobSize/2 + 5)
            dragging = true;
          if (muteTarget < iconSize)
            p.setup();
        }
      };

      p.mouseReleased = () => {
        if (dragging === true) {
          console.log("Release");
          animating = true;
        }
        dragging = false;
      };

      function drawForce() {
        let f1 = p.createVector(knobX, sliderY);
        let f2 = p.createVector(p.mouseX, p.mouseY);  
        let max = sliderLength/2;
        let min = p.dist(f1.x, f1.y, f2.x, f2.y) - knobSize/3;
        let factor = 5;
        let f = p.constrain(p.map(p.abs(f1.x - f2.x), 0, max, 0.5, factor), 0, factor);
        let weight = 3;  
        let s = p.constrain(p.map(min, 0, knobSize*2, 0, 1), 0, 1);
        
        force = p.constrain(f * p.round(knobX - p.mouseX), -max*f, max*f);
        dest = knobX + force;  
        step = force * ease;
        
        let r = mapColor(78, 241, knobSize, max);
        let g = mapColor(170, 45, knobSize, max);
        let b = mapColor(255, 45, knobSize, max);
        let c = `rgb(${r},${g},${b})`;
        p.stroke(c);
        p.fill(c);
        
        p.push();
        p.strokeJoin(p.ROUND);
        p.translate(f1.x, f1.y);  
        p.rotate(f2.sub(f1).heading() - 90);  
        p.translate(0, (knobSize/2 + weight));
        p.strokeWeight(weight*s);
        let l = p.abs(p.dist(p.mouseX, p.mouseY, knobX, sliderY)-knobSize/1.5);
        if (l > max)
          l = max;
        p.line(0, knobSize*s, 0, l);
        p.scale(s);
        p.strokeWeight(weight*s);
        p.triangle(0, weight, knobSize/8 + weight, knobSize - weight, -knobSize/8 - weight, knobSize - weight);
        p.pop();
      }

      function moveCheck() {
        distance = dest - knobX;
        step = distance * ease;

        let stepCheck = p.round(step);
        let ahead = knobX + stepCheck;
        
        if (ahead >= sliderX2) {
          knobX = sliderX2;
          bounce = true;
        } else if (ahead <= sliderX1) {
          knobX = sliderX1;
          bounce = true;
        }
        
        if (bounce) {
          force = -distance;
          dest = knobX + force;
          distance = dest - knobX;
          step = distance * ease;
          bounce = false;
        }
        
        animating = true; 
      }

      function moveKnob() {
        if(force !== 0){
          moveCheck();
          knobX += step;
          
          if (around(knobX, dest, p.ceil(p.abs(step)))) {
            knobX = dest;
            animating = false;
          }
        }
        
        getVolume();
      }

      function drawKnob() {
        let shadow = "rgba(0,0,0,0.2)";
        p.noStroke();
        p.fill(shadow);
        p.circle(knobX, sliderY+2, knobSize);
        
        p.fill(255);
        p.circle(knobX, sliderY, knobSize);
      }

      function drawSlider() {  
        p.stroke(colorSlider);
        p.strokeCap(p.ROUND);
        p.strokeWeight(3);
        p.line(sliderX1, sliderY, sliderX2, sliderY);
        
        p.stroke(colorSliderFill);  
        p.line(sliderX1, sliderY, knobX, sliderY);
      }

      function drawIcon() {  
        p.fill(colorFG);
        p.textFont(iconFont, iconSize);
        p.textAlign(p.LEFT, p.CENTER);

        if (volume === 0)
          iconGlyph = "\u{F6A9}";
        else if (volume < 50)
          iconGlyph = "\u{F027}";
        else if (volume >= 50)
          iconGlyph = "\u{F028}";

        p.text(iconGlyph, sliderX1-iconSize-20, sliderY-3);
      }

      function getVolume() {
        let val = p.round(knobX);
        let vol = p.map(p.round(val), sliderX1, sliderX2, 0, 100);
        volume = p.round(vol);
      }

      function writeVolume() {
        let color = colorFG;
        let val = 100 - volume;
        let unit = "yard";
        let message;
        p.fill(color);
        p.noStroke();
        p.textSize(18);
        p.textFont('Helvetica');
        p.textAlign(p.CENTER, p.CENTER);
        
        if (val !== 1) {
          unit += 's';
        }
        message = `${val} ${unit} from the hole`;
        if (val === 0 && animating === false) {    
          p.textSize(22);
          message = "Max Golfume!";
        }
        
        p.text(message, p.width/2, sliderY - 50);
      }

      function drawFlag(x, y) {
        let height = 25;
        let top = y - height;
        let flagH = 10;
        let flagW = 10;
        
        p.noStroke();
        p.fill("#e83838");
        p.triangle(x, top, x + flagW, top + flagH/2, x, top + flagH);  
        
        p.stroke(0);
        p.strokeWeight(2);
        p.fill("#e83838");
        p.line(x, y, x, top);
        
        p.noStroke();
        p.fill("rgba(255, 255, 255, 0.8)");
        p.ellipse(x, y, 15, 7); 
      }

      function around(value, base, buffer) {
        return value > base - buffer && value < base + buffer;
      }

      function mapColor(c1, c2, m1, m2) {
        return p.constrain(p.round(p.map(p.abs(knobX - p.mouseX), m1, m2, c1, c2)), 
          Math.min(c1, c2), 
          Math.max(c1, c2)
        );
      }

      p.touchStarted = () => {
        p.mousePressed();
      };

      p.centerCanvas = () => {
        let x = (p.windowWidth - p.width) / 2;
        let y = (p.windowHeight - p.height) / 2;
        canvas.position(x, y);
      };
    };


    // Create p5 instance
    const p5Sketch = new p5(Sketch, sketchRef.current);
    setP5Instance(p5Sketch);

    // Cleanup function
    return () => {
      p5Sketch.remove();
    };
  }, []);

  return (
    <div 
      ref={sketchRef} 
      className="volumeSliderContainer"
    />
  );
};