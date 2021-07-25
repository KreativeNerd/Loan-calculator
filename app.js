"use strict";
//Check this link: https://www.kasasa.com/blog/how-to-calculate-loan-payments-in-3-easy-steps
// Listen for submit
document.querySelector("#loan-form").addEventListener('submit', function(e){

  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(){
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const months = document.getElementById('months');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);

  const calculatedInterest = parseFloat(interest.value) /100 / 12;

  const calculatedPayments = parseFloat(months.value) * 1;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);//Math.pow(base,exponent)

  const monthly = (principal*x*calculatedInterest)/(x-1);
  
  // Note: you can use isFinite() or !isNaN()
  if(isFinite(monthly) && isFinite(amount.value) && !isNaN(interest.value) && !isNaN(months.value)){
    monthlyPayment.value = monthly.toFixed(2);//2 is the number of decimal places
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

  // show results
  document.getElementById('results').style.display = 'block';

  // Hide loading
  document.getElementById('loading').style.display = 'none';
  } else {
    showError("Please check your numbers") ;
  }

}

// Show Error
function showError(error){
    // hide results
  document.getElementById('results').style.display = 'none';

    // Hide loading
  document.getElementById('loading').style.display = 'none';

  // create a div
  const errorDiv = document.createElement("Div");

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';

  // Create textNode and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);// insertBefore(newnode, existingnode)

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//Creating clearError function
function clearError(){
  document.querySelector('.alert').remove();
}

