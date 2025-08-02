

 function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('show');
  }

        // Three.js Background Animation
        let scene, camera, renderer, particles;

        function initThreeJS() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('three-bg').appendChild(renderer.domElement);

            // Create particles
            const geometry = new THREE.BufferGeometry();
            const particleCount = 200;
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 2000;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                color: 0x00ff88,
                size: 2,
                transparent: true,
                opacity: 0.6
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            camera.position.z = 1000;

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            
            particles.rotation.x += 0.001;
            particles.rotation.y += 0.002;
            
            renderer.render(scene, camera);
        }


        document.querySelectorAll('.stars').forEach(starGroup => {
    const stars = starGroup.querySelectorAll('i');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        // Yulduzcha klasslarini yangilash
        stars.forEach((s, i) => {
          if (i <= index) {
            s.classList.remove('bi-star');
            s.classList.add('bi-star-fill');
            s.style.color = '#ffc107'; // oltin rang
          } else {
            s.classList.remove('bi-star-fill');
            s.classList.add('bi-star');
            s.style.color = ''; // default rang
          }
        });

        // Saqlash yoki keyinchalik backendga yuborish uchun qiymatni olish
        const category = starGroup.getAttribute('data-category');
        const rating = index + 1;
        console.log(`Kategoriya: ${category}, Reyting: ${rating}`);

        // Istasangiz: localStorage'ga saqlash
        localStorage.setItem(`rating-${category}`, rating);
      });
    });
  });

  function submitRating() {
    const ratings = {};
    document.querySelectorAll('.stars').forEach(group => {
      const category = group.getAttribute('data-category');
      const filledStars = group.querySelectorAll('.bi-star-fill').length;
      ratings[category] = filledStars;
    });

    console.log("Yuborilgan reytinglar:", ratings);
    alert("Bahoyingiz uchun rahmat!");

    // TODO: Agar kerak bo‘lsa, bu yerda AJAX/Fetch orqali backendga yuborish mumkin
  }


 function submitReport() {
    // Yuborish tugmasi bosilganda animatsiyali tasdiq
    const button = document.querySelector('.btn-primary');
    button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Yuborildi!';
    button.style.background = 'linear-gradient(to right, #00ff88, #00d4ff)';
    setTimeout(() => {
      button.innerHTML = 'Shikoyatni yuborish';
      button.style.background = '';
    }, 3000);
  }


// Chart.js Report Chart
 const ctx = document.getElementById('statsChart').getContext('2d');
  const statsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Chilonzor', 'Yunusobod', 'Sergeli', 'Shayxontohur'],
      datasets: [{
        label: 'Hal qilingan muammolar',
        data: [120, 90, 150, 80],
        backgroundColor: ['#00ff88', '#00d4ff', '#a855f7', '#ff6b35'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        x: {
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
