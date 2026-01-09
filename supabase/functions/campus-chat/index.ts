import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const knowledgeBase = `
You are CampusQuery, an AI assistant for educational institutions. You help students with campus-related queries.

KNOWLEDGE BASE:

## Exam Registration & Fee Deadlines
- Regular exam registration: Opens 3 weeks before exams, closes 1 week before exams
- Regular exam fee: ₹1,500 per semester
- Late registration: Available up to 3 days before exams with ₹500 late fee
- Supplementary exam fee: ₹750 per subject
- Hall ticket available 2 days after registration on student portal
- Payment methods: Online (debit/credit card, UPI, net banking) or at accounts office

## Attendance Rules
- Minimum attendance required: 75% in each subject
- Below 65%: Not eligible to write exams
- 65-74%: Can apply for condonation with ₹500 fee per subject
- Above 75%: Eligible for all exams
- Medical leave: Submit certificate within 7 days, counts toward attendance
- OD (On-Duty): Maximum 10 days per semester for approved activities

## Department Information
- Computer Science (CSE): HOD: Dr. Ramesh Kumar, Office: Block A, Room 201
- Electronics (ECE): HOD: Dr. Priya Sharma, Office: Block B, Room 105
- Mechanical (MECH): HOD: Dr. Suresh Reddy, Office: Block C, Room 301
- Civil Engineering: HOD: Dr. Lakshmi Narayanan, Office: Block D, Room 202
- Office hours: Monday to Friday, 10 AM to 4 PM
- Department labs open: 9 AM to 5 PM (with faculty permission after hours)

## College & Department Events
- Annual Tech Fest "TechVista 2026": March 15-17, 2026 at Main Auditorium
- CSE Symposium "CodeCraft": February 20, 2026 at CSE Seminar Hall
- Cultural Fest "Harmony": April 5-7, 2026 at Open Air Theatre
- Sports Meet: January 25-28, 2026 at College Grounds
- Guest Lecture Series: Every Friday, 3 PM at Conference Hall
- Hackathon "InnoHack": February 28-March 1, 2026 at Innovation Lab

## Condonation Procedures
- Application period: 2 weeks before exams
- Eligibility: Attendance between 65-74%
- Fee: ₹500 per subject
- Required documents: Application form, medical certificates (if any), parent undertaking
- Processing time: 3-5 working days
- Maximum subjects for condonation: 3 per semester
- Submit at Examination Branch, Room 101, Admin Block

## General Exam Rules
- Carry hall ticket and college ID to exam hall
- Report 30 minutes before exam start time
- No electronic devices allowed inside exam hall
- Answer sheets provided by college only
- Question paper can be taken after 30 minutes
- No exit allowed in first 30 minutes and last 10 minutes
- Results published within 45 days of last exam
- Revaluation fee: ₹300 per subject, apply within 15 days of results

INSTRUCTIONS:
- Respond in a friendly, helpful manner
- Include specific dates, amounts, and venues when relevant
- If information is not in the knowledge base, politely say you don't have that specific information and suggest contacting the relevant department
- Keep responses concise but complete
- Use bullet points for lists
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: knowledgeBase
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in campus-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request',
        response: "I'm experiencing some technical difficulties. Please try again in a moment."
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
