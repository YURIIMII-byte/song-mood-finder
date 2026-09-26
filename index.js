#!/usr/bin/env node
// song-mood-finder: finds the closest entries by meaning, using on-device embeddings.
// Usage: node index.js <entries.txt> "<query>"
import { readFileSync, existsSync } from 'node:fs';
import { loadModel, embed, unloadModel, GTE_LARGE_FP16 } from '@qvac/sdk';

const logPath = process.argv[2] || "songs.example.txt";
const query = process.argv.slice(3).join(' ') || "driving at night in the rain";

if (!existsSync(logPath)) {
  console.error('Usage: node index.js <entries.txt> "<query>"');
  process.exit(1);
}

const entries = readFileSync(logPath, 'utf-8').split('\n').map((l) => l.trim()).filter(Boolean);

console.log(`Loading embedding model, indexing ${entries.length} entries...`);
const modelId = await loadModel({ modelSrc: GTE_LARGE_FP16 });

const { embedding: entryEmbeddings } = await embed({ modelId, text: entries });
const { embedding: queryEmbedding } = await embed({ modelId, text: query });

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

const scored = entries
  .map((entry, i) => ({ entry, score: cosineSimilarity(queryEmbedding, entryEmbeddings[i]) }))
  .sort((a, b) => b.score - a.score);

console.log(`\nClosest matches for "${query}":\n`);
for (const { entry, score } of scored.slice(0, 3)) {
  console.log(`  ${score.toFixed(3)}  ${entry}`);
}

await unloadModel({ modelId });
