const flights = [
  {
      from: "Tel aviv",
      to:'amsterdam',
      price: 40,
      depart: new Date('24.11.2023'),
      return: new Date('1.12.2023')
      
  },
  {
      from: "Tel aviv",
      to:'london',
      price: 75,
      depart: new Date('28.11.2023'),
      return: new Date('12.12.2023')
      
  },
  {
      from: "Athens",
      to:'Prague',
      price: 95,
      depart: new Date('14.11.2023'),
      return: new Date('1.12.2023')
  },
  {
      from: "Berlin",
      to:'Prague',
      price: 22,
      depart: new Date('1.12.2023'),
      return: new Date('12.12.2023')
      
  },
  {
      from: "London",
      to:'Berlin',
      price: 100,
      depart: new Date('2.10.2023'),
      return: new Date('18.10.2023')
  }
]
    
    
    document.addEventListener('DOMContentLoaded', function () {
      const loginForm = document.getElementById('loginForm');
      const userFeatures = document.getElementById('userFeatures');
      const featuresList = document.getElementById('featuresList');
      const loginButton = document.getElementById('loginButton');
      const logoutButton = document.getElementById('logoutBtn');
      const flightData = document.getElementById('flightData');
      const bookingSystem = document.getElementById('bookingSystem');
      const flightList = document.getElementById('flightList');
      const cartList = document.getElementById('cartList');
      const bookButton = document.getElementById('bookButton');

      loginButton.addEventListener('click', function () {
        // Simulate user authentication
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const isAdmin = document.getElementById('isAdmin').checked;
        localStorage.setItem('user', JSON.stringify({ email, isAdmin }));

        // Check credentials (this is a simplified example, you should use a more secure authentication mechanism)
        if (email === 'admin@example.com' && password === 'admin') {
          displayFeatures(true);
        } else if (email === 'user@example.com' && password === 'user') {
          displayFeatures(false);
        } else {
          alert('Invalid credentials. Please try again.');
        }
      });

      function displayFeatures(isAdmin) {
        loginForm.style.display = 'none';
        userFeatures.style.display = 'block';
        logoutButton.style.display = 'block';
        featuresList.innerHTML = '';
        document.getElementById('flightData').style.display= "block";

        const searchBtn = document.createElement('input');
        searchBtn.type = 'text';
        searchBtn.placeholder = 'Search Flights..' ;
        featuresList.appendChild(searchBtn);
     
        searchBtn.addEventListener('input', function() {
          flightList.innerHTML='';
          const searchTerm = searchBtn.value.toLowerCase();
          const filteredFlights = flights.filter(flight => flight.to.toLowerCase().includes(searchTerm));
          displayFlights(filteredFlights);
          });



        const sortBtn = document.createElement('button');
        sortBtn.textContent = 'Sort Flights (Price)';
        featuresList.appendChild(sortBtn);
        sortBtn.addEventListener('click', function() {
          flightList.innerHTML='';
          const sortedFlights = flights.sort((a, b) => a.price - b.price); 
          displayFlights(sortedFlights);
        });


        if (isAdmin) {
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add Flight';
        featuresList.appendChild(addBtn);
        addBtn.addEventListener('click', function() {
          const formContainer = document.getElementById('addFlightFormContainer');
          formContainer.style.display = 'block';
          document.getElementById('flightData').style.display= "none";
         
          // flightsContainer.innerHTML = '';
        });
      const submitBtn = document.getElementById('submitButton');
      submitBtn.addEventListener('click', function() {
        flightList.innerHTML='';
      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;
      const price = document.getElementById('price').value;
      const date = document.getElementById('date').value;
      const Redate = document.getElementById('Redate').value;
      const newFlight = {
        from : from,
        to: to,
        price: price,
        depart: new Date(date),
        return: new Date(Redate)
       }
       
       document.getElementById('addFlightForm').reset();
       document.getElementById('addFlightFormContainer').style.display= "none";
       document.getElementById('flightData').style.display= "block";
       userFeatures.style.display = 'block';
       const newArr=[...flights];
       newArr.push(newFlight);
      displayFlights(newArr);
      });
    

      // displayFlights(arr);

      }

        
          // Admin features
          // const adminFeatures = ['Add Flights', 'Search Flights', 'Sort Flights (Price)', 'Update Price'];
          // adminFeatures.forEach(feature => {
          //   const button = document.createElement('button');
          //   button.textContent = feature;
          //   featuresList.appendChild(button);
          // });
        

          // const userFeatures = ['Search Flights', 'Sort Flights (Price)'];
          // userFeatures.forEach(feature => {
          //   const button = document.createElement('button');
          //   button.id=button;
          //   button.textContent = feature;
          //   featuresList.appendChild(button);
          //

          // Display flights
        
    }

      function displayFlights(flights) {
        flights.forEach((flight, index) => {
          const listItem = document.createElement('div');
          listItem.innerHTML = `<h1><strong>Flight :</h1></strong> 
                                 <h3>The Flight From ${flight.from} to ${flight.to}</h3>
                                 <p>Price: $${flight.price} <button class="updateBtn" data-index="${index}">update</button>
                                 <input type="number" id="priceInput" placeholder="Enter new price.." style="display: none ;" ></p>
                                 <p>Departure: ${flight.depart.toDateString()} | Return: ${flight.return.toDateString()} </p>
                                 <p><button class="addToCartBtn" data-index="${index}">Add to Cart</button></p>`;
          listItem.querySelector('.addToCartBtn').addEventListener('click', function (e) {
            const flightIndex = parseInt(e.target.getAttribute('data-index'));
            addToCart(flights[flightIndex]);
          });
          listItem.querySelector('.updateBtn').addEventListener('click', function (e) {
            document.getElementById('priceInput').style.display= "block";
          });


          listItem.querySelector('#priceInput').addEventListener('input', function (e) {
            const flightIndex = parseInt(e.target.getAttribute('data-index'));
            const newPriceInput =  document.getElementById('priceInput');
            const newPrice = parseFloat(newPriceInput.value)
            if (!isNaN(newPrice)) {
              flights[flightIndex].price = newPrice;
          } 
          else {
            alert('Please enter a valid number for the new price.');
          }

          });

          flightList.appendChild(listItem);
        });
      






        // flightsContainer.innerHTML = '';

        // flights.forEach(flight => {
        //   const listItem = document.createElement('div');
        //   listItem.className = 'flight-card';
        //   flightCard.innerHTML = `
        //     <h3>The Flight From ${flight.from} to ${flight.to}</h3>
        //     <p>Price: $${flight.price}</p>
        //     <p>Departure Date: ${flight.dates[1].depart}</p>
        //     <p>Return Date: ${flight.dates[1].return}</p>
        //     <br><button class="addToCartBtn">Add to Cart</button>

        //   `;
        listItem.style.width= "300px";
        listItem.style.height= "400px";
        listItem.style.background = "#ffffff";
        listItem.style.borderRadius= "5px";
        listItem.style.border= "5px solid #ddd";
        listItem.style.textAlign= "center";
        listItem.style.padding= "10px";
        listItem.style.display= "inliine-block";
        listItem.style.margin= "25px";
          // flightsContainer.appendChild(flightCard);
        
      
      }
      const cart = [];

      function addToCart(selectedFlight) {
        const existingCartItem = cart.find(item => item.from === selectedFlight.from && item.to === selectedFlight.to);

        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          cart.push({ ...selectedFlight, quantity: 1 });
        }

        updateCartDisplay();
      }

      function removeFromCart(itemId) {
        const index = cart.findIndex(item => item.id === itemId);

        if (index !== -1) {
          cart.splice(index, 1);
          updateCartDisplay();
        }
      }


      function updateCartDisplay() {
        cartList.innerHTML = '';
        cart.forEach(item => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<strong>${item.from} to ${item.to}:</strong> $${item.price} (Quantity: ${item.quantity})
                              <button class="removeBtn" data-id="${item.id}">Remove</button>`;
          listItem.querySelector('.removeBtn').addEventListener('click', function (e) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(itemId);
          });
          cartList.appendChild(listItem);
        });

        bookButton.disabled = cart.length === 0;
      }

      // Display flight data and enable booking system
      flightData.style.display = 'block';

      bookButton.addEventListener('click', function () {
        // Calculate total price
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        // Display confirmation message
        alert(`Thank you for booking!\nTotal Price: $${totalPrice}`);

        // Clear cart
        cart.length = 0;
        updateCartDisplay();
      });

      bookingSystem.style.display = 'block';
    
  



      

      logoutButton.addEventListener('click', function () {
        // Clear user information from localStorage
        localStorage.removeItem('user');
        loginForm.style.display = 'block';
        userFeatures.style.display = 'none';
        logoutButton.style.display = 'none';
    
      });



    });
