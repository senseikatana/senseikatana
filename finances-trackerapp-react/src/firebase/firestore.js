import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { defaultData } from '@/data/defaultData';

const COLLECTION = 'users';
const SUBCOLLECTION = 'appData';
const DOC_ID = 'current';

export function getUserDocRef(uid) {
  return doc(db, COLLECTION, uid, SUBCOLLECTION, DOC_ID);
}

export async function fetchUserData(uid) {
  const ref = getUserDocRef(uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveUserData(uid, data) {
  const ref = getUserDocRef(uid);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export function subscribeUserData(uid, callback) {
  const ref = getUserDocRef(uid);
  return onSnapshot(ref, (snap) => callback(snap.exists() ? snap.data() : null));
}

export function normalizeData(raw) {
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
  };
}

