document.getElementById('generate-btn').addEventListener('click', async () => {
  const ingredients = document.getElementById('ingredients').value;
  if (!ingredients) {
    alert('Please enter some ingredients!');
    return;
  }

  // Show loading animation
  document.querySelector('.output-section').style.display = 'block';
  document.getElementById('loading').style.display = 'flex';
  document.getElementById('recipe-output').style.display = 'none';

  try {
    // Call Groq Cloud API (replace with your API key and endpoint)
    const response = await fetch('https://api.groq.com/v1/recipes/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_GROQ_API_KEY`
      },
      body: JSON.stringify({ ingredients })
    });

    const data = await response.json();
    const recipe = data.recipe;

    // Display the generated recipe
    document.getElementById('loading').style.display = 'none';
    document.getElementById('recipe-output').style.display = 'block';
    document.getElementById('recipe-output').innerHTML = `
      <h2>Your Recipe</h2>
      <p>${recipe}</p>
    `;
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('recipe-output').innerHTML = `<p>Error generating recipe. Please try again.</p>`;
  }
});
