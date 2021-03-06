"use strict";
var categories = [];
var types = [];
var products = [];

var populateDropDown = function (data) {
  data.categories.forEach(function(product) {
    $('#category').append(`<option value="${product.id}" id="catId${product.id}">${product.name}</option>`);
  });
}

var dropDownListener = function (event) {
  var siteID = this.value;
  showProduct(siteID);
}

var showProduct = function(productID) {
  $('#holder_one').html(`${types.types[productID].description}`);
  $('#products').remove();
  $('#holder_two').append(`<div id="products"></div>`) ;

  for (let i = 0; i < products.products.length; i++) {
    let currentProduct = products.products[i];
    $.each(currentProduct, function(key, value) {
     if (this.type == productID) {
      $('#products').append(`<article class="productCard"><h3>${this.name}</h3> <div class="description">${this.description}</div></article>`);
     }
    });
  };
}

var categoryXHR = function () {
  return new Promise ((resolve, reject) => {
    $.ajax({
      url: "./JSONS/categories.JSON",
    }).done(function(data){
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

var loadTypes = function (catResult) {
  return new Promise ((resolve, reject) => {
    $.ajax({
      url: "./JSONS/types.JSON",
      data: catResult
    }).done(function(data){
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};
var loadProducts = function (typeResult) {
  return new Promise ((resolve, reject) => {
    $.ajax({
      url: "./JSONS/products.JSON",
      data: typeResult
    }).done(function(data){
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};
categoryXHR().then(function(catData) {
  categories = catData;
  populateDropDown(catData);
  return loadTypes(catData);
}).then(function(typeData) {
  types = typeData;
  return loadProducts(typeData);
}).then(function(prodData) {
  products = prodData;
})

$(document).on('change', '#category', dropDownListener)

