import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { pricePerItem } from '../constants';

//format number as currency
function formatCurrency(amount){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount)
}

const OrderDetails = createContext();

// create custom hook to check wether we're inside a provider
export function useOrderDetails() {
    const context = useContext(OrderDetails);
    if (!context) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider'
        )
    }
    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    // we loop on the MAP object with a for of, to have the value of each option (vanilla: 1, chocolate : 2,)
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }
    //normally, the unit price come form the server but here we set it in folder constants 
    return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
    // internal state of provider
    const [optionCounts, setOptioncounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    });
    // a separate state for total
    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    })
    // a useEffect to uodate total
    useEffect(() => {
        //we define intermediate subTotal (like the total state) with the same function
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
        const grandTotal = scoopsSubtotal + toppingsSubtotal
        // we set state
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal),
        });

    }, [optionCounts])

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            // make a copy first of the state
            const newOptionCounts = { ...optionCounts }

            // update option counts for this item with the new value

            // define a const with relation to Map inside state
            const optionCountsMap = optionCounts[optionType];
            // we will set the OptionType (scoop or toppings) MAP object with itemName and Item Total
            optionCountsMap.set(itemName, parseInt(newItemCount))

            setOptioncounts(newOptionCounts)

        }
        //getter : object containing options component counts for scoops and toppings, subtotal, total (spreading the state {...optionCounts})
        //setter : update options count the setter will be a function.
        // need to return total
        return [{ ...optionCounts, totals }, updateItemCount];
    }, [optionCounts, totals])

    return <OrderDetails.Provider value={value}{...props} />;
}

