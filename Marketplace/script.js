// Example business data
const businesses = [
    { category: "clothing", name: "Clothing Business 1", logo: "img/clothing1.jpeg", link: "#" },
    { category: "clothing", name: "Clothing Business 2", logo: "img/clothing2.jpeg", link: "#" },
    { category: "clothing", name: "Clothing Business 3", logo: "img/clothing3.jpeg", link: "#" },
    { category: "technology", name: "Tech Business 1", logo: "img/tech1.jpeg", link: "#" },
    { category: "technology", name: "Tech Business 2", logo: "img/tech2.jpeg", link: "#" },
    { category: "technology", name: "Tech Business 3", logo: "img/tech3.jpeg", link: "#" },
    { category: "cosmetic", name: "Cosmetic Business 1", logo: "img/cos1.jpeg", link: "#" },
    { category: "cosmetic", name: "Cosmetic Business 2", logo: "img/cos2.jpeg", link: "#" },
    { category: "cosmetic", name: "Cosmetic Business 3", logo: "img/cos3.jpeg", link: "#" },
    { category: "groceries", name: "Grocery Business 1", logo: "img/grocery1.jpeg", link: "#" },
    { category: "groceries", name: "Grocery Business 2", logo: "img/grocery2.jpeg", link: "#" },
    { category: "groceries", name: "Grocery Business 3", logo: "img/grocery3.jpeg", link: "#" },
];

// Function to create a business element
function createBusinessElement(business) {
    const businessElement = document.createElement("div");
    businessElement.classList.add("business");

    const logoElement = document.createElement("img");
    logoElement.src = business.logo;
    logoElement.alt = business.name + " Logo";

    const nameElement = document.createElement("p");
    nameElement.textContent = business.name;

    const linkElement = document.createElement("a");
    linkElement.href = business.link;
    linkElement.appendChild(logoElement);
    linkElement.appendChild(nameElement);

    businessElement.appendChild(linkElement);

    return businessElement;
}

// Function to populate businesses in a category
function populateBusinesses(category, containerId) {
    const container = document.getElementById(containerId);

    businesses.filter(business => business.category === category)
              .forEach(business => {
                  const businessElement = createBusinessElement(business);
                  container.appendChild(businessElement);
              });
}

// Populate businesses for each category
populateBusinesses("clothing", "clothing-businesses");
populateBusinesses("technology", "technology-businesses");
populateBusinesses("cosmetic", "cosmetic-businesses");
populateBusinesses("groceries", "groceries-businesses");
