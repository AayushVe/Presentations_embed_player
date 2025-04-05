import oembed from 'oembed-parser';
import axios from 'axios';
import cheerio from 'cheerio';

export interface PresentationData {
  title: string;
  embedUrl: string;
  sourceUrl: string;
  thumbnail?: string;
}

export async function processPresentationUrl(url: string): Promise<PresentationData> {
  try {
    // Try oembed first
    const embedData = await oembed.extract(url);
    
    if (embedData) {
      return {
        title: embedData.title || 'Untitled Presentation',
        embedUrl: embedData.html,
        sourceUrl: url,
        thumbnail: embedData.thumbnail_url,
      };
    }

    // Fallback to direct URL processing
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract title
    const title = $('title').text() || 'Untitled Presentation';
    
    // Try to find embed code
    const embedCode = $('iframe').first().attr('src') || url;
    
    // Try to find thumbnail
    const thumbnail = $('meta[property="og:image"]').attr('content') || 
                     $('meta[name="twitter:image"]').attr('content');

    return {
      title,
      embedUrl: embedCode,
      sourceUrl: url,
      thumbnail,
    };
  } catch (error) {
    console.error('Error processing presentation URL:', error);
    throw new Error('Failed to process presentation URL');
  }
}

export function validatePresentationUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
} 