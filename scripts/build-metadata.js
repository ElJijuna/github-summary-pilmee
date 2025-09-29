#!/usr/bin/env node

import { dirname, join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const packageJSON = 'package.json';
const metadataJSON = 'metadata.json';

const filename = fileURLToPath(import.meta.url);
const directory = dirname(filename);
const projectRoot = join(directory, '..');

const { description, version, homepage: url, 'public-name': name, uuid, 'shell-versions': shellVersions } = JSON.parse(
    await readFile(join(projectRoot, packageJSON), { encode: 'utf8' })
);

const metadata = {
    name,
    uuid,
    description,
    url,
    'settings-schema': uuid,
    'gettext-domain': uuid,
    'version-name': version,
    'shell-versions': shellVersions,
};

await writeFile(join(projectRoot, metadataJSON), JSON.stringify(metadata), { encode: 'utf8' });

