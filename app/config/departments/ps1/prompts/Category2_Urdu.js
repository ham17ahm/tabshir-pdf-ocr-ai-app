// app/config/departments/ps1/prompts/Category1_Urdu.js

/**
 * Prompt template for Category1 - Urdu language
 * @param {Object} data - Contains all the data needed for the prompt
 * @returns {string} - The complete formatted prompt
 */
export function buildPrompt(data) {
  const {
    language,
    formattedExamples,
    template,
    formattedExtractedTexts,
    formData,
  } = data;

  return `{
  "task": "urdu_funeral_prayer_letter_generation",
  "objective": "Write a formal letter in Urdu language using specified format for funeral prayer correspondence",
  "language": "Urdu",
  "context": "Funeral prayer (نماز جنازہ غائب) request letter",
  "letter_format": {
    "template": "${template}",
    "components": {
      "opening_section": {
        "author_reference": "[مکرم/مکرمہ] [لکھنے والے کا نام] [صاحب/صاحبہ]",
        "author_details": "(Add: [[Address Details of Author]])",
        "recipient": "حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں",
        "request_statement": "کی نماز جنازہ غائب پڑھانے کی درخواست کی ہے"
      },
      "deceased_information": {
        "death_details": "[مرحوم/مرحومہ] کی وفات [تاریخ وفات] کو بعمر [وفات پر عمر] سال [جگہ] میں ہوئی تھی",
        "prayer_phrase": "اناللہ وانا الیہ راجعون"
      },
      "closing_section": {
        "instruction": "حسب ارشاد براہ مہربانی [مرحوم/مرحومہ] کے خاندانی و عمومی تعارف، جماعتی تعلق نیز [موصی/موصیہ] ہونے کے بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں",
        "closing_prayer": "جزاکم اللہ احسن الجزاء"
      }
    }
  },
  "extraction_requirements": {
    "author_name": {
      "description": "Name of letter writer",
      "placement": "[لکھنے والے کا نام]",
      "gender_consideration": "Use مکرم for male, مکرمہ for female"
    },
    "author_address": {
      "description": "Address details of author",
      "placement": "[[Address Details of Author]]",
      "format": "Within double brackets after author name"
    },
    "deceased_information": {
      "name_and_relation": {
        "description": "Name and relationship of deceased",
        "placement": "[مرحوم/مرحومہ کا نام اور تعلق]",
        "examples": [
          "اپنے والد مکرم زید احمد صاحب",
          "اپنی بہن مکرمہ عمرانہ چغتائی صاحبہ", 
          "اپنے عزیز مکرم بشیر داؤد صاحب"
        ],
        "gender_consideration": "Use مرحوم for male, مرحومہ for female"
      },
      "death_date": {
        "description": "Date of death if mentioned",
        "placement": "[تاریخ وفات (اگر ذکر ہو)]",
        "conditional": "Include only if mentioned in original correspondence"
      },
      "age_at_death": {
        "description": "Age at time of death if mentioned", 
        "placement": "[وفات پر عمر (اگر ذکر ہو)]",
        "conditional": "Include only if mentioned in original correspondence"
      },
      "place_of_death": {
        "description": "Location where death occurred if mentioned",
        "placement": "[جگہ (اگر ذکر ہو)]",
        "conditional": "Include only if mentioned in original correspondence"
      }
    }
  },
  "processing_instructions": {
    "step_1": "Read and analyze the raw correspondence thoroughly",
    "step_2": "Extract author name and determine gender for proper titles",
    "step_3": "Extract author location and details",
    "step_4": "Identify deceased person's name, relationship, and gender",
    "step_5": "Extract death-related information (date, age, place) if available",
    "step_6": "Apply appropriate gender-specific terms (مکرم/مکرمہ, صاحب/صاحبہ, مرحوم/مرحومہ)",
    "step_7": "Generate complete formal letter using template",
    "step_8": "Adjust wording if required while maintaining formal structure"
  },
  "gender_specific_terms": {
    "for_males": {
      "respectful_title": "مکرم",
      "suffix": "صاحب", 
      "deceased_reference": "مرحوم"
    },
    "for_females": {
      "respectful_title": "مکرمہ",
      "suffix": "صاحبہ",
      "deceased_reference": "مرحومہ"
    }
  },
  "conditional_content": {
    "death_date": "Include only if mentioned in original correspondence",
    "age_at_death": "Include only if mentioned in original correspondence", 
    "place_of_death": "Include only if mentioned in original correspondence"
  },
  "output_requirements": {
    "language": "Urdu script and language",
    "format": "Complete formal letter ready for use",
    "accuracy": "Faithful representation of original correspondence details",
    "tone": "Formal, respectful, Islamic administrative correspondence",
    "flexibility": "Adjust wording if required while maintaining structure"
  },
  "fixed_elements": {
    "recipient_title": "حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں",
    "prayer_phrase": "اناللہ وانا الیہ راجعون",
    "closing_instruction": "حسب ارشاد براہ مہربانی [مرحوم/مرحومہ] کے خاندانی و عمومی تعارف، جماعتی تعلق نیز [موصی/موصیہ] ہونے کے بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں",
    "closing_prayer": "جزاکم اللہ احسن الجزاء"
  }
}

[RAW DATA]=
${formattedExtractedTexts}
`;
}
