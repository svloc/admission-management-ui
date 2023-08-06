import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  basicData: any;

  basicOptions: any;
  ngOnInit() {
    this.primengConfig.ripple = true;

    // Assuming you have an array of course data
    const courseData = [
      {
        courseName: 'Cybersecurity',
        fees: 3500,
        duration: 9,
        rating: 5
      },
      {
        courseName: 'Artificial Intelligence',
        fees: 4000,
        duration: 120,
        rating: 5
      },
      {
        courseName: 'Project Management',
        fees: 3000,
        duration: 90,
        rating: 4.3
      },
      {
        courseName: 'Cybersecurity',
        fees: 3500,
        duration: 9,
        rating: 5
      },
      {
        courseName: 'Artificial Intelligence',
        fees: 4000,
        duration: 120,
        rating: 5
      },
      {
        courseName: 'Project Management',
        fees: 3000,
        duration: 90,
        rating: 4.3
      },
      {
        courseName: 'Cybersecurity',
        fees: 3500,
        duration: 9,
        rating: 5
      },
      {
        courseName: 'Artificial Intelligence',
        fees: 4000,
        duration: 120,
        rating: 5
      },
      {
        courseName: 'Project Management',
        fees: 3000,
        duration: 90,
        rating: 4.3
      },
      {
        courseName: 'Cybersecurity',
        fees: 3500,
        duration: 9,
        rating: 5
      },
      {
        courseName: 'Artificial Intelligence',
        fees: 4000,
        duration: 120,
        rating: 5
      },
      {
        courseName: 'Project Management',
        fees: 3000,
        duration: 90,
        rating: 4.3
      }
      
      // Add more courses as needed
    ];

    this.basicData = {
      labels: courseData.map(course => course.courseName),
      datasets: [
        {
          label: 'Fees',
          borderColor: '#42A5F5',
          fill: false,
          data: courseData.map(course => course.fees)
        },
        {
          label: 'Duration',
          borderColor: '#FFA726',
          fill: false,
          data: courseData.map(course => course.duration)
        },
        {
          label: 'Rating',
          borderColor: '#66BB6A',
          fill: false,
          data: courseData.map(course => course.rating)
        }
      ]

    };

    this.basicOptions = {
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true,
          type: 'logarithmic' // Use logarithmic scale for y-axis
        }
      }
    };
  }


  // applyDarkTheme() {
  //   this.basicOptions = {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: '#ebedef'
  //         }
  //       }
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: '#ebedef'
  //         },
  //         grid: {
  //           color: 'rgba(255,255,255,0.2)'
  //         }
  //       },
  //       y: {
  //         ticks: {
  //           color: '#ebedef'
  //         },
  //         grid: {
  //           color: 'rgba(255,255,255,0.2)'
  //         }
  //       }
  //     }
  //   };
  // }

  products = [
    {
      image: "learning.svg",
      title: "Embarking on a Journey of Knowledge",
      description: "Unleash your potential through the joy of learning. Every step you take brings you closer to a world of new discoveries."
    },
    {
      image: "online_learning.svg",
      title: "Empowerment Beyond Boundaries",
      description: "Seamlessly connect to a universe of education from anywhere, anytime. Embrace the convenience and flexibility of online learning."
    },
    {
      image: "road.svg",
      title: "Charting Your Path to Enlightenment",
      description: "Every road you traverse leads to a realm of understanding. Embrace the twists and turns as you navigate the captivating journey to knowledge."
    },
    {
      image: "success_factors.svg",
      title: "Unlocking the Equation to Success",
      description: "Success is a symphony of dedication, perseverance, and learning. With knowledge as your guide, you hold the key to achieving remarkable accomplishments."
    },
    {
      image: "teaching.svg",
      title: "Nurturing Minds, Igniting Futures",
      description: "In the art of teaching, lives are transformed. Empower others with the gift of knowledge, and witness the bloom of boundless possibilities."
    },
    {
      image: "visionary_technology.svg",
      title: "Pioneering with Visionary Technology",
      description: "Forge ahead into the future with technology as your compass. Embrace innovation, and explore the endless horizons of learning and growth."
    },


  ];

  responsiveOptions;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private primengConfig: PrimeNGConfig) {
    this.isDashboardRoute();
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    Swal.fire('Logout Success', 'success');
    this.router.navigate(['/']);
  }

  isDashboardRoute(): boolean {
    return this.activeRoute.snapshot.data.isDashboard === true;
  }


}

