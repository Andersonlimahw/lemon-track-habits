import * as Progress from '@radix-ui/react-progress';

export type ProgressBarProps = {
    progress: number;
}

export const ProgressBar = (props: ProgressBarProps) => {
    return (
        <Progress.Root
            className="h-3 rounded-xl bg-zinc-700 w-full mt-4"
            value={props.progress}
        >
            <Progress.Indicator
                className="h-3 rounded-xl bg-violet-600  w-3/4"                
            />            
        </Progress.Root>
    );
};

export default ProgressBar;