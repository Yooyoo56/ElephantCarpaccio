/** Short ReadMe: How to use?
 * 1) Compile by: tsc app.ts
 * 2) Open Live server
 */

document.body.style.fontFamily = "Arial, sans-serif"; // You can change Arial to any font you prefer

// Create a message variable for display in the heading
let message: string = "[ Bienvenue sur le Calculateur de Commande! 🛒 ] ";

let contributors: string =
	"Projet réalisé par: Aïssetou SACKO🧋  Yoojeong TAK🌵  Wenchi WANG🍬 ";

let subHeading = document.createElement("h2");
subHeading.textContent = contributors;

// Create a new heading element
let heading = document.createElement("h1");
heading.textContent = message;

document.body.appendChild(heading);
document.body.appendChild(subHeading);

// Create the form element
let form = document.createElement("form");

// Create the 'Quantité' field
let quantityLabel = document.createElement("label");
quantityLabel.textContent = "Quantité:";
quantityLabel.setAttribute("for", "quantity");
let quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.id = "quantity";
quantityInput.name = "quantity";
quantityInput.min = "1"; // Ensure the value is greater than 0
quantityInput.required = true;

form.appendChild(quantityLabel);
form.appendChild(quantityInput);
form.appendChild(document.createElement("br"));

// Create the 'Prix de l’article' field
let priceLabel = document.createElement("label");
priceLabel.textContent = "Prix de l’article ($):";
priceLabel.setAttribute("for", "price");
let priceInput = document.createElement("input");
priceInput.type = "number";
priceInput.id = "price";
priceInput.name = "price";
priceInput.min = "1"; // Ensure the value is greater than 0
priceInput.required = true;

form.appendChild(priceLabel);
form.appendChild(priceInput);
form.appendChild(document.createElement("br"));

// Create the 'État' field (dropdown list)
let stateLabel = document.createElement("label");
stateLabel.textContent = "État:";
stateLabel.setAttribute("for", "state");
let stateSelect = document.createElement("select");
stateSelect.id = "state";
stateSelect.name = "state";

// Add options to the state dropdown list
let states = ["UT", "NV", "TX", "AL", "CA"];
states.forEach((state) => {
	let option = document.createElement("option");
	option.value = state;
	option.textContent = state;
	stateSelect.appendChild(option);
});

form.appendChild(stateLabel);
form.appendChild(stateSelect);
form.appendChild(document.createElement("br"));

// Create the Submit button
let submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";

form.appendChild(submitButton);

// Append the form to the document body
document.body.appendChild(form);

// Create a container to display results
let resultsDiv = document.createElement("div");
resultsDiv.id = "results";
document.body.appendChild(resultsDiv);

// Function to calculate discount based on the total price
const calculateDiscount = (total: number): number => {
	let discountRate = 0;

	// Apply discount based on total value
	if (total >= 1000 && total < 5000) {
		discountRate = 0.03; // 3%
	} else if (total >= 5000 && total < 7000) {
		discountRate = 0.05; // 5%
	} else if (total >= 7000 && total < 10000) {
		discountRate = 0.07; // 7%
	} else if (total >= 10000 && total < 50000) {
		discountRate = 0.1; // 10%
	} else if (total >= 50000) {
		discountRate = 0.15; // 15%
	}

	// Return the total after applying discount
	return total - total * discountRate;
};

// Function to calculate tax based on the state
const calculateTax = (total: number, state: string): number => {
	let taxRate = 0;

	// Tax rates per state
	switch (state) {
		case "UT":
			taxRate = 0.0685; // 6.85%
			break;
		case "NV":
			taxRate = 0.08; // 8%
			break;
		case "TX":
			taxRate = 0.0625; // 6.25%
			break;
		case "AL":
			taxRate = 0.04; // 4%
			break;
		case "CA":
			taxRate = 0.0825; // 8.25%
			break;
		default:
			break;
	}

	// Return the calculated tax
	return total * taxRate;
};

// Add event listener to handle form submission
form.addEventListener("submit", (event) => {
	event.preventDefault(); // Prevent the default form submission

	const quantity = Number(quantityInput.value);
	const price = Number(priceInput.value);
	const state = stateSelect.value;

	if (quantity > 0 && price > 0) {
		// Calculate total price without discount and taxes
		const totalPrice = quantity * price;

		// Calculate price after discount
		const discountedPrice = calculateDiscount(totalPrice);

		// Calculate tax
		const tax = calculateTax(discountedPrice, state);

		// Total after applying taxes
		const totalWithTaxes = discountedPrice + tax;

		// Update results on the page
		resultsDiv.innerHTML = `
			<h2>Résultats:</h2>
			<p><strong>Total sans remise ni taxes:</strong> $${totalPrice.toFixed(2)}</p>
			<p><strong>Total après remise:</strong> $${discountedPrice.toFixed(2)}</p>
			<p><strong>Taxe (${state}):</strong> $${tax.toFixed(2)}</p>
			<p><strong>Total final (avec taxes):</strong> $${totalWithTaxes.toFixed(2)}</p>
		`;

		// Log the results to the console
		console.log(`Quantité: ${quantity}, Prix: ${price}`);
		console.log(`Total sans remise ni taxes: $${totalPrice.toFixed(2)}`);
		console.log(`Total après remise: $${discountedPrice.toFixed(2)}`);
		console.log(`Taxe (${state}): $${tax.toFixed(2)}`);
		console.log(`Total final (avec taxes): $${totalWithTaxes.toFixed(2)}`);
	} else {
		resultsDiv.innerHTML =
			"<p style='color:red;'>Veuillez remplir tous les champs correctement.</p>";
		alert(
			"Veuillez vérifier que tous les champs respectent les conditions de validation."
		);
	}
});
