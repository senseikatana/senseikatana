import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { defaultData, INCOME_CATEGORIES, FIXED_CATEGORIES, EXPENSE_CATEGORIES } from '../data/defaultData';

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

export async function updateUserData(uid, partial) {
  const ref = getUserDocRef(uid);
  await updateDoc(ref, { ...partial, updatedAt: serverTimestamp() });
}

export function subscribeUserData(uid, callback) {
  const ref = getUserDocRef(uid);
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
}

export function normalizeData(raw) {
  const d = raw || {};
  return {
    settings: {
      currency: d.settings?.currency || '€',
      month: d.settings?.month || defaultData.settings.month,
      year: d.settings?.year || defaultData.settings.year,
    },
    incomeCategories: d.incomeCategories?.length ? [...d.incomeCategories] : [...INCOME_CATEGORIES],
    fixedCategories: d.fixedCategories?.length ? [...d.fixedCategories] : [...FIXED_CATEGORIES],
    expenseCategories: d.expenseCategories?.length ? [...d.expenseCategories] : [...EXPENSE_CATEGORIES],
    income: Array.isArray(d.income) ? d.income : [],
    fixedExpenses: Array.isArray(d.fixedExpenses) ? d.fixedExpenses : [],
    subscriptions: Array.isArray(d.subscriptions) ? d.subscriptions : [],
    variableExpenses: Array.isArray(d.variableExpenses) ? d.variableExpenses : [],
    dailyRegister: Array.isArray(d.dailyRegister) ? d.dailyRegister : [],
    budget: Array.isArray(d.budget) ? d.budget : defaultData.budget.map(b => ({ ...b })),
    savingsGoals: Array.isArray(d.savingsGoals) ? d.savingsGoals : [],
    debts: Array.isArray(d.debts) ? d.debts : [],
  };
}