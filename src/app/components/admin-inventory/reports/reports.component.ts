import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser'
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { Chart } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../services/reports/report.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-reports',
  imports: [AdminHeadingsComponent,FormsModule,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  selectedReport = 'order';
  fromDate = '';
  toDate = '';
  today = new Date();

  pieChart: any;
  lineChart: any;
  orderTableData: any[] = [];
  revenueTableData: any[] = [];
  customerTableData: any[] = [];

  

  constructor(private reportService: ReportService) {}


  setReport(report: string) {
    this.selectedReport = report;
    this.loadReports();
  }

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getOrderReport().subscribe((data: any) => {
 
      const statusLabels = data.statusCounts.map((x: any) => x.status);
      const statusData = data.statusCounts.map((x: any) => x.count);
  
      const monthlyLabels = data.monthlyOrders.map((x: any) => x.month);
      const monthlyData = data.monthlyOrders.map((x: any) => x.orderCount);

      this.orderTableData = data.statusCounts.map((x: any) => ({
        status: x.status,
        count: x.count
      }));  //extra
      if(this.selectedReport === 'order'){
      this.renderPieChart(statusLabels, statusData);
      this.renderLineChart(monthlyLabels, monthlyData, 'Orders');
    }
    });
  

    this.reportService.getRevenueReport().subscribe((data: any) => {

  
      const pieLabels = data.revenuePerCategory.map((x: any) => x.categoryName);
      const pieData = data.revenuePerCategory.map((x: any) => x.totalRevenue);

      this.revenueTableData = data.revenuePerCategory.map((x: any) => ({
        categoryName: x.categoryName,
        totalRevenue: x.totalRevenue
      }));  //extra

      const lineLabels = data.monthlyRevenueTrend.map((x: any) => x.month);
      const lineData = data.monthlyRevenueTrend.map((x: any) => x.revenue);
  
      if (this.selectedReport === 'revenue') {
        this.renderPieChart(pieLabels, pieData);
        this.renderLineChart(lineLabels, lineData, 'Revenue');
      }
    });
  
    this.reportService.getCustomerReport().subscribe((data: any) => {

  
      const pieLabels = ['New Customers', 'Returning Customers'];
      const pieData = [data.pieChart.newCustomers, data.pieChart.returningCustomers];
  
      const lineLabels = data.lineChart.map((x: any) => x.month);
      const lineData = data.lineChart.map((x: any) => x.customerCount);
      
      this.customerTableData = data.lineChart.map((x: any) => ({
        month: x.month,
        customerCount: x.customerCount
      }));  //extra

      if (this.selectedReport === 'customer') {
        console.log("clicked");
        this.renderPieChart(pieLabels, pieData);
        this.renderLineChart(lineLabels, lineData, 'Customers');
      }
    });
  }

  renderPieChart(labels: string[], data: number[]) {
    const pieCtx = document.getElementById('pieChart') as HTMLCanvasElement;
  
    if (this.pieChart) this.pieChart.destroy();
  
    this.pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#23f59a', '#ffa726', '#f44336', '#9c27b0']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  renderLineChart(labels: string[], data: number[], labelName: string) {
    const lineCtx = document.getElementById('lineChart') as HTMLCanvasElement;
  
    if (this.lineChart) this.lineChart.destroy();
  
    this.lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: labelName,
          data: data,
          borderColor: '#23f59a',
          backgroundColor: 'rgba(35, 245, 154, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // generateReport(){
  //   const emailData = {
  //        to: 'recipient@example.com',
  //        subject: 'Hello from MyApp',
  //        text: 'This is a test email.',
  //        host: 'smtp.gmail.com',
  //        authUser: 'user@gmail.com',
  //        authPass: 'your-app-password', // Use an Google app  Password of 2-factor authentication is enabled
  //        fromTitle: 'MyApp Support'
  //      };
  //   this.mail.sendEmail(emailData);
  // }

  // async generateReport() {
  //   const reportElement = document.getElementById('pdf-report');
  //   if (!reportElement) {
  //     console.error("PDF report section not found.");
  //     return;
  //   }

  //   // Make the element renderable
  //   reportElement.style.position = 'absolute';
  //   reportElement.style.left = '-9999px';
  //   reportElement.style.top = '0';
  //   reportElement.style.display = 'block';

  //   const canvas = await html2canvas(reportElement);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF('p', 'mm', 'a4');
  //   const imgWidth = 210;
  //   const pageHeight = 295;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;
  //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //   heightLeft -= pageHeight;

  //   while (heightLeft > 0) {
  //     position = heightLeft - imgHeight;
  //     pdf.addPage();
  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //   }

  //   reportElement.style.display = 'none';
  //   reportElement.style.position = '';
  //   reportElement.style.left = '';
  //   reportElement.style.top = '';

  //   // Convert PDF to Blob and then to File
  //   const blob = pdf.output('blob');
  //   const file = new File([blob], `Monthly-Report-${new Date().toLocaleDateString()}.pdf`, {
  //     type: 'application/pdf',
  //   });


  //   const attachments: File[] = [file];
    
  //   const formData: any = {
  //     from_name: 'Your Name',
  //     from_email: 'your@email.com',
  //     message: 'Monthly report is attached.',
  //     pdf_attachment: attachments
  //   };
  //   emailjs
  //     .send('service_gnfju0p', 'template_cij011g', formData, 'lukFEYq4cqP4L9PZx')
  //     .then(
  //       () => alert('Email with PDF sent successfully!'),
  //       (error) => alert('Email failed: ' + JSON.stringify(error))
  //     );
  //     // window.open(pdf.output('bloburl'), '_blank');
  // }

  generateReport() {
    const reportElement = document.getElementById('pdf-report');
  
    if (!reportElement) {
      console.error("PDF report section not found.");
      return;
    }
  
    // Temporarily make it invisible but renderable
    reportElement.style.position = 'absolute';
    reportElement.style.left = '-9999px';
    reportElement.style.top = '0';
    reportElement.style.display = 'block';
  
    html2canvas(reportElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Hide the section again and reset positioning
      reportElement.style.display = 'none';
      reportElement.style.position = '';
      reportElement.style.left = '';
      reportElement.style.top = '';
  
      // Open the PDF in new tab
      window.open(pdf.output('bloburl'), '_blank');
    });
  }
  

  convertToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove base64 prefix
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

}


