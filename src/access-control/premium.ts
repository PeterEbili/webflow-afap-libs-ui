// premium.ts
import { dbGet as get, dbSet as set } from './db';
import { encrypt, decrypt } from './crypte';
import { LIB_URL, LIB_CERTs } from './constant';

const STORAGE_KEY = LIB_CERTs.lib + LIB_CERTs.star + LIB_CERTs.token; // 'LibraryStarToken';
const EXPIRY_HOURS = 24;
const API_URL =
    LIB_URL + '/' + LIB_CERTs.verify.toLowerCase() + '-' + LIB_CERTs.access.toLowerCase() + '-' + LIB_CERTs.keyof + '/'; // verify-access

interface EncryptedPayload {
    key: string;
    expiry: number;
}

export async function verifyKeyWithServer(key: string): Promise<boolean> {
    try {
        const response = await fetch(API_URL + key, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const result = await response.json();
            //console.log('Key verification result:', result);
            return result.status;
        }
    } catch (err) {
        //console.error('Key verification failed:', err);
        return false;
    }
    return false;
}

export async function getStarKeyFromDB(): Promise<string> {
    let starKey = '';
    try {
        const encryptedStored = await get(STORAGE_KEY);
        if (encryptedStored) {
            const json = await decrypt(encryptedStored);
            const data: EncryptedPayload = JSON.parse(json);

            starKey = data.key;
        }
    } catch (err) {
        console.error(err);
        //console.warn('Could not read encrypted token:', err);
    }
    window.STARUSER_LIB_KEY_AFAP = starKey;
    return starKey;
}

export async function saveStarKeyToDB(userKey: string): Promise<boolean> {
    const payload: EncryptedPayload = {
        key: userKey,
        expiry: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
    };
    try {
        const encrypted = await encrypt(JSON.stringify(payload));
        await set(STORAGE_KEY, encrypted);
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function initPremiumAccess(): Promise<boolean> {
    // Check if the user key is already set in the window object
    const userKey = window.STARUSER_LIB_KEY_AFAP || (await getStarKeyFromDB());
    // If the user key is not set, try to retrieve it from the DOM
    if (!userKey) return false;

    try {
        const encryptedStored = await get(STORAGE_KEY);
        if (encryptedStored) {
            const json = await decrypt(encryptedStored);
            const data: EncryptedPayload = JSON.parse(json);

            if (data.key === userKey && Date.now() < data.expiry) {
                return true; // Valid and not expired
            }
        }
    } catch (err) {
        //console.warn('Could not read encrypted token:', err);
    }

    const isValid = await verifyKeyWithServer(userKey);
    if (isValid) {
        const payload: EncryptedPayload = {
            key: userKey,
            expiry: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
        };
        const encrypted = await encrypt(JSON.stringify(payload));
        await set(STORAGE_KEY, encrypted);
    }

    return isValid;
}

export function retrieveKey(): string {
    let userKey = window.STARUSER_LIB_KEY_AFAP || '';
    // find key from element attribute
    if (!userKey) {
        const keyAttr = `${LIB_CERTs.af.toLowerCase()}-premium`; // af-premium
        const elementWithKey = document.querySelector(`[${keyAttr}]`);
        if (elementWithKey) {
            const keyvalue = elementWithKey.getAttribute(keyAttr) as string;
            if (keyvalue) {
                userKey = keyvalue;
            }
        }
    }

    // find key script tag elements and get the key from the src url
    // Example: <script src="https://afap.app/cdn/scrip.js?afapkey=123455"></script>
    if (!userKey) {
        const scriptTags = document.querySelectorAll('script[src]');
        for (const script of scriptTags) {
            const src = script.getAttribute('src') as string;
            const keyMatch = src.match(/[\?\&]afapkey=([^\&]+)/);
            if (keyMatch && keyMatch[1]) {
                userKey = keyMatch[1].toString();
                break;
            }
        }
    }

    window.STARUSER_LIB_KEY_AFAP = userKey;
    return userKey;
}
retrieveKey();
