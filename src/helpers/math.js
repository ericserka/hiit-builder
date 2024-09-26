import { c } from "./unitPrefixes"

export const round = (number, decimalPlaces) => parseFloat(number.toFixed(decimalPlaces))

export const calculatePercentage = (number, percentage) => number * percentage * c
