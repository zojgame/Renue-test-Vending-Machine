// import { BanknoteType } from "../components/clientInventory/componets/Banknote";
import { BanknoteType } from '../components/clientInventory';
import { Banknote } from './consts';
import { nanoid } from 'nanoid';

const oneThousand : BanknoteType = {
    value: 1000,
    count: Math.floor(Math.random() * 25),
    id: nanoid(4),
    denomination : Banknote.OneThousand
}

const fiveHundred : BanknoteType = {
    value: 500,
    count: Math.floor(Math.random() * 25),
    id: nanoid(4),
    denomination : Banknote.FiveHundred
}

const oneHundred : BanknoteType = {
    value: 100,
    count: Math.floor(Math.random() * 25),
    id: nanoid(4),
    denomination : Banknote.OneHundred
}

const fifty : BanknoteType = {
    value: 50,
    count: Math.floor(Math.random() * 25),
    id: nanoid(4),
    denomination : Banknote.Fifty
}

const ten : BanknoteType = {
    value: 10,
    count: Math.floor(Math.random() * 25),
    id: nanoid(4),
    denomination : Banknote.Ten
}

const five : BanknoteType = {
    value: 5,
    count: Math.floor(Math.random() * 25),
    id: nanoid(4),
    denomination : Banknote.Five
}

const one : BanknoteType = {
    value: 1,
    count: Math.floor(Math.random() * 25),
    id: nanoid(4),
    denomination : Banknote.One
}

export const vendingMachineBanknotes : BanknoteType[]  = [fiveHundred, oneHundred, fifty, ten, five, one];
export const clientBanknotes : BanknoteType[]  = [oneThousand, fiveHundred, oneHundred, fifty, ten, five, one];