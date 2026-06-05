/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CharacterItem {
  char: string;
}

export interface PageItem {
  id: string; // "P01", "P02", etc.
  name: string; // "第1页", etc.
  characters: string[];
}

export type TrackMode = "learn" | "quiz"; // learn: autoplay/manual study; quiz: active stroke verification practice
