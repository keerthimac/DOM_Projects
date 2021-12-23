//listen for submit

document.getElementById('loan-form').addEventListener('submit', function (e) {
  //Hide Results
  document.getElementById('results').style.display = 'none';

  //Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate Results Function
function calculateResults() {
  // console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //Show Results
    document.getElementById('results').style.display = 'block';

    //Hide Loader
    document.getElementById('loading').style.display = 'none';
  } else {
    //Hide Loader
    document.getElementById('loading').style.display = 'none';
    showError('Please check your numbers');
  }
}

function showError(error) {
  //Create Div
  const errorDiv = document.createElement('div');

  //Get Elements
  const card = document.querySelector('.card-header');
  const heading = document.querySelector('.heading');

  //Add Class
  errorDiv.className = 'alert alert-danger text-center h6';

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear Error after 3s
  setTimeout(clearError, 2000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
