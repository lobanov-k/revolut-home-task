const APP_ID = 'bbf89e3ef2f24db48299d4aae2d55dee';

export const getRates = async () => {
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`);
    return response.json();
};
