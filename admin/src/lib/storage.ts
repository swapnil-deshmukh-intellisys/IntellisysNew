export const CONTACT_ATTACHMENTS_BUCKET = 'contact-inquiries';
export const RECRUITMENT_ATTACHMENTS_BUCKET = 'recruitment-attachments';
export const LEGACY_ATTACHMENTS_BUCKET = 'contact-attachments';

export async function createSignedUrlWithFallback(
  storage: any,
  bucketCandidates: string[],
  path: string
) {
  for (const bucket of bucketCandidates) {
    const { data, error } = await storage.from(bucket).createSignedUrl(path, 60 * 30);
    if (!error && data?.signedUrl) {
      return { bucket, signedUrl: data.signedUrl };
    }
  }

  return { bucket: null, signedUrl: null };
}
