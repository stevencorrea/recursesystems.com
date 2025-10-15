const canvas = document.getElementById('recursionCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation variables
let time = 0;
const colors = [
    'rgba(255, 255, 255, 0.8)',
    'rgba(255, 255, 255, 0.6)',
    'rgba(255, 255, 255, 0.4)',
    'rgba(255, 255, 255, 0.2)'
];

// Recursive circle drawing function
function drawRecursiveCircles(x, y, radius, depth, maxDepth, rotation, direction) {
    if (depth > maxDepth || radius < 1) {
        return;
    }
    
    // Draw the current circle
    ctx.strokeStyle = colors[depth % colors.length];
    ctx.lineWidth = Math.max(1, 3 - depth * 0.3);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Recursive case: draw smaller circles around the current circle
    const numCircles = 6;
    const newRadius = radius * 0.4;
    const angleStep = (Math.PI * 2) / numCircles;
    
    for (let i = 0; i < numCircles; i++) {
        const angle = rotation + angleStep * i;
        const newX = x + Math.cos(angle) * (radius - newRadius);
        const newY = y + Math.sin(angle) * (radius - newRadius);
        
        // Reverse direction for inner circles
        drawRecursiveCircles(newX, newY, newRadius, depth + 1, maxDepth, rotation - direction * time * 0.3, -direction);
    }
}

// Recursive fractal tree
function drawFractalTree(x, y, length, angle, depth, maxDepth) {
    if (depth > maxDepth || length < 2) {
        return;
    }
    
    const endX = x + length * Math.cos(angle);
    const endY = y + length * Math.sin(angle);
    
    ctx.strokeStyle = colors[depth % colors.length];
    ctx.lineWidth = Math.max(1, maxDepth - depth + 1);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Recursive branches
    const branchAngle = Math.PI / 6 + Math.sin(time * 0.5) * 0.1;
    const lengthMultiplier = 0.7;
    
    drawFractalTree(endX, endY, length * lengthMultiplier, angle - branchAngle, depth + 1, maxDepth);
    drawFractalTree(endX, endY, length * lengthMultiplier, angle + branchAngle, depth + 1, maxDepth);
}

// Sierpinski Triangle
function drawSierpinskiTriangle(x1, y1, x2, y2, x3, y3, depth, maxDepth) {
    if (depth > maxDepth) {
        return;
    }
    
    // Draw the triangle
    ctx.strokeStyle = colors[depth % colors.length];
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
    
    // Calculate midpoints
    const mid1x = (x1 + x2) / 2;
    const mid1y = (y1 + y2) / 2;
    const mid2x = (x2 + x3) / 2;
    const mid2y = (y2 + y3) / 2;
    const mid3x = (x3 + x1) / 2;
    const mid3y = (y3 + y1) / 2;
    
    // Recursive calls for three smaller triangles
    drawSierpinskiTriangle(x1, y1, mid1x, mid1y, mid3x, mid3y, depth + 1, maxDepth);
    drawSierpinskiTriangle(mid1x, mid1y, x2, y2, mid2x, mid2y, depth + 1, maxDepth);
    drawSierpinskiTriangle(mid3x, mid3y, mid2x, mid2y, x3, y3, depth + 1, maxDepth);
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    time += 0.005;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw main recursive circles
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.25;
    drawRecursiveCircles(centerX, centerY, baseRadius, 0, 4, time, 1);
    
    // Add floating recursive patterns
    const numFloating = 3;
    for (let i = 0; i < numFloating; i++) {
        const offsetX = Math.sin(time + i * Math.PI * 2 / numFloating) * canvas.width * 0.3;
        const offsetY = Math.cos(time * 0.7 + i * Math.PI * 2 / numFloating) * canvas.height * 0.3;
        const floatingRadius = baseRadius * 0.3;
        
        ctx.save();
        ctx.globalAlpha = 0.3;
        drawRecursiveCircles(
            centerX + offsetX,
            centerY + offsetY,
            floatingRadius,
            0,
            3,
            -time + i,
            1
        );
        ctx.restore();
    }
    
    requestAnimationFrame(animate);
}

// Start the animation
animate();

