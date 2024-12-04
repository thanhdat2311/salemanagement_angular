import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from 'src/app/services/product.service';
import { enviroment } from 'src/app/enviroment/enviroment';
import Swal from 'sweetalert2';
import { Categories } from '../models/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //search
  keyword: String ='';
  //categories
  categories: Categories[]= [];
  categoryId: number= 0;
  //products
products: Product[] = [];
currentPage: number = 0;
itemsPerPage: number = 12;
pages: number[] = [];
totalPages: number = 0;
visiblePages: number[] = [];
constructor(private productService: ProductService, private categoriesService :CategoriesService){}
ngOnInit(){
  this.getProducts(this.currentPage, this.itemsPerPage, this.keyword, this.categoryId)
  this.getCategories();
}
searchProducts(page: number,limit: number ,keyword: String,categoryId: number ){
  this.getProducts(page,limit,keyword,categoryId);
}
getProducts(page: number, limit: number, keyword: String, categoryId:number){
  this.productService.getProducts(page,limit,keyword,categoryId).subscribe({
    next: (response: any)=>{
      debugger
      response.products.forEach((product: Product) => {
        product.url = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
      });
      this.products = response.products;
      this.totalPages = response.totalPages;
      this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
    }
    ,
    complete: () => {
      debugger;
    }
    ,
    error: (error: any) => {
     debugger

    }
  }
)
}

getCategories(){
  this.categoriesService.getCategories().subscribe({
    next: (response: Categories[])=>{
      debugger
      this.categories = response;
    }
    ,
    complete: () => {
      debugger;
    }
    ,
    error: (error: any) => {
     debugger

    }
  }
)
}
onPageChange(page: number){
  debugger
  this.currentPage = page;
  this.getProducts(this.currentPage, this.itemsPerPage, this.keyword, this.categoryId);
}
  
generateVisiblePageArray(currentPage: number,totalPages: number):number[]{
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages/2);
  
  let startPage = Math.max(currentPage - halfVisiblePages,0);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if(endPage - startPage + 1 < maxVisiblePages){
    startPage = Math.max(endPage - maxVisiblePages + 1, 0 );
  }
  return new Array(endPage - startPage +1).fill(0).map((_,index) => startPage + index )
}
}
