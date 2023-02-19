import { Day } from "../Day";
import { generateDatesFromYearBeginning } from '../../utils/generate-date-from-year-beginning';
import HabitDay from "../Radix/Popover";

const weekDays = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S'
];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = (18 * 7);
const amountDaysToFill = (minimumSummaryDatesSize - summaryDates.length);

export const SummaryTable = (): any => {

    return (
        <div className="w-full flex max-w-5xl">
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
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summaryDates.map((date) => (
                        <HabitDay 
                            key={date.toString()} 
                            amount={5}
                            completed={Math.round(Math.random() * 5)}
                        />))
                }
                {
                    amountDaysToFill > 0 && Array.from((
                        {
                            length: amountDaysToFill
                        }
                    )).map((_, index) => (
                        <HabitDay
                            key={index}
                            amount={0}
                            completed={0}
                            disabled                            
                        />))
                }
            </div>

        </div>
    )
}