const foodDatabase = [
  { name: 'Rice', category: 'Grains', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Brown Rice', category: 'Grains', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
  { name: 'Roti', category: 'Grains', calories: 310, protein: 7.5, carbs: 47, fat: 8 },
  { name: 'Chapati', category: 'Grains', calories: 320, protein: 7, carbs: 50, fat: 7 },
  { name: 'Bread', category: 'Grains', calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  { name: 'Poha', category: 'Breakfast', calories: 160, protein: 4, carbs: 28, fat: 2 },
  { name: 'Upma', category: 'Breakfast', calories: 175, protein: 4.2, carbs: 29, fat: 4.5 },
  { name: 'Idli', category: 'Breakfast', calories: 138, protein: 3.3, carbs: 27.5, fat: 0.5 },
  { name: 'Dosa', category: 'Breakfast', calories: 168, protein: 4.5, carbs: 30, fat: 1.8 },
  { name: 'Oats', category: 'Breakfast', calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },
  { name: 'Dal', category: 'Legumes', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: 'Lentils', category: 'Legumes', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: 'Chickpeas', category: 'Legumes', calories: 164, protein: 8.9, carbs: 27, fat: 2.6 },
  { name: 'Rajma', category: 'Legumes', calories: 132, protein: 8.7, carbs: 23.5, fat: 0.5 },
  { name: 'Soybean', category: 'Legumes', calories: 173, protein: 16.6, carbs: 9.9, fat: 8.1 },
  { name: 'Paneer', category: 'Dairy', calories: 265, protein: 18, carbs: 1.2, fat: 20 },
  { name: 'Milk', category: 'Dairy', calories: 42, protein: 3.4, carbs: 5, fat: 1 },
  { name: 'Curd', category: 'Dairy', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Yogurt', category: 'Dairy', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Cottage Cheese', category: 'Dairy', calories: 98, protein: 11.1, carbs: 3.4, fat: 4.3 },
  { name: 'Tofu', category: 'Protein', calories: 144, protein: 17.3, carbs: 3.9, fat: 8.1 },
  { name: 'Chicken', category: 'Protein', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Egg', category: 'Protein', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Fish', category: 'Protein', calories: 206, protein: 22, carbs: 0, fat: 12 },
  { name: 'Peanuts', category: 'Nuts & Seeds', calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2 },
  { name: 'Almonds', category: 'Nuts & Seeds', calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9 },
  { name: 'Cashews', category: 'Nuts & Seeds', calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9 },
  { name: 'Peanut Butter', category: 'Nuts & Seeds', calories: 588, protein: 25, carbs: 20, fat: 50 },
  { name: 'Banana', category: 'Fruit', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  { name: 'Apple', category: 'Fruit', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
  { name: 'Orange', category: 'Fruit', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1 },
  { name: 'Mango', category: 'Fruit', calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { name: 'Avocado', category: 'Fruit', calories: 160, protein: 2, carbs: 8.5, fat: 15 },
  { name: 'Potato', category: 'Vegetables', calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  { name: 'Sweet Potato', category: 'Vegetables', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
  { name: 'Green Gram', category: 'Legumes', calories: 348, protein: 24, carbs: 62, fat: 1.4 },
  { name: 'Cucumber', category: 'Vegetables', calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 }
];

const trackerState = {
  foods: [],
  target: 2000
};

const init = () => {
  const foodOptionList = document.getElementById('food-options');
  const foodCategorySelect = document.getElementById('food-category');
  const foodSearchInput = document.getElementById('food-search');
  const foodSortSelect = document.getElementById('food-sort');
  const dailyTargetInput = document.getElementById('daily-target');

  populateFoodOptions(foodOptionList);
  populateCategoryFilter(foodCategorySelect);
  renderFoodTable();
  loadFromLocalStorage();

  document.getElementById('bmi-form').addEventListener('submit', handleBMIFormSubmit);
  document.getElementById('bmi-reset-btn').addEventListener('click', () => resetCalculator('bmi'));

  document.getElementById('calorie-form').addEventListener('submit', handleCalorieFormSubmit);
  document.getElementById('calorie-reset-btn').addEventListener('click', () => resetCalculator('calorie'));

  foodSearchInput.addEventListener('input', filterFoods);
  foodCategorySelect.addEventListener('change', filterFoods);
  foodSortSelect.addEventListener('change', filterFoods);

  document.getElementById('add-food-btn').addEventListener('click', addFood);
  document.getElementById('clear-food-btn').addEventListener('click', clearTracker);
  dailyTargetInput.addEventListener('input', handleTargetChange);
  document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
  document.getElementById('back-to-top').addEventListener('click', scrollToTop);
  document.querySelector('.nav-toggle').addEventListener('click', toggleMobileNav);

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      const navMenu = document.querySelector('.nav-menu');
      navMenu.classList.remove('open');
      document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('scroll', handleScroll);
  updateSummaryDashboard();
};

function populateFoodOptions(foodOptionList) {
  foodOptionList.innerHTML = foodDatabase
    .map((food) => `<option value="${food.name}"></option>`)
    .join('');
}

function populateCategoryFilter(selectElement) {
  const categories = [...new Set(foodDatabase.map((food) => food.category))].sort();
  selectElement.innerHTML = '<option value="all">All categories</option>' + categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join('');
}

function searchFoods(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return foodDatabase;
  }
  return foodDatabase.filter((food) => food.name.toLowerCase().includes(normalizedQuery));
}

function filterFoods() {
  const searchTerm = document.getElementById('food-search').value;
  const selectedCategory = document.getElementById('food-category').value;
  const sortValue = document.getElementById('food-sort').value;

  let results = searchFoods(searchTerm);

  if (selectedCategory !== 'all') {
    results = results.filter((food) => food.category === selectedCategory);
  }

  switch (sortValue) {
    case 'calories-desc':
      results.sort((a, b) => b.calories - a.calories);
      break;
    case 'calories-asc':
      results.sort((a, b) => a.calories - b.calories);
      break;
    case 'protein-desc':
      results.sort((a, b) => b.protein - a.protein);
      break;
    case 'protein-asc':
      results.sort((a, b) => a.protein - b.protein);
      break;
    default:
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  renderFoodTable(results);
}

function renderFoodTable(items = foodDatabase) {
  const foodTableBody = document.getElementById('food-table-body');
  const filteredItems = items.length ? items : [];

  if (!filteredItems.length) {
    foodTableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">No foods match your search. Try a different keyword or filter.</div>
        </td>
      </tr>
    `;
    return;
  }

  foodTableBody.innerHTML = filteredItems
    .map(
      (food) => `
        <tr>
          <td>${food.name}</td>
          <td>${food.calories}</td>
          <td>${food.protein} g</td>
          <td>${food.carbs} g</td>
          <td>${food.fat} g</td>
          <td>${food.category}</td>
        </tr>
      `
    )
    .join('');
}

function validateNumber(value, label, min, max) {
  if (value === null || value === undefined || value === '') {
    return `${label} is required.`;
  }

  const num = Number(value);

  if (!Number.isFinite(num)) {
    return `${label} is invalid.`;
  }

  if (num < min || num > max) {
    return `${label} must be between ${min} and ${max}.`;
  }

  if (num < 0) {
    return `${label} cannot be negative.`;
  }

  return '';
}

function setFieldError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
  }
}

function clearFieldError(elementId) {
  setFieldError(elementId, '');
}

function handleBMIFormSubmit(event) {
  event.preventDefault();
  clearFieldError('bmi-error');

  const age = document.getElementById('bmi-age').value;
  const height = document.getElementById('bmi-height').value;
  const weight = document.getElementById('bmi-weight').value;

  const ageError = validateNumber(age, 'Age', 13, 100);
  const heightError = validateNumber(height, 'Height', 100, 250);
  const weightError = validateNumber(weight, 'Weight', 20, 300);

  const errors = [ageError, heightError, weightError].filter(Boolean);

  if (errors.length) {
    setFieldError('bmi-error', errors[0]);
    return;
  }

  const bmi = calculateBMI(Number(weight), Number(height));
  const category = getBMICategory(bmi);
  const explanation = getBMIExplanation(category);
  displayBMIResult(bmi, category, explanation);
  updateSummaryDashboard();
  showToast('BMI calculated successfully.');
}

function calculateBMI(weight, heightCm) {
  const heightInMeters = heightCm / 100;
  return weight / (heightInMeters * heightInMeters);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}

function getBMIExplanation(category) {
  const explanations = {
    Underweight: 'Your BMI is below the healthy range. A balanced diet and a nutrition plan may help you reach a healthier weight.',
    'Normal weight': 'Your BMI is in the healthy range. Maintaining a balanced lifestyle supports overall wellbeing.',
    Overweight: 'Your BMI is above the normal range. Small, consistent lifestyle changes can support progress toward a healthier weight.',
    Obesity: 'Your BMI is in the obesity range. Consider consulting a qualified health professional for personalized guidance.'
  };

  return explanations[category] || 'BMI value is available.';
}

function displayBMIResult(bmiValue, category, explanation) {
  const bmiScore = document.getElementById('bmi-score');
  const bmiStatusBadge = document.getElementById('bmi-status-badge');
  const bmiCategory = document.getElementById('bmi-category');
  const bmiRange = document.getElementById('bmi-range');
  const bmiProgressFill = document.getElementById('bmi-progress-fill');
  const bmiExplanation = document.getElementById('bmi-explanation');

  bmiScore.textContent = bmiValue.toFixed(1);
  bmiCategory.textContent = category;
  bmiExplanation.textContent = explanation;

  const bmiPercent = Math.min(100, Math.max(0, ((bmiValue / 40) * 100))); 
  bmiProgressFill.style.width = `${bmiPercent}%`;

  const categoryColorMap = {
    Underweight: ['#f59e0b', 'warning'],
    'Normal weight': ['#22c55e', 'good'],
    Overweight: ['#f59e0b', 'warning'],
    Obesity: ['#ef4444', 'danger']
  };

  const [color, badgeClass] = categoryColorMap[category] || ['#1d4ed8', 'info'];
  bmiProgressFill.style.background = `linear-gradient(90deg, ${color}, #1d4ed8)`;
  bmiStatusBadge.textContent = category;
  bmiStatusBadge.className = `status-badge ${badgeClass}`;

  if (category === 'Underweight') {
    bmiRange.textContent = 'Below 18.5';
  } else if (category === 'Normal weight') {
    bmiRange.textContent = '18.5 - 24.9';
  } else if (category === 'Overweight') {
    bmiRange.textContent = '25 - 29.9';
  } else {
    bmiRange.textContent = '30+';
  }

  document.getElementById('dashboard-bmi').textContent = bmiValue.toFixed(1);
  document.getElementById('dashboard-category').textContent = category;
}

function handleCalorieFormSubmit(event) {
  event.preventDefault();
  clearFieldError('calorie-error');

  const age = document.getElementById('calorie-age').value;
  const height = document.getElementById('calorie-height').value;
  const weight = document.getElementById('calorie-weight').value;
  const gender = document.querySelector('input[name="calorie-gender"]:checked')?.value || 'male';
  const activityMultiplier = Number(document.getElementById('activity-level').value);

  const ageError = validateNumber(age, 'Age', 13, 100);
  const heightError = validateNumber(height, 'Height', 100, 250);
  const weightError = validateNumber(weight, 'Weight', 20, 300);

  const errors = [ageError, heightError, weightError].filter(Boolean);

  if (errors.length) {
    setFieldError('calorie-error', errors[0]);
    return;
  }

  const result = calculateCalories({
    age: Number(age),
    gender,
    height: Number(height),
    weight: Number(weight),
    activityMultiplier
  });

  displayCalorieResult(result);
  updateSummaryDashboard();
  showToast('Calorie estimate updated.');
}

function calculateBMR({ age, gender, height, weight }) {
  if (gender === 'female') {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return 10 * weight + 6.25 * height - 5 * age + 5;
}

function calculateCalories({ age, gender, height, weight, activityMultiplier }) {
  const bmr = calculateBMR({ age, gender, height, weight });
  const maintenance = bmr * activityMultiplier;
  const weightLoss = maintenance - 500;
  const weightGain = maintenance + 300;

  return {
    bmr,
    maintenance,
    weightLoss,
    weightGain
  };
}

function displayCalorieResult(result) {
  document.getElementById('bmr-result').textContent = `${Math.round(result.bmr)} kcal`;
  document.getElementById('maintenance-result').textContent = `${Math.round(result.maintenance)} kcal`;
  document.getElementById('loss-result').textContent = `${Math.round(result.weightLoss)} kcal`;
  document.getElementById('gain-result').textContent = `${Math.round(result.weightGain)} kcal`;

  document.getElementById('dashboard-bmr').textContent = `${Math.round(result.bmr)} kcal`;
  document.getElementById('dashboard-requirement').textContent = `${Math.round(result.maintenance)} kcal`;
}

function updateSummaryDashboard() {
  const bmiText = document.getElementById('dashboard-bmi').textContent.trim();
  const categoryText = document.getElementById('dashboard-category').textContent.trim();
  const bmrText = document.getElementById('dashboard-bmr').textContent.trim();
  const requirementText = document.getElementById('dashboard-requirement').textContent.trim();
  const consumedCalories = calculateTotalCalories();
  const targetCalories = Number(document.getElementById('daily-target').value) || 0;
  const remaining = targetCalories - consumedCalories;

  document.getElementById('hero-target').textContent = `${targetCalories || 0} kcal`;
  document.getElementById('hero-consumed').textContent = `${Math.round(consumedCalories)} kcal`;

  document.getElementById('dashboard-bmi').textContent = bmiText === '--' ? '--' : bmiText;
  document.getElementById('dashboard-category').textContent = categoryText === '--' ? '--' : categoryText;
  document.getElementById('dashboard-bmr').textContent = bmrText === '--' ? '--' : bmrText;
  document.getElementById('dashboard-requirement').textContent = requirementText === '--' ? '--' : requirementText;
  document.getElementById('dashboard-consumed').textContent = `${Math.round(consumedCalories)} kcal`;
  document.getElementById('dashboard-remaining').textContent = `${Math.round(remaining)} kcal`;

  const tracked = document.getElementById('tracker-total-calories');
  const remainingTracker = document.getElementById('tracker-remaining-calories');
  tracked.textContent = `${Math.round(consumedCalories)} kcal`;
  remainingTracker.textContent = `${Math.round(remaining)} kcal`;

  document.getElementById('tracker-target-calories').textContent = `${targetCalories || 0} kcal`;
  updateProgressBar();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function handleScroll() {
  const backToTopButton = document.getElementById('back-to-top');
  backToTopButton.classList.toggle('visible', window.scrollY > 300);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark');

  const icon = document.querySelector('.theme-icon');
  icon.textContent = body.classList.contains('dark') ? '☀️' : '🌙';

  localStorage.setItem('fitcalc-theme', body.classList.contains('dark') ? 'dark' : 'light');
}

function toggleMobileNav() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function addFood() {
  const selectedFoodName = document.getElementById('tracker-food').value.trim();
  const quantity = Number(document.getElementById('tracker-quantity').value);

  if (!selectedFoodName) {
    showToast('Please select a food first.');
    return;
  }

  const food = foodDatabase.find((item) => item.name.toLowerCase() === selectedFoodName.toLowerCase());

  if (!food) {
    const candidate = foodDatabase.find((item) => item.name.toLowerCase().includes(selectedFoodName.toLowerCase()));
    if (!candidate) {
      showToast('Food not found in the database.');
      return;
    }
    showToast(`Did you mean ${candidate.name}?`);
    return;
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    showToast('Please enter a valid quantity greater than 0 grams.');
    return;
  }

  const foodEntry = {
    id: Date.now() + Math.random(),
    name: food.name,
    quantity,
    calories: (food.calories * quantity) / 100
  };

  trackerState.foods.push(foodEntry);
  saveToLocalStorage();
  renderTracker();
  document.getElementById('tracker-food').value = '';
  document.getElementById('tracker-quantity').value = '';
  showToast(`${food.name} added to your tracker.`);
}

function removeFood(id) {
  trackerState.foods = trackerState.foods.filter((food) => food.id !== id);
  saveToLocalStorage();
  renderTracker();
  showToast('Food removed from tracker.');
}

function calculateTotalCalories() {
  return trackerState.foods.reduce((sum, food) => sum + Number(food.calories || 0), 0);
}

function updateProgressBar() {
  const totalConsumed = calculateTotalCalories();
  const target = Number(document.getElementById('daily-target').value) || 0;
  const progressBar = document.getElementById('tracker-progress-bar');

  if (!target) {
    progressBar.style.width = '0%';
    progressBar.setAttribute('aria-valuenow', '0');
    return;
  }

  const percentage = Math.min((totalConsumed / target) * 100, 100);
  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute('aria-valuenow', String(Math.round(percentage)));
}

function renderTracker() {
  const list = document.getElementById('tracker-food-list');
  const totalCalories = calculateTotalCalories();
  const target = Number(document.getElementById('daily-target').value) || trackerState.target || 2000;

  if (!trackerState.foods.length) {
    list.innerHTML = '<li class="empty-state">No foods logged today yet. Add a food to begin tracking.</li>';
  } else {
    list.innerHTML = trackerState.foods
      .map(
        (food) => `
          <li class="tracker-food-item">
            <div class="tracker-food-meta">
              <strong>${food.name}</strong>
              <span class="list-meta">${food.quantity} g • ${food.calories.toFixed(1)} kcal</span>
            </div>
            <button class="remove-food-btn" type="button" data-id="${food.id}">Remove</button>
          </li>
        `
      )
      .join('');
  }

  document.getElementById('tracker-total-calories').textContent = `${Math.round(totalCalories)} kcal`;
  document.getElementById('tracker-target-calories').textContent = `${target} kcal`;

  const remaining = target - totalCalories;
  document.getElementById('tracker-remaining-calories').textContent = `${Math.round(remaining)} kcal`;

  document.querySelectorAll('.remove-food-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      removeFood(Number(event.currentTarget.dataset.id));
    });
  });

  updateProgressBar();
  updateSummaryDashboard();
}

function saveToLocalStorage() {
  localStorage.setItem('fitcalc-tracker', JSON.stringify({ foods: trackerState.foods, target: trackerState.target }));
}

function loadFromLocalStorage() {
  const storedTheme = localStorage.getItem('fitcalc-theme');
  const isDark = storedTheme === 'dark';
  const body = document.body;

  if (isDark) {
    body.classList.add('dark');
    document.querySelector('.theme-icon').textContent = '☀️';
  }

  const storedTracker = localStorage.getItem('fitcalc-tracker');
  if (storedTracker) {
    try {
      const parsed = JSON.parse(storedTracker);
      trackerState.foods = Array.isArray(parsed.foods) ? parsed.foods : [];
      trackerState.target = Number(parsed.target) || 2000;
    } catch (error) {
      trackerState.foods = [];
      trackerState.target = 2000;
    }
  }

  document.getElementById('daily-target').value = trackerState.target;
  renderTracker();
}

function handleTargetChange() {
  const value = Number(document.getElementById('daily-target').value);
  trackerState.target = Number.isFinite(value) && value > 0 ? value : 2000;
  document.getElementById('daily-target').value = trackerState.target;
  saveToLocalStorage();
  renderTracker();
}

function clearTracker() {
  trackerState.foods = [];
  saveToLocalStorage();
  renderTracker();
  showToast('Today\'s food log has been cleared.');
}

function resetCalculator(type) {
  if (type === 'bmi') {
    document.getElementById('bmi-form').reset();
    document.getElementById('bmi-score').textContent = '--';
    document.getElementById('bmi-category').textContent = '--';
    document.getElementById('bmi-range').textContent = '--';
    document.getElementById('bmi-explanation').textContent = 'Enter your details to see your BMI summary and category.';
    document.getElementById('bmi-status-badge').textContent = 'Not calculated';
    document.getElementById('bmi-status-badge').className = 'status-badge neutral';
    document.getElementById('bmi-progress-fill').style.width = '0%';
    document.getElementById('dashboard-bmi').textContent = '--';
    document.getElementById('dashboard-category').textContent = '--';
    setFieldError('bmi-error', '');
    return;
  }

  if (type === 'calorie') {
    document.getElementById('calorie-form').reset();
    document.getElementById('bmr-result').textContent = '-- kcal';
    document.getElementById('maintenance-result').textContent = '-- kcal';
    document.getElementById('loss-result').textContent = '-- kcal';
    document.getElementById('gain-result').textContent = '-- kcal';
    document.getElementById('dashboard-bmr').textContent = '--';
    document.getElementById('dashboard-requirement').textContent = '--';
    setFieldError('calorie-error', '');
  }
}

document.addEventListener('DOMContentLoaded', init);
