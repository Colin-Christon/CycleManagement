import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-receipt',
  imports: [CommonModule],
  templateUrl: './order-receipt.component.html',
  styleUrl: './order-receipt.component.scss'
})
export class OrderReceiptComponent {
  @Input() orderData: any;
  @Output() closeReceipt = new EventEmitter<void>();

  constructor(private location:Location){}
  get totalAmount(): number {
    return this.orderData?.items?.reduce((sum: number, item: any) => sum + item.total, 0) || 0;
  }
  close(){
   this.closeReceipt.emit();
  }
}
