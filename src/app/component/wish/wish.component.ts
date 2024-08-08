


import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../service/favorites.service';
import { NgClass, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProductItem } from './../../interface/product';
import { ProductService } from '../../service/product.service';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor,NgClass,CommonModule],
  templateUrl: '../wish/wish.component.html',
  styleUrls: ['../wish/wish.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteProducts: any[] = [];
  productitem:ProductItem[]=[];

  constructor(private favoritesService: FavoritesService,private _productItem:ProductService) {
  
_productItem.getProduct().subscribe(
  (da)=>{
  //  console.log(da);
   
   this.productitem=da
  
  })

}
  



  ngOnInit() {
    this._productItem.getProduct().subscribe(products => {
      const favoriteIds = this.favoritesService.getFavorites();
      this.favoriteProducts = products.filter(product => favoriteIds.includes(product.id));
    });
  }

  removeFavorite(productId: number) {
    this.favoritesService.removeFavorite(productId);
    this.favoriteProducts = this.favoriteProducts.filter(p => p.id !== productId);
  }
}


