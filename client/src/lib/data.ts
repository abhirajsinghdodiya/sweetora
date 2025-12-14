import jalebi from '../assets/images/jalebi_indian_sweet__de4f5161.jpg';
import kajuKatli from '../assets/images/kaju_katli_new.png';
import mysorePak from '../assets/images/mysore_pak_new.png';
import modak from '../assets/images/modak_new.png';
import gulabJamun from '../assets/images/gulab_jamun_indian_s_0bf07f8a.jpg';
import rasgulla from '../assets/images/rasgulla_white_india_b107dc7c.jpg';

export interface Sweet {
  id: number;
  name: string;
  price: number;
  unit: 'kg' | 'piece';
  image: string;
  stock: number;
  description: string;
  category: string;
}

export const initialSweets: Sweet[] = [
  {
    id: 1,
    name: "Jalebi",
    price: 450,
    unit: 'kg',
    image: jalebi,
    stock: 20,
    description: "Crispy, golden-orange spirals soaked in saffron sugar syrup.",
    category: "Fried"
  },
  {
    id: 2,
    name: "Kaju Katli",
    price: 850,
    unit: 'kg',
    image: kajuKatli,
    stock: 15,
    description: "Premium diamond-shaped cashew fudge with silver leaf.",
    category: "Barfi"
  },
  {
    id: 3,
    name: "Mysore Pak",
    price: 600,
    unit: 'kg',
    image: mysorePak,
    stock: 10,
    description: "Rich, melt-in-your-mouth ghee sweet from Mysore.",
    category: "Ghee"
  },
  {
    id: 4,
    name: "Modak",
    price: 500,
    unit: 'kg',
    image: modak,
    stock: 25,
    description: "Steamed rice dumplings filled with coconut and jaggery.",
    category: "Steamed"
  },
  {
    id: 5,
    name: "Gulab Jamun",
    price: 30,
    unit: 'piece',
    image: gulabJamun,
    stock: 100,
    description: "Soft milk-solid balls soaked in rose-flavored sugar syrup.",
    category: "Syrup"
  },
  {
    id: 6,
    name: "Rasgulla",
    price: 30,
    unit: 'piece',
    image: rasgulla,
    stock: 100,
    description: "Spongy cottage cheese balls cooked in light sugar syrup.",
    category: "Syrup"
  }
];
