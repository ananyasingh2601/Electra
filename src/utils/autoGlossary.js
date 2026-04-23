// src/utils/autoGlossary.js
import React from 'react';
import GlossaryTooltip from '../components/ui/GlossaryTooltip';
import { GLOSSARY_TERMS } from '../data/glossary';

// Sort terms by length (longest first) to match multi-word terms before single words
const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) => b.length - a.length);

/**
 * Takes a plain text string and returns React elements with glossary terms
 * wrapped in GlossaryTooltip components.
 * Only wraps the first occurrence of each term.
 */
export function autoGlossary(text) {
  if (!text || typeof text !== 'string') return text;

  const wrapped = new Set();
  let parts = [text];

  for (const term of sortedTerms) {
    if (wrapped.has(term)) continue;
    const regex = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i');

    const newParts = [];
    let found = false;

    for (const part of parts) {
      if (typeof part !== 'string' || found) {
        newParts.push(part);
        continue;
      }

      const match = part.match(regex);
      if (!match) {
        newParts.push(part);
        continue;
      }

      const idx = match.index;
      const before = part.slice(0, idx);
      const matched = part.slice(idx, idx + match[0].length);
      const after = part.slice(idx + match[0].length);

      if (before) newParts.push(before);
      newParts.push(
        React.createElement(GlossaryTooltip, { key: `glossary-${term}`, term }, matched)
      );
      if (after) newParts.push(after);
      wrapped.add(term);
      found = true;
    }

    parts = newParts;
  }

  return parts.length === 1 && typeof parts[0] === 'string'
    ? parts[0]
    : React.createElement(React.Fragment, null, ...parts);
}
