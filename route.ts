import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import oembed from 'oembed-parser';
import axios from 'axios';
import cheerio from 'cheerio';

const prisma = new PrismaClient();

const presentationSchema = z.object({
  url: z.string().url(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = presentationSchema.parse(body);

    // Get oembed data
    const embedData = await oembed.extract(url);
    
    if (!embedData) {
      return NextResponse.json(
        { error: 'Could not extract presentation data' },
        { status: 400 }
      );
    }

    // Create presentation in database
    const presentation = await prisma.presentation.create({
      data: {
        title: embedData.title || 'Untitled Presentation',
        embedUrl: embedData.html,
        sourceUrl: url,
        thumbnail: embedData.thumbnail_url,
      },
    });

    return NextResponse.json(presentation);
  } catch (error) {
    console.error('Error processing presentation:', error);
    return NextResponse.json(
      { error: 'Failed to process presentation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const presentations = await prisma.presentation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(presentations);
  } catch (error) {
    console.error('Error fetching presentations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch presentations' },
      { status: 500 }
    );
  }
} 