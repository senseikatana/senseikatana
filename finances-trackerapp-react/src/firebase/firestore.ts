import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { defaultData } from '@/data/defaultData';

const COLLECTION = 'users';
const SUBCOLLECTION = 'appData';
const DOC_ID = 'current';

export function getUserDocRef(uid: string) {
  if (!db) throw new Error('Firebase no configurado');
  return doc(db, COLLECTION, uid, SUBCOLLECTION, DOC_ID);
}

export async function fetchUserData(uid: string) {
  if (!isFirebaseConfigured) return null;
  const ref = getUserDocRef(uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveUserData(uid: string, data: any) {
  if (!isFirebaseConfigured) return;
  const ref = getUserDocRef(uid);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export function subscribeUserData(uid: string, callback: (data: any) => void) {
  if (!isFirebaseConfigured) {
    callback(null);
    return () => {};
  }
  const ref = getUserDocRef(uid);
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
}

export function normalizeData(raw: any) {
  if (!raw) return defaultData;
  return {
    ...defaultData,
    ...raw,
    settings: { ...defaultData.settings, ...raw.settings },
    incomeCategories: raw.incomeCategories || defaultData.incomeCategories,
    fixedCategories: raw.fixedCategories || defaultData.fixedCategories,
    expenseCategories: raw.expenseCategories || defaultData.expenseCategories,
    businessIncomeCategories: raw.businessIncomeCategories || defaultData.businessIncomeCategories,
    businessExpenseCategories: raw.businessExpenseCategories || defaultData.businessExpenseCategories,
    crmCategories: raw.crmCategories || defaultData.crmCategories,
    ticketCategories: raw.ticketCategories || defaultData.ticketCategories,
  };
}

