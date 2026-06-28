/**
 * Strip ligature substitution lookups from Roboto TTF fonts using binary editing.
 * 
 * @react-pdf/renderer's fontkit engine applies GSUB ligature substitutions
 * but then fails to render the ligature glyphs, causing characters like
 * "fi", "fl", "ff" to be silently dropped from the output PDF.
 * 
 * This script zeroes out the GSUB table entirely in the TTF binary,
 * which prevents any glyph substitutions from being applied.
 * The font still renders every individual character correctly.
 */

import fs from 'fs';
import path from 'path';

const FONTS_DIR = path.resolve('public', 'fonts');

const fontFiles = [
  'Roboto-Regular.ttf',
  'Roboto-Bold.ttf',
  'Roboto-Italic.ttf',
  'Roboto-BoldItalic.ttf',
];

function readUint16(buf, offset) {
  return (buf[offset] << 8) | buf[offset + 1];
}

function readUint32(buf, offset) {
  return ((buf[offset] << 24) | (buf[offset + 1] << 16) | (buf[offset + 2] << 8) | buf[offset + 3]) >>> 0;
}

function writeUint32(buf, offset, value) {
  buf[offset] = (value >>> 24) & 0xff;
  buf[offset + 1] = (value >>> 16) & 0xff;
  buf[offset + 2] = (value >>> 8) & 0xff;
  buf[offset + 3] = value & 0xff;
}

function tagToString(buf, offset) {
  return String.fromCharCode(buf[offset], buf[offset + 1], buf[offset + 2], buf[offset + 3]);
}

for (const filename of fontFiles) {
  const filePath = path.join(FONTS_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filename} - file not found`);
    continue;
  }

  console.log(`Processing ${filename}...`);
  const buf = fs.readFileSync(filePath);
  
  // TrueType/OpenType header
  // Offset 0: sfVersion (4 bytes)
  // Offset 4: numTables (2 bytes)
  // Offset 6: searchRange (2 bytes)
  // Offset 8: entrySelector (2 bytes)
  // Offset 10: rangeShift (2 bytes)
  // Offset 12: table records begin (16 bytes each: tag[4], checksum[4], offset[4], length[4])
  
  const numTables = readUint16(buf, 4);
  console.log(`  Found ${numTables} tables`);
  
  let gsubFound = false;
  
  for (let i = 0; i < numTables; i++) {
    const recordOffset = 12 + (i * 16);
    const tag = tagToString(buf, recordOffset);
    const tableOffset = readUint32(buf, recordOffset + 8);
    const tableLength = readUint32(buf, recordOffset + 12);
    
    if (tag === 'GSUB') {
      console.log(`  Found GSUB table at offset ${tableOffset}, length ${tableLength}`);
      
      // Zero out the GSUB table data entirely
      // This removes all glyph substitution rules (ligatures, contextual alternates, etc.)
      buf.fill(0, tableOffset, tableOffset + tableLength);
      
      // Write a minimal valid GSUB header (version 1.0, no scripts/features/lookups)
      // Version: 1.0 (major=1, minor=0)
      buf[tableOffset] = 0x00; buf[tableOffset + 1] = 0x01; // major version
      buf[tableOffset + 2] = 0x00; buf[tableOffset + 3] = 0x00; // minor version
      // ScriptList offset (relative to GSUB start) - point to offset 10
      buf[tableOffset + 4] = 0x00; buf[tableOffset + 5] = 0x0A;
      // FeatureList offset - point to offset 12
      buf[tableOffset + 6] = 0x00; buf[tableOffset + 7] = 0x0C;
      // LookupList offset - point to offset 14
      buf[tableOffset + 8] = 0x00; buf[tableOffset + 9] = 0x0E;
      // ScriptList: scriptCount = 0
      buf[tableOffset + 10] = 0x00; buf[tableOffset + 11] = 0x00;
      // FeatureList: featureCount = 0
      buf[tableOffset + 12] = 0x00; buf[tableOffset + 13] = 0x00;
      // LookupList: lookupCount = 0
      buf[tableOffset + 14] = 0x00; buf[tableOffset + 15] = 0x00;
      
      // Update table checksum in the table record
      // Calculate new checksum for the zeroed GSUB table
      let checksum = 0;
      for (let j = 0; j < tableLength; j += 4) {
        checksum = (checksum + readUint32(buf, tableOffset + j)) >>> 0;
      }
      writeUint32(buf, recordOffset + 4, checksum);
      
      gsubFound = true;
      console.log(`  GSUB table zeroed and replaced with empty stub`);
      break;
    }
  }
  
  if (!gsubFound) {
    console.log(`  No GSUB table found - skipping`);
    continue;
  }
  
  fs.writeFileSync(filePath, buf);
  console.log(`  Saved: ${filePath}`);
}

console.log('\nDone! GSUB tables have been stripped from all fonts.');
