export const randomString = (length?: number, type?: string) => {
    let result = '',
        characters = type === 'number' ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersLength = characters.length,
        stringLength = length ?? 10;
    for ( let i = 0; i < stringLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
