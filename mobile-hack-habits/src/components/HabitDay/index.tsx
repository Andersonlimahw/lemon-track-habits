import { TouchableOpacity, Dimensions } from "react-native"
import React from 'react';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

type HabitDayProps = {
    disabled?: boolean,
    handleClick?: Function,
    percentual: number,
}

export const HabitDay = (props: HabitDayProps) => {
    const variant = () => {
        if (props.disabled) {
            return 'opacity-40 bg-zinc-800';
        }       
        if (props.percentual <= 10  && props.percentual < 30) {
            return 'bg-violet-300';
        }
        if (props.percentual > 30 && props.percentual < 70) {
            return 'bg-violet-500';
        }
        return 'bg-violet-900'
    }

    return (
        <TouchableOpacity
            className={`${variant()} rounded-lg border-2 m-1 border-zinc-800`}
            style={{
                width: DAY_SIZE,
                height: DAY_SIZE
            }}
            onPress={() => props.handleClick && props.handleClick()}
        >
        </TouchableOpacity>
    )
}