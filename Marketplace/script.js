const businesses = [
    { category: "clothing", name: "Marty's Clothing Store", logo: "img/clothing1.jpeg", link: "#" },
    { category: "clothing", name: "Fashion Shop", logo: "img/clothing2.jpeg", link: "#" },
    { category: "clothing", name: "Wandery Jeans", logo: "img/clothing3.jpeg", link: "#" },
    { category: "technology", name: "Girl Tech", logo: "img/tech1.jpeg", link: "#" },
    { category: "technology", name: "Creative Technology", logo: "img/tech2.jpeg", link: "#" },
    { category: "technology", name: "Hexagon", logo: "img/tech3.jpeg", link: "#" },
    { category: "cosmetic", name: "Beauty Bee", logo: "img/cos1.jpeg", link: "#" },
    { category: "cosmetic", name: "Beauty By Misha", logo: "img/cos2.jpeg", link: "#" },
    { category: "cosmetic", name: "Cosmeteco", logo: "img/cos3.jpeg", link: "#" },
    { category: "groceries", name: "Shop Grocery", logo: "img/grocery1.jpeg", link: "#" },
    { category: "groceries", name: "Organic Grocery", logo: "img/grocery2.jpeg", link: "#" },
    { category: "groceries", name: "Fruit Store", logo: "img/grocery3.jpeg", link: "#" },
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

populateBusinesses("clothing", "clothing-businesses");
populateBusinesses("technology", "technology-businesses");
populateBusinesses("cosmetic", "cosmetic-businesses");
populateBusinesses("groceries", "groceries-businesses");
