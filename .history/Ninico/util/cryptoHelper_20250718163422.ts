import CryptoJS from 'crypto-js';

// Get encryption key from environment variables
const getEncryptionKey = (): string => {
    const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    console.log('🔑 Frontend DEBUG: Checking encryption key...');
    console.log('🔑 Key exists:', !!key);
    console.log('🔑 Key length:', key?.length || 0);
    console.log('🔑 Key value:', key ? key.substring(0, 8) + '...' : 'UNDEFINED');
    
    if (!key) {
        console.error('❌ NEXT_PUBLIC_ENCRYPTION_KEY is not defined in environment variables');
        throw new Error('NEXT_PUBLIC_ENCRYPTION_KEY is not defined in environment variables');
    }
    return key;
};

/**
 * Encrypts any data (object, string, number, etc.) and returns a cipher string
 * @param data - The data to encrypt
 * @returns Encrypted string
 */
export const encryptData = (data: any): string => {
    try {
        const key = getEncryptionKey();
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
};

/**
 * Decrypts a cipher string and returns the parsed object
 * @param cipherText - The encrypted string to decrypt
 * @returns Decrypted and parsed data
 */
export const decryptData = (cipherText: string): any => {
    try {
        const key = getEncryptionKey();
        const decryptedBytes = CryptoJS.AES.decrypt(cipherText, key);
        const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedString) {
            throw new Error('Failed to decrypt data - invalid cipher or key');
        }
        
        return JSON.parse(decryptedString);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
};

/**
 * Utility function to encrypt sensitive form data before storing in localStorage
 * @param key - Storage key
 * @param data - Data to encrypt and store
 */
export const encryptAndStore = (key: string, data: any): void => {
    try {
        const encrypted = encryptData(data);
        localStorage.setItem(key, encrypted);
    } catch (error) {
        console.error('Failed to encrypt and store data:', error);
    }
};

/**
 * Utility function to decrypt and retrieve data from localStorage
 * @param key - Storage key
 * @returns Decrypted data or null if not found/invalid
 */
export const decryptAndRetrieve = (key: string): any => {
    try {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        
        return decryptData(encrypted);
    } catch (error) {
        console.error('Failed to decrypt and retrieve data:', error);
        return null;
    }
};
