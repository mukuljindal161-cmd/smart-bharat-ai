const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
  }[];
}

const SYSTEM_PROMPT = `You are Smart Bharat AI, a helpful assistant for Indian government services. You help citizens with:

1. Government Schemes (PM Kisan, Ayushman Bharat, PM Awas Yojana, etc.)
2. Documents (Passport, PAN, Aadhaar, Driving License, etc.)
3. Certificates (Birth, Death, Caste, Income, etc.)
4. Grievances and Complaints
5. Government Services and Procedures

Guidelines:
- Be friendly and helpful, use "Namaste" as greeting
- Provide accurate information about Indian government services
- Use bullet points for lists
- Bold important terms using **text**
- If unsure, suggest official sources
- Keep responses concise but informative
- Always answer in the language the user asks in (English, Hindi, or Hinglish)

Current date: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;

const mockResponses: Record<string, string> = {
  hello: `Namaste! Welcome to Smart Bharat AI! 🙏

I'm here to help you with Indian government services. I can assist you with:

• **Government Schemes** - PM Kisan, Ayushman Bharat, PM Awas Yojana
• **Documents** - Passport, PAN, Aadhaar, Driving License
• **Certificates** - Birth, Death, Caste, Income certificates
• **Grievances** - How to file and track complaints
• **Procedures** - Step-by-step application guides

How can I assist you today?`,

  scheme: `Here are some popular Government Schemes in India:

**Pradhan Mantri Jan Dhan Yojana (PMJDY)**
• Zero balance savings account
• Accidental insurance cover of ₹2 lakh
• Direct Benefit Transfer (DBT) facility

**Pradhan Mantri Awas Yojana (PMAY)**
• Housing for All by 2024
• Subsidy up to ₹2.67 lakh on home loans
• For EWS, LIG, MIG categories

**Ayushman Bharat - PMJAY**
• Health insurance of ₹5 lakh per family
• Cashless hospitalization
• Covers pre-existing diseases

**PM Kisan Samman Nidhi**
• ₹6,000 annual income support
• For small and marginal farmers
• Direct transfer in 3 installments

Would you like detailed information about any specific scheme?`,

  passport: `**Passport Application Guide** 🛂

**Documents Required:**
• Proof of Identity (Aadhaar, PAN, Voter ID)
• Proof of Address (Utility bills, Bank statement)
• Date of Birth Proof (Birth certificate, 10th certificate)
• 2 Passport-size photographs (white background)

**Application Process:**
1. Register on **passportindia.gov.in**
2. Fill the application form online
3. Pay the fees (₹1,500 for 36 pages)
4. Schedule appointment at PSK
5. Visit Passport Seva Kendra with documents
6. Police verification will follow
7. Receive passport in 7-21 days

**Types of Passport:**
• **Regular** - 36 pages (₹1,500)
• **Jumbo** - 60 pages (₹2,000)
• **Tatkal** - Urgent processing (₹3,500)

Need help with Tatkal or other services?`,

  aadhaar: `**Aadhaar Services** 🪪

**New Enrollment:**
• Visit nearest Aadhaar Seva Kendra
• Carry original documents (ID & Address proof)
• Biometrics (fingerprints, iris, photo) captured
• Get acknowledgment with Enrollment ID
• Download e-Aadhaar after processing (90 days)

**Update Aadhaar:**
• **Address**: Online at uidai.gov.in (free)
• **Name/DOB/Gender**: Visit enrollment center (₹50)
• **Biometrics**: Visit center only

**Download e-Aadhaar:**
1. Go to eaadhaar.uidai.gov.in
2. Enter Enrollment ID or Aadhaar Number
3. OTP verification on registered mobile
4. Download password-protected PDF

**Lost Aadhaar?**
• Retrieve using registered mobile number
• Or dial **1947** for help

Need any specific help with Aadhaar?`,

  pan: `**PAN Card Application** 💳

**Apply Online:**
• **NSDL**: onlineservices.nsdl.com
• **UTIITSL**: utiitsl.com

**Documents Required:**
• Identity Proof (Aadhaar, Passport, Voter ID)
• Address Proof (Utility bills, Bank statement)
• DOB Proof (Birth certificate, Passport)
• Passport-size photograph

**Fees:**
• Indian citizens: ₹107
• Foreign citizens: ₹1,017

**Processing Time:** 15-20 days

**Instant e-PAN (Free):**
• Available for Aadhaar holders
• Get digital PAN in minutes
• No paperwork required

**Track Application:**
Use acknowledgment number on tin-nsdl.com

Need help with any specific PAN query?`,

  complaint: `**File a Government Grievance** 📝

**Central Government:**
• **CPGRAMS**: pgportal.gov.in
• Register → Select Ministry → Describe issue
• Get registration number for tracking
• Resolution: 30-60 days
• Escalation if not resolved

