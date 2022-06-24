

export const ConvertDate = (date) => {
    const dateObj = new Date(date)

    const monthNameLong = dateObj.toLocaleString("en-US", { month: "long" });

    const dayNumber = dateObj.toLocaleString("en-US", { day: "numeric"})
    const plusOne = parseInt(dayNumber) + 1


    return <>
        {monthNameLong} {plusOne}
        </>
}