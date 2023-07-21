// Function to show loading message during API requests
function showLoadingMessage() {
  const loadingDiv = document.createElement('div');
  loadingDiv.textContent = 'Loading...';
  loadingDiv.classList.add('loading');
  document.body.appendChild(loadingDiv);
}

// Function to hide loading message after API requests
function hideLoadingMessage() {
  const loadingDiv = document.querySelector('.loading');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

// Function to show a message with custom text
function showMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add('message');
  document.body.appendChild(messageDiv);
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Function to fetch orders from the API
async function fetchOrders() {
  try {
    const response = await fetch('https://main.d23u253yebcoo5.amplifyapp.com/one-free-pizza/orders');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

// Function to create and display each order on the "Orders" page
function displayOrders(orders) {
  const ordersContainer = document.getElementById('orders-container');
  ordersContainer.innerHTML = ''; // Clear previous orders (if any)

  orders.forEach((order) => {
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order');

    const orderTitle = document.createElement('h3');
    orderTitle.textContent = `Order ID: ${order.id}`;

    const orderDetails = document.createElement('p');
    orderDetails.innerHTML = `<strong>Style:</strong> ${order.style}<br>
                              <strong>Crust:</strong> ${order.crust}<br>
                              <strong>Extra Cheese:</strong> ${order.extra_cheese ? 'Yes' : 'No'}<br>
                              <strong>Name:</strong> ${order.name}<br>
                              <strong>Address:</strong> ${order.address}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => removeOrder(order.id));

    orderDiv.appendChild(orderTitle);
    orderDiv.appendChild(orderDetails);
    orderDiv.appendChild(removeButton);

    ordersContainer.appendChild(orderDiv);
  });
}

// Function to remove an order
async function removeOrder(orderId) {
  try {
    const response = await fetch(`https://main.d23u253yebcoo5.amplifyapp.com/one-free-pizza/orders/${orderId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If order is successfully removed from the database, fetch the updated orders and display them
      const orders = await fetchOrders();
      displayOrders(orders);
      showMessage('Order removed successfully!');
    } else {
      console.error('Error removing order:', response.statusText);
      showMessage('Error removing order. Please try again later.');
    }
  } catch (error) {
    console.error('Error removing order:', error);
    showMessage('Error removing order. Please try again later.');
  }
}

// Function to submit a pizza order
async function submitOrder(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Check if all fields are filled out
  if (!formData.get('style') || !formData.get('crust') || !formData.get('name') || !formData.get('address')) {
    showMessage('Please fill out all required fields.');
    return;
  }

  try {
    showLoadingMessage();

    const response = await fetch('https://main.d23u253yebcoo5.amplifyapp.com/one-free-pizza/orders', {
      method: 'POST',
      body: formData,
    });

    hideLoadingMessage();

    if (response.ok) {
      showMessage('Order submitted successfully!');
      form.reset();
    } else {
      console.error('Error submitting order:', response.statusText);
      showMessage('Error submitting order. Please try again later.');
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    hideLoadingMessage();
    showMessage('Error submitting order. Please try again later.');
  }
}

// Function to navigate to the "Home" page
function goToHomePage() {
    window.location.href = 'index.html';
  }
  
  // Function to navigate to the "Get Your Pizza" page
  function goToGetYourPizzaPage() {
    window.location.href = 'get_your_pizza.html';
  }
  
  // Function to navigate to the "Orders" page
  function goToOrdersPage() {
    window.location.href = 'orders.html';
  }
  
  // Function to initialize the app
  function init() {
    const pizzaOrderForm = document.getElementById('pizza-order-form');
    const homePageButton = document.getElementById('home-page-button');
    const getYourPizzaPageButton = document.getElementById('get-your-pizza-page-button');
    const ordersPageButton = document.getElementById('orders-page-button');
  
    // Event listener for the navigation buttons
    homePageButton.addEventListener('click', goToHomePage);
    getYourPizzaPageButton.addEventListener('click', goToGetYourPizzaPage);
    ordersPageButton.addEventListener('click', goToOrdersPage);

  // Event listeners for navigation links
  homePageLink.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  getYourPizzaPageLink.addEventListener('click', () => {
    window.location.href = 'get_your_pizza.html';
  });

  ordersPageLink.addEventListener('click', () => {
    window.location.href = 'orders.html';
  });

  // Event listener for submitting the pizza order form
  pizzaOrderForm.addEventListener('submit', submitOrder);
}

// Call the init function to initialize the app
init();
