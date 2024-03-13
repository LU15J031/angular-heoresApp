import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interface/heroe.interface';
import { switchMap } from "rxjs/operators";
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `img{
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  
  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute,  //Leer la informacion del url
               private heroeService: HeroesService,     //llamar servicios
               private router: Router ) { }             // paara regfresar

  ngOnInit(): void {

    this.activatedRoute.params
        .pipe(
          switchMap(  ({id}) => this.heroeService.getHeroePorId( id)  )
        )
        .subscribe( heroe => this.heroe = heroe )
                    
  }

  regresar() {
    this.router.navigate(['/heroes/listado']) ;
    }

}
