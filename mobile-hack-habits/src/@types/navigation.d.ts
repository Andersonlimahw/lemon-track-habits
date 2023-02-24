export declare global { 
    namespace  ReactNavigation {
        interface RootParamList {
            home: undefined;
            new: undefined;
            habit: {
                date: string; // parametro passados de uma rota para a outra., recomendado id ou algo simples
            }
        }
    }
}