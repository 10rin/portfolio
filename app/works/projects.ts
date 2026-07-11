import fs from 'fs';
import path from 'path';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  date?: string;
  image?: string;
  images?: string[];
  bgColor?: string;
  concept?: string;
  role?: string;
  introduction?: string;
  system?: string;
  procedure?: string[];
  outcome?: string;
  survey?: string[];
}

const FOLDER_TO_ID: Record<string, string> = {
  "03timesector": "timesector",
  "04cap5": "cap5",
  "05jutei": "dub",
  "06flower": "smile-flower",
  "07bookdesign": "guns-germs-steel",
  "08spacedesign": "ray"
};

// マークダウンの記号 (* や ** や ` など) をクリーンアップする関数
function cleanMarkdownText(text: string): string {
  if (!text) return '';
  return text
    // 1. 行頭のリストマーカー (* や -) を削除（前後のスペースも考慮）
    .replace(/^\s*[\*\-]\s+/gm, '')
    // 2. ボールド (**text**) を text に変換
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // 3. イタリック (*text*) を text に変換
    .replace(/\*([^*]+)\*/g, '$1')
    // 4. インラインコード (`text`) を text に変換
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function parseMarkdown(content: string, folderName: string): Partial<Project> {
  const result: Partial<Project> = {};
  
  // 1. Frontmatter (--- で囲まれた部分) のパース
  let markdownBody = content;
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRegex);
  if (match) {
    const yamlText = match[1];
    markdownBody = content.slice(match[0].length);
    
    const lines = yamlText.split('\n');
    for (const line of lines) {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const value = line.slice(colonIdx + 1).trim();
        
        if (key === 'id') {
          result.id = value;
        } else if (key === 'tags') {
          if (value.startsWith('[') && value.endsWith(']')) {
            result.tags = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
          } else {
            result.tags = value.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
          }
        } else if (key === 'image') {
          const rawImg = value.replace(/^['"]|['"]$/g, '');
          result.image = rawImg.startsWith('/') ? rawImg : `/01main/${folderName}/${rawImg}`;
        } else if (key === 'images') {
          let rawList: string[] = [];
          if (value.startsWith('[') && value.endsWith(']')) {
            rawList = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
          } else {
            rawList = [value.replace(/^['"]|['"]$/g, '')];
          }
          result.images = rawList.map(img => img.startsWith('/') ? img : `/01main/${folderName}/${img}`);
        } else if (key === 'bgColor') {
          result.bgColor = value.replace(/^['"]|['"]$/g, '');
        } else if (key === 'date') {
          result.date = value.replace(/^['"]|['"]$/g, '');
        } else if (key === 'link') {
          result.link = value.replace(/^['"]|['"]$/g, '');
        }
      }
    }
  }

  // 2. セクション (### 見出し) のパース
  const sections = markdownBody.split(/\n###\s+/);
  
  let firstSection = sections[0].trim();
  if (firstSection.startsWith('### ')) {
    firstSection = firstSection.substring(4);
  }
  
  const allSections = [firstSection, ...sections.slice(1)];

  for (const sec of allSections) {
    const lines = sec.trim().split('\n');
    if (lines.length === 0 || !lines[0]) continue;
    
    const heading = lines[0].trim().toLowerCase();
    const body = lines.slice(1).join('\n').trim();
    
    switch (heading) {
      case 'title':
        const titleLines = body.split('\n');
        result.title = cleanMarkdownText(titleLines[0].trim());
        
        for (const line of titleLines) {
          if (line.includes('作成時期') || line.includes('時期')) {
            const dateMatch = line.match(/\*\*(?:作成時期|時期)\*\*:\s*(.*)/);
            if (dateMatch && !result.date) {
              result.date = cleanMarkdownText(dateMatch[1].trim());
            }
          }
          if (line.includes('カテゴリ')) {
            const tagsMatch = line.match(/\*\*カテゴリ\*\*:\s*(.*)/);
            if (tagsMatch && !result.tags) {
              result.tags = tagsMatch[1].split(/[、,]/).map(s => cleanMarkdownText(s.trim()));
            }
          }
        }
        break;
        
      case 'overview':
        const descriptionEndIdx = body.indexOf('\n*');
        let desc = body;
        if (descriptionEndIdx !== -1) {
          desc = body.substring(0, descriptionEndIdx).trim();
        }
        result.description = cleanMarkdownText(desc);
        break;
        
      case 'concept':
        result.concept = cleanMarkdownText(body);
        break;
        
      case 'background / insight':
      case 'background':
      case 'insight':
        result.introduction = cleanMarkdownText(body);
        break;
        
      case 'system':
      case 'method':
        result.system = cleanMarkdownText(body);
        break;
        
      case 'procedure':
        const steps = body.split(/^\d+\.\s+/m)
          .map(s => cleanMarkdownText(s))
          .filter(Boolean);
        result.procedure = steps;
        break;
        
      case 'output':
      case 'outcome':
        result.outcome = cleanMarkdownText(body);
        break;
        
      case 'survey':
        const refs = body.split('\n')
          .map(line => cleanMarkdownText(line))
          .filter(Boolean);
        result.survey = refs;
        break;
    }
  }

  return result;
}

export function loadProjects(): Project[] {
  const mainDir = path.resolve(process.cwd(), '..', '..', '01main');
  const loadedProjects: Project[] = [];
  
  if (!fs.existsSync(mainDir)) {
    console.warn(`Warning: '01main' directory not found at ${mainDir}.`);
    return [];
  }
  
  const folders = fs.readdirSync(mainDir);
  folders.sort();
  
  for (const folder of folders) {
    if (folder.startsWith('.')) continue;
    
    const folderPath = path.join(mainDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;
    
    const mdPath = path.join(folderPath, 'text.md');
    if (!fs.existsSync(mdPath)) continue;
    
    try {
      const content = fs.readFileSync(mdPath, 'utf8');
      const parsed = parseMarkdown(content, folder);
      
      const id = parsed.id || FOLDER_TO_ID[folder] || folder.replace(/^\d+/, '');
      
      let image = parsed.image;
      let images = parsed.images;
      
      if (!image) {
        const files = fs.readdirSync(folderPath);
        let imageFiles = files.filter(f => /\.(png|jpe?g|gif|webp|svg)$/i.test(f));
        imageFiles.sort();
        
        if (imageFiles.length > 0) {
          const mainImageFile = imageFiles.find(f => /(^|[^0-9])01([^0-9]|$)/.test(f));
          
          if (mainImageFile) {
            image = `/01main/${folder}/${mainImageFile}`;
            const galleryFiles = imageFiles.filter(f => f !== mainImageFile);
            images = galleryFiles.map(f => `/01main/${folder}/${f}`);
          } else {
            const coverImg = imageFiles.find(f => /cover|thumb/i.test(f)) || imageFiles[0];
            image = `/01main/${folder}/${coverImg}`;
            images = imageFiles.map(f => `/01main/${folder}/${f}`);
          }
        }
      }
      
      loadedProjects.push({
        id,
        title: parsed.title || folder,
        description: parsed.description || '',
        tags: parsed.tags || [],
        link: parsed.link || '#',
        date: parsed.date || '',
        image: image || '',
        images: images || [],
        bgColor: parsed.bgColor || '',
        concept: parsed.concept || '',
        role: parsed.role || '',
        introduction: parsed.introduction || '',
        system: parsed.system || '',
        procedure: parsed.procedure || [],
        outcome: parsed.outcome || '',
        survey: parsed.survey || []
      });
    } catch (err) {
      console.error(`Failed to parse markdown in ${folder}:`, err);
    }
  }
  
  return loadedProjects;
}

export function getProjects(): Project[] {
  return loadProjects();
}

export const projects = loadProjects();
