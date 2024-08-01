import React from "react";
const HTTP = "http://localhost:3333/";
export default function API() {}
export function API_USER() {
    
  return HTTP + "user";
}
export function API_AUTHER() {
  return HTTP + "auther";
}

export function API_BOOKS() {
  return HTTP + "books";
}

export function API_TYPEBOOK() {
  return HTTP + "type-book";
}

export function API_CATEGORYBOOK() {
  return HTTP + "category-book";
}
export function API_CART (){
  return HTTP + "cart";
}

export function API_ORDER() {
  return HTTP + "order";
}