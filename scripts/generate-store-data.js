const fs = require('fs')
const path = require('path')

const REPO_PATH = '/Users/garthstudios/richard-repo'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getFiles(dir, basePath = '') {
  const files = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    if (item.startsWith('.') || item === 'node_modules') continue

    const fullPath = path.join(dir, item)
    const relativePath = path.join(basePath, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getFiles(fullPath, relativePath))
    } else if (item.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const folder = basePath || 'root'
      const name = item

      files.push({
        id: slugify(folder + '-' + name.replace('.md', '')),
        name,
        path: '/' + relativePath,
        folder,
        content,
        type: 'soul', // We'll categorize later
      })
    }
  }

  return files
}

// Categorize files based on folder
function categorizeFile(file) {
  const folder = file.folder.toLowerCase()

  if (folder === 'root') {
    // Root level files are soul files
    if (['SOUL.md', 'IDENTITY.md', 'VOICE.md', 'HEARTBEAT.md', 'USER.md'].includes(file.name)) {
      return 'soul'
    }
    return 'knowledge'
  }

  if (folder === 'memory') return 'memory'
  if (folder === 'knowledge') return 'knowledge'
  if (['reference', 'guides', 'whitepapers', 'essays', 'memos', 'prompts', 'content'].includes(folder)) return 'knowledge'

  return 'knowledge'
}

const files = getFiles(REPO_PATH)

// Categorize and fix IDs
const categorizedFiles = files.map(f => ({
  ...f,
  type: categorizeFile(f),
  id: slugify(f.folder + '-' + f.name.replace('.md', '')),
}))

// Output as TypeScript
console.log('export const DEFAULT_FILES: MemoryFile[] = [')
for (const file of categorizedFiles) {
  const escapedContent = JSON.stringify(file.content)
  console.log(`  {
    id: '${file.id}',
    name: '${file.name}',
    path: '${file.path}',
    type: '${file.type}',
    content: ${escapedContent},
    lastModified: new Date(),
    injected: false,
  },`)
}
console.log(']')

// Also output folder structure
const folders = new Set(files.map(f => f.folder))
console.log('\n// Folders:', Array.from(folders).join(', '))
console.log('// Total files:', files.length)