**State Government:**
Each state has its own grievance portal:
• **UP**: jansunwai.up.nic.in
• **Maharashtra**: aaplesarkar.maha.gov.in
• **Karnataka**: spandana.karnataka.gov.in
• **Delhi**: pgms.delhi.gov.in

**Tips for Effective Complaints:**
• Be specific with details
• Attach supporting documents
• Include reference numbers
• Provide correct contact info
• Keep registration number safe

**Helpline Numbers:**
• Central: 1800-111-363
• State: Check your state portal

Need help filing a specific complaint?`,

  driver: `**Driving License in India** 🚗

**Types:**
• **Learner's License (LL)** - Valid 6 months
• **Permanent License (DL)** - After 30 days of LL
• **Commercial License** - For heavy vehicles

**Apply Online:**
1. Visit **parivahan.gov.in**
2. Select your state
3. Fill application form
4. Upload documents
5. Pay fee (₹200-500)
6. Schedule test slot
7. Pass driving test

**Documents Required:**
• Age Proof (Birth certificate, Passport)
• Address Proof (Aadhaar, Utility bills)
• Medical Certificate (for age 40+)
• Passport photos
• Learner's License (for DL)

**License Fee:**
• LL: ₹200
• DL: ₹200-500
• DL Test: ₹300

**Track Application:**
Use application number on parivahan.gov.in

Need help with renewal or international DL?`,

  farmer: `**PM-KISAN Scheme** 🌾

**Benefits:**
• ₹6,000 per year in 3 installments
• ₹2,000 every 4 months
• Direct transfer to bank account

**Eligibility:**
• Small & marginal farmers (land ≤ 2 hectares)
• Must have valid land records
• Aadhaar linked bank account

**Not Eligible:**
• Institutional farmers
• Income tax payees
• Government employees
• Retired government pensioners

**Apply:**
1. Visit **pmkisan.gov.in**
2. New Farmer Registration
3. Enter Aadhaar & land details
4. Submit to Patwari/Tehsil

**Check Status:**
• Farmer Status → Enter mobile/Aadhaar
• View all installments received

**PM-KISAN Helpline:** 155262
**Toll Free:** 1800-11-5526

Need help checking your installment?`,

  default: `I understand you're asking about civic services. I can help you with:

**Government Schemes**
• PM Kisan, Ayushman Bharat, PM Awas Yojana
• Sukanya Samriddhi, PM Mudra, and more

**Documents & Certificates**
• Passport, PAN Card, Aadhaar
• Birth/Death certificates
• Driving License, Ration Card

**Services**
• Grievance redressal
• Application tracking
• Document checklist

Please ask a specific question, for example:
• "How to apply for passport?"
• "PM Kisan scheme details"
• "Documents for Aadhaar update"

How can I help you today?`
};

function getMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
    return mockResponses.hello;
  }
  if (lowerMessage.includes('scheme') || lowerMessage.includes('yojana') || lowerMessage.includes('benefit')) {
    return mockResponses.scheme;
  }
  if (lowerMessage.includes('passport') || lowerMessage.includes('visa')) {
    return mockResponses.passport;
  }
  if (lowerMessage.includes('aadhaar') || lowerMessage.includes('aadhar')) {
    return mockResponses.aadhaar;
  }
  if (lowerMessage.includes('pan') || lowerMessage.includes('income tax')) {
    return mockResponses.pan;
  }
  if (lowerMessage.includes('complaint') || lowerMessage.includes('grievance') || lowerMessage.includes('pgportal')) {
    return mockResponses.complaint;
  }
  if (lowerMessage.includes('driving') || lowerMessage.includes('license') || lowerMessage.includes('dl')) {
    return mockResponses.driver;
  }
  if (lowerMessage.includes('farmer') || lowerMessage.includes('kisan') || lowerMessage.includes('pm kisan')) {
    return mockResponses.farmer;
  }

  return mockResponses.default;
}

export async function sendMessage(
  userMessage: string,
  conversationHistory: GeminiMessage[],
  apiKey?: string
): Promise<string> {
  const key = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  // If no API key, use mock responses
  if (!key) {
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
    return getMockResponse(userMessage);
  }

  // Build messages for Gemini
  const messages: GeminiMessage[] = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    },
    {
      role: 'model',
      parts: [{ text: 'I understand. I am Smart Bharat AI, ready to help Indian citizens with government services.' }]
    },
    ...conversationHistory.slice(-10), // Keep last 10 messages for context
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      // Fallback to mock response on error
      return getMockResponse(userMessage);
    }

    const data: GeminiResponse = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return getMockResponse(userMessage);
    }

    return responseText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getMockResponse(userMessage);
  }
}
