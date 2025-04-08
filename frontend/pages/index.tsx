import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useToast,
  Select,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { registerUser, getUserRole, issueCertificate, getCertificates, verifyCertificate, isVerifiedUser, isOwner, verifyInstitution, getOwnerAddress, setAdminRole } from '../utils/contracts';
import { uploadToIPFS, getFromIPFS } from '../utils/ipfs';
import { useRouter } from 'next/router';
import { getFirstAccount, requestAccounts, getEthereumAccounts } from '../utils/ethereum';

function WalletConnection() {
  const [account, setAccount] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const toast = useToast();
  const router = useRouter();

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const selectedAccount = await getFirstAccount(window.ethereum, 'eth_requestAccounts');
        if (!selectedAccount) {
          throw new Error('No account found');
        }
        setAccount(selectedAccount);
        
        // Get user role after connecting
        try {
          const role = await getUserRole(selectedAccount);
          setUserRole(role);
        } catch (error) {
          console.log('User not registered yet');
        }
        toast({
          title: 'Connected',
          description: 'Wallet connected successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        toast({
          title: 'Error',
          description: 'Failed to connect wallet',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'MetaMask not found',
        description: 'Please install MetaMask!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const disconnectWallet = async () => {
    try {
      // Clear local state
      setAccount(null);
      setUserRole('');

      // Clear any stored data
      localStorage.clear();
      sessionStorage.clear();

      // Show success message
      toast({
        title: 'تم تسجيل الخروج - Logged Out',
        description: 'تم تسجيل الخروج بنجاح - Successfully logged out',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push('/').then(() => {
          // Force page refresh after navigation
          window.location.reload();
        });
      }, 1000);
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: 'خطأ - Error',
        description: 'حدث خطأ أثناء تسجيل الخروج - Error during logout',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      {account ? (
        <VStack gap={4}>
          <Text>Connected to {account}</Text>
          {userRole && <Text>Role: {userRole}</Text>}
          <Button colorScheme="red" onClick={disconnectWallet}>
            تسجيل الخروج - Logout
          </Button>
        </VStack>
      ) : (
        <Button 
          colorScheme="blue" 
          onClick={connectWallet}
        >
          Connect with MetaMask
        </Button>
      )}
    </Box>
  );
}

function RegisterForm({ account }: { account: string }) {
  const [role, setRole] = useState('');
  const toast = useToast();

  const handleRegister = async () => {
    try {
      await registerUser(role);
      toast({
        title: 'Success',
        description: 'User registered successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      toast({
        title: 'Error',
        description: 'Failed to register user',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack gap={4}>
      <FormControl>
        <FormLabel>Select Role</FormLabel>
        <Select
          placeholder="Select role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">مسؤول النظام - Admin</option>
          <option value="student">طالب - Student</option>
          <option value="institution">مؤسسة تعليمية - Institution</option>
          <option value="employer">جهة توظيف - Employer</option>
        </Select>
      </FormControl>
      <Button colorScheme="green" onClick={handleRegister}>
        Register
      </Button>
    </VStack>
  );
}

function IssueCertificateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studentAddress, setStudentAddress] = useState('');
  const [certificateData, setCertificateData] = useState('');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const selectedAccount = await getFirstAccount(window.ethereum, 'eth_requestAccounts');
        if (selectedAccount) {
          const verified = await isVerifiedUser(selectedAccount);
          setIsVerified(verified);
        }
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
      toast({
        title: 'Error',
        description: 'Failed to check verification status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleIssueCertificate = async () => {
    if (!isVerified) {
      toast({
        title: 'Error',
        description: 'Your institution must be verified before issuing certificates. Please contact the administrator.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!studentAddress || !certificateData) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      // Upload certificate data to IPFS
      const ipfsHash = await uploadToIPFS({
        data: certificateData,
        timestamp: new Date().toISOString()
      });

      // Issue certificate on blockchain
      await issueCertificate(studentAddress, ipfsHash);
      
      toast({
        title: 'Success',
        description: 'Certificate issued successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setStudentAddress('');
      setCertificateData('');
    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast({
        title: 'Error',
        description: 'Failed to issue certificate. Make sure your institution is verified.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>Issue Certificate</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Issue Certificate</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isVerified === false ? (
              <VStack spacing={4}>
                <Text color="red.500">
                  Your institution is not verified. Please contact the administrator for verification.
                </Text>
                <Button colorScheme="blue" onClick={checkVerificationStatus}>
                  Check Verification Status
                </Button>
              </VStack>
            ) : (
              <VStack gap={4}>
                <FormControl>
                  <FormLabel>Student Address</FormLabel>
                  <Input
                    value={studentAddress}
                    onChange={(e) => setStudentAddress(e.target.value)}
                    placeholder="0x..."
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Certificate Data</FormLabel>
                  <Input
                    value={certificateData}
                    onChange={(e) => setCertificateData(e.target.value)}
                    placeholder="Enter certificate details"
                  />
                </FormControl>
                <Button 
                  colorScheme="blue" 
                  onClick={handleIssueCertificate}
                  isLoading={loading}
                  isDisabled={!isVerified}
                >
                  Issue
                </Button>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

interface Certificate {
  id: string;
  ipfsHash: string;
  issuer: string;
  timestamp: string;
  isValid: boolean;
  data?: any;
  issuedAt?: string;
}

function ViewCertificatesModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const toast = useToast();

  const loadCertificates = async () => {
    setError(null);
    try {
      setLoading(true);
      if (typeof window !== 'undefined' && window.ethereum) {
        const selectedAccount = await getFirstAccount(window.ethereum, 'eth_requestAccounts');
        if (selectedAccount) {
          console.log('Loading certificates for address:', selectedAccount);
          
          // Check user role first
          const role = await getUserRole(selectedAccount);
          console.log('User role for certificates:', role);
          
          if (role !== 'student') {
            throw new Error(`Only students can view certificates. Current role: ${role}`);
          }

          console.log('Fetching certificates from contract...');
          const certs = await getCertificates(selectedAccount);
          console.log('Raw certificates data:', certs);
          
          if (!certs || certs.length === 0) {
            console.log('No certificates found');
            setCertificates([]);
            return;
          }

          const formattedCerts = await Promise.all(certs.map(async (cert: any) => {
            try {
              console.log('Processing certificate:', cert);
              const ipfsData = await getFromIPFS(cert.ipfsHash);
              return {
                ...cert,
                data: ipfsData,
                issuedAt: new Date(parseInt(cert.timestamp) * 1000).toLocaleString()
              };
            } catch (error) {
              console.error('Error loading IPFS data for cert:', cert.ipfsHash, error);
              return cert;
            }
          }));
          
          console.log('Formatted certificates:', formattedCerts);
          setCertificates(formattedCerts);
        }
      }
    } catch (error: any) {
      console.error('Error loading certificates:', error);
      setError(error.message || 'Failed to load certificates');
      toast({
        title: 'Error',
        description: error.message || 'Failed to load certificates',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCertificates();
    }
  }, [isOpen]);

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>View My Certificates</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Certificates</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              {userRole && (
                <Text>Current Role: {userRole}</Text>
              )}
              {error && (
                <Text color="red.500">{error}</Text>
              )}
              {loading ? (
                <Text>Loading certificates...</Text>
              ) : certificates.length === 0 ? (
                <VStack spacing={4}>
                  <Text>No certificates found</Text>
                  <Button colorScheme="blue" onClick={loadCertificates}>
                    Refresh Certificates
                  </Button>
                </VStack>
              ) : (
                <VStack spacing={4} align="stretch">
                  <Button colorScheme="blue" size="sm" onClick={loadCertificates}>
                    Refresh Certificates
                  </Button>
                  {certificates.map((cert: any, index: number) => (
                    <Box 
                      key={index}
                      p={4} 
                      border="1px" 
                      borderColor="gray.200" 
                      borderRadius="md"
                      shadow="sm"
                    >
                      <Text><strong>Certificate Hash:</strong> {cert.ipfsHash}</Text>
                      <Text><strong>Issuer:</strong> {cert.issuer}</Text>
                      <Text><strong>Issued At:</strong> {cert.issuedAt}</Text>
                      {cert.data && (
                        <Text><strong>Details:</strong> {JSON.stringify(cert.data)}</Text>
                      )}
                      <HStack mt={2} spacing={2}>
                        <Button 
                          size="sm"
                          colorScheme="blue"
                          onClick={() => window.open(`https://ipfs.io/ipfs/${cert.ipfsHash}`, '_blank')}
                        >
                          View on IPFS
                        </Button>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function VerifyCertificateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleVerify = async () => {
    if (!certificateId) {
      toast({
        title: 'Error',
        description: 'Please enter a certificate ID',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const isValid = await verifyCertificate(certificateId);
      setVerificationResult(isValid);
    } catch (error) {
      console.error('Error verifying certificate:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify certificate',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen}>Verify Certificate</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Certificate</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Certificate ID</FormLabel>
                <Input
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID"
                />
              </FormControl>
              <Button 
                colorScheme="blue" 
                onClick={handleVerify}
                isLoading={loading}
              >
                Verify
              </Button>
              {verificationResult !== null && (
                <Text
                  color={verificationResult ? 'green.500' : 'red.500'}
                  fontWeight="bold"
                >
                  Certificate is {verificationResult ? 'Valid' : 'Invalid'}
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function VerificationStatus() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const toast = useToast();

  const checkVerificationStatus = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const selectedAccount = await getFirstAccount(window.ethereum, 'eth_requestAccounts');
        if (selectedAccount) {
          const verified = await isVerifiedUser(selectedAccount);
          setIsVerified(verified);
        }
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
      toast({
        title: 'Error',
        description: 'Failed to check verification status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <Button colorScheme="blue" onClick={checkVerificationStatus}>
        Check Verification Status
      </Button>
      {isVerified !== null && (
        <Text color={isVerified ? 'green.500' : 'red.500'}>
          Your account is {isVerified ? 'verified' : 'not verified'}. 
          {!isVerified && ' Please contact the administrator for verification.'}
        </Text>
      )}
    </VStack>
  );
}

function AdminInterface() {
  const [institutionAddress, setInstitutionAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleVerifyInstitution = async () => {
    if (!institutionAddress) {
      toast({
        title: 'Error',
        description: 'Please enter an institution address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      await verifyInstitution(institutionAddress);
      toast({
        title: 'Success',
        description: 'Institution verified successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setInstitutionAddress('');
    } catch (error) {
      console.error('Error verifying institution:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify institution',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Admin Panel</Heading>
      <FormControl>
        <FormLabel>Institution Address</FormLabel>
        <Input
          value={institutionAddress}
          onChange={(e) => setInstitutionAddress(e.target.value)}
          placeholder="Enter institution address to verify"
        />
      </FormControl>
      <Button
        colorScheme="green"
        onClick={handleVerifyInstitution}
        isLoading={loading}
      >
        Verify Institution
      </Button>
    </VStack>
  );
}

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const selectedAccount = await getFirstAccount(window.ethereum, 'eth_accounts');
        if (selectedAccount) {
          setAccount(selectedAccount);
          
          // Check if admin first
          const isAdminResult = await isOwner(selectedAccount);
          console.log('Is admin check result:', isAdminResult);
          
          if (isAdminResult) {
            console.log('Setting admin role');
            setCurrentRole('admin');
            return;
          }
          
          // If not admin, check regular role
          const role = await getUserRole(selectedAccount);
          console.log('User role:', role);
          setCurrentRole(role);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('يرجى تثبيت MetaMask - Please install MetaMask');
      }

      const selectedAccount = await getFirstAccount(window.ethereum, 'eth_requestAccounts');
      if (!selectedAccount) {
        throw new Error('لم يتم العثور على حساب - No account found');
      }

      setAccount(selectedAccount);
      
      // Check if user is admin first
      try {
        const isAdminUser = await isOwner(selectedAccount);
        if (isAdminUser) {
          setCurrentRole('admin');
          console.log('Admin account detected');
          return;
        }
      } catch (error) {
        console.log('Error checking admin status:', error);
      }
      
      // If not admin, check regular role
      try {
        const role = await getUserRole(selectedAccount);
        setCurrentRole(role);
        console.log('Current user role:', role);
      } catch (error) {
        console.log('User not registered yet');
      }
    } catch (error: any) {
      console.error('Error connecting:', error);
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      if (!account) {
        throw new Error('Please connect your wallet first');
      }

      setLoading(true);
      setError('');

      // Check if user is admin first
      const isAdminUser = await isOwner(account);
      if (isAdminUser) {
        console.log('Admin account detected, redirecting to admin dashboard');
        setCurrentRole('admin');
        setRedirecting(true);
        router.push('/dashboard/admin');
        return;
      }

      // If not admin, check user role
      const roleValue = await getUserRole(account);
      console.log('Current user role value:', roleValue);

      // Map numeric role to string
      const roleMap: { [key: string]: string } = {
        '0': 'none',
        '1': 'student',
        '2': 'institution',
        '3': 'employer',
        '4': 'admin'
      };

      const role = roleMap[roleValue.toString().replace('n', '')] || 'none';
      console.log('Mapped role:', role);

      if (role === 'none') {
        throw new Error('This account is not registered. Please register first.');
      }

      // Update current role
      setCurrentRole(role);

      // Redirect based on role
      const redirectMap: { [key: string]: string } = {
        'student': '/dashboard/student',
        'institution': '/dashboard/institution',
        'employer': '/dashboard/employer',
        'admin': '/dashboard/admin'
      };

      const redirectPath = redirectMap[role];
      if (redirectPath) {
        setRedirecting(true);
        router.push(redirectPath);
      } else {
        throw new Error('Invalid role or role not found');
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      setError(error.message);
      toast({
        title: 'خطأ - Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        });
        // After switching, check connection again
        await checkConnection();
      } catch (error: any) {
        console.error('Error switching wallet:', error);
        setError(error.message);
      }
    }
  };

  const handleRegister = async () => {
    if (!selectedRole) {
      throw new Error('Please select a role');
    }

    try {
      setLoading(true);
      setError('');

      // Check if user is admin first
      const isAdminUser = await isOwner(account!);
      if (isAdminUser) {
        console.log('Admin account detected, redirecting to admin dashboard');
        setCurrentRole('admin');
        setRedirecting(true);
        router.push('/dashboard/admin');
        return;
      }
      
      // If not admin, proceed with regular registration
      await registerUser(selectedRole);
      setCurrentRole(selectedRole);
      
      // After successful registration, redirect based on role
      const redirectMap: { [key: string]: string } = {
        'student': '/dashboard/student',
        'institution': '/dashboard/institution',
        'employer': '/dashboard/employer'
      };

      const redirectPath = redirectMap[selectedRole];
      if (redirectPath) {
        setRedirecting(true);
        router.push(redirectPath);
      }
    } catch (error: any) {
      console.error('Error registering:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading mb={2}>نظام الشهادات اللامركزي</Heading>
          <Heading size="md" mb={4}>Decentralized Certificate System</Heading>
        </Box>

        <Box>
          <Text mb={2}>المحفظة المتصلة - Connected Account:</Text>
          <Text fontSize="sm" mb={4}>{account || 'Not connected'}</Text>
          
          {!account ? (
            <Button
              colorScheme="blue"
              onClick={handleConnect}
              isLoading={loading}
              width="full"
            >
              اتصال بالمحفظة - Connect Wallet
            </Button>
          ) : (
            <Button
              colorScheme="orange"
              onClick={handleSwitchWallet}
              width="full"
            >
              تبديل المحفظة - Switch Wallet
            </Button>
          )}
        </Box>

        {account && (
          <VStack spacing={4}>
            {currentRole ? (
              <Box bg="yellow.100" p={4} borderRadius="md">
                <Text>
                  أنت مسجل حالياً كـ - You are currently registered as: {currentRole}
                </Text>
                <VStack spacing={4} width="full" mt={4}>
                  {account.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_ADDRESS?.toLowerCase() && (
                    <Button
                      colorScheme="purple"
                      onClick={async () => {
                        try {
                          await setAdminRole();
                          toast({
                            title: 'Success',
                            description: 'Admin role set successfully',
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                          });
                          window.location.reload();
                        } catch (error: any) {
                          console.error('Error setting admin role:', error);
                          toast({
                            title: 'Error',
                            description: error.message || 'Failed to set admin role',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                          });
                        }
                      }}
                      width="full"
                    >
                      تعيين دور المسؤول - Set Admin Role
                    </Button>
                  )}
                  <Button
                    colorScheme="green"
                    onClick={handleLogin}
                    isLoading={loading || redirecting}
                    width="full"
                  >
                    دخول للحساب - Login
                  </Button>
                  {currentRole !== 'admin' && (
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        setCurrentRole(null);
                        setSelectedRole('');
                      }}
                      width="full"
                    >
                      تسجيل حساب جديد - Register New Account
                    </Button>
                  )}
                </VStack>
              </Box>
            ) : (
              <>
                <Box bg="blue.100" p={4} borderRadius="md">
                  <Text mb={4}>
                    هذا الحساب غير مسجل. يرجى التسجيل أولاً.
                    <br />
                    This account is not registered. Please register first.
                  </Text>
                  <Select
                    placeholder="اختر دورك - Select your role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    mb={4}
                  >
                    <option value="student">طالب - Student</option>
                    <option value="institution">مؤسسة تعليمية - Institution</option>
                    <option value="employer">جهة توظيف - Employer</option>
                  </Select>
                  <Button
                    colorScheme="green"
                    onClick={handleRegister}
                    isLoading={loading || redirecting}
                    width="full"
                  >
                    تسجيل - Register
                  </Button>
                </Box>
              </>
            )}
          </VStack>
        )}

        {error && (
          <Box bg="red.100" p={4} borderRadius="md">
            <Text color="red.500">خطأ - Error: {error}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
} 