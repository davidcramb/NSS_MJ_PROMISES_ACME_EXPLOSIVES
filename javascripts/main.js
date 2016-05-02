"use strict";
var categories = [];
var types = [];
var products = [];

var populateDropDown = function (data) {
  data.categories.forEach(function(product) {
    $('#category').append(`<option value="${product.id}" id="catId${product.id}">${product.name}</option>`)
  })
}

var dropDownListener = function (event) {
  var siteID = this.value
  showProduct(siteID);
//   console.log(siteID)
//   for (let i = 0; i < categories.categories.length; i++){
//   }
}

var showProduct = function(productID) {
  console.log(types.types[productID])
  $('#holder_one').html(`${types.types[productID].name}
                     ${types.types[productID].description}`);
  $('#products').remove();
  $('#holder_two').append(`<div id="products"></div>`) 

  for (let i = 0; i < products.products.length; i++) {
    let currentProduct = products.products[i]
    $.each(currentProduct, function(key, value) {

     if (this.type == productID) {
      $('#products').append(`<article>${this.name}</article`)
     }
    })
    // if (currentProduct.type = productID) {
    //   $('#holder_two').html(`${currentProduct}`)
    // }
  }
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
var logData = function (data) {

}

// $('#category').change(function(event) {
//   categoryXHR()
// .then(function(data1) {

//   createDOMCard(event, data1);
//   return loadTypes(data1);
// }).then(function(data2) {
//   logData(data2)
//   return loadProducts(data2);
// }).then(function(data3) {
//   console.log(data3)
// });

// });

categoryXHR().then(function(catData) {
  categories = catData;
  populateDropDown(catData)
  return loadTypes(catData)
}).then(function(typeData) {
  types = typeData;
  return loadProducts(typeData)
}).then(function(prodData) {
  products = prodData;
})


$(document).on('change', '#category', dropDownListener)

