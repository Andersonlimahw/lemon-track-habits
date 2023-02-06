import { Day } from "../Day";

const weekDays = [
    'D', 
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S'
];

export const SummaryTable = () => {

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekDays.map((day, index) => (
                        <Day
                         key={`${day}_${index}`}
                         description={day} 
                        />
                    ))
                }
            </div>
        </div>
    )
}