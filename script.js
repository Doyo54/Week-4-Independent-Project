function Order( pizza, topping, crust, size, delivery) {
    this.selectedPizza = pizza;
    this.selectedTopping = topping;
    this.selectedCrust = crust;
    this.selectedsize = size;
    this.deliveryOption = delivery;
  }
  
  function Address(city, estate, mobileNumber){ 
    this.cityName = city;
    this.estateName = estate;
    this.customerMobile = mobileNumber;
  }
  
  function Price( crustPrice, sizePrice){
    this.priceForSelectedCrust = crustPrice;
    this.priceForSelectedsize= sizePrice;
  }
  
  Price.prototype.subtotal = function(){
    const toppingPrice =50
    return this.priceForSelectedsize + toppingPrice + this.priceForSelectedCrust;
  }
  
  function Bill(subtotal){        
    this.subtotalGotten = subtotal;
  }
  
  Bill.prototype.total = function(){
    return this.subtotalGotten;
  }


  $(document).ready(function(){
    $('#page2').submit( function(event){  
      $('#empty').hide();
      $('#More').show();
      event.preventDefault();

      var selectedPizza = parseInt($("select#pizza").val());
      var toppingSelected = parseInt($("select#topping").val());
      var crustSelected = parseInt($("select#crust").val());
      var selectedSize =parseInt($("select#size").val());
      var selectedDeliveryOption =$("select#delivery").val();

      if (!selectedPizza || !selectedSize || !crustSelected ||!toppingSelected ||!selectedDeliveryOption) {
       alert("** Fill in all input fields to proceed!** ");
        return;
      } else{
      }
   
      var crusts = ['Thick', 'Thin'];
      var toppings = ['Pepperoni', 'Mushroom', 'Sausage', 'Chicken'];
      var pizzas = ['Veg Tikka', 'Chicken Tikka', 'Peri Peri Chicken', 'BBQ Steak', 'Hawaiian'];
      var sizes = ['Small', 'Medium' , 'Large'];
      var deliveryOptions = ['Collect', 'Deliver'];
  
      var sizePrices = [600, 700, 800];
      var crustPrices = [50];
  
  
      var priceofSelectedSize = sizePrices[selectedSize-1];
      var priceOfCrustSelected = crustPrices[crustSelected];
  
      var nameOfPizza = pizzas[selectedPizza-1];
      var nameOfTopping = toppings[toppingSelected-1];
      var nameOfCrust = crusts[crustSelected-1];
      var nameOfDeliveryOption = deliveryOptions[selectedDeliveryOption-1];
      var nameOfSize = sizes[selectedSize-1];
  
  
      var newOrder = new Order( nameOfPizza, nameOfTopping, nameOfCrust, nameOfSize, nameOfDeliveryOption);
      const toppingPrice =50
      var newPrices = new Price(priceofSelectedSize, toppingPrice , priceOfCrustSelected);
      var newSubtotal = newPrices.subtotal();
      var newBill = new Bill(newSubtotal);
      var newTotal = newBill.total();
      if (selectedDeliveryOption == "2"){
        $('#address').show();
      }  
       
      else{
        document.getElementById('order-summary').value = newOrder.selectedPizza + '-' + newOrder.selectedsize + ' = ' + newPrices.priceForSelectedCrust + '\n' + newOrder.selectedTopping + ' topping ' + ' = ' + ' 50 ' + '\n' + newOrder.selectedCrust + ' crust  ' + ' = ' + newPrices.priceForSelectedsize + '\n' + 'Total: ' + newTotal +'ksh';
      }
        $('#add').submit( function(event){   
          event.preventDefault();
          document.getElementById("page2").reset();
          
        });



      $('#delivery-address').submit(function(event){
        event.preventDefault();

        document.getElementById('order-summary').value = newOrder.selectedPizza + '-' + newOrder.selectedsize + ' = ' + newPrices.priceForSelectedCrust + '\n' + newOrder.selectedTopping + ' topping ' + ' = ' + ' 50ksh ' + '\n' + newOrder.selectedCrust + ' crust  ' + ' = ' + newPrices.priceForSelectedsize + '\n' + 'Total: ' + newTotal + '\n'+'Delivery Fee ' + ' = ' + ' 100ksh ';
      });
      
      $('#checkout-form').submit(function(event){
        event.preventDefault();
  
        var inputtedCity = $('input#city').val();
        var inputtedEstate = $('input#estate').val();
        var inputtedNumber = $('#mobile').val();
  
        var newAddress = new Address(inputtedCity, inputtedEstate, inputtedNumber);
  
        if(selectedDeliveryOption == "2"){
  
          alert('Hi' + '. Your order will be delivered to ' + newAddress.estateName + ', ' + newAddress.cityName + ' in the next 30 minutes. We will call this number (' + newAddress.customerMobile + ') when we get there. Thank you for supporting AL-Pizza');
        }
        else{
          alert('Hi' +', your order will be ready for collection in 25 minutes.  Thank you for being a loyal customer');
        }
  
        document.getElementById("checkout-form").reset();
        document.getElementById("delivery-address").reset();
        document.getElementById("page2").reset();
        $('#address').hide();
      });
    });
  });

