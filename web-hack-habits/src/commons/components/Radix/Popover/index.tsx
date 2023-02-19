import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { X } from 'phosphor-react';
import ProgressBar from '../Progress';
type HabitDayProps = {
    disabled?: boolean;
    completed: number;
    amount: number;
}


export const HabitDay = (props: HabitDayProps) => {
    const completedPercentage = Math.round(props.completed / props.amount) * 100;
    const percentualRange = () =>({
        incomplet: completedPercentage === 0,
        initial: completedPercentage > 0 && completedPercentage < 20,
        medium: completedPercentage >= 20 && completedPercentage < 40,
        nice: completedPercentage >= 40 && completedPercentage < 60,
        veryNice: completedPercentage >= 60 && completedPercentage < 60,
        completed: completedPercentage >= 80,
    });

    const progressClassName = () => clsx(`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg`, {
        'cursor-not-allowed opacity-40': props.disabled,
        'bg-zinc-900 boder-zinc-800': percentualRange().incomplet,
        'bg-violet-900 border-violet-700': percentualRange().initial,
        'bg-violet-800 border-violet-600': percentualRange().medium,
        'bg-violet-700 border-violet-500': percentualRange().nice,
        'bg-violet-600 border-violet-500': percentualRange().veryNice,
        'bg-violet-500 border-violet-400': percentualRange().completed
    });

    return (
        <Popover.Root>
            <Popover.Trigger
                className={progressClassName()}
            />
            <Popover.Portal>
                <Popover.Content
                    className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'
                >
                    {/* <Popover.Close>
                        <X
                            size={24}
                            className='text-zinc-400'
                        />
                    </Popover.Close> */}
                    <Popover.Arrow
                        height={8}
                        width={16}
                        className='fill-zinc-900'
                    />
                    <span className='font-semibold text-zinc-400'>Meditar</span>
                    <span className='font-semibold text-zinc-400'>terça-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl' >17/01</span>

                    <ProgressBar progress={completedPercentage} />

                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
};

export default HabitDay;