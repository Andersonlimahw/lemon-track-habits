type HabitDayProps = {
    disabled?: boolean;
}
export const HabitDay = (props: HabitDayProps) => {
    return (
        <div className={`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg ${props.disabled && 'cursor-not-allowed opacity'}`} />
    )
}