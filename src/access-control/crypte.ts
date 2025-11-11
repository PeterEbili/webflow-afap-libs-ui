// crypto-utils.ts
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const SECRET = 'e0nxgjl14fg'; // Change this to something unique per build Math.random().toString(36).slice(2)

async function getKey(): Promise<CryptoKey> {
    const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(SECRET), { name: 'PBKDF2' }, false, [
        'deriveKey',
    ]);

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode('unique-salt'),
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

export async function encrypt(data: string): Promise<string> {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(data));
    const buffer = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
    return btoa(String.fromCharCode(...buffer));
}

export async function decrypt(encoded: string): Promise<string> {
    const data = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);
    const key = await getKey();
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
    return decoder.decode(decrypted);
}
