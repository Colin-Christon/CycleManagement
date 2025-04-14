import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardSummary } from '../../../services/dashboard/dashboard.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [AdminHeadingsComponent,CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  cycles = [
    {
      name: 'Hero',
      model: 'Hero123',
      brand: 'Honda',
      price: 1200,
      sales: 400,
      image: 'assets/cycle1.png'
    },
    {
      name: 'Hero',
      model: 'Hero123',
      brand: 'Honda',
      price: 1200,
      sales: 400,
      image: 'assets/cycle1.png'
    },
    // Add more cycles here
  ];

  customerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [10, 25, 18, 30, 20,10, 25, 18, 30, 20]
  };

  salesRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jan', 'Feb', 'Mar', 'Apr', 'May'],
    sales: [1000, 2000, 1500, 2500, 2300,1000, 2000, 1500, 2500, 2300],
    revenue: [800, 1800, 1200, 2000, 2100,1000, 2000, 1500, 2500, 2300]
  };

  summary: any;
  today: any;
  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
     this.dashboardService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
        console.log(this.summary);
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.today = new Date();
  }

  ngAfterViewInit(): void {
    this.createBarChart();
    this.createLineChart();
  }

  createBarChart() {
    new Chart("customerBarChart", {
      type: 'bar',
      data: {
        labels: this.customerData.labels,
        datasets: [{
          label: 'Customers per Month',
          data: this.customerData.values,
          backgroundColor: '#37DA8B'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart() {
    new Chart("salesLineChart", {
      type: 'line',
      data: {
        labels: this.salesRevenueData.labels,
        datasets: [
          {
            label: 'Sales',
            data: this.salesRevenueData.sales,
            borderColor: '#2ecc71',
            fill: false
          },
          {
            label: 'Revenue',
            data: this.salesRevenueData.revenue,
            borderColor: '#e74c3c',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        // tension: 0, // straight lines
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
