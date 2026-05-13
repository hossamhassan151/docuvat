import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.docuvat.com'

  return [
    // 1. الصفحات الرئيسية (أولوية قصوى)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/sa`, // صفحة هبوط السعودية
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ae`, // صفحة هبوط الإمارات
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // 2. مقالات الـ SEO (لجذب الزوار)
    {
      url: `${baseUrl}/blog/zatca-phase-2-integration-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/uae-vat-law-changes-2026`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // 3. صفحات الخدمات والأسعار
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/invoice`, // أداة توليد الفواتير
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // 4. الصفحات القانونية (ضرورية للثقة Indexing)
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}