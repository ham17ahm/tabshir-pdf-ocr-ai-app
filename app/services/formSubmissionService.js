/**
 * Service for handling form submissions to external API
 * Currently using mock responses for development
 */

export const submitFormData = async (formData, extractedTexts, formType) => {
  try {
    // Prepare the payload
    const payload = {
      formType,
      formData,
      extractedTexts,
      timestamp: new Date().toISOString(),
    };

    // TODO: Replace with actual API endpoint
    // const response = await fetch('https://your-api-endpoint.com/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Add authentication headers here when needed
    //   },
    //   body: JSON.stringify(payload),
    // });

    // Mock API call - simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response - dynamic based on formType
    const mockResponse = {
      success: true,
      submissionId: `MOCK-${Date.now()}`,
      message: `Form submitted successfully for ${formType}`,
      data: {
        processedAt: new Date().toISOString(),
        formType,
        status: "processed",
      },
    };

    return mockResponse;
  } catch (error) {
    console.error("Form submission error:", error);
    throw error;
  }
};
