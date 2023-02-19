import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'phosphor-react';
import { NewHabitForm } from '../../Form/NewHabit';

export const DialogHabit = () => (
    <Dialog.Root>
        <Dialog.Trigger
            className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex item-center gap-3 hover:border-violet-500'
        >
            <Plus
                size={20}
                className="text-violet-500"
            />
            Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
            <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Close asChild>
                    <X
                        size={24}
                        aria-label="fechar"
                        className='absolute text-zinc-400 hover:text-zinc-200 right-6 top-6 cursor-pointer'
                    />
                </Dialog.Close>
                <Dialog.Title
                    className="text-white text-3xl font-extrabold leading-tight"
                >
                   Criar hábito
                </Dialog.Title>
                <Dialog.Description className="text-white p-10">
                    <NewHabitForm />
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

export default DialogHabit;