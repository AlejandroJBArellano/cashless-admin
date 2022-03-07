import { Component, OnInit } from '@angular/core';
import { CorteDeCajaService } from 'src/app/services/corte-de-caja.service';
import CorteDeCaja from 'src/app/types/CorteDeCaja';

@Component({
  selector: 'app-corte-de-caja',
  templateUrl: './corte-de-caja.page.html',
  styleUrls: ['./corte-de-caja.page.scss'],
})
export class CorteDeCajaPage implements OnInit {
  public cortes: CorteDeCaja[]
  constructor(private corteService: CorteDeCajaService) { }

  ngOnInit() {
    this.corteService.getCortes().subscribe(
      (res: CorteDeCaja[]) => this.cortes = res
    )
  }
  openCorteModal(corte: CorteDeCaja){
    corte.modalOpen = !corte.modalOpen
    corte.ordenesEfectivo.forEach(e => console.log(e))
  }

}
