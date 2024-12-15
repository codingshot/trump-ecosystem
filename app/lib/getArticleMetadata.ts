import { Metadata } from 'next'

interface ArticleMetadataProps {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  authors: string[];
  tags: string[];
  section: string;
  imageUrl: string;
}

export function getArticleMetadata({
  title,
  description,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  section,
  imageUrl
}: ArticleMetadataProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors,
      tags,
      section,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
} 