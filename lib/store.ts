'use client';
import { Conversation } from '@/lib/fakeData';
import { Prospect } from '@/lib/fakeData';
import { atom } from 'jotai';

export const conversationsAtom = atom<Conversation[]>([]);
export const campaignRunningAtom = atom(false);
export const prospectsAtom = atom<Prospect[]>([]);
