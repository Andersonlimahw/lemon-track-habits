import * as Popover from '@radix-ui/react-popover';
import { X } from 'phosphor-react';
type HabitDayProps = {
    disabled?: boolean;
}



export const HabitDay =  (props: HabitDayProps ) => (
  <Popover.Root>
    <Popover.Trigger className={`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg ${props.disabled && 'cursor-not-allowed opacity-40'}`} />
    {/* <Popover.Anchor /> */}
    <Popover.Portal>
      <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
        <Popover.Close>
             <X 
              size={24}
              className='text-zinc-400'
             />
        </Popover.Close>
        <Popover.Arrow
            height={8}
            width={16}
            className='fill-zinc-900'
         />
        <span className='font-semibold text-zinc-400'>terça-feira</span>
        <span className='mt-1 font-extrabold leading-tight text-3xl' >17/01</span>

        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div className="h-3 rounded-xl bg-violet-600  w-3/4">
                
            </div>
        </div>
        
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default HabitDay;