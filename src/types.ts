export interface Member {
  id: string;
  name: string;
  accountNo: string;
  memberId: string;
  accountType: string;
  contactNumber: string;
  phoneMasked: string;
  branch: string;
  status: 'Active' | 'Pending Verification';
  documentPurpose: string;
}

export interface SignatureRecord {
  id: string;
  memberId: string;
  memberName: string;
  accountNo: string;
  contactNumber?: string;
  documentPurpose: string;
  signatureDataUrl: string;
  timestamp: string;
  auditHash: string;
  strokeCount: number;
  inkColor: string;
}
