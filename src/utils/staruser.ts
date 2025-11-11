// <I WANT TO BE COMPILED>

import { dbGet, dbSet } from '../access-control/db';
import { decrypt, encrypt } from '../access-control/crypte';
import { initPremiumAccess, verifyKeyWithServer, getStarKeyFromDB, saveStarKeyToDB } from '../access-control/premium';

window.StarUserAfapist = {
    hasStarAccess: initPremiumAccess,
    confirmSuperStarAccess: verifyKeyWithServer,
    getStarKeyFromDB: getStarKeyFromDB,
    saveStarKeyToDB: saveStarKeyToDB,
    dbGet: dbGet,
    dbSet: dbSet,
    decrypt: decrypt,
    encrypt: encrypt,
};
