import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {


  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
     this.heroeService.getSugerencias( this.termino.trim()).   // trim elimina los espacios en blanco
     subscribe( heroes => this.heroes = heroes )
    }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
      
      if(!event.option.value){                                // para validar cuando no hay valor
        console.log('no hay valor');  
        this.heroeSeleccionado = undefined;
        return;
      }

      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;

      this.heroeService.getHeroePorId(heroe.id!)
          .subscribe(heroe => this.heroeSeleccionado = heroe )
    }
}
