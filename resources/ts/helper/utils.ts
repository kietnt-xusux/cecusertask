import {ListBoxOption} from "@/helper/type";

export const textNumber = (text:string) => {
    let regex = RegExp( '[０１２３４５６７８９　]', 'g' );
    return text.replace(regex, function (character) {
        // Get the position of the found character in the search string.
        let index = '０１２３４５６７８９　'.indexOf(character);
        // Get the corresponding character from the replace string.
        return '0123456789 '.charAt(index);
    });
}

export const processDecimalNumber = (text: string, separate?: string) => {
    let decimal = ',';
    if (!text || text.trim() === '') return '';
    if (!separate) separate = '.';
    if (separate === ',') decimal = '.';
    let output = text.split(separate),
        firstOutput = output.shift() ?? '',
        intOutput = firstOutput.replaceAll(decimal, '');
    return new Intl.NumberFormat().format(parseInt(intOutput)) + (output.length ? '.' + output.join('') : '');
}

export const strToUnicodeArray = (str: string) => {
    let arr = [];
    for( let i = 0; i < str.length; i ++ ){
        arr.push( str.charCodeAt( i ) );
    }
    return arr;
}

export const getAdminRoute = () => {
    return 'admin'
}

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

export const getRole = (role: string) => {
    if (role === 'admin') return 'アドミン';
    return 'ユーザー';
}

export const currencyNumber = (number: number | string | undefined, withCurrencyText?: boolean): string => {
    if (!number) return '0';
    let text = number.toString().replaceAll(',', '');
    return (withCurrencyText ? '¥' : '') + new Intl.NumberFormat().format(Math.round(parseFloat(text)));
}

export const currencyNumberV1 = (number: number | string | undefined, withCurrencyText?: boolean): string => {
    if (!number) return '';
    let text = number.toString().replaceAll(',', '');
    return (withCurrencyText ? '¥' : '') + new Intl.NumberFormat().format(Math.round(parseFloat(text)));
}

export const calcPercent = ( value1: number, value2: number, decimal?: number, output?: string): string | number => {
    if (!value1 || !value2) return '0%';
    let u1 = decimal === 1 ? 1000 : (decimal === 0 ? 100 :10000),
        u2 = decimal === 1 ? 10 : (decimal === 0 ? 1 :100);
    return output === 'number' ? Math.round(value1 / value2 * u1) / u2:
        Math.round(value1 / value2 * u1) / u2 + '%';
}

export const loadFont = async () => {
    // @ts-ignore
    if (fontRegular && fontBold) return { fontRegular, fontBold };
    let loadedFontRegular, loadedFontBold;
    // @ts-ignore
    fontRegular = await fetch(baseUrl + "/fonts/SauceHanSansJP.ttf").then(res => res.arrayBuffer());
    // @ts-ignore
    fontBold = await fetch(baseUrl + "/fonts/SourceHanSerifJP-Bold.otf").then(res => res.arrayBuffer());
    // @ts-ignore
    return { fontRegular: fontRegular, fontBold: fontBold };
}

export const getHourOptions = (): ListBoxOption[] => {
    let result: ListBoxOption[] = [
        { id: 99, value: 99, name: '選択' }
    ], hour, minute, hourText;
    for (let i = 0; i <= 47; i++) {
        hour = Math.floor(i/2);
        hourText = hour > 9 ? hour + '' : '0' + hour;
        minute = i % 2 === 1 ? '30' : '00';
        result.push({ id: i, value: i, name: hourText + ':' + minute })
    }
    return result;
}

export const getWeekday = (date: Date) => {
    let day = date.getDay();
    if (day === 0) return '日曜日';
    if (day === 1) return '月曜日';
    if (day === 2) return '火曜日';
    if (day === 3) return '水曜日';
    if (day === 4) return '木曜日';
    if (day === 5) return '金曜日';
    return '土曜日';
}

export const stringToNumber = (text: string | undefined) => {
    if (!text) return 0;
    if (text.trim() === '') return 0;
    let tmp = text.replaceAll(',', '');

    return parseInt(tmp);
}

export const convertStringToNumberOnChange = (e: any) => {
    const value = e.target.value;

    if (value.match(/[０-９]+/g) && e.nativeEvent.inputType == 'insertCompositionText') {
        return stringToNumber(textNumber(value));
    } else {
        return stringToNumber(value);
    }
}

export const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(' ')
}

export const getDefaultConditions = () => {
    return {
        searchText: '',
        page: 1,
        perPage: 25,
        lastPage: 1,
        sortField: '',
        sortValue: ''
    }
}

export const getListPerpage = (): ListBoxOption[] => {
    return [
        { id: 1, value: 25, name: '25' },
        { id: 2, value: 50, name: '50' },
        { id: 3, value: 100, name: '100' },
        { id: 4, value: 200, name: '200' },
        { id: 5, value: 500, name: '500' },
    ]
}
