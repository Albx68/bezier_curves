import data from "./data.json"

export const getData = () => {
    let finalData = []
    data?.data?.forEach(el => {
        let currentData: typeof el = {

        }
        const filterSet = new Set(["lead"])

        const attributeArr = ["adset_name", "campaign_name", "clicks", "reach", "spend", "cost_per_action_type", "cpm", "cost_per_unique_click", "social_spend", "impressions", "date_start", "date_stop"]

        attributeArr.forEach(attribute => {
            if (attribute === "cost_per_action_type") {
                currentData.lead = el.cost_per_action_type.filter(el => filterSet.has(el.action_type))[0]
            }
            else {
                currentData[attribute] = el[attribute]
            }
        })

        finalData.push(currentData)
    })
    return finalData
}

