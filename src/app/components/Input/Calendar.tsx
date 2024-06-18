"use client"
/**
 * RangeKeyDict的结构
 *const [state, setState] = useState<RangeKeyDict>({
    selection1: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection1'
    },
    selection2: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection2'
    }
  });
 */
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"

interface CalendarProps{
    value:Range;
    onChange:(value:RangeKeyDict)=>void;
    disabledDates?:Date[]
}
const Calendar:React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates
}) => {
  return (
   <DateRange 
    rangeColors={["#262626"]}
    ranges={[value]}
    date={new Date()}
    onChange={onChange}
    direction="vertical"
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
   />
  );
};
export default Calendar;