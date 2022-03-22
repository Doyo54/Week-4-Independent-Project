function Order( pizza, topping, crust, size, amount, delivery,sizePrice) {
    this.selectedPizza = pizza;
    this.selectedTopping = topping;
    this.selectedCrust = crust;
    this.selectedsize = size;
    this.selectedAmount=amount;
    this.deliveryOption = delivery;
    this.priceForSelectedsize= sizePrice;
  }
  
  function Address(city, estate, mobileNumber){ 
    this.cityName = city;
    this.estateName = estate;
    this.customerMobile = mobileNumber;
  }
  
    function Price(toppingPrice, crustPrice){
     this.topping1=toppingPrice;
     this.crust1 =crustPrice;
    }
  
  Price.prototype.subtotal = function(){
    return  this.topping1 + this.crust1;
  }
  
  function Bill(subtotal,amount, size1){        
    this.subtotalGotten = subtotal;
    this.amountOfPizza =amount;
    this.sizeSelected =size1;
  }
  
  Bill.prototype.total = function(){
    return  (this.subtotalGotten + this.amountOfPizza *  this.sizeSelected );
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
      var amountSelected =$("select#amount").val();
      var selectedDeliveryOption =$("select#delivery").val();

      if (!selectedPizza || !selectedSize || !crustSelected ||!toppingSelected ||!selectedDeliveryOption || !amountSelected) {
       alert("** Fill in all input fields to proceed!** ");
        return;
      } else{
      }
   
      var crusts = ['Thick', 'Thin'];
      var toppings = ['Pepperoni', 'Mushroom', 'Sausage', 'Chicken'];
      var pizzas = ['Veg Tikka', 'Chicken Tikka', 'Peri Peri Chicken', 'BBQ Steak', 'Hawaiian'];
      var sizes = ['Small', 'Medium' , 'Large'];
      var amounts =['1', '2', '3' ,'4', '5', '6' ];
      var deliveryOptions = ['Collect', 'Deliver'];
  
      
      var sizePrices = [600, 700, 800];

  

      var priceofSelectedSize = sizePrices[selectedSize-1];

      var nameOfAmount= amounts[amountSelected-1];
      var nameOfPizza = pizzas[selectedPizza-1];
      var nameOfTopping = toppings[toppingSelected-1];
      var nameOfCrust = crusts[crustSelected-1];
      var nameOfDeliveryOption = deliveryOptions[selectedDeliveryOption-1];
      var nameOfSize = sizes[selectedSize-1];
  
  
      var newOrder = new Order(nameOfPizza, nameOfTopping ,nameOfCrust,nameOfSize, nameOfAmount , nameOfDeliveryOption,priceofSelectedSize, amountSelected);
      const toppingPrice =50;
      const crustPrice =100;
      var newPrices = new Price(toppingPrice , crustPrice);
      var newSubtotal = newPrices.subtotal();
      var newBill = new Bill( newSubtotal, amountSelected, priceofSelectedSize );
      var newTotal = newBill.total();
      if (selectedDeliveryOption == "2"){
        $('#address').show();
      }  
       
      else{
        document.getElementById('order-summary').value = newOrder.selectedPizza + '-' + newOrder.selectedsize +' * '+newOrder.selectedAmount + ' = ' + newOrder.priceForSelectedsize + '\n' + newOrder.selectedTopping + ' topping ' + ' = ' + ' 50 ' + '\n' + newOrder.selectedCrust + ' crust  ' + ' = ' + '100'  + '\n' + 'Total: ' + newTotal +'ksh';
      
      }



      $('#delivery-address').submit(function(event){
        event.preventDefault();

        document.getElementById('order-summary').value = newOrder.selectedPizza + '-' + newOrder.selectedsize +' * '+newOrder.selectedAmount + ' = ' + newOrder.priceForSelectedsize + '\n' + newOrder.selectedTopping + ' topping ' + ' = ' + ' 50 ' + '\n' + newOrder.selectedCrust + ' crust  ' + ' = ' + '100'  + '\n' + 'Total: ' + newTotal +'ksh';
      
      
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

