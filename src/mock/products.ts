import { ProductType } from "../components/vendingMachine/components/Product/types";
import {nanoid} from 'nanoid';
import cola from './assets/cola.png';
import battery from './assets/battery.png';
import marshmallow from './assets/marshmallow.png';
import oreo from './assets/oreo.png';
import fishingTool from './assets/fishingTool.png';
import boat from './assets/boat.png';
import apple from './assets/apple.png';
import chocolate from './assets/chocolate-bar.png';

const colaProduct : ProductType = {
    title: 'Кока-кола', 
    image: cola,
    description: 'Холодная кола, приятное дополнение в жаркий летний день',
    price: 60,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

const marshmallowProduct : ProductType = {
    title: 'Маршмэло', 
    image: marshmallow,
    description: 'Сладкое маршмэло (рекомендуется жарить на костре)',
    price: 45,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

const batteryProduct : ProductType = {
    title: 'Аккумулятор', 
    image: battery,
    description: 'Необходимая вещь, для дальних поездок на природу',
    price: 700,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

const oreoProduct : ProductType = {
    title: 'Oreo', 
    image: oreo,
    description: 'Вкусное печенье',
    price: 79,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

const fishingToolProduct : ProductType = {
    title: 'Удочка', 
    image: fishingTool,
    description: 'Удочка для ловли рыбы',
    price: 800,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

const boatProduct : ProductType = {
    title: 'Надувная лодка', 
    image: boat,
    description: 'Надувная лодка, в комплекте идёт насос и вёсла',
    price: 1600,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

const appleProduct : ProductType = {
    title: 'Яблоко', 
    image: apple,
    description: 'Свежее яблоко',
    price: 15,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

const chocolateProduct : ProductType = {
    title: 'Шоколад', 
    image: chocolate,
    description: 'Тёмный шоколад 80% какао',
    price: 89,
    id: nanoid(4),
    count: Math.floor(Math.random() * 20)
}

export const products = [
    colaProduct, marshmallowProduct, batteryProduct,
    oreoProduct, fishingToolProduct, boatProduct,
    appleProduct, chocolateProduct
]