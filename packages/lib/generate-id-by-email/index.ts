import { generateNanoId } from '@chatvolt/lib/uuidv4';
import generateFunId from '@chatvolt/lib/generate-fun-id';

export default function generateIdByEmail(email: string | null | undefined): string {
  if (email == null || email.trim() === "") {
    return generateFunId(8);
  } else {

    email = email.toLowerCase();
    const [localPart, domainPart] = email.split('@');
    const domainWithoutTld = domainPart.split('.')[0];

    const transformedLocalPart = localPart.replace(/[^a-z0-9]/gi, '-');
    const transformedDomain = domainWithoutTld.replace(/[^a-z0-9]/gi, '-');

    return `${transformedLocalPart}-${transformedDomain}-${generateNanoId(8)}`;
  }
}