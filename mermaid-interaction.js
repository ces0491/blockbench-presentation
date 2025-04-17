mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  fontFamily: 'Arial, sans-serif',
  fontSize: 18,
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis'
  },
  securityLevel: 'loose'
});

// Add zoom and pan functionality to mermaid diagrams
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    const svgs = document.querySelectorAll('.mermaid svg');
    svgs.forEach(svg => {
      // Add viewBox attribute if not present
      if (!svg.getAttribute('viewBox')) {
        const bbox = svg.getBBox();
        svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      }
      
      // Make text elements larger
      svg.querySelectorAll('text').forEach(text => {
        text.setAttribute('font-size', '20px');
        text.style.fontWeight = 'bold';
      });
      
      // Set all rectangle fills to be slightly more opaque
      svg.querySelectorAll('rect').forEach(rect => {
        const currentFill = rect.getAttribute('fill');
        if (currentFill && currentFill !== 'none') {
          rect.setAttribute('fill-opacity', '0.9');
        }
      });
      
      // Zoom and pan variables
      let isPanning = false;
      let startPoint = { x: 0, y: 0 };
      let endPoint = { x: 0, y: 0 };
      let scale = 1.0;
      
      // Wheel event for zooming
      svg.addEventListener('wheel', function(event) {
        event.preventDefault();
        const delta = event.deltaY;
        
        // Adjust scale factor
        if (delta > 0) {
          scale *= 0.9;
        } else {
          scale *= 1.1;
        }
        
        // Limit scale range
        scale = Math.min(Math.max(0.5, scale), 5);
        
        // Apply transform
        svg.style.transform = `scale(${scale})`;
      });
      
      // Mouse events for panning
      svg.addEventListener('mousedown', function(event) {
        isPanning = true;
        startPoint = { x: event.clientX, y: event.clientY };
      });
      
      svg.addEventListener('mousemove', function(event) {
        if (isPanning) {
          endPoint = { x: event.clientX, y: event.clientY };
          const dx = endPoint.x - startPoint.x;
          const dy = endPoint.y - startPoint.y;
          
          // Update viewBox
          const viewBox = svg.getAttribute('viewBox').split(' ');
          const vbX = parseFloat(viewBox[0]) - dx/scale;
          const vbY = parseFloat(viewBox[1]) - dy/scale;
          
          svg.setAttribute('viewBox', `${vbX} ${vbY} ${viewBox[2]} ${viewBox[3]}`);
          
          startPoint = endPoint;
        }
      });
      
      svg.addEventListener('mouseup', function() {
        isPanning = false;
      });
      
      svg.addEventListener('mouseleave', function() {
        isPanning = false;
      });
    });
  }, 1000); // Delay to ensure diagrams are rendered
});