import { promises as fs } from 'fs';
import path from 'path';

interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

interface Article {
  slug: string;
  metadata: ArticleMetadata;
}

export async function getArticles(tag?: string): Promise<Article[]> {
  const notesDirectory = path.join(process.cwd(), 'app', 'n');
  const entries = await fs.readdir(notesDirectory, {
    recursive: true,
    withFileTypes: true,
  });

  const articles = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
      .map(async (entry) => {
        const filePath = path.join(entry.parentPath, entry.name);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Extract metadata from content
        const metadataMatch = content.match(/export const metadata = ({[\s\S]*?});/);
        if (!metadataMatch) return null;
        
        try {
          // Use Function constructor to safely evaluate the metadata object
          const metadata = Function(`return ${metadataMatch[1]}`)() as ArticleMetadata;
          const relativePath = path.relative(notesDirectory, entry.parentPath);
          const slug = relativePath.replace(/\\/g, '/');
          
          return { slug, metadata };
        } catch (error) {
          console.error(`Error parsing metadata for ${filePath}:`, error);
          return null;
        }
      })
  );

  const validArticles = articles.filter((article): article is Article => {
    if (article === null) return false;
    if (!tag) return true;
    return article.metadata.tags?.includes(tag) ?? false;
  });

  // Sort by date, most recent first
  return validArticles.sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
} 