import React, { ReactNode, useState } from 'react'
const pizzaDimensions = 400
const plateDimensions = pizzaDimensions + 50
const PizzaFactory = () => {
    const [pizza, setPizza] = useState({ ...pizzaSchema })
    const handleCrust = (value: Tcrust) => {
        setPizza(p => ({ ...p, crust: value }))
    }
    const crustOptions = crustOptionsArr?.map(crust => {
        const isSelected = pizza.crust === crust.name
        return <button key={crust} style={{ backgroundColor: isSelected ? crust.color : "#000" }} onClick={() => handleCrust(crust.name)}>
            {crust.name}
        </button>
    })
    return (
        <div>
            <Pizza pizzaData={pizza} />
            {crustOptions}
        </div>
    )
}

const crustOptionsArr: { name: Tcrust, color: string }[] = [{ name: 'Classic Dough', color: "#dad000" }, { name: 'Thick Crust', color: "#aaf000" }, { name: 'Thin Crust', color: "#ffad00" }]

export default PizzaFactory


const Pizza = ({ pizzaData }: { pizzaData: TpizzaSchema }) => {
    const { cheese, crust, toppings, sauce } = pizzaData
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Plate />
        <Crust crust={crust} />
        <Sauce sauce={sauce} />
        <Cheese cheese={cheese} />
        <Topping topping={toppings} />
        { }
    </div>
}

const Plate = () => {
    return <div style={{ height: plateDimensions, width: plateDimensions, backgroundColor: "#384044", borderRadius: "100%" }}></div>
}


const Crust = ({ crust }: { crust: Tcrust }) => {
    const crustMap: Record<Tcrust, ReactNode> = {
        'Classic Dough': <div style={{ height: pizzaDimensions, width: pizzaDimensions, borderRadius: "100%", backgroundColor: "#dad000" }}></div>,
        'Thick Crust': <div style={{ height: pizzaDimensions, width: pizzaDimensions, borderRadius: "100%", backgroundColor: "#aaf000" }}></div>,
        'Thin Crust': <div style={{ height: pizzaDimensions, width: pizzaDimensions, borderRadius: "100%", backgroundColor: "#ffad00" }}></div>
    }

    return <div style={{ position: "absolute" }}>
        {crustMap[crust] ?? <div></div>}
    </div>
}
const Sauce = ({ sauce }: { sauce: Tsauce }) => {
    const sauceMap: Record<Tsauce, ReactNode> = {
        'Tomato Sauce': <div></div>,
        'White Sauce': <div></div>,

    }
    return <div>
        {sauceMap[sauce] ?? <div></div>}
    </div>
}
const Cheese = ({ cheese }: { cheese: Tcheese }) => {
    return <div></div>
}

const Topping = ({ topping }: { topping: Ttopping }) => {
    return <div></div>
}


const pizzaSchema: TpizzaSchema = {
    crust: "Classic Dough",
    sauce: "Tomato Sauce",
    cheese: "Cheddar",
    toppings: "pepperoni",
}

type TpizzaSchema = {
    crust: Tcrust
    sauce: Tsauce
    cheese: Tcheese
    toppings: Ttopping
}
type Tcrust = "Classic Dough" | "Thin Crust" | "Thick Crust"
type Tsauce = "Tomato Sauce" | "White Sauce"
type Tcheese = "Mozzarella" | "Cheddar" | "Parmesan"
type Ttopping = 'pepperoni' | 'sausage' | 'ham' | 'bacon' | 'chicken' | 'ground-beef' | 'salami';
