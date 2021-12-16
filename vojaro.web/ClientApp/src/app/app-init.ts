export function initializer(): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}
