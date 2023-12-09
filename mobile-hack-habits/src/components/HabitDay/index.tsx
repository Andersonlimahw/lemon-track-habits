import { TouchableOpacity, Dimensions } from "react-native"
import React from 'react';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

type HabitDayProps = {
    disabled?: boolean
}

export const HabitDay = (props: HabitDayProps) => {

    return(
        <TouchableOpacity
            className={`${props.disabled && 'opacity-40'} bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800`}
            style={{
                width: DAY_SIZE, 
                height: DAY_SIZE
            }}
        >
        </TouchableOpacity>
    )
}