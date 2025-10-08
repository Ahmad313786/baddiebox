import nails from './nails.jpg'
import clip from './clip.jpg'
import bracelet from './bracelet.jpg'
import lipgloss from './lipgloss.jpg'
import pendat from './pendat.jpg'
import scrunchie from './scrunchie.jpg'

let products = [
  {
    _id: 1,
    name: "Nails",
    description: "Trendy press-on nails set with a glossy finish for an instant salon look.",
    price: 40,
    image: nails,
    inStock: true,
    quantity: 20
  },
  {
    _id: 2,
    name: "Hair Clip",
    description: "Cute pastel hair clip that adds a pop of color to any hairstyle.",
    price: 25,
    image: clip,
    inStock: true,
    quantity: 35
  },
  {
    _id: 3,
    name: "Bracelet",
    description: "Delicate bracelet with a minimal yet classy charm design.",
    price: 70,
    image: bracelet,
    inStock: true,
    quantity: 15
  },
  {
    _id: 4,
    name: "Lip Gloss",
    description: "Shiny moisturizing lip gloss with a soft pink tint and fruity scent.",
    price: 55,
    image: lipgloss,
    inStock: true,
    quantity: 25
  },
  {
    _id: 5,
    name: "Pendant",
    description: "Elegant pendant necklace with a sparkling crystal centerpiece.",
    price: 90,
    image: pendat,
    inStock: false, // currently out of stock
    quantity: 0
  },
  {
    _id: 6,
    name: "Scrunchie",
    description: "Soft satin scrunchie for a gentle hold and a stylish look.",
    price: 30,
    image: scrunchie,
    inStock: true,
    quantity: 40
  }
]

export default products
