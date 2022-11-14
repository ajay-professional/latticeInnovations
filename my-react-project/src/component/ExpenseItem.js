import './ExpenseItem.css';
function ExpenseItem() { 
    const item1='Food Rs 10';
    const item2='Petrol Rs 100';
    const item3='Movies Rs 200';
    const locationOfExpenditure='Manali'
    return (
        <div id="myReactJsx">
            <h1>Expense Items</h1>
            <h2>{item1} {locationOfExpenditure}</h2>
            <h3>{item2}</h3>
            <h4>{item3} {locationOfExpenditure}</h4>
        </div>
    );
};
export default ExpenseItem;