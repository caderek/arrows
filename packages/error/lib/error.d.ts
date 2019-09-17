declare const _default: {
    create: ({ name, defaultMessage }: {
        name: any;
        defaultMessage?: string;
    }) => {
        new (message?: string): {
            name: string;
            message: string;
            stack?: string;
        };
    };
    toJSON: (error: any) => {
        error: {
            name: any;
            message: any;
            stacktrace: any;
        };
    };
};
export default _default;
