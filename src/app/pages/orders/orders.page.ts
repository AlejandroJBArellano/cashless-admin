import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import Item from 'src/app/types/Item';
import Order from 'src/app/types/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[] = []
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      (res: Order[]) => {
        this.orders = res
        this.orders = this.orders.map(order => {
          let total = 0
          for (const {price} of order.items) {
            total += price
          }
          return {
            ...order,
            total
          }
        })
      }
    )
  }
  alertId({name, price, _id}: Item){
    alert(`Detalles del producto:
    Nombre: ${name}
    Precio: $${price}
    ID: ${_id}`)
  }
}
