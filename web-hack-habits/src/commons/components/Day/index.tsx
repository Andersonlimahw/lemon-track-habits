type DaysProps  = {
    description: string;
}

export const Day = (props : DaysProps) => {
    return (
        <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">
            {props.description}
        </div>
    )
}