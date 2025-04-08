// تكوين ثابت للنظام
export const CONFIG = {
  ADMIN_ADDRESS: '0x9ea548f834173666c36E1E37C4f2B4995b732871',
  NETWORK_URL: 'http://127.0.0.1:7545',
  CHAIN_ID: '1337',
  IDENTITY_CONTRACT_ADDRESS: '0xF6745b48d96f6Fff65C2B4e1C85e14D54B29114E',
  CERTIFICATES_CONTRACT_ADDRESS: '0x2fe853BB23318d07e302b8950787eB978E5d9232',
  EXAMINATIONS_CONTRACT_ADDRESS: '0xECb46564793b702F9f55E9e505B2FEbE2A05E3ae',
  SECURITY_UTILS_CONTRACT_ADDRESS: '0x142Dd32e4F3e0E2e3EEB559C85A8f665a517Bb12',
  EXAM_MANAGEMENT_CONTRACT_ADDRESS: '0x80a4459DAD82f7BfcB07eB14afc3C8E5cf4d034F'
};

// وظيفة للحصول على قيمة التكوين
export const getConfig = (key: keyof typeof CONFIG): string => {
  // محاولة الحصول على القيمة من متغيرات البيئة أولاً
  const envValue = process.env[`NEXT_PUBLIC_${key}`] || process.env[key];
  
  // إذا لم يتم العثور على القيمة في متغيرات البيئة، استخدم القيمة الثابتة
  return envValue || CONFIG[key];
};

// وظيفة للتحقق من صحة التكوين
export const validateConfig = () => {
  const missingKeys: string[] = [];
  
  Object.keys(CONFIG).forEach((key) => {
    const value = getConfig(key as keyof typeof CONFIG);
    if (!value) {
      missingKeys.push(key);
    }
  });

  if (missingKeys.length > 0) {
    throw new Error(`Missing configuration values for: ${missingKeys.join(', ')}`);
  }

  return true;
}; 