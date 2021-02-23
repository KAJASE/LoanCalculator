document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';
    //show results
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults(e){
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatePayments = parseFloat(years.value) * 12;
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal*x*calculateInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayments).toFixed(2);
    totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);

    //show results
    document.getElementById('results').style.display = 'block';

    //hide results
    document.getElementById('loading').style.display = 'none';

  }else{
    showError('Please check your numbers');
  }

  e.preventDefault();
}

function showError(error){
  //hide results
  document.getElementById('results').style.display = 'none';

  //hide results
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}